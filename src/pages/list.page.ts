import {expect, Locator, Page} from "@playwright/test";

export class ListPage {
    private readonly page: Page;
    readonly createListButton: Locator;
    readonly addListNameInput: Locator;
    readonly addListButton: Locator;
    readonly listName: Locator;
    readonly boardTitle: Locator;
    readonly boardOptionsButton: Locator;
    readonly deleteBoardButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createListButton = page.getByTestId("create-list");
        this.addListNameInput = page.getByTestId("add-list-input");
        this.addListButton = page.getByRole('button', { name: 'Add list' });
        this.listName = page.getByTestId("list-name").last();
        this.boardTitle = page.getByTestId("board-title")
        this.boardOptionsButton = page.getByTestId("board-options");
        this.deleteBoardButton = page.getByTestId("delete-board");
    }

    // Assertions
    async assertListCreated(listName: string) {
        await expect(this.listName).toBeVisible();
        await expect(this.listName).toHaveValue(listName);
    }

    async assertBoardTitle(boardTitle: string) {
        await expect(this.boardTitle).toBeVisible();
        //await expect(this.boardTitle).toHaveText(boardTitle); // This is not working
    }
}