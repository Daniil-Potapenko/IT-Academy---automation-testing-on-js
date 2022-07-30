class ThemeСhangerElement{
    constructor(){
        this.iconLightTheme='//*[@class="lightToggleIcon_v35p"]'
        this.iconDarkTheme='//*[@class="darkToggleIcon_nQuB"]'
        this.changeThemeButton = '//div[@class="toggleButton_rCf9"]'
    }

    async getCurrentTheme(){
        let currentTheme = await $('//html[@data-theme]').getAttribute('data-theme')
        return currentTheme
    }

    async getCurrentIcon(){
        let currentIcon = await $(this.iconDarkTheme).isDisplayed()?
            $(this.iconDarkTheme).getAttribute('class')
            :$(this.iconLightTheme).getAttribute('class')
        return currentIcon
    }

    async changeTheme(){
        await $(this.changeThemeButton).click()
    }

}

module.exports = new ThemeСhangerElement()