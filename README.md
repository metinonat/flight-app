





# API

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
 -  `order` : ordering flights by their srt value. Custom ordering for multiple sort fields can be provided as "101101" where each 1 or 0 corresponds respective sort field.
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
- `page` : page number for the result.

