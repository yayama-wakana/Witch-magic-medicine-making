let titel, home, mix, collect, pbook, herb_pbook, med_pbook;
var flag = 1;


//画像を読み込む
function preload(){
  //タイトル画面
  titel = loadImage('data/titel.jpg');
  //ホーム画面
  home = loadImage('data/home.jpg');
  //魔法薬調合画面
  mix = loadImage('data/mix.jpg');;
  //薬草採取画面
  collect = loadImage('data/collect.jpg');
  //図鑑画面
  pbook = loadImage('data/pbook.jpg');
  //薬草図鑑画面
  //herb_pbook = ;
  //魔法薬図鑑画面
  //med_pbook = ; 
}

function setup(){
  createCanvas(windowWidth,windowHeight);
}

function draw(){

    //タイトル画面
    if(flag == 0){
      image(titel, 0, 0); 
    }
  
    //ホーム画面
    else if(flag == 1){
      image(home, 0, 0);
    }
    
    //薬草採取画面
    else if(flag == 2){
      image(collect, 0,0);
    }

    //魔法薬調合画面
    else if(flag == 3){
      image(mix, 0, 0);
    }

    //図鑑画面
    else if(flag == 4){
      image(pbook, 0, 0);
    }
  
  }

function mousePressed(){
  //タイトル画面にいる場合
  if(flag == 0){
    if(mouseX > 80 && mouseX < 325 && mouseY > 490 && mouseY < 535 &&mouseButton == LEFT){
      flag = 1;
    }
  }

  //ホーム画面にいる場合
  else if(flag == 1){

    //薬草採取に行く
    if(mouseX > 10 && mouseX < 130 && mouseY > 525 && mouseY < 650 && mouseButton == LEFT){
      flag = 2;
    }

    //魔法薬調合に行く
    else if(mouseX > 110 && mouseX < 250 && mouseY > 445 && mouseY < 580 && mouseButton == LEFT){
      flag = 3;
    }

    //図鑑を見る
    else if(mouseX > 230 && mouseX < 355 && mouseY > 525 && mouseY < 660 && mouseButton == LEFT){
      flag = 4;
    }

  //薬草採取画面にいる場合


  //魔法薬調合画面にいる場合


  //図鑑画面にいる場合
  }
}