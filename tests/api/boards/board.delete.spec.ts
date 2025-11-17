import { step } from 'allure-js-commons';

import { test } from '@/fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { addAllure, AllureParams } from '@/utils/allure.util';
import { Board } from '@/interfaces/board.interface';
import { PARENT_SUITE, SUITE } from '@/consts/suites.const';
import { TAGS } from '@/consts/tag.const';

const allure: AllureParams = {
  description: 'This test deletes a board via API.',
  parentSuite: PARENT_SUITE.API,
  suite: SUITE.BOARDS,
  tags: [TAGS.API, TAGS.BOARD, TAGS.DELETE, TAGS.SMOKE],
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

test('Delete Board API', { tag: [...allure.tags] }, async ({ apiDeleteBoard, apiGetBoard }) => {
  await addAllure(allure);

  await step('Delete Board via API', async () => {
    await apiDeleteBoard(board);
  });

  await step('Verify the board is deleted', async () => {
    await apiGetBoard(board, 500);
  });
});
