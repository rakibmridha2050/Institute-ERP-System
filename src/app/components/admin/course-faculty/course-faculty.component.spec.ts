import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFacultyComponent } from './course-faculty.component';

describe('CourseFacultyComponent', () => {
  let component: CourseFacultyComponent;
  let fixture: ComponentFixture<CourseFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseFacultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
