import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indent-list-item',
  templateUrl: './indent-list-item.component.html',
  styleUrls: ['./indent-list-item.component.scss']
})
export class IndentListItemComponent implements OnInit {

  @Input() indents: any = [];
  arrIndents = [];
  isOpen = 'true';

  constructor(private router:Router) { }

  ngOnInit(): void {
    if(this.indents != null) {
      console.log(this.indents);
      this.arrIndents = Array.from(this.indents)
    }
  }

  ngAfterViewInit() {
    if(this.indents != null) {
      console.log(this.indents);
    }
  }

  getDate(date) : Date {
    return new Date(date);
  }

  onIndentClicked(){
    this.router.navigateByUrl('/indentdetails')
  }

}
