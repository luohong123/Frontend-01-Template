/*
 * @Author: qingcheng
 * @Date: 2020-05-09 20:47:44
 * @LastEditors: qingcheng
 * @LastEditTime: 2020-05-13 23:06:43
 * @Description: 
 * @email: 3300536651@qq.com
 */
const net = require('net');

class Request {
    // method, url = host + port + path
    // body: k/v 
    // headers
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
            // 看到77分钟
            // 这个data是什么时候触发，比如服务端收到一个包，TCP 认为是一个流
            // data是一个流，一部分一部分的灌给parser
            // Nodejs buffer
            connection.on('data', (data) => {
                parser.receive(data.toString()); // 
                // resolve(data.toString());
                console.log(parser.statusLine, 'statusLine');
                console.log(parser.headers, 'headers');
                // output header的解析
                // {
                //     'Content-Type:': 'text/plain',
                //     'X-Foo:': 'bar',
                //     'Date:': 'Wed, 13 May 2020 14:31:51 GMT',
                //     'Connection:': 'keep-alive',
                //     'Transfer-Encoding:': 'chunked'
                //   }
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
    receive(string) {
        for (let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i));
        }
    }
    // 一个状态机基本的用法
    receiveChar(char) {
        // console.log(char,'char');
        if (this.current === this.WAITNG_STATUS_LINE) {
            // console.log(char.charCodeAt(0));
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
            // console.log(char);
            if (char === ':') {
                this.current = this.WAITING_HEADER_SPACE;
            } else if (char === '\r') {
                this.current = this.WAITING_HEADER_BLOCK_END = 6;;
                // 在这个点开始才知道header是用什么encoding的
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
        console.log(JSON.stringify(char));
        if (this.current === this.WAITING_LENGTH) {
            if (char === '\r') {
                if (this.length === 0) {
                    console.log(this.conetent,'content');
                    console.log('////////////');
                    this.isFinished = true;
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            } else {
                this.length *= 10;
                this.length += char.charCodeAt(0) - '0'.charCodeAt(0);
            }
        }
        if (this.current === this.WAITING_LENGTH_LINE_END) {
            console.log('WAITING_LENGTH_LINE_END');
            if (char === '\n') {
                this.current = this.READING_TRUNK;
            }
        }
        if (this.current === this.READING_TRUNK) {
            this.conetent.push(char);
            this.length --;
            if (this.length === 0) {
                this.current = this.WAITING_NEW_LINE;
            }
        }
        if (this.current === this.WAITING_NEW_LINE) {
            if (char === '\r') {
                this.current = this.WAITING_NEW_LINE_END;
            }
        }
        if (this.current === this.WAITING_NEW_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_LENGTH; // 每一个循环以空行添加
            }
        }
        // "2"
        // "\r"
        // "\n"
        // "o"
        // "k"
        // "\r"
        // "\n"
        // "0"
        // "\r"
        // "\n"
        // "\r"
        // "\n"
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
    console.log(response);
    // 输出
    // HTTP/1.1 200 OK
    // Content-Type: text/plain
    // X-Foo: bar
    // Date: Wed, 13 May 2020 12:29:38 GMT
    // Connection: keep-alive
    // Transfer-Encoding: chunked

    // 2
    // ok
    // 0
}();

/*
const client = net.createConnection({
    host: '127.0.0.1',
    port: 8088
}, () => {
    console.log('connect to server!');
    // HTTP是文本协议
//     client.write(`
// POST / HTTP/1.1\r
// Content-Type: application/x-www-form-urlencoded\r
// Content-Length: 11\r
// \r
// name=winter`);
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: '8088',
        path:'/',
        headers:{
            ["X-Foo2"]:"customed"
        },
        body: {
            name: 'winter'
        }
    });
    console.log(request.toString());
    client.write(request.toString());
});
client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});
client.on('end', () => {
    console.log('disconnected from server');
});
client.on('error', (err) => {
    console.log('disconnected from server');
    console.log(err);
})

*/