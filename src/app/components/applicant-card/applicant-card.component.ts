import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-applicant-card',
  templateUrl: './applicant-card.component.html',
  styleUrls: ['./applicant-card.component.scss']
})
export class ApplicantCardComponent implements OnInit {

  @Input() applicantsData: any = [];

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

  openApplicant(){
    this.router.navigateByUrl('/screening');    
  }

}
