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
3. The Firebase login credentials / .env process outlined in the lessons is not working for this project. I can't figure out why. It worked when I did the homework and the projects for class, but I had to put the information directly into my firebase.js file, which means that I've been sending the key to Github. I'll have to go back later and get it to un-share all of those files in past commits.

10:30 - I've spent two hours trying to troubleshoot #1 in Map.js. I feel very close to understanding the problem. It has something to do with the asynchronous nature of setState, but even trying to manually update the arrayLength property doesn't work. I'm going to work on something else for a while.

11: Spent a half hour trying to fix the API key thing. I installed a dotenv plugin specifically for React Native, but it's still not working. Frustrating day so far.