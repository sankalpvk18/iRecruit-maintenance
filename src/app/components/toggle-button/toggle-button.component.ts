import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements OnInit {

  @Output() statusToggle: EventEmitter<any> = new EventEmitter();
  @Input() isOpen: any;

  // isOpen = 'true';

  constructor() { }

  ngOnInit(): void {
    this.isOpen = this.isOpen ? "true" : "false";
  }

  setToggle(isOpen: string) : string {
    this.statusToggle.emit(isOpen ? true : false);
    return isOpen ? "Open" : "Closed";
  }

}
