import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { CalendarViewComponent } from 'src/app/components/calendar-view/calendar-view.component';
import { DialogFeedbackComponent } from 'src/app/components/dialog-feedback/dialog-feedback.component';
import Applications from 'src/app/models/Applications';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.scss']
})
export class RejectedComponent implements OnInit {

  applicantDetails:Applications;

  // tempData = {
  //   "requiredSkills": [
  //           "HTML",
  //           "SQL",
  //           "Android",
  //           "CSS"
  //   ],
  //   "applicantDetails": {
  //       "key": "-MoYXw9n6e6hqL4GK_8d",
  //       "indent_id":"-MoYX6o2gO-QTIKspVw7",
  //       "applied_on": 1636978901834,
  //       "ctc": 450000,
  //       "email": "sukalp18@gmail.com",
  //       "name": "Sukalp Tripathi",
  //       "phone": 7978961229,
  //       "photo": "https://firebasestorage.googleapis.com/v0/b/irecruit-331eb.appspot.com/o/Images%2F1636978834785?alt=media&token=d7cf0c37-37d0-4b2f-ba99-f68a9e38db64",
  //       "rating": 0,
  //       "resume": "https://firebasestorage.googleapis.com/v0/b/irecruit-331eb.appspot.com/o/Resume%2F1636978841744?alt=media&token=a5e8fada-8568-4d33-8c1a-325321d6a677",
  //       "skills": [
  //           "HTML",
  //           "Java",
  //           "Agile"
  //       ],
  //       "status": "none",
  //       "work_ex": 3
  //   },
  //   "accessToken": ""
  // }
  

  constructor(private router: Router,public dialog: MatDialog, private route: ActivatedRoute, private httpClient: HttpClient) { 
    
  }

  ngOnInit(): void {
  }

  onBack(){
    this.router.navigateByUrl('/indents');
  }

  getMatchingPercentage() : number {
    return 0;
  }

  openResume(){
    window.open(this.applicantDetails.resume,'_blank');
  }

}
