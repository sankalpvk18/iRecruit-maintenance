import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import { scheduled } from 'rxjs';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: (dateClickEvent) =>  {         // <-- add the callback here as one of the properties of `options`
      this.scheduleInterview(dateClickEvent);
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  scheduleInterview(dateClickEvent: any) {
    console.log(dateClickEvent);
  }


}
