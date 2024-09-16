const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // For visual debugging
    const page = await browser.newPage();

    // Handle dialogs that may appear
    page.on('dialog', async dialog => {
        console.log('Dialog detected: ', dialog.message()); // Log the dialog message
        await dialog.accept();  // Automatically accept the dialog
    });

    // Navigate to the page and login
    await page.goto('https://tpot-tcg.com/login.html');
    await page.waitForSelector('#username');
    await page.type('#username', 'USERNAME'); // Replace 'USERNAME' with actual username
    await page.type('#password', 'PASSWORD'); // Replace 'PASSWORD' with actual password
    await page.click('#login-button');

    // Wait for navigation after login
    await page.waitForNavigation();

    // Navigate to the market
    await page.waitForSelector('#content > nav > ul > li:nth-child(2) > a');
    await page.click('#content > nav > ul > li:nth-child(2) > a');

    // Click on the 'create-listing' button
    await page.waitForSelector('#create-listing');
    await page.click('#create-listing');

    // Loop until there are more than 2 options in the 'card-select' dropdown
    let optionsCount = 0;

    while (optionsCount <= 1) {
        // Wait for the 'card-select' menu to load
        await page.waitForSelector('#card-select');
        await page.click('#card-select');

        // Get the number of options in the 'card-select' dropdown
        optionsCount = await page.evaluate(() => {
            const options = document.querySelectorAll('#card-select option');
            return options.length;
        });

        // If there are fewer than 2 options, close the modal and wait before trying again
        if (optionsCount <= 1) {
            await page.click('#close-modal');  // Close the modal

            // Click on the 'create-listing' button again to reopen the modal
            await page.waitForSelector('#create-listing');
            await page.click('#create-listing');
        }
    }

    // Get all card options
    const cardOptions = await page.evaluate(() => {
        const options = [...document.querySelectorAll('#card-select option')];
        return options.map(option => ({
            text: option.textContent,
            value: option.value,
            owned: parseInt(option.textContent.match(/\((\d+)\sowned\)/)?.[1] || '0', 10)
        }));
    });

    // Loop through card options and set listing details
    for (const card of cardOptions) {
        if (card.owned > 1) {
            // Select card and set price
            await page.click('#card-select');
            await page.select('#card-select', card.value);
            await page.type('#listing-price', '4.99');

            // Set quantity to number of cards greater than 1
            await page.type('#listing-quantity', String(card.owned - 1));

            // Submit the listing
            await page.click('#submit-listing');

            // Wait for 3 seconds
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Open a new listing
            await page.click('#create-listing');
        }
    }

    // Close the browser
    await browser.close();
})();
