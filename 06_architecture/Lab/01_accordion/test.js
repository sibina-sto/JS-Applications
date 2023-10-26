const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

let browser, page; // Declare reusable variables
describe("E2E tests", async function () {

    this.timeout(5000);

    before(async () => { browser = await chromium.launch(); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });
  
    it('load article titles', async () => {
        await page.goto('http://localhost:5500');
        // await page.screenshot({ path: `index.png` });
        
        await page.waitForSelector('.accordion div.head>span');
        const content = await page.textContent('#main');
        
        expect(content).to.contain("Scalable Vector Graphics");
        expect(content).to.contain("Open standard");
        expect(content).to.contain("Unix");
        expect(content).to.contain("ALGOL");
    });
    
    it('has working More button', async () => {
        await page.goto("http://localhost:5500");
        
        await page.click('text=More');
        
        await page.waitForSelector(".extra p");
        
        const text = await page.textContent(".extra p");
        const visible = await page.isVisible('.extra p');
        
        expect(text).to.contain("Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)");
        expect(visible).to.be.true;
    });

    it("has working More button", async () => {
        await page.goto("http://localhost:5500");

        await page.click("text=More");

        await page.waitForSelector(".extra p");
        
        let visible = await page.isVisible(".extra p");
        expect(visible).to.be.true;
        
        await page.click('text=Less');
        visible = await page.isVisible('.extra p');
        expect(visible).to.be.false;
    });
});



