import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router ,NavigationExtras} from '@angular/router';
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
  isOutsideClicked = false;

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

  getOpenSince(date) : number {
    let currentDate = new Date();
    let dateSent = new Date(date);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  getDate(date) : Date {
    return new Date(date);
  }

  onIndentClicked(indent){
    const navigationExtras: NavigationExtras = {
      state: {
        department: indent.department,
        vacancies: indent.vacancies,
        created_on: indent.created_on,
        role: indent.role
      }
    }

    this.router.navigate(['indentdetails', {id: indent.key, by: indent.created_by}],navigationExtras);
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

  setPanelVisibilty() {
    this.isOutsideClicked = !this.isOutsideClicked;
  }

}
