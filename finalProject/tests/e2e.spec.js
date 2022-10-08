const { test, expect } = require('@playwright/test');
const credentials = require('../credentials.json')
const testData = require('../testData.json')
const PageFactory = require('../pageComponents/pageFactory');



test.describe('Testing functionality of account', function() {

  test('should user logon to account whith correct credentials', async function({page}){
    const I = new PageFactory(page)
    await I.mainPage.open()
    await I.header.initLogon(credentials['test account'].email,credentials['test account'].password)
    await expect(await I.header.getCurrentAccountTitle()).toEqual(credentials['test account'].email)
  });
  
  test('should error message displayed at try logon to account with incorrect credentials', async function({page}){
    const I = new PageFactory(page)
    await I.mainPage.open()
    await I.header.initLogon(credentials['fake account'].email,credentials['fake account'].password)
    await expect(await I.header.logonErrorMessage).toBeVisible()
  })

  test('should goods correctly added to favorite list', async function({page}){
    const I = new PageFactory(page)
    await I.mainPage.open()
    await I.header.initRegularSearch(testData['search query'][3])
    let goodstTitle = await I.listingPage.getGoodsName(1)
    await I.listingPage.openGoodsPage(1)
    await I.goodsPage.addToFavoriteListButton.click()
    await I.header.accountButton.click()
    await I.header.favoriteList.click()
    await expect(I.favoriteListPage.getGoodsTitle(1)).toContainText(await goodstTitle.allInnerTexts())
  })
  
});


test.describe('Testing functionality of searching', function() {
  
  test('should regular search return revelant result', async function({page}){
    const I = new PageFactory(page)
    await I.mainPage.open()
    await I.header.initRegularSearch(testData['search query'][2])
    await expect(I.listingPage.getGoodsName(1)).toContainText(testData['search query'][2])
  })

  test('should search suggest return revelant result', async function({page}) {
    const I = new PageFactory(page)
    await I.mainPage.open()
    await I.header.initSearchSuggest(testData['search query'][1])
    await expect(I.header.getSuggestGoodsTitle(1)).toContainText(testData['search query'][1])
  })

})


test.describe('Testing functionality locations',function(){
  test('should location changed after accept new location', async function({page}){
    const I = new PageFactory(page)
    await I.mainPage.open()
    await I.header.initChangeRegion(testData.locations[1])
    await expect(I.header.getCurrentLocation()).toContainText(testData.locations[1])
  })
})


test.describe('Testing cart functionality', function() {
  
  test('should goods been in cart after adding to cart', async function({page}){
    const I = new PageFactory(page)
    await I.mainPage.open()
    await I.header.initRegularSearch(testData['search query'][4])
    await I.listingPage.addGoodsToCart(1)
    let goodstTitle = await I.listingPage.getGoodsName(1)
    await I.header.cartButton.click()
    await expect(I.cartPage.getGoodsTitles(1)).toContainText(await goodstTitle.allInnerTexts());
    })

  test('should quantity label displayed correct result after adding goods to cart', async function({page}){
    const I = new PageFactory(page)
    await I.mainPage.open()
    await I.header.initRegularSearch(testData['search query'][3])
    await I.listingPage.addGoodsToCart(1)
    await I.listingPage.addGoodsToCart(2)
    await I.listingPage.addGoodsToCart(3)
    await expect(await I.header.getCurentCartQuantity()).toEqual(3);
    })


})


test.describe('Testing listing and goods functionality', function() {
  test('should catalog categories navigate to correct page ', async function({page}){
    const I = new PageFactory(page)
    await I.mainPage.open()
    await I.catalog.catalogOpenButton.click()
    await I.catalog.selectFirstLeveCategory(testData.catalog.firstLevelCategory[1])
    let categoryUrl = await I.catalog.getUrlFromCategoryName(testData.catalog.ThirdLevelCategory[1])
    await I.catalog.selectThirdLevelCategory(testData.catalog.ThirdLevelCategory[1])
    let curentUrl = await I.page.url()
    await expect(curentUrl.includes(categoryUrl)).toBeTruthy()

  })

  test('should goods correctly sorted after click on button of sort price asc', async function({page}){
    const I = new PageFactory(page)
    await I.mainPage.open()
    await I.catalog.catalogOpenButton.click()
    await I.catalog.selectFirstLeveCategory(testData.catalog.firstLevelCategory[3])
    await I.catalog.selectThirdLevelCategory(testData.catalog.ThirdLevelCategory[3])
    await I.listingPage.sortingByPrice()
    await expect(await I.listingPage.getGoodsPrice(1)).toBeLessThan(await I.listingPage.getGoodsPrice(2))
  })

  test('should goods correctly sorted after click on button of sort price desc', async function({page}){
    const I = new PageFactory(page)
    await I.mainPage.open()
    await I.catalog.catalogOpenButton.click()
    await I.catalog.selectFirstLeveCategory(testData.catalog.firstLevelCategory[3])
    await I.catalog.selectThirdLevelCategory(testData.catalog.ThirdLevelCategory[3])
    await I.listingPage.sortingByPrice();await I.listingPage.sortingByPrice();
    await expect(await I.listingPage.getGoodsPrice(1)).toBeGreaterThan(await I.listingPage.getGoodsPrice(2))
  })
})


test.describe('Testing functionality of main page', function() {
  
  test('should big baners navigate to correct page', async function({page}){
    const I = new PageFactory(page)
    await I.mainPage.open()
    let banersUrl = await I.mainPage.getBigBanersUrl()
    await I.mainPage.bigBaners.scrollIntoViewIfNeeded()
    await I.mainPage.bigBaners.click()
    let curentUrl = await I.page.url()
    await expect(await curentUrl.includes(await banersUrl)).toBeTruthy()
    })

  test('should small baners navigate to correct page', async function({page}){
    const I = new PageFactory(page)
    await I.mainPage.open()
    let banersUrl = await I.mainPage.smallBaners.last().getAttribute('href')
    await I.mainPage.smallBaners.last().click()
    let curentUrl = await I.page.url()
    await expect(await curentUrl.includes(await banersUrl)).toBeTruthy()
    })

  test('should popular goods exist on main page', async function({page}){
    const I = new PageFactory(page)
    await I.mainPage.open()
    await expect(await I.mainPage.popularGoods.first()).toBeVisible()
    })

  test('should new categories exist on main page', async function({page}){
    const I = new PageFactory(page)
    await I.mainPage.open()
    await expect(await I.mainPage.popularCategories.first()).toBeVisible()
    })

  test('should new categories on main page correctly navigate', async function({page}){
    const I = new PageFactory(page)
    await I.mainPage.open()
    let popularCategoriesUrl = await I.mainPage.popularCategories.first().getAttribute('href')
    await I.mainPage.popularCategories.first().click()
    let curentUrl = await I.page.url()
    await expect(await curentUrl.includes(await popularCategoriesUrl)).toBeTruthy()
    })
})