const { test, expect } = require('@playwright/test');
const { email, password } = require("../user");

test("Successful authorization", async ({page}) => {

  await page.goto("https://netology.ru/?modal=sign_in");
  await page.screenshot({ path: 'screenShots/sscreenshotSignPage.png' });
  await page.fill('[placeholder="Email"]', email);
  await page.screenshot({ path: 'screenShots/screenshotEmailPage.png' });
  await page.press('[placeholder="Email"]', 'Tab');
  await page.fill('[placeholder="Пароль"]', password);
  await page.screenshot({ path: 'screenShots/screenshotPasswordPage.png' });
  await page.click('[data-testid="login-submit-btn"]');
  await page.waitForSelector('text="Моё обучение"');
  await expect(page.locator('h2')).toHaveText('Моё обучение');
  await page.screenshot({ path: 'screenShots/screenshotMyCoursePage.png' });
  await page.close();
  
});

test("Unsuccessful authorization", async ({page}) => {

  const invalidPassword = "123456"

  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', email);
  await page.press('[placeholder="Email"]', 'Tab');
  await page.fill('[placeholder="Пароль"]', invalidPassword);
  await page.click('[data-testid="login-submit-btn"]');
  await page.waitForSelector(`text="Вы ввели неправильно логин или пароль."`); 
  await page.screenshot({ path: 'screenShots/screenshotErrorTextPage.png' });
  await expect(page.getByTestId(`login-error-hint`)).toHaveText(`Вы ввели неправильно логин или пароль.`);
  await page.close();

});


