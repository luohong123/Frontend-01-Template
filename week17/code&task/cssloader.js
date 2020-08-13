/*
 * @Author: lh
 * @Date: 2020-08-05 13:39:08
 * @LastEditors: lh
 * @LastEditTime: 2020-08-05 14:01:23
 * @Description: 
 * @email: 3300536651@qq.com
 */
let css = require('css');

module.exports = function(source, map){
    let styleSheet = css.parse(source);
    let name = this.resourcePath.match(/([^/]+).css$/)[1];
    for(let rule of styleSheet.styleSheet.rules){
        console.log(rule);
        rule.selectors = rule.selectors.map(selector=> 
            selector.match(new RegExp(`^.${nmae}`))?selector:
            `.${name} ${selector}`);
    }

    console.log(styleSheet);
    console.log(css.stringify(styleSheet));
    return `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(css.stringify(styleSheet))};
    document.documentElement.appendChild(style);
    `;
}