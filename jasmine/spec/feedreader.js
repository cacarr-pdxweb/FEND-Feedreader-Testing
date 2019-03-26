/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () { // hmm, not certain of the syntax for IIFE fat arrow functions
    /*  This suite is all about the RSS feeds definitions, 
     *  the allFeeds variable in our application.
     */

    describe('RSS Feeds', () => {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through feeds
         * in the allFeeds object and ensures each feed has a defined URL
         * that includes more than https:// 
         */

        it('have valid URLs', () => {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeLessThan(10); // should be longer than http://.co to be valid
            });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures each has a defined name
         * that is not empty.
         */

        it('have defined, non-empty names', () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toEqual('string'); // should be a string
                expect(feed.name.length).not.toBeLessThan(1); // should not be empty
            });
        });
    });



    /* A suite testing the menu */

    describe('The Menu', () => {

        /* A test ensuring the menu element is hidden by default. */

        it('is hidden by default', () => {
            expect(document.getElementsByTagName('body')[0]).toHaveClass('menu-hidden'); // check for .menu-hidden class in body tag  
        });

        /* A test ensuring the menu is displayed when menu icon is clicked, then hides 
         * when clicked again.
         */

        it('toggles visible/hidden with a click', () => {

            document.getElementsByClassName('menu-icon-link')[0].click(); // click menu icon
            expect(document.getElementsByTagName('body')[0]).not.toHaveClass('menu-hidden'); // menu should be visible

            document.getElementsByClassName('menu-icon-link')[0].click(); // click menu icon
            expect(document.getElementsByTagName('body')[0]).toHaveClass('menu-hidden'); // menu should be hidden
        });
    });



    /* A suite testing initial entries */

    describe('Initial Entries', () => {

        /* A test ensuring that when the loadFeed function is called and completes its work, 
         * there is at least a single .entry element within the .feed container.
         * loadFeed() is asynchronous 
         */

        beforeEach((done) => {
            loadFeed(0, done);
        });

        it('have at least a single .entry element in .feed container', () => {
            expect(document.querySelectorAll('article.entry').length).toBeGreaterThan(0); // checks for at least one .entry element
        });
    });



    /* A suite testing new feed selection*/

    describe('New Feed Selection', () => {

        /* A test ensuring that when a new feed is loaded
         * by the loadFeed function, that the content actually changes.
         * loadFeed() is asynchronous.
         */

        let feed;
        let nextFeed;

        beforeEach((done) => {
            loadFeed(0, () => {
                feed = document.querySelector('div.feed').textContent;
                loadFeed(1, () => {
                    nextFeed = document.querySelector('div.feed').textContent;
                    done();
                });
            });
        });

        it('should show new content when a new feed is loaded', () => {
            expect(feed).not.toEqual(nextFeed); // first and subsequents feeds should be different 
        });
    });
}());
