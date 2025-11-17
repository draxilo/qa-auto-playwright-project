import { test } from '@/fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { Board } from '@/interfaces/board.interface';
import { addAllure, AllureParams } from '@/utils/allure.util';
import { PARENT_SUITE, SUITE } from '@/consts/suites.const';
import { TAGS } from '@/consts/tag.const';
import { step } from 'allure-js-commons';

const allure: AllureParams = {
  description: 'This test creates a list via API.',
  parentSuite: PARENT_SUITE.API,
  suite: SUITE.LISTS,
  tags: [TAGS.API, TAGS.LIST, TAGS.CREATE, TAGS.SMOKE],
};

const board: Board = {
  name: faker.lorem.words(3),
  lists: [
    {
      name: faker.lorem.words(2),
    },
  ],
};

test.beforeEach(async ({ apiCreateBoard }) => {
  await step('Create Board', async () => {
    const createBoardResponse = await apiCreateBoard(board);
    const createBoardResponseBody = await createBoardResponse.json();
    board.id = createBoardResponseBody.id; // Store the board ID
  });
});

test('Create List via API', async ({ apiCreateList }) => {
  await addAllure(allure);

  await step('Create List via API', async () => {
    await apiCreateList(board, board.lists[0]);
  });
});

// Tear down
test.afterEach(async ({ apiDeleteBoard }) => {
  await step('Clear Board after test via API', async () => {
    await apiDeleteBoard(board);
  });
});
