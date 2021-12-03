import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-feedback',
  templateUrl: './dialog-feedback.component.html',
  styleUrls: ['./dialog-feedback.component.scss']
})
export class DialogFeedbackComponent implements OnInit {

  passionValue = 1;
  attitudeValue = 1;
  communicationValue = 1;
  aptiValue = 1;
  domainValue = 1;
  tempramentValue = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
