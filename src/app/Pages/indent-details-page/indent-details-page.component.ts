import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indent-details-page',
  templateUrl: './indent-details-page.component.html',
  styleUrls: ['./indent-details-page.component.scss']
})
export class IndentDetailsPageComponent implements OnInit {

  
  indent:any;

  constructor(private router:Router) {
    const navigation = this.router.getCurrentNavigation();
  const state = navigation.extras.state as {
    department: string,
    vacancies: number,
    created_on: number,
    role: string
    };
  
    this.indent=state;    
  }



  ngOnInit(): void {
  }


  onBack(){
    this.router.navigateByUrl('/indents');
  }


  onCreateApplication(){
      this.router.navigateByUrl('application');
  }

  getDate(date) : Date {
    return new Date(date);
  }
  

}
