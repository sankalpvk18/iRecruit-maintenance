import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {finalize, map, startWith} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import Applications from '../../models/Applications';
import { FirebaseDatabaseService } from 'src/app/services/firebase-database.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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

  downloadURL: Observable<string>;
  imageURL ;
  resumeURL;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  // @ViewChild('ref') ref: MatDialogRef<any>;

  constructor(
    private _Activatedroute:ActivatedRoute, 
    private db:FirebaseDatabaseService,
    public dialog: MatDialog,
    private storage: AngularFireStorage,
    private _snackBar: MatSnackBar) {
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
    this.application.indent_id=this.indentId;
    this.application.applied_on = new Date().getTime();
    this.application.rating=0;
    this.application.status="none";
    this.application.photo=this.imageURL;
    this.application.resume=this.resumeURL;
  


    this.db.createApplication(this.application,this.db.getCurrentUserIDRef(this.indentBy,this.indentId)).then(() => {
      this._snackBar.open("Application received!", null, {
        duration: 0.3*1000,
        verticalPosition: this.verticalPosition
      });
    });
  }


    
  
    openDialog() {
      const dialogRef = this.dialog.open(DialogComponent);
      dialogRef.disableClose = true;
    }

    onImageSelected(event){
      var n = Date.now();
      const file = event.target.files[0];
      const filePath = `Images/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`Images/${n}`, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                this.imageURL = url;
              }
              console.log(this.imageURL);
            });
          })
        )
        .subscribe(url => {
          if (url) {
            this.openSnackBar("Image uploaded successfully!")
          }
        });
    }

    onFileSelected(event){
      var n = Date.now();
      const file = event.target.files[0];
      const filePath = `Resume/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`Resume/${n}`, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                this.resumeURL = url;
              }
              console.log(this.resumeURL);
            });
          })
        )
        .subscribe(url => {
          if (url) {
            this.openSnackBar("Resume uploaded successfully!")
          }
        });
    }
    
    openSnackBar(msg:string) {
      this._snackBar.open(msg, null, {
        duration: 0.7*1000,
        verticalPosition: this.verticalPosition
      });
    }

    
}
