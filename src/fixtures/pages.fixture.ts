import { test as base } from '@playwright/test';

import { GetStartedPage } from '../pages/get-started.page';
import { HomePage } from '../pages/home.page';
import { ListPage } from '../pages/list.page';

interface PageFixture {
  getStartedPage: GetStartedPage;
  homePage: HomePage;
  listPage: ListPage;
}

export const test = base.extend<PageFixture>({
  getStartedPage: async ({ page }, use) => {
    await use(new GetStartedPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  listPage: async ({ page }, use) => {
    await use(new ListPage(page));
  },
});
