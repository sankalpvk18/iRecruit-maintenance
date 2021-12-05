import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase/compat';
import { map } from 'rxjs/operators';
import Applications from 'src/app/models/Applications';
import { FirebaseDatabaseService } from 'src/app/services/firebase-database.service';


@Component({
  selector: 'app-indent-details-list-item',
  templateUrl: './indent-details-list-item.component.html',
  styleUrls: ['./indent-details-list-item.component.scss'],
})
export class IndentDetailsListItemComponent implements OnInit {


  isLoaded = false;
  @Input() requiredSkills = []

  applicantsDetails: any = [];
  applicants : any = [];
  applicantsData = [];

  firstRound = [];
  secondRound = [];
  thirdRound = [];
  rejectedProfiles= [];

  currentRate = 0;
  indentBy: string;
  indentId: string;
  cloneApplicant: Applications;
  



  constructor(config: NgbRatingConfig , public db:FirebaseDatabaseService, private _Activatedroute:ActivatedRoute) {
    config.max = 5;
   }

  ngOnInit(): void {
    // this.applicants = [];
    // this.indentBy=this._Activatedroute.snapshot.paramMap.get("by");
    // this.indentId=this._Activatedroute.snapshot.paramMap.get("id");

    this._Activatedroute.params.subscribe(params => {
      console.log(params);
      this.indentId=params["id"];
      this.indentBy=params["by"];
    });

    console.log(this.indentBy+"  "+this.indentId);
    this.getApplicants();
  }
  getExistingIndent(arg0: any) {
    throw new Error('Method not implemented.');
  }

  drop(event: CdkDragDrop<string[]>, dropOnto: string) {
    console.log(event.item.dropContainer.data);
    // switch(dropOnto) {
    //   case 'applicants':
    //     updateApplicantsList();
    //     break;
    //   case 'first':
    //     break;
    //   case 'second':
    //     break;
    //   case 'third':
    //     break;
    //   case 'rejected':
    //     break;
    // }
    this.updateApplicantsList(event.previousContainer.data, event.previousContainer.id, dropOnto);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  updateApplicantsList(data: any, dropFrom: string, dropOnto: string) {
    switch(dropOnto) {
      case 'applicants':
        const none = {
          moved_1: null,
          moved_2:null,
          moved_3:null,
          status: "none",
        }
        
       this.db.update("/" + this.indentId+"/applications/"+data[0].key, none);
        break;
      case 'first':
        const first = {
          moved_1: new Date(),
          moved_2:null,
          moved_3:null,
          status: "first",
        }
        
       this.db.update("/" + this.indentId+"/applications/"+data[0].key, first);
       this.db.update("/"+this.indentId+"/first/"+data[0].key,data[0]);
        break;
      case 'second':
        const second = {
          moved_1: null,
          moved_2:new Date(),
          moved_3:null,
          status: "second",
        }
        
       this.db.update("/" + this.indentId+"/applications/"+data[0].key, second);
       this.db.update("/"+this.indentId+"/second/"+data[0].key,data[0]);
        break;
      case 'third':
        const third = {
          moved_1: null,
          moved_2:null,
          moved_3: new Date(),
          status: "third",
        }
        
       this.db.update("/" + this.indentId+"/applications/"+data[0].key, third);
       this.db.update("/"+this.indentId+"/third/"+data[0].key,data[0]);
        break;
      }
      
    switch(dropFrom){
      case 'cdk-drop-list-1':

        this.db.delete('/'+this.indentId+"/first/"+data[0].key).then(()=>{
          window.location.reload();
        })
        break;
      case 'cdk-drop-list-2':
        this.db.delete('/'+this.indentId+"/second/"+data[0].key).then(()=>{
          window.location.reload();
        });
        break;
      case 'cdk-drop-list-3':
        this.db.delete('/'+this.indentId+"/third/"+data[0].key).then(()=>{
          window.location.reload();
        });
        break;  
    }

    

  }

  getApplicants(){
    this.db.getAllApplications(this.db.getCurrentUserIDRef(this.indentBy, this.indentId)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.applicantsDetails = data;
      this.setApplicantCategory(this.applicantsDetails);
      console.log(this.applicantsDetails);
    });

  }

  setApplicantCategory(applicantsDetails: any) {
    applicantsDetails.map((applicant) => {
      switch(applicant.status) {
        case "none":
          this.applicants.push(applicant);
          break;
        case "first":
          this.firstRound.push(applicant);
          break;
        case "second":
          this.secondRound.push(applicant);
          break;
        case "third":
          this.thirdRound.push(applicant);
          break;
        case "rejected":
          this.rejectedProfiles.push(applicant);
          break;
      }
      this.isLoaded = true;
    })
    console.log(this.applicants);
    console.log(this.firstRound);
    console.log(this.secondRound);
    console.log(this.thirdRound);
  }

}


