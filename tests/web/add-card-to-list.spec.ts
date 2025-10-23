import { test } from '@/fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { Board } from '@/interfaces/board.interface';
import { addAllure, AllureParams } from '@/utils/allure.util';
import { PARENT_SUITE, SUITE } from '@/consts/parent-suite.const';
import { TAGS } from '@/consts/tags.const';

/* Allure Parameters */
const allure: AllureParams = {
  description: 'This test adds a card to a list.',
  parentSuite: PARENT_SUITE.WEB,
  suite: SUITE.CARDS,
  tags: [TAGS.UI, TAGS.CARD, TAGS.CREATE, TAGS.SMOKE],
};

const board: Board = {
  name: faker.lorem.words(3),
  lists: [
    {
      name: faker.lorem.words(3),
      cards: [],
    },
  ],
};

// Set up
test.beforeEach(async ({ apiCreateList, apiCreateBoard }) => {
  const createBoardResponse = await apiCreateBoard(board);
  const createBoardResponseBody = await createBoardResponse.json();
  board.id = createBoardResponseBody.id; // Store the board ID

  await apiCreateList(board);
});

test('add card to list', { tag: [...allure.tags] }, async ({ homePage, listPage }) => {
  // Allure
  await addAllure(allure);

  // Test Data
  const cardTitleInput = faker.lorem.words(3); // Generate a random card title

  await test.step('Navigate to the board and add a card', async () => {
    await homePage.goToPage(`http://localhost:3000/board/${board.id}`);
  });

  await test.step('Add a card to the list', async () => {
    await listPage.addAnotherCardButton.last().click();
    await listPage.cardTitleInput.fill(cardTitleInput);
    await listPage.addCardButton.click();
  });

  await test.step('Assert Card is added to the list', async () => {
    await listPage.assertCardCreated(cardTitleInput);
  });
});

// Tear down
test.afterEach(async ({ apiDeleteBoard }) => {
  await apiDeleteBoard(board);
});
