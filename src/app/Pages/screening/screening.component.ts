import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import { merge } from 'rxjs';
import { CalendarViewComponent } from 'src/app/components/calendar-view/calendar-view.component';
import { DialogFeedbackComponent } from 'src/app/components/dialog-feedback/dialog-feedback.component';
import Applicant from 'src/app/models/Applicant';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.scss']
})
export class ScreeningComponent implements OnInit {

  screeningData: any;
  matchedSkills = [];
  unmatchSkills = [];
  extraSkills= [];
  skills = [];

  tempData = {
    "requiredSkills": [
            "HTML",
            "SQL",
            "Android",
            "CSS"
    ],
    "applicantDetails": {
        "key": "-MoYXw9n6e6hqL4GK_8d",
        "applied_on": 1636978901834,
        "ctc": 450000,
        "email": "sukalp18@gmail.com",
        "name": "Sukalp Tripathi",
        "phone": 7978961229,
        "photo": "https://firebasestorage.googleapis.com/v0/b/irecruit-331eb.appspot.com/o/Images%2F1636978834785?alt=media&token=d7cf0c37-37d0-4b2f-ba99-f68a9e38db64",
        "rating": 0,
        "resume": "https://firebasestorage.googleapis.com/v0/b/irecruit-331eb.appspot.com/o/Resume%2F1636978841744?alt=media&token=a5e8fada-8568-4d33-8c1a-325321d6a677",
        "skills": [
            "HTML",
            "Java",
            "Agile"
        ],
        "status": "none",
        "work_ex": 3
    },
    "accessToken": ""
  }
  

  constructor(private router: Router,public dialog: MatDialog, private route: ActivatedRoute) { 
    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation.extras.state as {
    //   requiredSkills: any,
    //   applicantDetails: Applicant,
    // };

    // this.screeningData=state;
    // this.setSkillsMatched(this.screeningData.requiredSkills, this.screeningData.applicantDetails.skills);
    // console.log("screedning data - " + this.screeningData);
  }

  ngOnInit(): void {
    let token = this.route.snapshot.paramMap.get('accessToken');
    if(token) {
      this.openDialog();
    }
    this.screeningData = this.tempData;
    this.setSkillsMatched(this.tempData.requiredSkills, this.tempData.applicantDetails.skills);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CalendarViewComponent);
    dialogRef.disableClose = true;
  }

  setSkillsMatched(required: string[], posses: string[]) {
    

    let allSkills = [...required, ...posses];
    
        for(var skill in required){
          var count=0;
          for(var eachskill in allSkills){
            if(required[skill]== allSkills[eachskill]){
                 count++;
            }
           }  
           if(count>1){
              this.matchedSkills.push(required[skill]);
           }
           if(count==1){
              this.unmatchSkills.push(required[skill]);
           }
        }

        for(var _skill_ in posses){
          var count=0;
          for(var _eachSkill_ in allSkills){
              if(posses[_skill_]==allSkills[_eachSkill_]){
                  count++;
              }
          }
          if(count==1){
              this.extraSkills.push(posses[_skill_]);
          }
        }
    
    this.skills = [...this.matchedSkills, ...this.unmatchSkills, ...this.extraSkills];
    console.log("universe: " + allSkills);    
    console.log("matched: " + this.matchedSkills);
    console.log("un-matched: " +this.unmatchSkills);
    console.log("extra: " +this.extraSkills);
    console.log("Sdsdf");
  }

  onBack(){
    this.router.navigateByUrl('/indents');
  }

  onReject(){
    this.dialog.open(DialogFeedbackComponent);
  }

  onArchive(){
    this.dialog.open(DialogFeedbackComponent);
  }

  getMatchingPercentage() : number {
    if(this.screeningData.requiredSkills.length>0) {
      return (this.matchedSkills.length/this.screeningData.requiredSkills.length)*100;
    }
    return 0;
  }

  openResume(){
    window.open(this.screeningData.applicantDetails.resume,'_blank');
  }

  getSkillClass(skill: string) : string {
    for(var item of this.matchedSkills) {
      if(skill == item) {
        return 'skill-item--matched';
      }
    }

    for(var item of this.unmatchSkills) {
      if(skill == item) {
        return 'skill-item--unmatched';
      }
    }

    for(var item of this.extraSkills) {
      if(skill == item) {
        return 'skill-item--extra';
      }
    }
    return "none";
  }

  scheduleEvent() {
    this.fetchAccessToken();
  }

  fetchAccessToken() {


    var redirectURL = "https://accounts.google.com/o/oauth2/v2/auth?" 
    + "scope=https://www.googleapis.com/auth/calendar+https://www.googleapis.com/auth/calendar.events&"
    + "access_type=online&"
    + "include_granted_scopes=true&"
    + "response_type=code&"
    + "state=hey&"
    + "redirect_uri=http://localhost:4200/auth&"
    + "client_id=959162043529-4l0a64ou7ninndoeu0mh2sqt6cgkk54r.apps.googleusercontent.com";

    window.location.href = redirectURL;
  }

  public Callback(code: string, error: string, state: string) {
    console.log("code by google is - " + code);
  }

}
