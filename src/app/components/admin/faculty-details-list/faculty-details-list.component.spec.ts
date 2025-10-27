import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyDetailsListComponent } from './faculty-details-list.component';

describe('FacultyDetailsListComponent', () => {
  let component: FacultyDetailsListComponent;
  let fixture: ComponentFixture<FacultyDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyDetailsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
