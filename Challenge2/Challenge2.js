require ('chromedriver');
var webdriver = require ('selenium-webdriver');
var assert = require('chai').assert;
By = webdriver.By;
Key = webdriver.Key;
until = webdriver.until;


describe ("challenge2 suite", function(){
    this.timeout(20000);
    var driver;
    before (function () {
        // initializing chrome driver 
        driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
        driver.manage().window().maximize();
            });
            after (function (){
                return driver.quit();
                    });

    it("Should go to copart.com", function(){
        return driver.get("https://www.copart.com/");
    });
    it("Should have a title that includes 'Copart'", async function(){
        let title = await driver.getTitle()
        return assert.include(title, "Copart", "Copart not found in title");
        });

    it("Should search for 'exotic'", async function(){
        let element = await driver.findElement(By.xpath('//*[@id="input-search"]'))
        return element.sendKeys("exotic" + Key.ENTER);
        
    });
    it("Finds 'PORSCHE' in the search results", async function () {
        await driver.wait(until.elementLocated(By.xpath('//table[@id="serverSideDataTable"]//td')), 2000)
        let porscheResults = await driver.findElement(By.xpath('//table[@id="serverSideDataTable"]//span[text()="PORSCHE"]'))
        return assert.isNotOk(porscheResults.length > 0, "'PORSCHE' was present in the results.")
    });
    });


