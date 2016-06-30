Lark: A destination-agnostic airfare scanner.
=============================================

Most applications that help find cheap airfare (Expedia, Kayak, Priceline, etc.), assume a kind of deterministic view of travel: both the origin and the destination are known.  What they specialize in finding is an affordable flight to and from a specified location.  This works well, but doesn't account for the spontaneous vacations, the whimsical trips that we sometimes have the opportunity to take; neither is it flexible enough to help travelers who have a set amount of time and money, and "just want to go somewhere."

Lark takes a different approach to travel planning.
---------------------------------------------------

All you need to search for flights with Lark is a destination and a departure date (return date optional). It searches for the cheapest flight to a curated list of major cities in the US, giving you the freedom to choose which destination you prefer.  Sometimes it's nice just to find out where you can go with a given amount of money and time, and Lark takes the position that this kind of travel can be excitiing and more refreshing than having a destination in mind from the beginning.

How it was made.
----------------

Lark is built using:

* Angular
* Node
* Grunt
* QPX Express Flight Data API
* Vanilla JS

The biggest challenge in making this app, which was built in five days as a senior project at MakerSquare, was working with the API.  QPX Express is Google's flight data API, and while very powerful, tightly controls the number of requests allowed per day, and even per call to their database.  Given that the nature of the Lark app is to aggregate potentially hundreds of API call responses (a call is made up of one origin and one destination), its funcationality was impeded by what turned out to be a sort of miserly API.  

In its current state, Lark does return four or five flight results, but is limited to not much more than that per call, and no more than 50 calls a day to the database.

Another challenge was building the API requests.  Typically when using the QPX Express API, the destination isn't a variable; because Lark hinges on variable destinations, I had to implement a solution that dynamically created API requests based on many different cities.  This happens in an Angular directive.  While I wasn't able to squeeze more results from the API, with a more generous API, assuming the same interface, the solution I developed would be quite robust.

UPDATE
------

This app was originally published and hosted on [Divshot](https://divshot.com/), a static-site hosting service, which has since been shut down.  I have new goals for this project, and for now have taken down all links to the live app, because a) Divshot doesn't exist anymore (although I could transfer the project to Firebase), and more importantly b) I'm going to spend some time thinking about what to salvage from this project before revisiting it.  Ultimately, I'd like for this to app to change direction, and instead help two travelers coming from different origins find the cheapest destination between them.  

