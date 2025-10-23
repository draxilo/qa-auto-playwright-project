import { test } from '@/fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';
import { addAllure, AllureParams } from '@/utils/allure.util';
import { Board } from '@/interfaces/board.interface';
import { PARENT_SUITE, SUITE } from '@/consts/parent-suite.const';
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
  await test.step('Prepare Board before test via API', async () => {
    const createResponse = await apiCreateBoard(board);
    expect(createResponse.status()).toBe(201);

    const responseBody = await createResponse.json();
    board.id = responseBody.id;
  });
});

test('Rename Board API', async ({ request }) => {
  await addAllure(allure);

  const newBoardName = faker.lorem.words(3);

  await test.step('Rename the board', async () => {
    const renameResponse = await request.patch(`/api/boards/${board.id}`, {
      data: { name: newBoardName },
    });
    expect(renameResponse.status()).toBe(200);
  });

  await test.step('Verify board name update', async () => {
    const getBoardResponse = await request.get(`/api/boards/${board.id}`);
    expect(getBoardResponse.status()).toBe(200);

    const getBoardResponseBody = await getBoardResponse.json();
    expect(getBoardResponseBody.name).toBe(newBoardName);
  });
});

// Tear down
test.afterEach(async ({ apiDeleteBoard }) => {
  await test.step('Clear Board after test via API', async () => {
    await apiDeleteBoard(board);
  });
});
