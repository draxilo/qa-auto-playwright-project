import {test} from "@playwright/test";
import {HomePage} from "../src/pages/home.page";
import {ListPage} from "../src/pages/list.page";

test("create board", async ({ page }) => {
    // Test Data
    const boardName = "Test Board";

    const homePage = new HomePage(page);
    const listPage = new ListPage(page);

    await homePage.goToPage();

    await homePage.createBoardItem.click();
    await homePage.newBoardInput.fill(boardName);
    await homePage.createBoardButton.click();

    // Assertions
})