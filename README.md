## Lyndsie's Code Game

* Upon loading, the user is presented with simple instructions for the game and a start button. There is a link to the highscores in the top left corner if a user would like to view their previous scores before playing.
* When the start button is pushed, the game cycles through 5 multiple choice coding questions. The answer choices change opaqueness upon hover. Incorrect answers deduct 12 seconds from the 60 total seconds given for game play. A response appears under the answer choices advising the user if their selection was correct or wrong. If the user doesn't complete all questions before time runs out, the game automatically ends. 
* The score is based on the amount of time remaining upon game completion. Once the game is complete, the user is given their final score and asked to enter their initials. The initials and score are saved in local storage for use in the High Scores chart. 
* Once the user submits their initials, a high score chart displays the score just received and any previous scores (up to 10) saved in their local storage. The high score chart is sorted to show the scores in descending order. The highscores table also presents a play again button should the user wish to try again. If the user tries to submit their score without entering their initials, they are alerted the initials are required to proceed.
* I used a separate JS file to store the questions to make working through the app easier.

The game is published at  https://lyndsielane.github.io/code-game/

![Game Screenshot](https://github.com/lyndsielane/code-game/blob/main/Assets/Photos/127.0.0.1_5501_index.html.png?raw=true)