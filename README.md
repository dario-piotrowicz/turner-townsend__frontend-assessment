# Turner-Towsend Frontend-Assessment

> [Assessment Intructions](./ASSESSMENT_README.md)

\
&NewLine;

## My thoughts

This is a very simple assessment open to interpretation and open-ended, it also does not have a time limit so people could spend any amount of time working on it to make it as advanced as possible. Since it is an assessment to showcase one's web-development/Angular knowledge and coding style I decided not to spend more than a weekend on that (possibly less) and to showcase a simple solution which could be expanded upon.

Nevertheless I have kept in mind the "We would like to see" items specified in the assessment README and made an effort to fulfil them as best as I can.

## Comments

- Since it has been asked to show an approach to styles I decided not to include libraries such as Angular Material or Bootstrap but to write the styles directly in Scss, I have used the BEM notation alongside SASS features.
- The application is divided in modules divided by features/pages (a more granular level or modularization seemed accessive to me, I would have liked to put the LoadingService in a shared module but since it is coupled with the app component I thought it just made more sense to leave it at the root level)
- Such modules are dynamically lazy-loaded, this is naturally overkill for such a simple application (actually I was not even sure about using routing in the first place but I did since it is also specified in the assessment README) but anyways this showcases the general approach I would follow for a standard/larger application.
- I implemented the playlistsItem component as an anchor element, I did so (instead of using a div for example) because it semantically makes more sense and especially because (thanks to the semantic) in this way the playlists are more accessible to all users (using screen-readers, just keyboard, etc...)
- For various parts of the application I would have liked to use css grid (like for the playlistsItem component), but I opted for flex containers not to limit the target browsers (as Turner & Towsend may need to cater for IE11 and/or older browsers)
- In my implementation I am caching the playlists I receive from the provided URL, that again is quite overkill for such a simple application, but it does make sense since we can assume the playlists do not change very often so by caching it we allow the user to navigate throught the application (just from and to the home page in this simple app) without the need to download the playlists again (note: I could have gone one step further and save the list in local/session storage with an expiry time but it didn't make too much sense to go that far for this simple app).
- Given the simplicity of the required components I was able to apply to them the OnPush change detection strategy, again this is a little overkill and isn't going to make any noticeable difference for such a small app, but I added it to show that I am aware of such stragegy and its use.

## Challenges

- Regarding unit tests, I have placed mock data in different spec files which may not be ideal, I know that some prefer to have the mock data in specific mock files and I do agree that that is a good way to make the files more concise and the mocks more reusable, but I slightly prefer, given that the mocks are relatively small, to place them directly in the spec files themselves as not to pollute the project with too many testing related files (I am aware that this is not very DRY, but I believe that DRY can sometimes be ignored for the sake of semplicity and well structured code).
- In order to unit test the PlaylistsPage component I had to override the component in the TestBed.configureTestingModule so that it would have its change detection strategy set to Default. This doesn't seem optimal and changing the component's behavior when testing it does concern me, that being said I'd imagine this would be fine as long as we know what we're doing and what we're testing (besides the Default change detection strategy practically only adds extra change detection runs compared to OnPush, so if the tests are wrritten correctly whilst keeping that in mind they should still be valid).

## Deployment

The app is deployed at: https://tt-playlists-viewer.netlify.app
