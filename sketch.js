var knight, knight_running, knight_jump, knightdead, knightImage, knightImShow, knightIdle
var ground, roofBorder
var monster, monster_move, monsterGroup
var monster2, monster2Group, monster2Image
var monster3, monster3Group, monster3Image
var background1

var wave = 1
var score = 0
var time = 0
var lives = 3

var gamestate = "PLAY"

var throwSword, swordImage, swordGroup

var backgroundmusic, backgroundmusic2, backgroundmusic3
var swordswoosh, ghostHurt, mon3hurt, knightHurtSound

var backgrounD;

function preload() {
  knight_running = loadAnimation("images/Run (1).png", "images/Run (2).png", "images/Run (3).png", "images/Run (4).png", "images/Run (5).png", "images/Run (6).png", "images/Run (7).png", "images/Run (8).png", "images/Run (9).png", "images/Run (10).png")

  knight_jump = loadAnimation("images/Jump (1).png", "images/Jump (2).png", "images/Jump (3).png", "images/Jump (4).png", "images/Jump (5).png", "images/Jump (6).png", "images/Jump (7).png", "images/Jump (8).png", "images/Jump (9).png", "images/Jump (10).png")

  knightdead = loadAnimation("images/Dead (1).png", "images/Dead (2).png", "images/Dead (3).png", "images/Dead (4).png", "images/Dead (4).png", "images/Dead (5).png", "images/Dead (6).png", "images/Dead (7).png", "images/Dead (8).png", "images/Dead (9).png", "images/Dead (10).png")
  knightdeadImage = loadAnimation("images/Dead (10).png");

  knightIdle = loadAnimation("images/Idle (1).png", "images/Idle (2).png", "images/Idle (3).png", "images/Idle (4).png", "images/Idle (5).png", "images/Idle (6).png", "images/Idle (7).png", "images/Idle (8).png", "images/Idle (9).png", "images/Idle (10).png")

  background1 = loadImage("NEW Background.png")


  monster_move = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png")

  swordImage = loadImage("Sword2.png")

  backgroundmusic = loadSound("85_fc196a9a11.mp3")
  backgroundmusic2 = loadSound("BgMusic2.mp3")
  backgroundmusic3 = loadSound("BgMusic3.mp3")

  swordswoosh = loadSound("sounds/SwordSwoosh.wav")
  ghostHurt = loadSound("sounds/Hurt.wav")
  mon3hurt = loadSound("sounds/hurt2.wav")


  knightImage = loadImage("images/Run (10).png")


  monster2Image = loadAnimation("Mon2Images/Angry.png", "Mon2Images/Sad.png", "Mon2Images/Calm.png", "Mon2Images/Amazed.png", "Mon2Images/Furious.png", "Mon2Images/Scared.png", "Mon2Images/Irritated.png", "Mon2Images/Mocking.png", "Mon2Images/Stunning.png", "Mon2Images/Upset.png", "Mon2Images/Thoughtful.png", "Mon2Images/Talking.png")
  monster3Image = loadAnimation("Mon3Images/Amazed.png", "Mon3Images/Furious.png", "Mon3Images/Talking.png", "Mon3Images/Upset.png", "Mon3Images/Angry.png", "Mon3Images/Scared.png", "Mon3Images/Sad.png", "Mon3Images/Mocking.png", "Mon3Images/Irritated.png", "Mon3Images/Calm.png", "Mon3Images/Thoughtful.png")

  knightHurtSound = loadSound("sounds/KnightHurt.wav")

}



function setup() {
  createCanvas(windowWidth, windowHeight)

  backgrounD = createSprite(0, height / 2+200 , width, height)
  backgrounD.visible = false
  backgrounD.addImage("backgroundMAIN", background1)

  backgrounD.scale = 1.5

  knight = createSprite(100, 300, 10, 10)
  knight.addAnimation("running", knight_running)
  knight.addAnimation("KnightJump", knight_jump)
  knight.addAnimation("knightDEAD", knightdead)
  knight.addAnimation("idle", knightIdle)
  knight.addAnimation("knightDEADImage", knightdeadImage)
  //knight.debug = true

  roofBorder = createSprite(800, 104, 1600, 68)
  ground = createSprite(800, 1200 , width, 1)

  ground.visible = false

  roofBorder.visible = false

  monsterGroup = new Group()
  monsterGroup.debug = true

  monster2Group = new Group()
  monster2Group.debug = true

  monster3Group = new Group()
  monster3Group.debug = true

  swordGroup = new Group()

  killGroup = new Group()

  knight.scale = 0.2

  //backgroundmusic2.loop()


  knightImShow = createSprite(1150, 500, 1, 1)

}

function draw() {
  console.log(gamestate)

  //*******************************************************START**********************************************************************

  if (gamestate === "START") {

    knight.visible = false
    monsterGroup.visibleEach = false
    background1.visible = false

    knightImShow.addImage("show", knightImage)
    knightImShow.scale = 0.5

    textSize(20);
    background("black")
    textFont("Bold")

    text("This is an INFINITE GAME. Your enemy's are the deadly monsters!", 200, 200)

    text("To kill your enemy,  press 'E' on your keyboard,  it will throw swords! ", 200, 300)

    text("With-in each wave, new monsters will appear,", 200, 450)
    text("and become faster!", 200, 500)

    text(" Good luck, hero!", 190, 640)

    text("Press the 'SPACE' button to start, enjoy!", 200, 700)


    if (keyDown("space")) {
      gamestate = "PLAY"

    }

    fill("crimson")
    textSize(40)
    text("FANTASY ADVENTURE", 450, 70)

  }

  //*****************************************************************************PLAY*************************************************************** */

  if (gamestate === "PLAY") {

    background("white")
    backgrounD.visible = true


    camera.position.y = knight.y-180
    camera.position.x = knight.x

    backgrounD.velocityX = -6
    ground.velocityX = -6


    if (backgrounD.x < 0) {
      backgrounD.x = width / 2
    }

    if (ground.x < 0) {
      ground.x = width / 2
    }


    if (time > 15 && score > 10) {
      monster.velocityX = -8
      wave = wave + 1
      monsters2()
    }


    if (time > 30 && score > 20) {
      monster.velocityX = -10
      monster2.velocityX = - 10
      wave = wave + 1
      monsters3()
    }


    knight.visible = true
    monsterGroup.visibleEach = true

    background1.visible = true

    knightImShow.visible = false

    /*if (knight.isTouching(monsterGroup)) {
     

      monsterGroup.destroyEach()
      lives = lives-1
      knightHurtSound.play()

    }
    
    if (knight.isTouching(monster2Group)) {
      lives = lives - 1

      monster2Group.destroyEach()
      knightHurtSound.play()
    }

    else if (knight.isTouching(monster3Group)) {
      lives = lives - 1

      monster3Group.destroyEach()
      knightHurtSound.play()
    }


    if (swordGroup.isTouching(monsterGroup)) {
      monsterGroup.destroyEach()
      score = score + 1
      ghostHurt.play()

    }

    else if (swordGroup.isTouching(monster2Group)) {
      monster2Group.destroyEach()
      score = score + 1
      mon3hurt.play()

    }
    else if (swordGroup.isTouching(monster3Group)) {
      monster3Group.destroyEach()
      score = score + 1

    }    
    
    
    */

    for (var i = 0; i < monsterGroup.length; i++) {
      if (monsterGroup.get(i).isTouching(knight)) {
        monsterGroup.get(i).destroy();
        lives = lives - 1
        knightHurtSound.play()
      }
    }

    for (var i = 0; i < monster2Group.length; i++) {
      if (monster2Group.get(i).isTouching(knight)) {
        monster2Group.get(i).destroy();
        lives = lives - 1
        knightHurtSound.play()
      }
    }

    for (var i = 0; i < monster3Group.length; i++) {
      if (monster3Group.get(i).isTouching(knight)) {
        monster3Group.get(i).destroy();
        lives = lives - 1
        knightHurtSound.play()
      }
    }

    for (var i = 0; i < monsterGroup.length; i++) {
      if (monsterGroup.get(i).isTouching(swordGroup)) {
        monsterGroup.get(i).destroy();
        score = score + 1
        ghostHurt.play()
      }
    }

    for (var i = 0; i < monster2Group.length; i++) {
      if (monster2Group.get(i).isTouching(swordGroup)) {
        monster2Group.get(i).destroy();
        score = score + 1
        ghostHurt.play()
      }
    }

    for (var i = 0; i < monster3Group.length; i++) {
      if (monster3Group.get(i).isTouching(swordGroup)) {
        monster3Group.get(i).destroy();
        score = score + 1
        ghostHurt.play()
      }
    }

    if (lives < 1) {
      knight.changeAnimation("knightDEAD", knightdead)
      gamestate = "END"
    }

    if (keyWentDown("space")) {
      knight.velocityY = -38
      knight.changeAnimation("KnightJump", knight_jump)

    }
    else {
      knight.changeAnimation("idle", knightIdle)
    }

    knight.changeAnimation("running", knight_running)

    knight.velocityY = knight.velocityY + 5


    ThrowSwords()
    knight.collide(ground)
    knight.collide(roofBorder)



    monsters();

    textSize(55)
    fill("Black")
    text("WAVE " + wave + ":", camera.x + 100, camera.y - 200)


    textSize(50)
    fill("red")
    text("Kills: " + score, 800, 200)

    textSize(40)
    fill("black")
    text("Time: " + time, 50, 200)

    textSize(40)
    fill("black")
    text("Lives: " + lives, 1250, 200)

    if (frameCount % 30 === 0) {
      time = time + 1
    }





  }

  //********************************************************************END************************************************************************** */

  if (gamestate === "END") {

    knight.velocityY= knight.velocityY+1;

    knight.collide(ground)
    knight.collide(roofBorder)


    //knight.velocityY=0;
   

    backgrounD.velocityX = 0
    ground.velocityX =0



    //knight.changeAnimation("knightDEAD", knightdead)
    knight.changeAnimation("knightDEADImage", knightdeadImage)

    background("black")



    textSize(40)
    fill("RED")
    textFont("bold")
    text("YOUR STATS:", 640, 450)

    textSize(20)
    text("YOUR LIVES RAN OUT!", 680, 350)
    fill("white")
    text("YOUR KILLS:" + score, 650, 490)
    text("YOUR TIME:" + time, 650, 520)

    textSize(100)
    fill("red")
    text("GAME OVER!", 460, 310)
    textSize(50)
    fill("white")
    text("To RETRY press 'R' , Good Luck!", 450, 760)


    if (keyDown("R")) {
      reset();
    }


  }

  drawSprites()

}



function monsters() {
  if (frameCount % 20 === 0) {
    monster = createSprite(1600, Math.round(random(camera.y-100, camera.y+100)), 10, 10);
    monster.velocityX = -7
    monster.scale = 5
    monster.collide(ground)
    monster.lifetime = 250
    monster.addAnimation("move", monster_move);
    monster.scale = 2.4

    monsterGroup.add(monster)

  }



}
function reset() {
  background("black");
  score = 0
  time = 0
  wave = 1
  lives = 3
  monsterGroup.destroyEach()
  monster2Group.destroyEach()
  monster3Group.destroyEach()

  knight.changeAnimation("running", knight_running)
 

  //knight.x = 100
  //knight.y = 300


  gamestate = "PLAY"


}


function ThrowSwords() {
  if (keyWentDown("e")) {
    throwSword = createSprite(knight.x + 100, knight.y, 10, 10)
    throwSword.addImage("sword", swordImage)
    throwSword.velocityX = 30
    throwSword.scale = 0.035
    swordswoosh.play()

    swordGroup.add(throwSword)



  }

}


function monsters2() {
  if (frameCount % 55 === 0) {
    monster2 = createSprite(1600, Math.round(random(camera.y-100, camera.y+100)), 10, 10);
    monster2.velocityX = -8
    monster2.scale = 5
    monster2.collide(ground)
    monster2.lifetime = 250
    monster2.addAnimation("MONSTER", monster2Image);
    monster2.scale = 1.3

    monster2Group.add(monster2)

  }



}


function monsters3() {
  if (frameCount % 70 === 0) {
    monster3 = createSprite(1600, Math.round(random(camera.y-100, camera.y+100)), 10, 10);
    monster3.velocityX = -9
    monster3.scale = 5
    monster3.collide(ground)
    monster3.lifetime = 250
    monster3.addAnimation("MONSTER3", monster3Image);
    monster3.scale = 1.3

    monster3Group.add(monster3)

  }



}