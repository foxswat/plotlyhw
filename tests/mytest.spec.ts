import { test, expect } from '@playwright/test';
import { env } from '../playwright.config';
import { paths, counts } from '../test-data/constants';
import { baseUrls } from '../test-data/baseurls';

const expectedPath = paths[env];
const expectedCount = counts[env];
const baseURL = baseUrls[env];

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('User is able to navigate to Newsletter by selector', async ({ page }) => {

    const newsletterLink = await page.$('#main-nav > ul > li.newsletter > a > span');
    const linkText = await newsletterLink?.textContent();
    expect(linkText).toBe('Newsletter');
    await newsletterLink?.click();

    const expectedUrl = `${baseURL}${expectedPath.newsletters}`
    expect(page.url()).toBe(expectedUrl);
});

test('User is able to navigate to Newsletter by XPath', async ({ page }) => {

    const newsletterLink = await page.$('xpath=//*[@id="main-nav"]/ul/li[4]/a/span');
    const linkText = await newsletterLink?.textContent();
    expect(linkText).toBe('Newsletter');
    await newsletterLink?.click();

    const expectedUrl = `${baseURL}${expectedPath.newsletters}`
    expect(page.url()).toBe(expectedUrl);

});

test('At the article screen, user is able to click on the first article and it successfully loads', async ({ page }) => {
    const articles = await page.$$('#maincontent > div.articles-and-sidebar > div:nth-child(1) > div > article');
    const firstArticle = articles[0];

    if (!firstArticle) {
        throw new Error('First article does not exist');
    }

    const expectedUrl = `${baseURL}${expectedPath.firstArticle}`
    await Promise.all([
        firstArticle.click(),
        page.waitForURL(expectedUrl, { waitUntil: 'load' }),
    ]);

    expect(page.url()).toBe(expectedUrl);
});


test('At the article screen, user is able to click on “Older” at first page', async ({ page }) => {
    await page.goto(expectedPath.articles);

    const olderLink = await page.$('#maincontent > div.articles-and-sidebar > div:nth-child(1) > nav > div > ul > li.breadcrumbs-next-page');
    const olderLinkText = await olderLink?.textContent();
    expect(olderLinkText).toBe('Older ');
    await olderLink?.click();

    const olderURL = page.url();
    expect(olderURL).toBe(`${baseURL}${expectedPath.articles}page/2/`);
});

test('At the article screen, user is able to click on “Older” at middle page', async ({ page }) => {
    const basePath = `${baseURL}${expectedPath.articles}page/`;
    const currentPage = Math.floor(Math.random() * (expectedCount.articlesPage - 1)) + 1;

    await page.goto(`${basePath}${currentPage}/`);
    const olderLink = await page.$('#maincontent > div.articles-and-sidebar > div:nth-child(1) > nav > div > ul > li.breadcrumbs-next-page');
    const olderLinkText = await olderLink?.textContent();
    expect(olderLinkText).toBe('Older ');
    await olderLink?.click();

    const olderURL = page.url();
    expect(olderURL).toBe(`${basePath}${currentPage + 1}/`);
});

test('At the article screen, user is unable to click on “Older” at last page', async ({ page }) => {
    const basePath = `${baseURL}${expectedPath.articles}page/`;
    const lastPage = expectedCount.articlesPage;

    await page.goto(`${basePath}${lastPage}/`);
    const olderLink = await page.$('a:has-text("Older ")');
    expect(olderLink).toBeNull();
});


test('User is able to click on the search icon and search for “cypress”', async ({ page }) => {
    // Click on the search icon
    const searchIcon = await page.$('xpath=//*[@id="site-header"]/div[2]/div');
    await searchIcon?.click();

    // Type "cypress" in the search field
    await page.type('xpath=//*[@id="jetpack-instant-search__box-input-1"]', 'cypress');

    // Press Enter to perform the search
    await page.keyboard.press('Enter');


    const expectedUrl = `${baseURL}/?s=${expectedPath.searchString}`;
    // Verify the search results
    await page.waitForURL(expectedUrl);
    const url = page.url();
    expect(url).toBe(expectedUrl);
});


test('User is able to search for “cypress” and click on the “An Intro to Web Site Testing with Cypress” article and it loads successfully', async ({ page }) => {
    // Click on the search icon
    const searchIcon = await page.$('xpath=//*[@id="site-header"]/div[2]/div');
    await searchIcon?.click();

    // Type "cypress" in the search field
    await page.type('xpath=//*[@id="jetpack-instant-search__box-input-1"]', 'cypress');

    // Press Enter to perform the search
    await page.keyboard.press('Enter');

    const correctResult = page.getByRole('link', { name: 'An Intro to Web Site Testing with Cypress' });

    const expectedUrl = `${baseURL}${expectedPath.searchResult}`;
    await Promise.all([
        correctResult.click(),
        page.waitForURL(expectedUrl, { waitUntil: 'load' }),
    ]);

    const url = page.url();
    expect(url).toBe(expectedUrl);
});

test('Usare is able to navigate to the Almanac', async ({ page }) => {
    await page.getByRole('link', { name: 'Almanac' }).click();
    await page.locator('header').filter({ hasText: 'Almanac A B C D E F G H I J K L M N O P Q R S T U V W X Y Z' }).getByRole('link', { name: 'B' }).click();
    await page.getByRole('link', { name: 'background', exact: true }).click();
    await page.locator('#aa-demo').click();
    await page.frameLocator('iframe[name="CodePen Embed emBzRd"]').getByRole('button', { name: 'HTML' }).click();
    const frameElement = page.frame({ name: 'CodePen Embed emBzRd' });
    if (frameElement) {
        const codeElement = await frameElement.$(`xpath=//*[@id="actual-html-code"]`);
        expect(codeElement).toBeTruthy;
    } else {
        throw new Error('Iframe not found');
    }
});