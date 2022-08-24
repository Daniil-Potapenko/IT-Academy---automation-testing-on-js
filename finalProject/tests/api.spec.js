const { test, expect } = require('@playwright/test');
const axios = require("axios");
const {Validator} = require('jsonschema')
const validator = new Validator()
const testData = require('../testData.json')

test.describe('testing search Api', () => {

    let response;
    let schema;

    test.beforeAll(async()=>{
        schema=require('../jsonSchema/searchApi.schema')
        response = await axios({
            method: 'GET',
            url: 'https://search.21vek.by/api/v2.0/search/suggest',
            params: {q:testData['search query'][1]},
            headers: {
                'Content-Type': 'text/plain',
            }
        })
    })

    test('should status code equal 200', async() => {
        expect(response.status).toEqual(200);
    })
    test('should json schema correct', async() => {
        expect(validator.validate(response.data, schema).valid).toEqual(true);
    })
})


test.describe('testing pickup-points Api', () => {

    let response;
    let schema;

    test.beforeAll(async()=>{
        schema=require('../jsonSchema/pickupPointsApi.schema.json')
        response = await axios({
            data: testData.PickupPointsCheck,
            method: 'POST',
            url: 'https://gate.21vek.by/pickup-points/check',
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept':'application/vnd.api+json'
            }
        })
    })

    test('should status code equal 200', async() => {
        expect(response.status).toEqual(200);
    })
    test('should json schema correct', async() => {
        expect(validator.validate(response.data, schema).valid).toEqual(true);
    })
})


test.describe('testing locations Api', () => {

    let response;
    let schema;

    test.beforeAll(async()=>{
        schema=require('../jsonSchema/locationsCitiesSearch.schema.json')
        response = await axios({
            method: 'GET',
            url: 'https://gate.21vek.by/locations/cities/search',
            params:testData.citiesSearch,
            headers: {
                'Accept':'application/vnd.api+json',
                'Content-Type':	'application/vnd.api+json'
            }
           
        })
    })

    test('should status code equal 200', async() => {
        expect(response.status).toEqual(200);
    })
    test('should json schema correct', async() => {
        expect(validator.validate(response.data, schema).valid).toEqual(true);
    })
})