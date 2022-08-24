class GoodsPage{
    constructor(page){
        this.page=page
        this.addToFavoriteListButton= this.page.locator('//a[@class="putaside__link j-putaside"]')
    }
   

}

module.exports = {GoodsPage}