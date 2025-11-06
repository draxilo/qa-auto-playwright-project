import { test } from '@fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { addAllure, AllureParams } from '@utils/allure.util';
import { PARENT_SUITE, SUITE } from '@consts/suites.const';
import { TAGS } from '@consts/tag.const';

/* Allure Parameters */
const allure: AllureParams = {
  description: 'This test creates the first board.',
  parentSuite: PARENT_SUITE.WEB,
  suite: SUITE.BOARDS,
  tags: [TAGS.UI, TAGS.BOARD, TAGS.CREATE, TAGS.SMOKE],
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
