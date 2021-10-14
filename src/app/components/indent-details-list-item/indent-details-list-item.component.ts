import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indent-details-list-item',
  templateUrl: './indent-details-list-item.component.html',
  styleUrls: ['./indent-details-list-item.component.scss']
})
export class IndentDetailsListItemComponent implements OnInit {

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

  firstRound = [];

  secondRound = []

  thirdRound = []

  constructor() { }

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

}
