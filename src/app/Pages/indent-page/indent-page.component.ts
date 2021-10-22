import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseDatabaseService } from 'src/app/services/firebase-database.service';
import * as firebase from 'firebase/compat/app';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


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

  constructor(private router:Router, private db:FirebaseDatabaseService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getIndentsList();
  }

  getIndentsList() {
    firebase.default.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userID = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    
   // FirebaseDatabaseService.dbPath = '/indents/'+this.userID;

    // this.db.setRef(this.userID);
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

  ngAfterViewInit() {
  }

  onBack(){
    this.router.navigateByUrl('/home')
  }
  
  onToggleSwitched(event) {
    
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
  
}
