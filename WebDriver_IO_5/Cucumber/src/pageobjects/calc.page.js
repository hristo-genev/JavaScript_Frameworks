import Page from './page';
var path = require("path")

class CalcPage extends Page {

    constructor() {
      super();
      this.pageName = path.basename(__filename).split('\.')[0];
      console.log("pageName:"+ this.pageName);
      this.loc = this.locators(this.pageName).selectors;
    }

    add (num1,num2) {

        console.log(num1,num2);

        // clear
        const btnClear = this.loc.btn_clear;
        console.log("element selector: " + btnClear)
        console.log("Starting waitForExist")
        $(btnClear).waitForExist({timeout: 15000});
        console.log("Ended waitForExist({timeout: 15000})")
        console.log("Starting click()")
        $(btnClear).click();


        // add
        const numA = this.loc.btn_num(num1);
        $(numA).click();

        const btnAdd = this.loc.btn_add;
        $(btnAdd).click();

        const numB = this.loc.btn_num(num2);
        $(numB).click();

        const btnEqual = this.loc.btn_equal;
        $(btnEqual).click();

    }

    verifyResult(expectedResult){
         const theResult = this.loc.txtResult;
         let actualResult =   $(theResult).getText();
         expect(actualResult).to.include(expectedResult);
     }

}


export default new CalcPage()
