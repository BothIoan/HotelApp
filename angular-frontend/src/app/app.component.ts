import { Component } from '@angular/core';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookingApp XD';
  ws : WebSocket;
  constructor() {
    this.ws = new WebSocket("ws://localhost:8080/endpoint");
    this.ws.onmessage = function (event) {
      console.log(event.data);
      document.getElementById("p1").innerHTML = event.data;
    }
  }
 
}