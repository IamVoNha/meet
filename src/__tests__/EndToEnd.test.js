import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    // browser = await puppeteer.launch({
      //   headless: false, //allows the browser to interact with your app. Like you're watching an invisible user.
      //   slowMo: 250, // slow down by 250ms so you can see what happening BETTER, while the browser is interacting with your app.
      //   ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors.
      // });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .eventButton');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .eventButton');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});