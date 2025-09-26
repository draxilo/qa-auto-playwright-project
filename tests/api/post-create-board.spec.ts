import test, { expect } from '@playwright/test';

test('Create Board API', async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const board = { name: 'Test Board API' };
  const today = new Date().toISOString().slice(0, 10);

  const response = await request.post('/api/boards', {
    data: board,
    headers: headers,
  });

  expect(response.status()).toBe(201);

  expect(await response.json()).toMatchObject({
    name: board.name,
    user: 0,
    starred: false,
    created: today,
    id: 12,
  });
});
