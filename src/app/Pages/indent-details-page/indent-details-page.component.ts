import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indent-details-page',
  templateUrl: './indent-details-page.component.html',
  styleUrls: ['./indent-details-page.component.scss']
})
export class IndentDetailsPageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  onBack(){
    this.router.navigateByUrl('/indents')
  }

}
