import { APIResponse, expect } from '@playwright/test';
import { test } from '@/fixtures/base.fixture';
import { z } from 'zod';
import { boardsSchema } from '@/schemas/boards.schema';
import { addAllure, AllureParams } from '@/utils/allure.util';
import { faker } from '@faker-js/faker';
import { Board } from '@/interfaces/board.interface';

const allure: AllureParams = {
  description: 'This test retrieves the list of boards via API.',
  suite: 'Board Management',
  tags: ['@api', '@board', '@list', '@smoke'],
};

const board: Board = {
  name: faker.lorem.words(3),
};

test.beforeEach(async ({ apiCreateBoard }) => {
  await test.step('Prepare Board before test via API', async () => {
    const createResponse = await apiCreateBoard(board);
    expect(createResponse.status()).toBe(201);

    const responseBody = await createResponse.json();
    board.id = responseBody.id;
  });
});

test('Get Boards API', async ({ request }) => {
  await addAllure(allure);

  let getResponse: APIResponse;

  await test.step('Get list of boards via API', async () => {
    getResponse = await request.get('/api/boards');
  });

  await test.step('Check status code of the response', async () => {
    expect(getResponse.status()).toBe(200);
  });

  await test.step('Validate response schema', async () => {
    const arrayBoardsSchema = z.array(boardsSchema);
    const responseBody = await getResponse.json();
    expect(() => arrayBoardsSchema.parse(responseBody)).not.toThrow();
  });
});

// Tear down
test.afterEach(async ({ apiDeleteBoard }) => {
  await test.step('Clear Board after test via API', async () => {
    await apiDeleteBoard(board);
  });
});
