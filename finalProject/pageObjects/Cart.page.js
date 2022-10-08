class CartPage{
    constructor(page){
        this.page=page
        this.emptyCartLabel=this.page.locator('//div[@id="b-empty-basket-container"]')
    }

    async deleteGoodsFromCart(position){
        await this.page.locator(`(//a[contains(@id,"j-delete-")])[${position}]`).click()
    }

    getGoodsTitles(position){
        return this.page.locator(`(//td[@class="g-table-cell basket__item cr-basket__name"]/a)[${position}]`)
    }

}

module.exports = {CartPage}