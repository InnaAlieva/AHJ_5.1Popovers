import puppetteer from "puppeteer";

jest.setTimeout(60000); // default puppeteer timeout
describe("test", () => {
  let browser = null;
  let page = null;
  const baseUrl = "http://localhost:8888";

  beforeAll(async () => {
    browser = await puppetteer.launch();

    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Открытие страницы", async () => {
    await page.goto(baseUrl);
  });

  test("remove tooltip", async () => {
    await page.goto(baseUrl);
    const button = await page.$("button");
    button.click().catch((e) => e);
    await page.waitForSelector(".hidden");
  });
});
