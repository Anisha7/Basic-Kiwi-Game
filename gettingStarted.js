
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

