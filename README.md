# medieval-fantasy-game

https://asierbayon.github.io/medieval-fantasy-game/index.html

Medieval fantasy inspired game.

### Classes

## Game
This class controls the rest, it has the following responsibilities:
1. Create a 2D canvas, define it's width, height and fps
2. Define a variable this.level which instances each level of the game

# Methods
1. Start: starts the first level of the array, clears and stops the canvas and calls currentLevel() function.
2. Clear: clears the Canvas.
3. Stop
4. onKeyEvent: receives an event when the next level or the restart is available and calls goToNextLevel or restartThisLevel depending on the state of the playing level.
5. goNextLevel
6. restartThisLevel
5. currentLevel: returns the level that should be displaying.

## Level
This class contains more specific information of how should the elements interact by themselves and between each other.

# Methods
1. Start: this function executes constantly, according to the fps defined by game.
2. betweenLevelAnimation: this function executes the animation when a following level is available or when your character is dead and level must be restarted.
3. onKeyEvent: calls, when the player is not dead, to all the onKeyEvent functions of the classes that have it.
4. restart
5. draw: executes the function draw of all the classes that have to be drawn.
6. move: executes the function move of all the classes that have to be moved.
7. checkHealth: checks if the player is dead and its health and with this information displays the corresponding hearts on the canvas.
8. positionChecker: checks the position of the elements of the game within each other.
9. collisionChecker: wether the position checker checks the position of the elements, no matter they collide, this function does this last part.
10. onTheSamePlatform: checks if an enemy and the player are on the same platform.
11. callEnemy: when an enemy is close enough to the player, this first one can see the last and runs behind him.
12. nextToCharacter: sets to true or false if an element is right next to the player.
13. inlineChecker: checks the vertical and horizontal inline of the elements.
14. sideOfPlayerIsEnemyOn: as the enemies have to run and look to where the player is whe these are called, they need to have this information.
15. attack: everything that damages the player is executed here, this function filters the characters and obstacles that are on range and are able to hurt the player and reduces player's health.
16. heal: if a potion is next to character it increases the healthPoints of the character.
17. setTarget: as player need a target to attack, this is defined here
18. lookingAtEnemy: we need to know if the player is looking at the enemy to check if the attack of this first one on the right direction.
19. closestEnemy: setTarget needs to know which is the closest enemy
20. This loads the image that indicates us to press any key to continue when we kill the boss.

# Child Classes
1. Level_one
2. level_two
3. level_three

## Character
This is the parent class of the enemies and player, it contains the basic information that the other two classes share.

# Methods
1. isReady
2. isMoving: basically a function to reduce code in other following functions
3. draw
4. animateSprite
5. oneTimeAnimation: used by attack and die, when we just one the animation to be executed one
6. isDead: check if the character is dead
7. onPlatformChecker: checks if the character is on the platform

## Enemy
Parent class of each specific enemy, contains the basic information of what enemies need to behave.

# Methods
1. Move: as it moves depending on that the player is doing, it receives player as a variable and has to coordinate its speed with the speed from the background to make it look natural.
2. checkMovement: defines wether the character is moving, specially helpful for onPlatform situations.
3. onPlatformChecker: checks if a character is on a platform.

# Child classes
1. Bat
2. Wolf
3. Golem
4. Boss

## Player
Our main character!

# Methods
1. onKeyEvent: receives an event and indicates on the properties how it should move.
2. move
3. animate

## Obstacle
This name could be better because it doesn't actually obstacle any of the characters, at this point they are basically fireplaces and torches.

# Methods
1. isReady
2. onKeyEvent (moves like the background)
3. draw: as they are single line sprites, we just place a zero at the clipping start Y coordinate.
4. animateSprite
5. move

# Child Classes
1. Fireplace

## Potion
Allows our player to heal. Pretty useful if don't wanna die.

# Methods
1. Animate



## Credits 
https://oco.itch.io/medieval-fantasy-character-pack
https://ansimuz.itch.io/gothicvania-church-pack

