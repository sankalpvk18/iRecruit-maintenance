import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { FormControl } from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import Indents from 'src/app/models/Indents';
import { FirebaseDatabaseService } from 'src/app/services/firebase-database.service';
import { Location } from '@angular/common';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-create-indent',
  templateUrl: './create-indent.component.html',
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: {
      parse: {
        dateInput: 'LL',
      },
      display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
      },
    }},
  ],
  styleUrls: ['./create-indent.component.scss']
})
export class CreateIndentComponent implements OnInit {

  indents: Indents = new Indents();
  minDate: Date;
  date = new FormControl();
  dueDate: Date;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  currentUser: string;
  skills: string[] = [];
  existingIndent: any = [];
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
  locations = new FormControl();


  locationsList: string[] = ['Pune', 'Mumbai', 'Hyderabad', 'Chennai', 'Delhi', 'Gurugram'];
  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  isLoaded: boolean;
  constructor(private router:Router, private db:FirebaseDatabaseService, private location: Location, private route: ActivatedRoute,
    ) {
      this.minDate = new Date();
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
   }

  ngOnInit(): void {
    this.date = new FormControl();
    this.route.params.subscribe(params => {
      console.log(params);
      if (params["id"]) {
        this.getExistingIndent(params["id"]);
      }
    });
  }

  getExistingIndent(id: string) {
    this.db.getParicularIndent(this.db.getCurrentIndentRef(id)).valueChanges().subscribe((data) => {
      this.existingIndent = data;
      // this.isLoaded = true;
      console.log(this.existingIndent);
      this.indents.role = this.existingIndent[7];
      this.indents.vacancies = this.existingIndent[5];
      this.indents.department = this.existingIndent[3];
      this.indents.ctc = this.existingIndent[2];
      this.indents.min_work_ex = this.existingIndent[9];
      this.skills = this.existingIndent[8];
      this.locations.setValue(this.existingIndent[4]);
    })
  }

  onBack(){
    // this.router.navigateByUrl('/home');
    this.location.back();
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

  createIndent(): void {
    this.indents.location = this.locations.value;
    this.indents.skills = this.skills;
    this.indents.created_on = new Date().getTime();
    this.indents.open=true;
    this.indents.due_date = this.dueDate.getTime();
    
    this.currentUser= sessionStorage.getItem("firebaseUserId");

    if (this.currentUser != null && this.currentUser.length>0) {
      this.indents.created_by = this.currentUser;
    }
    this.db.create(this.indents).then(() => {
      console.log('Created new item successfully!');
    });
  }

  OnDateChange(date) {
    this.dueDate = date;
  }

}

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

