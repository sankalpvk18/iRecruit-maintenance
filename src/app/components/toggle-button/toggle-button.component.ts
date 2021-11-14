import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements OnInit {

  @Output() statusToggle: EventEmitter<any> = new EventEmitter();
  @Input() isOpen: any = null;
  isToggleOn = false;
  isValuePresent = false;

  // isOpen = 'true';

  constructor() { }

  ngOnInit(): void {
    if(this.isOpen != null) {
      this.isToggleOn = this.isOpen == 'true' ? true : false;
      this.isValuePresent = true;
    }
    // this.isOpen = this.isOpen ? "true" : "false";
  }

  setToggle(isToggleOn: boolean) : string {
    this.statusToggle.emit(isToggleOn ? true : false);
    return isToggleOn ? "Open" : "Closed";
  }

}
