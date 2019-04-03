/**
 * we-cropper v1.3.4
 * (c) 2019 dlhandsome
 * @license MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.WeCropper = factory());
}(this, (function () { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var device = void 0;
var TOUCH_STATE = ['touchstarted', 'touchmoved', 'touchended'];

function setTouchState(instance) {
    var arguments$1 = arguments;

    var arg = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arg[_i - 1] = arguments$1[_i];
    }
    TOUCH_STATE.forEach(function (key, i) {
        if (arg[i] !== undefined) {
            instance[key] = arg[i];
        }
    });
}
function validator(instance, o) {
    Object.defineProperties(instance, o);
}
function getDevice() {
    if (!device) {
        device = wx.getSystemInfoSync();
    }
    return device;
}

/**
 * String type check
 */
var isStr = function (v) { return typeof v === 'string'; };
/**
 * Number type check
 */

/**
 * Array type check
 */
var isArr = Array.isArray;
/**
 * undefined type check
 */



/**
 * Function type check
 */
var isFunc = function (v) { return typeof v === 'function'; };
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
var isObj = function (obj) {
    return obj !== null && typeof obj === 'object';
};

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
var _toString = Object.prototype.toString;
var isPlainObject = function (obj) {
    return _toString.call(obj) === '[object Object]';
};

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */

/**
 * Check if val is a valid array index.
 */

/**
 * Convert an Array-lik object to a real Array
 */
function toArray(list, start) {
    if (start === void 0) { start = 0; }
    var i = list.length - start;
    var rst = new Array(i);
    while (i--) {
        rst[i] = list[i + start];
    }
    return rst;
}

var Base = /** @class */ (function () {
    function Base() {
        this._events = {};
    }
    Base.prototype.$on = function (event, fn) {
        var _this = this;
        if (isArr(event)) {
            event.forEach(function (item) {
                if (isStr(item)) {
                    _this.$on(item, fn);
                }
                else if (isObj(item)) {
                    _this.$on(item.event, item.fn);
                }
            });
        }
        else {
            (this._events[event] || (this._events[event] = [])).push(fn);
        }
        return this;
    };
    Base.prototype.$once = function () { };
    Base.prototype.$off = function (event, fn) {
        var _this = this;
        if (!event && !fn) {
            this._events = Object.create(null);
            return this;
        }
        if (isArr(event)) {
            event.forEach(function (item) {
                if (isStr(item)) {
                    _this.$off(item, fn);
                }
                else if (isObj(item)) {
                    _this.$off(item.event, item.fn);
                }
            });
            return this;
        }
        if (!this._events[event])
            { return this; }
        if (!fn) {
            this._events[event] = null;
            return this;
        }
        if (fn) {
            var fns = this._events[event];
            var i = fns.length;
            while (i--) {
                var tmp = fns[i];
                if (tmp === fn || tmp.fn === fn) {
                    fns.splice(i, 1);
                    break;
                }
            }
        }
        return this;
    };
    Base.prototype.$emit = function (event) {
        var _this = this;
        var lowerCaseEvent = event.toLowerCase();
        var fns = this._events[event] || [];
        var args = toArray(arguments, 1);
        fns.forEach(function (fn) {
            try {
                fn.apply(_this, args);
            }
            catch (e) {
                // handleError(e, vm, `event handler for "${event}"`);
            }
        });
        return this;
    };
    return Base;
}());

var tmp = {};
var pixelRatio = getDevice().pixelRatio;
var DEFAULT = {
    id: {
        default: 'cropper',
        get: function () {
            return tmp.id;
        },
        set: function (value) {
            if (typeof (value) !== 'string') {
                console.error("id\uFF1A" + value + " is invalid");
            }
            tmp.id = value;
        }
    },
    width: {
        default: 750,
        get: function () {
            return tmp.width;
        },
        set: function (value) {
            if (typeof (value) !== 'number') {
                console.error("width\uFF1A" + value + " is invalid");
            }
            tmp.width = value;
        }
    },
    height: {
        default: 750,
        get: function () {
            return tmp.height;
        },
        set: function (value) {
            if (typeof (value) !== 'number') {
                console.error("height\uFF1A" + value + " is invalid");
            }
            tmp.height = value;
        }
    },
    pixelRatio: {
        default: pixelRatio,
        get: function () {
            return tmp.pixelRatio;
        },
        set: function (value) {
            if (typeof (value) !== 'number') {
                console.error("pixelRatio\uFF1A" + value + " is invalid");
            }
            tmp.pixelRatio = value;
        }
    },
    scale: {
        default: 2.5,
        get: function () {
            return tmp.scale;
        },
        set: function (value) {
            if (typeof (value) !== 'number') {
                console.error("scale\uFF1A" + value + " is invalid");
            }
            tmp.scale = value;
        }
    },
    zoom: {
        default: 5,
        get: function () {
            return tmp.zoom;
        },
        set: function (value) {
            if (typeof (value) !== 'number') {
                console.error("zoom\uFF1A" + value + " is invalid");
            }
            else if (value < 0 || value > 10) {
                console.error("zoom should be ranged in 0 ~ 10");
            }
            tmp.zoom = value;
        }
    },
    src: {
        default: '',
        get: function () {
            return tmp.src;
        },
        set: function (value) {
            if (typeof (value) !== 'string') {
                console.error("src\uFF1A" + value + " is invalid");
            }
            tmp.src = value;
        }
    },
    cut: {
        default: {},
        get: function () {
            return tmp.cut;
        },
        set: function (value) {
            if (typeof (value) !== 'object') {
                console.error("cut\uFF1A" + value + " is invalid");
            }
            tmp.cut = value;
        }
    },
    boundStyle: {
        default: {},
        get: function () {
            return tmp.boundStyle;
        },
        set: function (value) {
            if (typeof (value) !== 'object') {
                console.error("boundStyle\uFF1A" + value + " is invalid");
            }
            tmp.boundStyle = value;
        }
    },
    onReady: {
        default: null,
        get: function () {
            return tmp.ready;
        },
        set: function (value) {
            tmp.ready = value;
        }
    },
    onBeforeImageLoad: {
        default: null,
        get: function () {
            return tmp.beforeImageLoad;
        },
        set: function (value) {
            tmp.beforeImageLoad = value;
        }
    },
    onImageLoad: {
        default: null,
        get: function () {
            return tmp.imageLoad;
        },
        set: function (value) {
            tmp.imageLoad = value;
        }
    },
    onBeforeDraw: {
        default: null,
        get: function () {
            return tmp.beforeDraw;
        },
        set: function (value) {
            tmp.beforeDraw = value;
        }
    }
};

var windowWidth = getDevice().windowWidth;
function prepare(vm) {
    // v1.4.0 版本中将不再自动绑定we-cropper实例
    vm.attachPage = function () {
        var pages = getCurrentPages();
        // 获取到当前page上下文
        var pageContext = pages[pages.length - 1];
        // 把this依附在Page上下文的wecropper属性上，便于在page钩子函数中访问
        Object.defineProperty(pageContext, 'wecropper', {
            get: function () {
                console.warn('Instance will not be automatically bound to the page after v1.4.0\n\n' +
                    'Please use a custom instance name instead\n\n' +
                    'Example: \n' +
                    'this.mycropper = new WeCropper(options)\n\n' +
                    '// ...\n' +
                    'this.mycropper.getCropperImage()');
                return vm;
            }
        });
    };
    vm.createCtx = function () {
        var id = vm.id, targetId = vm.targetId;
        if (id) {
            vm.ctx = vm.ctx || wx.createCanvasContext(id);
            vm.targetCtx = vm.targetCtx || wx.createCanvasContext(targetId);
        }
        else {
            console.error("constructor: create canvas context failed, 'id' must be valuable");
        }
    };
    vm.deviceRadio = windowWidth / 750;
    vm.attachPage();
    vm.createCtx();
}

function wxPromise(fn) {
    return function (obj) {
        if (obj === void 0) { obj = {}; }
        return new Promise(function (resolve, reject) {
            obj.success = function (res) {
                resolve(res);
            };
            obj.fail = function (err) {
                reject(err);
            };
            fn(obj);
        });
    };
}
function draw(ctx, reserve) {
    if (reserve === void 0) { reserve = false; }
    return new Promise(function (resolve) {
        ctx.draw(reserve, resolve);
    });
}
var getImageInfo = wxPromise(wx.getImageInfo);
var canvasToTempFilePath = wxPromise(wx.canvasToTempFilePath);

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var base64 = createCommonjsModule(function (module, exports) {
/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
(function(root) {

	// Detect free variables `exports`.
	var freeExports = 'object' == 'object' && exports;

	// Detect free variable `module`.
	var freeModule = 'object' == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code, and use
	// it as `root`.
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var InvalidCharacterError = function(message) {
		this.message = message;
	};
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	var error = function(message) {
		// Note: the error messages used throughout this file match those used by
		// the native `atob`/`btoa` implementation in Chromium.
		throw new InvalidCharacterError(message);
	};

	var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// http://whatwg.org/html/common-microsyntaxes.html#space-character
	var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

	// `decode` is designed to be fully compatible with `atob` as described in the
	// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
	// The optimized base64-decoding algorithm used is based on @atk’s excellent
	// implementation. https://gist.github.com/atk/1020396
	var decode = function(input) {
		input = String(input)
			.replace(REGEX_SPACE_CHARACTERS, '');
		var length = input.length;
		if (length % 4 == 0) {
			input = input.replace(/==?$/, '');
			length = input.length;
		}
		if (
			length % 4 == 1 ||
			// http://whatwg.org/C#alphanumeric-ascii-characters
			/[^+a-zA-Z0-9/]/.test(input)
		) {
			error(
				'Invalid character: the string to be decoded is not correctly encoded.'
			);
		}
		var bitCounter = 0;
		var bitStorage;
		var buffer;
		var output = '';
		var position = -1;
		while (++position < length) {
			buffer = TABLE.indexOf(input.charAt(position));
			bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
			// Unless this is the first of a group of 4 characters…
			if (bitCounter++ % 4) {
				// …convert the first 8 bits to a single ASCII character.
				output += String.fromCharCode(
					0xFF & bitStorage >> (-2 * bitCounter & 6)
				);
			}
		}
		return output;
	};

	// `encode` is designed to be fully compatible with `btoa` as described in the
	// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
	var encode = function(input) {
		input = String(input);
		if (/[^\0-\xFF]/.test(input)) {
			// Note: no need to special-case astral symbols here, as surrogates are
			// matched, and the input is supposed to only contain ASCII anyway.
			error(
				'The string to be encoded contains characters outside of the ' +
				'Latin1 range.'
			);
		}
		var padding = input.length % 3;
		var output = '';
		var position = -1;
		var a;
		var b;
		var c;
		var buffer;
		// Make sure any padding is handled outside of the loop.
		var length = input.length - padding;

		while (++position < length) {
			// Read three bytes, i.e. 24 bits.
			a = input.charCodeAt(position) << 16;
			b = input.charCodeAt(++position) << 8;
			c = input.charCodeAt(++position);
			buffer = a + b + c;
			// Turn the 24 bits into four chunks of 6 bits each, and append the
			// matching character for each of them to the output.
			output += (
				TABLE.charAt(buffer >> 18 & 0x3F) +
				TABLE.charAt(buffer >> 12 & 0x3F) +
				TABLE.charAt(buffer >> 6 & 0x3F) +
				TABLE.charAt(buffer & 0x3F)
			);
		}

		if (padding == 2) {
			a = input.charCodeAt(position) << 8;
			b = input.charCodeAt(++position);
			buffer = a + b;
			output += (
				TABLE.charAt(buffer >> 10) +
				TABLE.charAt((buffer >> 4) & 0x3F) +
				TABLE.charAt((buffer << 2) & 0x3F) +
				'='
			);
		} else if (padding == 1) {
			buffer = input.charCodeAt(position);
			output += (
				TABLE.charAt(buffer >> 2) +
				TABLE.charAt((buffer << 4) & 0x3F) +
				'=='
			);
		}

		return output;
	};

	var base64 = {
		'encode': encode,
		'decode': decode,
		'version': '0.1.0'
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof undefined == 'function' &&
		typeof undefined.amd == 'object' &&
		undefined.amd
	) {
		undefined(function() {
			return base64;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = base64;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (var key in base64) {
				base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.base64 = base64;
	}

}(commonjsGlobal));
});

function makeURI(strData, type) {
    return 'data:' + type + ';base64,' + strData;
}
function fixType(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    var r = type.match(/png|jpeg|bmp|gif/)[0];
    return 'image/' + r;
}
function encodeData(data) {
    var str = '';
    if (typeof data === 'string') {
        str = data;
    }
    else {
        for (var i = 0; i < data.length; i++) {
            str += String.fromCharCode(data[i]);
        }
    }
    return base64.encode(str);
}
/**
 * 获取图像区域隐含的像素数据
 * @param canvasId canvas标识
 * @param x 将要被提取的图像数据矩形区域的左上角 x 坐标
 * @param y 将要被提取的图像数据矩形区域的左上角 y 坐标
 * @param width 将要被提取的图像数据矩形区域的宽度
 * @param height 将要被提取的图像数据矩形区域的高度
 * @param done 完成回调
 */
function getImageData(canvasId, x, y, width, height, done) {
    wx.canvasGetImageData({
        canvasId: canvasId,
        x: x,
        y: y,
        width: width,
        height: height,
        success: function (res) {
            done(res);
        },
        fail: function (res) {
            done(null);
            console.error('canvasGetImageData error: ' + res);
        }
    });
}
/**
 * 生成bmp格式图片
 * 按照规则生成图片响应头和响应体
 * @param oData 用来描述 canvas 区域隐含的像素数据 { data, width, height } = oData
 * @returns {*} base64字符串
 */
function genBitmapImage(oData) {
    //
    // BITMAPFILEHEADER: http://msdn.microsoft.com/en-us/library/windows/desktop/dd183374(v=vs.85).aspx
    // BITMAPINFOHEADER: http://msdn.microsoft.com/en-us/library/dd183376.aspx
    //
    var biWidth = oData.width;
    var biHeight = oData.height;
    var biSizeImage = biWidth * biHeight * 3;
    var bfSize = biSizeImage + 54; // total header size = 54 bytes
    //
    //  typedef struct tagBITMAPFILEHEADER {
    //  	WORD bfType;
    //  	DWORD bfSize;
    //  	WORD bfReserved1;
    //  	WORD bfReserved2;
    //  	DWORD bfOffBits;
    //  } BITMAPFILEHEADER;
    //
    var BITMAPFILEHEADER = [
        // WORD bfType -- The file type signature; must be "BM"
        0x42, 0x4D,
        // DWORD bfSize -- The size, in bytes, of the bitmap file
        bfSize & 0xff, bfSize >> 8 & 0xff, bfSize >> 16 & 0xff, bfSize >> 24 & 0xff,
        // WORD bfReserved1 -- Reserved; must be zero
        0, 0,
        // WORD bfReserved2 -- Reserved; must be zero
        0, 0,
        // DWORD bfOffBits -- The offset, in bytes, from the beginning of the BITMAPFILEHEADER structure to the bitmap bits.
        54, 0, 0, 0
    ];
    //
    //  typedef struct tagBITMAPINFOHEADER {
    //  	DWORD biSize;
    //  	LONG  biWidth;
    //  	LONG  biHeight;
    //  	WORD  biPlanes;
    //  	WORD  biBitCount;
    //  	DWORD biCompression;
    //  	DWORD biSizeImage;
    //  	LONG  biXPelsPerMeter;
    //  	LONG  biYPelsPerMeter;
    //  	DWORD biClrUsed;
    //  	DWORD biClrImportant;
    //  } BITMAPINFOHEADER, *PBITMAPINFOHEADER;
    //
    var BITMAPINFOHEADER = [
        // DWORD biSize -- The number of bytes required by the structure
        40, 0, 0, 0,
        // LONG biWidth -- The width of the bitmap, in pixels
        biWidth & 0xff, biWidth >> 8 & 0xff, biWidth >> 16 & 0xff, biWidth >> 24 & 0xff,
        // LONG biHeight -- The height of the bitmap, in pixels
        biHeight & 0xff, biHeight >> 8 & 0xff, biHeight >> 16 & 0xff, biHeight >> 24 & 0xff,
        // WORD biPlanes -- The number of planes for the target device. This value must be set to 1
        1, 0,
        // WORD biBitCount -- The number of bits-per-pixel, 24 bits-per-pixel -- the bitmap
        // has a maximum of 2^24 colors (16777216, Truecolor)
        24, 0,
        // DWORD biCompression -- The type of compression, BI_RGB (code 0) -- uncompressed
        0, 0, 0, 0,
        // DWORD biSizeImage -- The size, in bytes, of the image. This may be set to zero for BI_RGB bitmaps
        biSizeImage & 0xff, biSizeImage >> 8 & 0xff, biSizeImage >> 16 & 0xff, biSizeImage >> 24 & 0xff,
        // LONG biXPelsPerMeter, unused
        0, 0, 0, 0,
        // LONG biYPelsPerMeter, unused
        0, 0, 0, 0,
        // DWORD biClrUsed, the number of color indexes of palette, unused
        0, 0, 0, 0,
        // DWORD biClrImportant, unused
        0, 0, 0, 0
    ];
    var iPadding = (4 - ((biWidth * 3) % 4)) % 4;
    var aImgData = oData.data;
    var strPixelData = '';
    var biWidth4 = biWidth << 2;
    var y = biHeight;
    var fromCharCode = String.fromCharCode;
    do {
        var iOffsetY = biWidth4 * (y - 1);
        var strPixelRow = '';
        for (var x = 0; x < biWidth; x++) {
            var iOffsetX = x << 2;
            strPixelRow += fromCharCode(aImgData[iOffsetY + iOffsetX + 2]) +
                fromCharCode(aImgData[iOffsetY + iOffsetX + 1]) +
                fromCharCode(aImgData[iOffsetY + iOffsetX]);
        }
        for (var c = 0; c < iPadding; c++) {
            strPixelRow += String.fromCharCode(0);
        }
        strPixelData += strPixelRow;
    } while (--y);
    var strEncoded = encodeData(BITMAPFILEHEADER.concat(BITMAPINFOHEADER)) + encodeData(strPixelData);
    return strEncoded;
}
/**
 * 转换为图片base64
 * @param canvasId canvas标识
 * @param x 将要被提取的图像数据矩形区域的左上角 x 坐标
 * @param y 将要被提取的图像数据矩形区域的左上角 y 坐标
 * @param width 将要被提取的图像数据矩形区域的宽度
 * @param height 将要被提取的图像数据矩形区域的高度
 * @param type 转换图片类型
 * @param done 完成回调
 */
function convertToImage(canvasId, x, y, width, height, type, done) {
    if (done === void 0) { done = function () { }; }
    if (type === undefined) {
        type = 'png';
    }
    type = fixType(type);
    if (/bmp/.test(type)) {
        getImageData(canvasId, x, y, width, height, function (data) {
            var strData = genBitmapImage(data);
            isFunc(done) && done(makeURI(strData, 'image/' + type));
        });
    }
    else {
        console.error('暂不支持生成\'' + type + '\'类型的base64图片');
    }
}
var CanvasToBase64 = {
    convertToImage: convertToImage,
    // convertToPNG: function (width, height, done) {
    //   return convertToImage(width, height, 'png', done)
    // },
    // convertToJPEG: function (width, height, done) {
    //   return convertToImage(width, height, 'jpeg', done)
    // },
    // convertToGIF: function (width, height, done) {
    //   return convertToImage(width, height, 'gif', done)
    // },
    convertToBMP: function (_a, done) {
        var _b = _a === void 0 ? {} : _a, canvasId = _b.canvasId, x = _b.x, y = _b.y, width = _b.width, height = _b.height;
        if (done === void 0) { done = function () { }; }
        return convertToImage(canvasId, x, y, width, height, 'bmp', done);
    }
};

/**
 * 获取最新缩放值
 * @param oldScale 上一次触摸结束后的缩放值
 * @param oldDistance 上一次触摸结束后的双指距离
 * @param zoom 缩放系数
 * @param touch0 第一指touch对象
 * @param touch1 第二指touch对象
 * @returns {*}
 */
var getNewScale = function (oldScale, oldDistance, zoom, touch0, touch1) {
    var xMove;
    var yMove;
    var newDistance;
    // 计算二指最新距离
    xMove = Math.round(touch1.x - touch0.x);
    yMove = Math.round(touch1.y - touch0.y);
    newDistance = Math.round(Math.sqrt(xMove * xMove + yMove * yMove));
    return oldScale + 0.001 * zoom * (newDistance - oldDistance);
};

function update(vm) {
    if (!vm.src)
        { return; }
    vm.__oneTouchStart = function (touch) {
        vm.touchX0 = Math.round(touch.x);
        vm.touchY0 = Math.round(touch.y);
    };
    vm.__oneTouchMove = function (touch) {
        var xMove, yMove;
        // 计算单指移动的距离
        if (vm.touchended) {
            return vm.updateCanvas();
        }
        xMove = Math.round(touch.x - vm.touchX0);
        yMove = Math.round(touch.y - vm.touchY0);
        var imgLeft = Math.round(vm.rectX + xMove);
        var imgTop = Math.round(vm.rectY + yMove);
        vm.outsideBound(imgLeft, imgTop);
        vm.updateCanvas();
    };
    vm.__twoTouchStart = function (touch0, touch1) {
        var xMove, yMove, oldDistance;
        vm.touchX1 = Math.round(vm.rectX + vm.scaleWidth / 2);
        vm.touchY1 = Math.round(vm.rectY + vm.scaleHeight / 2);
        // 计算两指距离
        xMove = Math.round(touch1.x - touch0.x);
        yMove = Math.round(touch1.y - touch0.y);
        oldDistance = Math.round(Math.sqrt(xMove * xMove + yMove * yMove));
        vm.oldDistance = oldDistance;
    };
    vm.__twoTouchMove = function (touch0, touch1) {
        var oldScale = vm.oldScale, oldDistance = vm.oldDistance, scale = vm.scale, zoom = vm.zoom;
        vm.newScale = getNewScale(oldScale, oldDistance, zoom, touch0, touch1);
        //  设定缩放范围
        vm.newScale <= 1 && (vm.newScale = 1);
        vm.newScale >= scale && (vm.newScale = scale);
        vm.scaleWidth = Math.round(vm.newScale * vm.baseWidth);
        vm.scaleHeight = Math.round(vm.newScale * vm.baseHeight);
        var imgLeft = Math.round(vm.touchX1 - vm.scaleWidth / 2);
        var imgTop = Math.round(vm.touchY1 - vm.scaleHeight / 2);
        vm.outsideBound(imgLeft, imgTop);
        vm.updateCanvas();
    };
    vm.__xtouchEnd = function () {
        vm.oldScale = vm.newScale;
        vm.rectX = vm.imgLeft;
        vm.rectY = vm.imgTop;
    };
}

function methods(vm) {
    var boundWidth = vm.width; // 裁剪框默认宽度，即整个画布宽度
    var boundHeight = vm.height; // 裁剪框默认高度，即整个画布高度
    var id = vm.id, targetId = vm.targetId, pixelRatio = vm.pixelRatio;
    var _a = vm.cut, _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.width, width = _d === void 0 ? boundWidth : _d, _e = _a.height, height = _e === void 0 ? boundHeight : _e;
    vm.updateCanvas = function (done) {
        if (vm.croperTarget) {
            //  画布绘制图片
            vm.ctx.drawImage(vm.croperTarget, vm.imgLeft, vm.imgTop, vm.scaleWidth, vm.scaleHeight);
        }
        vm.$emit('beforeDraw');
        vm.setBoundStyle(vm.boundStyle); //	设置边界样式
        vm.ctx.draw(false, done);
        return vm;
    };
    vm.pushOrign = function (src) {
        vm.src = src;
        vm.$emit('beforeImageLoad');
        return getImageInfo({ src: src })
            .then(function (res) {
            var innerAspectRadio = res.width / res.height;
            var customAspectRadio = width / height;
            vm.croperTarget = res.path;
            if (innerAspectRadio < customAspectRadio) {
                vm.rectX = x;
                vm.baseWidth = width;
                vm.baseHeight = width / innerAspectRadio;
                vm.rectY = y - Math.abs((height - vm.baseHeight) / 2);
            }
            else {
                vm.rectY = y;
                vm.baseWidth = height * innerAspectRadio;
                vm.baseHeight = height;
                vm.rectX = x - Math.abs((width - vm.baseWidth) / 2);
            }
            vm.imgLeft = vm.rectX;
            vm.imgTop = vm.rectY;
            vm.scaleWidth = vm.baseWidth;
            vm.scaleHeight = vm.baseHeight;
            update(vm);
            return new Promise(function (resolve) {
                vm.updateCanvas(resolve);
            });
        })
            .then(function () {
            isFunc(vm.onImageLoad) && vm.onImageLoad(vm.ctx, vm);
        });
    };
    vm.getCropperBase64 = function (done) {
        if (done === void 0) { done = function () { }; }
        CanvasToBase64.convertToBMP({
            canvasId: id,
            x: x,
            y: y,
            width: width,
            height: height
        }, done);
    };
    vm.getCropperImage = function () {
        var arguments$1 = arguments;

        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments$1[_i];
        }
        var customOptions = args[0];
        var fn = args[args.length - 1];
        var canvasOptions = {
            canvasId: id,
            x: x,
            y: y,
            width: width,
            height: height
        };
        var task = function () { return Promise.resolve(); };
        if (isPlainObject(customOptions) &&
            customOptions.original) {
            // original mode
            task = function () {
                vm.targetCtx.drawImage(vm.croperTarget, vm.imgLeft * pixelRatio, vm.imgTop * pixelRatio, vm.scaleWidth * pixelRatio, vm.scaleHeight * pixelRatio);
                canvasOptions = {
                    canvasId: targetId,
                    x: x * pixelRatio,
                    y: y * pixelRatio,
                    width: width * pixelRatio,
                    height: height * pixelRatio
                };
                return draw(vm.targetCtx);
            };
        }
        return task()
            .then(function () {
            if (isPlainObject(customOptions)) {
                canvasOptions = Object.assign({}, canvasOptions, customOptions);
            }
            return canvasToTempFilePath(canvasOptions);
        })
            .then(function (res) {
            var tempFilePath = res.tempFilePath;
            isFunc(fn) && fn.call(vm, tempFilePath);
            return tempFilePath;
        })
            .catch(function () {
            isFunc(fn) && fn.call(vm, null);
        });
    };
}

function cut(vm) {
    var boundWidth = vm.width; // 裁剪框默认宽度，即整个画布宽度
    var boundHeight = vm.height;
    // 裁剪框默认高度，即整个画布高度
    var _a = vm.cut, _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.width, width = _d === void 0 ? boundWidth : _d, _e = _a.height, height = _e === void 0 ? boundHeight : _e;
    /**
       * 设置边界
       * @param imgLeft 图片左上角横坐标值
       * @param imgTop 图片左上角纵坐标值
       */
    vm.outsideBound = function (imgLeft, imgTop) {
        vm.imgLeft = imgLeft >= x
            ? x
            : vm.scaleWidth + imgLeft - x <= width
                ? x + width - vm.scaleWidth
                : imgLeft;
        vm.imgTop = imgTop >= y
            ? y
            : vm.scaleHeight + imgTop - y <= height
                ? y + height - vm.scaleHeight
                : imgTop;
    };
    /**
       * 设置边界样式
       * @param color	边界颜色
       */
    vm.setBoundStyle = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.color, color = _c === void 0 ? '#04b00f' : _c, _d = _b.mask, mask = _d === void 0 ? 'rgba(0, 0, 0, 0.3)' : _d, _e = _b.lineWidth, lineWidth = _e === void 0 ? 1 : _e;
        var boundOption = [
            {
                start: { x: x - lineWidth, y: y + 10 - lineWidth },
                step1: { x: x - lineWidth, y: y - lineWidth },
                step2: { x: x + 10 - lineWidth, y: y - lineWidth }
            },
            {
                start: { x: x - lineWidth, y: y + height - 10 + lineWidth },
                step1: { x: x - lineWidth, y: y + height + lineWidth },
                step2: { x: x + 10 - lineWidth, y: y + height + lineWidth }
            },
            {
                start: { x: x + width - 10 + lineWidth, y: y - lineWidth },
                step1: { x: x + width + lineWidth, y: y - lineWidth },
                step2: { x: x + width + lineWidth, y: y + 10 - lineWidth }
            },
            {
                start: { x: x + width + lineWidth, y: y + height - 10 + lineWidth },
                step1: { x: x + width + lineWidth, y: y + height + lineWidth },
                step2: { x: x + width - 10 + lineWidth, y: y + height + lineWidth }
            }
        ];
        // 绘制半透明层
        vm.ctx.beginPath();
        vm.ctx.setFillStyle(mask);
        vm.ctx.fillRect(0, 0, x, boundHeight);
        vm.ctx.fillRect(x, 0, width, y);
        vm.ctx.fillRect(x, y + height, width, boundHeight - y - height);
        vm.ctx.fillRect(x + width, 0, boundWidth - x - width, boundHeight);
        vm.ctx.fill();
        boundOption.forEach(function (op) {
            vm.ctx.beginPath();
            vm.ctx.setStrokeStyle(color);
            vm.ctx.setLineWidth(lineWidth);
            vm.ctx.moveTo(op.start.x, op.start.y);
            vm.ctx.lineTo(op.step1.x, op.step1.y);
            vm.ctx.lineTo(op.step2.x, op.step2.y);
            vm.ctx.stroke();
        });
    };
}

var version = "1.3.4";

var WeCropper = /** @class */ (function (_super) {
    __extends(WeCropper, _super);
    function WeCropper(params) {
        var _this = _super.call(this) || this;
        /**
         * public
         */
        _this.version = version;
        var self = _this;
        var _default = {};
        validator(self, DEFAULT);
        Object.keys(DEFAULT).forEach(function (key) {
            _default[key] = DEFAULT[key].default;
        });
        Object.assign(self, _default, params);
        prepare(self);
        cut(self);
        methods(self);
        self.init();
        update(self);
        return self;
    }
    WeCropper.prototype.init = function () {
        var self = this;
        var src = self.src;
        self.$emit('ready');
        if (src) {
            self.pushOrign(src);
        }
        else {
            self.updateCanvas();
        }
        setTouchState(self, false, false, false);
        self.oldScale = 1;
        self.newScale = 1;
        return self;
    };
    //  图片手势初始监测
    WeCropper.prototype.touchStart = function (e) {
        var self = this;
        var _a = e.touches, touch0 = _a[0], touch1 = _a[1];
        if (!self.src)
            { return; }
        setTouchState(self, true, null, null);
        // 计算第一个触摸点的位置，并参照改点进行缩放
        self.__oneTouchStart(touch0);
        // 两指手势触发
        if (e.touches.length >= 2) {
            self.__twoTouchStart(touch0, touch1);
        }
    };
    //  图片手势动态缩放
    WeCropper.prototype.touchMove = function (e) {
        var self = this;
        var _a = e.touches, touch0 = _a[0], touch1 = _a[1];
        if (!self.src)
            { return; }
        setTouchState(self, null, true);
        // 单指手势时触发
        if (e.touches.length === 1) {
            self.__oneTouchMove(touch0);
        }
        // 两指手势触发
        if (e.touches.length >= 2) {
            self.__twoTouchMove(touch0, touch1);
        }
    };
    WeCropper.prototype.touchEnd = function (e) {
        var self = this;
        if (!self.src)
            { return; }
        setTouchState(self, false, false, true);
        self.__xtouchEnd();
    };
    return WeCropper;
}(Base));

return WeCropper;

})));
