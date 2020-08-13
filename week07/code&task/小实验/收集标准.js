/*
 * @Author: lh
 * @Date: 2020-05-27 21:00:52
 * @LastEditors: lh
 * @LastEditTime: 2020-05-27 21:22:21
 * @Description: 
 * @email: 3300536651@qq.com
 */ 
// 打开此网址，输入以下代码，获得的css标准放到css.standards.json文件中
//  https://www.w3.org/TR/?tag=css
let lis = document.getElementById("container").children
let result = [];
for (let li of lis) {
    if (li.getAttribute('data-tag').match(/css/))
        result.push({
            name: li.children[1].innerText,
            url: li.children[1].children[0].href
        })
}
console.log(result);
console.log(JSON.stringify(result, "      ", null));