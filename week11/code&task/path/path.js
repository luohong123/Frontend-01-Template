/*
 * @Author: lh
 * @Date: 2020-06-18 21:31:04
 * @LastEditors: lh
 * @LastEditTime: 2020-06-26 23:56:56
 * @Description: 
 * @email: 3300536651@qq.com
 */

class Sorted {
    constructor(data, compare) {
        this.data = data;
        this.compare = compare;
    }
    /**
     * 拿一个最小的
     */
    take() {
        if (!this.data.length) return;
        let min = this.data[0];
        let minIndex = 0;
        for (let i = 1; i < this.data.length; i++) {
            if (this.compare(this.data[i], min) > 0) {
                min = this.data[i];
                minIndex = i;
            }
        }
        this.data[minIndex] = this.data[this.data.length - 1];
        this.data.pop();
        return min;
    }
    insert(v) {
        this.data.push(v);
    }
}
// let a = new Sorted([2,1,4,6,7],function(a,b){return a-b})
// a.take()
let map = localStorage.map ? JSON.parse(localStorage.map) : new Array(10000).fill(0);
let container = document.getElementById('container');
for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        if (map[y * 100 + x] === 1) {
            cell.style.backgroundColor = 'black';
        }
        cell.addEventListener('mouseover', () => {
            if (mouse) {
                if (clear) {
                    cell.style.backgroundColor = '';
                    map[y * 100 + x] = 0;
                } else {
                    cell.style.backgroundColor = 'black';
                    map[y * 100 + x] = 1;
                }
            }
        })
        container.appendChild(cell);
    }
}
let mouse = false;
let clear = false;
// 橡皮擦
document.addEventListener('mousedown', e => {
    mouse = true;
    // 点击鼠标右键时
    clear = (e.which === 3);
})
document.addEventListener('mouseup', () => mouse = false);
document.addEventListener('contextmenu', e => e.preventDefault());

function sleep(t) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t);
    });
}
async function findPath(map, start, end) {
    map = map.slice();
    let queue = [start];

    container.children[start[1] * 100 + start[0]].style.backgroundColor = 'green';
    container.children[end[1] * 100 + end[0]].style.backgroundColor = 'red';
    async function insert([x, y], pre) {
        if (map[100 * y + x] !== 0)
            return;
        // 到达边界
        if (x < 0 || y < 0 || x >= 100 || y >= 100) return;
        // 不走回头路
        map[100 * y + x] = pre;
        // container.children[y * 100 + x].style.backgroundColor = 'lightgreen';
        // await sleep(1);
        queue.push([x, y]);
    }

    while (queue.length) {
        let [x, y] = queue.shift();
        console.log(x, y);
        if (x === end[0] && y === end[1]) {
            let path = [];
            while (x !== start[0] || y !== start[1]) {
                path.push([x, y]);
                container.children[y * 100 + x].style.backgroundColor = 'purple';
                [x, y] = map[y * 100 + x];
            }
            return path;
        }
        await insert([x - 1, y], [x, y]);
        await insert([x + 1, y], [x, y]);
        await insert([x, y - 1], [x, y]);
        await insert([x, y + 1], [x, y]);

        await insert([x - 1, y - 1], [x, y]);
        await insert([x + 1, y - 1], [x, y]);
        await insert([x - 1, y + 1], [x, y]);
        await insert([x + 1, y + 1], [x, y]);

    }
    return null;
}
// findPath(map,[0,0],[50,50]);