import { step } from 'allure-js-commons';

import { test } from '@/fixtures/base.fixture';
import { addAllure, AllureParams } from '@/utils/allure.util';
import { faker } from '@faker-js/faker';
import { Board } from '@/interfaces/board.interface';
import { PARENT_SUITE, SUITE } from '@/consts/suites.const';
import { TAGS } from '@/consts/tag.const';

const allure: AllureParams = {
  description: 'This test creates a board via API.',
  parentSuite: PARENT_SUITE.API,
  suite: SUITE.BOARDS,
  tags: [TAGS.API, TAGS.BOARD, TAGS.CREATE, TAGS.SMOKE],
};

const board: Board = {
  name: faker.lorem.words(3),
};

test('Create Board API', { tag: [...allure.tags] }, async ({ apiCreateBoard }) => {
  await addAllure(allure);

  await step('Create board via API', async () => {
    const createBoardResponse = await apiCreateBoard(board);
    const createBoardResponseBody = await createBoardResponse.json();
    board.id = createBoardResponseBody.id;
  });
});

// Tear down
test.afterEach(async ({ apiDeleteBoard }) => {
  await step('Clear Board after test via API', async () => {
    await apiDeleteBoard(board);
  });
});
