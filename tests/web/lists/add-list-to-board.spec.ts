import { test } from '@fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { Board } from '@interfaces/board.interface';
import { addAllure, AllureParams } from '@utils/allure.util';
import { PARENT_SUITE, SUITE } from '@consts/suites.const';
import { TAGS } from '@consts/tag.const';
import { step } from 'allure-js-commons';

/* Allure Parameters */
const allure: AllureParams = {
  description: 'This test adds a list to a board.',
  parentSuite: PARENT_SUITE.WEB,
  suite: SUITE.LISTS,
  tags: [TAGS.UI, TAGS.LIST, TAGS.CREATE, TAGS.SMOKE],
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

test('Add list to board', { tag: [...allure.tags] }, async ({ listPage }) => {
  // Allure
  await addAllure(allure);

  // Test Data
  const listName = faker.lorem.words(3);

  await step('Navigate to board page', async () => {
    await listPage.goToPage(`/board/${board.id}`);
  });

  await step('Add a new list', async () => {
    await listPage.addListNameInput.fill(listName);
    await listPage.addListButton.click();
  });

  await step('Assert that a new list is created', async () => {
    await listPage.assertListCreated(listName);
  });
});

// Tear down
test.afterEach(async ({ apiDeleteBoard }) => {
  await apiDeleteBoard(board);
});
