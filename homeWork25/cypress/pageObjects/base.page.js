module.exports= class BasePage{
    get(locator){
        if(locator.includes('//'))
            return cy.xpath(locator)
        else return cy.get(locator)    
    }
}

