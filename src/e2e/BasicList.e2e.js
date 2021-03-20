import puppeteer from 'puppeteer';

test('BasicList', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 20,
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/user/login');
  await page.waitForSelector('#username');
  await page.type('#username', 'admin0');
  await page.type('#password', 'admin0');
  await page.click("button[class='ant-btn ant-btn-primary ant-btn-lg']");
  await page.waitForNavigation();
  await page.goto('http://localhost:8000/basic-list/api/admins');
  await page.waitForSelector("button[class='ant-btn ant-btn-primary btn-add'] span");
  await page.click("button[class='ant-btn ant-btn-primary btn-add'] span");
  await page.waitForSelector('#username');
  await page.type('#username', 'testUsername');

  await page.close();
  browser.close();
});
