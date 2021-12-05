import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { FormControl, Validators } from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import Indents from 'src/app/models/Indents';
import { FirebaseDatabaseService } from 'src/app/services/firebase-database.service';
import { Location } from '@angular/common';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';



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
  existingIndentData: Indents = new Indents();
  minDate: Date;
  dueDate: Date;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  currentUser: string;
  skills: string[] = [];
  existingSkills: string[] = [];
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
  existingLocations = new FormControl();

  selectedValue: string;
  existingDate: any;

  manager = [
    "John",
    "Taylor",
    "Brian",
    "Henry",
    "Jason"
  ];

  isEditMode = false;
  sampleData : string[]
  

  //Form Control
  jobRole: FormControl = new FormControl('', Validators.minLength(2));
  vacancies: FormControl = new FormControl('', Validators.minLength(1));
  salary: FormControl = new FormControl('', Validators.minLength(2));
  minWorkEx: FormControl = new FormControl('', Validators.minLength(1));
  reportingManager: FormControl = new FormControl('', Validators.minLength(2));
  department: FormControl = new FormControl('', Validators.minLength(2));
  date: FormControl = new FormControl();


  locationsList: string[] = ['Pune', 'Mumbai', 'Hyderabad', 'Chennai', 'Delhi', 'Gurugram'];
  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  isLoaded: boolean;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor( private db:FirebaseDatabaseService, private location: Location, private route: ActivatedRoute,private _snackBar: MatSnackBar
    ) {
      this.minDate = new Date();
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
  }

  ngOnInit(): void {  
    
    this.route.params.subscribe(params => {
      console.log(params);
      if (params["id"]) {
        this.getExistingIndent(params["id"]);
        this.isEditMode = true;
      }
      else{
        this.isLoaded=true;
            }
    });
  }

  getExistingIndent(id: string) {
    this.db.getParicularIndent(this.db.getCurrentIndentRef(id)).valueChanges().subscribe((data) => {
      this.existingIndent = data;
      let offset = 0;
      if(data.length>12) {
        this.setExistingIndentData(offset+1)
      } else {
        this.setExistingIndentData(offset)
      }
      this.isLoaded = true;
      console.log(this.existingIndent);
    })

  

  }

  setExistingIndentData(offset: number) {
    this.existingSkills = this.existingIndent[10+offset];
    let y:string[]=['Pune', 'Mumbai', 'Hyderabad'];
    // this.existingLocations.setValue(this.existingIndent[5+offset][0]);
    this.existingLocations.setValue(y);
    this.jobRole.setValue(this.existingIndent[9+offset]);
    this.vacancies.setValue(this.existingIndent[11+offset]);
    this.department.setValue(this.existingIndent[3+offset]);
    this.salary.setValue(this.existingIndent[2+offset]);
    this.minWorkEx.setValue(this.existingIndent[6+offset]);
    this.reportingManager.setValue(this.existingIndent[8+offset]);
    // this.date = new FormControl("12/3/2021");
    this.existingDate = new Date(this.existingIndent[4+offset]).toLocaleDateString("en-us");
    // this.date.setValue(new Date(this.existingIndent[4+offset]).toLocaleDateString("en-us"));
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
    this.indents.role = this.jobRole.value;
    this.indents.ctc = this.salary.value;
    this.indents.department = this.department.value;
    this.indents.location = this.locations.value;
    this.indents.vacancies = this.vacancies.value;
    this.indents.skills = this.skills;
    this.indents.min_work_ex = this.minWorkEx.value;
    this.indents.created_on = new Date().getTime();
    this.indents.open=true;
    this.indents.due_date = this.dueDate.getTime();
    this.indents.reportingManager = this.reportingManager.value;
    
    this.currentUser= sessionStorage.getItem("firebaseUserId");

    if (this.currentUser != null && this.currentUser.length>0) {
      this.indents.created_by = this.currentUser;
    }
    this.db.create(this.indents).then(() => {
      this.openSnackBar()
    });
  }

  OnDateChange(date) {
    this.dueDate = date;
  }

  openSnackBar() {
    this._snackBar.open('Indent created successfully!', null, {
      duration: 0.7*1000,
      verticalPosition: this.verticalPosition
    });
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