require('chromedriver');
var webdriver = require('selenium-webdriver');
var assert = require("chai").assert;
var By = webdriver.By;
var Key = webdriver.Key;
var until = webdriver.until;
var driver;

describe("challenge 5", function(){
   this.timeout(20000);
   
   before(function(){
       setup();
   });

   after(function(){
       teardown()
    });

  

    it("enter search term and wait for page to load",async function(){
        var searchTerm = "exotic";
        let searchFieldXpath= '//input[contains(@class,"newsearch")]';
        await driver.findElement(By.xpath(searchFieldXpath)).sendKeys(searchTerm + Key.ENTER);
        await driver.wait(until.titleContains(searchTerm), 10000, " Page title does not match");
        await driver.wait(until.elementLocated(By.id('serverSideDataTable')),10000);
       })
       
       
        it("waiting for search page to load", async function(){
            var num_entries__location = By.xpath('//select[@name="serverSideDataTable_length"]');
            await driver.findElement(num_entries__location).click();

            var one_hundred__location = By.xpath('//select[@name="serverSideDataTable_length"]/option[contains(@value,"100")]');
            await driver.wait(until.elementLocated(one_hundred__location),10000);
            await driver.findElement(one_hundred__location).click();

            var spinner__location = By.xpath("//div[@id='serverSideDataTable_processing' and contains(@style,'block')]");
            var spinner__element = await driver.findElement(spinner__location)
            await driver.wait(until.elementIsNotVisible(spinner__element),10000);


            try {
                await driver.findElement(By.xpath("waiting ten seconds"),10000)
            } catch (error) {
                
            }

            await getDamage();
           // await getModels();
       
       })
       
       });
       
       
        //-------------------get the models of the cars off of the seach results page-----------
       async function getModels(){
         var modelXpath= '//span[@data-uname="lotsearchLotmodel"]';
         await driver.wait(until.elementLocated(By.xpath(modelXpath)),10000);
         var listOfModelsElements = await driver.findElements(By.xpath(modelXpath));
         var models = {};
       
          for(let i=0; i<listOfModelsElements.length; i++){
             let temp = (await listOfModelsElements[i].getText());
       
             if(models.hasOwnProperty(temp) ){
                 models[temp] = models[temp] + 1;
             }else if(temp !==''){
               models[temp] = 1;
             }
       
          }
         console.log('--------- Car Models -----------');
         console.log(models)
         console.log('--------- Complete -------------');
       
       }
       
       
       //---get the type  of damages for the cars off of the seach results page-----
       
       async function getDamage(){
         var damageXpath = '//span[@data-uname="lotsearchLotdamagedescription"]';
         await driver.wait(until.elementLocated(By.xpath(damageXpath)),10000);
         var listOfDamagesElements = await driver.findElements(By.xpath(damageXpath));

         var damages = {
           'REAR END':0,
           'FRONT END':0,
           'MINOR DENT/SCRATCHES':0,
           'UNDERCARRIAGE':0,
           'MISC':0
         };

         var damagesObject = {
            'REAR END':0,
            'FRONT END':0,
            'MINOR DENT/SCRATCHES':0,
            'UNDERCARRIAGE':0,
            'MISC':0
          };
    
         for (let y = 0; y < listOfDamagesElements.length; y++) {
       
          let temp = await listOfDamagesElements[y].getAttribute('innerHTML');
       
            switch(temp){
                case 'REAR END':
                    damages['REAR END']++;
                    break;
                case 'FRONT END':
                damages['FRONT END']++;
                break;
                case 'MINOR DENT/SCRATCHES':
                damages['MINOR DENT/SCRATCHES']++;
                break;
                case 'UNDERCARRIAGE':
                damages['UNDERCARRIAGE']++;
                break;
                default:
                damages['MISC']++;
                break;
            }

        // can accomplish the same as the switch statement by using the code below 

        //    if(damagesObject.hasOwnProperty(temp)){
        //     damagesObject[temp]= damagesObject[temp] + 1;
        //    }else{
        //     damagesObject["MISC"]++;
        //    }
         }




         console.log('--------- Car Damages -----------');
         var keys = Object.keys(damages);
         var total_cars = 0;
         for(let x =0; x<keys.length;x++){
            console.log(keys[x] +": "+ " -- " + damages[keys[x]]);
            total_cars += damages[keys[x]]
        }

         console.log("Total damaged cars:" + total_cars)
         console.log('--------- Complete -----------');
       
       }
       
function setup(){
    // initializing chrome driver
    driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
    driver.get("https://www.copart.com");
    driver.manage().window().maximize();

 }
 async function teardown(){
     
    try {
        await driver.findElement(By.xpath("waiting ten seconds"),10000)
    } catch (error) {
        
    }
       return driver.close();
 }

