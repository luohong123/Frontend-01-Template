/*
 * @Author: qingcheng
 * @Date: 2020-05-19 16:41:58
 * @LastEditors: qingcheng
 * @LastEditTime: 2020-05-19 16:51:43
 * @Description: 
 * @email: 3300536651@qq.com
 */

const EOF = Symbol('EOF');

function data(c) {

}
module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for (let c of html) {
        state = data(c);
    }
    state = data(EOF);
}