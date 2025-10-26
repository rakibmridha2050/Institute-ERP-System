import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AdminDashbordComponent } from './components/admin-dashbord/admin-dashbord.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { DashbordComponent } from './components/admin/dashbord/dashbord.component';
import { StudentaddformComponent } from './components/admin/studentaddform/studentaddform.component';
import { StudentlistComponent } from './components/admin/studentlist/studentlist.component';
import { StudentdetailsComponent } from './components/admin/studentdetails/studentdetails.component';
import { AllstudentsComponent } from './components/admin/allstudents/allstudents.component';
import { DepartmentListComponent } from './components/admin/department-list/department-list.component';
import { DepartmentFormComponent } from './components/admin/department-form/department-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassesListComponent } from './components/admin/classes-list/classes-list.component';
import { ClassFormComponent } from './components/admin/class-form/class-form.component';
import { SectionListComponent } from './components/admin/section-list/section-list.component';
import { SectionFormComponent } from './components/admin/section-form/section-form.component';
import { FacultyListComponent } from './components/admin/faculty-list/faculty-list.component';
import { FacultyFormComponent } from './components/admin/faculty-form/faculty-form.component';
import { CourseListComponent } from './components/admin/course-list/course-list.component';
import { CourseFormComponent } from './components/admin/course-form/course-form.component';
import { CourseFacultyComponent } from './components/admin/course-faculty/course-faculty.component';
import { NoticeListComponent } from './components/admin/notice-list/notice-list.component';
import { NoticeFormComponent } from './components/admin/notice-form/notice-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    AdminDashbordComponent,
    TopNavBarComponent,
    SideNavBarComponent,
    DashbordComponent,
    StudentaddformComponent,
    StudentlistComponent,
    StudentdetailsComponent,
    AllstudentsComponent,
    
    DepartmentListComponent,
    DepartmentFormComponent,
    ClassesListComponent,
    ClassFormComponent,
    SectionListComponent,
    SectionFormComponent,
    FacultyListComponent,
    FacultyFormComponent,
    CourseListComponent,
    CourseFormComponent,
    CourseFacultyComponent,
    NoticeListComponent,
    NoticeFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
