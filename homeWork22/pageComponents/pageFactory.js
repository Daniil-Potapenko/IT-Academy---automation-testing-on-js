const { Cart } = require("../pageObjects/cart.page")
const { ListingPage } = require("../pageObjects/listing.page")
const { MainPage } = require("../pageObjects/main.page")
const {Catalog}  = require("./catalog.component")
const { Header } = require("./header.component")




class PageFactory{
    constructor(page){
        this.page=page
        this.mainPage = new MainPage(page)
        this.header = new Header(page)
        this.listingPage = new ListingPage(page)
        this.catalog = new Catalog(page)
        this.cart = new Cart(page)
    }
    
   
    
}

module.exports = PageFactory