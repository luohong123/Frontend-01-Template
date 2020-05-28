/*
 * @Author: qingcheng
 * @Date: 2020-05-18 12:24:30
 * @LastEditors: lh
 * @LastEditTime: 2020-05-28 15:06:51
 * @Description: 
 * @email: 3300536651@qq.com
 */

const net = require('net');
const parser = require('./parser.js');
const render = require('./render');
// https://github.com/zhangyuanwei/node-images
const images = require('images');
class Request {
    constructor(options) {
        this.method = options.method || 'GET';
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body);
        } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
            this.headers['Content-Length'] = this.bodyText.length;
        }
    }
    // 注意：字符串不能有缩进
    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}
\r
${this.bodyText}`
    };
    send(connection) {
        const parser = new ResponseParser;
        return new Promise((resolve, reject) => {
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port,
                }, () => {
                    connection.write(this.toString());
                });
            };
            connection.on('data', (data) => {
                parser.receive(data.toString()); // 
                if (parser.isFinished) {
                    resolve(parser.response);
                }
                connection.end();
            });
            connection.on('error', (err) => {
                reject(err);
                connection.end();
            });
        });
    }
}

class Response {

}

class ResponseParser {
    // 定义一个状态，用状态机实现
    // 比Request代码困难
    // 字符流处理
    constructor() {
        this.WAITNG_STATUS_LINE = 0;
        this.WAITNG_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END = 6;

        this.WAITING_BODY = 7;

        // 处理带r带n
        this.current = this.WAITNG_STATUS_LINE;
        this.statusLine = '';
        this.headers = {};
        this.headerName = '';
        this.headerValue = '';
        this.bodyParser = null;
    }
    get isFinished() {
        return this.bodyParser && this.bodyParser.isFinished;
    }
    get response() {
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.conetent.join('')
        }
    }
    receive(string) {
        for (let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i));
        }
    }
    // 一个状态机基本的用法
    receiveChar(char) {
        if (this.current === this.WAITNG_STATUS_LINE) {
            if (char === '\r') {
                this.current = this.WAITING_STATUS_LINE_END;
            }
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            } else {
                this.statusLine += char;
            } // 113min
        } else if (this.current === this.WAITING_STATUS_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            }
        } else if (this.current === this.WAITING_HEADER_NAME) {
            if (char === ':') {
                this.current = this.WAITING_HEADER_SPACE;
            } else if (char === '\r') {
                this.current = this.WAITING_HEADER_BLOCK_END = 6;;
                if (this.headers['Transfer-Encoding'] === 'chunked')
                    this.bodyParser = new TrunkedBodyParser();
            } else {
                this.headerName += char;
            }
        } else if (this.current === this.WAITING_HEADER_SPACE) {
            if (char === ' ') {
                this.current = this.WAITING_HEADER_VALUE;
            }
        } else if (this.current === this.WAITING_HEADER_VALUE) {
            if (char === '\r') {
                this.current = this.WAITING_HEADER_LINE_END;
                this.headers[this.headerName] = this.headerValue;
                this.headerName = '';
                this.headerValue = '';
            } else {
                this.headerValue += char;
            }
        } else if (this.current === this.WAITING_HEADER_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            }
        } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
            if (char === '\n') {
                this.current = this.WAITING_BODY;
            }
        } else if (this.current === this.WAITING_BODY) {
            this.bodyParser.receiveChar(char);
        }


    }
}

class TrunkedBodyParser {
    // 定义一个状态，用状态机实现
    // 比Request代码困难
    // 字符流处理
    constructor() {
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;
        this.length = 0;
        this.conetent = [];
        this.isFinished = false;
        this.current = this.WAITING_LENGTH;
    }

    // receive(string) {

    // }
    receiveChar(char) {
        if (this.current === this.WAITING_LENGTH) {
            if (char === '\r') {
                if (this.length === 0) {
                    this.isFinished = true;
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            } else {
                this.length *= 16;
                this.length += parseInt(char, 16);
                // this.length *= 10; bug代码 应该改为16进制
                // this.length += char.charCodeAt(0) - '0'.charCodeAt(0);
            }
        } else if (this.current === this.WAITING_LENGTH_LINE_END) {
            if (char === '\n') {
                this.current = this.READING_TRUNK;
            }
        } else if (this.current === this.READING_TRUNK) {
            this.conetent.push(char);
            this.length--;
            if (this.length === 0) {
                this.current = this.WAITING_NEW_LINE;
            }
        } else if (this.current === this.WAITING_NEW_LINE) {
            if (char === '\r') {
                this.current = this.WAITING_NEW_LINE_END;
            }
        } else if (this.current === this.WAITING_NEW_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_LENGTH; // 每一个循环以空行添加
            }
        }
    }

}
void async function () {
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8088',
        path: '/',
        headers: {
            ['X-Foo2']: 'customed'
        },
        body: {
            name: 'winter'
        }
    });
    let response = await request.send();
    let dom = parser.parseHTML(response.body);
    let viewport = images(800, 600);
    render(viewport, dom.children[0].children[3].children[1].children[1]);
    viewport.save('viewport.jpg');
    console.log(dom);
}();
