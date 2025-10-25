import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentaddformComponent } from './studentaddform.component';

describe('StudentaddformComponent', () => {
  let component: StudentaddformComponent;
  let fixture: ComponentFixture<StudentaddformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentaddformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentaddformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
