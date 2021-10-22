import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationStrategy } from '@angular/common'

@Component({
  selector: 'app-indent-list-item',
  templateUrl: './indent-list-item.component.html',
  styleUrls: ['./indent-list-item.component.scss']
})
export class IndentListItemComponent implements OnInit {

  @Input() indents: any = [];
  @Output() applicationURLCopied: EventEmitter<any> = new EventEmitter();
  @Output() onToggleSwitched: EventEmitter<any> = new EventEmitter();

  arrIndents = [];
  isEditPanelOpen= false;

  constructor(private router:Router, private loction: Location, private locationStrategy: LocationStrategy) { }

  ngOnInit(): void {
    if(this.indents != null) {
      console.log(this.indents);
      this.arrIndents = Array.from(this.indents)
    }
  }

  ngAfterViewInit() {
    if(this.indents != null) {
      console.log(this.indents);
    }
  }

  getDate(date) : Date {
    return new Date(date);
  }

  onIndentClicked(){
    this.router.navigateByUrl('/indentdetails')
  }

  onToggle(event: any) {
    this.onToggleSwitched.emit(event);
  }

  onItemCLicked(indent: any){
    this.router.navigate(["createindent", { id: indent.key }]);
  }
  createApplicationUrl(indent:any): string{
    var url = window.location.origin;
    return url+'/application'+'/'+ indent.role +'/'+ indent.key+'/'+ indent.created_by+'/'+indent.open;
  }

  onCopyClicked() {
    this.applicationURLCopied.emit("sdf");
  }

  openEditPanel() {
    this.isEditPanelOpen = this.isEditPanelOpen ? false: true;
  }

}
