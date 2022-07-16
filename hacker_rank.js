const puppeteer = require("puppeteer");

const codeObj = require('./codes')

const loginlink = 'https://www.hackerrank.com/auth/login'
const email = "donaldtrump345@gmail.com"
const password = "bt!4cegbhJ.U#$"


let browserOpen = puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null
})

let page;

browserOpen
    .then(function (browserObj) {
        // currently open tag;
        let browserOpenPromise = browserObj.newPage();
        return browserOpenPromise;

    }).then(function (newTab) {
        page = newTab;
        let hackerRankOpenPromise = newTab.goto(loginlink)
        return hackerRankOpenPromise;

    }).then(function () {
        let emailIsEntered = page.type("input[id='input-1']", email, { delay: 60 })
        console.log("a");
        return emailIsEntered

    }).then(function () {
        let passwordIsEntered = page.type("input[type='password']", password, { delay: 60 })
        console.log("b");
        return passwordIsEntered

    }).then(function () {
        let loginButtonClicked = page.click("button[data-analytics='LoginPassword']", { delay: 60 })
        console.log("c");
        return loginButtonClicked

    }).then(function () {
        let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1 = "algorithms"]', page, { delay: 60 })
        console.log("d");
        return clickOnAlgoPromise

    }).then(function () {
        let getToWarmUp = waitAndClick("input[value='warmup']", page, { delay: 60 })
        console.log("e");
        return getToWarmUp

    }).then(function () {
        let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', { delay: 60 }) // document.querySelectorAll -> $$   and  document.querySelector -> $
        console.log("f");
        return allChallengesPromise

    }).then(function (questionArr) {
        console.log("number of ques -> ", questionArr.length);
        let questionWillBeSolved = questionSolver(page, questionArr[0], codeObj.answers[0])
        console.log("g");
        return questionWillBeSolved

    })




function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function () {
            let clickModal = cPage.click(selector)
            return clickModal
        }).then(function () {
            console.log("resolve xx");
            resolve()
        }).catch(function (err) {
            console.log("catch yy");
            reject()
        })
    })
}

function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {

        let questionWillBeClicked = question.click()
        questionWillBeClicked
            .then(function () {

                let editorInFocusPromise = waitAndClick('.monaco-editor.no-user-select vs', page, { delay: 50 })
                console.log("\n 1");
                return editorInFocusPromise

            })
            .then(function () {
                console.log("\n 2");
                return page.click('.checkbox-input', { delay: 100 })

            }).then(function () {
                console.log("\n 3");
                return page.waitForSelector('.textarea.custominput', page, { delay: 100 })

            }).then(function () {
                console.log("\n 4");
                return page.type('.textarea.custominput', answer, { delay: 10 })

            }).then(function () {
                let ctrlIsPressed = page.keyboard.down('Control')
                console.log("\n 5");
                return ctrlIsPressed
            }).then(function () {
                let AIsPressed = page.keyboard.press('A', { delay: 10 })
                console.log("\n 6");
                return AIsPressed

            }).then(function () {
                let XIsPressed = page.keyboard.press('X', { delay: 10 })
                console.log("\n 7");
                return XIsPressed

            }).then(function () {
                let ctrlIsUnPressed = page.keyboard.up('Control')
                console.log("\n 8");
                return ctrlIsUnPressed

            }).then(function () {
                let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select vs', page)
                console.log("\n 9");
                return mainEditorInFocus

            }).then(function () {
                let ctrlIsPressed = page.keyboard.down('Control')
                return ctrlIsPressed

            }).then(function () {
                let AIsPressed = page.keyboard.press('A', { delay: 10 })
                return AIsPressed

            }).then(function () {
                let VisPressed = page.keyboard.press('V', { delay: 10 })
                return VisPressed

            }).then(function () {
                let ctrlIsUnPressed = page.keyboard.up('Control')
                return ctrlIsUnPressed

            }).then(function () {
                resolve()
            }).catch(function () {
                reject();
            })
    })
}