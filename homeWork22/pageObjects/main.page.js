class MainPage {
     constructor(page){
        this.page = page
     }
    async open(){
        await this.page.goto('https://7745.by/', {waitUntil:'load'});
        await this.page.setViewportSize({ width: 1920, height: 1080  })
    }


}

module.exports = {MainPage}