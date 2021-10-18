import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import Applications from '../../models/Applications';
import { FirebaseDatabaseService } from 'src/app/services/firebase-database.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  application: Applications=new Applications();

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  jobRole: string;
  indentId: string;
  indentBy:string;
  indentOpen: string;
  skills: string[] = [];
  allSkills: string[] = [
    'HTML',
    'JS',
    'Angular',
    'Spring Boot',
    'Java',
    'CSS',
    'Python',
    'Agile',
    'Git (version control)'
  ];

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  // @ViewChild('ref') ref: MatDialogRef<any>;

  constructor(
    private _Activatedroute:ActivatedRoute, 
    private db:FirebaseDatabaseService,
    public dialog: MatDialog) {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
  }

  ngOnInit(): void {
    this.jobRole=this._Activatedroute.snapshot.paramMap.get("jobRole");
    this.indentId=this._Activatedroute.snapshot.paramMap.get("id");
    this.indentBy=this._Activatedroute.snapshot.paramMap.get("by");
    this.indentOpen=this._Activatedroute.snapshot.paramMap.get('open');
    console.log(typeof this.indentOpen);

    if(this.indentOpen=="false"){
      this.openDialog();
    }

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.skills.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.skillCtrl.setValue(null);
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  createApplication(){
    this.application.skills = this.skills;
    this.application.applied_on = new Date().getTime();
    this.application.rating=0;
    this.application.status="none";
   // FirebaseDatabaseService.dbPath = '/indents/'+this.indentBy+'/'+this.indentId+'/applications';
    // this.db.setRef(this.indentBy+"/"+this.indentId+"/applications");
    this.db.createApplication(this.application).then(() => {
      console.log('Created new item successfully!');
    });
  }



  
    openDialog() {
      const dialogRef = this.dialog.open(DialogComponent);
      dialogRef.disableClose = true;
    }

  
}
