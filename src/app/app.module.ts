import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { InformationTravelComponent } from './components/information-travel/information-travel.component';
import { RegistrationDriverComponent } from './components/registration-driver/registration-driver.component';
import { RegistrationUserComponent } from './components/registration-user/registration-user.component';
import { RequestComponent } from './components/request/request.component';
import { PipeCopPipe } from './pipes/pipe-cop.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogBoxComponent } from './helpers/dialog-box/dialog-box.component';
import { PreloaderComponent } from './helpers/preloader/preloader.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { SupportComponent } from './components/support/support.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { InfoService } from './core/service/info.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RatingsComponent,
    InformationTravelComponent,
    RegistrationDriverComponent,
    RegistrationUserComponent,
    RequestComponent,
    PipeCopPipe,
    DialogBoxComponent,
    PreloaderComponent,
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    ConfiguracionComponent,
    SupportComponent,
    ChatComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true // Prevent duplicate notifications
    })
  ],
  providers: [InfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
