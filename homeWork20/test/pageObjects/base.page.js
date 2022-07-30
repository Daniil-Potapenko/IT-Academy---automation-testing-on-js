module.exports = class BasePage{
    
    async open(url){
        await browser.url(`https://${url}`)
    }

}

