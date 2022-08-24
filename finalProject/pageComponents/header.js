class Header{
    constructor(page){
        this.page=page

        
        this.logonButton = this.page.locator('//button[@data-testid="loginButton"]')  
        this.logonEmailField = this.page.locator('//input[@id="login-email"]')
        this.logonPasswordField = this.page.locator('//input[@id="login-password"]')
        this.logonAcceptButton = this.page.locator('.styles_submitButton__lmwVK')
        this.logoutButton = this.page.locator('.ProfileItem_itemLogout__1XgF8')
        this.logonErrorMessage = this.page.locator('//span[@class="input-error-message__message"]')
        this.currentAccountTitle = this.page.locator("//span[@class='userToolsSubtitle']")
        this.favoriteList = this.page.locator("//a[contains(div,'Избранные товары')]")
        
        this.accountButton = this.page.locator("//button[@class='styles_userToolsToggler__imcSl']")    
        this.cartButton = this.page.locator(".headerCartBox")
        this.searchField = this.page.locator("//input[@id='catalogSearch']")


        this.curentLocationButton = this.page.locator('//button[@class="styles_localityBtn__3_asA"]')
        this.changeLocationField = this.page.locator('//input[@class="style_inputStyle__1dvyw style_inputClassName__3vv9x"]')
        this.acceptNewLocationButton = this.page.locator('//button[@class="styles_reactButton__2olKd style_baseActionButton__2LQYJ styles_actionButton__2olFH"]')
    }





    async initChangeRegion(newRegion){
        await this.curentLocationButton.click()
        await this.changeLocationField.fill(newRegion)
        await this.page.locator('//li[@class="styles_selectOption__uzAMB styles_withCheckMark__3U2_K styles_flexRow__1AUaA"]').click()
        await this.acceptNewLocationButton.click()
    }

    async initRegularSearch(searchValue){
        await this.searchField.fill(searchValue)
        await this.page.press('body','Enter')
        await this.page.waitForLoadState()
    }

    async initSearchSuggest(searchValue){
        await this.searchField.fill(searchValue)
        await this.searchField.click()
        await this.page.waitForResponse((response) => {
            return response.url().includes('search.21vek.by')})
    }

    async getCurentCartQuantity(){
        let quantity = await this.page.locator('//span[@data-testid="header-count"]').allInnerTexts()
        return Number(quantity.join())
    }

    getCurrentLocation(){
        return  this.page.locator(`//button[@class="styles_localityBtn__3_asA"]//span`)
    }
    getSuggestGoodsTitle(position){
        return this.page.locator(`(//div[@class="ProductItem_title__1Gh5N"]//span)[${position}]`)
    }

    async getCurrentAccountTitle(){
        await this.accountButton.waitFor()
        await this.accountButton.click()
        await this.currentAccountTitle.waitFor()
        let CurrentAccount = await this.currentAccountTitle.allInnerTexts()
        return await CurrentAccount.join()
    }

    async initLogon(email,password){
        await this.accountButton.click()
        await this.logonButton.click()
        await this.logonEmailField.click()
        await this.logonEmailField.fill(email)
        await this.logonPasswordField.click()
        await this.logonPasswordField.fill(password)
        await this.logonAcceptButton.click()
    }

    async initLogout(){
        await this.accountButton.click()
        await this.logoutButton.click()
    }

    


    

}

module.exports = {Header}