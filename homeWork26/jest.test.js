const axios = require("axios");
const {Validator} = require('jsonschema')
const validator = new Validator()

describe('google-translate Api', () => {
    test('should status code equal 200', async() => {
        const params = new URLSearchParams();
        params.append("source", "en");
        params.append("target", "ru");
        params.append("q", "Hello");
        
        const options = {
            data: params,
            method:'POST',
            url:'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers:{
                'content-type':'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': '475aafdcaamsh5ed14d370e36112p1ff389jsn094fafe09b88',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            }
        }
    
    let response = await axios(options)
    expect(response.status).toEqual(200);
    })
})


describe('WeatherIO Api', () => {

    let response;
    let schema;

    beforeAll(async() => {
        schema=require('./data/WeatherIO-1.schema.json')
        response = await axios({
            method: 'GET',
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
            params: {lon: '38.5', lat: '-78.5'},
            headers: {
                'X-RapidAPI-Key': '475aafdcaamsh5ed14d370e36112p1ff389jsn094fafe09b88',
                'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
            }
        })
      });


    test('should status code equal 200', async() => {        
        expect(response.status).toEqual(200);
    })

    test('should json schema correct', async() => {
        expect(validator.validate(response.data, schema).valid).toEqual(true);
    })
})

describe('Google Web Search Api', () => {

    let response;
    let schema;
    
    beforeEach(async() => {
        schema =require('./data/GoogleWebSearch.schema.json')
        response = await axios({
            method: 'GET',
            url: 'https://google-web-search.p.rapidapi.com/',
            params: {query: 'harry potter filetype', max: '10', site:'stackoverflow.com'},
            headers: {
              'X-RapidAPI-Key': '475aafdcaamsh5ed14d370e36112p1ff389jsn094fafe09b88',
              'X-RapidAPI-Host': 'google-web-search.p.rapidapi.com'
            }
        })
    });

    test('should status code equal 200', async() => {        
        expect(response.status).toEqual(200);
    })

    test('should json schema correct', async() => {
        expect(validator.validate(response.data, schema).valid).toEqual(true);
    })
});