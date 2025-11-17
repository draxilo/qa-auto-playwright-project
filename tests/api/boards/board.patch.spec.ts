import { step } from 'allure-js-commons';

import { test } from '@/fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';
import { addAllure, AllureParams } from '@/utils/allure.util';
import { Board } from '@/interfaces/board.interface';
import { PARENT_SUITE, SUITE } from '@/consts/suites.const';
import { TAGS } from '@/consts/tag.const';

const allure: AllureParams = {
  description: 'This test renames a board via API.',
  parentSuite: PARENT_SUITE.API,
  suite: SUITE.BOARDS,
  tags: [TAGS.UI, TAGS.BOARD, TAGS.UPDATE, TAGS.SMOKE],
};

const board: Board = {
  name: faker.lorem.words(3),
};

test.beforeEach(async ({ apiCreateBoard }) => {
  await step('Prepare Board before test via API', async () => {
    const response = await apiCreateBoard(board);
    const responseJson = await response.json();
    board.id = responseJson.id;
  });
});

test('Rename Board API', { tag: [...allure.tags] }, async ({ apiGetBoard, apiUpdateBoard }) => {
  await addAllure(allure);

  const newBoardName = faker.lorem.words(3);

  await step('Rename the board', async () => {
    await apiUpdateBoard(board, { name: newBoardName });
    board.name = newBoardName;
  });

  await step('Verify board name updated', async () => {
    const response = await apiGetBoard(board);
    const body = await response.json();
    expect(body.name).toBe(newBoardName);
  });
});

// Tear down
test.afterEach(async ({ apiDeleteBoard }) => {
  await step('Clear Board after test via API', async () => {
    await apiDeleteBoard(board);
  });
});
