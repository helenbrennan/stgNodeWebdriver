var webdriver = require('selenium-webdriver')
module.exports = setup

function setup (){
    var driver;
    before (function () {
        // initializing chrome driver 
        driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
        driver.manage().window().maximize();
        driver.get(url)
        return driver
            });
    after (function (){
        return driver.quit();
         });
}