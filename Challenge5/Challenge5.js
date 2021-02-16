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
            await driver.findElement(By.xpath('//*[@id="input-search"]')).sendKeys("porsche");
            await driver.findElement(By.xpath('//*[@data-uname="homepageHeadersearchsubmit"]')).click();
        }); 

        it("Finds 'PORSCHE' in the search results", async function () {
            await driver.wait(until.elementLocated(By.xpath('//table[@id="serverSideDataTable"]//td')), 5000);
            var searchResults = await driver.findElement(By.id("serverSideDataTable")).getText();
            return assert.include(searchResults, "PORSCHE", "Porsche was found in the search results.");
        });

        it("Will change the show entries drop down to 100", async function(){
            await driver.findElement(By.xpath('//div[@class="top"]//select[@name="serverSideDataTable_length"]//option[@value="100"]')).click;
            // await driver.wait(until.elementIsNotVisible(driver.findElement(By.id("serverSideDataTable_processing"))));
            await driver.wait(until.elementLocated(By.xpath('//*[@id="serverSideDataTable"]/tbody/tr[100]')));
            // return assert.isOk(maxEntries);
        });

    it("Adds the model results and adds to an array and prints the info out", async function () {
        var modelArray = [];
        
        var modelList = await driver.findElements(By.xpath('//*[@data-uname="lotsearchLotmodel"]'));
        for (var i=0; i < modelList.length; i++ ){
            // console.log(await modelList[i].getText());
            modelArray.push(await modelList[i].getText());
        }
        sortedArray = modelArray.sort();
        for (var i=0; i <sortedArray.length; i++){
            console.log(sortedArray[i]);
        }

    });

    it("Adds the different damage types to an array and prints the info out", async function () {
        var damageList = await driver.findElements(By.xpath('//*[@data-uname="lotsearchLotdamagedescription"]'));                                                 
    });
    });


