import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseDatabaseService } from 'src/app/services/firebase-database.service';
import * as firebase from 'firebase/compat/app';


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


  constructor(private router:Router, private db:FirebaseDatabaseService) { }

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
    
    this.db.setRef(this.userID);
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
    // return this.db.getAll().snapshotChanges().pipe(
    //   map((messages: any[]) => messages.map(prod => {

    //     const payload = prod.payload.val();
    //     const key = prod.key;
    //     console.log(prod);
    //     return <any>{ key, ...payload };
    //   })),
    // );
  }

  ngAfterViewInit() {
  }

  onBack(){
    this.router.navigateByUrl('/home')
  }

  
}
