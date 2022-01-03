import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Meta, Title } from '@angular/platform-browser';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {APP_DATE_FORMATS, AppDateAdapter} from "./PickDateAdapter";
import {jsPDF} from "jspdf";
import html2canvas from 'html2canvas';
declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.scss"],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]

})
export class DashboardPageComponent implements OnInit {
  cols : number;
  chartCols: number;
  start_date:string;
  start_date1;
  end_date:string;
  end_date1:string;
  start_date_s:string;
  start_date1_s;
  end_date_s:string;
  end_date1_s:string;
  date_range:string="";
  jours=["0","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
 /*traitementDate(){
    let tab=this.end_date.toString().split(" ");
    this.start_date1=tab[3]+"-"+this.jours.indexOf(tab[1])+"-"+tab[2];
   console.log("loggggg "+this.start_date1)
 }*/

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 2,
    sm: 2,
    xs: 1
  }
  chartGridByBreakpoint = {
    xl: 5,
    lg: 5,
    md: 3,
    sm: 3,
    xs: 3
  }
  doughnutCols = 2;
  constructor(private meta: Meta, private title: Title, private breakpointObserver: BreakpointObserver) {
    this.title.setTitle('Angular Dashboard with Material');
    this.meta.addTag({ name: 'description', content: 'How to build Angular Material Dashboard with Cube.js' });
    this.meta.addTag({ name: 'keywords', content: 'Angular, Cube.js, Dashboard, Material UI' });

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
          this.chartCols = this.chartGridByBreakpoint.xs;
          this.doughnutCols = 3;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
          this.chartCols = this.chartGridByBreakpoint.sm;
          this.doughnutCols = 3;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
          this.chartCols = this.chartGridByBreakpoint.md;
          this.doughnutCols = 3;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
          this.chartCols = this.chartGridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
          this.chartCols = this.chartGridByBreakpoint.xl;
        }
      }
    });
  }

  private query = new BehaviorSubject({
    measures: ["Beneficiaires.count"],
    timeDimensions: [{ dimension: "Beneficiaires.datecreationNew", granularity: "day", dateRange:  ["2020-01-01",new Date()] }],
    dimensions: ["Beneficiaires.prenomnom"],


    //filters: [{ dimension: "Beneficiaires.signaturekey", operator: "contains", values: ["CLE"] }]
  });
  private query_sign = new BehaviorSubject({
    measures: ["Operations.count"],
    timeDimensions: [{ dimension: "Operations.datesignatureNew", granularity: "day", dateRange:  ["2020-01-01",new Date()] }],
    dimensions: ["Operations.signaturekey"],


    //filters: [{ dimension: "Beneficiaires.signaturekey", operator: "contains", values: ["CLE"] }]
  });
  private doughnutQuery = new BehaviorSubject({
    measures: ['Beneficiaires.count'],
    timeDimensions: [
      {
        dimension: 'Beneficiaires.datecreationNew',
      },
    ],
    filters: [],
    dimensions: ['Beneficiaires.prenomnom'],
  });
  changeDateRange = (value) => {
    this.query.next({
      ...this.query.value,
      timeDimensions: [{ dimension: "Beneficiaires.datecreationNew", granularity: "day", dateRange: value }]
    });
  };
  changeDateRange_sign = (value) => {
    this.query_sign.next({
      ...this.query_sign.value,
      timeDimensions: [{ dimension: "Operations.datesignatureNew", granularity: "day", dateRange: value }]
    });
  };
  dateRangeCalendar= ()=>{
    let tab1=this.start_date.toString().split(" ");
    let tab2=this.end_date.toString().split(" ");
    this.start_date1=tab1[3]+"-"+this.jours.indexOf(tab1[1])+"-"+tab1[2];
    this.end_date1=tab2[3]+"-"+this.jours.indexOf(tab2[1])+"-"+tab2[2];
    this.query.next({
      ...this.query.value,
      timeDimensions: [{ dimension: "Beneficiaires.datecreationNew", granularity: "day", dateRange: [this.start_date1,this.end_date1] }]
    });
  };

  dateRangeCalendar_sign= ()=>{
    let tab1=this.start_date_s.toString().split(" ");
    let tab2=this.end_date_s.toString().split(" ");
    this.start_date1_s=tab1[3]+"-"+this.jours.indexOf(tab1[1])+"-"+tab1[2];
    this.end_date1_s=tab2[3]+"-"+this.jours.indexOf(tab2[1])+"-"+tab2[2];
    this.query_sign.next({
      ...this.query_sign.value,
      timeDimensions: [{ dimension: "Operations.datesignatureNew", granularity: "day", dateRange: [this.start_date1_s,this.end_date1_s] }]
    });
  };
  public cards = [];
  public KPICards = [
    {
      title: 'CERTIFICATS',
      query: { measures: ['Beneficiaires.count'] },
      difference: 'Beneficiaires',
      progress: false,
      duration: 2.25,
    },
    {
      title: 'SIGNATURES',
      query: { measures: ['Operations.count'] },
      difference: 'Operations',
      progress: false,
      duration: 2.5,
    },
  ];
  @ViewChild("content", { static: false }) content: ElementRef;

  onClickDownload(event) {
    console.log("onClickDownload starting");
    this.exportPDF();
  }
 public exportPDF(){
   const doc = new jsPDF();
   // doc.text("Hello world!", 10, 10);
   // doc.save("a4.pdf");
   const specialElementHandlers = {
     '#editor': function (element, renderer) {
       return true;
     }
   };

   const content = this.content.nativeElement;

   doc.html(content.innerHTML, {
     callback: function (doc) {
       doc.save('test.pdf');
     }

   });
 }
  public openPDF():void {
    console.log("testttttt")
    let DATA = document.getElementById('content');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      let date_jour:Date=new Date();
      let tab1=date_jour.toString().split(" ");
      let date=tab1[3]+"-"+this.jours.indexOf(tab1[1])+"-"+tab1[2]+" "+tab1[4];
      PDF.save('export-data-'+date+'.pdf');
    });
  }

  ngOnInit() {
    this.query.subscribe(data => {
      this.cards[0] = {
        hasDatePick: true,
        title: 'Certificats',
        chart: "bar", cols: 4, rows: 1,
        query: data
      };
    });
    this.query_sign.subscribe(data => {
      this.cards[1] = {
        hasDatePick: true,
        title: 'Signatures',
        chart: "bar_sign", cols: 4, rows: 1,
        query_sign: data
      };
    });
    /*this.doughnutQuery.subscribe(data => {
      this.cards[1] = {
        hasDatePick: false,
        title: 'Users by Device',
        chart: "doughnut", cols: this.doughnutCols, rows: 1,
        query: data
      };
    });*/
  }
}
