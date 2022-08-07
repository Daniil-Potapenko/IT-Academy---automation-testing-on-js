const priceFormater = require('../helpers/priceFormating')

class Header{
    constructor(page){
        this.page=page
  
        this.searchField = this.page.locator('//input[@id="search"]')
        this.searchInitButton = this.page.locator('//button[@class="btn btn-search"]')
       
        this.cartButton = this.page.locator('//a[@id="cart-link"]')
        this.cartTotalPrice = this.page.locator('//div[@data-pl-cart-in-total=""]')
        this.cartQuantity = this.page.locator('//a[@id="cart-link"]//span[@class="header-icon__counter"]')

        this.suggestForm = this.page.locator('//ul[@id="ui-id-2"]')
        this.suggestResultCategoryItems= this.page.locator('//li[@data-content-type="1"]')
        this.suggestResultGoodItems= this.page.locator('//li[@data-content-type="2"]')
        this.suggestResultBrandItems= this.page.locator('//li[@data-content-type="4"]')
    }

    async initializeSearchSuggest(searchQuery){
        await this.searchField.waitFor('visible')
        await this.searchField.fill(searchQuery)
        await this.suggestForm.waitFor('visible')
    }
    
    async initializeRegularSearch(searchQuery){
        await this.searchField.waitFor('visible')
        await this.searchField.fill(searchQuery)
        await this.searchInitButton.waitFor('visible')
        await this.searchInitButton.click()
        await this.page.waitForLoadState('load')
    }

    async getCartTotalPrice(){
        let price = await this.cartTotalPrice.allTextContents()
        return  priceFormater(await price)
    }

    async getCartQuantity(){
        let Quantity = await this.cartQuantity.allTextContents()
        return  Number(Quantity.join())
    }

}


module.exports = {Header}