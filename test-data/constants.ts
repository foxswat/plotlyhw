export const paths: { [key: string]: { [key: string]: string } } = {
    development: {
        newsletters: '/newsletters/',
        firstArticle: '/some-cross-browser-devtools-features-you-might-not-know/',
        articles: '/archives/',
        searchResult: '/an-intro-to-web-app-testing-with-cypress-io/'

    },
    staging: {
        newsletters: '/newsletters/',
        firstArticle: '/some-cross-browser-devtools-features-you-might-not-know/',
        articles: '/archives/',
        searchResult: '/an-intro-to-web-app-testing-with-cypress-io/'
    },
    prod: {
        newsletters: '/newsletters/',
        firstArticle: '/some-cross-browser-devtools-features-you-might-not-know/',
        articles: '/archives/',
        searchString: 'cypress',
        searchResult: '/an-intro-to-web-app-testing-with-cypress-io/'
    },
};

export const counts: { [key: string]: { [key: string]: number } } = {
    development: {
        articlesPage: 720,
    },
    staging: {
        articlesPage: 720,
    },
    prod: {
        articlesPage: 720,
    },
};