class Catalog{
    constructor(page){
        this.page=page
        this.catalogOpenButton = this.page.locator("//button[@class='styles_catalogButton__1K6kI']")
        
        this.firstLevelCategoriesSelector  = '//span[@class="styles_categoryName__28yR1 styles_categoryName__ZUtLQ"]'
        this.thirdLevelCategoriesSelector = '//a[@class="styles_categoryContainer__299CX styles_itemContainer__2XIlm"]'
    }

    async getUrlFromCategoryName(categoryName){
        return this.page.locator(`//span[contains(text(),"${categoryName}")]/parent::*`).getAttribute('href')
    }

    async selectFirstLeveCategory(categoryName){
        await this.page.locator(`${this.firstLevelCategoriesSelector}[contains(text(),"${categoryName}")]`).hover()
    }

    async selectThirdLevelCategory(categoryName){
        await this.page.locator(`${this.thirdLevelCategoriesSelector}/*[contains(text(),"${categoryName}")]`).click()
        await this.page.waitForLoadState('load')
    }
    
}

module.exports = {Catalog}
