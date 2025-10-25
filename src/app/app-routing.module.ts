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
