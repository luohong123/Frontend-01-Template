/*
 * @Author: lh
 * @Date: 2020-05-27 23:24:20
 * @LastEditors: lh
 * @LastEditTime: 2020-06-02 12:15:45
 * @Description: 
 * @email: 3300536651@qq.com
 */
const images = require('images');
// https://www.npmjs.com/package/images
function render(viewport, element) {
  if (element.style) {
    var img = images(element.style.width, element.style.height);
    let bg = element.style['background-color'] || element.style['backgroundColor'];
    let color = bg || "rgb(255, 0, 0)";
    if (bg) {
      // let color = bg || "rgb(0,0,0)";
      // 颜色格式匹配
      color.match(/rgb\((\d+),(\d+),(\d+)\)/);
      // 渲染
      img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3), 1);
      // 绘制
      viewport.draw(img, element.style.left || 0, element.style.top || 0);
    }
  }
  if (element.children) {
    for (var child of element.children) {
      render(viewport, child);
    }
  }
}
module.exports = render;