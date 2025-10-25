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
import { ReactiveFormsModule } from '@angular/forms';

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
    DepartmentFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
