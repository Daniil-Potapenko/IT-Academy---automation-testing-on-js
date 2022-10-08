class FavoriteListPage{
    constructor(page){
        this.page=page
        this.favoriteGoodsTitlesSelector='//span[@class="result__name"]'
    }

    getGoodsTitle(position){
        return this.page.locator(`(${this.favoriteGoodsTitlesSelector})[${position}]`)
    }

}

module.exports = {FavoriteListPage}
