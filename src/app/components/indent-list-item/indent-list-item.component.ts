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

    sessionStorage.setItem("indent_role", indent.role);
    sessionStorage.setItem("indent_department", indent.department);
    sessionStorage.setItem("indent_created_on", indent.created_on);
    sessionStorage.setItem("indent_skills", JSON.stringify(indent.skills))
    sessionStorage.setItem("indent_vacancies", indent.vacancies);
    

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

  onReject(indent){
    this.router.navigate(['rejected', {id: indent.key, by: indent.created_by}]);
  }

  getLength(indent: any, type: string){
    let arr = [];

    switch(type)
    {
      case 'applications':
        if(indent.applications != null) {
          for(let key in indent.applications){  
            arr.push(key);  
          }
        }
        break;
      case 'first':
        if(indent.first != null) {
          for(let key in indent.first){  
            arr.push(key);  
          }
        }
        break;
      case 'second':
        if(indent.second != null) {
          for(let key in indent.second){  
            arr.push(key);  
          }
        }
        break;
      case 'third':
        if(indent.third != null) {
          for(let key in indent.third){  
            arr.push(key);  
          }
        }
        break;
      case 'rejected':
        if(indent.rejected != null) {
          for(let key in indent.rejected){  
            arr.push(key);  
          }
        }
        break;  
       case 'hired':
        if(indent.hired != null) {
          for(let key in indent.hired){  
            arr.push(key);  
          }
        }
        break;       
    }
   
    if(arr !=null){
      return arr.length;
    }
    else{
      return 0;
    }
    
  }

}
