const { test, expect,  } = require('@playwright/test');
const PageFactory = require('../pageComponents/pageFactory');

test.describe("Testing sorting functionality on listing page",()=>{
    test('Should the most expensive goods be displayed at the beginning listin when sorted desc by price', async ({ page }) => {
        const I = new PageFactory(page)
        await I.mainPage.open();
        await I.catalog.open();
        await I.catalog.selectFirstLeveCategory('Электроника')
        await I.catalog.selectThirdLevelCategory('Умные колонки')
        await I.listingPage.setSortingBy(I.listingPage.sortingByPriceDesc)
        await expect(await I.listingPage.getGoodsListingPrice(1)).toBeGreaterThan(await I.listingPage.getGoodsListingPrice(2))
        await expect(await I.listingPage.getGoodsListingPrice(2)).toBeGreaterThan(await I.listingPage.getGoodsListingPrice(3))
    });

    test('Should the cheapest goods be displayed at the beginning listin when sorted asc by price', async ({ page }) => {
        const I = new PageFactory(page)
        await I.mainPage.open();
        await I.catalog.open();
        await I.catalog.selectFirstLeveCategory('Компьютеры и Оргтехника')
        await I.catalog.selectThirdLevelCategory('Моноблоки')
        await I.listingPage.setSortingBy(I.listingPage.sortingByPriceAsc)
        await expect(await I.listingPage.getGoodsListingPrice(3)).toBeGreaterThan(await I.listingPage.getGoodsListingPrice(2))
        await expect(await I.listingPage.getGoodsListingPrice(2)).toBeGreaterThan(await I.listingPage.getGoodsListingPrice(1))
    });
})

test.describe('Testing search functionality',()=>{
    
    test('Should regular search return result relevent to search query', async ({ page }) => {
        const I = new PageFactory(page)
        let searchQuery='asus'
        await I.mainPage.open();
        await I.header.initializeRegularSearch(searchQuery)
        await expect(await I.listingPage.getGoodsListingTitle(1)).toContainText(searchQuery , {ignoreCase: true})
        await expect(await I.listingPage.getGoodsListingTitle(2)).toContainText(searchQuery , {ignoreCase: true})
    });

 
    test('Should search suggest return result with relevant goods', async ({ page }) => {
        const I = new PageFactory(page)
        let searchQuery='asus'
        await I.mainPage.open();
        await I.header.initializeSearchSuggest(searchQuery)
        await expect(await I.header.suggestResultGoodItems.first()).toContainText(searchQuery , {ignoreCase: true})
        await expect(await I.header.suggestResultGoodItems.last()).toContainText(searchQuery , {ignoreCase: true})
    });

    test('Should search suggest return result with relevant brands', async ({ page }) => {
        const I = new PageFactory(page)
        let searchQuery='asus'
        await I.mainPage.open();
        await I.header.initializeSearchSuggest(searchQuery)
        await expect(await I.header.suggestResultBrandItems.first()).toContainText(searchQuery , {ignoreCase: true})
    });

    test('Should search suggest return result with relevant category', async ({ page }) => {
        const I = new PageFactory(page)
        let searchQuery='ноутбук'
        await I.mainPage.open();
        await I.header.initializeSearchSuggest(searchQuery)
        await expect(await I.header.suggestResultCategoryItems.first()).toContainText(searchQuery , {ignoreCase: true})
    });

})


test.describe('Testing functionality on cart page',()=>{
    test('Should be goods in cart after click on add to cart button',async ({ page })=>{
        const I = new PageFactory(page)
        await I.mainPage.open();
        await I.catalog.open();
        await I.catalog.selectFirstLeveCategory('Электроника')
        await I.catalog.selectThirdLevelCategory('Телевизоры')
        await I.listingPage.addToCart(3)
        let listingTitle = await I.listingPage.getGoodsListingTitle(3)
        listingTitle= await listingTitle.allInnerTexts()
        await I.cart.open()
        await expect(await I.cart.titleOfGoods).toContainText(listingTitle)
    })



    test('Should be cart icon displayed correct total price of goods after adding goods to cart',async ({ page })=>{
        const I = new PageFactory(page)
        await I.mainPage.open();
        await I.catalog.open();
        await I.catalog.selectFirstLeveCategory('Электроинструмент')
        await I.catalog.selectThirdLevelCategory('Гайковерты')
        await I.listingPage.addToCart(1)
        await I.listingPage.addToCart(4)
        await I.listingPage.addToCart(7)
        let totalCartPrice = await I.listingPage.getGoodsListingPrice(1) + await I.listingPage.getGoodsListingPrice(4) + await I.listingPage.getGoodsListingPrice(7)
        await expect(await I.header.getCartTotalPrice()).toEqual(totalCartPrice)
    })

    test('Should be cart icon displayed correct quantity after adding goods to cart',async ({ page })=>{
        const I = new PageFactory(page)
        await I.mainPage.open();
        await I.catalog.open();
        await I.catalog.selectFirstLeveCategory('Электроника')
        await I.catalog.selectThirdLevelCategory('Электронные книги')
        await I.listingPage.addToCart(1)
        await I.listingPage.addToCart(5)
        await I.listingPage.addToCart(7)
        await I.listingPage.addToCart(3)
        await expect(await I.header.getCartQuantity()).toEqual(4)
    })

})