const { MainPage } = require("../pageObjects/Main.page")
const { Header } = require("./header")
const { ListingPage } = require("../pageObjects/Listing.page")
const { CartPage } = require("../pageObjects/Cart.page")
const { GoodsPage } = require("../pageObjects/Goods.page")
const { FavoriteListPage } = require("../pageObjects/favoritList.page")
const { Catalog } = require("./catalog")





class PageFactory{
    constructor(page){
        this.page=page
        this.mainPage = new MainPage(page)
        this.header = new Header(page)
        this.listingPage = new ListingPage(page)
        this.cartPage = new CartPage(page)
        this.goodsPage = new GoodsPage(page)
        this.favoriteListPage = new FavoriteListPage(page)
        this.catalog = new Catalog(page)
    }
    
   
    
}

module.exports = PageFactory