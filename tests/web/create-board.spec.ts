import { faker } from '@faker-js/faker';
import { test } from '@/fixtures/base.fixture';
import { Board } from '@/interfaces/board.interface';
import { addAllure, AllureParams } from '@/utils/allure.util';

/* Allure Parameters */
const allure: AllureParams = {
  description: 'This test creates a board.',
  suite: 'Board Management',
  tags: ['@ui', '@board', '@create', '@smoke'],
};

let createdBoardId: string;
const board: Board = {
  name: faker.lorem.words(3),
};

// Set up
test.beforeEach(async ({ apiCreateBoard }) => {
  const createBoardResponse = await apiCreateBoard(board);
  const createBoardResponseBody = await createBoardResponse.json();
  board.id = createBoardResponseBody.id; // Store the board ID
});

test('create board', { tag: [...allure.tags] }, async ({ homePage, listPage }) => {
  // Allure
  await addAllure(allure);

  // Test Data
  const boardName = faker.lorem.words(3);

  await test.step('Navigate to the home page', async () => {
    await homePage.goToPage('');
  });

  await test.step('Create a board and get its ID', async () => {
    await homePage.createBoardItem.click();
    await homePage.newBoardInput.fill(boardName);
    await homePage.createBoardButton.click();
    createdBoardId = await homePage.waitForUrlAndGetLastPathSegment(/\/board\//);
  });

  await test.step('Assert Board created', async () => {
    await listPage.assertBoardCreated(boardName);
  });
});

// Tear down
test.afterEach(async ({ apiDeleteListOfBoards }) => {
  const boardToDelete = [board.id, createdBoardId].map(Number); // Removes falsy values
  await apiDeleteListOfBoards(boardToDelete);
});
// test.afterEach(async ({request}) => {
//     expect((await request.delete(`http://localhost:3000/api/boards/${board.id}`)).status()).toBe(200);
//     expect((await request.delete(`http://localhost:3000/api/boards/${createdBoardId}`)).status()).toBe(200);
// })
