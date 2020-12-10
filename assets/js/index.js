document.getElementById('enemies-deck').addEventListener('click', () => {
    document.getElementById('start-screen').style.visibility = 'hidden';
})

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('start-screen').style.visibility = 'hidden';
    document.getElementById('enemies-deck-expanded').style.visibility = 'hidden';
})

document.getElementById('close-button').addEventListener('click', () => {
    document.getElementById('start-screen').style.visibility = 'visible';
})

window.addEventListener('load', () => {
    const game = new Game('canvas-game');
    game.start();

    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event);
    });
    document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event);
    });
});