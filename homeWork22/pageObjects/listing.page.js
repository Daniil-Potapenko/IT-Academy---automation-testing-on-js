const priceFormater = require('../helpers/priceFormating')

class ListingPage{
    constructor(page){
        this.page=page
        this.sortingMenuButton = this.page.locator('//span[@class="sorting-block_link "]')

        this.sortingByPriceDesc = this.page.locator('//div[@class="sorting-block_list"]//a[contains(@href,"price_desc")]')
        this.sortingByPriceAsc = this.page.locator('//div[@class="sorting-block_list"]//a[contains(@href,"price_asc")]')
        this.sortingByPopularity = this.page.locator('//div[@class="sorting-block_list"]//a[contains(@href,"salerate_desc")]')
        this.sortingByActions = this.page.locator('//div[@class="sorting-block_list"]//a[contains(@href,"actions_first")]')
        
        this.sortingMenuCurentItem_Selector ='//div[@class="sorting-block_list"]//a[contains(@class,"sorting-block_item--active")]'

        this.goodsListingTitlesSelector = ('//div[@class="catalog-item__wrapper"]//a[@class="item-block_name item-block_name--tile"]')
        this.goodsListingPricesSelector = ('//div[@class="catalog-item__wrapper"]//div[@class="item-block_main-price "]')
        this.goodsListingAddToCartButtonSelector = ('//div[@class="action-btn action-btn--btn-buy"]')
    }
    async getGoodsListingTitle(positionOfElement){
        return await this.page.locator(`(${this.goodsListingTitlesSelector})[${positionOfElement}]`)
    }

    async getGoodsListingPrice(positionOfElement){
        let  price = await this.page.locator(`(${this.goodsListingPricesSelector})[${positionOfElement}]`).allTextContents()
        return  priceFormater(await price)
    }

    async addToCart(positionOfElement){
        let addToCart = await this.page.locator(`(${this.goodsListingAddToCartButtonSelector})[${positionOfElement}]`)
        await addToCart.waitFor('visible');
        await addToCart.scrollIntoViewIfNeeded()
        await addToCart.click();
        await this.page.waitForResponse('https://7745.by/cart/summary')

    }

    async getCurentSorting(){
        return await this.page.locator(`${this.sortingMenuItemCurentSelector}`).allTextContents()
    }



    async setSortingBy(locator){
        await this.sortingMenuButton.waitFor('visible')
        await this.sortingMenuButton.click()
        await locator.waitFor('visible')
        await locator.click()
        await this.page.waitForLoadState('load')

    }


}

module.exports = {ListingPage}