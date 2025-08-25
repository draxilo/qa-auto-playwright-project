import { test } from '@/fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { addAllure, AllureParams } from '@/utils/allure.util';

/* Allure Parameters */
const allure: AllureParams = {
  description: 'This test creates the first board.',
  suite: 'Board Management',
  tags: ['@ui', '@board', '@create', '@smoke'],
};

// Set up
test.beforeEach(async ({ apiDeleteAllBoards }) => {
  await apiDeleteAllBoards();
});

test(
  'create first board',
  { tag: [...allure.tags] },
  async ({ page, getStartedPage, listPage }) => {
    // Allure
    await addAllure(allure);

    // Test Data
    const boardName = faker.lorem.words(3);

    await test.step('Navigate to the get started page', async () => {
      await getStartedPage.goToPage('');
    });
    await test.step('Create the first board', async () => {
      await getStartedPage.firstBoardInput.fill(boardName);
      await page.keyboard.press('Enter');
    });

    await test.step('Assert Board created', async () => {
      await listPage.assertBoardCreated(boardName);
    });
  },
);

// Tear down
test.afterEach(async ({ apiDeleteAllBoards }) => {
  await apiDeleteAllBoards();
});
