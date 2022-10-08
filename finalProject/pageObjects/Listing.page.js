class ListingPage{
    constructor(page){
        this.page=page
        this.goodsNameSelector="//span[@class='result__name']"
        this.addToCartButonsSelector='//button[@data-ga_action="add_to_cart"]'
        this.goodsPriceSelector = '//span[@class=" g-price result__price cr-price__in"]//span[@data-price>0]'
    }
    getGoodsName(position){
        return this.page.locator(`(${this.goodsNameSelector})[${position}]`)
    }
    async addGoodsToCart(position){
        await this.page.locator(`(${this.addToCartButonsSelector})[${position}]`).click()
    }

    async getGoodsPrice(position){
        let price = await this.page.locator(`(${this.goodsPriceSelector})[${position}]`).getAttribute('data-price')
        return await Number(price)
    }

    async openGoodsPage(position){
        await this.page.locator(`(//a[@class="result__link j-ga_track"])[${position}]`).click()
        await this.page.waitForLoadState()
    }

    async sortingByPrice(){
        this.page.locator('.cr-tools-sort__bi').click()
        await this.page.waitForResponse((response) => {
            return response.url().includes('order[price]')})
    }
}

module.exports = {ListingPage}