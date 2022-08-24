const BasePage = require('./Base.page')

class MainPage extends BasePage{
    constructor(page){
        super()
        this.page=page
        this.bigBaners = this.page.locator('(//div[@class="slither__slides__slide j-slither__slide"]//a)[2]')
        this.smallBaners = this.page.locator('//td[@class="exposition__item cr-exposition__fixed"]//a')
        this.popularGoods = this.page.locator('//li[@class="foreign_goods__item g-slider__item"]')
        this.popularCategories = this.page.locator('//dd[@class="cloud-sub__item"]/a')
    }
    async open(){
        return await super.open('https://www.21vek.by/')
    }

    async getBigBanersUrl(){
        return await this.bigBaners.getAttribute('href')
    }


}

module.exports = {MainPage}