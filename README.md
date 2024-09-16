# tpot-tcg-autoseller

This is ai codeslop ductaped together by someone with no javascript experience. Any advice or criticism would be greatly appreciated.

## What it does

autoseller.js uses puppeteer to open the browser to the tpot tcg site, it logs on your acc (with **USERNAME** and **PASSWORD**) and goes to the market where it reopens the listing until the cards are successfully loaded (epilepsy warning). Once loaded, it sifts through looking for any excess cards to sell at the set price (see **'Select card and set price'**) and once scraped loops through selection, inputting price, quantity and submits the listing. I was unhappy about relying on a timer for the delay instead of relying on something stable like waiting for elements and/or selectors to load but i couldn't find a one-line replacement and didn't want to create yet another loop just for that - so after 3 seconds it attempts to create a new listing which loops back to card selection etc.

### What it does poorly

The prototype does what I needed it to do, though trying to sell cards under 10 causes it to get stuck trying to sell holo cards etc. I just change the price to 10 and restart the program, graceful? Absolutely not. Nonetheless, it fulfills my need.

## Trial and error (mostly error)

I had really never touched javascript code before, except for a couple web scraping programs I'd also ducttaped together. I assumed **ID's** were going to be what I used to refer to (e.g. **login-button**) initially - you actual programmers see where this is going - nothing worked because I didn't put the **#** in front of it, that didn't occur to me until while struggling to figure out how to make any of this work I noticed **'login-button'** was called **'button#login-button'** when i inspected it and I called that instead and it worked, then I removed button to see if it'd correctly reference that in the same way I'd shortened classes to e.g. **'.evBjBA'** (instead of the full class **'.sc-ZbTNT evBjBA'**) in the web scraping programs. I don't know any of the actual terminology so forgive me for the verbosity stemming from ignorance.

The second issue was that although everything up until this point was a **button**, the market itself was a **list item**, showing up as **'a'** in the inspector. I was stumped. At first I wondered whether since I was dealing with **href** I could just use **await page.goto()** and just add **#market** to the end of the **url**, obviously that didn't work. Staring at it blankly for a couple of minutes I eventually tried to copy it via. the context menu and saw **'copy selector'** which believe it or not meant nothing to me until I connected it to **await page.waitForSelector()** and had the embarrassingly novice epiphany. I'm still unhappy about it, however, as I'm sure there must be some way to put it more succint in the same way you can shorten classes, but I left the full path in because I knew if I got stuck here for too long I'd probably abandon the entire project out of boredom and a lack of minor wins.

It was smooth sailing until I got to the first **while loop**, I knew I'd be referring to **#card-select** but I couldn't for the life of me figure out what the individual **elements** therein were referred to, eventually I realized these were **options**: **#card-select option**. 

I'm sure the **parseInt()** could be shortened to **digits** skipping **'owned'** altogether, I didn't mess with it and decided to move on.

The program was working, but initially it was full of **timers** instead of **await page.waitForSelector()**, and I really didn't like the fact because it was such an obviously unstable **element** to have - **timers.** I eventually came across the aforementioned alternative and this worked perfectly for each **button**, it ceased to work altogether however when I got the final portion of the program, namely submitting the listing and creating a new listing, this is the one that still stumps me. I have no idea why none of my alternatives worked, I tried **await page.waitForSelector('#create-listing')** but none of it worked, the browser would immediately close after the first listing and the only solution was the **3** second timer, exactly **3**, nothing less.

### What I learned

* Some puppeteer methods
* CSS selector (#)
* copy selector
* options
* refresher in regex

Although I'm building things with AI I should return to basics and after this I'm inspired to do so, the next program I make will be by my own hand entirely.

Thanks for reading.
