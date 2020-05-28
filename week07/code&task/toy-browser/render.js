/*
 * @Author: lh
 * @Date: 2020-05-27 23:24:20
 * @LastEditors: lh
 * @LastEditTime: 2020-05-28 14:16:12
 * @Description: 
 * @email: 3300536651@qq.com
 */
const images = require('images');
// https://www.npmjs.com/package/images
function render(viewport, element) {
    if (element.style) {
        var img = images(element.style.width, elment.style.height);
        if (element.style['background-color']) {
            let color = element.style['background-color'] || "rgb(0,0,0)";
            color.match(/rgb\((\d+),(\d+),(\d+)\)/);
            img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3), 1);
            viewport.draw(img, element.style.left || 0, element.style.top || 0);
        }
    }
    if (element.children) {
        for (let child of elment.children) {
            render(viewport, child);
        }
    }
}
module.exports = render;