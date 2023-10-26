const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

const host = "http://127.0.0.1:5500/01.Messenger/";

describe("Messenger:", function () {
  let browser, page;

  before(async () => {
    // browser = await chromium.launch({headless: false, slowMo: 1000});
    browser = await chromium.launch();
  });
  after(async () => await browser.close());
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  it("should load all messages", async function () {
    await page.goto(host);
    const [response] = await Promise.all([
      page.waitForResponse("**/jsonstore/messenger"),
      page.click("#refresh"),
    ]);
    const data = Object.values(await response.json());
    const actualContent = await page.inputValue("#messages");
    data.forEach((post) => {
      expect(actualContent).to.contain(`${post.author}: ${post.content}`);
    });
  });

  it("should send message", async function () {
    await page.goto(host);
    await page.fill("#author", "Petar");
    await page.fill("#content", "Test content");

    const [response] = await Promise.all([
      page.waitForResponse("**/jsonstore/messenger"),
      page.click("#submit"),
    ]);

    const postData = JSON.parse(await response.request().postData());

    expect(postData.author).to.be.equal("Petar");
    expect(postData.content).to.be.equal("Test content");
  });
});
