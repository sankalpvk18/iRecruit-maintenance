import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseDatabaseService } from 'src/app/services/firebase-database.service';

import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as firebase from 'node_modules/firebase/compat';

@Component({
  selector: 'app-indent-page',
  templateUrl: './indent-page.component.html',
  styleUrls: ['./indent-page.component.scss']
})
export class IndentPageComponent implements OnInit {

  list: any[];
  indents: any = [];
  isLoaded: boolean = false;
  userID: string;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  currentUser: string;

  constructor(
    private router:Router,
    private db:FirebaseDatabaseService,
    private _snackBar: MatSnackBar,
    public firebaseService: FirebaseService,
    ) { }

  ngOnInit(): void {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user.uid;
        if(this.currentUser != null) {
          sessionStorage.setItem("firebaseUserId", this.currentUser);
        }
      } else {
        this.firebaseService.logout();
      }
    });
    this.getIndentsList();
  }

  getIndentsList() {

    this.db.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.indents = data;
      this.isLoaded = true;
      console.log();
    });
  }
    
  onBack(){
    this.router.navigateByUrl('/home')
  }
  
  onToggleSwitched(event) {
  //   const obj = {
  //     open: "false"
  //   }
  //  this.db.update("/-MoSblrTo9fcEa_NGBGq", obj);
  //  window.location.reload();
   // this.getIndentsList();
  }

  applicationURLCopied(event) {
    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.open('Applicaion Form URL Copied', null, {
      duration: 0.7*1000,
      verticalPosition: this.verticalPosition
    });
  }

  logout() {
    this.firebaseService.logout()
    this.router.navigateByUrl('/login')
  }

  onCreateIndent(){
    this.router.navigateByUrl('/createindent')
  }
  
}
