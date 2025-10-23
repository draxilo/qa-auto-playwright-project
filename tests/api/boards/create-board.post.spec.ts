import { test } from '@/fixtures/base.fixture';
import { addAllure, AllureParams } from '@/utils/allure.util';
import { faker } from '@faker-js/faker';
import { APIResponse, expect } from '@playwright/test';
import { Board } from '@/interfaces/board.interface';
import { PARENT_SUITE, SUITE } from '@/consts/parent-suite.const';
import { TAGS } from '@/consts/tags.const';

const allure: AllureParams = {
  description: 'This test creates a board via API.',
  parentSuite: PARENT_SUITE.API,
  suite: SUITE.BOARDS,
  tags: [TAGS.API, TAGS.BOARD, TAGS.CREATE, TAGS.SMOKE],
};

const board: Board = {
  name: faker.lorem.words(3),
};

test('Create Board API', async ({ request }) => {
  await addAllure(allure);

  let response!: APIResponse;

  await test.step('Create board via API', async () => {
    response = await request.post('/api/boards', {
      data: board,
    });

    const responseBody = await response.json();
    board.id = responseBody.id;
  });

  await test.step('Check status code of the response', async () => {
    expect(response.status()).toBe(201);
  });
});

// Tear down
test.afterEach(async ({ apiDeleteBoard }) => {
  await test.step('Clear Board after test via API', async () => {
    await apiDeleteBoard(board);
  });
});
