/*
$.ajax({
    url:'',
    data:{},
    type:'get',
    dataType: 'json',
    success: function () {

    }
})
*/

//使用ajax一共有4个步骤：1.创建ajax、2.连接服务器、3.发送请求、4.接受返回值。
function  ajax({url='',type='GET',dataType='json',data='',async=true}) {
    return new Promise( (resolve, reject) => {
        var xhr = null;
        var params = formsParams(data);
        //创建对象
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest()
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        // 连接
        if(type == "GET"){
            xhr.open(type,url + "?"+ params,async);
            xhr.send(null)
        } else if(type == "POST"){
            xhr.open(type,url,async);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.send(params);
        }
        xhr.onreadystatechange = function(){
            // xhr.readyState == 4  是表示后台处理完成了。
            // xhr.status == 200 是表示处理的结果是OK的。
            if(xhr.readyState == 4 && xhr.status == 200){
                resolve(xhr.responseText);
            }
        }
        xhr.onerror = function (err) {
            reject(err)
        }
        function formsParams(data){
            var arr = [];
            for(var prop in data){
                arr.push(prop + "=" + data[prop]);
            }
            return arr.join("&");
        }
    })

}


/*
ajax({url:'./data/carts.json'}).then( res=> {

},err => {

});
*/
