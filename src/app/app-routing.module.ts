import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ApplicationComponent } from './Pages/application/application.component';
import { CreateIndentComponent } from './Pages/create-indent/create-indent.component';
import { HomeComponent } from './Pages/home/home.component';
import { IndentDetailsPageComponent } from './Pages/indent-details-page/indent-details-page.component';
import { IndentPageComponent } from './Pages/indent-page/indent-page.component';
import { LoginComponent } from './Pages/login/login.component';
import { RejectedComponent } from './Pages/rejected/rejected.component';
import { ScreeningComponent } from './Pages/screening/screening.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'application', component: ApplicationComponent},
  {path: 'application/:jobRole/:id/:by/:open', component: ApplicationComponent},
  {path: 'signup', component:SignUpComponent},
  {path: 'home',component:IndentPageComponent},
  {path: 'createindent',component:CreateIndentComponent},
  {path: 'createindent/:id', component: CreateIndentComponent},
  {path:'indents',component:IndentPageComponent},
  {path:'indentdetails',component:IndentDetailsPageComponent},
  {path:'indentdetails/:id/:by',component:IndentDetailsPageComponent},
  {path: 'screening',component:ScreeningComponent},
  {path: 'screening/:accessToken',component:ScreeningComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'rejected/:id/:by', component: RejectedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
