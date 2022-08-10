const { BaseProperty } = require("../helpers/BaseProperty")


 class SearchElement{
     constructor (){
        this.headerButton =  '//button[@class="DocSearch DocSearch-Button"]'
        this.inputField =  '//input[@id="docsearch-input"]'
        this.resultFirstElementLink = '//li[@id="docsearch-item-0"]//a'
        this.fieldNoResults =  '//div[@class="DocSearch-NoResults"]'

        
        this.resultFirstElementTitle = new class extends BaseProperty{
            constructor(){
                super();
                this.selector= ('//li[@id="docsearch-item-0"]//mark')
            }
        }
           

    }


    async initializeSearch(query){
        await $(this.headerButton).click();
        await $(this.inputField).setValue(query);
    }
}

module.exports = new SearchElement()

