import {expect, Locator, Page} from "@playwright/test";

export class GetStartedPage {
    private readonly page: Page;
    readonly firstBoardInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstBoardInput = page.getByTestId("first-board");
    }

    async goToPage() {
        await this.page.goto("")
    }

    // Assertions
    async assertFirstBoardCreated(listName: string) {
        await expect(this.firstBoardInput).toBeVisible();
        await expect(this.firstBoardInput).toHaveValue(listName);
    }
}