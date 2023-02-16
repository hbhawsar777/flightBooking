var express                     = require('express');
const bodyParser                = require('body-parser');
const cors                      = require('cors');


let httpService = require("./httpService");

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Flight Data Api');
});
app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

app.post("/getFlightDetails", async (req , res) => {
    try{
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
                "childrenAges": req.body.childrenAges,
                "cabinClass": req.body.cabinClass,
                "excludedAgentsIds": [],
                "excludedCarriersIds": [],
                "includedAgentsIds": [],
                "includedCarriersIds": []
            }
        }

        console.log("Added Child Ages" + req.body.childrenAges);
        
        let options = {
            method: "POST",
            url: "https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create",
            body: body,
            json: true,
            headers: {
                "content-type": "application/json",
                "x-api-key"   : "prtl6749387986743898559646983194"
            }
        }
        
        let flightData = await httpService.sendHttpRequest(options);
        
        console.log("Flight Data" + JSON.stringify(flightData));
        
        res.send(JSON.stringify(flightData));
        
    }catch(error){
        console.error(error);
        res.status(error.body.statusCode).send(JSON.stringify(error))
    }
        
    })