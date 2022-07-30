const BasePage = require('./base.page')

class MainPage extends BasePage{
    async open(){
        return await super.open('webdriver.io')
    }
}

module.exports = new MainPage()