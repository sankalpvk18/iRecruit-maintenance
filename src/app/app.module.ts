import { NgModule } from '@angular/core';
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
    BarRatingModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
