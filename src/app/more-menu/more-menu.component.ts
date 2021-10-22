import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-more-menu',
  templateUrl: './more-menu.component.html',
  styleUrls: ['./more-menu.component.scss']
})
export class MoreMenuComponent implements OnInit {

  isEditPanelOpen = false
  @Output() onItemCLicked : EventEmitter<any>= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onMenuItemCLicked()  {
    this.onItemCLicked.emit();
  }

  openEditPanel() {
    this.isEditPanelOpen = this.isEditPanelOpen ? false: true;
  }

}
