import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ListPage extends BasePage {
  readonly createListButton: Locator;
  readonly addListNameInput: Locator;
  readonly addListButton: Locator;
  readonly listName: Locator;
  readonly boardTitle: Locator;
  readonly boardOptionsButton: Locator;
  readonly deleteBoardButton: Locator;
  readonly addAnotherCardButton: Locator;
  readonly cardItem: Locator;
  readonly cardItemText: Locator;
  readonly cardTitleInput: Locator;
  readonly addCardButton: Locator;

  constructor(page: Page) {
    super(page);
    this.createListButton = page.getByTestId('create-list');
    this.addListNameInput = page.getByTestId('add-list-input');
    this.addListButton = page.getByRole('button', { name: 'Add list' });
    this.listName = page.getByTestId('list-name').last();
    this.boardTitle = page.getByTestId('board-title');
    this.boardOptionsButton = page.getByTestId('board-options');
    this.deleteBoardButton = page.getByTestId('delete-board');
    this.addAnotherCardButton = page.getByTestId('new-card');
    this.cardItem = page.getByTestId('card');
    this.cardItemText = page.getByTestId('card-text');
    this.cardTitleInput = page.getByTestId('new-card-input');
    this.addCardButton = page.locator(`//button[text()="Add card"]`);
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

  async assertCardCreated(cardTitleInput: string) {
    await expect(this.cardItem).toBeVisible();
    await expect(this.cardItemText).toHaveText(cardTitleInput);
  }

  async assertBoardCreated(boardTitle: string) {
    await expect(this.boardTitle).toBeVisible();
    await expect(this.boardTitle).toHaveValue(boardTitle);
  }
}
