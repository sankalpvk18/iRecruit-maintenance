import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseDatabaseService } from 'src/app/services/firebase-database.service';

@Component({
  selector: 'app-indent-page',
  templateUrl: './indent-page.component.html',
  styleUrls: ['./indent-page.component.scss']
})
export class IndentPageComponent implements OnInit {

  list: any[];
  indents: any = [];
  isLoaded: boolean = false;

  constructor(private router:Router, private db:FirebaseDatabaseService) { }

  ngOnInit(): void {
  }

  getIndentsList() {

    const ref = this.db.indentsRef;
    ref.valueChanges().subscribe( (data) => {
      this.indents = data;
      this.isLoaded = true;
      // console.log(this.indents);
    })

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
    this.getIndentsList();
  }

  onBack(){
    this.router.navigateByUrl('/home')
  }
}
