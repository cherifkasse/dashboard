import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTableSignComponent } from './material-table-sign.component';

describe('MaterialTableSignComponent', () => {
  let component: MaterialTableSignComponent;
  let fixture: ComponentFixture<MaterialTableSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialTableSignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTableSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
