import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePageSignComponent } from './table-page-sign.component';

describe('TablePageSignComponent', () => {
  let component: TablePageSignComponent;
  let fixture: ComponentFixture<TablePageSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePageSignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePageSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
