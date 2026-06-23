import { test, expect, type Page } from '@playwright/test';

/**
 * On mobile the header controls live behind the hamburger; open it so the
 * locale/theme toggles are reachable. No-op on desktop (trigger is hidden).
 */
async function openMobileNav(page: Page) {
  const trigger = page.locator('button[aria-controls="mobile-nav"]');
  if (await trigger.isVisible().catch(() => false)) {
    await trigger.click();
  }
}

/**
 * next-intl's <Link> does client-side navigation, which only works once React
 * has hydrated. Under parallel test load against a single server, a tap can
 * land in the pre-hydration window and be swallowed. Wait for the network to
 * settle (chunks loaded → hydration triggered) before interacting.
 */
async function gotoReady(page: Page, path: string) {
  await page.goto(path);
  await page.waitForLoadState('networkidle');
}

test.describe('santiagorivera.com — smoke', () => {
  // Deterministic: reveals paint immediately and motion is instant, so
  // scroll-gated content (e.g. the work card) is clickable without scrolling.
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  test('home renders in Spanish with hero, header and footer', async ({ page }) => {
    await page.goto('/es');
    await expect(page).toHaveTitle(/Santiago Rivera/i);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('locale switch flips to English', async ({ page }) => {
    await gotoReady(page, '/es');
    await openMobileNav(page);
    await page.getByRole('button', { name: 'en' }).filter({ visible: true }).first().click();
    await expect(page).toHaveURL(/\/en(\/|$)/);
  });

  test('Directa case study reachable from work index', async ({ page }) => {
    await gotoReady(page, '/en/work');
    await page.getByRole('link', { name: /Directa/i }).first().click();
    await expect(page).toHaveURL(/\/work\/directa/);
    await expect(page.getByRole('link', { name: /directa\.mx/i }).first()).toBeVisible();
  });

  test('contact channels (mailto, LinkedIn, WhatsApp) present in footer', async ({ page }) => {
    await page.goto('/en/contact');
    await expect(page.locator('footer a[href^="mailto:"]').first()).toBeVisible();
    await expect(page.locator('footer a[href*="wa.me"]').first()).toBeVisible();
    await expect(page.locator('footer a[href*="linkedin"]').first()).toBeVisible();
  });

  test('sitemap.xml served', async ({ request }) => {
    expect((await request.get('/sitemap.xml')).ok()).toBeTruthy();
  });

  test('robots.txt served', async ({ request }) => {
    expect((await request.get('/robots.txt')).ok()).toBeTruthy();
  });
});
