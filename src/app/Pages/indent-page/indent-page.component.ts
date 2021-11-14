import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseDatabaseService } from 'src/app/services/firebase-database.service';

import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Deserializable } from 'src/app/firebase-deserialisation';

@Component({
  selector: 'app-indent-page',
  templateUrl: './indent-page.component.html',
  styleUrls: ['./indent-page.component.scss']
})
export class IndentPageComponent implements OnInit, Deserializable {

  list: any[];
  indents: any = [];
  isLoaded: boolean = false;
  userID: string;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private router:Router,
    private db:FirebaseDatabaseService,
    private _snackBar: MatSnackBar) { }

  deserialize(input: any): this {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    console.log("firebase user id inside: " + sessionStorage.getItem("firebaseUserId"));
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
    const obj = {
      open: "false"
    }
   this.db.update("/-MoSblrTo9fcEa_NGBGq", obj);
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
  
}
