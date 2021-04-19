# Room Booking

## Getting started
The live demo can be accessed [here](https://felipecespedes-room-booking.netlify.app/)

### Credentials
#### Users: 
**username:** You can use any username starting by `user` followed of digits, e.g `user1`, `user2`, `user3`  
**password:** 123456
#### Companies:
**username:** coke  
**password:** 123456  

**username:** pepsi  
**password:** 123456

- As a user you can book meeting rooms for 1 hour
- As a company you can see who have booked your meeting rooms

## High level architecture
The main components of the project are the following:

### Users
- They can be of 2 types, `users` or `companies`
- `users` can book meeting rooms
- `companies` can see who have booked their meeting rooms

### Login
- It uses a dummy API service in order to validate credentials and give access to the system

### Room booking
- It allows to select a company
- It allows to book any meeting room by 1 hour
- It allows to cancel any room reservation
- **Restrictions:**
  - You cannot book time slots that were booked by other users

### Company dashboard
- It displays the rooms of the company and shows who have booked its meeting rooms

### App Context
- It keeps the state of the logged-in user, companies and schedules data
- Exposes methods for manipulating the logged-in user, companies and schedules data
- It uses a custom hook (*useStorage*) to save and retrieve data from the local storage
- It uses a dummy API service in order to get the companies data

## Used technologies and libraries
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Day.js](https://day.js.org/)
- [react-schedule-selector](https://github.com/bibekg/react-schedule-selector)

## Improvements for production
- There should be a real backend providing the companies, login and schedules data
- The scheduler could be optimized using `React.memo` and `Virtual Lists`
- A routing system could be implemented
- Include an alerting system in case an user want to book the same time in different meeting rooms
- The backend could validate when booking a time slot in order to prevent conflict in case 2 users select the same time slot
- There are data that can be externalised such as the date of the event, the name of the event
- Error handling: Validate and treat API errors in a meaningful way
- Include tooltips for letting the user know when certain events happened such as `Room was booked`, `Reservation was cancelled`, `The time of the reservations was updated successfully`
- Implement unit testing and better linting tools

## Screenshots

**Rooom booking**
![room booking](https://github.com/felipecespedes/room-booking/blob/main/screenshots/room-booking.png)

**Company dashboard**
![company dashboard](https://github.com/felipecespedes/room-booking/blob/main/screenshots/company-dashboard.png)

**Login**
![login](https://github.com/felipecespedes/room-booking/blob/main/screenshots/login.png)

## Development
For running the project locally:
```bash
git clone https://github.com/felipecespedes/room-booking.git
cd room-booking
yarn
yarn start
```

## Authors
- [Felipe Céspedes](https://www.felipecespedes.co/)
