let titel, home, mix, collect, pbook, herb_pbook, med_pbook;
var flag = 2;


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

  if(flag == 2){
    rectMode(CENTER);

  // プレイヤーを作成
  player = createPlayer();

  // ブロックを作成
  blocks = [];
  }
}

function draw(){

    //タイトル画面
    if(flag == 0){
      //背景画像
      image(titel, 0, 0); 
    }
/* 
    //ホーム画面
    else if(flag == 1){
      //背景画像
      image(home, 0, 0);
    }
*/  
    //薬草採取画面
    else if(flag == 2){
      //背景画像
      //image(collect, 0,0);
      collect_game();
    }
/*
    //魔法薬調合画面
    else if(flag == 3){
      //背景画像
      image(mix, 0, 0);
    }

    //図鑑画面
    else if(flag == 4){
      //背景画像
      image(pbook, 0, 0);
    }
*/
}

function mousePressed(){
  //タイトル画面にいる場合
  if(flag == 0){
    if(mouseX > 80 && mouseX < 325 && mouseY > 490 && mouseY < 535 && mouseButton == LEFT){
      flag = 2;
    }
  }
/*
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
  }
*/
  if(flag == 2){
    // プレイヤーをジャンプさせる
    applyJump(player);
  }
}

// 薬草採取のミニゲーム

  // 全エンティティ共通

  function updatePosition(entity) {
    entity.x += entity.vx;
    entity.y += entity.vy;
  }

  // プレイヤーエンティティ用

  function createPlayer() {
    return {
      x: 200,
      y: 300,
      vx: 0,
      vy: 0
    };
  }

  function applyGravity(entity) {
    entity.vy += 0.15;
  }

  function applyJump(entity) {
    entity.vy = -5;
  }

  function drawPlayer(entity) {
    square(entity.x, entity.y, 40);
  }

  // ブロックエンティティ用

  function createBlock(y) {
    return {
      x: 900,
      y,
      vx: -2,
      vy: 0
    };
  }

  function drawBlock(entity) {
    rect(entity.x, entity.y, 80, 400);
  }

  function blockIsAlive(entity) {
    // ブロックの位置が生存圏内なら true を返す。
    // -100 は適当な値（ブロックが見えなくなる位置であればよい）
    return -100 < entity.x;
  }

  /** プレイヤーエンティティ */
  let player;

  /** ブロックエンティティの配列 */
  let blocks;

  /** ブロックを上下ペアで作成し、`blocks` に追加する */
  function addBlockPair() {
    let y = random(-100, 100);
    blocks.push(createBlock(y)); // 上のブロック
    blocks.push(createBlock(y + 600)); // 下のブロック
  }

  // ゲームdraw関数
  function collect_game(){
  
  // ブロックの追加と削除
  if (frameCount % 120 === 1) addBlockPair(blocks); // 一定間隔で追加
  blocks = blocks.filter(blockIsAlive); // 生きているブロックだけ残す

  // 全エンティティの位置を更新
    updatePosition(player);
    for(let block of blocks)
      updatePosition(block);

  // プレイヤーに重力を適用
    applyGravity(player);

  // 全エンティティを描画
    background(0);
    drawPlayer(player);
    for(let block of blocks)
      drawBlock(block);
  }