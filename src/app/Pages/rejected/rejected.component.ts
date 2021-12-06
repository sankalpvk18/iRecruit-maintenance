import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import Feedback from 'src/app/models/feedback';
import { FirebaseDatabaseService } from 'src/app/services/firebase-database.service';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.scss']
})

export class RejectedComponent implements OnInit {

  applicantsDetails: any = [];
  indentId:string;
  indentBy:string;
  initialProfile:number=0;
  profileUrl:string;
  phone:number;
  name:string;
  email:string;
  work_ex:number;
  rejected_on:Date;
  feedback:any = [Feedback];
  resume:string;
  apti:number;
  attitude:number;
  communication:number;
  passion:number;
  domain:number;
  temprament:number;
  matchPercentage:number;
  feedFacts:any;
  comment:string;
  applied_on:number;
  created_on:Date;


  constructor(private router: Router,
    public dialog: MatDialog, 
    private route: ActivatedRoute, 
    private httpClient: HttpClient,
    private db:FirebaseDatabaseService) { 
    
      this.route.params.subscribe(params => {
      this.indentId=params["id"];
      this.indentBy=params["by"];
    });
  }

  ngOnInit(): void {
      this.getInitialData();
  }
  onBack(){
    this.router.navigateByUrl('/indents');
  }


  openResume(){
    window.open(this.resume,'_blank');
  }

  getInitialData(){
    this.db.getAllApplications(this.db.getCurrentUserIDRef(this.indentBy, this.indentId)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.applicantsDetails = data;
      console.log(this.applicantsDetails);
       this.loadInitialProfile();
    });

  }

  loadInitialProfile(){
    this.profileUrl=this.applicantsDetails[0].photo;
    this.name=this.applicantsDetails[0].name;
    this.email=this.applicantsDetails[0].email;
    this.work_ex=this.applicantsDetails[0].work_ex;
    this.feedback=this.applicantsDetails[0].feedback;
    this.phone=this.applicantsDetails[0].phone;
    this.resume=this.applicantsDetails[0].resume;


    this.apti=this.feedback.apti;
    this.attitude=this.feedback.attitude;
    this.passion=this.feedback.passion;
    this.communication=this.feedback.communication;
    this.temprament=this.feedback.temprament;
    this.domain=this.feedback.domain;

    this.matchPercentage=((this.apti+this.attitude+this.communication+this.passion+this.temprament+this.domain)/60)*100;

    const factors={
      "Aptitude": this.apti,
      "Atitude":this.attitude,
      "Communication":this.communication,
      "Domain":this.domain,
      "Passion": this.passion,
      "Temperament":this.temprament};
    
      this.feedFacts=factors;

      this.comment=this.feedback.feedback;


      this.rejected_on=this.applicantsDetails[0].rejected_on;
      this.applied_on=this.applicantsDetails[0].applied_on;
      this.created_on=new Date();

  }

}
