/*
 * @Author: qingcheng
 * @Date: 2020-05-14 20:22:08
 * @LastEditors: qingcheng
 * @LastEditTime: 2020-05-19 23:23:13
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
        return start(c);
}

function foundB(c) {
    if (c === "c")
        return end;
    else
        return start(c);
}

function foundC(c) {
    if (c === "d")
        return foundD;
    else
        return start(c);
}

function foundD(c) {
    if (c === "e")
        return foundE;
    else
        return start(c);
}

function foundE(c) {
    if (c === "f")
        return end;
    else
        return start(c);
}
console.log(match("aabc"));
// start(c) 
// 状态机代理成原来的状态