import { test } from '@/fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { APIResponse, expect } from '@playwright/test';
import { addAllure, AllureParams } from '@/utils/allure.util';

const allure: AllureParams = {
  description: 'This test deletes a board via API.',
  suite: 'Board Management',
  tags: ['@api', '@board', '@delete', '@smoke'],
};

const board: Board = {
  name: faker.lorem.words(3),
};

test.beforeEach(async ({ apiCreateBoard }) => {
  const createResponse = await apiCreateBoard({ name: board.name });
  expect(createResponse.status()).toBe(201);

  const createResponseBody = await createResponse.json();
  board.id = createResponseBody.id;
});

test('Delete Board API', async ({ request }) => {
  await addAllure(allure);

  let deleteResponse: APIResponse;

  await test.step('Delete Board via API', async () => {
    deleteResponse = await request.delete(`/api/boards/${boardId}`);
  });

  await test.step('Check status code of the response', async () => {
    expect(deleteResponse.status()).toBe(200);
  });

  await test.step('Verify the board is deleted', async () => {
    const getResponse = await request.get(`/api/boards/${boardId}`);
    expect(getResponse.status()).toBe(500);
  });
});
