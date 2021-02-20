class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(350,300);
    car1.addImage("car1",car1_img);
    cactus1 = createSprite(700,-1100);
    cactus1.addImage(cactus1_img);
    cactus1.scale = 0.2;

    car2 = createSprite(600,300);
    car2.addImage("car2",car2_img);
    cactus2 = createSprite(1050,-2000);
    cactus2.addImage(cactus2_img);
    cactus2.scale = 0.2;

    car3 = createSprite(750,300);
    car3.addImage("car3",car3_img);
    cactus3 = createSprite(1200,-3000);
    cactus3.addImage(cactus3_img);
    cactus3.scale = 0.4;

    car4 = createSprite(1000,300);
    car4.addImage("car4",car4_img);
    

    cars = [car1, car2, car3, car4];
    cactus = [cactus1,cactus2,cactus3];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      //image(bush_img,0, -displayHeight*0.01,displayWidth-50, displayHeight*0.01);
     // image(bush_img, 200, 200)
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 350 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 250;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 5300){
      gameState = 2;
      player.rank = player.rank+1;
      Player.updateCarsAtEnd(player.rank);
      textSize(30);
      text("Congratulations " + player.rank, displayWidth/2-100, cars[index-1].y-130);
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
