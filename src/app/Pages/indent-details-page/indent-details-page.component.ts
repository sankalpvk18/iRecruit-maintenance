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
  department:string;
  vacancies:number;
  skills:[any];
  created_on:number;
  role:string;

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
    

    this.jobRole=sessionStorage.getItem("indent_role")
    this.role=this.jobRole;
    this.department=sessionStorage.getItem("indent_department");
    this.skills=JSON.parse(sessionStorage.getItem("indent_skills"));
    this.vacancies=parseInt(sessionStorage.getItem("indent_vacancies"), 10);
    this.created_on=parseInt(sessionStorage.getItem("indent_created_on"), 10);


  
    this.indentOpen="True";
    this.indentId=this._Activatedroute.snapshot.paramMap.get("id");
    this.indentBy=this._Activatedroute.snapshot.paramMap.get("by");

    

  }



  ngOnInit(): void {
  }


  onBack(){
    sessionStorage.removeItem('indent_role');
    sessionStorage.removeItem('indent_skills');
    sessionStorage.removeItem('indent_vacancies');
    sessionStorage.removeItem('indent_department');
    sessionStorage.removeItem('indent_created_on');
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
