import { test } from '@/fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { List } from '@/interfaces/list.interface';
import { Board } from '@/interfaces/board.interface';
import { APIResponse, expect } from '@playwright/test';
import { addAllure, AllureParams } from '@/utils/allure.util';
import { PARENT_SUITE, SUITE } from '@/consts/suites.const';
import { TAGS } from '@/consts/tag.const';

const allure: AllureParams = {
  description: 'This test creates a list via API.',
  parentSuite: PARENT_SUITE.API,
  suite: SUITE.LISTS,
  tags: [TAGS.API, TAGS.LIST, TAGS.CREATE, TAGS.SMOKE],
};

const board: Board = {
  name: faker.lorem.words(3),
};

const list: List = {
  name: faker.lorem.words(2),
};

test.beforeEach(async ({ apiCreateBoard }) => {
  await test.step('Prepare Board before test via API', async () => {
    const createResponse = await apiCreateBoard(board);
    expect(createResponse.status()).toBe(201);

    const responseBody = await createResponse.json();
    board.id = responseBody.id;
    list.boardId = board.id;
  });
});

test('Create List API', async ({ request }) => {
  await addAllure(allure);

  let response!: APIResponse;

  await test.step('Create List via API', async () => {
    response = await request.post('/api/lists', {
      data: list,
    });

    const responseBody = await response.json();
    list.id = responseBody.id;
  });

  await test.step('Check status code of the response', async () => {
    expect(response.status()).toBe(201);
  });
});

// Tear down
// test.afterEach(async ({ apiDeleteList }) => {
//   await test.step('Clear Board after test via API', async () => {
//     await apiDeleteList(list);
//   });
// });

//Maybe it is enough just to delete the board, which will delete all lists associated with it
test.afterEach(async ({ apiDeleteBoard }) => {
  await test.step('Clear Board after test via API', async () => {
    await apiDeleteBoard(board);
  });
});
