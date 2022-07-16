const puppeteer = require("puppeteer");
let page;
console.log("before");
const browserOpenpromise = puppeteer.launch({
    headless:false,
    sloMo: true,
    defaultViewport:null,
    args : ["--start-maximized"]
});
browserOpenpromise
    .then(function(browser){
    // currently open tag;
    const pagesArrpromise = browser.pages();
    return pagesArrpromise;

}).then(function (browserPages){
    page = browserPages[0];
    let gotoPromise = page.goto("https://www.google.com/");
    return gotoPromise;

}).then(function(){
    // waiting for element to apppear on the page
    let elementWaitPromise = page.waitForSelector("input[type='text']",{visible:true});
    return elementWaitPromise;

}). then (function(){
    // reached google home page
    // type on the page using selector
    let keyWillBeSendPromise = page.type("input[type='text']","pepcoding", {delay:50});
    return keyWillBeSendPromise;

}).then(function(){
    // page.keyboard is used to special characters
    let enterWillBePressed = page.keyboard.press("Enter");
    return enterWillBePressed;

}).then(function(){
    let elementWaitPromise = page.waitForSelector(".LC20lb.DKV0Md", {visible:true});
    return elementWaitPromise;

}).then(function(){
    let keyWillBeSendPromise = page.click("h3.LC20lb.DKV0Md", {delay:10});
    return keyWillBeSendPromise;

})
.catch(function(err){
    console.log(err);
})
console.log("after");


// Run using :- node browser_automation.js
