import { step } from 'allure-js-commons';

import { APIResponse, expect } from '@playwright/test';
import { test } from '@/fixtures/base.fixture';
import { z } from 'zod';
import { boardsSchema } from '@/schemas/boards.schema';
import { addAllure, AllureParams } from '@/utils/allure.util';
import { faker } from '@faker-js/faker';
import { Board } from '@/interfaces/board.interface';
import { PARENT_SUITE, SUITE } from '@/consts/suites.const';
import { TAGS } from '@/consts/tag.const';

const allure: AllureParams = {
  description: 'This test retrieves the list of boards via API.',
  parentSuite: PARENT_SUITE.API,
  suite: SUITE.BOARDS,
  tags: [TAGS.API, TAGS.BOARD, TAGS.GET, TAGS.SMOKE],
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

test('Get Boards API', { tag: [...allure.tags] }, async ({ apiGetAllBoards }) => {
  await addAllure(allure);

  let getResponse: APIResponse;

  await step('Get all boards via API', async () => {
    getResponse = await apiGetAllBoards();
  });

  await step('Validate response schema', async () => {
    const arrayBoardsSchema = z.array(boardsSchema);
    const responseJson = await getResponse.json();
    expect(() => arrayBoardsSchema.parse(responseJson)).not.toThrow();
  });
});

// Tear down
test.afterEach(async ({ apiDeleteBoard }) => {
  await step('Clear Board after test via API', async () => {
    await apiDeleteBoard(board);
  });
});
