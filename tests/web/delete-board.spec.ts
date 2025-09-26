import { test } from '@/fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { Board } from '@/interfaces/board.interface';
import { addAllure, AllureParams } from '@/utils/allure.util';

/* Allure Parameters */
const allure: AllureParams = {
  description: 'This test deletes a board.',
  suite: 'Board Management',
  tags: ['@ui', '@board', '@delete', '@smoke'],
};

const board: Board = {
  name: faker.lorem.words(3),
};
// Set up
test.beforeEach(async ({ apiCreateBoard }) => {
  const createBoardResponse = await apiCreateBoard(board);
  const createBoardResponseBody = await createBoardResponse.json();
  board.id = createBoardResponseBody.id; // Store the board ID
});

test('delete board', { tag: [...allure.tags] }, async ({ page, homePage, listPage }) => {
  // Allure
  await addAllure(allure);

  // Test Data
  await test.step('Navigate to the home page', async () => {
    await homePage.goToPage(`http://localhost:3000/board/${board.id}`);
  });

  await test.step('Delete the board', async () => {
    await listPage.boardOptionsButton.click();
    await listPage.deleteBoardButton.click();

    await page.reload(); // Reload the page to ensure the board is deleted
  });

  // Assert Board is deleted
  await test.step('Assert Board is deleted', async () => {
    await homePage.boardIsDeleted(board.name);
  });
});
