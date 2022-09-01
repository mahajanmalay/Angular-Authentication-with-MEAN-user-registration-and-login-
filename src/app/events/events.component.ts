import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events:any = []

  constructor(private _eventService: EventService) { }

  ngOnInit(): void {
    this._eventService.getEvents()
    .subscribe({
      next:(res)=>{
        this.events = res
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
