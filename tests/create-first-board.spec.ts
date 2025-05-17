import {test} from "../src/fixtures/base.fixture";

test('create first board', async ({ getStartedPage }) => {
    // Test Data
    const boardName = "Test Board";

    await getStartedPage.goToPage("")
    await getStartedPage.firstBoardInput.fill(boardName);

    await getStartedPage.assertFirstBoardCreated(boardName);
});
