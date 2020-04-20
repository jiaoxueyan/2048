// 获取定位的top值和left值
function getPositionTop(i) {
  return `${20 + i * 120}px`
}
function getPositionLeft(j) {
  return `${20 + j * 120}px`
}
// 根据数字值获取背景色
function getNumberBackgroundColor(number) {
  switch(number) {
    case 2: return '#eee4da';break;
    case 4: return '#ede0c8';break;
    case 8: return '#f2b179';break;
    case 16: return '#f59563';break;
    case 32: return '#f67c5f';break;
    case 64: return '#f65e3b';break;
    case 128: return '#edcf72';break;
    case 256: return '#edcc61';break;
    case 512: return '#9c0';break;
    case 1024: return '#33b5e5';break;
    case 2048: return '#09c';break;
    case 4096: return '#a6c';break;
    case 8192: return '#93c';break;
  }
}