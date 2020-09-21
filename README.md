# HotelApp

## Description
A desktop application for Hotel Room Service

### Users

#### Client can
* register
* log in
* search rooms through filtering their size, type, price and other characteristics
* can request a room for booking
* rank rooms

#### Waiter can
* log in
* approve bookings from clients
* add bookings manually
* view the current state of the room (cleanup, occupied, free)
* rank a client
* recieve a notifiecation when any room becomes available

#### Admin can
* CRUD on Waiters, Rooms
* Generate reports

### Implementation
* Client server architecture. Java is used for Backend, Angular is used for frontend.
* Hibernate and Spring frameworks are used.
* A websocket is used for notifications, anything else in regarding the server-client communication is implemented through HTTP requests
* Almost all the logic happens on the server side.
* Rooms change their states, after being booked, so each has a thread simulating the actions in time. There are multiple clients/ room so the producer consumer design pattern is applied.
* The waiter is notified when a room goes from "cleanup" to "free" through the websocket (observer design pattern).
