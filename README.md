# Flight App


A flight app powered by the Schiphol Public Flight API. This app allows you to filter all upcoming and historical flights. App has a local simple reservation service.   

## Requirements

- Node 14.15.0
- Postgresql 13.1
- Axios 0.27.2
- Bcrypt 5.0.1
- Crypto 1.0.1
- Dotenv 16.0.3
- Express 4.18.1
- Make-runnable 1.3.10
- Nodemon 2.0.20
- pg 8.8.0
- Ts-node 10.9.1
- Typescript 4.8.3

____________________
## Getting Ready

### Preparing the environment:
a .env file must be available similar to .env.example

Installing dependencies:

`> npm install`

Compiling the project: 

`> npm run build`

Prepare the database:

`> npm run migrate`

Run the server:

`> npm run dev`

### Other useful commands: 

Drops all tables and cleans db:

`> npm run db-wipe`

Freshes the tables by first drop everything and then migrating again:

`> npm run migrate:fresh`


# API

## `POST /register`
Register to the system by username and password. Body of the request must contain username, password, and confirm_password fields.

## `POST /login`
A registered user can login via registered username and password. An access token returns in the body of the response. This token will be used to access routes that require authentication. It needs to be pass as a Bearer Token.

## `POST /logout`
An user can logged out via this route. A valid access token must be provided.

_________________________

## `GET /user/reservations`
Returns reservations belongs to current user. Authentication is needed.

### Available URL Parameters:

example: `/user/reservations?canceled=false&flight_id=135778405862547775`

- `canceled` : used to filter canceled reservations. Can be only | true | false. true is the default behaviour that will return every reservation. false will return only active reservations. And, only will return only canceled ones.
- `flight` : used to filter reservations from a single flight. A valid flight id must be provided. 

## `GET /user/reservations:id`
Returns the specific reservation. Authentication is needed.

## `POST /user/reservations:id`
Cancels the reservation with given id. Authentication is needed. Only the user owns the reservation can cancel it. The reservation will not be deleted and can be seen among all reservations.
____________________________

## `GET /flights/:id`
Returns data of the flight with provided id.

## `GET /flights`  
Returns a list of flights

### Available URL Parameters:

example: `/flights?sort=estimatedLandingTime,flightname&order=10&scheduleTime=22:00`

- `sort` : sorting flights by their:
    -  flightname,
    -  scheduleDate,
    -  scheduleTime,
    -  flightDirection,
    -  mainflight,
    -  airlineCode,
    -  destination,
    -  id, and
    -  estimatedLandingTime
    Multiple sorting fields are supported by a comma.
 -  `order` : ordering flights by their `sort` value. Custom ordering for multiple sort fields can be provided as "101101" where each 1 or 0 corresponds respective sort field.
 -  `scheduleDate` : filters flights by given date. Default is the day request is made. Format is "yyyy-MM-dd".
 -  `scheduleTime` : filters flights by given time. No default value. Format is "HH:mm".
 -  `flightName` : filters flights by their flight number prefixed by airline abbreviation.
 -  `flightDirection` : filters by two option A or D.
 -  `airline` : filters by airline IATA or ICAO code. Only one of airline or airlineCode parameter is allowed.
 -  `airlineCode` : filters by airline code. Only one of airline or airlineCode parameter is allowed.
 -  `route` : filters by IATA or ICAO code of airport. Multiple values seperated by comma.
 -  `includedelays` : includes flights of earlier an scheduleDate when these have enough delay to shift to the date that is queried when sets "true". Default is "false".
 -  `fromDateTime` : From date of search period. Search based on the provided field on searchDateTimeField. Format: yyyy-MM-dd'T'HH:mm:ss
 -  `toDateTime` : To date of search period (inclusive). Format: yyyy-MM-dd'T'HH:mm:ss
 -  `searchDateTimeField` : Query by a specific DateTime field. Allowed fields are: 
    -  estimatedLandingTime,
    -  actualLandingTime,
    -  publicEstimatedOffBlockTime,
    -  actualOffBlockTime,
    -  expectedTimeBoarding,
    -  expectedTimeGateClosing,
    -  expectedTimeGateOpen,
    -  expectedTimeOnBelt,
    -  scheduleDateTime,
    -  lastUpdatedAt
 -  `fromScheduleDate` : query by schedule date range. Only 3 days period is allowed. Date is inclusive.
 -  `toScheduleDate` : query by schedule date range. Only 3 days period is allowed. Date is inclusive.
 -  `page` : page number for the result.

### Response

``` 
   { 
      "meta": {
         "count": 20,
         first: 'https://api.schiphol.nl:443/public-flights/flights',
         prev: 'https://api.schiphol.nl:443/public-flights/flights?page=1',
         next: 'https://api.schiphol.nl:443/public-flights/flights?page=3',
         last: 'https://api.schiphol.nl:443/public-flights/flights?page=220'
      },
      "data": {
         {
            "lastUpdatedAt": "2022-09-30T08:28:00.223+02:00",
            "actualLandingTime": "2022-09-30T06:12:12.000+02:00",
            "actualOffBlockTime": null,
            "aircraftRegistration": null,
            "aircraftType": {
                "iataMain": "330",
                "iataSub": "332"
            },
            "baggageClaim": {
                "belts": [
                    "11"
                ]
            },
            "checkinAllocations": null,
            "codeshares": {
                "codeshares": [
                    "AF5479",
                    "DL9507"
                ]
            },
            "estimatedLandingTime": "2022-09-30T06:12:12.000+02:00",
            "expectedTimeBoarding": null,
            "expectedTimeGateClosing": null,
            "expectedTimeGateOpen": null,
            "expectedTimeOnBelt": "2022-09-30T07:05:27.254+02:00",
            "expectedSecurityFilter": null,
            "flightDirection": "A",
            "flightName": "DL9507",
            "flightNumber": 9507,
            "gate": null,
            "pier": null,
            "id": "135609807360450186",
            "isOperationalFlight": true,
            "mainFlight": "KL0588",
            "prefixIATA": "DL",
            "prefixICAO": "DAL",
            "airlineCode": 58,
            "publicEstimatedOffBlockTime": null,
            "publicFlightState": {
                "flightStates": [
                    "ARR",
                    "EXP"
                ]
            },
            "route": {
                "destinations": [
                    "LOS"
                ],
                "eu": "N",
                "visa": false
            },
            "scheduleDateTime": "2022-09-30T05:40:00.000+02:00",
            "scheduleDate": "2022-09-30",
            "scheduleTime": "05:40:00",
            "serviceType": "J",
            "terminal": 2,
            "transferPositions": null,
            "schemaVersion": "4"
        },
        ...other flights
      }
   
   }
```

## `GET /flights/:id/reserved-seats`
Returns reserved seats on the flight with id given. Authentication is needed. Response includes reservations belongs to current user.

## `POST /flights/:id/reserve`
Reserves the given flight with provided row and seat values. row field must be between 1 and 30, while seat value must be one of the A,B,C,D,E, and F letters. Authentication is needed.

_________________________

## `GET /airlines/:id`
Returns data of the airline with provided id.

## `GET /airlines`
Returns a list of airlines

### Available URL Parameters:

example: `/airlines?sort=publicName&order=1&page=2`

- `sort` : supported sorting fields are:
  - publicName,
  - iata, 
  - icao, and
  - nvls
-  `order` : ordering airlines by their `sort` value. Custom ordering for multiple sort fields can be provided as "101101" where each 1 or 0 corresponds respective sort field.
- `page` : page number for the result.

______________________________

## `GET /destinations/:iata`
Returns data of the destination with provided IATA code.


## `GET /destinations`
Returns a list of destinations

### Available URL Parameters:

example: `/destinations?sort=publicName.dutch,country&order=11&page=2`

- `sort` : supported sorting fields are:
  - publicName.dutch, 
  - publicName.english, 
  - iata, 
  - country, and
  - city.
-  `order` : ordering flights by their `sort` value. Custom ordering for multiple sort fields can be provided as "101101" where each 1 or 0 corresponds respective sort field.
- `page` : page number for the result.
