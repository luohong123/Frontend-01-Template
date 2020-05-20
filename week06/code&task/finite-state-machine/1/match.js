/*
 * @Author: qingcheng
 * @Date: 2020-05-19 23:17:41
 * @LastEditors: qingcheng
 * @LastEditTime: 2020-05-19 23:18:16
 * @Description: 
 * @email: 3300536651@qq.com
 */

function match(string) {
    for (let c of string) {
        if (c == "a") {
            return true;
        }
    }
    return false;
}
match("I am groot");