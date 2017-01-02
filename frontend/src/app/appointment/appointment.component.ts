import { Component, OnInit } from '@angular/core';

import { AppointmentService } from './appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  providers: [AppointmentService]
})
export class AppointmentComponent implements OnInit {

  private appointments: Array<any>;
  private appointmentDays: Array<string>;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.appointmentService.getAppointments()
    .subscribe((appointments)=>{
      this.appointments = appointments;
      this.appointmentDays = Object.keys(appointments);
    })
  }

}
