import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarViewComponent } from 'src/app/components/calendar-view/calendar-view.component';
import { DialogFeedbackComponent } from 'src/app/components/dialog-feedback/dialog-feedback.component';
import Applications from 'src/app/models/Applications';
import { FirebaseDatabaseService } from 'src/app/services/firebase-database.service';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.scss']
})
export class ScreeningComponent implements OnInit {

  screeningData: any;
  matchedSkills = [];
  unmatchSkills = [];
  extraSkills = [];
  skills = [];

  required_skills = [];
  applicantDetails: Applications;
  applicant_skills = [];
  indent_created_on: any;
  moved_on:any;
  application_state:string;

 

  states = ['None', 'First Round', 'Second Round', 'Contract Proposed'];
  state = new FormControl("", Validators.required);

  constructor(private router: Router, 
    public dialog: MatDialog, 
    private route: ActivatedRoute, 
    private httpClient: HttpClient,
    private db:FirebaseDatabaseService) {
    

    this.required_skills = JSON.parse(sessionStorage.getItem("indent_skills"));
    this.applicantDetails = JSON.parse(sessionStorage.getItem("applicantDetails"));
    this.applicant_skills = JSON.parse(sessionStorage.getItem("applicantSkill"));
    this.indent_created_on=sessionStorage.getItem("indent_created_on");
    this.setSkillsMatched(this.required_skills, this.applicant_skills);
  }

  ngOnInit(): void {
    
    let token = this.route.snapshot.paramMap.get('accessToken');
    if (token) {
      localStorage.setItem('access_token', token);
      this.openDialog();
    
    }
    


  }

  ngAfterViewInit() {
    //window.location.reload();
  }
  openDialog() {
    const dialogRef = this.dialog.open(CalendarViewComponent, {
      data: this.applicantDetails.email
    });
  }

  setSkillsMatched(required: string[], posses: string[]) {


    let allSkills = [...required, ...posses];

    for (var skill in required) {
      var count = 0;
      for (var eachskill in allSkills) {
        if (required[skill] == allSkills[eachskill]) {
          count++;
        }
      }
      if (count > 1) {
        this.matchedSkills.push(required[skill]);
      }
      if (count == 1) {
        this.unmatchSkills.push(required[skill]);
      }
    }

    for (var _skill_ in posses) {
      var count = 0;
      for (var _eachSkill_ in allSkills) {
        if (posses[_skill_] == allSkills[_eachSkill_]) {
          count++;
        }
      }
      if (count == 1) {
        this.extraSkills.push(posses[_skill_]);
      }
    }

    this.skills = [...this.matchedSkills, ...this.unmatchSkills, ...this.extraSkills];

  }

  onBack() {
    sessionStorage.removeItem("indent_skills");
    sessionStorage.removeItem("applicantDetails");
    sessionStorage.removeItem("applicantSkill");
    this.router.navigateByUrl('/indents');
  }

  onReject() {
   
    const dialogRef = this.dialog.open(DialogFeedbackComponent, {
      data: this.applicantDetails

    });
    dialogRef.disableClose = true;
  }

  getMatchingPercentage(): number {
    if (this.required_skills.length > 0) {
      return (this.matchedSkills.length / this.required_skills.length) * 100;
    }
    return 0;
  }

  openResume() {
    window.open(this.applicantDetails.resume, '_blank');
  }

  getSkillClass(skill: string): string {
    for (var item of this.matchedSkills) {
      if (skill == item) {
        return 'skill-item--matched';
      }
    }

    for (var item of this.unmatchSkills) {
      if (skill == item) {
        return 'skill-item--unmatched';
      }
    }

    for (var item of this.extraSkills) {
      if (skill == item) {
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
        { 'email': 'sukalp18@gmail.com' },
        { 'email': 'sankalpvk18@gmail.com' }
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
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }),
      params: param
    };
    const body = event;

    this.httpClient.post<any>('https://www.googleapis.com/calendar/v3/calendars/primary/events', body, httpOptions).subscribe(data => {
      console.log(data);
    });

  }

  getStatus(status: string) {
    switch (status) {
      case 'none':
        this.application_state="NA";
        return 'Applied'
      case 'first':
        this.application_state="Application moved to round first on"
        this.moved_on=this.applicantDetails.moved_1;
        return 'First Round'
      case 'second':
        this.application_state="Application moved to round second on"
        this.moved_on=this.applicantDetails.moved_2;
        return 'Second Round'
      case 'third':
        this.application_state="Contract proposed on"
        this.moved_on=this.applicantDetails.moved_3;
        return 'Contract Proposed'
      case 'rejected':
        this.application_state="Applicant rejected on"
        this.moved_on=this.applicantDetails.rejected_on;
        return 'Rejected'
      case 'hired':
        this.application_state="Applicant hired on"
        this.moved_on=this.applicantDetails.hired_on;
        return 'Hired';
    }
    return null;
  }

  selectStatus(event) {
    switch(event.value){
      case "None":
        const none = {
          moved_1: null,
          moved_2:null,
          moved_3:null,
          status: "none",
        }
        
       this.db.update("/" + this.applicantDetails.indent_id+"/applications/"+this.applicantDetails.key, none);
       this.db.delete('/'+this.applicantDetails.indent_id+"/second/"+this.applicantDetails.key);
       this.db.delete('/'+this.applicantDetails.indent_id+"/third/"+this.applicantDetails.key);
       this.db.delete('/'+this.applicantDetails.indent_id+"/first/"+this.applicantDetails.key);
       this.db.delete('/'+this.applicantDetails.indent_id+"/rejected/"+this.applicantDetails.key);

       

      break;
      case "First Round":
        const first = {
          moved_1: new Date(),
          moved_2:null,
          moved_3:null,
          status: "first",
        }
        
       this.db.update("/" + this.applicantDetails.indent_id+"/applications/"+this.applicantDetails.key, first);
       this.db.update("/"+this.applicantDetails.indent_id+"/first/"+this.applicantDetails.key,this.applicantDetails);
       this.db.delete('/'+this.applicantDetails.indent_id+"/second/"+this.applicantDetails.key);
       this.db.delete('/'+this.applicantDetails.indent_id+"/third/"+this.applicantDetails.key);
       this.db.delete('/'+this.applicantDetails.indent_id+"/rejected/"+this.applicantDetails.key);
       
       
       break;
      case "Second Round":
        const second = {
          moved_1: null,
          moved_2:new Date(),
          moved_3:null,
          status: "second",
        }
        
        this.db.update("/" + this.applicantDetails.indent_id+"/applications/"+this.applicantDetails.key, second);
        this.db.update("/"+this.applicantDetails.indent_id+"/second/"+this.applicantDetails.key,this.applicantDetails);
       
        this.db.delete('/'+this.applicantDetails.indent_id+"/third/"+this.applicantDetails.key);
        this.db.delete('/'+this.applicantDetails.indent_id+"/first/"+this.applicantDetails.key);
        this.db.delete('/'+this.applicantDetails.indent_id+"/rejected/"+this.applicantDetails.key);
        break;
      case "Contract Proposal":
        const third = {
          moved_1: null,
          moved_2:null,
          moved_3: new Date(),
          status: "third",
        }
        
       this.db.update("/" + this.applicantDetails.indent_id+"/applications/"+this.applicantDetails.key, third);
       this.db.update("/"+this.applicantDetails.indent_id+"/third/"+this.applicantDetails.key,this.applicantDetails);

       this.db.delete('/'+this.applicantDetails.indent_id+"/second/"+this.applicantDetails.key);
       this.db.delete('/'+this.applicantDetails.indent_id+"/first/"+this.applicantDetails.key);
       this.db.delete('/'+this.applicantDetails.indent_id+"/rejected/"+this.applicantDetails.key);
       break;      
    }

    window.location.reload();
    
  }


  onHire(){
    const obj = {
      hired_on: new Date(),
      status: "hired",
     
    }

   this.db.update("/" + this.applicantDetails.indent_id+"/applications/"+this.applicantDetails.key, obj);
   this.db.update("/"+this.applicantDetails.indent_id+"/hired/"+this.applicantDetails.key,this.applicantDetails);
   
   
   // delete the other states
   this.db.delete('/'+this.applicantDetails.indent_id+"/second/"+this.applicantDetails.key);
   this.db.delete('/'+this.applicantDetails.indent_id+"/third/"+this.applicantDetails.key);
   this.db.delete('/'+this.applicantDetails.indent_id+"/first/"+this.applicantDetails.key);
   this.db.delete('/'+this.applicantDetails.indent_id+"/rejected/"+this.applicantDetails.key);

    window.location.reload();
    

    
  }

}
