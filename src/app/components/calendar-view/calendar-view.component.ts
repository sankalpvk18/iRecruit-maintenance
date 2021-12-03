import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { scheduled } from 'rxjs';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {

  token: string;
  currentStartEvent: string;
  currentEndEvent: string;
  events = [];

  calendarOptions: CalendarOptions = {
    selectable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    googleCalendarApiKey: "AIzaSyBl4jUf3i5tL_Vu3QdSVRsWv30qC7h6gGM",
    events: this.events,
    eventSources: [
      {
        googleCalendarId: 'sukalp18@gmail.com'
      }
    ],
    initialView: 'timeGridWeek',
    dateClick: (dateClickEvent) =>  {         // <-- add the callback here as one of the properties of `options`
      // this.scheduleInterview(dateClickEvent);
    },
    select: (info) => {
      // this.scheduleInterview(info);
      this.createEvent(info);
      // alert('selected ' + info.startStr + ' to ' + info.endStr);
    }
  };

  constructor(private httpClient: HttpClient, @Inject(MAT_DIALOG_DATA) public email: string, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("access_token");    
    // this.events.push({
    //   googleCalendarId: 'sukalp18@gmail.com'
    // });
    console.log("email from screening - " + this.email);
    console.log("type is " + typeof this.calendarOptions.events);
  }

  scheduleInterview(selectEvent: any) {
    let events = [
      { title: 'event 1', date: '2021-11-30' , allDay: false},
      { title: 'event 2', date: '2021-11-30' }
    ]
    this.calendarOptions.events = events;
    console.log(selectEvent);
  }

  createEvent(info: any) {
    this.currentEndEvent = info.startStr;
    this.currentEndEvent = info.endStr;
    var event = {
      'summary': 'New Event Created',
      'location': 'NMIMS,Mumbai',
      'description': 'IRecruit Demo',
      'start': {
        'dateTime': info.startStr,
        'timeZone': 'Asia/Kolkata'
      },
      'end': {
        'dateTime': info.endStr,
        'timeZone': 'Asia/Kolkata'
      },
      // 'recurrence': [
      //   'RRULE:FREQ=DAILY;COUNT=1'
      // ],
      'attendees': [
        {'email': 'sukalp18@gmail.com'},
        {'email': this.email}
      ],
      'reminders': {
        'useDefault': false
      }
    };

    let param = new HttpParams();
    param = param.set('key', 'AIzaSyBl4jUf3i5tL_Vu3QdSVRsWv30qC7h6gGM');

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/json',
      'Content-type': 'application/json' }),
      params: param
    };

    const body = event;

    this.httpClient.post<any>('https://www.googleapis.com/calendar/v3/calendars/primary/events', body, httpOptions).subscribe(data => {
      console.log(data);
      if(data.status == "confirmed") {
        let eventff = [{ title: 'Just Created', date: this.currentStartEvent}]

        // this.cd.detectChanges();

        // this.events = Object.assign(this.events, event)
        // this.events.push(eventff);
        // this.calendarOptions.events = eventff;
        window.location.reload();
      }
    });

  }


}
