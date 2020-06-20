/**
 * @preserve Credits
 * 
 * "p5.js でゲーム制作" ( https://fal-works.github.io/make-games-with-p5js/ )
 * Copyright (c) 2020 FAL
 * Used under the MIT License
 * ( https://fal-works.github.io/make-games-with-p5js/docs/license/ )
 */

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
    resetGame();
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
    onMousePress();
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

  function playerIsAlive(entity) {
    // プレイヤーの位置が生存圏内なら true を返す。
    // 600 は画面の下端
    return entity.y < 800;
  }

  function blockIsAlive(entity) {
    // ブロックの位置が生存圏内なら true を返す。
    // -100 は適当な値（ブロックが見えなくなる位置であればよい）
    return -100 < entity.x;
  }

  /**
  * 2つのエンティティが衝突しているかどうかをチェックする
  *
  * @param entityA 衝突しているかどうかを確認したいエンティティ
  * @param entityB 同上
  * @param collisionXDistance 衝突しないギリギリのx距離
  * @param collisionYDistance 衝突しないギリギリのy距離
  * @returns 衝突していたら `true` そうでなければ `false` を返す
  */
  function entitiesAreColliding(
    entityA,
    entityB,
    collisionXDistance,
    collisionYDistance
  ) {
    // xとy、いずれかの距離が十分開いていたら、衝突していないので false を返す

    let currentXDistance = abs(entityA.x - entityB.x); // 現在のx距離
    if (collisionXDistance <= currentXDistance) 
      return false;

    let currentYDistance = abs(entityA.y - entityB.y); // 現在のy距離
    if (collisionYDistance <= currentYDistance) 
      return false;

    return true; // ここまで来たら、x方向でもy方向でも重なっているので true
  } 

  /** プレイヤーエンティティ */
  let player;

  /** ブロックエンティティの配列 */
  let blocks;

  /** ゲームの状態。"play" か "gameover" を入れるものとする */
  let gameState;

  /** ブロックを上下ペアで作成し、`blocks` に追加する */
  function addBlockPair() {
    let y = random(-100, 100);
    blocks.push(createBlock(y)); // 上のブロック
    blocks.push(createBlock(y + 600)); // 下のブロック
  }

  /** ゲームオーバー画面を表示する */
  function drawGameoverScreen() {
    background(0, 192); // 透明度 192 の黒
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER); // 横に中央揃え ＆ 縦にも中央揃え
    text("GAME OVER", width / 2, height / 2); // 画面中央にテキスト表示
  }

  /** ゲームの初期化・リセット */
  function resetGame() {
    // 状態をリセット
    gameState = "play";

     // プレイヤーを作成
    player = createPlayer();

    // ブロックを作成
    blocks = [];
  }

  /** ゲームの更新 */
  function updateGame() {
  // ゲームオーバーなら更新しない
    if (gameState === "gameover") 
      return;

  // ブロックの追加と削除
    if (frameCount % 120 === 1) 
      addBlockPair(blocks); // 一定間隔で追加

    blocks = blocks.filter(blockIsAlive); // 生きているブロックだけ残す

  // 全エンティティの位置を更新
    updatePosition(player);
    for(let block of blocks)
      updatePosition(block);

  // プレイヤーに重力を適用
    applyGravity(player);

  // プレイヤーが死んでいたらゲームオーバー
    if (!playerIsAlive(player)) 
      gameState = "gameover";

      // 衝突判定
    for (let block of blocks) {
      if (entitiesAreColliding(player, block, 20 + 40, 20 + 200)) {
        gameState = "gameover";
        break;
      }
    }
  }

  /** ゲームの描画 */
  function drawGame() {
  // 全エンティティを描画
    background(0);
    drawPlayer(player);
    for(let block of blocks)
      drawBlock(block);

   // ゲームオーバーならそれ用の画面を表示
    if (gameState === "gameover") 
      drawGameoverScreen();
  }

  /** マウスボタンが押されたときのゲームへの影響 */
  function onMousePress() {
    // プレイヤーをジャンプさせる
    applyJump(player);

      switch (gameState) {
        case "play":
        // プレイ中の状態ならプレイヤーをジャンプさせる
          applyJump(player);
          break;
        case "gameover":
       // ゲームオーバー状態ならリセット
          resetGame();
          break;
      }
  }

  // ゲームdraw関数
  function collect_game(){
    updateGame();
    drawGame();   
  }
