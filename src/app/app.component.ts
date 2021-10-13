import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'iRecruit';
  constructor(public firebaseService : FirebaseService,private router: Router){}
  ngOnInit(): void {
    
  }

}
