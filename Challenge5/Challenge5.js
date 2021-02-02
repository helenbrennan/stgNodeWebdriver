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
        let title = await driver.getTitle()
        return assert.include(title, "Copart", "Copart not found in title");
        });

        it("Should search for 'porsche'", async function(){
            let element = await driver.findElement(By.xpath('//*[@id="input-search"]'))
            return element.sendKeys("porsche" + Key.ENTER);
            

    it("Goes through the popular makes and models and prints the link and the make or model", async function () {
        let popularList = await driver.findElements(By.xpath('//*[@id="tabTrending"]/div[1]//a'));
        for (let i=0; i < popularList.length - 1; i++ ){
            console.log(await popularList[i].getText() + " - " + await popularList[i].getAttribute("href"));
        }

    });
    });


