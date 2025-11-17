import { step } from 'allure-js-commons';

import { Board } from '@/interfaces/board.interface';
import { faker } from '@faker-js/faker';
import { test } from '@/fixtures/base.fixture';
import { APIResponse, expect } from '@playwright/test';
import { z } from 'zod';
import { cardsSchema } from '@/schemas/cards.schema';
import { addAllure, AllureParams } from '@utils/allure.util';
import { PARENT_SUITE, SUITE } from '@consts/suites.const';
import { TAGS } from '@consts/tag.const';
import { Card } from '@interfaces/card.interface';

const allure: AllureParams = {
  description: 'This test retrieves the list of cards via API.',
  parentSuite: PARENT_SUITE.API,
  suite: SUITE.CARDS,
  tags: [TAGS.API, TAGS.CARD, TAGS.GET, TAGS.SMOKE],
};

const board: Board = {
  name: faker.lorem.words(3),
  lists: [
    {
      name: faker.lorem.words(2),
      cards: [
        {
          name: faker.lorem.words(3),
        },
      ],
    },
  ],
};

test.beforeEach(async ({ apiCreateBoard, apiCreateMultipleLists, apiCreateCard }) => {
  await step('Create Board', async () => {
    const createBoardResponse = await apiCreateBoard(board);
    const createBoardResponseBody = await createBoardResponse.json();
    board.id = createBoardResponseBody.id;
  });
  await step('Create List in Board', async () => {
    const createListResponse = await apiCreateMultipleLists(board);
    const createListResponseBody = await createListResponse[0].json();
    board.lists[0].id = createListResponseBody.id;
  });
  await step('Create Card in List', async () => {
    const list = board.lists[0];
    const card = board.lists[0].cards[0];
    const createCardResponse = await apiCreateCard(board, list, card);
    const createCardResponseBody = await createCardResponse.json();
    card.id = createCardResponseBody.id;
  });
});

test('Get list of cards via API', async ({ apiGetCard }) => {
  await addAllure(allure);

  let getResponse: APIResponse;
  const card: Card = board.lists[0].cards[0];

  await step('Get cards via API', async () => {
    getResponse = await apiGetCard(card);
  });

  await step('Validate response schema', async () => {
    const responseBody = await getResponse.json();
    expect(() => cardsSchema.parse(responseBody)).not.toThrow();
  });
});

// Tear down
test.afterEach(async ({ apiDeleteBoard }) => {
  await step('Delete cards after test via API', async () => {
    await apiDeleteBoard(board);
  });
});
