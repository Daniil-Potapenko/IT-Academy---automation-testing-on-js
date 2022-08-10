class BaseProperty{
    
    async get(){
        return await $(this.selector)
    }
    async getText(){
        return await $(this.selector).getText();
    }
    
    async click(){
        await $(this.selector).click();
    }

}

module.exports = {BaseProperty}