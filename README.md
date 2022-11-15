For this simple project to help users generate a cataas url given their preferences, given that we already have an API provided to consume data, I figured that a simple Frontend-only static webpage would suffice- since we do not need any data other than what the user wants for their cat image.

I used React as the frontend framework - to generate a Single Page App that is responsive and thus can run on both mobile and desktop devices. There is no need for multiple pages or routing due to the simple nature of the application. I made the form in a multi-step format as that does not overload the user with too many options at a single time - together with a progress bar that shows them exactly which step they are at.

I used Material UI for styling as well as for the components it provides - making some manual adjustments along the way.

Formik was used to help with the validation of user input - namely for the height and width, which are capped at 1000px each and can't be a negative number. I also added an extra layer of validation for what the user wishes for the cat to say (either it is a string or null).

Given that the same URL provided will most likely lead to a different cat picture the more general the specifications are, I elected to just provide the user with a URL for them to visit and/or copy. I decided to give the user a preview of what their cat image might look like within the SPA when they generate their URL.

I think building a responsive Web Application would be most suitable for this as being platform agnostic serves the general purpose of this app the best. A large portion of those who might be looking to generate and send a cat image would probably be doing it on their mobile devices (so that they can send it over a chat group, for example), so not having a responsive Web App would be counterintuitive. Given the scale, a full-blown React Native application would probably be considered 'overkill', and users might not want to download an application for such a specific purpose and can be done simply by visiting a URL on their mobile browser instead - and some people might be using a laptop or desktop device.
