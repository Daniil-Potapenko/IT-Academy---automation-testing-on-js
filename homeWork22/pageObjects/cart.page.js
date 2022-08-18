class Cart{
    constructor(page){
        this.page=page
        this.titleOfGoods=this.page.locator('//div[@class="product-item__title"]//a')

    }
    async open(){
        await this.page.goto('https://7745.by/cart', {waitUntil:'load'});
        await this.page.setViewportSize({ width: 1920, height: 1080  })
    }
}


module.exports = {Cart}