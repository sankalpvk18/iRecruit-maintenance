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
import * as firebase from 'firebase/compat/app';
import { Location } from '@angular/common'

@Component({
  selector: 'app-create-indent',
  templateUrl: './create-indent.component.html',
  styleUrls: ['./create-indent.component.scss']
})
export class CreateIndentComponent implements OnInit {

  indents: Indents = new Indents();

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
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
   }

  ngOnInit(): void {
    
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
    this.indents.open="true";
    if (this.currentUser != null && this.currentUser.length>0) {
      this.indents.created_by = this.currentUser;
    }
 //   FirebaseDatabaseService.dbPath = '/indents/'+this.currentUser;
    this.db.create(this.indents).then(() => {
      console.log('Created new item successfully!');
    });
  }

 

}
