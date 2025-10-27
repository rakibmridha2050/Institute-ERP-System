import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyDetailsFormComponent } from './faculty-details-form.component';

describe('FacultyDetailsFormComponent', () => {
  let component: FacultyDetailsFormComponent;
  let fixture: ComponentFixture<FacultyDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyDetailsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
