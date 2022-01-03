import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CubejsClient} from "@cubejs-client/ngx";

@Component({
  selector: 'app-material-table-sign',
  templateUrl: './material-table-sign.component.html',
  styleUrls: ['./material-table-sign.component.scss']
})
export class MaterialTableSignComponent{
  constructor(private cubejs: CubejsClient) {}
  @Input() set query(query: object) {
    this.loading = true;
    this.cubejs.load(query).subscribe(
      resultSet => {
        this.dataSource1 = resultSet.tablePivot();
        this.loading = false;
      },
      err => console.log("HTTP Error", err)
    );
    this.cubejs.load({...query, limit: 50000, offset: 0}).subscribe(
      resultSet => {
        this.length = resultSet.tablePivot().length;
      },
      err => console.log("HTTP Error", err)
    );
  };
  @Input() limit: number;
  @Output() pageEvent = new EventEmitter();
  @Output() sortingChanged = new EventEmitter();
  loading = true;
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  dataSource1 = [];
  displayedColumns1 = [ 'cle', 'date'];
  changeSorting(value) {
    this.sortingChanged.emit(value)
  }

}
