import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { FirebaseDatabaseService } from 'src/app/services/firebase-database.service';

@Component({
  selector: 'app-indent-details-list-item',
  templateUrl: './indent-details-list-item.component.html',
  styleUrls: ['./indent-details-list-item.component.scss']
})
export class IndentDetailsListItemComponent implements OnInit {


  isLoaded = false;

  applicantsDetails: any = [];

  // rejectedProfiles = [
  //   'Jorge Wheeler',
  //   'James Conway',
  //   'Elizabeth Simpson',
  //   'Mark Jennings',
  //   'Kara Drake',
  //   'Lindsay Hudson',
  //   'Erica Willis',
  //   // 'Brian Clark',
  //   // 'Danny Jones',
  //   // 'Brian Horton',
  //   // 'Aaron Horn',
  //   // 'Jennifer Wilson',
  //   // 'Brian Fernandez',
  //   // 'Lindsay Mccarthy',
  //   // 'Jennifer Daniels'
  // ];

  applicants : any = [];
  applicantsData = [];

  firstRound = [];
  secondRound = [];
  thirdRound = [];
  rejectedProfiles= [];

  currentRate = 0;
  indentBy: string;
  indentId: string;
  



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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
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
        case "firstRound":
          this.firstRound.push(applicant);
          break;
        case "secondRound":
          this.secondRound.push(applicant);
          break;
        case "thirdRound":
          this.thirdRound.push(applicant);
          break;
        default:
          this.applicants.push(applicant);
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


