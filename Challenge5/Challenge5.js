require ('chromedriver');
var webdriver = require ('selenium-webdriver');
var assert = require('chai').assert;
By = webdriver.By;
Key = webdriver.Key;
until = webdriver.until;


describe ("challenge5 suite", function(){
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
        var title = await driver.getTitle()
        return assert.include(title, "Copart", "Copart not found in title");
        });

        it("Should search for 'porsche'", async function(){
            var element = await driver.findElement(By.xpath('//*[@id="input-search"]'))
            return element.sendKeys("porsche" + Key.ENTER);
        }); 
        it("Finds 'PORSCHE' in the search results", async function () {
            await driver.wait(until.elementLocated(By.xpath('//table[@id="serverSideDataTable"]//td')), 2000)
            var searchResults = await driver.findElement(By.id("serverSideDataTable")).getText();
            return assert.include(searchResults, "PORSCHE", "Porsche was found in the search results.")
        });

        it("will wait for the spinner to be gone and change the drop down to show 100 entries", async function(){
            await driver.wait(until.elementIsNotVisible(driver.findElement(By.id("serverSideDataTable_processing"))));
            await driver.findElement(By.xpath('//*[@id="serverSideDataTable_length"]//option[@value="100"]')).click;
            // return assert.include(oneToOneHundred, "Showing 1 to 100", "There aren't 100 entries showing");
            var maxEntries = await driver.wait(until.elementLocated(By.xpath('//*[@id="serverSideDataTable"]/tbody/tr[100]')));
            return assert.isOk(maxEntries, )
        });

    it("Adds the ", async function () {
        var popularList = await driver.findElements(By.xpath('//*[@id="tabTrending"]/div[1]//a'));
        for (let i=0; i < popularList.length - 1; i++ ){
            console.log(await popularList[i].getText() + " - " + await popularList[i].getAttribute("href"));
        }

    });
    });


