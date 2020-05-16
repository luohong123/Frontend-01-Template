/*
 * @Author: qingcheng
 * @Date: 2020-05-14 20:22:08
 * @LastEditors: qingcheng
 * @LastEditTime: 2020-05-14 20:35:26
 * @Description: 
 * @email: 3300536651@qq.com
 */

 function match(string){
     // 当前状态
     let state = start;
     for(let c of string){
     state = state(c);
 }
// start(c) 
// 状态机代理成原来的状态