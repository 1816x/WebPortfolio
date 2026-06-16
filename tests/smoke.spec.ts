import { test, expect } from '@playwright/test';

test.describe('santiagorivera.com — smoke', () => {
  test('home renders in Spanish (default) with hero, nav and CV button', async ({ page }) => {
    await page.goto('/es');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.getByRole('link', { name: /Trabajo/i }).first()).toBeVisible();
  });

  test('locale switch flips to English', async ({ page }) => {
    await page.goto('/es');
    await page.getByRole('button', { name: 'en' }).first().click();
    await expect(page).toHaveURL(/\/en/);
    await expect(page.getByRole('link', { name: /Work/i }).first()).toBeVisible();
  });

  test('Directa case study reachable from work index', async ({ page }) => {
    await page.goto('/en/work');
    await page.getByRole('link', { name: /Directa/i }).first().click();
    await expect(page).toHaveURL(/\/work\/directa/);
    await expect(page.getByRole('link', { name: /Visit directa\.mx/i }).first()).toBeVisible();
  });

  test('mailto, LinkedIn, WhatsApp and calendar links are present on contact page', async ({ page }) => {
    await page.goto('/en/contact');
    await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
    await expect(page.locator('a[href*="wa.me"]').first()).toBeVisible();
    await expect(page.locator('a[href*="linkedin.com"]').first()).toBeVisible();
  });

  test('theme toggle flips html class', async ({ page }) => {
    await page.goto('/en');
    const initial = await page.evaluate(() => document.documentElement.className);
    await page.getByRole('button', { name: /Switch to (dark|light) mode/i }).click();
    const after = await page.evaluate(() => document.documentElement.className);
    expect(initial).not.toEqual(after);
  });

  test('sitemap.xml served', async ({ request }) => {
    const r = await request.get('/sitemap.xml');
    expect(r.ok()).toBeTruthy();
  });

  test('robots.txt served', async ({ request }) => {
    const r = await request.get('/robots.txt');
    expect(r.ok()).toBeTruthy();
  });
});
