import puppeteer from 'puppeteer';

import server from '../../../../e2e';

describe('CounterE2E', () => {
  let page = null;
  let browser = null;

  beforeAll(async () => {
    const width = 1280;
    const height = 800;

    const launch = {
      headless: false,
      slowMo: 80,
      args: [`--window-size=${width},${height}`, '--no-sandbox']
    };

    await server;
    browser = await puppeteer.launch(launch);
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });

  afterAll(async () => {
    await browser.close();
    await server.close();
  });

  beforeEach(async () => {
    await page.goto('http://localhost:3000/playground/counter');
  });

  it('should display count', async () => {
    const selector = 'main > playground--counter > div > p';
    const text = await page.$eval(selector, el => el.textContent);
    expect(text).toMatch('Clicked: 0 times, value is even.');
  });
});
