import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements OnInit {

  isOpen = 'true';

  constructor() { }

  ngOnInit(): void {
  }

  setToggle(isOpen: string) : string {
    return isOpen ? "Open" : "Closed";
  }

}
