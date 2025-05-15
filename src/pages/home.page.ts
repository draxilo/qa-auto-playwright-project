import {expect, Locator, Page} from "@playwright/test";

export class HomePage {
    private readonly page: Page;
    //readonly boardItem: Locator;
    readonly createBoardItem: Locator
    readonly newBoardInput: Locator;
    readonly createBoardButton: Locator;
    readonly lastBoardItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createBoardItem = page.getByTestId("create-board");
        this.newBoardInput = page.getByTestId("new-board-input");
        this.createBoardButton = page.getByTestId("new-board-create");
        this.lastBoardItem = page.getByTestId("board-item").last();
    }

    getBoardItem(boardName: string): Locator {
        return this.page.locator(`//div[@data-cy="board-item" and .//h2[text()="${boardName}"]]`);
    }

    async goToPage() {
        await this.page.goto("")
    }

    // Assertions
    async boardIsDeleted(boardName: string) {
        await expect(this.getBoardItem(boardName)).not.toBeVisible();
    }
}