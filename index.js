var express = require('express');

let httpService = require("./httpService");

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.post("/getFlightDetails", async (req , res , next) => {

    let body = {
        "query": {
            "market": req.body.market,
            "locale": req.body.locale,
            "currency": req.body.currency,
            "queryLegs": [
                {
                    "originPlaceId": {
                        "iata": req.body.pickupCode
                    },
                    "destinationPlaceId": {
                        "iata": req.body.dropCode
                    },
                    "date": {
                        "year": req.body.year,
                        "month": req.body.month,
                        "day": req.body.day
                    }
                }
            ],
            "adults": req.body.adults,
            "childrenAges": [],
            "cabinClass": req.body.cabinClass,
            "excludedAgentsIds": [],
            "excludedCarriersIds": [],
            "includedAgentsIds": [],
            "includedCarriersIds": []
        }
    }

    let options = {
        method: "POST",
        url: "https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create",
        body: body,
        json: true,
        headers: {
          "content-type": "application/json",
          "x-api-key"   : "prtl6749387986743898559646983194'"
        }
    }

    let flightData = await httpService.sendHttpRequest(options);

    console.log("Flight Data" + JSON.stringify(flightData));

    res.send(JSON.stringify(flightData));


})