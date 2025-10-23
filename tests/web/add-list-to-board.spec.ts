import { test } from '@/fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { Board } from '@/interfaces/board.interface';
import { addAllure, AllureParams } from '@/utils/allure.util';
import { PARENT_SUITE, SUITE } from '@/consts/parent-suite.const';

/* Allure Parameters */
const allure: AllureParams = {
  description: 'This test adds a list to a board.',
  parentSuite: PARENT_SUITE.WEB,
  suite: SUITE.LISTS,
  tags: ['@ui', '@list', '@create', '@smoke'],
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

test('add list to board', { tag: [...allure.tags] }, async ({ homePage, listPage }) => {
  // Allure
  await addAllure(allure);

  // Test Data
  const listName = faker.lorem.words(3);

  await test.step('Navigate to board page', async () => {
    await homePage.goToPage(`http://localhost:3000/board/${board.id}`);
  });

  await test.step('Add a new list', async () => {
    //await listPage.clickInTheMiddle();

    //await listPage.createListButton.click();

    await listPage.addListNameInput.fill(listName);
    await listPage.addListButton.click();
  });

  await test.step('Assert that a new list is created', async () => {
    await listPage.assertListCreated(listName);
  });
});

// Tear down
test.afterEach(async ({ apiDeleteBoard }) => {
  await apiDeleteBoard(board);
});
