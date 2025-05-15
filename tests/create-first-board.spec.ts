import {test, expect, Locator} from '@playwright/test';
import {GetStartedPage} from "../src/pages/get-started.page";

test('create first board', async ({ page }) => {
    // Test Data
    const boardName = "Test Board";

    const getStartedPage = new GetStartedPage(page)
    await getStartedPage.goToPage()
    await getStartedPage.firstBoardInput.fill(boardName);

    await getStartedPage.assertFirstBoardCreated(boardName);
});
