import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(60000);

describe('test', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:8888';

  beforeAll(async () => {
    server = fork(`${__dirname}/../../../server.js`);

    await new Promise((resolve, reject) => {
      server.on('error', reject);

      server.on('message', (message) => {
        if (message === 'server-ready') {
          resolve();
        }
      });

      setTimeout(() => reject(new Error('Сервер не запустился')), 10000);
    });

    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    });
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
  });

  afterAll(async () => {
    if (browser) await browser.close();
    if (server) server.kill();
  });

  test('Открытие страницы', async () => {
    await page.goto(baseUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 10000,
    });
    const title = await page.title();
    expect(title).not.toBe('');
  });

  test('remove tooltip', async () => {
    await page.goto(baseUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 10000,
    });

    await page.waitForSelector('#tooltip-btn', { timeout: 5000 });
    const button = await page.$('#tooltip-btn');

    if (!button) {
      throw new Error('Кнопка не найдена на странице');
    }

    await button.click();

    await page.waitForSelector('#tooltip.hidden', {
      visible: true,
      timeout: 5000,
    });
  });
});
