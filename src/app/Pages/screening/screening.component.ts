import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';
import { DialogFeedbackComponent } from 'src/app/components/dialog-feedback/dialog-feedback.component';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.scss']
})
export class ScreeningComponent implements OnInit {

  constructor(private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
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

}
