import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AdminDashbordComponent } from './components/admin-dashbord/admin-dashbord.component';
import { DashbordComponent } from './components/admin/dashbord/dashbord.component';
import { DepartmentFormComponent } from './components/admin/department-form/department-form.component';
import { DepartmentListComponent } from './components/admin/department-list/department-list.component';
import { ClassesListComponent } from './components/admin/classes-list/classes-list.component';
import { ClassFormComponent } from './components/admin/class-form/class-form.component';
import { SectionListComponent } from './components/admin/section-list/section-list.component';
import { SectionFormComponent } from './components/admin/section-form/section-form.component';
import { FacultyListComponent } from './components/admin/faculty-list/faculty-list.component';
import { FacultyFormComponent } from './components/admin/faculty-form/faculty-form.component';
import { CourseFacultyComponent } from './components/admin/course-faculty/course-faculty.component';
import { CourseFormComponent } from './components/admin/course-form/course-form.component';
import { CourseListComponent } from './components/admin/course-list/course-list.component';
import { NoticeFormComponent } from './components/admin/notice-form/notice-form.component';
import { NoticeListComponent } from './components/admin/notice-list/notice-list.component';
import { FacultyDetailsListComponent } from './components/admin/faculty-details-list/faculty-details-list.component';
import { FacultyDetailsFormComponent } from './components/admin/faculty-details-form/faculty-details-form.component';
import { StudentListComponent } from './components/admin/student-list/student-list.component';
import { StudentFormComponent } from './components/admin/student-form/student-form.component';
import { ScheduleClassFormComponent } from './components/admin/schedule-class-form/schedule-class-form.component';
import { ScheduleClassListComponent } from './components/admin/schedule-class-list/schedule-class-list.component';

import { AttendanceListComponent } from './components/admin/attendance-list/attendance-list.component';
import { AttendanceComponent } from './components/admin/attendance/attendance.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },



  //admin panel routing 

  {
    path: 'admin', component: AdminDashbordComponent,
    children: [
      { path: 'dashbord', component: DashbordComponent },


      // Student Routes
      { path: 'students', component: StudentListComponent },
      { path: 'students/new', component: StudentFormComponent },
      { path: 'students/edit/:id', component: StudentFormComponent },

      { path: 'faculty', component: FacultyListComponent },
      { path: 'faculty/new', component: FacultyFormComponent },
      { path: 'faculty/edit/:id', component: FacultyFormComponent },

      { path: 'courses', component: CourseListComponent },
      { path: 'courses/new', component: CourseFormComponent },
      { path: 'courses/edit/:id', component: CourseFormComponent },
      { path: 'courses/:id/faculties', component: CourseFacultyComponent },

      { path: 'notices', component: NoticeListComponent },
      { path: 'notices/new', component: NoticeFormComponent },
      { path: 'notices/edit/:id', component: NoticeFormComponent },
      { path: 'notices/:id', component: NoticeFormComponent },

      { path: 'faculty-details', component: FacultyDetailsListComponent },
      { path: 'faculty-details/create', component: FacultyDetailsFormComponent },
      { path: 'faculty-details/edit/:id', component: FacultyDetailsFormComponent },
      
      


       { path: 'attendances', component: AttendanceComponent },

      // { path: 'attendances', component: AttendanceListComponent },
      // { path: 'attendances/create', component: AttendanceFormComponent },
      // { path: 'attendances/edit/:id', component: AttendanceFormComponent },

      
      
      { path: 'schedule-classes', component: ScheduleClassListComponent },
      { path: 'schedule-classes/create', component: ScheduleClassFormComponent },
      { path: 'schedule-classes/edit/:id', component: ScheduleClassFormComponent },



      { path: 'departments', component: DepartmentListComponent },
      { path: 'departments/new', component: DepartmentFormComponent },
      { path: 'departments/:id/edit', component: DepartmentFormComponent },

      { path: 'classes', component: ClassesListComponent },
      { path: 'classes/create', component: ClassFormComponent },
      { path: 'classes/edit/:id', component: ClassFormComponent },


        { path: 'sections', component: SectionListComponent },
        { path: 'sections/create', component: SectionFormComponent },
        { path: 'sections/edit/:id', component: SectionFormComponent },

      { path: '', redirectTo: 'dashbord', pathMatch: 'full' }


    ]
  },



  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
