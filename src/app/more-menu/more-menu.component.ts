import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-more-menu',
  templateUrl: './more-menu.component.html',
  styleUrls: ['./more-menu.component.scss']
})
export class MoreMenuComponent implements OnInit {

  isEditPanelOpen = false
  @Input() onParentDetectOutsideClick : boolean;
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

  ngOnChanges(changes: SimpleChanges) {
    // if (this.onParentDetectOutsideClick) {
    //   this.openEditPanel()
    // }
    // this.isEditPanelOpen = !this.onParentDetectOutsideClick;
    // this.onParentDetectOutsideClick = false;
  }

  onClickedOutside(event) {
    this.isEditPanelOpen = this.isEditPanelOpen ? false: true;
  }

}
