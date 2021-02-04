require ('chromedriver');
var webdriver = require ('selenium-webdriver');
var assert = require('chai').assert;
By = webdriver.By;
Key = webdriver.Key;
until = webdriver.until;


describe ("challenge3 suite", function(){
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

    it("Should find and click on the 'Trending' link", async function(){
        await driver.findElement(By.xpath('//*[@id="tabTrending"]')).click;
    });

    it("Goes through the popular makes and models and prints the link and the make or model name", async function () {
        var popularList = await driver.findElements(By.xpath('//*[@id="tabTrending"]/div[1]//a'));
        for (let i=0; i < popularList.length - 1; i++ ){ //  popularList.length - 1 because there is a 'more' link that links to a registration page that I don't care about
        console.log(await popularList[i].getAttribute("textContent") + " - " + await popularList[i].getAttribute("href"));
        }

    });
    });


