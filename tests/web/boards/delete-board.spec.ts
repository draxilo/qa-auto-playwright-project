import { test } from '@fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { Board } from '@interfaces/board.interface';
import { addAllure, AllureParams } from '@utils/allure.util';
import { PARENT_SUITE, SUITE } from '@consts/suites.const';
import { TAGS } from '@consts/tag.const';
import { step } from 'allure-js-commons';

/* Allure Parameters */
const allure: AllureParams = {
  description: 'This test deletes a board.',
  parentSuite: PARENT_SUITE.WEB,
  suite: SUITE.BOARDS,
  tags: [TAGS.UI, TAGS.BOARD, TAGS.DELETE, TAGS.SMOKE],
};

const board: Board = {
  name: faker.lorem.words(3),
};

// Set up
test.beforeEach(async ({ apiCreateBoard }) => {
  const createBoardResponse = await apiCreateBoard(board);
  const createBoardResponseBody = await createBoardResponse.json();
  board.id = createBoardResponseBody.id; // Store the board ID
});

test('Delete board', { tag: [...allure.tags] }, async ({ page, homePage, listPage }) => {
  // Allure
  await addAllure(allure);

  // Test Data
  await step('Navigate to the board page', async () => {
    await listPage.goToPage(`/board/${board.id}`);
  });

  await step('Delete the board', async () => {
    await listPage.boardOptionsButton.click();
    await listPage.deleteBoardButton.click();

    await page.reload(); // Reload the page to ensure the board is deleted
  });

  // Assert Board is deleted
  await step('Assert Board is deleted', async () => {
    await homePage.boardIsDeleted(board.name);
  });
});
