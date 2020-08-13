/*
 * @Author: qingcheng
 * @Date: 2020-05-19 23:25:50
 * @LastEditors: qingcheng
 * @LastEditTime: 2020-05-20 23:10:38
 * @Description: 
 * @email: 3300536651@qq.com
 */
function match(string) {
    // 当前状态
    let state = start;
    for (let c of string) {
        console.log(c);
        state = state(c);
    }
    return state === end;
}

function start(c) {
    if (c === "a") {
        return foundA;
    } else {
        return start;
    }
}

function end(c) {
    return end;
}

function foundA(c) {
    if (c === "b")
        return foundA2;
    else
        return start;
}

function foundA2(c) {
    if (c === "a")
        return foundB2;
    else
        return start;
}

function foundB2(c) {
    if (c === "b")
        return foundA3;
    else
        return start(c);
}

function foundA3(c) {
    if (c === "a")
        return foundB3;
    else
        return start;
}

function foundB3(c) {
    if (c === "b")
        return foundX;
    else
        return start;
}

function foundX(c) {
    if (c === "x")
        return end;
    else
        return start;
}

// test 
console.log(match('abababx')); // true
console.log(match('a1bababx')); // false