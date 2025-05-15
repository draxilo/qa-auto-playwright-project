import {test} from "@playwright/test";
import {HomePage} from "../src/pages/home.page";
import {ListPage} from "../src/pages/list.page";

test('add list to board', async ({ page }) => {
    // Test Data
    const listName = "Test List";
    const boardName = "Test Board";

    const homePage = new HomePage(page)
    const listPage = new ListPage(page)

    await homePage.goToPage()
    await homePage.getBoardItem(boardName).click();

    if (await listPage.createListButton.isVisible()) {
        await listPage.createListButton.click();
    }
    await listPage.addListNameInput.fill(listName);
    await listPage.addListButton.click();

    await listPage.assertListCreated(listName);
})