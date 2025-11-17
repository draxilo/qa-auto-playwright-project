import { test } from '@/fixtures/base.fixture';
import { Board } from '@/interfaces/board.interface';
import { faker } from '@faker-js/faker';
import { addAllure, AllureParams } from '@utils/allure.util';
import { PARENT_SUITE, SUITE } from '@consts/suites.const';
import { TAGS } from '@consts/tag.const';
import { step } from 'allure-js-commons';
import { List } from '@interfaces/list.interface';

const allure: AllureParams = {
  description: 'This test deletes a list via API.',
  parentSuite: PARENT_SUITE.API,
  suite: SUITE.LISTS,
  tags: [TAGS.API, TAGS.LIST, TAGS.DELETE, TAGS.SMOKE],
};

const board: Board = {
  name: faker.lorem.words(3),
  lists: [
    {
      name: faker.lorem.words(2),
    },
    {
      name: faker.lorem.words(3),
    },
    {
      name: faker.lorem.words(4),
    },
  ],
};

test.beforeEach(async ({ apiCreateMultipleLists, apiCreateBoard }) => {
  await step('Create Board', async () => {
    const createBoardResponse = await apiCreateBoard(board);
    const createBoardResponseBody = await createBoardResponse.json();
    board.id = createBoardResponseBody.id; // Store the board ID
  });
  await step('Create List(s) in Board', async () => {
    const response = await apiCreateMultipleLists(board);
    for (let i = 0; i < response.length; i++) {
      const responseBody = await response[i].json();
      board.lists[i].id = responseBody.id;
    }
  });
});

test('Delete List via API', async ({ apiDeleteList, apiGetList }) => {
  await addAllure(allure);

  let deletedListId!: string;

  await step('Delete created List(s)', async () => {
    for (let i = 0; i < board.lists!.length; i++) {
      const list = board.lists![i]!;
      deletedListId = list.id!;
      await apiDeleteList(list);
    }
  });
  await step('Verify list is deleted', async () => {
    await apiGetList({ id: deletedListId } as List, 404);
  });
});

// Tear down
test.afterEach(async ({ apiDeleteBoard }) => {
  await step('Clear Board after test via API', async () => {
    await apiDeleteBoard(board);
  });
});
