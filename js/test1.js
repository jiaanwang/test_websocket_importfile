var wsUrl = '';
var websocket = null;
var root_config = {
    // 开发
    development: 'http://10.137.5.133:5030/',
    ws: '127.0.0.1:19000',

    // 上线
    product: 'http://192.168.111.231:8050/api/v2',
};

var button1 = document.getElementById('bt');
button1.onclick=function() {
    websocket.send('123456');
    console.log(89)
}

var base64= "data:image/jpg;base64,";


window.onload = function() {
    // initWebSocket();
    // setWsUrl();
}

function initWebSocket(url) {
    if(window.WebSocket) {
        if(typeof MozWebSocket == 'function') {
            WebSocket = MozWebSocket;
        }
        websocket = new WebSocket(url);
        websocket.onopen = function(evt){}
        websocket.onclose = function(evt) {}
        websocket.onmessage = function (evt) {
            console.log('连接成功');
            if ((typeof evt.data).toLocaleLowerCase() != 'string'){
            } else {
                console.log(evt.data)
                var data = JSON.parse(evt.data)
                var text1 = document.getElementById('text');
                text1.innerHTML= data.msg
                if(data.pic != '') returnBuff(data.pic);

            }
            
        }
        
    }
}



function returnBuff(data) {
    var imgSrc = document.getElementById('image1');
    imgSrc.src =base64+ data;
    console.log(data);
}

function setWsUrl() {
    let ROOT_URL = '';
    let UUID = this.getGuid();
    ROOT_URL = root_config.development; // 开发环境
    // if(process.env.NODE_ENV === 'development'){
    //   ROOT_URL = root_config.development; // 开发环境
    // }else{
    //   ROOT_URL = root_config.product; // 服务器环境
    // }
    let url = 'ws://'+ROOT_URL.split('/')[2]+'/ws/monitor/html/'+UUID;
    console.log(url)
    // this.createWebSocket(url)
    initWebSocket(url);
  }

function getGuid() {
    // xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })
  }

// let data = "abc";
// let blob = new Blob([data], {type: "text/plain;charset=UTF-8"});
// let url = window.URL.createObjectURL(blob);

// console.log(url);
// let link = document.createElement('a');
// link.style.display = "none";
// link.href = url;
// link.setAttribute('download', 'model.txt');
// document.body.appendChild(link);
// link.click();
// document.body.removeChild(link);

function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
    );
    obj.dispatchEvent(ev);
}

function download(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var downloadData = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(downloadData);
    save_link.download = name;
    fake_click(save_link);
}

let selectedFile = null;
let name1 = '';


function fileImport() {
    selectedFile = document.getElementById('files').files[0];
    name1 = selectedFile.name;
    var size = selectedFile.size;
    console.log("文件名："+ name1 + "大小：" + size);
    console.log(selectedFile)
}

function import1() {
    var click1 = document.getElementById('files');
    click1.click();
}

function saveClick() {
    download(name1, selectedFile);
}

// download("test.txt", "hello word!");



