/*
 * @Author: lh
 * @Date: 2020-08-05 23:19:07
 * @LastEditors: lh
 * @LastEditTime: 2020-08-05 23:21:51
 * @Description: 
 * @email: 3300536651@qq.com
 */
var ttys = require('ttys');
var process = require('process');
let stdout = ttys.stdout;
var stdin = process.stdin;;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');
async function getChar() {
    return new Promise(resolve => {
        stdin.once('data', function (key) {
            resolve(key);
        })
    })
}

function up(n = 1) {
    stdout.write('\033[' + n + 'A')
}

function down(n = 1) {
    stdout.write('\033[' + n + 'B');
}

function right(n = 1) {
    stdout.write('\033[' + n + 'C');
}

function left(n = 1) {
    stdout.write('\033[' + n + 'D');
}

void async function () {
    stdout.write('whice frame\n');
    let answer = await select(["vue", "react", "angular"]);
    stdout.write('\nYou selected ' + answer + '\n');
    process.exit();
}()


async function select(choices) {
    let selected = 0
    for (let i = 0; i < choices.length; i++) {
        let choice = choices[i]
        if (i === selected) {
            stdout.write("[x] " + choice + '\n');
        } else {
            stdout.write("[ ] " + choice + '\n');
        }
    }
    up(choices.length)
    // down(choices.length)
    right()
    // left(choices.length)
    while (true) {
        let char = await getChar();
        if (char === '\u0003') {
            process.exit()
            break
        }
        if (char === 'w' && selected > 0) {
            stdout.write(' ');
            left();
            selected--
            up();
            stdout.write('x');
            left();
        }
        if (char === 's' && selected < choices.length - 1) {
            stdout.write(' ');
            left();
            selected++
            down();
            stdout.write('x');
            left();
        }
        if (char === '\n') {
            down(choices.length - selected)
            left()
            return choices[selected]
        }
        if (char === '\r') {
            down(choices.length - selected);
            left();
            return choices[selected];
        }
    }
}