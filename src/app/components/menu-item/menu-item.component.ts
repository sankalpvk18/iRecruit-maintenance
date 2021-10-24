import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  constructor() { }
  @Output() onItemCLicked : EventEmitter<any>= new EventEmitter();
  @Output() onOutsideClick : EventEmitter<any>= new EventEmitter();

  ngOnInit(): void {
  }

  onEdit(){
    this.onItemCLicked.emit(true);
  }

  onClickedOutside(event) {
    this.onOutsideClick.emit()
  }

}
