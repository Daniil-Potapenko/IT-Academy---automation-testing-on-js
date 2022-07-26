const Calculator = require('../../calculator')
const expect = require('chai').expect
const myCalc = new Calculator();

describe(`Testing functionality of function 'add' Calculator's module`, function(){
    let testCases = [
        [10,10],
        [100,1,3,5],
        [0,1,6,8,4,5,8],
        [1,-1]        
    ];
    let resultOfFunction=[];
    let correctResults=[] ;
    before(async()=>{
        testCases.forEach(testCase => {
            resultOfFunction.push(myCalc.add(...testCase)) 
        });
        correctResults = [20,109,32,0]
        })
    it("Type of results function 'adding'", async() => {
        resultOfFunction.forEach(result =>{
            expect(typeof result).to.equal('number');
        })
    })
    it("Result of adding",async() => {
        correctResults.forEach((result,index) =>{
            expect(result).to.equal(resultOfFunction[index]);
        })
    })

})
  
describe(`Testing functionality of function 'multiply' Calculator's module`, function(){
    let testCases = [
        [1,1],
        [10,10,1],
        [400,200,560,600,0],
        [-1,100,1]
    ];
    let resultOfFunction=[];
    let correctResults=[] ;
    before(async()=>{
        testCases.forEach(testCase =>{
            resultOfFunction.push(myCalc.multiply(...testCase))
        })
        correctResults=[1,100,0,-100]
    })
    it("Type of results function 'multiplying'", async() => {
        resultOfFunction.forEach(result =>{
            expect(typeof result).to.equal('number')
        })
    })
    it("Result of multiplying ",async() => {
        correctResults.forEach((result,index) =>{
            expect(result).to.equal(resultOfFunction[index])
        })

    })

})

describe(`Testing functionality of function 'subtraction' Calculator's module`, function(){
    let testCases = [
        [1,1],
        [10,10],
        [400,200],
        [-1,100],
        [0,0]
    ];
    let resultOfFunction=[];
    let correctResults=[] ;
    before(async()=>{
        testCases.forEach(testCase =>{
            resultOfFunction.push(myCalc.subtraction(...testCase))
        })
        correctResults=[0,0,200,-101,0]
    })
    it("Type of results function 'subtraction'", async() => {
        resultOfFunction.forEach(result =>{
            expect(typeof result).to.equal('number')
        })
    })
    it("Result of subtraction ",async() => {
        correctResults.forEach((result,index) =>{
            expect(result).to.equal(resultOfFunction[index])
        })

    })

})


describe(`Testing functionality of function 'divide' Calculator's module`, function(){
    let testCases = [
        [1,1],
        [10,10],
        [400,200],
        [-1,100],
        [100,0]
    ];
    let resultOfFunction=[];
    let correctResults=[];
    before(async()=>{
        testCases.forEach(testCase =>{
            resultOfFunction.push(myCalc.divide(...testCase))
        })
        correctResults=[1,1,2,-0.01,Infinity]
    })
    it("Type of results function 'divide'", async() => {
        resultOfFunction.forEach(result =>{
            expect(typeof result).to.equal('number')
        })
    })
    it("Result of divide ",async() => {
        correctResults.forEach((result,index) =>{
            expect(result).to.equal(resultOfFunction[index])
        })
    })
})

describe(`Testing functionality of function 'exponentiation' Calculator's module`, function(){
    let testCases = [
        0,
        1,
        100,
        -1
    ];
    let resultOfFunction=[];
    let correctResults=[] ;
    before(async()=>{
        testCases.forEach(testCase =>{
            resultOfFunction.push(myCalc.exponentiation(testCase))
        })
        correctResults=[0,1,10000,1]
    })
    it("Type of result function 'exponentiation'", async() => {
        resultOfFunction.forEach(result =>{
            expect(typeof result).to.equal('number')
        })
    })
    it("Result of exponentiation ",async() => {
        correctResults.forEach((result,index) =>{
            expect(result).to.equal(resultOfFunction[index])
        })

    })

})