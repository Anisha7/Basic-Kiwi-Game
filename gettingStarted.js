
// Responsible for booting the required managers and handling the game loop
// This will initialize all the game variables including cameras, state managers etc.
let myGame = new Kiwi.Game();

// Our state will control what happens in the game
// It will contain the logic for creating the sprites, animations and controlling updating and input.
let myState = new Kiwi.State( "myState" );

// The state has several pre-defined functions that run during the game. 
// You can configure these to add your own content and logic using the below syntax:
    // stateName.functionName = function () {
        // Kiwi.State.functionName.call( this );
            // The “call” invokes the original version of the function. 
            // This is very important, and you shouldn’t leave it out of pre-defined functions.
        // ....
    // }


// Preload loads are assets for us. It’s all done under the hood so no need to worry about how it all works.
// Preloading the assets allows us to grab them out of the "texture library" and assign them to entities, 
// without interrupting our game to go and load the textures.
myState.preload = function () {
    Kiwi.State.prototype.preload.call(this);
    // The sprite sheet also requires width and height parameters
    // corresponding to the width and height of each frame in the sprite.
    this.addSpriteSheet( 'characterSprite', 'character.png', 150, 117 );
    // For adding full images, use addImage
    this.addImage( 'background', 'jungle.png' );
}

// The create method is called once the preload method has finished loading our assets in. 
// Therefore, it is a good time to create our entities.
myState.create = function(){
 
    Kiwi.State.prototype.create.call( this );
    
    // grabs image and sprite sheet from "texture library" that we added to previously in preload function
    // Note: we use StaticImage to load the background with position 0,0
    this.background = new Kiwi.GameObjects.StaticImage( this, this.textures.background, 0, 0 );
    // Note: we use characterSprite to load the character with the position where we want it placed
    this.character = new Kiwi.GameObjects.Sprite( this, this.textures.characterSprite, 350, 330 );

    // animation key objects to control and move our character, therefore we need to set up some key inputs. 
    // Use addKey method to game's input keyboard and use specified keycodes
    // You can choose to use the A,S,D keys or LEFT, RIGHT, DOWN.
    this.leftKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.A );
    this.rightKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.D );
    this.downKey = this.game.input.keyboard.addKey( Kiwi.Input.Keycodes.S );

    // adding animations to the character
    // This is where we give names for each animation and specify which frames of the sprite sheet to use. 
    // Setting the timing for all the animations to 0.1 gives us nice smooth animation, 
    // and we should only set the loop to true for the two moving animations.
    this.character.animation.add( "idleright", [ 0 ], 0.1, false );
    this.character.animation.add( "crouchright", [ 1 ], 0.1, false );
    this.character.animation.add( "moveright", [ 2, 3, 4, 5, 6, 7 ], 0.1, true );
    this.character.animation.add( "idleleft", [ 8 ], 0.1, false );
    this.character.animation.add( "crouchleft", [ 9 ], 0.1, false );
    this.character.animation.add( "moveleft", [ 15, 14, 13, 12, 11, 10 ], 0.1, true );

    // We also need to track which way our character is facing so we can play the appropriate animation when the 
    // character is facing right or left. Let’s set this to “right” to start.
    this.facing = "right";

    // Lastly we need to play an animation, in this case “idleright
    this.character.animation.play( "idleright" );
    
    // Adding the entities to the state
    // Lets add both GameObjects as children to the state. 
    // Children added to the state will automatically update and render during the update loop.
    this.addChild( this.background );
    this.addChild( this.character );
}