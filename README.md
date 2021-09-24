### Research & Planning Log
#### Friday, 9/24

8:00 - Taking inventory. I deleted my project folder about ten times in the first couple of days. This iteration is pretty far along and will not be getting scrapped. At times I've felt proud of my progress, but other times thinking that I have been working for a week and don't have much to show.

So far, my app:
1. Has a navigation menu that switches between screens
2. Has a map screen that shows a live map
3. Lets users sign up, in, and out
4. Lets the user add a marker to the map
5. Maps the Firestore marker collection to the map

Actually, typing that out I feel okay. I'm stressing on time because I need to submit it to the app stores ASAP so I can fix the problems and meet the qualifications. I've only been emulating Android so far because I have an Android device; I haven't even touched iOS emulation.

The most pressing problems to solve:
1. I hacked together a way for the map to pull the markers from the database (once), but I don't really understand state well enough to have it update the map when a new marker is added (but only once, otherwise it gets stuck in a loop).
2. I also hacked together a solution to prevent a user from submitting a form. It's so much more complicated in React Native (can't simply put 'required' as a quality of the input). I need to handle all of the edge cases, as well as what to do as far as inputting the massive amount of optional data for the swims.