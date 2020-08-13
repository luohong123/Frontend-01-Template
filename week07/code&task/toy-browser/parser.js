/*
 * @Author: qingcheng
 * @Date: 2020-05-16 19:24:38
 * @LastEditors: lh
 * @LastEditTime: 2020-06-02 10:19:13
 * @Description: 
 * @email: 3300536651@qq.com
 */

const css = require('css');
const EOF = Symbol('EOF');
const layout = require('./layout');
// 当前状态 当前属性 当前文本
let currentToken, currentAttribute, currentTextNode,
// 加入一个新的函数，addCSSRules.这里我们把CSS规则暂存到一个数组里
rules = [];
let stack = [{
    type: 'document',
    children: []
}]
function addCSSRules(text) {
    var ast = css.parse(text);
    rules.push(...ast.stylesheet.rules);
}
/**
 * 匹配选择器
 * @param {*} element 
 * @param {*} selector 
 */
function match(element, selector) {
    if (!selector || !element.attributes) {
        return false;
    }
    // id 选择器
    if (selector.charAt(0) == "#") {
        var attr = element.attributes.filter(attr => attr.name === "id")[0];
        if (attr && attr.value === selector.replace("#", '')) {
            return true;
        }
    } else if (selector.charAt(0) == ".") { // class 选择器
        let attr = element.attributes.filter(attr => attr.name === "class")[0];
        if (attr && attr.value === selector.replace(".", '')) {
            return true;
        }
    } else {
        if (element.tagName === selector) {
            return true;
        }
    }
}
/**
 * 特征
 * @param {*} selector 
 */
function specificity(selector) {
    var p = [0, 0, 0, 0];
    var selectorParts = selector.split(" ");
    for (var part of selectorParts) {
        if (part.charAt(0) == "#") {
            p[1] += 1;
        } else if (part.charAt(0) == ".") {
            p[2] += 1;
        } else {
            p[3] += 1;
        }
    }
    return p;
}
/**
 * 比较 specificity
 * @param {*} sp1 
 * @param {*} sp2 
 */
function compare(sp1, sp2) {
    if (sp1[0] - sp2[0]) {
        return sp1[0] - sp2[0];
    }
    if (sp1[1] - sp2[1]) {
        return sp1[1] - sp2[1];
    }
    if (sp1[2] - sp2[2]) {
        return sp1[2] - sp2[2];
    }
    return sp1[3] - sp2[3];
}
/**
 * 计算css
 * @param {*} element 
 */
function computeCSS(element) {
    var elements = stack.slice().reverse();
    if (!element.computedStyle) {
        element.computedStyle = {};
    }
    for (let rule of rules) {
        let selectorParts = rule.selectors[0].split(" ").reverse();

        if (!match(element, selectorParts[0])) {
            continue;
        }

        var j = 1;
        for (var i = 0; i < elements.length; i++) {
            if (match(elements[i], selectorParts[j])) {
                j++;
            }
        }
        if (j >= selectorParts.length) {
            matched = true;
        }
        if (matched) {
            var sp = specificity(rule.selectors[0]);
            var computedStyle = element.computedStyle;
            for (var declaration of rule.declarations) {
                if (!computedStyle[declaration.property]) {
                    computedStyle[declaration.property] = {};
                }

                if (!computedStyle[declaration.property].specificity) {
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
                    for (var k = 0; k < 4; k++) {
                        computedStyle[declaration.property][declaration.value][k] += sp[k];
                    }
                }
            }
        }
    }
}

function emit(token) {
    let top = stack[stack.length - 1];
    if (token.type == 'startTag') {
        let element = {
            type: 'element',
            children: [],
            attributes: []
        }
        element.tagName = token.tagName;
        for (let p in token) {
            if (p !== 'type' || p != 'tagName')
                element.attributes.push({
                    name: p,
                    value: token[p]
                });
        }
        computeCSS(element);
        top.children.push(element);

        if (!token.isSelfClosing) {
            stack.push(element);
        }

        currentTextNode = null;

    } else if (token.type == 'endTag') {
        if (top.tagName != token.tagName) { // 开始标签和结束标签是否相等
            throw new Error("Tag start end doesn't match!");
        } else {
            // 遇到style标签时，执行添加CSS规则的操作
            if (top.tagName === 'style') {
                addCSSRules(top.children[0].content);
            }
            stack.pop();
        }
        layout(top);
        currentTextNode = null;
    } else if (token.type == 'text') {
        if (currentTextNode == null) {
            currentTextNode = {
                type: "text",
                content: ""
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
}

function data(c) {
    if (c == "<") {
        return tagOpen;
    } else if (c == EOF) {
        emit({
            type: "EOF"
        });
        return;
    } else {
        emit({
            type: "text",
            content: c
        });
        return data;
    }
}
/**
 * 开始标签
 * @param {*} c 
 */
function tagOpen(c) {
    if (c == "/") {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "startTag",
            tagName: ""
        }
        return tagName(c);
    } else {
        emit({
            type: "text",
            content: c
        });
        return;
    }
}
/**
 * 标签名称
 * @param {*} c 
 */
function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == "/") {
        return selfClosingStartTag;
    } else if (c.match(/^[A-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if (c == ">") {
        emit(currentToken);
        return data;
    } else {
        currentToken.tagName += c;
        return tagName;
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == "/" || c == ">" || c == EOF) {
        return afterAttributeName(c);
    } else if (c == "=") {

    } else {
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c);
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
        return afterAttributeName(c);
    } else if (c == "=") {
        return beforeAttributeValue;
    } else if (c == "\u0000") {

    } else if (c == "\"" || c == "'" || c == "<") {

    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}

function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
        return beforeAttributeValue;
    } else if (c == "\"") {
        // 双引号
        return doubleQuotedAttributeValue;
    } else if (c == "\'") {
        // 单引号
        return singleQuotedAttributeValue;
    } else if (c == ">") {
        return data;
    } else {
        return UnquotedAttributeValue(c);
    }
}
/**
 * 双引号 属性
 * @param {*} c 
 */
function doubleQuotedAttributeValue(c) {
    if (c == "\"") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c == "\u0000") {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}
/**
 * 单引号 属性
 * @param {*} c 
 */
function singleQuotedAttributeValue(c) {
    if (c == "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c == "\u0000") {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}
/**
 * 
 * @param {*} c 
 */
function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == "/") {
        return selfClosingStartTag;
    } else if (c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}
/**
 * 没有引号的属性
 * @param {*} c 
 */
function UnquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if (c == "/") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c == "\u0000") {

    } else if (c == "\"" || c == "'" || c == "<" || c == "=" || c == "`") {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return UnquotedAttributeValue;
    }
}
/**
 * 闭合标签
 * @param {*} c 
 */
function selfClosingStartTag(c) {
    if (c == ">") {
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    } else if (c == "EOF") {

    } else {

    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "endTag",
            tagName: ""
        }
        return tagName(c);
    } else if (c == ">") {

    } else if (c == EOF) {

    } else {

    }
}
/**
 * 
 * @param {*} c 
 */
function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if (c == "/") { // 闭合标签
        return selfClosingStartTag;
    } else if (c == "=") { // 属性
        return beforeAttributeValue;
    } else if (c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c == EOF) {

    } else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: "",
            value: ""
        };
        return attributeName(c);
    }
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for (let c of html) {
        try {
            state = state(c);
        } catch (e) {
            console.log(c);
        }
    }
    state = state(EOF);
    return stack[0];
}