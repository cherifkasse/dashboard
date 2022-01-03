import { Component, OnInit } from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-table-page-sign',
  templateUrl: './table-page-sign.component.html',
  styleUrls: ['./table-page-sign.component.scss']
})
export class TablePageSignComponent implements OnInit {

  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('Angular Dashboard with Material');
    this.meta.addTag({ name: 'description', content: 'How to build Angular Material Data Table with Cube.js' });
    this.meta.addTag({ name: 'keywords', content: 'Angular, Cube.js, Data Table, Table, Material UI' });
  }

  public limit = 10;
  public page = 0;
  public query = null;
  public sorting = ['Operations.datesignatureNew', 'desc'];
  public startDate = "2010-01-01";
  date_fin=new Date();
  public finishDate ="2021-11-22" ;
  private minPrice = 0;
  private status = "all";
  public _query = new BehaviorSubject({
    "limit": this.limit,
    "offset": this.page * this.limit,
    order: {
      [`${this.sorting[0]}`]: this.sorting[1],
    },
    "timeDimensions": [
      {
        "dimension": "Operations.datesignatureNew",
        "dateRange" : [this.startDate, this.finishDate],
        "granularity": "day"
      }
    ],
    "dimensions": [
      "Operations.signaturekey",
      "Operations.datesignatureNew"
    ],
    filters: []
  });
  public changePage = (obj) => {
    this._query.next({
      ...this._query.value,
      "limit": obj.pageSize,
      "offset": obj.pageIndex * obj.pageSize
    });
  };

  public sortingChanged(value) {
    if (value === this.sorting[0] && this.sorting[1] === 'asc') {
      this.sorting[0] = value;
      this.sorting[1] = 'asc'
    } else if (value === this.sorting[0] && this.sorting[1] === 'asc') {
      this.sorting[0] = value;
      this.sorting[1] = 'asc'
    } else {
      this.sorting[0] = value;
    }
    this.sorting[0] = value;
    this._query.next({
      ...this._query.value,
      order: {
        [`${this.sorting[0]}`]: this.sorting[1],
      },
    });
  }

  public dateChanged(value) {
    if (value.number === 0) {
      this.startDate = value.date
    }
    if (value.number === 1) {
      this.finishDate = value.date
    }
    this._query.next({
      ...this._query.value,
      timeDimensions: [
        {
          dimension: "Operations.datesignatureNew",
          dateRange: [this.startDate, this.finishDate],
          granularity: null
        }
      ]
    });
  }

  public statusChanged(value) {
    this.status = value;
    this._query.next({
      ...this._query.value,
      // "filters": this.getFilters(this.status, this.minPrice)
    });
  };

  public sliderChanged(obj) {
    this.minPrice = obj.value;
    this._query.next({
      ...this._query.value,
      //"filters": this.getFilters(this.status, this.minPrice)
    });
  };

  private getFilters = (status, price) => {
    let filters = [];
    if (status) {
      filters.push(
        {
          "dimension": "Orders.status",
          "operator": status === "all" ? "set" : "equals",
          "values": [
            status
          ]
        }
      );
    }
    if (price) {
      filters.push(
        {
          dimension: 'Orders.price',
          operator: 'gt',
          values: [`${price}`],
        },
      );
    }
    return filters;
  };

  ngOnInit(): void {
    this._query.subscribe(query => {
      this.query = query;
    });
  }
}
