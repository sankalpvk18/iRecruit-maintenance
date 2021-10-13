import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('dashboard') dashboard: ElementRef<HTMLInputElement>;
  @ViewChild('indents') indents: ElementRef<HTMLInputElement>;
  @ViewChild('screening') screening: ElementRef<HTMLInputElement>;
  @ViewChild('backgroundCheck') backgroundCheck: ElementRef<HTMLInputElement>;


  constructor(public firebaseService: FirebaseService, private router: Router) { 
    
  }



  ngOnInit(): void {

  }

  logout(){
    this.firebaseService.logout()
    this.router.navigateByUrl('/login')
  }

  onCreateIndent(){
    this.router.navigateByUrl('/createindent')
  }

  onIndentClicked(){
    this.router.navigateByUrl('/indents')
  }

  hover(element) {
    // console.log(element.target.innerText)
    // switch(element.target.innerText) {
    //   case 'Dashbaord':
    //     element.setAttribute('src', 'http://dummyimage.com/100x100/eb00eb/fff');
    //     break;
    //   case 'Indents':
    //     element.setAttribute('src', '../../../assets/dashboard_hover.png');
    //     break;
    //   case 'Screening':
    //     break;
    //   case 'Background Check':
    //     break;
    // }
  }
  
  unhover(element) {
    // console.log(element.target)
    // switch(element.target.innerText) {
    //   case 'Dashbaord':
    //     element.setAttribute('src', '../../../assets/dashboard.svg');
    //     break;
    //   case 'Indents':
    //       element.setAttribute('src', '../../../assets/dashboard.svg');
    //     break;
    //   case 'Screening':
    //     break;
    //   case 'Background Check':
    //     break;
    // }
  }

}
