/*
 * @Author: qingcheng
 * @Date: 2020-05-19 16:59:53
 * @LastEditors: qingcheng
 * @LastEditTime: 2020-05-19 21:42:04
 * @Description: 
 * @email: 3300536651@qq.com
 */


const EOF = Symbol('EOF');

function data(c) {
    if (c == '<') {
        return tagOpen;
    } else if (c == EOF) {
        return;
    } else {
        return data;
    }
}
/**
 * 开始标签
 * @param {*} c 
 */
function tagOpen(c) {
    if (c == '/') {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        return tagName(c);
    } else {
        return;
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c);
    } else if (c == '>') {

    } else if (c == EOF) {

    } else {

    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == '/') {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if (c == '>') {
        emit(currentToken);
        return data;
    } else {
        return tagName;
    }
}

function beforeAttributeName() {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == '>') {
        return data;
    } else if (c == '=') {
        return beforeAttributeName;
    }else{
        beforeAttributeName;
    }
}

function selfClosingStartTag(c) {
    if (c == '>') {
        currentToken.isSelfClosing = true;
        return data;
    } else if (c == 'EOF') {

    } else {

    }
}
module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for (let c of html) {
        state = data(c);
    }
    state = data(EOF);
}