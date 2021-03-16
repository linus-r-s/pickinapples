input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    setup()
})
function checkForApple () {
    if (x == apple_x && y == apple_y) {
        points += 1
        timer = time
        placeApple()
    }
}
function showApple () {
    led.plot(apple_x, apple_y)
}
function placeApple () {
    apple_x = randint(0, 4)
    apple_y = randint(0, 4)
}
function read_x () {
    if (pins.analogReadPin(AnalogPin.P0) < 350) {
        if (x < 4) {
            basic.clearScreen()
            x += 1
            moves += -1
        }
    } else if (pins.analogReadPin(AnalogPin.P0) > 1000) {
        if (x > 0) {
            basic.clearScreen()
            x += -1
            moves += -1
        }
    }
}
function setup () {
    time = 15
    timer = time
    moves = 50
    points = 0
    x = 2
    y = 2
    placeApple()
}
function read_y () {
    if (pins.analogReadPin(AnalogPin.P1) < 350) {
        if (y < 4) {
            basic.clearScreen()
            y += 1
            moves += -1
        }
    } else if (pins.analogReadPin(AnalogPin.P1) > 1000) {
        if (y > 0) {
            basic.clearScreen()
            y += -1
            moves += -1
        }
    }
}
let moves = 0
let time = 0
let timer = 0
let points = 0
let apple_y = 0
let y = 0
let apple_x = 0
let x = 0
setup()
basic.forever(function () {
    while (moves > 0) {
        led.plot(x, y)
        read_x()
        read_y()
        showApple()
        checkForApple()
        timer += -1
        if (timer == 0) {
            basic.clearScreen()
            placeApple()
            timer = time
        }
        basic.pause(200)
    }
    basic.showNumber(points)
})
