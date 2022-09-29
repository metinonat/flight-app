





## API

### `GET /flights`  
Returns a list of flights

#### Available URL Parameters:

example: `/flights?sort=estimatedLandingTime,flightname&order=10&scheduleTime=22:00`

- `sort` : sorting flights by their:
    -  flightname,
    -  scheduleDate,
    -  scheduleTime,
    -  flightDirection,
    -  mainflight,
    -  airlineCode,
    -  destination,
    -  id and
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
