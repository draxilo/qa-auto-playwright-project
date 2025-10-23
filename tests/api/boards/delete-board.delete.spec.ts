import { test } from '@/fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { APIResponse, expect } from '@playwright/test';
import { addAllure, AllureParams } from '@/utils/allure.util';
import { Board } from '@/interfaces/board.interface';
import { PARENT_SUITE } from '@/consts/parent-suite.const';

const allure: AllureParams = {
  description: 'This test deletes a board via API.',
  parentSuite: PARENT_SUITE.API,
  suite: 'Board Management',
  tags: ['@api', '@board', '@delete', '@smoke'],
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

test('Delete Board API', async ({ request }) => {
  await addAllure(allure);

  let deleteResponse: APIResponse;

  await test.step('Delete Board via API', async () => {
    deleteResponse = await request.delete(`/api/boards/${board.id}`);
  });

  await test.step('Check status code of the response', async () => {
    expect(deleteResponse.status()).toBe(200);
  });

  await test.step('Verify the board is deleted', async () => {
    const getResponse = await request.get(`/api/boards/${board.id}`);
    expect(getResponse.status()).toBe(500);
  });
});
