let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');


//用json放数据比较好
//因为如果我们用fs.writeFile写入数据会把这个文件的内容覆盖掉，到时候module exports也会被覆盖掉，就会有错误
//用json就不会有这个问题。

/**
 * /sliders
 * 获取轮播图数据
 */
//是node服务所以用require和module exports
//js的数据可以直接导入。
let sliders = require('./sliders');

/**
 * read 读取数据的方法，分别用回调函数和promise写了一遍
 */
/*
function read(cb) {
  fs.readFile('./book.json','utf8',function (err,data) {
    if(err || data.length === 0) {
      cd([]);
    }else{
      //将内容转换成对象
      cb(JSON.parse(data));
    }
  })
}
read( function (books) {
  console.log(books)
})
*/

/*
let read = new Promise( (resolve, reject) => {
  fs.readFile('./book.json','utf8', function (err,data) {
      resolve(data);
  })
})
read.then( res => {
  console.log(res)
})
*/
function read() {
  return new Promise((resolve, reject) => {
    fs.readFile('./book.json', 'utf8', function (err, data) {
      resolve(JSON.parse(data));
    })
  })
}

/**
 * 写入数据
 * @param data 数据
 * @returns {Promise<any>}
 */
function write(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile('./book.json', JSON.stringify(data), function (err, data) {
      resolve('写入成功');
    })

  })
}

/*
//尝试调用写入空对象，book.json就变成了空对象。
write({}).then( res => {
  console.log(res);
})
*/

let pageSize = 5; //每页显示5条

http.createServer((req, res) => {
  //跨域头，因为调用3333端口的是8080. 这些头部跨域设置在项目上线是可以去掉，因为已经变成同域。
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", ' 3.2.1')

  if (req.method == "OPTIONS") return res.end(); //让options请求快速返回

  let {pathname, query} = url.parse(req.url, true); //true吧query转化成对象
  if (pathname === '/page') {
    let offset = parseInt(query.offset) || 0; //拿到前端传递的值
    console.log(offset);
    read().then(books => {
      let hasMore = true;
      let result = books.reverse().slice(offset, offset + pageSize);
      if (books.length <= offset + pageSize) { //显示数目大于总条数
        hasMore = false;
      }
      res.end(JSON.stringify({hasMore, books: result}))
    })
    return;
  }

  if (pathname === '/sliders') {
    //编码格式，可以不写
    res.setHeader('Content-Type', 'application/json;charset=utf8');

    return res.end(JSON.stringify(sliders));
  }
  if (pathname === '/hot') {
    read().then(books => {
      //截取最新的六本。倒叙+截取
      let hot = books.reverse().slice(0, 6);
      setTimeout(() => {
        res.end(JSON.stringify(hot));
      }, 1000); //延迟测试首页loading
    });
    return;
  }

  //对书的增删改查
  if (pathname === '/book') {
    let id = parseInt(query.id);//query.id取出的是字符串
    switch (req.method) { // ?id=1
      case 'GET':
        if (!query.id) {
          read().then(books => {
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(books.reverse()))
          })
        } else {
          read().then(books => {
            let book = books.find(item => {
              return item.bookId == id
            }) || {};
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(book))
          })
        }
        break;
      case 'POST':
        let str = '';
        req.on('data', chunk => {
          str += chunk;
        });
        req.on('end', () => {
          let book = JSON.parse(str); //book对象
          read()
            .then(books => {
              book.bookId = books.length ? books[books.length - 1].bookId + 1 : 1;
              books.push(book);
              return Promise.resolve(books);
            })
            .then(books => {
              return write(books)
            }).then(() => {
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(book))
          })
        });
        break;
      case 'PUT':
        if (id) {
          let str = '';
          req.on('data', chunk => {
            str += chunk;
          });
          req.on('end', () => {
            let book = JSON.parse(str); //book对象
            read()
              .then(books => {
                books = books.map(item => {
                  if (item.bookId == book.bookId) {
                    return book; //找到id相同的一本书改成book
                  }
                  return item;
                });
                return Promise.resolve(books);
              })
              .then(books => {
                return write(books)
              }).then(() => {
              res.setHeader('Content-Type', 'application/json;charset=utf8');
              res.end(JSON.stringify({}))
            })
          })
        }
        break
      case 'DELETE':
        read().then(books => {
          books = books.filter(item => item.bookId !== id);
          write(books).then(() => {
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify({})) //删除返回空对象。
          });
        })
        break;
      default:
        break;
    }
    return
  }
  //读取一个路径
  fs.stat('.' + pathname, function(err, stats) {
    if (err) {
      fs.createReadStream('index.html').pipe(res)
      // res.statusCode = 404;
      // res.end('NOT FOUND');
    } else {
      //读一个文件流
      if (stats.isDirectory()) {
        //如果访问的是文件夹就找index.html
        let p = require('path').join('.' + pathname, './index.html');
        fs.createReadStream(p).pipe(res)
      } else {
        fs.createReadStream('.' + pathname).pipe(res)
      }
    }
  });
}).listen(3333);

//模拟 api'/sliders'请求轮播图数据，虚拟数据放在sliders.js里面。
//可以右键单击run server.js 启动服务，然后在浏览器打开localhost:3333/server查看。
//要是3333端口号启动一次后被占用，alt+f12在cmd中输入tskill node。
