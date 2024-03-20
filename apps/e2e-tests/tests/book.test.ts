import test, { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

// Annotate entire file as serial.
test.describe.configure({ mode: 'serial' });

const getBookContainerChildDivCount = async (page: Page): Promise<number> => {
  const numberOfChildDivs = await page.evaluate(() => {
    const parentDiv = document.querySelector('[data-testid="container-books"]');
    if (parentDiv){ 
      return parentDiv.children.length;
    } 
  })
  return numberOfChildDivs ?? 0
}

test('create-and-list', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(100)
  const c1 = await getBookContainerChildDivCount(page)

  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill('test title');
  await page.getByLabel('Title').press('Tab');
  await page.getByLabel('Author').fill('tester');
  await page.getByLabel('Author').press('Tab');
  await page.getByLabel('Description').fill('test description');
  await page.getByRole('button', { name: 'Save New' }).click();
  await page.waitForTimeout(100)

  await page.reload()
  await page.waitForTimeout(100)

  const c2 = await getBookContainerChildDivCount(page)
  expect(c2 - c1).toBe(1)
});

test('create-book', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  const timeStamp = Date.now().toString()
  const text = `this is a test description left at ${timeStamp}`
  
  await page.waitForTimeout(100)

  /** Fill out form and save */
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill('test title');
  await page.getByLabel('Author').click();
  await page.getByLabel('Author').fill('test Author');
  await page.getByLabel('Description').click();
  await page.getByLabel('Description').fill(text);
  await page.getByRole('button', { name: 'Save New' }).click();

  await page.waitForTimeout(100)

  const createdDescriptionCount = await page.getByText(text).count()
  expect(createdDescriptionCount).toBe(1)
});

test('update-book', async ({ page }) => {
  const timeStamp = Date.now().toString()
  const text = `test title ${timeStamp}`
  await page.goto('http://localhost:5173/');
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill(text);
  await page.getByLabel('Title').press('Tab');
  await page.getByLabel('Author').fill('test editor');
  await page.getByLabel('Author').press('Tab');
  await page.getByLabel('Description').fill('edit test');
  await page.getByRole('button', { name: 'Save New' }).click();
  await page.getByRole('heading', { name: `${text}` }).click();
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill(`${text}<*>`);
  await page.waitForTimeout(100)
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForTimeout(100)
  const editedItemCound = await page.getByRole('heading', { name: `${text}<*>` }).count();
  expect(editedItemCound).toBe(1)
});

test('delete-book', async ({ page }) => {
  const description = 'this test is testing tabbing in form and the deletion of a book'

  await page.goto('http://localhost:5173/');
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill('test deletion');
  await page.getByLabel('Title').press('Tab');
  await page.getByLabel('Author').fill('tester');
  await page.getByLabel('Author').press('Tab');
  await page.getByLabel('Description').fill(description);
  await page.getByRole('button', { name: 'Save New' }).click();

  await page.waitForTimeout(100)
  const descriptionCount = await page.getByText(description).count();

  await page.getByText('test deletion-testerthis test').click();
  await page.getByRole('button', { name: 'Delete' }).click();

  await page.waitForTimeout(100)
  const descriptionCountAfterDeletion = await page.getByText(description).count();
  
  expect(descriptionCount).toBe(1)
  expect(descriptionCountAfterDeletion).toBe(0)
});