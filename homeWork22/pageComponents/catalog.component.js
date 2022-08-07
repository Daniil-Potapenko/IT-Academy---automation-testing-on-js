class Catalog{
    constructor(page){
        this.page=page
        this.catalogButton = this.page.locator('//a[@class="catalog-nav-btn"]')
        this.firstLevelCategoriesSelector  = '//ul[@class="catalog-nav__links"]//li[@data-target]'
        this.thirdLevelCategoriesSelector = '//div[@class="submenu" and @style="display: block;"]//li[contains(@class,"item-")]'
    }

    async selectFirstLeveCategory(categoryName){
        await this.page.locator(`${this.firstLevelCategoriesSelector}//span[text()="${categoryName}"]`).hover()
    }

    async selectThirdLevelCategory(categoryName){
        await this.page.locator(`(${this.thirdLevelCategoriesSelector}//a[text()="${categoryName}"])[1]`).click()
        await this.page.waitForLoadState('load')
    }

    async open(){
        await this.catalogButton.waitFor('visible')
        await this.catalogButton.click();
    }
    
}

module.exports = {Catalog}
