input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    setup()
})
function checkForApple () {
    if (player.isTouching(apple)) {
        points += 1
        timer = time
        music.playTone(523, music.beat(BeatFraction.Eighth))
        placeApple()
    }
}
function placeApple () {
    apple.setX(randint(0, 4))
    apple.setY(randint(0, 4))
}
function read_x () {
    if (microboy.readJoystick(Axis.X) < 350) {
        if (player.get(LedSpriteProperty.X) < 4) {
            player.changeXBy(1)
            moves += -1
        }
    } else if (microboy.readJoystick(Axis.X) > 1000) {
        if (player.get(LedSpriteProperty.X) > 0) {
            player.changeXBy(-1)
            moves += -1
        }
    }
}
function setup () {
    time = 15
    timer = time
    moves = 50
    points = 0
    placeApple()
}
function read_y () {
    if (microboy.readJoystick(Axis.Y) < 350) {
        if (player.get(LedSpriteProperty.Y) < 4) {
            player.changeYBy(1)
            moves += -1
        }
    } else if (microboy.readJoystick(Axis.Y) > 1000) {
        if (player.get(LedSpriteProperty.Y) > 0) {
            player.changeYBy(-1)
            moves += -1
        }
    }
}
let moves = 0
let time = 0
let timer = 0
let points = 0
let player = game.createSprite(2, 2)
let apple = game.createSprite(randint(0, 4), randint(0, 4))
setup()
pins.setAudioPin(AnalogPin.P2)
basic.forever(function () {
    while (moves > 0) {
        read_x()
        read_y()
        checkForApple()
        timer += -1
        if (timer == 0) {
            basic.clearScreen()
            music.playTone(330, music.beat(BeatFraction.Eighth))
            placeApple()
            timer = time
        }
        basic.pause(200)
    }
    basic.showNumber(points)
})
