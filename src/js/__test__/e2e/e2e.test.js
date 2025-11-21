import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(60000);

describe('test', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:8888';

  beforeAll(async () => {
    // Запускаем сервер
    server = fork(`${__dirname}/../server.js`);

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
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',             
        '--window-size=1280,720',   
      ],
      defaultViewport: null,           
    });

    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
    if (server) {
      server.kill();
    }
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

    await page.waitForSelector('button', { timeout: 5000 });
    const button = await page.$('button');

    if (!button) {
      throw new Error('Кнопка не найдена на странице');
    }

    await button.click();

    await page.waitForSelector('.hidden', {
      visible: true,
      timeout: 5000,
    });
  });
});
