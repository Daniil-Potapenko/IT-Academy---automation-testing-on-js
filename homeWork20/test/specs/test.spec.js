const SearchElement = require('../pageComponents/SearchElement');
const MainPage = require('../pageObjects/main.page')
const ThemeСhangerElement = require('../pageComponents/ThemeСhangerElement')

describe('Search functionality testing', () => {

    beforeAll(()=>{
        browser.setWindowSize(1920 , 1080)
    })

    it('Should search return correct result at correct search query',async () => {
        let searchQuery = 'bug'
        await MainPage.open()
        await SearchElement.initializeSearch(searchQuery)
        let searchResult = await SearchElement.resultFirstElementTitle.getText()
        expect(searchResult.toLocaleLowerCase()).toBe(searchQuery.toLocaleLowerCase())
    });

    it('Should search return empty result at uncorrect search query',async () => {
        let searchQuery = 'jcpij$76D5BmF8'
        await MainPage.open()
        await SearchElement.initializeSearch(searchQuery)
        let noSearchResultPageIsVisible = await $(SearchElement.fieldNoResults).isEnabled()
        expect(noSearchResultPageIsVisible).toBe(true);
    });

    it('Should search result`s link navigating to correct page',async () => {
        let searchQuery = 'isExisting'
        await MainPage.open()
        await SearchElement.initializeSearch(searchQuery)
        let searchResultFirstElementUrl = await $(SearchElement.resultFirstElementLink).getAttribute('href')
        await $(SearchElement.resultFirstElementLink).click()
        expect("https://webdriver.io"+searchResultFirstElementUrl).toBe(await browser.getUrl());
    });
});

describe('Testing functionality switching between dark and light mode', () => {

    beforeAll(()=>{
        browser.setWindowSize(1920 , 1080)
    })

    it('should mode been changed after click by change theme button',async () => {
        await MainPage.open()
        let originalTheme = await ThemeСhangerElement.getCurrentTheme()
        await ThemeСhangerElement.changeTheme()
        let currentTheme = await ThemeСhangerElement.getCurrentTheme()
        expect(originalTheme).not.toBe(currentTheme);
    });

    it('should icon of change theme button been changed after change mode',async () => {
        await MainPage.open()
        let originalIcon = await ThemeСhangerElement.getCurrentIcon()
        await ThemeСhangerElement.changeTheme()
        let currentIcon = await ThemeСhangerElement.getCurrentIcon()
        expect(originalIcon).not.toBe(currentIcon);
    })


});