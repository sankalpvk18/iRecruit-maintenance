import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Applications from 'src/app/models/Applications';
import { FirebaseDatabaseService } from 'src/app/services/firebase-database.service';

@Component({
  selector: 'app-dialog-feedback',
  templateUrl: './dialog-feedback.component.html',
  styleUrls: ['./dialog-feedback.component.scss']
})
export class DialogFeedbackComponent implements OnInit {

  passionValue = 1;
  attitudeValue = 1;
  communicationValue = 1;
  aptiValue = 1;
  domainValue = 1;
  tempramentValue = 1;
  feedbackValue="";


  constructor(@Inject(MAT_DIALOG_DATA) public applicant: Applications, private db:FirebaseDatabaseService) { }

  ngOnInit(): void {
       console.log(this.applicant.key)
  }

  onSubmit(){
    const obj = {
      rejected_on: new Date(),
      status: "rejected",
      feedback:{  
        passion : this.passionValue,
        attitude : this.attitudeValue,
        communication : this.communicationValue,
        apti : this.aptiValue,
        domain : this.domainValue,
        temprament : this.tempramentValue, 
        feedback: this.feedbackValue
      }
    }

   this.db.update("/" + this.applicant.indent_id+"/applications/"+this.applicant.key, obj);
   this.db.update("/"+this.applicant.indent_id+"/rejected/"+this.applicant.key,this.applicant);

    
    

    
  }

}
