import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public links = [
    {name: 'Dashboard', href: '/', icon: 'dashboard'},
    {name: 'Certificats', href: '/table', icon: 'assignment'},
    {name: 'Signatures', href: '/table-sign', icon: 'assignment'}
    ];
  title = 'Angular Material UI Dashboard';
}
