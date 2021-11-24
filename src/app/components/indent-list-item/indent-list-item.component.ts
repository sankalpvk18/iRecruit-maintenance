import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router ,NavigationExtras} from '@angular/router';
import { Location, LocationStrategy } from '@angular/common'
import { FirebaseDatabaseService } from 'src/app/services/firebase-database.service';

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
  applications=[];

  constructor(private router:Router, private loction: Location, private locationStrategy: LocationStrategy, private db:FirebaseDatabaseService
    ) { }

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
        role: indent.role,
        skills: indent.skills
      }
    }

    this.router.navigate(['indentdetails', {id: indent.key, by: indent.created_by}],navigationExtras);
  }

  onToggle(event: any) {
    this.onToggleSwitched.emit(event);
  }

  onToggleClicked(indent: any) {
    const obj = {
      open: !indent.open
    }
   this.db.update("/" + indent.key, obj);
   window.location.reload();
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

  getLength(indent: any){
    console.log(indent.applications);
    let arr = [];
    if(indent.applications != null) {
      // arr = Object.keys(indent.applications).map(function(key){  
      //   this.applications.push(key)  
      //   return this.applications;  
      // });

      for(let key in indent.applications){  
        arr.push(key);  
      }
    }
     
    if(arr !=null){
      return arr.length;
    }
    else{
      return 0;
    }
    
  }

}
