import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./base.page";

export class GetStartedPage extends BasePage {
    readonly firstBoardInput: Locator;

    constructor(page: Page) {
        super(page)
        this.firstBoardInput = page.getByTestId("first-board");
    }

    // Assertions
    async assertFirstBoardCreated(listName: string) {
        await expect(this.firstBoardInput).toBeVisible();
        await expect(this.firstBoardInput).toHaveValue(listName);
    }
}