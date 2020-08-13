/*
 * @Author: qingcheng
 * @Date: 2020-05-19 23:22:56
 * @LastEditors: qingcheng
 * @LastEditTime: 2020-05-20 23:09:59
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
        return foundB;
    else
        return start;
}

function foundB(c) {
    if (c === "c")
        return end;
    else
        return start;
}

function foundC(c) {
    if (c === "a")
        return foundA2;
    else
        return start(c);
}

function foundA2(c) {
    if (c === "b")
        return foundB2;
    else
        return start;
}

function foundB2(c) {
    if (c === "x")
        return end;
    else if (c === "c")
        return foundC;
    else
        return start;
}

console.log(match("abcabcabx"));
console.log(match("abcabc"));
console.log(match("abc"));
// start(c) 
// 状态机代理成原来的状态