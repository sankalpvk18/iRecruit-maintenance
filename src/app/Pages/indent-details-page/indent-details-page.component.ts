import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-indent-details-page',
  templateUrl: './indent-details-page.component.html',
  styleUrls: ['./indent-details-page.component.scss']
})
export class IndentDetailsPageComponent implements OnInit {

  
  indent:any;
  jobRole: string;
  indentId: string;
  indentBy:string;
  indentOpen: string;

  constructor(private router:Router,private _Activatedroute:ActivatedRoute ) {
    const navigation = this.router.getCurrentNavigation();
  const state = navigation.extras.state as {
    department: string,
    vacancies: number,
    created_on: number,
    role: string,
    skills: [any]
    };
  
    this.indent=state;
    

    this.jobRole=this.indent.role;
    this.indentOpen="True";
    this.indentId=this._Activatedroute.snapshot.paramMap.get("id");
    this.indentBy=this._Activatedroute.snapshot.paramMap.get("by");

    

  }



  ngOnInit(): void {
  }


  onBack(){
    this.router.navigateByUrl('/indents');
  }


  onCreateApplication(){
     // this.router.navigateByUrl('application');
     this.router.navigateByUrl('/application/'+this.jobRole+"/"+this.indentId+"/"+this.indentBy+"/"+this.indentOpen);
     // this.router.navigate(["application", {jobrole: this.jobRole, id: this.indentId, by:this.indentBy,open:this.indentOpen }]);
  }

  getDate(date) : Date {
    return new Date(date);
  }
  

}
