/*
 * @Author: qingcheng
 * @Date: 2020-05-14 20:12:38
 * @LastEditors: qingcheng
 * @LastEditTime: 2020-05-14 20:15:05
 * @Description: 
 * @email: 3300536651@qq.com
 */
// 在一个字符串中，找到字符'ab'
function match(string) {
    let foundA = false;
    for (let c of string) {
        if (c == 'a') {
            foundA = true;
        } else if (foundA && c == 'b')
            return true;
        else foundA = false;
    }
    return false;
}
console.log(match('I abm groot')); // true
console.log(match('I acbm groot')); //false