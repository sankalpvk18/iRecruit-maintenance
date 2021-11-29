import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
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
  

  constructor(private router: Router,public dialog: MatDialog, private route: ActivatedRoute, private httpClient: HttpClient) { 
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
    this.screeningData = this.tempData;
    let token = this.route.snapshot.paramMap.get('accessToken');
    if(token) {
      localStorage.setItem('access_token',token);
      this.openDialog();
      // this.createEvent(token);
    }
    this.setSkillsMatched(this.tempData.requiredSkills, this.tempData.applicantDetails.skills);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CalendarViewComponent, {
        data: this.screeningData.applicantDetails.email
    });
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
    // this.openDialog();
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

  createEvent(accessToken: string) {
    var event = {
      'summary': 'Google I/O 2015',
      'location': '800 Howard St., San Francisco, CA 94103',
      'description': 'A chance to hear more about Google\'s developer products.',
      'start': {
        'dateTime': '2021-11-30T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      },
      'end': {
        'dateTime': '2021-11-30T17:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      },
      'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
      ],
      'attendees': [
        {'email': 'sukalp18@gmail.com'},
        {'email': 'sankalpvk18@gmail.com'}
      ],
      'reminders': {
        'useDefault': false
      }
    };
    

    var resource = {
      "summary": "Appointment",
      "location": "Somewhere",
      "start": {
        "dateTime": "2021-12-20T10:00:00.000-07:00"
      },
      "end": {
        "dateTime": "2021-12-20T10:25:00.000-07:00"
        }
      };

    let param = new HttpParams();
    param = param.set('key', 'AIzaSyBl4jUf3i5tL_Vu3QdSVRsWv30qC7h6gGM');

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + accessToken,
      'Accept': 'application/json',
      'Content-type': 'application/json' }),
      params: param
    };

    const body = event;

    this.httpClient.post<any>('https://www.googleapis.com/calendar/v3/calendars/primary/events', body, httpOptions).subscribe(data => {
      console.log(data);
    });

  }

}
