document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('start-screen').style.visibility = 'hidden';
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