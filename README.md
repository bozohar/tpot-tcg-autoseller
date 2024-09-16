# tpot-tcg-autoseller

This is ai codeslop ductaped together by someone with no javascript experience. Any advice or criticism would be greatly appreciated.

autoseller.js uses puppeteer to open the browser to the tpot tcg site, it logs on your acc (with USERNAME and PASSWORD) and goes to the market where it reopens the listing until the cards are successfully loaded (epilepsy warning). Once loaded, it sifts through looking for any excess cards to sell at the set price (see 'Select card and set price') and once scraped loops through selection, inputting price, quantity and submits the listing. I was unhappy about relying on a timer for the delay instead of relying on something stable like waiting for elements and/or selectors to load but i couldn't find a one-line replacement and didn't want to create yet another loop just for that - so after 3 seconds it attempts to create a new listing which loops back to card selection etc.

The prototype does what I needed it to do, though trying to sell cards under 10 causes it to get stuck trying to sell holo cards etc. I just change the price to 10 and restart the program, graceful? Absolutely not. Nonetheless, it fulfills my need.
