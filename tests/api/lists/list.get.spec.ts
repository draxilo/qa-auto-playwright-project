import { Board } from '@/interfaces/board.interface';
import { faker } from '@faker-js/faker';
import { test } from '@/fixtures/base.fixture';
import { APIResponse, expect } from '@playwright/test';
import { listsSchema } from '@/schemas/lists.schema';
import { z } from 'zod';
import { step } from 'allure-js-commons';
import { addAllure, AllureParams } from '@utils/allure.util';
import { PARENT_SUITE, SUITE } from '@consts/suites.const';
import { TAGS } from '@consts/tag.const';

const allure: AllureParams = {
  description: 'This test retrieves the list of lists via API.',
  parentSuite: PARENT_SUITE.API,
  suite: SUITE.LISTS,
  tags: [TAGS.API, TAGS.LIST, TAGS.GET, TAGS.SMOKE],
};

const board: Board = {
  name: faker.lorem.words(3),
  lists: [
    {
      name: faker.lorem.words(2),
    },
    {
      name: faker.lorem.words(3),
    },
    {
      name: faker.lorem.words(4),
    },
  ],
};

test.beforeEach(async ({ apiCreateMultipleLists, apiCreateBoard }) => {
  await step('Create Board', async () => {
    const createBoardResponse = await apiCreateBoard(board);
    const createBoardResponseBody = await createBoardResponse.json();
    board.id = createBoardResponseBody.id;
  });
  await step('Create List in Board', async () => {
    const response = await apiCreateMultipleLists(board);
    for (let i = 0; i < response.length; i++) {
      const responseBody = await response[i].json();
      board.lists[i].id = responseBody.id;
    }
  });
});

test('Get list of lists via API', async ({ apiGetAllListsOfSpecificBoard }) => {
  await addAllure(allure);

  let response!: APIResponse;

  await step('Get lists via API', async () => {
    response = await apiGetAllListsOfSpecificBoard(board);
  });

  await step('Validate response schema', async () => {
    const arrayListsSchema = z.array(listsSchema);
    const responseBody = await response.json();
    expect(() => arrayListsSchema.parse(responseBody)).not.toThrow();
  });
});

// Tear down
test.afterEach(async ({ apiDeleteBoard }) => {
  await step('Delete Lists after test via API', async () => {
    await apiDeleteBoard(board);
  });
});
