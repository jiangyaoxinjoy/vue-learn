module.exports = {
    log: (message) => {
        console && console.log(message)  //保证代码里有console
    },
    ajax: (opt) => {
    	opt = opt || {};
        opt.method = opt.method.toUpperCase() || 'POST';
        opt.url = opt.url || '';
        opt.async = opt.async || true;
        opt.data = opt.data || null;
        opt.success = opt.success || function () {};
        var xmlHttp = null;
        //1.首先偷一个手机，当然抢一个也行（创建一个ajax对象）
        xmlHttp = new XMLHttpRequest()||new ActiveXObject('Microsoft.XMLHTTP');
        //2.准备好话术，给你爸打电话（建立连接）
        var params = [];
        for (var key in opt.data){
            params.push(key + '=' + opt.data[key]);
        }
        var postData = params.join('&');
        if (opt.method.toUpperCase() === 'POST') {
            xmlHttp.open(opt.method, opt.url, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
           //3.跟你爸说你被绑架了准备500万，不然就一枪崩了你（发送请求POST）
            xmlHttp.send(postData);
        }
        else if (opt.method.toUpperCase() === 'GET') {
            xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
            //3.换一种方式说，好歹养这么大对吧，就算猪肉的话多少钱一斤对不对（发送请求GET）
            xmlHttp.send(null);
        }
        //4.你爸说超过500块就撕票吧，反正也不是亲生的（接收返回数据）
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                 opt.success(xmlHttp.responseText);
            }
        };
    }
}
