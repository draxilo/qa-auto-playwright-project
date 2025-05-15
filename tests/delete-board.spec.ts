import {HomePage} from "../src/pages/home.page";
import {ListPage} from "../src/pages/list.page";
import {test} from "@playwright/test";

test("delete board", async ({ page }) => {
    // Test Data

    const homePage = new HomePage(page);
    const listPage = new ListPage(page);

    await homePage.goToPage();

    const lastBoardItemName = await page.locator('(//div[@data-cy="board-item"]//h2)[last()]').textContent();

    await homePage.lastBoardItem.click();
    await listPage.boardOptionsButton.click();
    await listPage.deleteBoardButton.click();

    // Assertions
    await homePage.boardIsDeleted(lastBoardItemName);
})