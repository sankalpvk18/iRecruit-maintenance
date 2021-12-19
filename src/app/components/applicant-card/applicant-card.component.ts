import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-applicant-card',
  templateUrl: './applicant-card.component.html',
  styleUrls: ['./applicant-card.component.scss']
})
export class ApplicantCardComponent implements OnInit {

  @Input() applicantsData: any = [];
  @Input() requiredSkills = [];

  applicants = [
    'Jorge Wheeler',
    'James Conway',
    'Elizabeth Simpson',
    'Mark Jennings',
    'Kara Drake',
    'Lindsay Hudson',
    'Erica Willis',
    // 'Brian Clark',
    // 'Danny Jones',
    // 'Brian Horton',
    // 'Aaron Horn',
    // 'Jennifer Wilson',
    // 'Brian Fernandez',
    // 'Lindsay Mccarthy',
    // 'Jennifer Daniels'
  ];

  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log("required skills" + this.requiredSkills);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  openApplicant(data){
    console.log(data);
    sessionStorage.setItem("applicantSkill",JSON.stringify(data.skills));
    delete data.skills;
    console.log(data);
    sessionStorage.setItem("applicantDetails", JSON.stringify(data));

    const navigationExtras: NavigationExtras = {
      state: {
        requiredSkills: this.requiredSkills,
        applicantDetails: data
      }
    }

    sessionStorage.setItem("isRefreshed", "false");
    this.router.navigate(['screening'],navigationExtras);
  }

}
