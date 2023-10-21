const { Builder, Browser, By, Key, until } = require('selenium-webdriver');

const criarNavegador = async () => {
    let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    return driver
}

module.exports = criarNavegador