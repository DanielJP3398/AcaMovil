import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RequestComponent } from './components/request/request.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { SupportComponent } from './components/support/support.component';
import { PreloaderComponent } from './helpers/preloader/preloader.component';
import { ChatComponent } from './components/chat/chat.component';
import { InformationTravelComponent } from './components/information-travel/information-travel.component';

const routes: Routes = [
  { path: '', redirectTo: 'preloader', pathMatch: 'full' },
  { path: 'preloader', component: PreloaderComponent },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      { path: '', component: RequestComponent },
      { path: 'request', component: RequestComponent },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'ratings', component: RatingsComponent },
  { path: 'config', component: ConfiguracionComponent },
  { path: 'info', component: InformationTravelComponent },
  { path: 'support', component: SupportComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
