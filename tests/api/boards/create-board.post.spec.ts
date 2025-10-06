import { test } from '@/fixtures/base.fixture';
import { addAllure, AllureParams } from '@/utils/allure.util';
import { faker } from '@faker-js/faker';
import { APIResponse, expect } from '@playwright/test';
import { Board } from '@/interfaces/board.interface';

const allure: AllureParams = {
  description: 'This test creates a board via API.',
  suite: 'Board Management',
  tags: ['@api', '@board', '@create', '@smoke'],
};

const board: Board = {
  name: faker.lorem.words(3),
};

test('Create Board API', async ({ request }) => {
  await addAllure(allure);

  let response: APIResponse;

  await test.step('Create board via API', async () => {
    response = await request.post('/api/boards', {
      data: { name: board.name },
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
  await apiDeleteBoard(board);
});
