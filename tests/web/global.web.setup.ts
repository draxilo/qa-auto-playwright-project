import { test as setup } from '@fixtures/base.fixture';
import { step } from 'allure-js-commons';
import { addAllure, AllureParams } from '@utils/allure.util';
import { PARENT_SUITE, SUITE } from '@consts/suites.const';

const allure: AllureParams = {
  description: 'Global setup to clear out all data before tests.',
  parentSuite: PARENT_SUITE.WEB,
  suite: SUITE.SETUP,
};

setup('Setup', async ({ apiDeleteAllBoards }) => {
  await addAllure(allure);

  await step('Clear out all data', async () => {
    await apiDeleteAllBoards();
  });
});
