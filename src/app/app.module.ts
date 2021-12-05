import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ClickOutsideModule } from 'ng-click-outside';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { ApplicationComponent } from './Pages/application/application.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';

// firebase modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FirebaseService } from './services/firebase.service';
import { HomeComponent } from './Pages/home/home.component';
import { environment } from 'src/environments/environment';
import { CreateIndentComponent } from './Pages/create-indent/create-indent.component';
import { IndentPageComponent } from './Pages/indent-page/indent-page.component';
import { IndentListItemComponent } from './components/indent-list-item/indent-list-item.component';
import { IndentDetailsPageComponent } from './Pages/indent-details-page/indent-details-page.component';
import { IndentDetailsListItemComponent } from './components/indent-details-list-item/indent-details-list-item.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { ScreeningComponent } from './Pages/screening/screening.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { RatingComponent } from './components/rating/rating.component';
import { ApplicantCardComponent } from './components/applicant-card/applicant-card.component';
import {MatMenuModule} from '@angular/material/menu';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { DialogFeedbackComponent } from './components/dialog-feedback/dialog-feedback.component';
import { MoreMenuComponent } from './more-menu/more-menu.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import { AuthComponent } from './components/auth/auth.component';
import {HttpClientModule} from '@angular/common/http';
import { CalendarViewComponent } from './components/calendar-view/calendar-view.component'
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import {MatSliderModule} from '@angular/material/slider';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
  googleCalendarPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ApplicationComponent,
    SignUpComponent,
    HomeComponent,
    CreateIndentComponent,
    IndentPageComponent,
    IndentListItemComponent,
    IndentDetailsPageComponent,
    IndentDetailsListItemComponent,
    DialogComponent,
    ScreeningComponent,
    ToggleButtonComponent,
    RatingComponent,
    ApplicantCardComponent,
    MenuItemComponent,
    DialogFeedbackComponent,
    MoreMenuComponent,
    AuthComponent,
    CalendarViewComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatListModule,
    MatSelectModule,
    MatRippleModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatSlideToggleModule,
    FormsModule,
    BarRatingModule,
    DragDropModule,
    NgbModule,
    MatDialogModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 80,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      subtitle: "Match",
      subtitleFontSize: '18',
      subtitleFontWeight: '500'
    }),
    ClipboardModule,
    MatSnackBarModule,
    ClickOutsideModule,
    MatStepperModule,
    HttpClientModule,
    FullCalendarModule,
    MatSliderModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
