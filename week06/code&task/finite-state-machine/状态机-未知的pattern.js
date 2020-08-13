/*
 * @Author: qingcheng
 * @Date: 2020-05-14 20:44:05
 * @LastEditors: qingcheng
 * @LastEditTime: 2020-05-14 20:51:39
 * @Description: 
 * @email: 3300536651@qq.com
 */
function match(pattern,string) {
    // ????
}
match('a*b?bx','I am ababx! hhha!');
// 挑战题：我们如何用状态机处理完全未知的pattern？
// KMP等效的状态机，算法时间复杂度OM+N，不能用双层的嵌套循环，
// 不要用原始的KMP的写法，一定要用KMP完成状态机，提示：状态是可以生成的，JavaScript是有
// 闭包的

// 应该是要用一个数组，生成的
