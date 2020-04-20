let board = new Array();
// console.log(board)

$(document).ready(function() {
  newgame();
  $("#left").click(function(){
    if(moveLeft()) {
      setTimeout(function() {
        boardUpdateView()
        newRandorNumber()
      }, 200)
      // isGameOver()
    }
  })
  $("#right").click(function(){
    if(moveRight()) {
      setTimeout(function() {
        boardUpdateView()
        newRandorNumber()
      }, 200)
      // isGameOver()
    }
  })
  $("#down").click(function(){
    if(moveDown()) {
      setTimeout(function() {
        boardUpdateView()
        newRandorNumber()
      }, 200)
      // isGameOver()
    }
  })
  $("#up").click(function(){
    if(moveUp()) {
      setTimeout(function() {
        boardUpdateView()
        newRandorNumber()
      }, 200)
      // isGameOver()
    }
  })
})

function newgame() {
  // 初始化棋盘格
  init()
  // 生成一个随机数
  newRandorNumber()
  newRandorNumber()
}
// 初始化numbercell数值为0, 将cell位置初始化，并将numbercell位置初始化
function init() {
  for(let i=0;i<4;i++) {
    board[i] = new Array()
    for(let j=0;j<4;j++) {
      board[i][j] = 0
      $(`#cell-${i}-${j}`).css({
        top:  getPositionTop(i),
        left:  getPositionLeft(j),
      })
    }
  }
  boardUpdateView() // numbercell位置初始化
}
// 根据board[i][j]的位置数字渲染表格numbercell
function boardUpdateView() {
  $(".numbercell").remove()
  for(let i = 0; i < 4; i ++ ) {
    for(let j = 0; j < 4; j ++ ) {
      $(".container").append(`<div class="numbercell" id="numbercell-${i}-${j}"></div>`)
      let theNumberCell = $("#numbercell-" + i + "-" + j)
      if(board[i][j] === 0) {
        theNumberCell.css({
          width: '0px',
          height: '0px',
          top:  parseInt(getPositionTop(i)) + 50 + "px",
          left:  parseInt(getPositionLeft(j)) + 50 + "px",
        })
      } else {
        theNumberCell.css({
          width: '100px',
          height: '100px',
          top:  getPositionTop(i),
          left:  getPositionLeft(j),
          background: getNumberBackgroundColor(board[i][j]),
        })
        theNumberCell.text(board[i][j])
      }
    }
  }
}
// 从没有数字的cell里随机选一个位置并插入随机数字
function newRandorNumber() {
  let arr = [] // 数字为0的位置数组：[[0,0],[0,1]...]
  for(let i=0;i<4;i++) {
    for(let j=0;j<4;j++) {
      if(board[i][j] === 0) {
        arr.push([i,j])
      }
    }
  }
  if(arr.length === 0) { return }
  let randomLocation = arr[Math.floor(Math.random()*arr.length)] // 随机位置[i,j]
  let randomNum = Math.random()*10 > 5 ? 2 : 4 // 随机生成一个数字2/4
  let numberCellElement = $("#numbercell-" + randomLocation[0] + "-" + randomLocation[1])
  // 在随机位置显示随机数字
  board[randomLocation[0]][randomLocation[1]] = randomNum // 插入随机数字
  numberCellElement.text(randomNum)
  numberCellElement.css({ background: getNumberBackgroundColor(randomNum) })
  numberCellElement.animate({ // 显示随机生成的数字位置的numbercell
    width: '100px',
    height: '100px',
    top:  getPositionTop(randomLocation[0]),
    left: getPositionLeft(randomLocation[1]),
  })
}
// 判断是否可以向左移动，1 有数字的位置左侧为空或与左侧数值相等
function canMoveLeft() {
  for(let i=0;i<4;i++){
    for(let j=1;j<4;j++) {
      if(board[i][j] !== 0) {
        if(board[i][j-1] === 0 || board[i][j] === board[i][j-1]) {
          return true;
        }
      }
    }
  }
  return false
}
// 判断是否可以向右移动，1 有数字的位置右侧为空或与右侧数值相等
function canMoveRight() {
  for(let i=0;i<4;i++){
    for(let j=0;j<3;j++) {
      if(board[i][j] !== 0) {
        if(board[i][j+1] === 0 || board[i][j] === board[i][j+1]) {
          return true;
        }
      }
    }
  }
  return false
}
function canMoveDown() {
  for(let i=0;i<3;i++){
    for(let j=0;j<4;j++) {
      if(board[i][j] !== 0) {
        if(board[i+1][j] === 0 || board[i][j] === board[i+1][j]) {
          return true;
        }
      }
    }
  }
  return false
}
function canMoveUp() {
  for(let i=1;i<4;i++){
    for(let j=0;j<4;j++) {
      if(board[i][j] !== 0) {
        if(board[i-1][j] === 0 || board[i][j] === board[i-1][j]) {
          return true;
        }
      }
    }
  }
  return false
}
// 水平方向有没有障碍物,落脚点[i,k]和起始点[i,j]之间有无非零数字，之间：不包括起始点和落脚点
function noBlockRow(i, j, k) {
  for(let r=k+1;r<j;r++) {
    if(board[i][r] !== 0) {
      return false
    }
  }
  return true
}
// 左移动画，从[i,j] ---> [newi,newk]
function moveAnimate(i, j, newi, newj) {
  $(`#numbercell-${i}-${j}`).animate({
    top: getPositionTop(newi),
    left: getPositionLeft(newj)
  })
}
function moveLeft() {
  // 判断是否可以向左移动
  console.log(canMoveLeft())
  if(!canMoveLeft()) {
    return false
  }
  for(let i=0;i<4;i++) {
    for(let j=1;j<4;j++) {
      if(board[i][j] !== 0) { // 判断不为0的数字可不可以向左移动,左侧每一个位置都要判断
        for(let k=0;k<j;k++) {
          console.log(k,board[i][k])
          if(board[i][k] === 0 && noBlockRow(i,j,k)) { // 落脚点为0
            // move
            console.log(i,j,k)
            moveAnimate(i, j, i, k)
            board[i][k] = board[i][j]
            board[i][j] = 0
            break
          } else if(board[i][k] === board[i][j] && noBlockRow(i,j,k)) { // 落脚点与起始位置相等
            // move
            console.log(i,j,k)
            moveAnimate(i, j, i, k)
            board[i][k] = board[i][k] + board[i][j]
            board[i][j] = 0
            break
          }
        }
      }
    }
  }
  return true
}
function moveRight() {
  console.log(canMoveRight())
  if(!canMoveRight()) {
    return false
  }
  for(let i=0;i<4;i++) {
    for(let j=2;j>=0;j--) {
      if(board[i][j] !== 0) { // 判断不为0的数字可不可以向右移动,右侧每一个位置都要判断
        for(let k=3;k>j;k--) {
          if(board[i][k] === 0 && noBlockRow(i,k,j)) {
            // move
            moveAnimate(i, j, i, k)
            board[i][k] = board[i][j]
            board[i][j] = 0
            break
          } else if(board[i][k] === board[i][j] && noBlockRow(i,k,j)) {
            // move
            moveAnimate(i, j, i, k)
            board[i][k] = board[i][k] + board[i][j]
            board[i][j] = 0
            break
          }
        }
      }
    }
  }
  return true
}
// 竖直方向有没有障碍物,落脚点[k,j]和起始点[i,j]之间有无非零数字，之间：不包括起始点和落脚点
function noBlockCol(i, j, k) {
  for(let r=i+1;r<k;r++) {
    if(board[r][j] !== 0) {
      return false
    }
  }
  return true
}
function moveDown() {
  console.log(canMoveDown())
  if(!canMoveDown()) {
    return false
  }
  for(let i=2;i>=0;i--) {
    for(let j=0;j<4;j++) {
      if(board[i][j] !== 0) { // 判断不为0的数字可不可以向右移动,右侧每一个位置都要判断
        for(let k=3;k>i;k--) {
          if(board[k][j] === 0 && noBlockCol(i,j,k)) { // [k][j]为终点,k为终点行
            // move
            moveAnimate(i, j, k, j)
            board[k][j] = board[i][j]
            board[i][j] = 0
            break
          } else if(board[k][j] === board[i][j] && noBlockCol(i,j,k)) {
            // move
            moveAnimate(i, j, k, j)
            board[k][j] = board[k][j] + board[i][j]
            board[i][j] = 0
            break
          }
        }
      }
    }
  }
  return true
}

function moveUp() {
  console.log(canMoveUp())
  if(!canMoveUp()) {
    return false
  }
  for(let i=1;i<4;i++) {
    for(let j=0;j<4;j++) {
      if(board[i][j] !== 0) { // 判断不为0的数字可不可以向右移动,右侧每一个位置都要判断
        for(let k=0;k<i;k++) {
          if(board[k][j] === 0 && noBlockCol(i,j,k)) { // [k][j]为终点,k为终点行
            // move
            moveAnimate(i, j, k, j)
            board[k][j] = board[i][j]
            board[i][j] = 0
            break
          } else if(board[k][j] === board[i][j] && noBlockCol(i,j,k)) {
            // move
            moveAnimate(i, j, k, j)
            board[k][j] = board[k][j] + board[i][j]
            board[i][j] = 0
            break
          }
        }
      }
    }
  }
  return true
}
