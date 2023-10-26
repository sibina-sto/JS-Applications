const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

const host = "http://127.0.0.1:5500/02.Book-Library";

describe("Book Library", function () {
  let browser, page;

  before(async () => {
    // browser = await chromium.launch({ headless: false, slowMo: 2000 });
    browser = await chromium.launch();
  });
  after(async () => await browser.close());
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(host);
  });
  afterEach(async () => await page.close());

  it("should load all books", async () => {
    const [response] = await Promise.all([
      page.waitForResponse("**/jsonstore/collections/books"),
      page.click("#loadBooks"),
    ]);

    const data = Object.values(await response.json());
    const actualTbodyContent = await page.textContent("tbody");

    data.forEach((book) => {
      expect(actualTbodyContent).to.contain(book.author);
      expect(actualTbodyContent).to.contain(book.title);
    });
  });

  it("should add new book", async () => {
    await page.fill('input[name="title"]', "AlaBala");
    await page.fill('input[name="author"]', "Peter");

    const [response] = await Promise.all([
      page.waitForResponse("**/jsonstore/collections/books"),
      page.click("#createForm button"),
    ]);

    const actualData = JSON.parse(await response.request().postData());
    expect(actualData.author).to.be.equal("Peter");
    expect(actualData.title).to.be.equal("AlaBala");
  });
});
