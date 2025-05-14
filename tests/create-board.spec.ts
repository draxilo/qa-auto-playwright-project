import {test, expect, Locator} from '@playwright/test';
import {GetStartedPage} from "../src/pages/get-started.page";

const url = 'http://localhost:3000/'

test('has title', async ({ page }) => {
    await page.goto(url);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('Trello App');
});

test('create first board', async ({ page }) => {
    // Test Data
    const boardName = "Test Board";

    const getStartedPage = new GetStartedPage(page)
    await getStartedPage.goToPage()
    await getStartedPage.firstBoardInput.fill(boardName);

    // Expects page to have a heading with the name of Installation.
    await getStartedPage.assertFirstBoardCreated(boardName);
});

test('add list to board', async ({ page }) => {
    const firstBoard: Locator = page.getByTestId("board-item");
    const createListButton: Locator = page.getByTestId("create-list");
    const addListInput: Locator = page.getByTestId("add-list-input");
    const addlistButton: Locator = page.getByRole('button', { name: 'Add list' });
    const listName: Locator = page.getByTestId("list-name").last();

    await page.goto(url);

    await firstBoard.click();
    await createListButton.click();
    await addListInput.fill("Test List");
    await addlistButton.click();

    await expect(listName).toBeVisible();
    await expect(listName).toHaveValue("Test List");

})