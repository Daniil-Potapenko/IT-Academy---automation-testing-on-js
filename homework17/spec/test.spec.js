const { Builder, By, Key, ChromiumWebDriver } = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");


describe('Тесты с исполдьзованием selenium-webdriver', () => {
    let driver;
    let options;
    beforeAll(async() => {
        options = new chrome.Options().addArguments("start-maximized","disable-infobars","--log-level=3")
        driver = new Builder().forBrowser("chrome").setChromeOptions(options).build()
    })
    beforeEach(async() => {
        await driver.get("https://chromedriver.chromium.org/home");
    });
    it('should first tab title is correct...', async() => {
        title = await driver.findElement(By.xpath('//span[@class=" Rn3Z1b"]')).getText()
        expect(title).toBe("ChromeDriver");
    });
    it('should second tab title is correct...', async() => {
        chromeExtensionsHeaderButton = await driver.findElement(By.xpath('//a[@class="aJHbb dk90Ob jgXgSe HlqNPb"][text()="Chrome Extensions"]'))
        await driver.actions().click(chromeExtensionsHeaderButton).perform();
        title = await driver.findElement(By.xpath('//span[@class=" Rn3Z1b"]')).getText()
        expect(title).toBe("Chrome Extensions");
    });
    it('should search result is correct...', async() => {
        searchHeaderButton = await driver.findElement(By.xpath('//div[@class="U26fgb mUbCce fKz7Od iWs3gf Wdnjke M9Bg4d"]'))
        await driver.actions().click(searchHeaderButton).perform();
        await driver.sleep(500);
        searchHeaderInputField = await driver.findElement(By.xpath('//input[@class="whsOnd zHQkBf"]'))
        await searchHeaderInputField.sendKeys("driver")
        await driver.actions().sendKeys(Key.ENTER).perform();
        await driver.sleep(1000);
        firstLinkOnSearchResultPage=await driver.findElement(By.xpath('//a[@data-position=1]')).getAttribute('href');
        expect(firstLinkOnSearchResultPage.includes('driver')).toBe(true);
    });

    afterAll(() => {
        driver.quit()
    });
});
