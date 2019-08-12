import {
    Sprite,
    Application,
    Rectangle,
    DisplayObject,
    Graphics,
    Text
} from "pixi.js";
import { print, random } from "introcs";


const app = new Application(800, 500, { backgroundColor: 0xec301a });
document.body.appendChild(app.view);

class Pillar {
    pillar: Sprite;
    constructor(image: string, x: number, y: number) {
        this.pillar = Sprite.fromImage(image);
        this.pillar.scale.x = .5;
        this.pillar.scale.y = .5;
        this.pillar.x = x;
        this.pillar.y = y;
    }
}

let pillar1 = new Pillar("./backpillar1.png", 20, 265);
let pillar2 = new Pillar("./backpillar2.png", 120, 265);
let pillar3 = new Pillar("./backpillar3.png", 220, 265);
let pillar4 = new Pillar("./backpillar2.png", 320, 265);
let pillar5 = new Pillar("./backpillar1.png", 420, 265);
let pillar6 = new Pillar("./backpillar3.png", 520, 265);
let pillar7 = new Pillar("./backpillar1.png", 620, 265);
let pillar8 = new Pillar("./backpillar2.png", 720, 265);

let pillarArray: Pillar[] = [pillar1, pillar2, pillar3, pillar4, pillar5, pillar6, pillar6, pillar7, pillar8];

for (let i = 0; i < pillarArray.length; i++) {
    app.stage.addChild(pillarArray[i].pillar);
}

let ground  = new Graphics();
ground.beginFill(0x8d1d0b);
ground.drawRect(0, 400, 800, 100);

let player = Sprite.fromImage("./Avatar.png");
player.scale.x = .17;
player.scale.y = .17;
player.x = 10;
player.y = 300;
app.stage.addChild(player);
const speed = 1;

let U = 0;
let D = 0;
let fire = false;
let click = 0;

window.addEventListener("keydown", (e: KeyboardEvent): void => {
    console.log("key: " + e.keyCode);
    const DOWN: number = 40;
    const UP: number = 38;
    const S = 83;
    if (e.keyCode === UP) {
        U = -5;
    } else if (e.keyCode === DOWN) {
        D = 5;
    } else if (e.keyCode === S) {
        fire = true;
    }

});

window.addEventListener("keyup", (e: KeyboardEvent): void => {
    console.log("key: " + e.keyCode);
    const UP: number = 38;
    const DOWN: number = 40;
    if (e.keyCode === UP) {
        U = 0;
    } else if (e.keyCode === DOWN) {
        D = 0;
    }
});

let earthElement1 = Sprite.fromImage("./Earth.png");
let a = earthElement1.x + earthElement1.width;
let fireElement1 = Sprite.fromImage("./Fire.png");
let b = fireElement1.x + fireElement1.width;
let waterElement1 = Sprite.fromImage("./Water.png");
let airElement1 = Sprite.fromImage("./Air.png");
let earthElement2 = Sprite.fromImage("./Earth.png");
let fireElement2 = Sprite.fromImage("./Fire.png");
let waterElement2 = Sprite.fromImage("./Water.png");
let airElement2 = Sprite.fromImage("./Air.png");


let arrowArray = [earthElement1, fireElement1, waterElement1, airElement1, earthElement2, fireElement2, waterElement2, airElement2];

let resetArrow = (element: Sprite): void => {
    app.stage.removeChild(element);
};

let ship1 = Sprite.fromImage("./FireNationShip.png");
ship1.scale.x = .3;
ship1.scale.y = .3;
ship1.x = 800;
ship1.y = 500;
app.stage.addChild(ship1);
let ship2 = Sprite.fromImage("./FireNationShip.png");
ship2.scale.x = .3;
ship2.scale.y = .3;
ship2.x = 800;
ship2.y = 500;
app.stage.addChild(ship2);
let ship3 = Sprite.fromImage("./FireNationShip.png");
ship3.scale.x = .3;
ship3.scale.y = .3;
ship3.x = 800;
ship3.y = 500;
app.stage.addChild(ship3);

let resetShip = (ship: Sprite): void => {
    ship.x = 800;
    ship.y = random(50, 300);
};

let health1 = Sprite.fromImage("./Health.png");
health1.scale.x = .3;
health1.scale.y = .3;
health1.x = 750;
health1.y = 20;
app.stage.addChild(health1);
let health2 = Sprite.fromImage("./Health.png");
health2.scale.x = .3;
health2.scale.y = .3;
health2.x = 710;
health2.y = 20;
app.stage.addChild(health2);
let health3 = Sprite.fromImage("./Health.png");
health3.scale.x = .3;
health3.scale.y = .3;
health3.x = 670;
health3.y = 20;
app.stage.addChild(health3);

let healthArray = [health3, health2, health1];

let isColliding = (a: DisplayObject, b: DisplayObject): boolean => {
    let ab: Rectangle = a.getBounds();
    let bb: Rectangle = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
};

let elementColliding = (a: DisplayObject, b: DisplayObject): boolean => {
    let ab: Rectangle = a.getBounds();
    let bb: Rectangle = b.getBounds();
    if (ab.x + ab.width === bb.x && (ab.y > bb.y && ab.y < bb.y + bb.height) || ab.x + ab.width === bb.x && (ab.y + ab.height > bb.y && ab.y + ab.height < bb.y + bb.height)) {
        return true;
    } else {
        return false;
    }
};

let gameOver = Sprite.fromImage("./gameover.png");
gameOver.scale.x = .5;
gameOver.scale.y = .5;
gameOver.x = 0;
gameOver.y =  0;

let score = 0;
let scoreText: Text = new Text("Score: " + score);
scoreText.x = 20;
scoreText.x = 20;
app.stage.addChild(scoreText);

let scoreUpdate = (): void => {
    app.stage.removeChild(scoreText);
    app.stage.addChild(scoreText);
};

let i = 0;
let j = 0;

let homeScreen = Sprite.fromImage("./HomeScreen.png");
homeScreen.scale.x = .5;
homeScreen.scale.y = .5;
homeScreen.x = 0;
homeScreen.y = 0;
app.stage.addChild(homeScreen);
let instructionScreen = Sprite.fromImage("./instruction.png");
instructionScreen.scale.x = .5;
instructionScreen.scale.y = .5;
instructionScreen.x = 0;
instructionScreen.y = 0;

let finalScore = new Text();
finalScore.text = scoreText.text;
finalScore.scale.x = 1.3;
finalScore.scale.y = 1.3;
finalScore.x = 320;
finalScore.y = 100;
finalScore.style.fill = 0xffffff;

let gameLoop = (delta: number): void => {
    if (click === 0) {
        window.onkeydown = (e: KeyboardEvent): void => {
            let SPACE = 32;
            if (e.keyCode === SPACE) {
                click++;
            }
        };
    } else if (click === 1) {
        score = 0;
        scoreText.text = "Score: " + score;
        app.stage.removeChild(homeScreen);
        app.stage.removeChild(gameOver);
        app.stage.removeChild(finalScore);
        app.stage.addChild(instructionScreen);
        window.onkeydown = (e: KeyboardEvent): void => {
            let SPACE = 32;
            if (e.keyCode === SPACE) {
                click++;
                app.stage.addChild(health3);
                app.stage.addChild(health2);
                app.stage.addChild(health1);
                app.stage.addChild(scoreText);
                resetShip(ship1);
                resetShip(ship2);
                resetShip(ship3);
            }
        };
    } else if (click >= 2 && j < 3) {
        app.stage.removeChild(instructionScreen);
        app.stage.addChild(ground);
        window.onkeydown = (e: KeyboardEvent): void => {
            let SPACE = 32;
            if (e.keyCode === SPACE) {
                click++;
            }
        };
        player.y += (U + D) * speed;
        if (player.y <= 0) {
            player.y = 0;
        } else if (player.y >= 300) {
            player.y = 300;
        }
    
        if (fire) {
            app.stage.addChild(arrowArray[i]);
            arrowArray[i].scale.x = .35;
            arrowArray[i].scale.y = .35;
            let height = player.y;
            arrowArray[i].y = height + 50;
            arrowArray[i].x = 20;
            fire = false;
            i++;
            if (i === 8) {
                i = 0;
            }
        }

        earthElement1.x += 5;
        fireElement1.x += 5;
        waterElement1.x += 5;
        airElement1.x += 5;
        earthElement2.x += 5;
        fireElement2.x += 5;
        waterElement2.x += 5;
        airElement2.x += 5;

        if (score < 1500) {
            ship1.x -= 5 * speed;
            ship2.x -= 5 * speed;
            ship3.x -= 5 * speed;
        } else if (score < 3000) {
            ship1.x -= 8 * speed;
            ship2.x -= 5 * speed;
            ship3.x -= 5 * speed;
        } else if (score < 4500) {
            ship1.x -= 8 * speed;
            ship2.x -= 8 * speed;
            ship3.x -= 5 * speed;
        } else if (score < 6000) {
            ship1.x -= 8 * speed;
            ship2.x -= 8 * speed;
            ship3.x -= 8 * speed;
        } else if (score < 7500) {
            ship1.x -= 10 * speed;
            ship2.x -= 8 * speed;
            ship3.x -= 8 * speed;
        } else if (score < 9000) {
            ship1.x -= 10 * speed;
            ship2.x -= 10 * speed;
            ship3.x -= 8 * speed;
        } else {
            ship1.x -= 10 * speed;
            ship2.x -= 10 * speed;
            ship3.x -= 10 * speed;
        }
        
        if (ship1.x <= -10) {
            app.stage.removeChild(healthArray[j]);
            j++;
            resetShip(ship1);
        }
        if (isColliding(earthElement1, ship1) || isColliding(fireElement1, ship1) || isColliding(waterElement1, ship1) || isColliding(airElement1, ship1) || isColliding(earthElement2, ship1) || isColliding(fireElement2, ship1) || isColliding(waterElement2, ship1) || isColliding(airElement2, ship1)) {
            resetShip(ship1);
            score += 20;
            scoreText.text = "Score: " + score;
        }
        if (ship2.x <= -10) {
            app.stage.removeChild(healthArray[j]);
            j++;
            resetShip(ship2);
        }
        if (isColliding(earthElement1, ship2) || isColliding(fireElement1, ship2) || isColliding(waterElement1, ship2) || isColliding(airElement1, ship2) || isColliding(earthElement2, ship2) || isColliding(fireElement2, ship2) || isColliding(waterElement2, ship2) || isColliding(airElement2, ship2)) {
            resetShip(ship2);
            score += 20;
            scoreText.text = "Score: " + score;
        }
        if (ship3.x <= -10) {
            app.stage.removeChild(healthArray[j]);
            j++;
            resetShip(ship3);
        }
        if (isColliding(earthElement1, ship3) || isColliding(fireElement1, ship3) || isColliding(waterElement1, ship3) || isColliding(airElement1, ship3) || isColliding(earthElement2, ship3) || isColliding(fireElement2, ship3) || isColliding(waterElement2, ship3) || isColliding(airElement2, ship3)) {
            resetShip(ship3);
            score += 20;
            scoreText.text = "Score: " + score;
        }
        if (elementColliding(earthElement1, ship1) || elementColliding(earthElement1, ship2) || elementColliding(earthElement1, ship3)) {
            app.stage.removeChild(earthElement1);
        }
        if (b === ship1.x || b === ship2.x || b === ship3.x) {
            app.stage.removeChild(fireElement1);
        }
        if (waterElement1.x + waterElement1.width === ship1.x || waterElement1.x + waterElement1.width === ship2.x || waterElement1.x + waterElement1.width === ship3.x) {
            app.stage.removeChild(waterElement1);
        }
        if (airElement1.x + airElement1.width === ship1.x || airElement1.x + airElement1.width === ship2.x || airElement1.x + airElement1.width === ship3.x) {
            app.stage.removeChild(airElement1);
        }
        if (earthElement2.x + earthElement2.width === ship1.x || earthElement2.x + earthElement2.width === ship2.x || earthElement2.x + earthElement2.width === ship3.x) {
            app.stage.removeChild(earthElement2);
        }
        if (fireElement2.x + fireElement2.width === ship1.x || fireElement2.x + fireElement2.width === ship2.x || fireElement2.x + fireElement2.width === ship3.x) {
            app.stage.removeChild(fireElement2);
        }
        if (waterElement2.x + waterElement2.width === ship1.x || waterElement2.x + waterElement2.width === ship2.x || waterElement2.x + waterElement2.width === ship3.x) {
            app.stage.removeChild(waterElement2);
        }
        if (airElement2.x + airElement2.width === ship1.x && airElement2.y || airElement2.x + airElement2.width === ship2.x || airElement2.x + airElement2.width === ship3.x) {
            app.stage.removeChild(airElement2);
        }
    } else if (j >= 3) {
        app.stage.removeChild(earthElement1);
        app.stage.removeChild(fireElement1);
        app.stage.removeChild(waterElement1);
        app.stage.removeChild(airElement1);
        app.stage.removeChild(earthElement2);
        app.stage.removeChild(fireElement2);
        app.stage.removeChild(waterElement2);
        app.stage.removeChild(airElement2);
        app.stage.addChild(gameOver);
        finalScore.text = scoreText.text;
        finalScore.scale.x = 1.3;
        finalScore.scale.y = 1.3;
        finalScore.x = 320;
        finalScore.y = 100;
        finalScore.style.fill = 0xffffff;
        app.stage.addChild(finalScore);
        window.onkeydown = (e: KeyboardEvent): void => {
            let SPACE = 32;
            if (e.keyCode === SPACE) {
                click = 1;
                j = 0;
            }
        };
    }
};



app.ticker.add(delta => gameLoop(delta));

