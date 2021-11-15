import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements OnInit {

  @Output() statusToggle: EventEmitter<any> = new EventEmitter();
  @Input() isOpen: any = null;
  isToggleOn: boolean;
  isValuePresent = false;

  // isOpen = 'true';

  constructor() { }

  ngOnInit(): void {
    if(this.isOpen != null) {
      this.isToggleOn = this.isOpen == true ? true : false;
      this.isValuePresent = true;
    }
  }

  setToggle(isToggleOn: boolean) : string {
    // this.statusToggle.emit(isToggleOn ? true : false);
    // if(this.isOpen != null && this.isOpen == !this.isOpen) {
    //   this.statusToggle.emit(isToggleOn ? true : false);
    // }
    return isToggleOn ? "Open" : "Closed";
  }

}
