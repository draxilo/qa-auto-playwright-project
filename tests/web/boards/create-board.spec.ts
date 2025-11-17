import { faker } from '@faker-js/faker';
import { test } from '@fixtures/base.fixture';
import { Board } from '@interfaces/board.interface';
import { addAllure, AllureParams } from '@utils/allure.util';
import { PARENT_SUITE, SUITE } from '@consts/suites.const';
import { TAGS } from '@consts/tag.const';
import { step } from 'allure-js-commons';

/* Allure Parameters */
const allure: AllureParams = {
  description: 'This test creates a board.',
  parentSuite: PARENT_SUITE.WEB,
  suite: SUITE.BOARDS,
  tags: [TAGS.UI, TAGS.BOARD, TAGS.CREATE, TAGS.SMOKE],
};

const board: Board = {
  name: faker.lorem.words(3),
};

// Set up
test.beforeEach(async ({ apiCreateBoard }) => {
  const createBoardResponse = await apiCreateBoard(board);
  const createBoardResponseBody = await createBoardResponse.json();
  board.id = createBoardResponseBody.id;
});

test('Create board', { tag: [...allure.tags] }, async ({ homePage, listPage }) => {
  // Allure
  await addAllure(allure);

  const boardName = faker.lorem.words(3);

  await step('Navigate to the home page', async () => {
    await homePage.goToPage('');
  });

  await step('Create a board and get its ID', async () => {
    await homePage.createBoardItem.click();
    await homePage.newBoardInput.fill(boardName);
    await homePage.createBoardButton.click();
  });

  await step('Assert Board created', async () => {
    await listPage.assertBoardCreated(boardName);
  });
});

// Tear down
test.afterEach(async ({ apiDeleteAllBoards }) => {
  await step('Delete boards after test', async () => {
    await apiDeleteAllBoards();
  });
});
