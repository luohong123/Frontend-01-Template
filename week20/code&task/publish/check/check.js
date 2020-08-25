/*
 * @Author: lh
 * @Date: 2020-08-25 17:25:55
 * @LastEditors: lh
 * @LastEditTime: 2020-08-25 18:02:40
 * @Description: 
 * @email: 3300536651@qq.com
 */
var page = require('webpage').create();
// page.open('http://baidu.com/', function (status) {
//     console.log("Status: " + status);
//     if (status === "success") {
//         var body = page.evaluate(function () {
//             var toString = function (pad, element) {
//                 var children = element.children;
//                 var childrenString = '';
//                 for (var i = 0; i < element.children.length; i++) {
//                     childrenString += toString("    " + pad, element.children[i]) + "\n";
//                 }
//                 return pad + element.tagName + (childrenString ? "\n" : "");
//             }
//             return toString("", document.body);
//             // return document.body.tagName;
//             // return document.body.children.length;
//             // return document.body.children[0];
//         });
//         console.log(body);
//     }
//     phantom.exit();
// });

page.open('http://baidu.com/', function (status) {
    console.log("Status: " + status);
    if (status === "success") {
        var body = page.evaluate(function () {
            var toString = function (pad, element) {
                var children = element.childNodes;
                var childrenString = '';
                for (var i = 0; i < element.children.length; i++) {
                    childrenString += toString("    " + pad, element.children[i]) + "\n";
                }
                return pad + element.tagName + (childrenString ? "\n" : "");
            }
            let name = element.tagName 
            return toString("", document.body);
            // return document.body.tagName;
            // return document.body.children.length;
            // return document.body.children[0];
        });
        console.log(body);
    }
    phantom.exit();
});