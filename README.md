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

11 - Spent a half hour trying to fix the API key thing. I installed a dotenv plugin specifically for React Native, but it's still not working. Frustrating day so far.

11:45 - Added a handlePress function to Map.js. This adds a marker to state.markers, which I don't actually use. I need this initial function to do much more complicated things. Lunch time.

12:30 - Added map clustering

2:45 - I really don't know where the last two hours went. I moved the NewMarker form to its own screen, which enabled me to use the navigation prop to switch to the map when a new marker is added.

3:45 - Slowly trying to figure out how to use long presses to interact with markers.

4:40 - Added a dialogue that pops up when you long press, asking if you want to make a new marker. Still needs to navigate you to the NewMarker screen.

4:45 - NM, just fixed that. Going to wrap things up and submit this project.

#### Saturday 9/25

7:30 - I'm just going to keep writing in this README to track how I'm doing. Before I went to bed last night I was researching the app store approval process. It's not that bad (fingers crossed) and makes me think I can submit this in 2-3 days (toes twisted).

8:20 - Trying to learn enough about props to save temporary coordinates from the longPress so that they can be used in the NewMarker form. I think I should have learned this from the lessons but I didn't quite grasp it at the time.

11:30 - This is taking me forever. Because of how I set up the drawer menu, none of the screens are actually inside a parent. I am having to create new components just to be able to pass props between them.

12:30 - Back to work. I made a ScreenControl component to hold the map so that I can pass props to it. Now I need to cut up the NewMarker screen into a component that can go into ScreenControl, and possibly turn the form part of it back into a component. I might kill the Add Swim screen and just have the form as part of Map.

1:30 - Got that done. Now I can press on the map, navigate to a form, and (potentially) make a new marker. I need to update the forms and Firestore collection to remove latitude/longitude as now it will take a coordinate value from the marker location.

1:45 - You can now add a new marker to the map AND it will update right away and show on the form. I have no idea why it updates now; I literally spent four hours trying to get it to do that the other day.

2:45 - Cleaning up extraneous files and comments. Figuring out what information to add to marker form.

3:40 - Added a Picker (selector) to ReusableForm.

4:50 - Added all of the properties required to make a marker (location, season, type, etc.). Decided not to do a rating system. Done for the day.

#### Sunday 9/26

7:45 - Working on making an edit marker screen, adding a comment/review form for public users, and putting in a delete button.

10:00 - Breakfast.

10:30 - Still working on trying to get the pressed marker to return an id that I can use to generate an info page. It is surprisingly difficult.

11:10 - The problem, which is the same one that ate up four hours the other day, is that I can't use this.setState(property: newStringOrNumber) inside the functions I am writing. I had to make the property an empty array, then push the new thing to it. I'm still not sure why.

11:40 - Working on switching to the Edit Marker screen.

2:50 - Took about fifteen for a snack. I've been working on the same problem as this morning but in a different place. This time I can't even update it with an array.

5:20 - Wasted almost all day trying to figure out how to edit the marker, and failed. Ended up adding a delete button (surprisingly easy) and styling the map (surprisingly hard).

#### Monday 9/27 - Thursday 9/30

I'm going to quickly recap the work I got done on the last couple of school days.

- Styled the map
- Tried to get an address when taking the coordinates from a map press (not yet successful)
- Added MarkerDetail
- Add Edit Swim button
- Add SwimNW info screen
- Attempted to set up Firebase UI; too much to change
- Fix navigation in sign-out screens
- Fix memory leak in MarkerDetail by adding useEffect
- Put getMarkers() into componentDidMount in Map.js
- Prevent user from adding marker unless signed in
- Generate app bundle to submit to Android store
- Submit app to Android store
- Add alerts for signin/signup edge cases
- Create 'users' collection in Firebase that stores extra info when user creates account
- Add images
- Remove headers
- Cleaning and refactoring
- Prepared app for iOS (this involved booting up my 12-year-old Mac and then renting virtual Mac space when I couldn't install the right software); app ready for iOS; waiting for dev account approval

#### Friday 10/1

5:30 - Woke up early. Need to fix the drawer menu. Trying to get it to only show a hamburger menu (actually I want it to show waves but I can't figure out how to do that). I thought I had it working last night but it's broken this morning.

5:50 - Everything is broken. It was fine last night but now it's not. :|

6:00 - Now it's working again. For no particular reason

8:00 - I put in marker icons that switch depending on the type of swim. Trying to get the navigation button to be its own thing to minimize screen clutter

8:45 - Got the nav button to be its own thing. Working on allowing user to take and upload pics

11:45 - Been a hot minute since I updated this. The camera works but it's not hooked up to save data yet. I'm working on adding a picture to the marker detail screen.

12:30 - Picture works but now there's a problem with the scrollview where it is creating a bunch of extra space at the bottom of the screen. All of the suggestions for fixing it on the Internet are the same one; it does not work.