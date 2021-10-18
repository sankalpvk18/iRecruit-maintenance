import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  currentRate: any;

  @Input() rating: any;

  constructor() { }

  ngOnInit(): void {
    this.currentRate = this.rating; 
  }

}
