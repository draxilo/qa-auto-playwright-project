import { test as basic } from "@playwright/test";

import {GetStartedPage} from "../pages/get-started.page";
import {HomePage} from "../pages/home.page";
import {ListPage} from "../pages/list.page";

interface fixtures {
    getStartedPage : GetStartedPage;
    homePage : HomePage;
    listPage: ListPage;
}

export const test = basic.extend<fixtures>({
    getStartedPage: async ({ page }, use) => {
        const getStartedPage = new GetStartedPage(page);
        await use(getStartedPage);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    listPage: async ({ page }, use) => {
        const listPage = new ListPage(page);
        await use(listPage);
    }
})