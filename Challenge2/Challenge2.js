require ('chromedriver');
var webdriver = require ('selenium-webdriver');
var assert = require('chai').assert;

describe ("challenge2 suite", function(){
    this.timeout(20000);
    var driver;
    before (function () {
        // initializing chrome driver 
        driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
            });
            after (function (){
                return driver.quit();
                    });

    it("Going to copart.com", function(){
        return driver.get("https://www.copart.com/");
    });
    it("The title includes 'Copart'", function(){
        return driver.getTitle().then(function(title){
assert.include(title, "Copart", "Copart not found in title");
        });

    });
});

