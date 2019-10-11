"use strict";
if (!Object.assign) {
  Object.defineProperty(Object, "assign", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target, firstSource) {
      "use strict";
      if (target === undefined || target === null)
        throw new TypeError("Cannot convert first argument to object");
      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) continue;
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
        }
      }
      return to;
    }
  });
}

 

var state = { title: "", url: window.location.href }
/**
 * Cap_Size：尺寸
 * Cap_LColor:左边颜色
 * Cap_RColor:右边 颜色
 * Cap_type:
 * Cap_img:
 * Body_img:
 * capColor：
 * bodyColor：
 * Cwidth：Cap_img宽度
 * Cheight：Cap_img高度
 * Bwidth：Body_img宽度
 * Bheight：Body_img高度
 * */
// 初始化参数
var param = { Cap_Size:"00",Cap_LColor: '#103685', Cap_RColor: '#90c42f', Cap_type: 'gel', Cap_img: "", Body_img: "", capColor: "", bodyColor: "", Cwidth: "", Cheight: "", Bwidth: "", Bheight: "" };

"use strict";
var proxy = new Proxy(param, { // 动态监控属性变化
    get: function get(target, property) {
        return "[".concat(target[property], "]");
    },
    set: function set(target, property, value) {
        target[property] = value; //btoa(value);
        DynamicChangeParm();
        return true; //需要返回true
    }
});

var globa = {};
var dc = {};
var CapImg = new Image();
var BodyImg = new Image();

var parames = getParamsFromURL(state.url);

// 解密/解密
var Base64Encode = (function () {
    var me = {};
    var dirction = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
    me.ImageDatatoEncode = function (imgData, value) {
        var banary = [];
        for (var i = 0; i < imgData.data.length; i += 32) {
            var c = 0;
            for (var j = i; j < 32 + i; j += 4) {
                c = c << 1;
                c += imgData.data[j] == 255 ? 1 : 0;
                c += imgData.data[j + 1] == 255 ? 1 : 0
                c += imgData.data[j + 2] == 255 ? 1 : 0;
                c += imgData.data[j + 3] == 255 ? 1 : 0;
            }
            banary.push(c);
        }
        var gzip = window.pako.gzip(banary);
        var bann = "";
        var item = [];
        for (var i = 0; i < gzip.length; i += 3) {
            var g1 = gzip[i];
            var g2 = (gzip[i + 1]);
            var g3 = (gzip[i + 2]);
            var a = (g1 << 16) + (g2 << 8) + g3;
            var n1 = a >> 18;
            var n2 = (a >> 12) & 63;
            var n3 = (a >> 6) & 63;
            var n4 = a & 63;
            item.push(n1)
            item.push(n2)
            item.push(n3)
            item.push(n4)
        }
        for (var i = 0; i < item.length; i++) {
            var zimu = item[i];
            bann += dirction[zimu];
        }
        if (value == 1) {
            if (param.Cap_img != "") {
                CapImg.src = Base64Encode.ImageDataToDecode(bann, 1)
            }
            proxy.Cap_img = bann;
        } else {
            if (param.Body_img != "") {
                BodyImg.src = Base64Encode.ImageDataToDecode(bann, 2)
            }
            proxy.Body_img = bann;
        }
    }

    me.ImageDataToDecode = function (baseStr, value) {
        if (baseStr == "")
            return "";
        var ugizp = [];

        for (var i = 0; i < baseStr.length; i+=4) {
            var g1 = dirction.indexOf(baseStr[i])
            var g2 = dirction.indexOf(baseStr[i+1])
            var g3 = dirction.indexOf(baseStr[i+2])
            var g4 = dirction.indexOf(baseStr[i + 3])
            var a = (g1 << 18) + (g2 << 12) + (g3 << 6) + g4;
            var n1 = a >> 16;
            var n2 = (a >> 8) & 255;
            var n3 = (a >> 0) & 255;
            ugizp.push(n1);
            ugizp.push(n2);
            ugizp.push(n3);
        }
        var banary = window.pako.ungzip(ugizp);
        var aa = [];
        var RGB = [];
        if (value == 1) {
            if (param.Cwidth == "" && param.Cheight == "")
                return ""
            if (param.capColor == "")
                RGB.push(0, 0, 0, 255);
            else
                RGB = hex2Rgba(param.capColor);
        } else {
            if (param.Bwidth == "" && param.Bheight == "")
                return ""
            if (param.bodyColor == "")
                RGB.push(0, 0, 0, 255);
            else
                RGB = hex2Rgba(param.bodyColor);
        }
        for (var j = 0; j < banary.length; j++) {
            if (param.capColor == ""&&param.bodyColor=="") {//没有选择颜色，默认为黑色
                for (var k = 7; k >= 0; k--) {
                    aa.push(RGB[0]);
                    aa.push(RGB[1]);
                    aa.push(RGB[2]);
                    aa.push((1 & (banary[j] >> k)) * 255);
                }
            } else { // 选择了颜色
                for (var k = 8; k >= 1; k--) {
                    if (k == 8) {
                        aa.push(((1 & (banary[j] >> k - 1)) * 255 == 0) ? 0 : RGB[0]);
                        aa.push(((1 & (banary[j] >> k - 1)) * 255 == 0) ? 0 : RGB[1]);
                        aa.push(((1 & (banary[j] >> k - 1)) * 255 == 0) ? 0 : RGB[2]);
                        aa.push((1 & (banary[j] >> k - 1)) * 255);
                    } else {
                        aa.push(((1 & (banary[j] >> k)) * 255 == 0) ? 0 : RGB[0]);
                        aa.push(((1 & (banary[j] >> k)) * 255 == 0) ? 0 : RGB[1]);
                        aa.push(((1 & (banary[j] >> k)) * 255 == 0) ? 0 : RGB[2]);
                        aa.push((1 & (banary[j] >> k)) * 255);
                    }
                }
            }
        }
        // 解密完成,渲染图片
        return renderingImage(aa, value);
    }
    return me;
})();

// 渲染图片
function renderingImage(imgData, target) {
    var cvs = document.createElement('canvas');//画布
    var cvx = cvs.getContext('2d');//
    var image = new Image();
    if (target == 1) { // cap_img
        image = cvx.createImageData(param.Cwidth, param.Cheight);
        cvs.width = param.Cwidth
        cvs.height = param.Cheight
    } else { // body_img
        image = cvx.createImageData(param.Bwidth, param.Bheight);
        cvs.width = param.Bwidth
        cvs.height = param.Bheight
    }
    imgData.splice(image.data.length, imgData.length - image.data.length)
    image.data.set(imgData);
    cvx.putImageData(image, 0, 0, 0, 0, target == 1 ? param.Cwidth : param.Bwidth, target == 1 ? param.Cheight : param.Bheight);
    return cvs.toDataURL("image/png", 0.8);//这是压缩
}

function hex2Rgba(hex) { //十六进制转为RGBA
    var rgba = []; // 定义rgb数组
    if (/^\#[0-9A-F]{3,4}$/i.test(hex)) { //判断传入是否为#三位十六进制数
        var sixHex = '#';
        hex.replace(/[0-9A-F]/ig, function (kw) {
            sixHex += kw + kw; //把三位16进制数转化为六位
        });
        hex = sixHex; //保存回hex
    }

    if (/^#[0-9A-F]{6}$/i.test(hex)) {
        hex = hex + "FF";
    }
    if (/^#[0-9A-F]{8}$/i.test(hex)) { //判断传入是否为#八位十六进制数
        hex.replace(/[0-9A-F]{2}/ig, function (kw) {
            rgba.push(eval('0x' + kw)); //十六进制转化为十进制并存如数组
        });
        return rgba; //输出RGBA格式颜色
    } else {
        //console.log(`Input ${hex} is wrong!`);
        return [0, 0, 0, 0];
    }
}

// 动态计算宽和高
function widthAndHeight(srcWidth,srcHeight) {
    var gao=[];
    var setWidth = 200, setHeight = 200, Ratio = 1, wRatio, hRatio, w = srcWidth, h = srcHeight;
    wRatio = setWidth / w;
    hRatio = setHeight / h;
    if (setWidth == 0 && setHeight == 0) {
        Ratio = 1;
    } else if (setWidth == 0) { //
        if (hRatio < 1) Ratio = hRatio;
    } else if (setHeight == 0) {
        if (wRatio < 1) Ratio = wRatio;
    } else if (wRatio < 1 || hRatio < 1) {
        Ratio = (wRatio <= hRatio ? wRatio : hRatio);
    }
    if (Ratio < 1) {
        w = w * Ratio;
        h = h * Ratio;
    }
    gao.push(w, h);
    return gao;
}

/**
 * 获取地址栏参数
 */
function getParamsFromURL(url) {
    if ('undefined' == url) {
        return {};
    }
    if (url.indexOf("?") == -1) {
        return null;
    }
    let paraString = url.substring(url.search("info"), url.length).split("&");
    let paraObj = {};
    for (let i = 0; i < paraString.length; i++) {
        let j = paraString[i];
        paraObj[j.substring(0, j.indexOf("="))] = j.substring(j.indexOf("=") + 1, j.length);
    }
    return paraObj;
}

// 动态改变地址栏参数
function DynamicChangeParm() {
    if (param.Body_img != "") {
        BodyImg.src = param.Body_img
    }
    if (param.Cap_img != "") {
        CapImg.src = param.Cap_img
    }
    history.pushState(state.url, state.title, "#!/?info=" + escape(JSON.stringify(param)))
}

// 图片选择颜色
function ChangePhotoColor(src, image, fileType, r, g, b, target) {
    if (image.src == "")
        return false;
    else if (image.src.indexOf("?") != -1)
        return false;
    var cvs = document.createElement('canvas');//画布
    var cvx = cvs.getContext('2d');//
    // draw image params
    if (target == 1) {
        cvs.width = param.Cwidth == "" ? 0 : param.Cwidth;
        cvs.height = param.Cheight == "" ? 0 : param.Cheight ;
    } else {
        cvs.width = param.Bwidth == "" ? 0 : param.Bwidth;
        cvs.height = param.Bheight == "" ? 0 : param.Bheight;
    }
    cvx.drawImage(src, 0, 0, cvs.width, cvs.height);//画图
    // 新加，变成黑白图片
    var length = cvs.width * cvs.height;
    image = cvx.getImageData(0, 0, cvs.width, cvs.height);
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var light = (max + min) / 2;
    var temp = 0;
    for (var i = 0; i < length * 4; i += 4) {
        if (image.data[i + 3] == 0) continue;
        if (i!=0&&(i ==temp*4 )&&image.data[i + 3] == 0) {
            image.data[i] = r;
            image.data[i + 1] = g;
            image.data[i + 2] = b;
            image.data[i + 3] = light < 255 ? 255 : 255;
            continue;
        }
        temp++; 
        if (image.data[i + 3] == 0) continue;
        image.data[i] = r;
        image.data[i + 1] = g;
        image.data[i + 2] = b;
        image.data[i + 3] = light < 255 ? 255 : 255;
    }
    cvx.putImageData(image, 0, 0);
    var newImageData = cvs.toDataURL(fileType, 0.8);//这是压缩
    if (target == 1) {
        proxy.Cwidth = image.width;
        proxy.Cheight = image.height;
        dc.config.capImage = newImageData;
        proxy.Cap_img = newImageData;
    } else {
        proxy.Bwidth = image.width;
        proxy.Bheight = image.height;
        dc.config.bodyImage = newImageData;
        proxy.Body_img = newImageData;
    }
}

function DrawCapsule(id,cfg) {
  var c = document.getElementById(id);
  var context = c.getContext("2d");
  var tc = document.createElement("canvas");
  var tcontext = tc.getContext("2d");
  var isDrawing = false;
  tc.width = c.width;
  tc.height = c.height;

   var config = {
       capColor: cfg.capColor == null ? "#103685" : cfg.capColor,
       bodyColor: cfg.bodyColor == null ? "#90c42f" : cfg.bodyColor,
       capImage: cfg.capImage == null ? "" : cfg.capImage,
       bodyImage: cfg.bodyImage == null ? "" : cfg.bodyImage,
       type: cfg.type == null ? "gel" : cfg.type
  };
  Object.assign(config,cfg);
  function _screen(a, b) {
    return 255 - ((255 - a) * (255 - b) / 255);
  }

  function _screen(a, b) {
    return 255 - ((255 ^ a) * (255 ^ b) >> 8);
    if (b <= 128)
      return (a * b) / 128;
    return 255 - (255 - a) * (255 - b) / 128;
  }

  function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h, s, l];
  }
  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
  }
  function imageOnload(src, func) {
    var img = new Image();
    img.onload = function () {
      func(img);
    };
    img.src = src;
  }
  function drawImage(src, x, y, func) {
    imageOnload(src, function (img) {
      tcontext.drawImage(img, x, y);
      if (func) func();
    });
  }


  function getImageData(src, func) {

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    imageOnload(src, function (img) {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      var data = ctx.getImageData(0, 0, img.width, img.height);
      func(data);
    });
  }
  var w_h = 2;//最大宽高比
  var antiAliasing = 2;// 抗锯齿
  function drawPrintImage(src, ox, oy, radians, a, b, heightSize, func) {
    if (src == "") func();
    getImageData(src, function (data) {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      var w = data.width;
      var h = data.height;
      if (heightSize == 0) heightSize = antiAliasing * a;
      var mh = Math.max(w / w_h, h);
      var z = mh / heightSize / antiAliasing;
      canvas.width = antiAliasing * a * 2;
      canvas.height = (heightSize + Math.abs(b)) * antiAliasing;
      var toImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var imgStart = (Math.PI * antiAliasing * a * z - w) / 2;
      var dtY = Math.min(b * antiAliasing, 0) * -1;
      for (var x = 0; x < canvas.width; x++) {
        var stratY = Math.sqrt(1 - Math.pow((x - a * antiAliasing) / antiAliasing / a, 2)) * antiAliasing * b >> 0;
        var ct = (Math.PI - Math.acos((x - a * antiAliasing) / antiAliasing / a));
        //if (isNaN(ct)) continue;
        var x2 = antiAliasing * a * ct * z - imgStart >> 0;
        for (var y0 = 0; y0 < canvas.height; y0++) {
          var y = y0 + stratY;
          var y2 = y0 * z >> 0;

          var color = getPoint(data, x2, y2);
          putPoint(toImageData, x, y + dtY, color);
        }
      }

      ctx.putImageData(toImageData, 0, 0);
      tcontext.translate(ox, oy);
      tcontext.rotate(radians);
      tcontext.drawImage(canvas, 0, 0, canvas.width / antiAliasing, canvas.height / antiAliasing);
      tcontext.setTransform(1, 0, 0, 1, 0, 0);
      if (func) func();
    });

  }
  function getPoint(data, x, y) {
    if (x < 0 || y < 0 || x >= data.width || y >= data.height) return [0, 0, 0, 0];
    var p = (y * data.width + x) * 4;
    var result = [];
    result.push(data.data[p]);
    result.push(data.data[p + 1]);
    result.push(data.data[p + 2]);
    result.push(data.data[p + 3]);
    return result;
  }
  function putPoint(data, x, y, d) {
    var p = (y * data.width + x) * 4;
    data.data[p] = d[0];
    data.data[p + 1] = d[1];
    data.data[p + 2] = d[2];
    data.data[p + 3] = d[3];

  }
  function drawColor(image, color, func) {
    var rgba = hex2Rgba(color);
    var r = rgba[0];
    var g = rgba[1];
    var b = rgba[2];
    var a = rgba[3];
    var hsl = rgbToHsl(r, g, b);
    var rgb = hslToRgb(hsl[0], hsl[1] * 0.95, hsl[2] * 0.95);
    r = rgb[0];
    g = rgb[1];
    b = rgb[2];
    //console.log(rgba);
    getImageData(image, function (data) {
      for (var i = 0; i < data.data.length; i += 4) {
        if (data.data[i + 3] == 0) continue;
        data.data[i] = _screen(r, data.data[i]);
        data.data[i + 1] = _screen(g, data.data[i + 1]);
        data.data[i + 2] = _screen(b, data.data[i + 2]);
        data.data[i + 3] = a * data.data[i + 3] >> 8;
      }
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      canvas.width = data.width;
      canvas.height = data.height;
      ctx.putImageData(data, 0, 0);
      tcontext.drawImage(canvas, 0, 0, data.width, data.height);
      if (func) func();
    });
  }
  var t = null;
  this.draw = function () {


    if (isDrawing) {
      clearTimeout(t);
      t = setTimeout(this.draw, 100);
      return;
    };
    //var start = Date.now();
    // drawPrintImage(config.capImage, 500, 500, 0, 100, 50, 200);
    // context.drawImage(tc, 0, 0);
    // return;
    isDrawing = true;
    tcontext.clearRect(0, 0, c.width, c.height);

      drawImage("/Themes/Store/Content/js/extend/design-capsule/img/bg.png", 0, 0, function () {
        drawColor("/Themes/Store/Content/js/extend/design-capsule/img/" + config.type + "/body.png", config.bodyColor, function () {
            drawColor("/Themes/Store/Content/js/extend/design-capsule/img/" + config.type + "/cap.png", config.capColor, function () {

          drawPrintImage(config.bodyImage, 511, 390, Math.PI, 170 / 2, -40, 110, function () {
            drawPrintImage(config.bodyImage, 790, 684, Math.PI * (-116 / 180), 170 / 2, 55, 110, function () {
              drawPrintImage(config.capImage, 670, 744, Math.PI * (-115 / 180), 184 / 2, 70, 100, function () {
                drawPrintImage(config.capImage, 60, 580, Math.PI * (- 1 / 180), 181 / 2, 50, 100, function () {
                  context.drawImage(tc, 0, 0, c.width, c.height);
                  isDrawing = false;
                });
                
              });
            });
          });


          // console.log(Date.now() - start);
        });
      });
    });


  };
  this.config = config;
  this.draw.call(this);

}

if (parames != null) { // 地址栏有参数
    globa = JSON.parse(unescape(parames.info))
    dc = new DrawCapsule("capsule_canvas", { capColor: globa.Cap_LColor, bodyColor: globa.Cap_RColor, capImage: globa.Cap_img, bodyImage: globa.Body_img, type: globa.Cap_type });
    // 获取地址栏参数
    param.Cap_Size = globa.Cap_Size;
    param.Cap_LColor = globa.Cap_LColor;
    param.Cap_RColor = globa.Cap_RColor;
    param.Cap_type = globa.Cap_type;
    param.Cap_img = globa.Cap_img;
    param.Body_img = globa.Body_img;
    param.capColor = globa.capColor;
    param.bodyColor = globa.bodyColor;
    param.Cwidth = globa.Cwidth;
    param.Cheight = globa.Cheight;
    param.Bwidth = globa.Bwidth;
    param.Bheight = globa.Bheight;
    $("#cap-value").val(globa.Cap_LColor);
    $("#body-value").val(globa.Cap_RColor);
    $('#' + globa.Cap_type).attr("checked", "checked");
    dc.config.capColor = globa.Cap_LColor;
    dc.config.bodyColor = globa.Cap_RColor;
    dc.config.capImage = globa.Cap_img;
    dc.config.bodyImage = globa.Body_img;
    CapImg.src =dc.config.capImage
    BodyImg.src = dc.config.bodyImage
    $("#capImage").attr("src", CapImg.src);
    $("#bodyImage").attr("src", BodyImg.src);
    $("#capimg-value").val(globa.capColor);
    $("#bodyimg-value").val(globa.bodyColor);
}
 else {
    dc = new DrawCapsule("capsule_canvas", { capColor: "#" + document.getElementById("cap-value").value, bodyColor: "#" + document.getElementById("body-value").value });
}

        var radios = document.getElementById("type_option").getElementsByTagName("input");
        for (var i = 0; i < radios.length; i++) {
            var radio = radios[i];
            radio.addEventListener("change",function(){
                if(!this.checked) return;
                dc.config.type = this.getAttribute("data-value");
                dc.draw();
                // 监测到type发生变化
                proxy.Cap_type = dc.config.type;
            });
            
}

// cap_size
var sizeRadios = document.getElementById("size_option").getElementsByTagName("input");
for (var i = 0; i < sizeRadios.length; i++) {
    var radio = sizeRadios[i];
    radio.addEventListener("change", function () {
        if (!this.checked) return;
        proxy.Cap_Size = this.getAttribute("data-value");
    });
}
        
        function onCapChange(picker) {
            dc.config.capColor = "#" + picker.valueElement.value;
            dc.draw();
            // 监测到Cap_LColor发生变化
            proxy.Cap_LColor = dc.config.capColor;
        }
        function onBodyChange(picker) {
            dc.config.bodyColor = "#" + picker.valueElement.value;
            dc.draw();
            // 监测到Cap_RColor发生变化
            proxy.Cap_RColor = dc.config.bodyColor;
        }

function onCapImg(picker) {
    // 监测到Cap_LColor发生变化
    // 获取rgb
    var rgb = picker.rgb;
    var red = rgb[0], gree = rgb[1], blue = rgb[2];
    if (param.Cap_img != "") {
        CapImg.src = param.Cap_img
    }
    ChangePhotoColor(CapImg, CapImg, "image/png", red, gree, blue, 1);
    proxy.capColor = "#" + picker.valueElement.value;
    dc.draw();
}
function onBodyImg(picker) {
    // 监测到Cap_LColor发生变化
    // 获取rgb
    var rgb = picker.rgb;
    var red = rgb[0], gree = rgb[1], blue = rgb[2];
    if (param.Body_img != "") {
        BodyImg.src = param.Body_img
    }
    ChangePhotoColor(BodyImg, BodyImg, "image/png", red, gree, blue, 2);
    proxy.bodyColor = "#" + picker.valueElement.value;
    dc.draw();
}

        document.getElementById("capImage").addEventListener("change",function(){
            if (this.files.length > 0) {
                var reader = new FileReader();
                var _file = this.files[0], fileType = _file.type;
                var RGB = [];
                // 当已选择颜色，需要绑定到图片上，没有默认为0
                //if (param.capColor == "")
                    RGB.push(0, 0, 0, 255);
                //else
                  //  RGB = hex2Rgba(param.capColor);
                reader.readAsDataURL(_file);// 输出base64图片
                reader.onload = function (e) {
                    //alert('文件读取完成');
                    var imgFile = e.target.result;
                    // 压缩
                    var image = new Image();//新建图片
                    image.src = imgFile;
                    CapImg.src = imgFile;
                    image.onload = function () {
                        var cvs = document.createElement('canvas');//画布
                        var cvx = cvs.getContext('2d');//
                        // draw image params
                        var rule = widthAndHeight(this.width, this.height);
                        cvs.width = rule[0];
                        cvs.height = rule[1];
                        cvx.drawImage(this, 0, 0, cvs.width, cvs.height);//画图

                        // 新加，变成黑白图片
                        var length = cvs.width * cvs.height;
                        image = cvx.getImageData(0, 0, cvs.width, cvs.height);
                        for (var i = 0; i < length * 4; i += 4) {
                            if (image.data[i + 3] == 0) continue; 
                            var myRed = image.data[i];
                            var myGreen = image.data[i + 1];
                            var myBlue = image.data[i + 2];
                            var max = Math.max(myRed, myGreen, myBlue), min = Math.min(myRed, myGreen, myBlue);
                            var light = (max + min) / 2;
                            
                            image.data[i] = RGB[0];
                            image.data[i + 1] = RGB[1];
                            image.data[i + 2] = RGB[2];
                            image.data[i + 3] = light < 250 ? 255 : 0;
                        }
                        proxy.Cwidth = image.width;
                        proxy.Cheight = image.height;
                        cvx.putImageData(image, 0, 0);
                        var newImageData = cvs.toDataURL(fileType, 1);
                        proxy.Cap_img = newImageData;
                        dc.config.capImage = newImageData;
                    }
                    dc.draw();
                };
            }else {
                dc.config.capImage = "";
                proxy.Cap_img = "";
                dc.draw();
            }
        });
        document.getElementById("bodyImage").addEventListener("change",function(){
            if (this.files.length > 0) {
                var reader = new FileReader();
                var _file = this.files[0], fileType = _file.type;
                //console.log(fileType);
                var RGB = [];
                // 当已选择颜色，需要绑定到图片上，没有默认为0
               // if (param.bodyColor == "")
                    RGB.push(0, 0, 0, 255);
                //else
                //    RGB = hex2Rgba(param.bodyColor);
                reader.readAsDataURL(_file);// 输出base64图片
                reader.onload = function (e) {
                    //alert('文件读取完成');
                    var imgFile = e.target.result;
                    // 压缩
                    var image = new Image();//新建图片
                    image.src = imgFile;
                    BodyImg.src = imgFile;
                    image.onload = function () {
                        var cvs = document.createElement('canvas');//画布
                        var cvx = cvs.getContext('2d');//
                        // draw image params
                        var rule = widthAndHeight(this.width, this.height);
                        cvs.width =rule[0];
                        cvs.height = rule[1];
                        cvx.drawImage(this, 0, 0, cvs.width, cvs.height);//画图

                        // 新加，变成黑白图片
                        var length = cvs.width * cvs.height;
                        image = cvx.getImageData(0, 0, cvs.width, cvs.height);
                        for (var i = 0; i < length * 4; i += 4) {
                            if (image.data[i + 3] == 0) continue;
                            var myRed = image.data[i];
                            var myGreen = image.data[i + 1];
                            var myBlue = image.data[i + 2];
                            var max = Math.max(myRed, myGreen, myBlue), min = Math.min(myRed, myGreen, myBlue);
                            var light = (max + min) / 2;

                            image.data[i] = RGB[0];
                            image.data[i + 1] = RGB[1];
                            image.data[i + 2] = RGB[2];
                            image.data[i + 3] = light < 250 ? 255 : 0;
                        }
                        proxy.Bwidth = image.width;
                        proxy.Bheight = image.height;
                        cvx.putImageData(image, 0, 0);
                        var newImageData = cvs.toDataURL(fileType, 1);//这是压缩
                        proxy.Body_img = newImageData; 
                        dc.config.bodyImage = newImageData;
                    }
                    dc.draw();
                };
            } else {
                dc.config.bodyImage = "";
                proxy.Body_img = "";
                dc.draw();
            }
        });
