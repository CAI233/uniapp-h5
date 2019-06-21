(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime-module.js");


/***/ }),

/***/ "./node_modules/@dcloudio/uni-app-plus/dist/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-app-plus/dist/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createPage = createPage;exports.createComponent = createComponent;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var SYNC_API_RE = /^\$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {params[_key - 1] = arguments[_key];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api.apply(void 0, [options].concat(params));
    }
    return handlePromise(new Promise(function (resolve, reject) {
      api.apply(void 0, [Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    }));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var protocols = {};
var todos = [];
var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("app-plus ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("app-plus \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}



var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


function wrapper$1(webview) {
  webview.$processed = true;

  webview.postMessage = function (data) {
    plus.webview.postMessageToUniNView({
      type: 'UniAppSubNVue',
      data: data },
    webview.id);
  };
  var callbacks = [];
  webview.onMessage = function (callback) {
    callbacks.push(callback);
  };
  webview.$consumeMessage = function (e) {
    callbacks.forEach(function (callback) {return callback(e);});
  };

  if (!webview.__uniapp_mask_id) {
    return;
  }
  var maskColor = webview.__uniapp_mask;
  var maskWebview = plus.webview.getWebviewById(webview.__uniapp_mask_id);
  maskWebview = maskWebview.parent() || maskWebview; // 再次检测父
  var oldShow = webview.show;
  var oldHide = webview.hide;
  var oldClose = webview.close;

  var showMask = function showMask() {
    maskWebview.setStyle({
      mask: maskColor });

  };
  var closeMask = function closeMask() {
    maskWebview.setStyle({
      mask: 'none' });

  };
  webview.show = function () {
    showMask();for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {args[_key2] = arguments[_key2];}
    return oldShow.apply(webview, args);
  };
  webview.hide = function () {
    closeMask();for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}
    return oldHide.apply(webview, args);
  };
  webview.close = function () {
    closeMask();
    callbacks = [];for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
    return oldClose.apply(webview, args);
  };
}

function getSubNVueById(id) {
  var webview = plus.webview.getWebviewById(id);
  if (webview && !webview.$processed) {
    wrapper$1(webview);
  }
  return webview;
}

function requireNativePlugin(pluginName) {
  /* eslint-disable no-undef */
  if (typeof weex !== 'undefined') {
    return weex.requireModule(pluginName);
  }
  /* eslint-disable no-undef */
  return __requireNativePlugin__(pluginName);
}

var api = /*#__PURE__*/Object.freeze({
  requireNativePlugin: requireNativePlugin,
  getSubNVueById: getSubNVueById });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {args[_key5 - 1] = arguments[_key5];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function initHooks(mpOptions, hooks) {
  hooks.forEach(function (hook) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  });
}

function initVueComponent(Vue$$1, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue$$1.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"app-plus","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = String;
          vueProps['value'] = null;
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type, value, file);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts, null, file);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$2(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *'test'
                                                  */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$2(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var eventOpts = (event.currentTarget || event.target).dataset.eventOpts;
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName));

        }
      });
    }
  });
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref2)


{var mocks = _ref2.mocks,initRefs = _ref2.initRefs;
  _vue.default.prototype.mpHost = "app-plus";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref3 =



  event.detail || event.value,vuePid = _ref3.vuePid,vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

var hooks$1 = [
'onUniNViewMessage'];


function parseApp$1(vm) {
  var appOptions = parseApp(vm);

  initHooks(appOptions, hooks$1);

  return appOptions;
}

function createApp(vm) {
  App(parseApp$1(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage$$1 = _ref4.isPage,initRelation$$1 = _ref4.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage$$1.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation$$1.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (isPage$$1) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function parseComponent$1(vueComponentOptions) {
  var componentOptions = parseComponent(vueComponentOptions);

  componentOptions.methods.$getAppWebview = function () {
    return plus.webview.getWebviewById("".concat(this.__wxWebviewId__));
  };
  return componentOptions;
}

var hooks$2 = [
'onShow',
'onHide',
'onUnload'];


hooks$2.push.apply(hooks$2, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref5)


{var isPage = _ref5.isPage,initRelation = _ref5.initRelation;
  var pageOptions = parseComponent$1(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });


  initHooks(pageOptions.methods, hooks$2);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$3 = [
'onBackPress',
'onNavigationBarButtonTap',
'onNavigationBarSearchInputChanged',
'onNavigationBarSearchInputConfirmed',
'onNavigationBarSearchInputClicked'];


function parsePage$1(vuePageOptions) {
  var pageOptions = parsePage(vuePageOptions);

  initHooks(pageOptions.methods, hooks$3);

  return pageOptions;
}

function createPage(vuePageOptions) {
  {
    return Component(parsePage$1(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent$1(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (name === 'upx2px') {
        return upx2px;
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    } });

} else {
  uni.upx2px = upx2px;

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

{
  if (typeof global !== 'undefined') {
    global.UniEmitter = eventApi;
  }
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(vm._getFormData || (vm.$parent && vm.$parent.__next_tick_pending)){
              return
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"app-plus","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"app-plus","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"app-plus","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
    // 确保当前 vm 所有数据被同步
    var dataKeys = [].concat(
        Object.keys(vm._data || {}),
        Object.keys(vm._computedWatchers || {}));

    var ret = dataKeys.reduce(function(ret, key) {
        ret[key] = vm[key];
        return ret
    }, Object.create(null));
    //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
    Object.assign(ret, vm.$mp.data || {});
    if (
        Array.isArray(vm.$options.behaviors) &&
        vm.$options.behaviors.indexOf('uni://form-field') !== -1
    ) { //form-field
        ret['name'] = vm.name;
        ret['value'] = vm.value;
    }
    return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
    var this$1 = this;

    if (vnode === null) { //destroy
        return
    }
    if (this.mpType === 'page' || this.mpType === 'component') {
        var mpInstance = this.$scope;
        var data = cloneWithData(this);
        data.__webviewId__ = mpInstance.data.__webviewId__;
        var mpData = Object.create(null);
        Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
            mpData[key] = mpInstance.data[key];
        });
        var diffData = diff(data, mpData);
        if (Object.keys(diffData).length) {
            if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"app-plus","BASE_URL":"/"}).VUE_APP_DEBUG) {
                console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
                    ']差量更新',
                    JSON.stringify(diffData));
            }
            this.__next_tick_pending = true;
            mpInstance.setData(diffData, function () {
                this$1.__next_tick_pending = false;
                flushCallbacks$1(this$1);
            });
        } else {
            flushCallbacks$1(this);
        }
    }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
    var parts = path.split('.');
    var key = parts[0];
    if (key.indexOf('__$n') === 0) { //number index
        key = parseInt(key.replace('__$n', ''));
    }
    if (parts.length === 1) {
        return obj[key]
    }
    return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

    var oldEmit = Vue.prototype.$emit;

    Vue.prototype.$emit = function(event) {
        if (this.$scope && event) {
            this.$scope['triggerEvent'](event, {
                __args__: toArray(arguments, 1)
            });
        }
        return oldEmit.apply(this, arguments)
    };
    
    Vue.prototype.$nextTick = function (fn) {
      return nextTick$1(this, fn)
    };

    MP_METHODS.forEach(function (method) {
        Vue.prototype[method] = function(args) {
            if (this.$scope) {
                return this.$scope[method](args)
            }
        };
    });

    Vue.prototype.__init_provide = initProvide;

    Vue.prototype.__init_injections = initInjections;

    Vue.prototype.__call_hook = function(hook, args) {
        var vm = this;
        // #7573 disable dep collection when invoking lifecycle hooks
        pushTarget();
        var handlers = vm.$options[hook];
        var info = hook + " hook";
        var ret;
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit('hook:' + hook);
        }
        popTarget();
        return ret
    };

    Vue.prototype.__set_model = function(target, key, value, modifiers) {
        if (Array.isArray(modifiers)) {
            if (modifiers.indexOf('trim') !== -1) {
                value = value.trim();
            }
            if (modifiers.indexOf('number') !== -1) {
                value = this._n(value);
            }
        }
        if(!target){
            target = this;
        }
        target[key] = value;
    };

    Vue.prototype.__set_sync = function(target, key, value) {
        if(!target){
            target = this;
        }
        target[key] = value;
    };

    Vue.prototype.__get_orig = function(item) {
        if (isPlainObject(item)) {
            return item['$orig'] || item
        }
        return item
    };

    Vue.prototype.__get_value = function(dataPath, target) {
        return getTarget(target || this, dataPath)
    };


    Vue.prototype.__get_class = function(dynamicClass, staticClass) {
        return renderClass(staticClass, dynamicClass)
    };

    Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
        if (!dynamicStyle && !staticStyle) {
            return ''
        }
        var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
        var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
        return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
    };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime-module.js":
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ "./node_modules/regenerator-runtime/runtime.js");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vuex/dist/vuex.esm.js":
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\api\\http.js":
/*!***************************************************************************!*\
  !*** C:/Users/120412/Documents/HBuilderProjects/hello-uniapp/api/http.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _store = _interopRequireDefault(__webpack_require__(/*! @/store */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\store\\index.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
function HTTP(obj, config) {

  var defaultConfig = {
    isRes: false,
    loading: false };


  config = _objectSpread({}, defaultConfig,
  config);


  // 如果需要显示loading,mask防止点击穿透
  config.loading && uni.showLoading({
    title: '加载中',
    mask: true });


  return new Promise(function (resolve, reject) {

    var options = {
      url: "",
      data: {},
      dataType: "json",
      header: {},
      success: function success(res) {
        // console.log("HTTP请求结果：",res)
        uni.hideLoading();
        // 状态码为200
        if (res.statusCode == 200) {

          var data = res.data;

          data = typeof data == 'object' ? data : JSON.parse(data);
          // console.log(data)
          // console.log(typeof(data));
          //自动校验用户是否登录过期
          if (data.code == "01") {
            _store.default.dispatch("reLogin");
            return;
          }

          //返回 { code:10000,msg:"消息",data:[] }
          if (config.isRes) {
            resolve(data);
          }
          // 返回 data:[]
          else {
              if (data.code == 200) {
                resolve(data || true);
              } else {
                uni.showToast({
                  title: data.details ? data.details : data.message,
                  duration: 1500,
                  mask: false,
                  icon: 'none' });

                reject(data.details ? data.details : data.message);
              }
            }
        } else {
          reject("HTTP:状态码异常！");
        }
      },
      fail: function fail(err) {
        uni.hideLoading();
        uni.showToast({
          title: "网络异常，请稍后再试!",
          icon: "none" });

        reject("网络异常，请稍后再试!");
      },
      complete: function complete() {} };

    options = _objectSpread({}, options,
    obj);

    if (options.url && options.method) {
      wx.request(options);
    } else {
      wx.showToast({
        title: 'HTTP：缺失参数',
        icon: "none",
        duration: 2000 });

    }
  });
}
var apiUrl = 'https://sclmdrpapi.saselomo.com/';
// console.log(store.state);

var reqParam = {
  'access_token': _store.default.state.token,
  'mobile_key': _store.default.state.userInfo.UserPhone ? _store.default.state.userInfo.UserPhone : '',
  'sellerNo_key': _store.default.state.userInfo.SellerNo ? _store.default.state.userInfo.SellerNo : '' };var _default =

{
  GET: function GET(url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var config = arguments.length > 2 ? arguments[2] : undefined;
    return HTTP({ url: apiUrl + url, data: data, method: "GET" }, config);
  },
  POST: function POST(url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var config = arguments.length > 2 ? arguments[2] : undefined;
    return HTTP({ url: apiUrl + url, data: data, method: "POST", header: { 'Content-Type': 'application/x-www-form-urlencoded' } }, config);
  },
  ReqGet: function ReqGet(url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var config = arguments.length > 2 ? arguments[2] : undefined;
    return HTTP({ url: apiUrl + url, data: data, method: "GET", header: reqParam }, config);
  },
  ReqPOST: function ReqPOST(url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var config = arguments.length > 2 ? arguments[2] : undefined;
    return HTTP({ url: apiUrl + url, data: data, method: "POST", header: reqParam }, config);
  },
  outGet: function outGet(url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var config = arguments.length > 2 ? arguments[2] : undefined;
    return HTTP({ url: url, data: data, method: "GET" }, config);
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["default"]))

/***/ }),

/***/ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\common\\graceRules.js":
/*!************************************************************************************!*\
  !*** C:/Users/120412/Documents/HBuilderProjects/hello-uniapp/common/graceRules.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.graceRules = graceRules;exports.graceToast = graceToast;exports.graceShowLoading = graceShowLoading;exports.graceHideLoading = graceHideLoading;
// module.exports = {
// 	check : function (data, rule){
// 		for(var i = 0; i < rule.length; i++){
// 			if (!rule[i].checkType){return true;}
// 			if (!rule[i].name) {return true;}
// 			if (!rule[i].errorMsg) {return true;}
// 			if (!data[rule[i].name]) {this.error = rule[i].errorMsg; return false;}
// 			switch (rule[i].checkType){
// 				case 'string':
// 					var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
// 					if(!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
// 				break;
// 				case 'int':
// 					var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule[i].checkRule + '}$');
// 					if(!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
// 					break;
// 				break;
// 				case 'between':
// 					if (!this.isNumber(data[rule[i].name])){
// 						this.error = rule[i].errorMsg;
// 						return false;
// 					}
// 					var minMax = rule[i].checkRule.split(',');
// 					minMax[0] = Number(minMax[0]);
// 					minMax[1] = Number(minMax[1]);
// 					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
// 						this.error = rule[i].errorMsg;
// 						return false;
// 					}
// 				break;
// 				case 'betweenD':
// 					var reg = /^-?[1-9][0-9]?$/;
// 					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
// 					var minMax = rule[i].checkRule.split(',');
// 					minMax[0] = Number(minMax[0]);
// 					minMax[1] = Number(minMax[1]);
// 					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
// 						this.error = rule[i].errorMsg;
// 						return false;
// 					}
// 				break;
// 				case 'betweenF': 
// 					var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
// 					if (!reg.test(data[rule[i].name])){this.error = rule[i].errorMsg; return false;}
// 					var minMax = rule[i].checkRule.split(',');
// 					minMax[0] = Number(minMax[0]);
// 					minMax[1] = Number(minMax[1]);
// 					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
// 						this.error = rule[i].errorMsg;
// 						return false;
// 					}
// 				break;
// 				case 'same':
// 					if (data[rule[i].name] != rule[i].checkRule) { this.error = rule[i].errorMsg; return false;}
// 				break;
// 				case 'notsame':
// 					if (data[rule[i].name] == rule[i].checkRule) { this.error = rule[i].errorMsg; return false; }
// 				break;
// 				case 'email':
// 					var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
// 					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
// 				break;
// 				case 'phoneno':
// 					var reg = /^1[0-9]{10,10}$/;
// 					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
// 				break;
// 				case 'zipcode':
// 					var reg = /^[0-9]{6}$/;
// 					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
// 				break;
// 				case 'reg':
// 					var reg = new RegExp(rule[i].checkRule);
// 					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
// 				break;
// 				case 'in':
// 					if(rule[i].checkRule.indexOf(data[rule[i].name]) == -1){
// 						this.error = rule[i].errorMsg; return false;
// 					}
// 				break;
// 				case 'notnull':
// 					if(data[rule[i].name] == null || data[rule[i].name].length < 1){this.error = rule[i].errorMsg; return false;}
// 				break;
// 			}
// 		}
// 		return true;
// 	},
// 	isNumber : function (checkVal){
// 		var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
// 		return reg.test(checkVal);
// 	}
// }
function graceToast(title, time, shade) {
  uni.showToast({
    title: title,
    duration: time,
    mask: shade,
    icon: 'none' });

}
function graceShowLoading(title) {
  console.log(title, " at common\\graceRules.js:102");
  uni.showLoading({
    title: title,
    mask: true });

}
function graceHideLoading() {
  uni.hideLoading();
}
function graceModel(model, obj) {
  console.log(model, " at common\\graceRules.js:112");
  console.log(obj, " at common\\graceRules.js:113");
  if (obj.checkRule) {//有限制长度
    var typeArr = obj.checkRule.split(",");
    if (typeArr.length == 1) {//单独一个限制  必须满足最小值
      if (model[obj.name].length < typeArr[0]) {
        graceToast(obj.errorMsg, 1500, true);
        return false;
      }
      return true;
    } else {//两个限制，区间 
      console.log(model[obj.name], " at common\\graceRules.js:123");
      if (model[obj.name].length < typeArr[0]) {
        graceToast(obj.errorMsg, 1500, true);
        return false;
      }
      if (model[obj.name].length > typeArr[1]) {
        graceToast(obj.errorMsg, 1500, true);
        return false;
      }
      return true;
    }
  }
  return true;
}
function graceRules(obj, rule) {
  for (var i = 0; i < rule.length; i++) {
    if (!obj[rule[i].name] || obj[rule[i].name] == '') {
      graceToast(rule[i].errorMsg, 1500, true);
      return false;
    } else {
      if (obj[rule[i].name] && rule[i].checkRule) {
        var typeArr = rule[i].checkRule.split(",");
        if (typeArr.length == 1) {//单独一个限制  必须满足最小值
          if (obj[rule[i].name].length < typeArr[0]) {
            graceToast(rule[i].errorMsg, 1500, true);
            return false;
          }
          return true;
        } else {//两个限制，区间 
          if (obj[rule[i].name].length < typeArr[0]) {
            graceToast(rule[i].errorMsg, 1500, true);
            return false;
          }
          if (obj[rule[i].name].length > typeArr[1]) {
            graceToast(rule[i].errorMsg, 1500, true);
            return false;
          }
          return true;
        }
      }
    }
  }
  return true;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["default"]))

/***/ }),

/***/ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\common\\rules.js":
/*!*******************************************************************************!*\
  !*** C:/Users/120412/Documents/HBuilderProjects/hello-uniapp/common/rules.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  /* 用户登录 */
  loginRule: [{
    name: "UserPhone",
    checkType: "notnull",
    checkRule: "",
    errorMsg: "请输入手机号/微信号" },
  {
    name: "PassWord",
    checkType: "notnull",
    checkRule: "6,20",
    errorMsg: "密码不能少于6位" }] };exports.default = _default;

/***/ }),

/***/ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\components\\area.js":
/*!**********************************************************************************!*\
  !*** C:/Users/120412/Documents/HBuilderProjects/hello-uniapp/components/area.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var areaList = [{
  "pro_cities": [{
    "city_name": "市辖区",
    "city_code": "110100000000",
    "city_areas": [{
      "area_name": "东城区",
      "area_code": "110101000000",
      "area_id": 1 },
    {
      "area_name": "西城区",
      "area_code": "110102000000",
      "area_id": 2 },
    {
      "area_name": "朝阳区",
      "area_code": "110105000000",
      "area_id": 3 },
    {
      "area_name": "丰台区",
      "area_code": "110106000000",
      "area_id": 4 },
    {
      "area_name": "石景山区",
      "area_code": "110107000000",
      "area_id": 5 },
    {
      "area_name": "海淀区",
      "area_code": "110108000000",
      "area_id": 6 },
    {
      "area_name": "门头沟区",
      "area_code": "110109000000",
      "area_id": 7 },
    {
      "area_name": "房山区",
      "area_code": "110111000000",
      "area_id": 8 },
    {
      "area_name": "通州区",
      "area_code": "110112000000",
      "area_id": 9 },
    {
      "area_name": "顺义区",
      "area_code": "110113000000",
      "area_id": 10 },
    {
      "area_name": "昌平区",
      "area_code": "110114000000",
      "area_id": 11 },
    {
      "area_name": "大兴区",
      "area_code": "110115000000",
      "area_id": 12 },
    {
      "area_name": "怀柔区",
      "area_code": "110116000000",
      "area_id": 13 },
    {
      "area_name": "平谷区",
      "area_code": "110117000000",
      "area_id": 14 },
    {
      "area_name": "密云区",
      "area_code": "110118000000",
      "area_id": 15 },
    {
      "area_name": "延庆区",
      "area_code": "110119000000",
      "area_id": 16 }],

    "city_id": 1 }],

  "pro_code": "110000",
  "pro_id": 1,
  "pro_name": "北京市" },
{
  "pro_cities": [{
    "city_name": "市辖区",
    "city_code": "120100000000",
    "city_areas": [{
      "area_name": "和平区",
      "area_code": "120101000000",
      "area_id": 17 },
    {
      "area_name": "河东区",
      "area_code": "120102000000",
      "area_id": 18 },
    {
      "area_name": "河西区",
      "area_code": "120103000000",
      "area_id": 19 },
    {
      "area_name": "南开区",
      "area_code": "120104000000",
      "area_id": 20 },
    {
      "area_name": "河北区",
      "area_code": "120105000000",
      "area_id": 21 },
    {
      "area_name": "红桥区",
      "area_code": "120106000000",
      "area_id": 22 },
    {
      "area_name": "东丽区",
      "area_code": "120110000000",
      "area_id": 23 },
    {
      "area_name": "西青区",
      "area_code": "120111000000",
      "area_id": 24 },
    {
      "area_name": "津南区",
      "area_code": "120112000000",
      "area_id": 25 },
    {
      "area_name": "北辰区",
      "area_code": "120113000000",
      "area_id": 26 },
    {
      "area_name": "武清区",
      "area_code": "120114000000",
      "area_id": 27 },
    {
      "area_name": "宝坻区",
      "area_code": "120115000000",
      "area_id": 28 },
    {
      "area_name": "滨海新区",
      "area_code": "120116000000",
      "area_id": 29 },
    {
      "area_name": "宁河区",
      "area_code": "120117000000",
      "area_id": 30 },
    {
      "area_name": "静海区",
      "area_code": "120118000000",
      "area_id": 31 },
    {
      "area_name": "蓟州区",
      "area_code": "120119000000",
      "area_id": 32 }],

    "city_id": 2 }],

  "pro_code": "120000",
  "pro_id": 2,
  "pro_name": "天津市" },
{
  "pro_cities": [{
    "city_name": "石家庄市",
    "city_code": "130100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "130101000000",
      "area_id": 33 },
    {
      "area_name": "长安区",
      "area_code": "130102000000",
      "area_id": 34 },
    {
      "area_name": "桥西区",
      "area_code": "130104000000",
      "area_id": 35 },
    {
      "area_name": "新华区",
      "area_code": "130105000000",
      "area_id": 36 },
    {
      "area_name": "井陉矿区",
      "area_code": "130107000000",
      "area_id": 37 },
    {
      "area_name": "裕华区",
      "area_code": "130108000000",
      "area_id": 38 },
    {
      "area_name": "藁城区",
      "area_code": "130109000000",
      "area_id": 39 },
    {
      "area_name": "鹿泉区",
      "area_code": "130110000000",
      "area_id": 40 },
    {
      "area_name": "栾城区",
      "area_code": "130111000000",
      "area_id": 41 },
    {
      "area_name": "井陉县",
      "area_code": "130121000000",
      "area_id": 42 },
    {
      "area_name": "正定县",
      "area_code": "130123000000",
      "area_id": 43 },
    {
      "area_name": "行唐县",
      "area_code": "130125000000",
      "area_id": 44 },
    {
      "area_name": "灵寿县",
      "area_code": "130126000000",
      "area_id": 45 },
    {
      "area_name": "高邑县",
      "area_code": "130127000000",
      "area_id": 46 },
    {
      "area_name": "深泽县",
      "area_code": "130128000000",
      "area_id": 47 },
    {
      "area_name": "赞皇县",
      "area_code": "130129000000",
      "area_id": 48 },
    {
      "area_name": "无极县",
      "area_code": "130130000000",
      "area_id": 49 },
    {
      "area_name": "平山县",
      "area_code": "130131000000",
      "area_id": 50 },
    {
      "area_name": "元氏县",
      "area_code": "130132000000",
      "area_id": 51 },
    {
      "area_name": "赵县",
      "area_code": "130133000000",
      "area_id": 52 },
    {
      "area_name": "石家庄高新技术产业开发区",
      "area_code": "130171000000",
      "area_id": 53 },
    {
      "area_name": "石家庄循环化工园区",
      "area_code": "130172000000",
      "area_id": 54 },
    {
      "area_name": "辛集市",
      "area_code": "130181000000",
      "area_id": 55 },
    {
      "area_name": "晋州市",
      "area_code": "130183000000",
      "area_id": 56 },
    {
      "area_name": "新乐市",
      "area_code": "130184000000",
      "area_id": 57 }],

    "city_id": 3 },
  {
    "city_name": "唐山市",
    "city_code": "130200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "130201000000",
      "area_id": 58 },
    {
      "area_name": "路南区",
      "area_code": "130202000000",
      "area_id": 59 },
    {
      "area_name": "路北区",
      "area_code": "130203000000",
      "area_id": 60 },
    {
      "area_name": "古冶区",
      "area_code": "130204000000",
      "area_id": 61 },
    {
      "area_name": "开平区",
      "area_code": "130205000000",
      "area_id": 62 },
    {
      "area_name": "丰南区",
      "area_code": "130207000000",
      "area_id": 63 },
    {
      "area_name": "丰润区",
      "area_code": "130208000000",
      "area_id": 64 },
    {
      "area_name": "曹妃甸区",
      "area_code": "130209000000",
      "area_id": 65 },
    {
      "area_name": "滦南县",
      "area_code": "130224000000",
      "area_id": 66 },
    {
      "area_name": "乐亭县",
      "area_code": "130225000000",
      "area_id": 67 },
    {
      "area_name": "迁西县",
      "area_code": "130227000000",
      "area_id": 68 },
    {
      "area_name": "玉田县",
      "area_code": "130229000000",
      "area_id": 69 },
    {
      "area_name": "唐山市芦台经济技术开发区",
      "area_code": "130271000000",
      "area_id": 70 },
    {
      "area_name": "唐山市汉沽管理区",
      "area_code": "130272000000",
      "area_id": 71 },
    {
      "area_name": "唐山高新技术产业开发区",
      "area_code": "130273000000",
      "area_id": 72 },
    {
      "area_name": "河北唐山海港经济开发区",
      "area_code": "130274000000",
      "area_id": 73 },
    {
      "area_name": "遵化市",
      "area_code": "130281000000",
      "area_id": 74 },
    {
      "area_name": "迁安市",
      "area_code": "130283000000",
      "area_id": 75 },
    {
      "area_name": "滦州市",
      "area_code": "130284000000",
      "area_id": 76 }],

    "city_id": 4 },
  {
    "city_name": "秦皇岛市",
    "city_code": "130300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "130301000000",
      "area_id": 77 },
    {
      "area_name": "海港区",
      "area_code": "130302000000",
      "area_id": 78 },
    {
      "area_name": "山海关区",
      "area_code": "130303000000",
      "area_id": 79 },
    {
      "area_name": "北戴河区",
      "area_code": "130304000000",
      "area_id": 80 },
    {
      "area_name": "抚宁区",
      "area_code": "130306000000",
      "area_id": 81 },
    {
      "area_name": "青龙满族自治县",
      "area_code": "130321000000",
      "area_id": 82 },
    {
      "area_name": "昌黎县",
      "area_code": "130322000000",
      "area_id": 83 },
    {
      "area_name": "卢龙县",
      "area_code": "130324000000",
      "area_id": 84 },
    {
      "area_name": "秦皇岛市经济技术开发区",
      "area_code": "130371000000",
      "area_id": 85 },
    {
      "area_name": "北戴河新区",
      "area_code": "130372000000",
      "area_id": 86 }],

    "city_id": 5 },
  {
    "city_name": "邯郸市",
    "city_code": "130400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "130401000000",
      "area_id": 87 },
    {
      "area_name": "邯山区",
      "area_code": "130402000000",
      "area_id": 88 },
    {
      "area_name": "丛台区",
      "area_code": "130403000000",
      "area_id": 89 },
    {
      "area_name": "复兴区",
      "area_code": "130404000000",
      "area_id": 90 },
    {
      "area_name": "峰峰矿区",
      "area_code": "130406000000",
      "area_id": 91 },
    {
      "area_name": "肥乡区",
      "area_code": "130407000000",
      "area_id": 92 },
    {
      "area_name": "永年区",
      "area_code": "130408000000",
      "area_id": 93 },
    {
      "area_name": "临漳县",
      "area_code": "130423000000",
      "area_id": 94 },
    {
      "area_name": "成安县",
      "area_code": "130424000000",
      "area_id": 95 },
    {
      "area_name": "大名县",
      "area_code": "130425000000",
      "area_id": 96 },
    {
      "area_name": "涉县",
      "area_code": "130426000000",
      "area_id": 97 },
    {
      "area_name": "磁县",
      "area_code": "130427000000",
      "area_id": 98 },
    {
      "area_name": "邱县",
      "area_code": "130430000000",
      "area_id": 99 },
    {
      "area_name": "鸡泽县",
      "area_code": "130431000000",
      "area_id": 100 },
    {
      "area_name": "广平县",
      "area_code": "130432000000",
      "area_id": 101 },
    {
      "area_name": "馆陶县",
      "area_code": "130433000000",
      "area_id": 102 },
    {
      "area_name": "魏县",
      "area_code": "130434000000",
      "area_id": 103 },
    {
      "area_name": "曲周县",
      "area_code": "130435000000",
      "area_id": 104 },
    {
      "area_name": "邯郸经济技术开发区",
      "area_code": "130471000000",
      "area_id": 105 },
    {
      "area_name": "邯郸冀南新区",
      "area_code": "130473000000",
      "area_id": 106 },
    {
      "area_name": "武安市",
      "area_code": "130481000000",
      "area_id": 107 }],

    "city_id": 6 },
  {
    "city_name": "邢台市",
    "city_code": "130500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "130501000000",
      "area_id": 108 },
    {
      "area_name": "桥东区",
      "area_code": "130502000000",
      "area_id": 109 },
    {
      "area_name": "桥西区",
      "area_code": "130503000000",
      "area_id": 110 },
    {
      "area_name": "邢台县",
      "area_code": "130521000000",
      "area_id": 111 },
    {
      "area_name": "临城县",
      "area_code": "130522000000",
      "area_id": 112 },
    {
      "area_name": "内丘县",
      "area_code": "130523000000",
      "area_id": 113 },
    {
      "area_name": "柏乡县",
      "area_code": "130524000000",
      "area_id": 114 },
    {
      "area_name": "隆尧县",
      "area_code": "130525000000",
      "area_id": 115 },
    {
      "area_name": "任县",
      "area_code": "130526000000",
      "area_id": 116 },
    {
      "area_name": "南和县",
      "area_code": "130527000000",
      "area_id": 117 },
    {
      "area_name": "宁晋县",
      "area_code": "130528000000",
      "area_id": 118 },
    {
      "area_name": "巨鹿县",
      "area_code": "130529000000",
      "area_id": 119 },
    {
      "area_name": "新河县",
      "area_code": "130530000000",
      "area_id": 120 },
    {
      "area_name": "广宗县",
      "area_code": "130531000000",
      "area_id": 121 },
    {
      "area_name": "平乡县",
      "area_code": "130532000000",
      "area_id": 122 },
    {
      "area_name": "威县",
      "area_code": "130533000000",
      "area_id": 123 },
    {
      "area_name": "清河县",
      "area_code": "130534000000",
      "area_id": 124 },
    {
      "area_name": "临西县",
      "area_code": "130535000000",
      "area_id": 125 },
    {
      "area_name": "河北邢台经济开发区",
      "area_code": "130571000000",
      "area_id": 126 },
    {
      "area_name": "南宫市",
      "area_code": "130581000000",
      "area_id": 127 },
    {
      "area_name": "沙河市",
      "area_code": "130582000000",
      "area_id": 128 }],

    "city_id": 7 },
  {
    "city_name": "保定市",
    "city_code": "130600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "130601000000",
      "area_id": 129 },
    {
      "area_name": "竞秀区",
      "area_code": "130602000000",
      "area_id": 130 },
    {
      "area_name": "莲池区",
      "area_code": "130606000000",
      "area_id": 131 },
    {
      "area_name": "满城区",
      "area_code": "130607000000",
      "area_id": 132 },
    {
      "area_name": "清苑区",
      "area_code": "130608000000",
      "area_id": 133 },
    {
      "area_name": "徐水区",
      "area_code": "130609000000",
      "area_id": 134 },
    {
      "area_name": "涞水县",
      "area_code": "130623000000",
      "area_id": 135 },
    {
      "area_name": "阜平县",
      "area_code": "130624000000",
      "area_id": 136 },
    {
      "area_name": "定兴县",
      "area_code": "130626000000",
      "area_id": 137 },
    {
      "area_name": "唐县",
      "area_code": "130627000000",
      "area_id": 138 },
    {
      "area_name": "高阳县",
      "area_code": "130628000000",
      "area_id": 139 },
    {
      "area_name": "容城县",
      "area_code": "130629000000",
      "area_id": 140 },
    {
      "area_name": "涞源县",
      "area_code": "130630000000",
      "area_id": 141 },
    {
      "area_name": "望都县",
      "area_code": "130631000000",
      "area_id": 142 },
    {
      "area_name": "安新县",
      "area_code": "130632000000",
      "area_id": 143 },
    {
      "area_name": "易县",
      "area_code": "130633000000",
      "area_id": 144 },
    {
      "area_name": "曲阳县",
      "area_code": "130634000000",
      "area_id": 145 },
    {
      "area_name": "蠡县",
      "area_code": "130635000000",
      "area_id": 146 },
    {
      "area_name": "顺平县",
      "area_code": "130636000000",
      "area_id": 147 },
    {
      "area_name": "博野县",
      "area_code": "130637000000",
      "area_id": 148 },
    {
      "area_name": "雄县",
      "area_code": "130638000000",
      "area_id": 149 },
    {
      "area_name": "保定高新技术产业开发区",
      "area_code": "130671000000",
      "area_id": 150 },
    {
      "area_name": "保定白沟新城",
      "area_code": "130672000000",
      "area_id": 151 },
    {
      "area_name": "涿州市",
      "area_code": "130681000000",
      "area_id": 152 },
    {
      "area_name": "定州市",
      "area_code": "130682000000",
      "area_id": 153 },
    {
      "area_name": "安国市",
      "area_code": "130683000000",
      "area_id": 154 },
    {
      "area_name": "高碑店市",
      "area_code": "130684000000",
      "area_id": 155 }],

    "city_id": 8 },
  {
    "city_name": "张家口市",
    "city_code": "130700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "130701000000",
      "area_id": 156 },
    {
      "area_name": "桥东区",
      "area_code": "130702000000",
      "area_id": 157 },
    {
      "area_name": "桥西区",
      "area_code": "130703000000",
      "area_id": 158 },
    {
      "area_name": "宣化区",
      "area_code": "130705000000",
      "area_id": 159 },
    {
      "area_name": "下花园区",
      "area_code": "130706000000",
      "area_id": 160 },
    {
      "area_name": "万全区",
      "area_code": "130708000000",
      "area_id": 161 },
    {
      "area_name": "崇礼区",
      "area_code": "130709000000",
      "area_id": 162 },
    {
      "area_name": "张北县",
      "area_code": "130722000000",
      "area_id": 163 },
    {
      "area_name": "康保县",
      "area_code": "130723000000",
      "area_id": 164 },
    {
      "area_name": "沽源县",
      "area_code": "130724000000",
      "area_id": 165 },
    {
      "area_name": "尚义县",
      "area_code": "130725000000",
      "area_id": 166 },
    {
      "area_name": "蔚县",
      "area_code": "130726000000",
      "area_id": 167 },
    {
      "area_name": "阳原县",
      "area_code": "130727000000",
      "area_id": 168 },
    {
      "area_name": "怀安县",
      "area_code": "130728000000",
      "area_id": 169 },
    {
      "area_name": "怀来县",
      "area_code": "130730000000",
      "area_id": 170 },
    {
      "area_name": "涿鹿县",
      "area_code": "130731000000",
      "area_id": 171 },
    {
      "area_name": "赤城县",
      "area_code": "130732000000",
      "area_id": 172 },
    {
      "area_name": "张家口市高新技术产业开发区",
      "area_code": "130771000000",
      "area_id": 173 },
    {
      "area_name": "张家口市察北管理区",
      "area_code": "130772000000",
      "area_id": 174 },
    {
      "area_name": "张家口市塞北管理区",
      "area_code": "130773000000",
      "area_id": 175 }],

    "city_id": 9 },
  {
    "city_name": "承德市",
    "city_code": "130800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "130801000000",
      "area_id": 176 },
    {
      "area_name": "双桥区",
      "area_code": "130802000000",
      "area_id": 177 },
    {
      "area_name": "双滦区",
      "area_code": "130803000000",
      "area_id": 178 },
    {
      "area_name": "鹰手营子矿区",
      "area_code": "130804000000",
      "area_id": 179 },
    {
      "area_name": "承德县",
      "area_code": "130821000000",
      "area_id": 180 },
    {
      "area_name": "兴隆县",
      "area_code": "130822000000",
      "area_id": 181 },
    {
      "area_name": "滦平县",
      "area_code": "130824000000",
      "area_id": 182 },
    {
      "area_name": "隆化县",
      "area_code": "130825000000",
      "area_id": 183 },
    {
      "area_name": "丰宁满族自治县",
      "area_code": "130826000000",
      "area_id": 184 },
    {
      "area_name": "宽城满族自治县",
      "area_code": "130827000000",
      "area_id": 185 },
    {
      "area_name": "围场满族蒙古族自治县",
      "area_code": "130828000000",
      "area_id": 186 },
    {
      "area_name": "承德高新技术产业开发区",
      "area_code": "130871000000",
      "area_id": 187 },
    {
      "area_name": "平泉市",
      "area_code": "130881000000",
      "area_id": 188 }],

    "city_id": 10 },
  {
    "city_name": "沧州市",
    "city_code": "130900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "130901000000",
      "area_id": 189 },
    {
      "area_name": "新华区",
      "area_code": "130902000000",
      "area_id": 190 },
    {
      "area_name": "运河区",
      "area_code": "130903000000",
      "area_id": 191 },
    {
      "area_name": "沧县",
      "area_code": "130921000000",
      "area_id": 192 },
    {
      "area_name": "青县",
      "area_code": "130922000000",
      "area_id": 193 },
    {
      "area_name": "东光县",
      "area_code": "130923000000",
      "area_id": 194 },
    {
      "area_name": "海兴县",
      "area_code": "130924000000",
      "area_id": 195 },
    {
      "area_name": "盐山县",
      "area_code": "130925000000",
      "area_id": 196 },
    {
      "area_name": "肃宁县",
      "area_code": "130926000000",
      "area_id": 197 },
    {
      "area_name": "南皮县",
      "area_code": "130927000000",
      "area_id": 198 },
    {
      "area_name": "吴桥县",
      "area_code": "130928000000",
      "area_id": 199 },
    {
      "area_name": "献县",
      "area_code": "130929000000",
      "area_id": 200 },
    {
      "area_name": "孟村回族自治县",
      "area_code": "130930000000",
      "area_id": 201 },
    {
      "area_name": "河北沧州经济开发区",
      "area_code": "130971000000",
      "area_id": 202 },
    {
      "area_name": "沧州高新技术产业开发区",
      "area_code": "130972000000",
      "area_id": 203 },
    {
      "area_name": "沧州渤海新区",
      "area_code": "130973000000",
      "area_id": 204 },
    {
      "area_name": "泊头市",
      "area_code": "130981000000",
      "area_id": 205 },
    {
      "area_name": "任丘市",
      "area_code": "130982000000",
      "area_id": 206 },
    {
      "area_name": "黄骅市",
      "area_code": "130983000000",
      "area_id": 207 },
    {
      "area_name": "河间市",
      "area_code": "130984000000",
      "area_id": 208 }],

    "city_id": 11 },
  {
    "city_name": "廊坊市",
    "city_code": "131000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "131001000000",
      "area_id": 209 },
    {
      "area_name": "安次区",
      "area_code": "131002000000",
      "area_id": 210 },
    {
      "area_name": "广阳区",
      "area_code": "131003000000",
      "area_id": 211 },
    {
      "area_name": "固安县",
      "area_code": "131022000000",
      "area_id": 212 },
    {
      "area_name": "永清县",
      "area_code": "131023000000",
      "area_id": 213 },
    {
      "area_name": "香河县",
      "area_code": "131024000000",
      "area_id": 214 },
    {
      "area_name": "大城县",
      "area_code": "131025000000",
      "area_id": 215 },
    {
      "area_name": "文安县",
      "area_code": "131026000000",
      "area_id": 216 },
    {
      "area_name": "大厂回族自治县",
      "area_code": "131028000000",
      "area_id": 217 },
    {
      "area_name": "廊坊经济技术开发区",
      "area_code": "131071000000",
      "area_id": 218 },
    {
      "area_name": "霸州市",
      "area_code": "131081000000",
      "area_id": 219 },
    {
      "area_name": "三河市",
      "area_code": "131082000000",
      "area_id": 220 }],

    "city_id": 12 },
  {
    "city_name": "衡水市",
    "city_code": "131100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "131101000000",
      "area_id": 221 },
    {
      "area_name": "桃城区",
      "area_code": "131102000000",
      "area_id": 222 },
    {
      "area_name": "冀州区",
      "area_code": "131103000000",
      "area_id": 223 },
    {
      "area_name": "枣强县",
      "area_code": "131121000000",
      "area_id": 224 },
    {
      "area_name": "武邑县",
      "area_code": "131122000000",
      "area_id": 225 },
    {
      "area_name": "武强县",
      "area_code": "131123000000",
      "area_id": 226 },
    {
      "area_name": "饶阳县",
      "area_code": "131124000000",
      "area_id": 227 },
    {
      "area_name": "安平县",
      "area_code": "131125000000",
      "area_id": 228 },
    {
      "area_name": "故城县",
      "area_code": "131126000000",
      "area_id": 229 },
    {
      "area_name": "景县",
      "area_code": "131127000000",
      "area_id": 230 },
    {
      "area_name": "阜城县",
      "area_code": "131128000000",
      "area_id": 231 },
    {
      "area_name": "河北衡水高新技术产业开发区",
      "area_code": "131171000000",
      "area_id": 232 },
    {
      "area_name": "衡水滨湖新区",
      "area_code": "131172000000",
      "area_id": 233 },
    {
      "area_name": "深州市",
      "area_code": "131182000000",
      "area_id": 234 }],

    "city_id": 13 }],

  "pro_code": "130000",
  "pro_id": 3,
  "pro_name": "河北省" },
{
  "pro_cities": [{
    "city_name": "太原市",
    "city_code": "140100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "140101000000",
      "area_id": 235 },
    {
      "area_name": "小店区",
      "area_code": "140105000000",
      "area_id": 236 },
    {
      "area_name": "迎泽区",
      "area_code": "140106000000",
      "area_id": 237 },
    {
      "area_name": "杏花岭区",
      "area_code": "140107000000",
      "area_id": 238 },
    {
      "area_name": "尖草坪区",
      "area_code": "140108000000",
      "area_id": 239 },
    {
      "area_name": "万柏林区",
      "area_code": "140109000000",
      "area_id": 240 },
    {
      "area_name": "晋源区",
      "area_code": "140110000000",
      "area_id": 241 },
    {
      "area_name": "清徐县",
      "area_code": "140121000000",
      "area_id": 242 },
    {
      "area_name": "阳曲县",
      "area_code": "140122000000",
      "area_id": 243 },
    {
      "area_name": "娄烦县",
      "area_code": "140123000000",
      "area_id": 244 },
    {
      "area_name": "山西转型综合改革示范区",
      "area_code": "140171000000",
      "area_id": 245 },
    {
      "area_name": "古交市",
      "area_code": "140181000000",
      "area_id": 246 }],

    "city_id": 14 },
  {
    "city_name": "大同市",
    "city_code": "140200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "140201000000",
      "area_id": 247 },
    {
      "area_name": "新荣区",
      "area_code": "140212000000",
      "area_id": 248 },
    {
      "area_name": "平城区",
      "area_code": "140213000000",
      "area_id": 249 },
    {
      "area_name": "云冈区",
      "area_code": "140214000000",
      "area_id": 250 },
    {
      "area_name": "云州区",
      "area_code": "140215000000",
      "area_id": 251 },
    {
      "area_name": "阳高县",
      "area_code": "140221000000",
      "area_id": 252 },
    {
      "area_name": "天镇县",
      "area_code": "140222000000",
      "area_id": 253 },
    {
      "area_name": "广灵县",
      "area_code": "140223000000",
      "area_id": 254 },
    {
      "area_name": "灵丘县",
      "area_code": "140224000000",
      "area_id": 255 },
    {
      "area_name": "浑源县",
      "area_code": "140225000000",
      "area_id": 256 },
    {
      "area_name": "左云县",
      "area_code": "140226000000",
      "area_id": 257 },
    {
      "area_name": "山西大同经济开发区",
      "area_code": "140271000000",
      "area_id": 258 }],

    "city_id": 15 },
  {
    "city_name": "阳泉市",
    "city_code": "140300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "140301000000",
      "area_id": 259 },
    {
      "area_name": "城区",
      "area_code": "140302000000",
      "area_id": 260 },
    {
      "area_name": "矿区",
      "area_code": "140303000000",
      "area_id": 261 },
    {
      "area_name": "郊区",
      "area_code": "140311000000",
      "area_id": 262 },
    {
      "area_name": "平定县",
      "area_code": "140321000000",
      "area_id": 263 },
    {
      "area_name": "盂县",
      "area_code": "140322000000",
      "area_id": 264 }],

    "city_id": 16 },
  {
    "city_name": "长治市",
    "city_code": "140400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "140401000000",
      "area_id": 265 },
    {
      "area_name": "潞州区",
      "area_code": "140403000000",
      "area_id": 266 },
    {
      "area_name": "上党区",
      "area_code": "140404000000",
      "area_id": 267 },
    {
      "area_name": "屯留区",
      "area_code": "140405000000",
      "area_id": 268 },
    {
      "area_name": "潞城区",
      "area_code": "140406000000",
      "area_id": 269 },
    {
      "area_name": "襄垣县",
      "area_code": "140423000000",
      "area_id": 270 },
    {
      "area_name": "平顺县",
      "area_code": "140425000000",
      "area_id": 271 },
    {
      "area_name": "黎城县",
      "area_code": "140426000000",
      "area_id": 272 },
    {
      "area_name": "壶关县",
      "area_code": "140427000000",
      "area_id": 273 },
    {
      "area_name": "长子县",
      "area_code": "140428000000",
      "area_id": 274 },
    {
      "area_name": "武乡县",
      "area_code": "140429000000",
      "area_id": 275 },
    {
      "area_name": "沁县",
      "area_code": "140430000000",
      "area_id": 276 },
    {
      "area_name": "沁源县",
      "area_code": "140431000000",
      "area_id": 277 },
    {
      "area_name": "山西长治高新技术产业园区",
      "area_code": "140471000000",
      "area_id": 278 }],

    "city_id": 17 },
  {
    "city_name": "晋城市",
    "city_code": "140500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "140501000000",
      "area_id": 279 },
    {
      "area_name": "城区",
      "area_code": "140502000000",
      "area_id": 280 },
    {
      "area_name": "沁水县",
      "area_code": "140521000000",
      "area_id": 281 },
    {
      "area_name": "阳城县",
      "area_code": "140522000000",
      "area_id": 282 },
    {
      "area_name": "陵川县",
      "area_code": "140524000000",
      "area_id": 283 },
    {
      "area_name": "泽州县",
      "area_code": "140525000000",
      "area_id": 284 },
    {
      "area_name": "高平市",
      "area_code": "140581000000",
      "area_id": 285 }],

    "city_id": 18 },
  {
    "city_name": "朔州市",
    "city_code": "140600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "140601000000",
      "area_id": 286 },
    {
      "area_name": "朔城区",
      "area_code": "140602000000",
      "area_id": 287 },
    {
      "area_name": "平鲁区",
      "area_code": "140603000000",
      "area_id": 288 },
    {
      "area_name": "山阴县",
      "area_code": "140621000000",
      "area_id": 289 },
    {
      "area_name": "应县",
      "area_code": "140622000000",
      "area_id": 290 },
    {
      "area_name": "右玉县",
      "area_code": "140623000000",
      "area_id": 291 },
    {
      "area_name": "山西朔州经济开发区",
      "area_code": "140671000000",
      "area_id": 292 },
    {
      "area_name": "怀仁市",
      "area_code": "140681000000",
      "area_id": 293 }],

    "city_id": 19 },
  {
    "city_name": "晋中市",
    "city_code": "140700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "140701000000",
      "area_id": 294 },
    {
      "area_name": "榆次区",
      "area_code": "140702000000",
      "area_id": 295 },
    {
      "area_name": "榆社县",
      "area_code": "140721000000",
      "area_id": 296 },
    {
      "area_name": "左权县",
      "area_code": "140722000000",
      "area_id": 297 },
    {
      "area_name": "和顺县",
      "area_code": "140723000000",
      "area_id": 298 },
    {
      "area_name": "昔阳县",
      "area_code": "140724000000",
      "area_id": 299 },
    {
      "area_name": "寿阳县",
      "area_code": "140725000000",
      "area_id": 300 },
    {
      "area_name": "太谷县",
      "area_code": "140726000000",
      "area_id": 301 },
    {
      "area_name": "祁县",
      "area_code": "140727000000",
      "area_id": 302 },
    {
      "area_name": "平遥县",
      "area_code": "140728000000",
      "area_id": 303 },
    {
      "area_name": "灵石县",
      "area_code": "140729000000",
      "area_id": 304 },
    {
      "area_name": "介休市",
      "area_code": "140781000000",
      "area_id": 305 }],

    "city_id": 20 },
  {
    "city_name": "运城市",
    "city_code": "140800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "140801000000",
      "area_id": 306 },
    {
      "area_name": "盐湖区",
      "area_code": "140802000000",
      "area_id": 307 },
    {
      "area_name": "临猗县",
      "area_code": "140821000000",
      "area_id": 308 },
    {
      "area_name": "万荣县",
      "area_code": "140822000000",
      "area_id": 309 },
    {
      "area_name": "闻喜县",
      "area_code": "140823000000",
      "area_id": 310 },
    {
      "area_name": "稷山县",
      "area_code": "140824000000",
      "area_id": 311 },
    {
      "area_name": "新绛县",
      "area_code": "140825000000",
      "area_id": 312 },
    {
      "area_name": "绛县",
      "area_code": "140826000000",
      "area_id": 313 },
    {
      "area_name": "垣曲县",
      "area_code": "140827000000",
      "area_id": 314 },
    {
      "area_name": "夏县",
      "area_code": "140828000000",
      "area_id": 315 },
    {
      "area_name": "平陆县",
      "area_code": "140829000000",
      "area_id": 316 },
    {
      "area_name": "芮城县",
      "area_code": "140830000000",
      "area_id": 317 },
    {
      "area_name": "永济市",
      "area_code": "140881000000",
      "area_id": 318 },
    {
      "area_name": "河津市",
      "area_code": "140882000000",
      "area_id": 319 }],

    "city_id": 21 },
  {
    "city_name": "忻州市",
    "city_code": "140900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "140901000000",
      "area_id": 320 },
    {
      "area_name": "忻府区",
      "area_code": "140902000000",
      "area_id": 321 },
    {
      "area_name": "定襄县",
      "area_code": "140921000000",
      "area_id": 322 },
    {
      "area_name": "五台县",
      "area_code": "140922000000",
      "area_id": 323 },
    {
      "area_name": "代县",
      "area_code": "140923000000",
      "area_id": 324 },
    {
      "area_name": "繁峙县",
      "area_code": "140924000000",
      "area_id": 325 },
    {
      "area_name": "宁武县",
      "area_code": "140925000000",
      "area_id": 326 },
    {
      "area_name": "静乐县",
      "area_code": "140926000000",
      "area_id": 327 },
    {
      "area_name": "神池县",
      "area_code": "140927000000",
      "area_id": 328 },
    {
      "area_name": "五寨县",
      "area_code": "140928000000",
      "area_id": 329 },
    {
      "area_name": "岢岚县",
      "area_code": "140929000000",
      "area_id": 330 },
    {
      "area_name": "河曲县",
      "area_code": "140930000000",
      "area_id": 331 },
    {
      "area_name": "保德县",
      "area_code": "140931000000",
      "area_id": 332 },
    {
      "area_name": "偏关县",
      "area_code": "140932000000",
      "area_id": 333 },
    {
      "area_name": "五台山风景名胜区",
      "area_code": "140971000000",
      "area_id": 334 },
    {
      "area_name": "原平市",
      "area_code": "140981000000",
      "area_id": 335 }],

    "city_id": 22 },
  {
    "city_name": "临汾市",
    "city_code": "141000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "141001000000",
      "area_id": 336 },
    {
      "area_name": "尧都区",
      "area_code": "141002000000",
      "area_id": 337 },
    {
      "area_name": "曲沃县",
      "area_code": "141021000000",
      "area_id": 338 },
    {
      "area_name": "翼城县",
      "area_code": "141022000000",
      "area_id": 339 },
    {
      "area_name": "襄汾县",
      "area_code": "141023000000",
      "area_id": 340 },
    {
      "area_name": "洪洞县",
      "area_code": "141024000000",
      "area_id": 341 },
    {
      "area_name": "古县",
      "area_code": "141025000000",
      "area_id": 342 },
    {
      "area_name": "安泽县",
      "area_code": "141026000000",
      "area_id": 343 },
    {
      "area_name": "浮山县",
      "area_code": "141027000000",
      "area_id": 344 },
    {
      "area_name": "吉县",
      "area_code": "141028000000",
      "area_id": 345 },
    {
      "area_name": "乡宁县",
      "area_code": "141029000000",
      "area_id": 346 },
    {
      "area_name": "大宁县",
      "area_code": "141030000000",
      "area_id": 347 },
    {
      "area_name": "隰县",
      "area_code": "141031000000",
      "area_id": 348 },
    {
      "area_name": "永和县",
      "area_code": "141032000000",
      "area_id": 349 },
    {
      "area_name": "蒲县",
      "area_code": "141033000000",
      "area_id": 350 },
    {
      "area_name": "汾西县",
      "area_code": "141034000000",
      "area_id": 351 },
    {
      "area_name": "侯马市",
      "area_code": "141081000000",
      "area_id": 352 },
    {
      "area_name": "霍州市",
      "area_code": "141082000000",
      "area_id": 353 }],

    "city_id": 23 },
  {
    "city_name": "吕梁市",
    "city_code": "141100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "141101000000",
      "area_id": 354 },
    {
      "area_name": "离石区",
      "area_code": "141102000000",
      "area_id": 355 },
    {
      "area_name": "文水县",
      "area_code": "141121000000",
      "area_id": 356 },
    {
      "area_name": "交城县",
      "area_code": "141122000000",
      "area_id": 357 },
    {
      "area_name": "兴县",
      "area_code": "141123000000",
      "area_id": 358 },
    {
      "area_name": "临县",
      "area_code": "141124000000",
      "area_id": 359 },
    {
      "area_name": "柳林县",
      "area_code": "141125000000",
      "area_id": 360 },
    {
      "area_name": "石楼县",
      "area_code": "141126000000",
      "area_id": 361 },
    {
      "area_name": "岚县",
      "area_code": "141127000000",
      "area_id": 362 },
    {
      "area_name": "方山县",
      "area_code": "141128000000",
      "area_id": 363 },
    {
      "area_name": "中阳县",
      "area_code": "141129000000",
      "area_id": 364 },
    {
      "area_name": "交口县",
      "area_code": "141130000000",
      "area_id": 365 },
    {
      "area_name": "孝义市",
      "area_code": "141181000000",
      "area_id": 366 },
    {
      "area_name": "汾阳市",
      "area_code": "141182000000",
      "area_id": 367 }],

    "city_id": 24 }],

  "pro_code": "140000",
  "pro_id": 4,
  "pro_name": "山西省" },
{
  "pro_cities": [{
    "city_name": "呼和浩特市",
    "city_code": "150100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "150101000000",
      "area_id": 368 },
    {
      "area_name": "新城区",
      "area_code": "150102000000",
      "area_id": 369 },
    {
      "area_name": "回民区",
      "area_code": "150103000000",
      "area_id": 370 },
    {
      "area_name": "玉泉区",
      "area_code": "150104000000",
      "area_id": 371 },
    {
      "area_name": "赛罕区",
      "area_code": "150105000000",
      "area_id": 372 },
    {
      "area_name": "土默特左旗",
      "area_code": "150121000000",
      "area_id": 373 },
    {
      "area_name": "托克托县",
      "area_code": "150122000000",
      "area_id": 374 },
    {
      "area_name": "和林格尔县",
      "area_code": "150123000000",
      "area_id": 375 },
    {
      "area_name": "清水河县",
      "area_code": "150124000000",
      "area_id": 376 },
    {
      "area_name": "武川县",
      "area_code": "150125000000",
      "area_id": 377 },
    {
      "area_name": "呼和浩特金海工业园区",
      "area_code": "150171000000",
      "area_id": 378 },
    {
      "area_name": "呼和浩特经济技术开发区",
      "area_code": "150172000000",
      "area_id": 379 }],

    "city_id": 25 },
  {
    "city_name": "包头市",
    "city_code": "150200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "150201000000",
      "area_id": 380 },
    {
      "area_name": "东河区",
      "area_code": "150202000000",
      "area_id": 381 },
    {
      "area_name": "昆都仑区",
      "area_code": "150203000000",
      "area_id": 382 },
    {
      "area_name": "青山区",
      "area_code": "150204000000",
      "area_id": 383 },
    {
      "area_name": "石拐区",
      "area_code": "150205000000",
      "area_id": 384 },
    {
      "area_name": "白云鄂博矿区",
      "area_code": "150206000000",
      "area_id": 385 },
    {
      "area_name": "九原区",
      "area_code": "150207000000",
      "area_id": 386 },
    {
      "area_name": "土默特右旗",
      "area_code": "150221000000",
      "area_id": 387 },
    {
      "area_name": "固阳县",
      "area_code": "150222000000",
      "area_id": 388 },
    {
      "area_name": "达尔罕茂明安联合旗",
      "area_code": "150223000000",
      "area_id": 389 },
    {
      "area_name": "包头稀土高新技术产业开发区",
      "area_code": "150271000000",
      "area_id": 390 }],

    "city_id": 26 },
  {
    "city_name": "乌海市",
    "city_code": "150300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "150301000000",
      "area_id": 391 },
    {
      "area_name": "海勃湾区",
      "area_code": "150302000000",
      "area_id": 392 },
    {
      "area_name": "海南区",
      "area_code": "150303000000",
      "area_id": 393 },
    {
      "area_name": "乌达区",
      "area_code": "150304000000",
      "area_id": 394 }],

    "city_id": 27 },
  {
    "city_name": "赤峰市",
    "city_code": "150400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "150401000000",
      "area_id": 395 },
    {
      "area_name": "红山区",
      "area_code": "150402000000",
      "area_id": 396 },
    {
      "area_name": "元宝山区",
      "area_code": "150403000000",
      "area_id": 397 },
    {
      "area_name": "松山区",
      "area_code": "150404000000",
      "area_id": 398 },
    {
      "area_name": "阿鲁科尔沁旗",
      "area_code": "150421000000",
      "area_id": 399 },
    {
      "area_name": "巴林左旗",
      "area_code": "150422000000",
      "area_id": 400 },
    {
      "area_name": "巴林右旗",
      "area_code": "150423000000",
      "area_id": 401 },
    {
      "area_name": "林西县",
      "area_code": "150424000000",
      "area_id": 402 },
    {
      "area_name": "克什克腾旗",
      "area_code": "150425000000",
      "area_id": 403 },
    {
      "area_name": "翁牛特旗",
      "area_code": "150426000000",
      "area_id": 404 },
    {
      "area_name": "喀喇沁旗",
      "area_code": "150428000000",
      "area_id": 405 },
    {
      "area_name": "宁城县",
      "area_code": "150429000000",
      "area_id": 406 },
    {
      "area_name": "敖汉旗",
      "area_code": "150430000000",
      "area_id": 407 }],

    "city_id": 28 },
  {
    "city_name": "通辽市",
    "city_code": "150500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "150501000000",
      "area_id": 408 },
    {
      "area_name": "科尔沁区",
      "area_code": "150502000000",
      "area_id": 409 },
    {
      "area_name": "科尔沁左翼中旗",
      "area_code": "150521000000",
      "area_id": 410 },
    {
      "area_name": "科尔沁左翼后旗",
      "area_code": "150522000000",
      "area_id": 411 },
    {
      "area_name": "开鲁县",
      "area_code": "150523000000",
      "area_id": 412 },
    {
      "area_name": "库伦旗",
      "area_code": "150524000000",
      "area_id": 413 },
    {
      "area_name": "奈曼旗",
      "area_code": "150525000000",
      "area_id": 414 },
    {
      "area_name": "扎鲁特旗",
      "area_code": "150526000000",
      "area_id": 415 },
    {
      "area_name": "通辽经济技术开发区",
      "area_code": "150571000000",
      "area_id": 416 },
    {
      "area_name": "霍林郭勒市",
      "area_code": "150581000000",
      "area_id": 417 }],

    "city_id": 29 },
  {
    "city_name": "鄂尔多斯市",
    "city_code": "150600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "150601000000",
      "area_id": 418 },
    {
      "area_name": "东胜区",
      "area_code": "150602000000",
      "area_id": 419 },
    {
      "area_name": "康巴什区",
      "area_code": "150603000000",
      "area_id": 420 },
    {
      "area_name": "达拉特旗",
      "area_code": "150621000000",
      "area_id": 421 },
    {
      "area_name": "准格尔旗",
      "area_code": "150622000000",
      "area_id": 422 },
    {
      "area_name": "鄂托克前旗",
      "area_code": "150623000000",
      "area_id": 423 },
    {
      "area_name": "鄂托克旗",
      "area_code": "150624000000",
      "area_id": 424 },
    {
      "area_name": "杭锦旗",
      "area_code": "150625000000",
      "area_id": 425 },
    {
      "area_name": "乌审旗",
      "area_code": "150626000000",
      "area_id": 426 },
    {
      "area_name": "伊金霍洛旗",
      "area_code": "150627000000",
      "area_id": 427 }],

    "city_id": 30 },
  {
    "city_name": "呼伦贝尔市",
    "city_code": "150700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "150701000000",
      "area_id": 428 },
    {
      "area_name": "海拉尔区",
      "area_code": "150702000000",
      "area_id": 429 },
    {
      "area_name": "扎赉诺尔区",
      "area_code": "150703000000",
      "area_id": 430 },
    {
      "area_name": "阿荣旗",
      "area_code": "150721000000",
      "area_id": 431 },
    {
      "area_name": "莫力达瓦达斡尔族自治旗",
      "area_code": "150722000000",
      "area_id": 432 },
    {
      "area_name": "鄂伦春自治旗",
      "area_code": "150723000000",
      "area_id": 433 },
    {
      "area_name": "鄂温克族自治旗",
      "area_code": "150724000000",
      "area_id": 434 },
    {
      "area_name": "陈巴尔虎旗",
      "area_code": "150725000000",
      "area_id": 435 },
    {
      "area_name": "新巴尔虎左旗",
      "area_code": "150726000000",
      "area_id": 436 },
    {
      "area_name": "新巴尔虎右旗",
      "area_code": "150727000000",
      "area_id": 437 },
    {
      "area_name": "满洲里市",
      "area_code": "150781000000",
      "area_id": 438 },
    {
      "area_name": "牙克石市",
      "area_code": "150782000000",
      "area_id": 439 },
    {
      "area_name": "扎兰屯市",
      "area_code": "150783000000",
      "area_id": 440 },
    {
      "area_name": "额尔古纳市",
      "area_code": "150784000000",
      "area_id": 441 },
    {
      "area_name": "根河市",
      "area_code": "150785000000",
      "area_id": 442 }],

    "city_id": 31 },
  {
    "city_name": "巴彦淖尔市",
    "city_code": "150800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "150801000000",
      "area_id": 443 },
    {
      "area_name": "临河区",
      "area_code": "150802000000",
      "area_id": 444 },
    {
      "area_name": "五原县",
      "area_code": "150821000000",
      "area_id": 445 },
    {
      "area_name": "磴口县",
      "area_code": "150822000000",
      "area_id": 446 },
    {
      "area_name": "乌拉特前旗",
      "area_code": "150823000000",
      "area_id": 447 },
    {
      "area_name": "乌拉特中旗",
      "area_code": "150824000000",
      "area_id": 448 },
    {
      "area_name": "乌拉特后旗",
      "area_code": "150825000000",
      "area_id": 449 },
    {
      "area_name": "杭锦后旗",
      "area_code": "150826000000",
      "area_id": 450 }],

    "city_id": 32 },
  {
    "city_name": "乌兰察布市",
    "city_code": "150900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "150901000000",
      "area_id": 451 },
    {
      "area_name": "集宁区",
      "area_code": "150902000000",
      "area_id": 452 },
    {
      "area_name": "卓资县",
      "area_code": "150921000000",
      "area_id": 453 },
    {
      "area_name": "化德县",
      "area_code": "150922000000",
      "area_id": 454 },
    {
      "area_name": "商都县",
      "area_code": "150923000000",
      "area_id": 455 },
    {
      "area_name": "兴和县",
      "area_code": "150924000000",
      "area_id": 456 },
    {
      "area_name": "凉城县",
      "area_code": "150925000000",
      "area_id": 457 },
    {
      "area_name": "察哈尔右翼前旗",
      "area_code": "150926000000",
      "area_id": 458 },
    {
      "area_name": "察哈尔右翼中旗",
      "area_code": "150927000000",
      "area_id": 459 },
    {
      "area_name": "察哈尔右翼后旗",
      "area_code": "150928000000",
      "area_id": 460 },
    {
      "area_name": "四子王旗",
      "area_code": "150929000000",
      "area_id": 461 },
    {
      "area_name": "丰镇市",
      "area_code": "150981000000",
      "area_id": 462 }],

    "city_id": 33 },
  {
    "city_name": "兴安盟",
    "city_code": "152200000000",
    "city_areas": [{
      "area_name": "乌兰浩特市",
      "area_code": "152201000000",
      "area_id": 463 },
    {
      "area_name": "阿尔山市",
      "area_code": "152202000000",
      "area_id": 464 },
    {
      "area_name": "科尔沁右翼前旗",
      "area_code": "152221000000",
      "area_id": 465 },
    {
      "area_name": "科尔沁右翼中旗",
      "area_code": "152222000000",
      "area_id": 466 },
    {
      "area_name": "扎赉特旗",
      "area_code": "152223000000",
      "area_id": 467 },
    {
      "area_name": "突泉县",
      "area_code": "152224000000",
      "area_id": 468 }],

    "city_id": 34 },
  {
    "city_name": "锡林郭勒盟",
    "city_code": "152500000000",
    "city_areas": [{
      "area_name": "二连浩特市",
      "area_code": "152501000000",
      "area_id": 469 },
    {
      "area_name": "锡林浩特市",
      "area_code": "152502000000",
      "area_id": 470 },
    {
      "area_name": "阿巴嘎旗",
      "area_code": "152522000000",
      "area_id": 471 },
    {
      "area_name": "苏尼特左旗",
      "area_code": "152523000000",
      "area_id": 472 },
    {
      "area_name": "苏尼特右旗",
      "area_code": "152524000000",
      "area_id": 473 },
    {
      "area_name": "东乌珠穆沁旗",
      "area_code": "152525000000",
      "area_id": 474 },
    {
      "area_name": "西乌珠穆沁旗",
      "area_code": "152526000000",
      "area_id": 475 },
    {
      "area_name": "太仆寺旗",
      "area_code": "152527000000",
      "area_id": 476 },
    {
      "area_name": "镶黄旗",
      "area_code": "152528000000",
      "area_id": 477 },
    {
      "area_name": "正镶白旗",
      "area_code": "152529000000",
      "area_id": 478 },
    {
      "area_name": "正蓝旗",
      "area_code": "152530000000",
      "area_id": 479 },
    {
      "area_name": "多伦县",
      "area_code": "152531000000",
      "area_id": 480 },
    {
      "area_name": "乌拉盖管委会",
      "area_code": "152571000000",
      "area_id": 481 }],

    "city_id": 35 },
  {
    "city_name": "阿拉善盟",
    "city_code": "152900000000",
    "city_areas": [{
      "area_name": "阿拉善左旗",
      "area_code": "152921000000",
      "area_id": 482 },
    {
      "area_name": "阿拉善右旗",
      "area_code": "152922000000",
      "area_id": 483 },
    {
      "area_name": "额济纳旗",
      "area_code": "152923000000",
      "area_id": 484 },
    {
      "area_name": "内蒙古阿拉善经济开发区",
      "area_code": "152971000000",
      "area_id": 485 }],

    "city_id": 36 }],

  "pro_code": "150000",
  "pro_id": 5,
  "pro_name": "内蒙古自治区" },
{
  "pro_cities": [{
    "city_name": "沈阳市",
    "city_code": "210100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "210101000000",
      "area_id": 486 },
    {
      "area_name": "和平区",
      "area_code": "210102000000",
      "area_id": 487 },
    {
      "area_name": "沈河区",
      "area_code": "210103000000",
      "area_id": 488 },
    {
      "area_name": "大东区",
      "area_code": "210104000000",
      "area_id": 489 },
    {
      "area_name": "皇姑区",
      "area_code": "210105000000",
      "area_id": 490 },
    {
      "area_name": "铁西区",
      "area_code": "210106000000",
      "area_id": 491 },
    {
      "area_name": "苏家屯区",
      "area_code": "210111000000",
      "area_id": 492 },
    {
      "area_name": "浑南区",
      "area_code": "210112000000",
      "area_id": 493 },
    {
      "area_name": "沈北新区",
      "area_code": "210113000000",
      "area_id": 494 },
    {
      "area_name": "于洪区",
      "area_code": "210114000000",
      "area_id": 495 },
    {
      "area_name": "辽中区",
      "area_code": "210115000000",
      "area_id": 496 },
    {
      "area_name": "康平县",
      "area_code": "210123000000",
      "area_id": 497 },
    {
      "area_name": "法库县",
      "area_code": "210124000000",
      "area_id": 498 },
    {
      "area_name": "新民市",
      "area_code": "210181000000",
      "area_id": 499 }],

    "city_id": 37 },
  {
    "city_name": "大连市",
    "city_code": "210200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "210201000000",
      "area_id": 500 },
    {
      "area_name": "中山区",
      "area_code": "210202000000",
      "area_id": 501 },
    {
      "area_name": "西岗区",
      "area_code": "210203000000",
      "area_id": 502 },
    {
      "area_name": "沙河口区",
      "area_code": "210204000000",
      "area_id": 503 },
    {
      "area_name": "甘井子区",
      "area_code": "210211000000",
      "area_id": 504 },
    {
      "area_name": "旅顺口区",
      "area_code": "210212000000",
      "area_id": 505 },
    {
      "area_name": "金州区",
      "area_code": "210213000000",
      "area_id": 506 },
    {
      "area_name": "普兰店区",
      "area_code": "210214000000",
      "area_id": 507 },
    {
      "area_name": "长海县",
      "area_code": "210224000000",
      "area_id": 508 },
    {
      "area_name": "瓦房店市",
      "area_code": "210281000000",
      "area_id": 509 },
    {
      "area_name": "庄河市",
      "area_code": "210283000000",
      "area_id": 510 }],

    "city_id": 38 },
  {
    "city_name": "鞍山市",
    "city_code": "210300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "210301000000",
      "area_id": 511 },
    {
      "area_name": "铁东区",
      "area_code": "210302000000",
      "area_id": 512 },
    {
      "area_name": "铁西区",
      "area_code": "210303000000",
      "area_id": 513 },
    {
      "area_name": "立山区",
      "area_code": "210304000000",
      "area_id": 514 },
    {
      "area_name": "千山区",
      "area_code": "210311000000",
      "area_id": 515 },
    {
      "area_name": "台安县",
      "area_code": "210321000000",
      "area_id": 516 },
    {
      "area_name": "岫岩满族自治县",
      "area_code": "210323000000",
      "area_id": 517 },
    {
      "area_name": "海城市",
      "area_code": "210381000000",
      "area_id": 518 }],

    "city_id": 39 },
  {
    "city_name": "抚顺市",
    "city_code": "210400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "210401000000",
      "area_id": 519 },
    {
      "area_name": "新抚区",
      "area_code": "210402000000",
      "area_id": 520 },
    {
      "area_name": "东洲区",
      "area_code": "210403000000",
      "area_id": 521 },
    {
      "area_name": "望花区",
      "area_code": "210404000000",
      "area_id": 522 },
    {
      "area_name": "顺城区",
      "area_code": "210411000000",
      "area_id": 523 },
    {
      "area_name": "抚顺县",
      "area_code": "210421000000",
      "area_id": 524 },
    {
      "area_name": "新宾满族自治县",
      "area_code": "210422000000",
      "area_id": 525 },
    {
      "area_name": "清原满族自治县",
      "area_code": "210423000000",
      "area_id": 526 }],

    "city_id": 40 },
  {
    "city_name": "本溪市",
    "city_code": "210500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "210501000000",
      "area_id": 527 },
    {
      "area_name": "平山区",
      "area_code": "210502000000",
      "area_id": 528 },
    {
      "area_name": "溪湖区",
      "area_code": "210503000000",
      "area_id": 529 },
    {
      "area_name": "明山区",
      "area_code": "210504000000",
      "area_id": 530 },
    {
      "area_name": "南芬区",
      "area_code": "210505000000",
      "area_id": 531 },
    {
      "area_name": "本溪满族自治县",
      "area_code": "210521000000",
      "area_id": 532 },
    {
      "area_name": "桓仁满族自治县",
      "area_code": "210522000000",
      "area_id": 533 }],

    "city_id": 41 },
  {
    "city_name": "丹东市",
    "city_code": "210600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "210601000000",
      "area_id": 534 },
    {
      "area_name": "元宝区",
      "area_code": "210602000000",
      "area_id": 535 },
    {
      "area_name": "振兴区",
      "area_code": "210603000000",
      "area_id": 536 },
    {
      "area_name": "振安区",
      "area_code": "210604000000",
      "area_id": 537 },
    {
      "area_name": "宽甸满族自治县",
      "area_code": "210624000000",
      "area_id": 538 },
    {
      "area_name": "东港市",
      "area_code": "210681000000",
      "area_id": 539 },
    {
      "area_name": "凤城市",
      "area_code": "210682000000",
      "area_id": 540 }],

    "city_id": 42 },
  {
    "city_name": "锦州市",
    "city_code": "210700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "210701000000",
      "area_id": 541 },
    {
      "area_name": "古塔区",
      "area_code": "210702000000",
      "area_id": 542 },
    {
      "area_name": "凌河区",
      "area_code": "210703000000",
      "area_id": 543 },
    {
      "area_name": "太和区",
      "area_code": "210711000000",
      "area_id": 544 },
    {
      "area_name": "黑山县",
      "area_code": "210726000000",
      "area_id": 545 },
    {
      "area_name": "义县",
      "area_code": "210727000000",
      "area_id": 546 },
    {
      "area_name": "凌海市",
      "area_code": "210781000000",
      "area_id": 547 },
    {
      "area_name": "北镇市",
      "area_code": "210782000000",
      "area_id": 548 }],

    "city_id": 43 },
  {
    "city_name": "营口市",
    "city_code": "210800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "210801000000",
      "area_id": 549 },
    {
      "area_name": "站前区",
      "area_code": "210802000000",
      "area_id": 550 },
    {
      "area_name": "西市区",
      "area_code": "210803000000",
      "area_id": 551 },
    {
      "area_name": "鲅鱼圈区",
      "area_code": "210804000000",
      "area_id": 552 },
    {
      "area_name": "老边区",
      "area_code": "210811000000",
      "area_id": 553 },
    {
      "area_name": "盖州市",
      "area_code": "210881000000",
      "area_id": 554 },
    {
      "area_name": "大石桥市",
      "area_code": "210882000000",
      "area_id": 555 }],

    "city_id": 44 },
  {
    "city_name": "阜新市",
    "city_code": "210900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "210901000000",
      "area_id": 556 },
    {
      "area_name": "海州区",
      "area_code": "210902000000",
      "area_id": 557 },
    {
      "area_name": "新邱区",
      "area_code": "210903000000",
      "area_id": 558 },
    {
      "area_name": "太平区",
      "area_code": "210904000000",
      "area_id": 559 },
    {
      "area_name": "清河门区",
      "area_code": "210905000000",
      "area_id": 560 },
    {
      "area_name": "细河区",
      "area_code": "210911000000",
      "area_id": 561 },
    {
      "area_name": "阜新蒙古族自治县",
      "area_code": "210921000000",
      "area_id": 562 },
    {
      "area_name": "彰武县",
      "area_code": "210922000000",
      "area_id": 563 }],

    "city_id": 45 },
  {
    "city_name": "辽阳市",
    "city_code": "211000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "211001000000",
      "area_id": 564 },
    {
      "area_name": "白塔区",
      "area_code": "211002000000",
      "area_id": 565 },
    {
      "area_name": "文圣区",
      "area_code": "211003000000",
      "area_id": 566 },
    {
      "area_name": "宏伟区",
      "area_code": "211004000000",
      "area_id": 567 },
    {
      "area_name": "弓长岭区",
      "area_code": "211005000000",
      "area_id": 568 },
    {
      "area_name": "太子河区",
      "area_code": "211011000000",
      "area_id": 569 },
    {
      "area_name": "辽阳县",
      "area_code": "211021000000",
      "area_id": 570 },
    {
      "area_name": "灯塔市",
      "area_code": "211081000000",
      "area_id": 571 }],

    "city_id": 46 },
  {
    "city_name": "盘锦市",
    "city_code": "211100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "211101000000",
      "area_id": 572 },
    {
      "area_name": "双台子区",
      "area_code": "211102000000",
      "area_id": 573 },
    {
      "area_name": "兴隆台区",
      "area_code": "211103000000",
      "area_id": 574 },
    {
      "area_name": "大洼区",
      "area_code": "211104000000",
      "area_id": 575 },
    {
      "area_name": "盘山县",
      "area_code": "211122000000",
      "area_id": 576 }],

    "city_id": 47 },
  {
    "city_name": "铁岭市",
    "city_code": "211200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "211201000000",
      "area_id": 577 },
    {
      "area_name": "银州区",
      "area_code": "211202000000",
      "area_id": 578 },
    {
      "area_name": "清河区",
      "area_code": "211204000000",
      "area_id": 579 },
    {
      "area_name": "铁岭县",
      "area_code": "211221000000",
      "area_id": 580 },
    {
      "area_name": "西丰县",
      "area_code": "211223000000",
      "area_id": 581 },
    {
      "area_name": "昌图县",
      "area_code": "211224000000",
      "area_id": 582 },
    {
      "area_name": "调兵山市",
      "area_code": "211281000000",
      "area_id": 583 },
    {
      "area_name": "开原市",
      "area_code": "211282000000",
      "area_id": 584 }],

    "city_id": 48 },
  {
    "city_name": "朝阳市",
    "city_code": "211300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "211301000000",
      "area_id": 585 },
    {
      "area_name": "双塔区",
      "area_code": "211302000000",
      "area_id": 586 },
    {
      "area_name": "龙城区",
      "area_code": "211303000000",
      "area_id": 587 },
    {
      "area_name": "朝阳县",
      "area_code": "211321000000",
      "area_id": 588 },
    {
      "area_name": "建平县",
      "area_code": "211322000000",
      "area_id": 589 },
    {
      "area_name": "喀喇沁左翼蒙古族自治县",
      "area_code": "211324000000",
      "area_id": 590 },
    {
      "area_name": "北票市",
      "area_code": "211381000000",
      "area_id": 591 },
    {
      "area_name": "凌源市",
      "area_code": "211382000000",
      "area_id": 592 }],

    "city_id": 49 },
  {
    "city_name": "葫芦岛市",
    "city_code": "211400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "211401000000",
      "area_id": 593 },
    {
      "area_name": "连山区",
      "area_code": "211402000000",
      "area_id": 594 },
    {
      "area_name": "龙港区",
      "area_code": "211403000000",
      "area_id": 595 },
    {
      "area_name": "南票区",
      "area_code": "211404000000",
      "area_id": 596 },
    {
      "area_name": "绥中县",
      "area_code": "211421000000",
      "area_id": 597 },
    {
      "area_name": "建昌县",
      "area_code": "211422000000",
      "area_id": 598 },
    {
      "area_name": "兴城市",
      "area_code": "211481000000",
      "area_id": 599 }],

    "city_id": 50 }],

  "pro_code": "210000",
  "pro_id": 6,
  "pro_name": "辽宁省" },
{
  "pro_cities": [{
    "city_name": "长春市",
    "city_code": "220100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "220101000000",
      "area_id": 600 },
    {
      "area_name": "南关区",
      "area_code": "220102000000",
      "area_id": 601 },
    {
      "area_name": "宽城区",
      "area_code": "220103000000",
      "area_id": 602 },
    {
      "area_name": "朝阳区",
      "area_code": "220104000000",
      "area_id": 603 },
    {
      "area_name": "二道区",
      "area_code": "220105000000",
      "area_id": 604 },
    {
      "area_name": "绿园区",
      "area_code": "220106000000",
      "area_id": 605 },
    {
      "area_name": "双阳区",
      "area_code": "220112000000",
      "area_id": 606 },
    {
      "area_name": "九台区",
      "area_code": "220113000000",
      "area_id": 607 },
    {
      "area_name": "农安县",
      "area_code": "220122000000",
      "area_id": 608 },
    {
      "area_name": "长春经济技术开发区",
      "area_code": "220171000000",
      "area_id": 609 },
    {
      "area_name": "长春净月高新技术产业开发区",
      "area_code": "220172000000",
      "area_id": 610 },
    {
      "area_name": "长春高新技术产业开发区",
      "area_code": "220173000000",
      "area_id": 611 },
    {
      "area_name": "长春汽车经济技术开发区",
      "area_code": "220174000000",
      "area_id": 612 },
    {
      "area_name": "榆树市",
      "area_code": "220182000000",
      "area_id": 613 },
    {
      "area_name": "德惠市",
      "area_code": "220183000000",
      "area_id": 614 }],

    "city_id": 51 },
  {
    "city_name": "吉林市",
    "city_code": "220200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "220201000000",
      "area_id": 615 },
    {
      "area_name": "昌邑区",
      "area_code": "220202000000",
      "area_id": 616 },
    {
      "area_name": "龙潭区",
      "area_code": "220203000000",
      "area_id": 617 },
    {
      "area_name": "船营区",
      "area_code": "220204000000",
      "area_id": 618 },
    {
      "area_name": "丰满区",
      "area_code": "220211000000",
      "area_id": 619 },
    {
      "area_name": "永吉县",
      "area_code": "220221000000",
      "area_id": 620 },
    {
      "area_name": "吉林经济开发区",
      "area_code": "220271000000",
      "area_id": 621 },
    {
      "area_name": "吉林高新技术产业开发区",
      "area_code": "220272000000",
      "area_id": 622 },
    {
      "area_name": "吉林中国新加坡食品区",
      "area_code": "220273000000",
      "area_id": 623 },
    {
      "area_name": "蛟河市",
      "area_code": "220281000000",
      "area_id": 624 },
    {
      "area_name": "桦甸市",
      "area_code": "220282000000",
      "area_id": 625 },
    {
      "area_name": "舒兰市",
      "area_code": "220283000000",
      "area_id": 626 },
    {
      "area_name": "磐石市",
      "area_code": "220284000000",
      "area_id": 627 }],

    "city_id": 52 },
  {
    "city_name": "四平市",
    "city_code": "220300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "220301000000",
      "area_id": 628 },
    {
      "area_name": "铁西区",
      "area_code": "220302000000",
      "area_id": 629 },
    {
      "area_name": "铁东区",
      "area_code": "220303000000",
      "area_id": 630 },
    {
      "area_name": "梨树县",
      "area_code": "220322000000",
      "area_id": 631 },
    {
      "area_name": "伊通满族自治县",
      "area_code": "220323000000",
      "area_id": 632 },
    {
      "area_name": "公主岭市",
      "area_code": "220381000000",
      "area_id": 633 },
    {
      "area_name": "双辽市",
      "area_code": "220382000000",
      "area_id": 634 }],

    "city_id": 53 },
  {
    "city_name": "辽源市",
    "city_code": "220400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "220401000000",
      "area_id": 635 },
    {
      "area_name": "龙山区",
      "area_code": "220402000000",
      "area_id": 636 },
    {
      "area_name": "西安区",
      "area_code": "220403000000",
      "area_id": 637 },
    {
      "area_name": "东丰县",
      "area_code": "220421000000",
      "area_id": 638 },
    {
      "area_name": "东辽县",
      "area_code": "220422000000",
      "area_id": 639 }],

    "city_id": 54 },
  {
    "city_name": "通化市",
    "city_code": "220500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "220501000000",
      "area_id": 640 },
    {
      "area_name": "东昌区",
      "area_code": "220502000000",
      "area_id": 641 },
    {
      "area_name": "二道江区",
      "area_code": "220503000000",
      "area_id": 642 },
    {
      "area_name": "通化县",
      "area_code": "220521000000",
      "area_id": 643 },
    {
      "area_name": "辉南县",
      "area_code": "220523000000",
      "area_id": 644 },
    {
      "area_name": "柳河县",
      "area_code": "220524000000",
      "area_id": 645 },
    {
      "area_name": "梅河口市",
      "area_code": "220581000000",
      "area_id": 646 },
    {
      "area_name": "集安市",
      "area_code": "220582000000",
      "area_id": 647 }],

    "city_id": 55 },
  {
    "city_name": "白山市",
    "city_code": "220600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "220601000000",
      "area_id": 648 },
    {
      "area_name": "浑江区",
      "area_code": "220602000000",
      "area_id": 649 },
    {
      "area_name": "江源区",
      "area_code": "220605000000",
      "area_id": 650 },
    {
      "area_name": "抚松县",
      "area_code": "220621000000",
      "area_id": 651 },
    {
      "area_name": "靖宇县",
      "area_code": "220622000000",
      "area_id": 652 },
    {
      "area_name": "长白朝鲜族自治县",
      "area_code": "220623000000",
      "area_id": 653 },
    {
      "area_name": "临江市",
      "area_code": "220681000000",
      "area_id": 654 }],

    "city_id": 56 },
  {
    "city_name": "松原市",
    "city_code": "220700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "220701000000",
      "area_id": 655 },
    {
      "area_name": "宁江区",
      "area_code": "220702000000",
      "area_id": 656 },
    {
      "area_name": "前郭尔罗斯蒙古族自治县",
      "area_code": "220721000000",
      "area_id": 657 },
    {
      "area_name": "长岭县",
      "area_code": "220722000000",
      "area_id": 658 },
    {
      "area_name": "乾安县",
      "area_code": "220723000000",
      "area_id": 659 },
    {
      "area_name": "吉林松原经济开发区",
      "area_code": "220771000000",
      "area_id": 660 },
    {
      "area_name": "扶余市",
      "area_code": "220781000000",
      "area_id": 661 }],

    "city_id": 57 },
  {
    "city_name": "白城市",
    "city_code": "220800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "220801000000",
      "area_id": 662 },
    {
      "area_name": "洮北区",
      "area_code": "220802000000",
      "area_id": 663 },
    {
      "area_name": "镇赉县",
      "area_code": "220821000000",
      "area_id": 664 },
    {
      "area_name": "通榆县",
      "area_code": "220822000000",
      "area_id": 665 },
    {
      "area_name": "吉林白城经济开发区",
      "area_code": "220871000000",
      "area_id": 666 },
    {
      "area_name": "洮南市",
      "area_code": "220881000000",
      "area_id": 667 },
    {
      "area_name": "大安市",
      "area_code": "220882000000",
      "area_id": 668 }],

    "city_id": 58 },
  {
    "city_name": "延边朝鲜族自治州",
    "city_code": "222400000000",
    "city_areas": [{
      "area_name": "延吉市",
      "area_code": "222401000000",
      "area_id": 669 },
    {
      "area_name": "图们市",
      "area_code": "222402000000",
      "area_id": 670 },
    {
      "area_name": "敦化市",
      "area_code": "222403000000",
      "area_id": 671 },
    {
      "area_name": "珲春市",
      "area_code": "222404000000",
      "area_id": 672 },
    {
      "area_name": "龙井市",
      "area_code": "222405000000",
      "area_id": 673 },
    {
      "area_name": "和龙市",
      "area_code": "222406000000",
      "area_id": 674 },
    {
      "area_name": "汪清县",
      "area_code": "222424000000",
      "area_id": 675 },
    {
      "area_name": "安图县",
      "area_code": "222426000000",
      "area_id": 676 }],

    "city_id": 59 }],

  "pro_code": "220000",
  "pro_id": 7,
  "pro_name": "吉林省" },
{
  "pro_cities": [{
    "city_name": "哈尔滨市",
    "city_code": "230100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "230101000000",
      "area_id": 677 },
    {
      "area_name": "道里区",
      "area_code": "230102000000",
      "area_id": 678 },
    {
      "area_name": "南岗区",
      "area_code": "230103000000",
      "area_id": 679 },
    {
      "area_name": "道外区",
      "area_code": "230104000000",
      "area_id": 680 },
    {
      "area_name": "平房区",
      "area_code": "230108000000",
      "area_id": 681 },
    {
      "area_name": "松北区",
      "area_code": "230109000000",
      "area_id": 682 },
    {
      "area_name": "香坊区",
      "area_code": "230110000000",
      "area_id": 683 },
    {
      "area_name": "呼兰区",
      "area_code": "230111000000",
      "area_id": 684 },
    {
      "area_name": "阿城区",
      "area_code": "230112000000",
      "area_id": 685 },
    {
      "area_name": "双城区",
      "area_code": "230113000000",
      "area_id": 686 },
    {
      "area_name": "依兰县",
      "area_code": "230123000000",
      "area_id": 687 },
    {
      "area_name": "方正县",
      "area_code": "230124000000",
      "area_id": 688 },
    {
      "area_name": "宾县",
      "area_code": "230125000000",
      "area_id": 689 },
    {
      "area_name": "巴彦县",
      "area_code": "230126000000",
      "area_id": 690 },
    {
      "area_name": "木兰县",
      "area_code": "230127000000",
      "area_id": 691 },
    {
      "area_name": "通河县",
      "area_code": "230128000000",
      "area_id": 692 },
    {
      "area_name": "延寿县",
      "area_code": "230129000000",
      "area_id": 693 },
    {
      "area_name": "尚志市",
      "area_code": "230183000000",
      "area_id": 694 },
    {
      "area_name": "五常市",
      "area_code": "230184000000",
      "area_id": 695 }],

    "city_id": 60 },
  {
    "city_name": "齐齐哈尔市",
    "city_code": "230200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "230201000000",
      "area_id": 696 },
    {
      "area_name": "龙沙区",
      "area_code": "230202000000",
      "area_id": 697 },
    {
      "area_name": "建华区",
      "area_code": "230203000000",
      "area_id": 698 },
    {
      "area_name": "铁锋区",
      "area_code": "230204000000",
      "area_id": 699 },
    {
      "area_name": "昂昂溪区",
      "area_code": "230205000000",
      "area_id": 700 },
    {
      "area_name": "富拉尔基区",
      "area_code": "230206000000",
      "area_id": 701 },
    {
      "area_name": "碾子山区",
      "area_code": "230207000000",
      "area_id": 702 },
    {
      "area_name": "梅里斯达斡尔族区",
      "area_code": "230208000000",
      "area_id": 703 },
    {
      "area_name": "龙江县",
      "area_code": "230221000000",
      "area_id": 704 },
    {
      "area_name": "依安县",
      "area_code": "230223000000",
      "area_id": 705 },
    {
      "area_name": "泰来县",
      "area_code": "230224000000",
      "area_id": 706 },
    {
      "area_name": "甘南县",
      "area_code": "230225000000",
      "area_id": 707 },
    {
      "area_name": "富裕县",
      "area_code": "230227000000",
      "area_id": 708 },
    {
      "area_name": "克山县",
      "area_code": "230229000000",
      "area_id": 709 },
    {
      "area_name": "克东县",
      "area_code": "230230000000",
      "area_id": 710 },
    {
      "area_name": "拜泉县",
      "area_code": "230231000000",
      "area_id": 711 },
    {
      "area_name": "讷河市",
      "area_code": "230281000000",
      "area_id": 712 }],

    "city_id": 61 },
  {
    "city_name": "鸡西市",
    "city_code": "230300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "230301000000",
      "area_id": 713 },
    {
      "area_name": "鸡冠区",
      "area_code": "230302000000",
      "area_id": 714 },
    {
      "area_name": "恒山区",
      "area_code": "230303000000",
      "area_id": 715 },
    {
      "area_name": "滴道区",
      "area_code": "230304000000",
      "area_id": 716 },
    {
      "area_name": "梨树区",
      "area_code": "230305000000",
      "area_id": 717 },
    {
      "area_name": "城子河区",
      "area_code": "230306000000",
      "area_id": 718 },
    {
      "area_name": "麻山区",
      "area_code": "230307000000",
      "area_id": 719 },
    {
      "area_name": "鸡东县",
      "area_code": "230321000000",
      "area_id": 720 },
    {
      "area_name": "虎林市",
      "area_code": "230381000000",
      "area_id": 721 },
    {
      "area_name": "密山市",
      "area_code": "230382000000",
      "area_id": 722 }],

    "city_id": 62 },
  {
    "city_name": "鹤岗市",
    "city_code": "230400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "230401000000",
      "area_id": 723 },
    {
      "area_name": "向阳区",
      "area_code": "230402000000",
      "area_id": 724 },
    {
      "area_name": "工农区",
      "area_code": "230403000000",
      "area_id": 725 },
    {
      "area_name": "南山区",
      "area_code": "230404000000",
      "area_id": 726 },
    {
      "area_name": "兴安区",
      "area_code": "230405000000",
      "area_id": 727 },
    {
      "area_name": "东山区",
      "area_code": "230406000000",
      "area_id": 728 },
    {
      "area_name": "兴山区",
      "area_code": "230407000000",
      "area_id": 729 },
    {
      "area_name": "萝北县",
      "area_code": "230421000000",
      "area_id": 730 },
    {
      "area_name": "绥滨县",
      "area_code": "230422000000",
      "area_id": 731 }],

    "city_id": 63 },
  {
    "city_name": "双鸭山市",
    "city_code": "230500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "230501000000",
      "area_id": 732 },
    {
      "area_name": "尖山区",
      "area_code": "230502000000",
      "area_id": 733 },
    {
      "area_name": "岭东区",
      "area_code": "230503000000",
      "area_id": 734 },
    {
      "area_name": "四方台区",
      "area_code": "230505000000",
      "area_id": 735 },
    {
      "area_name": "宝山区",
      "area_code": "230506000000",
      "area_id": 736 },
    {
      "area_name": "集贤县",
      "area_code": "230521000000",
      "area_id": 737 },
    {
      "area_name": "友谊县",
      "area_code": "230522000000",
      "area_id": 738 },
    {
      "area_name": "宝清县",
      "area_code": "230523000000",
      "area_id": 739 },
    {
      "area_name": "饶河县",
      "area_code": "230524000000",
      "area_id": 740 }],

    "city_id": 64 },
  {
    "city_name": "大庆市",
    "city_code": "230600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "230601000000",
      "area_id": 741 },
    {
      "area_name": "萨尔图区",
      "area_code": "230602000000",
      "area_id": 742 },
    {
      "area_name": "龙凤区",
      "area_code": "230603000000",
      "area_id": 743 },
    {
      "area_name": "让胡路区",
      "area_code": "230604000000",
      "area_id": 744 },
    {
      "area_name": "红岗区",
      "area_code": "230605000000",
      "area_id": 745 },
    {
      "area_name": "大同区",
      "area_code": "230606000000",
      "area_id": 746 },
    {
      "area_name": "肇州县",
      "area_code": "230621000000",
      "area_id": 747 },
    {
      "area_name": "肇源县",
      "area_code": "230622000000",
      "area_id": 748 },
    {
      "area_name": "林甸县",
      "area_code": "230623000000",
      "area_id": 749 },
    {
      "area_name": "杜尔伯特蒙古族自治县",
      "area_code": "230624000000",
      "area_id": 750 },
    {
      "area_name": "大庆高新技术产业开发区",
      "area_code": "230671000000",
      "area_id": 751 }],

    "city_id": 65 },
  {
    "city_name": "伊春市",
    "city_code": "230700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "230701000000",
      "area_id": 752 },
    {
      "area_name": "伊春区",
      "area_code": "230702000000",
      "area_id": 753 },
    {
      "area_name": "南岔区",
      "area_code": "230703000000",
      "area_id": 754 },
    {
      "area_name": "友好区",
      "area_code": "230704000000",
      "area_id": 755 },
    {
      "area_name": "西林区",
      "area_code": "230705000000",
      "area_id": 756 },
    {
      "area_name": "翠峦区",
      "area_code": "230706000000",
      "area_id": 757 },
    {
      "area_name": "新青区",
      "area_code": "230707000000",
      "area_id": 758 },
    {
      "area_name": "美溪区",
      "area_code": "230708000000",
      "area_id": 759 },
    {
      "area_name": "金山屯区",
      "area_code": "230709000000",
      "area_id": 760 },
    {
      "area_name": "五营区",
      "area_code": "230710000000",
      "area_id": 761 },
    {
      "area_name": "乌马河区",
      "area_code": "230711000000",
      "area_id": 762 },
    {
      "area_name": "汤旺河区",
      "area_code": "230712000000",
      "area_id": 763 },
    {
      "area_name": "带岭区",
      "area_code": "230713000000",
      "area_id": 764 },
    {
      "area_name": "乌伊岭区",
      "area_code": "230714000000",
      "area_id": 765 },
    {
      "area_name": "红星区",
      "area_code": "230715000000",
      "area_id": 766 },
    {
      "area_name": "上甘岭区",
      "area_code": "230716000000",
      "area_id": 767 },
    {
      "area_name": "嘉荫县",
      "area_code": "230722000000",
      "area_id": 768 },
    {
      "area_name": "铁力市",
      "area_code": "230781000000",
      "area_id": 769 }],

    "city_id": 66 },
  {
    "city_name": "佳木斯市",
    "city_code": "230800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "230801000000",
      "area_id": 770 },
    {
      "area_name": "向阳区",
      "area_code": "230803000000",
      "area_id": 771 },
    {
      "area_name": "前进区",
      "area_code": "230804000000",
      "area_id": 772 },
    {
      "area_name": "东风区",
      "area_code": "230805000000",
      "area_id": 773 },
    {
      "area_name": "郊区",
      "area_code": "230811000000",
      "area_id": 774 },
    {
      "area_name": "桦南县",
      "area_code": "230822000000",
      "area_id": 775 },
    {
      "area_name": "桦川县",
      "area_code": "230826000000",
      "area_id": 776 },
    {
      "area_name": "汤原县",
      "area_code": "230828000000",
      "area_id": 777 },
    {
      "area_name": "同江市",
      "area_code": "230881000000",
      "area_id": 778 },
    {
      "area_name": "富锦市",
      "area_code": "230882000000",
      "area_id": 779 },
    {
      "area_name": "抚远市",
      "area_code": "230883000000",
      "area_id": 780 }],

    "city_id": 67 },
  {
    "city_name": "七台河市",
    "city_code": "230900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "230901000000",
      "area_id": 781 },
    {
      "area_name": "新兴区",
      "area_code": "230902000000",
      "area_id": 782 },
    {
      "area_name": "桃山区",
      "area_code": "230903000000",
      "area_id": 783 },
    {
      "area_name": "茄子河区",
      "area_code": "230904000000",
      "area_id": 784 },
    {
      "area_name": "勃利县",
      "area_code": "230921000000",
      "area_id": 785 }],

    "city_id": 68 },
  {
    "city_name": "牡丹江市",
    "city_code": "231000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "231001000000",
      "area_id": 786 },
    {
      "area_name": "东安区",
      "area_code": "231002000000",
      "area_id": 787 },
    {
      "area_name": "阳明区",
      "area_code": "231003000000",
      "area_id": 788 },
    {
      "area_name": "爱民区",
      "area_code": "231004000000",
      "area_id": 789 },
    {
      "area_name": "西安区",
      "area_code": "231005000000",
      "area_id": 790 },
    {
      "area_name": "林口县",
      "area_code": "231025000000",
      "area_id": 791 },
    {
      "area_name": "牡丹江经济技术开发区",
      "area_code": "231071000000",
      "area_id": 792 },
    {
      "area_name": "绥芬河市",
      "area_code": "231081000000",
      "area_id": 793 },
    {
      "area_name": "海林市",
      "area_code": "231083000000",
      "area_id": 794 },
    {
      "area_name": "宁安市",
      "area_code": "231084000000",
      "area_id": 795 },
    {
      "area_name": "穆棱市",
      "area_code": "231085000000",
      "area_id": 796 },
    {
      "area_name": "东宁市",
      "area_code": "231086000000",
      "area_id": 797 }],

    "city_id": 69 },
  {
    "city_name": "黑河市",
    "city_code": "231100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "231101000000",
      "area_id": 798 },
    {
      "area_name": "爱辉区",
      "area_code": "231102000000",
      "area_id": 799 },
    {
      "area_name": "嫩江县",
      "area_code": "231121000000",
      "area_id": 800 },
    {
      "area_name": "逊克县",
      "area_code": "231123000000",
      "area_id": 801 },
    {
      "area_name": "孙吴县",
      "area_code": "231124000000",
      "area_id": 802 },
    {
      "area_name": "北安市",
      "area_code": "231181000000",
      "area_id": 803 },
    {
      "area_name": "五大连池市",
      "area_code": "231182000000",
      "area_id": 804 }],

    "city_id": 70 },
  {
    "city_name": "绥化市",
    "city_code": "231200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "231201000000",
      "area_id": 805 },
    {
      "area_name": "北林区",
      "area_code": "231202000000",
      "area_id": 806 },
    {
      "area_name": "望奎县",
      "area_code": "231221000000",
      "area_id": 807 },
    {
      "area_name": "兰西县",
      "area_code": "231222000000",
      "area_id": 808 },
    {
      "area_name": "青冈县",
      "area_code": "231223000000",
      "area_id": 809 },
    {
      "area_name": "庆安县",
      "area_code": "231224000000",
      "area_id": 810 },
    {
      "area_name": "明水县",
      "area_code": "231225000000",
      "area_id": 811 },
    {
      "area_name": "绥棱县",
      "area_code": "231226000000",
      "area_id": 812 },
    {
      "area_name": "安达市",
      "area_code": "231281000000",
      "area_id": 813 },
    {
      "area_name": "肇东市",
      "area_code": "231282000000",
      "area_id": 814 },
    {
      "area_name": "海伦市",
      "area_code": "231283000000",
      "area_id": 815 }],

    "city_id": 71 },
  {
    "city_name": "大兴安岭地区",
    "city_code": "232700000000",
    "city_areas": [{
      "area_name": "漠河市",
      "area_code": "232701000000",
      "area_id": 816 },
    {
      "area_name": "呼玛县",
      "area_code": "232721000000",
      "area_id": 817 },
    {
      "area_name": "塔河县",
      "area_code": "232722000000",
      "area_id": 818 },
    {
      "area_name": "加格达奇区",
      "area_code": "232761000000",
      "area_id": 819 },
    {
      "area_name": "松岭区",
      "area_code": "232762000000",
      "area_id": 820 },
    {
      "area_name": "新林区",
      "area_code": "232763000000",
      "area_id": 821 },
    {
      "area_name": "呼中区",
      "area_code": "232764000000",
      "area_id": 822 }],

    "city_id": 72 }],

  "pro_code": "230000",
  "pro_id": 8,
  "pro_name": "黑龙江省" },
{
  "pro_cities": [{
    "city_name": "市辖区",
    "city_code": "310100000000",
    "city_areas": [{
      "area_name": "黄浦区",
      "area_code": "310101000000",
      "area_id": 823 },
    {
      "area_name": "徐汇区",
      "area_code": "310104000000",
      "area_id": 824 },
    {
      "area_name": "长宁区",
      "area_code": "310105000000",
      "area_id": 825 },
    {
      "area_name": "静安区",
      "area_code": "310106000000",
      "area_id": 826 },
    {
      "area_name": "普陀区",
      "area_code": "310107000000",
      "area_id": 827 },
    {
      "area_name": "虹口区",
      "area_code": "310109000000",
      "area_id": 828 },
    {
      "area_name": "杨浦区",
      "area_code": "310110000000",
      "area_id": 829 },
    {
      "area_name": "闵行区",
      "area_code": "310112000000",
      "area_id": 830 },
    {
      "area_name": "宝山区",
      "area_code": "310113000000",
      "area_id": 831 },
    {
      "area_name": "嘉定区",
      "area_code": "310114000000",
      "area_id": 832 },
    {
      "area_name": "浦东新区",
      "area_code": "310115000000",
      "area_id": 833 },
    {
      "area_name": "金山区",
      "area_code": "310116000000",
      "area_id": 834 },
    {
      "area_name": "松江区",
      "area_code": "310117000000",
      "area_id": 835 },
    {
      "area_name": "青浦区",
      "area_code": "310118000000",
      "area_id": 836 },
    {
      "area_name": "奉贤区",
      "area_code": "310120000000",
      "area_id": 837 },
    {
      "area_name": "崇明区",
      "area_code": "310151000000",
      "area_id": 838 }],

    "city_id": 73 }],

  "pro_code": "310000",
  "pro_id": 9,
  "pro_name": "上海市" },
{
  "pro_cities": [{
    "city_name": "南京市",
    "city_code": "320100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "320101000000",
      "area_id": 839 },
    {
      "area_name": "玄武区",
      "area_code": "320102000000",
      "area_id": 840 },
    {
      "area_name": "秦淮区",
      "area_code": "320104000000",
      "area_id": 841 },
    {
      "area_name": "建邺区",
      "area_code": "320105000000",
      "area_id": 842 },
    {
      "area_name": "鼓楼区",
      "area_code": "320106000000",
      "area_id": 843 },
    {
      "area_name": "浦口区",
      "area_code": "320111000000",
      "area_id": 844 },
    {
      "area_name": "栖霞区",
      "area_code": "320113000000",
      "area_id": 845 },
    {
      "area_name": "雨花台区",
      "area_code": "320114000000",
      "area_id": 846 },
    {
      "area_name": "江宁区",
      "area_code": "320115000000",
      "area_id": 847 },
    {
      "area_name": "六合区",
      "area_code": "320116000000",
      "area_id": 848 },
    {
      "area_name": "溧水区",
      "area_code": "320117000000",
      "area_id": 849 },
    {
      "area_name": "高淳区",
      "area_code": "320118000000",
      "area_id": 850 }],

    "city_id": 74 },
  {
    "city_name": "无锡市",
    "city_code": "320200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "320201000000",
      "area_id": 851 },
    {
      "area_name": "锡山区",
      "area_code": "320205000000",
      "area_id": 852 },
    {
      "area_name": "惠山区",
      "area_code": "320206000000",
      "area_id": 853 },
    {
      "area_name": "滨湖区",
      "area_code": "320211000000",
      "area_id": 854 },
    {
      "area_name": "梁溪区",
      "area_code": "320213000000",
      "area_id": 855 },
    {
      "area_name": "新吴区",
      "area_code": "320214000000",
      "area_id": 856 },
    {
      "area_name": "江阴市",
      "area_code": "320281000000",
      "area_id": 857 },
    {
      "area_name": "宜兴市",
      "area_code": "320282000000",
      "area_id": 858 }],

    "city_id": 75 },
  {
    "city_name": "徐州市",
    "city_code": "320300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "320301000000",
      "area_id": 859 },
    {
      "area_name": "鼓楼区",
      "area_code": "320302000000",
      "area_id": 860 },
    {
      "area_name": "云龙区",
      "area_code": "320303000000",
      "area_id": 861 },
    {
      "area_name": "贾汪区",
      "area_code": "320305000000",
      "area_id": 862 },
    {
      "area_name": "泉山区",
      "area_code": "320311000000",
      "area_id": 863 },
    {
      "area_name": "铜山区",
      "area_code": "320312000000",
      "area_id": 864 },
    {
      "area_name": "丰县",
      "area_code": "320321000000",
      "area_id": 865 },
    {
      "area_name": "沛县",
      "area_code": "320322000000",
      "area_id": 866 },
    {
      "area_name": "睢宁县",
      "area_code": "320324000000",
      "area_id": 867 },
    {
      "area_name": "徐州经济技术开发区",
      "area_code": "320371000000",
      "area_id": 868 },
    {
      "area_name": "新沂市",
      "area_code": "320381000000",
      "area_id": 869 },
    {
      "area_name": "邳州市",
      "area_code": "320382000000",
      "area_id": 870 }],

    "city_id": 76 },
  {
    "city_name": "常州市",
    "city_code": "320400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "320401000000",
      "area_id": 871 },
    {
      "area_name": "天宁区",
      "area_code": "320402000000",
      "area_id": 872 },
    {
      "area_name": "钟楼区",
      "area_code": "320404000000",
      "area_id": 873 },
    {
      "area_name": "新北区",
      "area_code": "320411000000",
      "area_id": 874 },
    {
      "area_name": "武进区",
      "area_code": "320412000000",
      "area_id": 875 },
    {
      "area_name": "金坛区",
      "area_code": "320413000000",
      "area_id": 876 },
    {
      "area_name": "溧阳市",
      "area_code": "320481000000",
      "area_id": 877 }],

    "city_id": 77 },
  {
    "city_name": "苏州市",
    "city_code": "320500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "320501000000",
      "area_id": 878 },
    {
      "area_name": "虎丘区",
      "area_code": "320505000000",
      "area_id": 879 },
    {
      "area_name": "吴中区",
      "area_code": "320506000000",
      "area_id": 880 },
    {
      "area_name": "相城区",
      "area_code": "320507000000",
      "area_id": 881 },
    {
      "area_name": "姑苏区",
      "area_code": "320508000000",
      "area_id": 882 },
    {
      "area_name": "吴江区",
      "area_code": "320509000000",
      "area_id": 883 },
    {
      "area_name": "苏州工业园区",
      "area_code": "320571000000",
      "area_id": 884 },
    {
      "area_name": "常熟市",
      "area_code": "320581000000",
      "area_id": 885 },
    {
      "area_name": "张家港市",
      "area_code": "320582000000",
      "area_id": 886 },
    {
      "area_name": "昆山市",
      "area_code": "320583000000",
      "area_id": 887 },
    {
      "area_name": "太仓市",
      "area_code": "320585000000",
      "area_id": 888 }],

    "city_id": 78 },
  {
    "city_name": "南通市",
    "city_code": "320600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "320601000000",
      "area_id": 889 },
    {
      "area_name": "崇川区",
      "area_code": "320602000000",
      "area_id": 890 },
    {
      "area_name": "港闸区",
      "area_code": "320611000000",
      "area_id": 891 },
    {
      "area_name": "通州区",
      "area_code": "320612000000",
      "area_id": 892 },
    {
      "area_name": "如东县",
      "area_code": "320623000000",
      "area_id": 893 },
    {
      "area_name": "南通经济技术开发区",
      "area_code": "320671000000",
      "area_id": 894 },
    {
      "area_name": "启东市",
      "area_code": "320681000000",
      "area_id": 895 },
    {
      "area_name": "如皋市",
      "area_code": "320682000000",
      "area_id": 896 },
    {
      "area_name": "海门市",
      "area_code": "320684000000",
      "area_id": 897 },
    {
      "area_name": "海安市",
      "area_code": "320685000000",
      "area_id": 898 }],

    "city_id": 79 },
  {
    "city_name": "连云港市",
    "city_code": "320700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "320701000000",
      "area_id": 899 },
    {
      "area_name": "连云区",
      "area_code": "320703000000",
      "area_id": 900 },
    {
      "area_name": "海州区",
      "area_code": "320706000000",
      "area_id": 901 },
    {
      "area_name": "赣榆区",
      "area_code": "320707000000",
      "area_id": 902 },
    {
      "area_name": "东海县",
      "area_code": "320722000000",
      "area_id": 903 },
    {
      "area_name": "灌云县",
      "area_code": "320723000000",
      "area_id": 904 },
    {
      "area_name": "灌南县",
      "area_code": "320724000000",
      "area_id": 905 },
    {
      "area_name": "连云港经济技术开发区",
      "area_code": "320771000000",
      "area_id": 906 },
    {
      "area_name": "连云港高新技术产业开发区",
      "area_code": "320772000000",
      "area_id": 907 }],

    "city_id": 80 },
  {
    "city_name": "淮安市",
    "city_code": "320800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "320801000000",
      "area_id": 908 },
    {
      "area_name": "淮安区",
      "area_code": "320803000000",
      "area_id": 909 },
    {
      "area_name": "淮阴区",
      "area_code": "320804000000",
      "area_id": 910 },
    {
      "area_name": "清江浦区",
      "area_code": "320812000000",
      "area_id": 911 },
    {
      "area_name": "洪泽区",
      "area_code": "320813000000",
      "area_id": 912 },
    {
      "area_name": "涟水县",
      "area_code": "320826000000",
      "area_id": 913 },
    {
      "area_name": "盱眙县",
      "area_code": "320830000000",
      "area_id": 914 },
    {
      "area_name": "金湖县",
      "area_code": "320831000000",
      "area_id": 915 },
    {
      "area_name": "淮安经济技术开发区",
      "area_code": "320871000000",
      "area_id": 916 }],

    "city_id": 81 },
  {
    "city_name": "盐城市",
    "city_code": "320900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "320901000000",
      "area_id": 917 },
    {
      "area_name": "亭湖区",
      "area_code": "320902000000",
      "area_id": 918 },
    {
      "area_name": "盐都区",
      "area_code": "320903000000",
      "area_id": 919 },
    {
      "area_name": "大丰区",
      "area_code": "320904000000",
      "area_id": 920 },
    {
      "area_name": "响水县",
      "area_code": "320921000000",
      "area_id": 921 },
    {
      "area_name": "滨海县",
      "area_code": "320922000000",
      "area_id": 922 },
    {
      "area_name": "阜宁县",
      "area_code": "320923000000",
      "area_id": 923 },
    {
      "area_name": "射阳县",
      "area_code": "320924000000",
      "area_id": 924 },
    {
      "area_name": "建湖县",
      "area_code": "320925000000",
      "area_id": 925 },
    {
      "area_name": "盐城经济技术开发区",
      "area_code": "320971000000",
      "area_id": 926 },
    {
      "area_name": "东台市",
      "area_code": "320981000000",
      "area_id": 927 }],

    "city_id": 82 },
  {
    "city_name": "扬州市",
    "city_code": "321000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "321001000000",
      "area_id": 928 },
    {
      "area_name": "广陵区",
      "area_code": "321002000000",
      "area_id": 929 },
    {
      "area_name": "邗江区",
      "area_code": "321003000000",
      "area_id": 930 },
    {
      "area_name": "江都区",
      "area_code": "321012000000",
      "area_id": 931 },
    {
      "area_name": "宝应县",
      "area_code": "321023000000",
      "area_id": 932 },
    {
      "area_name": "扬州经济技术开发区",
      "area_code": "321071000000",
      "area_id": 933 },
    {
      "area_name": "仪征市",
      "area_code": "321081000000",
      "area_id": 934 },
    {
      "area_name": "高邮市",
      "area_code": "321084000000",
      "area_id": 935 }],

    "city_id": 83 },
  {
    "city_name": "镇江市",
    "city_code": "321100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "321101000000",
      "area_id": 936 },
    {
      "area_name": "京口区",
      "area_code": "321102000000",
      "area_id": 937 },
    {
      "area_name": "润州区",
      "area_code": "321111000000",
      "area_id": 938 },
    {
      "area_name": "丹徒区",
      "area_code": "321112000000",
      "area_id": 939 },
    {
      "area_name": "镇江新区",
      "area_code": "321171000000",
      "area_id": 940 },
    {
      "area_name": "丹阳市",
      "area_code": "321181000000",
      "area_id": 941 },
    {
      "area_name": "扬中市",
      "area_code": "321182000000",
      "area_id": 942 },
    {
      "area_name": "句容市",
      "area_code": "321183000000",
      "area_id": 943 }],

    "city_id": 84 },
  {
    "city_name": "泰州市",
    "city_code": "321200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "321201000000",
      "area_id": 944 },
    {
      "area_name": "海陵区",
      "area_code": "321202000000",
      "area_id": 945 },
    {
      "area_name": "高港区",
      "area_code": "321203000000",
      "area_id": 946 },
    {
      "area_name": "姜堰区",
      "area_code": "321204000000",
      "area_id": 947 },
    {
      "area_name": "泰州医药高新技术产业开发区",
      "area_code": "321271000000",
      "area_id": 948 },
    {
      "area_name": "兴化市",
      "area_code": "321281000000",
      "area_id": 949 },
    {
      "area_name": "靖江市",
      "area_code": "321282000000",
      "area_id": 950 },
    {
      "area_name": "泰兴市",
      "area_code": "321283000000",
      "area_id": 951 }],

    "city_id": 85 },
  {
    "city_name": "宿迁市",
    "city_code": "321300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "321301000000",
      "area_id": 952 },
    {
      "area_name": "宿城区",
      "area_code": "321302000000",
      "area_id": 953 },
    {
      "area_name": "宿豫区",
      "area_code": "321311000000",
      "area_id": 954 },
    {
      "area_name": "沭阳县",
      "area_code": "321322000000",
      "area_id": 955 },
    {
      "area_name": "泗阳县",
      "area_code": "321323000000",
      "area_id": 956 },
    {
      "area_name": "泗洪县",
      "area_code": "321324000000",
      "area_id": 957 },
    {
      "area_name": "宿迁经济技术开发区",
      "area_code": "321371000000",
      "area_id": 958 }],

    "city_id": 86 }],

  "pro_code": "320000",
  "pro_id": 10,
  "pro_name": "江苏省" },
{
  "pro_cities": [{
    "city_name": "杭州市",
    "city_code": "330100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "330101000000",
      "area_id": 959 },
    {
      "area_name": "上城区",
      "area_code": "330102000000",
      "area_id": 960 },
    {
      "area_name": "下城区",
      "area_code": "330103000000",
      "area_id": 961 },
    {
      "area_name": "江干区",
      "area_code": "330104000000",
      "area_id": 962 },
    {
      "area_name": "拱墅区",
      "area_code": "330105000000",
      "area_id": 963 },
    {
      "area_name": "西湖区",
      "area_code": "330106000000",
      "area_id": 964 },
    {
      "area_name": "滨江区",
      "area_code": "330108000000",
      "area_id": 965 },
    {
      "area_name": "萧山区",
      "area_code": "330109000000",
      "area_id": 966 },
    {
      "area_name": "余杭区",
      "area_code": "330110000000",
      "area_id": 967 },
    {
      "area_name": "富阳区",
      "area_code": "330111000000",
      "area_id": 968 },
    {
      "area_name": "临安区",
      "area_code": "330112000000",
      "area_id": 969 },
    {
      "area_name": "桐庐县",
      "area_code": "330122000000",
      "area_id": 970 },
    {
      "area_name": "淳安县",
      "area_code": "330127000000",
      "area_id": 971 },
    {
      "area_name": "建德市",
      "area_code": "330182000000",
      "area_id": 972 }],

    "city_id": 87 },
  {
    "city_name": "宁波市",
    "city_code": "330200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "330201000000",
      "area_id": 973 },
    {
      "area_name": "海曙区",
      "area_code": "330203000000",
      "area_id": 974 },
    {
      "area_name": "江北区",
      "area_code": "330205000000",
      "area_id": 975 },
    {
      "area_name": "北仑区",
      "area_code": "330206000000",
      "area_id": 976 },
    {
      "area_name": "镇海区",
      "area_code": "330211000000",
      "area_id": 977 },
    {
      "area_name": "鄞州区",
      "area_code": "330212000000",
      "area_id": 978 },
    {
      "area_name": "奉化区",
      "area_code": "330213000000",
      "area_id": 979 },
    {
      "area_name": "象山县",
      "area_code": "330225000000",
      "area_id": 980 },
    {
      "area_name": "宁海县",
      "area_code": "330226000000",
      "area_id": 981 },
    {
      "area_name": "余姚市",
      "area_code": "330281000000",
      "area_id": 982 },
    {
      "area_name": "慈溪市",
      "area_code": "330282000000",
      "area_id": 983 }],

    "city_id": 88 },
  {
    "city_name": "温州市",
    "city_code": "330300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "330301000000",
      "area_id": 984 },
    {
      "area_name": "鹿城区",
      "area_code": "330302000000",
      "area_id": 985 },
    {
      "area_name": "龙湾区",
      "area_code": "330303000000",
      "area_id": 986 },
    {
      "area_name": "瓯海区",
      "area_code": "330304000000",
      "area_id": 987 },
    {
      "area_name": "洞头区",
      "area_code": "330305000000",
      "area_id": 988 },
    {
      "area_name": "永嘉县",
      "area_code": "330324000000",
      "area_id": 989 },
    {
      "area_name": "平阳县",
      "area_code": "330326000000",
      "area_id": 990 },
    {
      "area_name": "苍南县",
      "area_code": "330327000000",
      "area_id": 991 },
    {
      "area_name": "文成县",
      "area_code": "330328000000",
      "area_id": 992 },
    {
      "area_name": "泰顺县",
      "area_code": "330329000000",
      "area_id": 993 },
    {
      "area_name": "温州经济技术开发区",
      "area_code": "330371000000",
      "area_id": 994 },
    {
      "area_name": "瑞安市",
      "area_code": "330381000000",
      "area_id": 995 },
    {
      "area_name": "乐清市",
      "area_code": "330382000000",
      "area_id": 996 }],

    "city_id": 89 },
  {
    "city_name": "嘉兴市",
    "city_code": "330400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "330401000000",
      "area_id": 997 },
    {
      "area_name": "南湖区",
      "area_code": "330402000000",
      "area_id": 998 },
    {
      "area_name": "秀洲区",
      "area_code": "330411000000",
      "area_id": 999 },
    {
      "area_name": "嘉善县",
      "area_code": "330421000000",
      "area_id": 1000 },
    {
      "area_name": "海盐县",
      "area_code": "330424000000",
      "area_id": 1001 },
    {
      "area_name": "海宁市",
      "area_code": "330481000000",
      "area_id": 1002 },
    {
      "area_name": "平湖市",
      "area_code": "330482000000",
      "area_id": 1003 },
    {
      "area_name": "桐乡市",
      "area_code": "330483000000",
      "area_id": 1004 }],

    "city_id": 90 },
  {
    "city_name": "湖州市",
    "city_code": "330500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "330501000000",
      "area_id": 1005 },
    {
      "area_name": "吴兴区",
      "area_code": "330502000000",
      "area_id": 1006 },
    {
      "area_name": "南浔区",
      "area_code": "330503000000",
      "area_id": 1007 },
    {
      "area_name": "德清县",
      "area_code": "330521000000",
      "area_id": 1008 },
    {
      "area_name": "长兴县",
      "area_code": "330522000000",
      "area_id": 1009 },
    {
      "area_name": "安吉县",
      "area_code": "330523000000",
      "area_id": 1010 }],

    "city_id": 91 },
  {
    "city_name": "绍兴市",
    "city_code": "330600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "330601000000",
      "area_id": 1011 },
    {
      "area_name": "越城区",
      "area_code": "330602000000",
      "area_id": 1012 },
    {
      "area_name": "柯桥区",
      "area_code": "330603000000",
      "area_id": 1013 },
    {
      "area_name": "上虞区",
      "area_code": "330604000000",
      "area_id": 1014 },
    {
      "area_name": "新昌县",
      "area_code": "330624000000",
      "area_id": 1015 },
    {
      "area_name": "诸暨市",
      "area_code": "330681000000",
      "area_id": 1016 },
    {
      "area_name": "嵊州市",
      "area_code": "330683000000",
      "area_id": 1017 }],

    "city_id": 92 },
  {
    "city_name": "金华市",
    "city_code": "330700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "330701000000",
      "area_id": 1018 },
    {
      "area_name": "婺城区",
      "area_code": "330702000000",
      "area_id": 1019 },
    {
      "area_name": "金东区",
      "area_code": "330703000000",
      "area_id": 1020 },
    {
      "area_name": "武义县",
      "area_code": "330723000000",
      "area_id": 1021 },
    {
      "area_name": "浦江县",
      "area_code": "330726000000",
      "area_id": 1022 },
    {
      "area_name": "磐安县",
      "area_code": "330727000000",
      "area_id": 1023 },
    {
      "area_name": "兰溪市",
      "area_code": "330781000000",
      "area_id": 1024 },
    {
      "area_name": "义乌市",
      "area_code": "330782000000",
      "area_id": 1025 },
    {
      "area_name": "东阳市",
      "area_code": "330783000000",
      "area_id": 1026 },
    {
      "area_name": "永康市",
      "area_code": "330784000000",
      "area_id": 1027 }],

    "city_id": 93 },
  {
    "city_name": "衢州市",
    "city_code": "330800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "330801000000",
      "area_id": 1028 },
    {
      "area_name": "柯城区",
      "area_code": "330802000000",
      "area_id": 1029 },
    {
      "area_name": "衢江区",
      "area_code": "330803000000",
      "area_id": 1030 },
    {
      "area_name": "常山县",
      "area_code": "330822000000",
      "area_id": 1031 },
    {
      "area_name": "开化县",
      "area_code": "330824000000",
      "area_id": 1032 },
    {
      "area_name": "龙游县",
      "area_code": "330825000000",
      "area_id": 1033 },
    {
      "area_name": "江山市",
      "area_code": "330881000000",
      "area_id": 1034 }],

    "city_id": 94 },
  {
    "city_name": "舟山市",
    "city_code": "330900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "330901000000",
      "area_id": 1035 },
    {
      "area_name": "定海区",
      "area_code": "330902000000",
      "area_id": 1036 },
    {
      "area_name": "普陀区",
      "area_code": "330903000000",
      "area_id": 1037 },
    {
      "area_name": "岱山县",
      "area_code": "330921000000",
      "area_id": 1038 },
    {
      "area_name": "嵊泗县",
      "area_code": "330922000000",
      "area_id": 1039 }],

    "city_id": 95 },
  {
    "city_name": "台州市",
    "city_code": "331000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "331001000000",
      "area_id": 1040 },
    {
      "area_name": "椒江区",
      "area_code": "331002000000",
      "area_id": 1041 },
    {
      "area_name": "黄岩区",
      "area_code": "331003000000",
      "area_id": 1042 },
    {
      "area_name": "路桥区",
      "area_code": "331004000000",
      "area_id": 1043 },
    {
      "area_name": "三门县",
      "area_code": "331022000000",
      "area_id": 1044 },
    {
      "area_name": "天台县",
      "area_code": "331023000000",
      "area_id": 1045 },
    {
      "area_name": "仙居县",
      "area_code": "331024000000",
      "area_id": 1046 },
    {
      "area_name": "温岭市",
      "area_code": "331081000000",
      "area_id": 1047 },
    {
      "area_name": "临海市",
      "area_code": "331082000000",
      "area_id": 1048 },
    {
      "area_name": "玉环市",
      "area_code": "331083000000",
      "area_id": 1049 }],

    "city_id": 96 },
  {
    "city_name": "丽水市",
    "city_code": "331100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "331101000000",
      "area_id": 1050 },
    {
      "area_name": "莲都区",
      "area_code": "331102000000",
      "area_id": 1051 },
    {
      "area_name": "青田县",
      "area_code": "331121000000",
      "area_id": 1052 },
    {
      "area_name": "缙云县",
      "area_code": "331122000000",
      "area_id": 1053 },
    {
      "area_name": "遂昌县",
      "area_code": "331123000000",
      "area_id": 1054 },
    {
      "area_name": "松阳县",
      "area_code": "331124000000",
      "area_id": 1055 },
    {
      "area_name": "云和县",
      "area_code": "331125000000",
      "area_id": 1056 },
    {
      "area_name": "庆元县",
      "area_code": "331126000000",
      "area_id": 1057 },
    {
      "area_name": "景宁畲族自治县",
      "area_code": "331127000000",
      "area_id": 1058 },
    {
      "area_name": "龙泉市",
      "area_code": "331181000000",
      "area_id": 1059 }],

    "city_id": 97 }],

  "pro_code": "330000",
  "pro_id": 11,
  "pro_name": "浙江省" },
{
  "pro_cities": [{
    "city_name": "合肥市",
    "city_code": "340100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "340101000000",
      "area_id": 1060 },
    {
      "area_name": "瑶海区",
      "area_code": "340102000000",
      "area_id": 1061 },
    {
      "area_name": "庐阳区",
      "area_code": "340103000000",
      "area_id": 1062 },
    {
      "area_name": "蜀山区",
      "area_code": "340104000000",
      "area_id": 1063 },
    {
      "area_name": "包河区",
      "area_code": "340111000000",
      "area_id": 1064 },
    {
      "area_name": "长丰县",
      "area_code": "340121000000",
      "area_id": 1065 },
    {
      "area_name": "肥东县",
      "area_code": "340122000000",
      "area_id": 1066 },
    {
      "area_name": "肥西县",
      "area_code": "340123000000",
      "area_id": 1067 },
    {
      "area_name": "庐江县",
      "area_code": "340124000000",
      "area_id": 1068 },
    {
      "area_name": "合肥高新技术产业开发区",
      "area_code": "340171000000",
      "area_id": 1069 },
    {
      "area_name": "合肥经济技术开发区",
      "area_code": "340172000000",
      "area_id": 1070 },
    {
      "area_name": "合肥新站高新技术产业开发区",
      "area_code": "340173000000",
      "area_id": 1071 },
    {
      "area_name": "巢湖市",
      "area_code": "340181000000",
      "area_id": 1072 }],

    "city_id": 98 },
  {
    "city_name": "芜湖市",
    "city_code": "340200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "340201000000",
      "area_id": 1073 },
    {
      "area_name": "镜湖区",
      "area_code": "340202000000",
      "area_id": 1074 },
    {
      "area_name": "弋江区",
      "area_code": "340203000000",
      "area_id": 1075 },
    {
      "area_name": "鸠江区",
      "area_code": "340207000000",
      "area_id": 1076 },
    {
      "area_name": "三山区",
      "area_code": "340208000000",
      "area_id": 1077 },
    {
      "area_name": "芜湖县",
      "area_code": "340221000000",
      "area_id": 1078 },
    {
      "area_name": "繁昌县",
      "area_code": "340222000000",
      "area_id": 1079 },
    {
      "area_name": "南陵县",
      "area_code": "340223000000",
      "area_id": 1080 },
    {
      "area_name": "无为县",
      "area_code": "340225000000",
      "area_id": 1081 },
    {
      "area_name": "芜湖经济技术开发区",
      "area_code": "340271000000",
      "area_id": 1082 },
    {
      "area_name": "安徽芜湖长江大桥经济开发区",
      "area_code": "340272000000",
      "area_id": 1083 }],

    "city_id": 99 },
  {
    "city_name": "蚌埠市",
    "city_code": "340300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "340301000000",
      "area_id": 1084 },
    {
      "area_name": "龙子湖区",
      "area_code": "340302000000",
      "area_id": 1085 },
    {
      "area_name": "蚌山区",
      "area_code": "340303000000",
      "area_id": 1086 },
    {
      "area_name": "禹会区",
      "area_code": "340304000000",
      "area_id": 1087 },
    {
      "area_name": "淮上区",
      "area_code": "340311000000",
      "area_id": 1088 },
    {
      "area_name": "怀远县",
      "area_code": "340321000000",
      "area_id": 1089 },
    {
      "area_name": "五河县",
      "area_code": "340322000000",
      "area_id": 1090 },
    {
      "area_name": "固镇县",
      "area_code": "340323000000",
      "area_id": 1091 },
    {
      "area_name": "蚌埠市高新技术开发区",
      "area_code": "340371000000",
      "area_id": 1092 },
    {
      "area_name": "蚌埠市经济开发区",
      "area_code": "340372000000",
      "area_id": 1093 }],

    "city_id": 100 },
  {
    "city_name": "淮南市",
    "city_code": "340400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "340401000000",
      "area_id": 1094 },
    {
      "area_name": "大通区",
      "area_code": "340402000000",
      "area_id": 1095 },
    {
      "area_name": "田家庵区",
      "area_code": "340403000000",
      "area_id": 1096 },
    {
      "area_name": "谢家集区",
      "area_code": "340404000000",
      "area_id": 1097 },
    {
      "area_name": "八公山区",
      "area_code": "340405000000",
      "area_id": 1098 },
    {
      "area_name": "潘集区",
      "area_code": "340406000000",
      "area_id": 1099 },
    {
      "area_name": "凤台县",
      "area_code": "340421000000",
      "area_id": 1100 },
    {
      "area_name": "寿县",
      "area_code": "340422000000",
      "area_id": 1101 }],

    "city_id": 101 },
  {
    "city_name": "马鞍山市",
    "city_code": "340500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "340501000000",
      "area_id": 1102 },
    {
      "area_name": "花山区",
      "area_code": "340503000000",
      "area_id": 1103 },
    {
      "area_name": "雨山区",
      "area_code": "340504000000",
      "area_id": 1104 },
    {
      "area_name": "博望区",
      "area_code": "340506000000",
      "area_id": 1105 },
    {
      "area_name": "当涂县",
      "area_code": "340521000000",
      "area_id": 1106 },
    {
      "area_name": "含山县",
      "area_code": "340522000000",
      "area_id": 1107 },
    {
      "area_name": "和县",
      "area_code": "340523000000",
      "area_id": 1108 }],

    "city_id": 102 },
  {
    "city_name": "淮北市",
    "city_code": "340600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "340601000000",
      "area_id": 1109 },
    {
      "area_name": "杜集区",
      "area_code": "340602000000",
      "area_id": 1110 },
    {
      "area_name": "相山区",
      "area_code": "340603000000",
      "area_id": 1111 },
    {
      "area_name": "烈山区",
      "area_code": "340604000000",
      "area_id": 1112 },
    {
      "area_name": "濉溪县",
      "area_code": "340621000000",
      "area_id": 1113 }],

    "city_id": 103 },
  {
    "city_name": "铜陵市",
    "city_code": "340700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "340701000000",
      "area_id": 1114 },
    {
      "area_name": "铜官区",
      "area_code": "340705000000",
      "area_id": 1115 },
    {
      "area_name": "义安区",
      "area_code": "340706000000",
      "area_id": 1116 },
    {
      "area_name": "郊区",
      "area_code": "340711000000",
      "area_id": 1117 },
    {
      "area_name": "枞阳县",
      "area_code": "340722000000",
      "area_id": 1118 }],

    "city_id": 104 },
  {
    "city_name": "安庆市",
    "city_code": "340800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "340801000000",
      "area_id": 1119 },
    {
      "area_name": "迎江区",
      "area_code": "340802000000",
      "area_id": 1120 },
    {
      "area_name": "大观区",
      "area_code": "340803000000",
      "area_id": 1121 },
    {
      "area_name": "宜秀区",
      "area_code": "340811000000",
      "area_id": 1122 },
    {
      "area_name": "怀宁县",
      "area_code": "340822000000",
      "area_id": 1123 },
    {
      "area_name": "太湖县",
      "area_code": "340825000000",
      "area_id": 1124 },
    {
      "area_name": "宿松县",
      "area_code": "340826000000",
      "area_id": 1125 },
    {
      "area_name": "望江县",
      "area_code": "340827000000",
      "area_id": 1126 },
    {
      "area_name": "岳西县",
      "area_code": "340828000000",
      "area_id": 1127 },
    {
      "area_name": "安徽安庆经济开发区",
      "area_code": "340871000000",
      "area_id": 1128 },
    {
      "area_name": "桐城市",
      "area_code": "340881000000",
      "area_id": 1129 },
    {
      "area_name": "潜山市",
      "area_code": "340882000000",
      "area_id": 1130 }],

    "city_id": 105 },
  {
    "city_name": "黄山市",
    "city_code": "341000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "341001000000",
      "area_id": 1131 },
    {
      "area_name": "屯溪区",
      "area_code": "341002000000",
      "area_id": 1132 },
    {
      "area_name": "黄山区",
      "area_code": "341003000000",
      "area_id": 1133 },
    {
      "area_name": "徽州区",
      "area_code": "341004000000",
      "area_id": 1134 },
    {
      "area_name": "歙县",
      "area_code": "341021000000",
      "area_id": 1135 },
    {
      "area_name": "休宁县",
      "area_code": "341022000000",
      "area_id": 1136 },
    {
      "area_name": "黟县",
      "area_code": "341023000000",
      "area_id": 1137 },
    {
      "area_name": "祁门县",
      "area_code": "341024000000",
      "area_id": 1138 }],

    "city_id": 106 },
  {
    "city_name": "滁州市",
    "city_code": "341100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "341101000000",
      "area_id": 1139 },
    {
      "area_name": "琅琊区",
      "area_code": "341102000000",
      "area_id": 1140 },
    {
      "area_name": "南谯区",
      "area_code": "341103000000",
      "area_id": 1141 },
    {
      "area_name": "来安县",
      "area_code": "341122000000",
      "area_id": 1142 },
    {
      "area_name": "全椒县",
      "area_code": "341124000000",
      "area_id": 1143 },
    {
      "area_name": "定远县",
      "area_code": "341125000000",
      "area_id": 1144 },
    {
      "area_name": "凤阳县",
      "area_code": "341126000000",
      "area_id": 1145 },
    {
      "area_name": "苏滁现代产业园",
      "area_code": "341171000000",
      "area_id": 1146 },
    {
      "area_name": "滁州经济技术开发区",
      "area_code": "341172000000",
      "area_id": 1147 },
    {
      "area_name": "天长市",
      "area_code": "341181000000",
      "area_id": 1148 },
    {
      "area_name": "明光市",
      "area_code": "341182000000",
      "area_id": 1149 }],

    "city_id": 107 },
  {
    "city_name": "阜阳市",
    "city_code": "341200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "341201000000",
      "area_id": 1150 },
    {
      "area_name": "颍州区",
      "area_code": "341202000000",
      "area_id": 1151 },
    {
      "area_name": "颍东区",
      "area_code": "341203000000",
      "area_id": 1152 },
    {
      "area_name": "颍泉区",
      "area_code": "341204000000",
      "area_id": 1153 },
    {
      "area_name": "临泉县",
      "area_code": "341221000000",
      "area_id": 1154 },
    {
      "area_name": "太和县",
      "area_code": "341222000000",
      "area_id": 1155 },
    {
      "area_name": "阜南县",
      "area_code": "341225000000",
      "area_id": 1156 },
    {
      "area_name": "颍上县",
      "area_code": "341226000000",
      "area_id": 1157 },
    {
      "area_name": "阜阳合肥现代产业园区",
      "area_code": "341271000000",
      "area_id": 1158 },
    {
      "area_name": "阜阳经济技术开发区",
      "area_code": "341272000000",
      "area_id": 1159 },
    {
      "area_name": "界首市",
      "area_code": "341282000000",
      "area_id": 1160 }],

    "city_id": 108 },
  {
    "city_name": "宿州市",
    "city_code": "341300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "341301000000",
      "area_id": 1161 },
    {
      "area_name": "埇桥区",
      "area_code": "341302000000",
      "area_id": 1162 },
    {
      "area_name": "砀山县",
      "area_code": "341321000000",
      "area_id": 1163 },
    {
      "area_name": "萧县",
      "area_code": "341322000000",
      "area_id": 1164 },
    {
      "area_name": "灵璧县",
      "area_code": "341323000000",
      "area_id": 1165 },
    {
      "area_name": "泗县",
      "area_code": "341324000000",
      "area_id": 1166 },
    {
      "area_name": "宿州马鞍山现代产业园区",
      "area_code": "341371000000",
      "area_id": 1167 },
    {
      "area_name": "宿州经济技术开发区",
      "area_code": "341372000000",
      "area_id": 1168 }],

    "city_id": 109 },
  {
    "city_name": "六安市",
    "city_code": "341500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "341501000000",
      "area_id": 1169 },
    {
      "area_name": "金安区",
      "area_code": "341502000000",
      "area_id": 1170 },
    {
      "area_name": "裕安区",
      "area_code": "341503000000",
      "area_id": 1171 },
    {
      "area_name": "叶集区",
      "area_code": "341504000000",
      "area_id": 1172 },
    {
      "area_name": "霍邱县",
      "area_code": "341522000000",
      "area_id": 1173 },
    {
      "area_name": "舒城县",
      "area_code": "341523000000",
      "area_id": 1174 },
    {
      "area_name": "金寨县",
      "area_code": "341524000000",
      "area_id": 1175 },
    {
      "area_name": "霍山县",
      "area_code": "341525000000",
      "area_id": 1176 }],

    "city_id": 110 },
  {
    "city_name": "亳州市",
    "city_code": "341600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "341601000000",
      "area_id": 1177 },
    {
      "area_name": "谯城区",
      "area_code": "341602000000",
      "area_id": 1178 },
    {
      "area_name": "涡阳县",
      "area_code": "341621000000",
      "area_id": 1179 },
    {
      "area_name": "蒙城县",
      "area_code": "341622000000",
      "area_id": 1180 },
    {
      "area_name": "利辛县",
      "area_code": "341623000000",
      "area_id": 1181 }],

    "city_id": 111 },
  {
    "city_name": "池州市",
    "city_code": "341700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "341701000000",
      "area_id": 1182 },
    {
      "area_name": "贵池区",
      "area_code": "341702000000",
      "area_id": 1183 },
    {
      "area_name": "东至县",
      "area_code": "341721000000",
      "area_id": 1184 },
    {
      "area_name": "石台县",
      "area_code": "341722000000",
      "area_id": 1185 },
    {
      "area_name": "青阳县",
      "area_code": "341723000000",
      "area_id": 1186 }],

    "city_id": 112 },
  {
    "city_name": "宣城市",
    "city_code": "341800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "341801000000",
      "area_id": 1187 },
    {
      "area_name": "宣州区",
      "area_code": "341802000000",
      "area_id": 1188 },
    {
      "area_name": "郎溪县",
      "area_code": "341821000000",
      "area_id": 1189 },
    {
      "area_name": "广德县",
      "area_code": "341822000000",
      "area_id": 1190 },
    {
      "area_name": "泾县",
      "area_code": "341823000000",
      "area_id": 1191 },
    {
      "area_name": "绩溪县",
      "area_code": "341824000000",
      "area_id": 1192 },
    {
      "area_name": "旌德县",
      "area_code": "341825000000",
      "area_id": 1193 },
    {
      "area_name": "宣城市经济开发区",
      "area_code": "341871000000",
      "area_id": 1194 },
    {
      "area_name": "宁国市",
      "area_code": "341881000000",
      "area_id": 1195 }],

    "city_id": 113 }],

  "pro_code": "340000",
  "pro_id": 12,
  "pro_name": "安徽省" },
{
  "pro_cities": [{
    "city_name": "福州市",
    "city_code": "350100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "350101000000",
      "area_id": 1196 },
    {
      "area_name": "鼓楼区",
      "area_code": "350102000000",
      "area_id": 1197 },
    {
      "area_name": "台江区",
      "area_code": "350103000000",
      "area_id": 1198 },
    {
      "area_name": "仓山区",
      "area_code": "350104000000",
      "area_id": 1199 },
    {
      "area_name": "马尾区",
      "area_code": "350105000000",
      "area_id": 1200 },
    {
      "area_name": "晋安区",
      "area_code": "350111000000",
      "area_id": 1201 },
    {
      "area_name": "长乐区",
      "area_code": "350112000000",
      "area_id": 1202 },
    {
      "area_name": "闽侯县",
      "area_code": "350121000000",
      "area_id": 1203 },
    {
      "area_name": "连江县",
      "area_code": "350122000000",
      "area_id": 1204 },
    {
      "area_name": "罗源县",
      "area_code": "350123000000",
      "area_id": 1205 },
    {
      "area_name": "闽清县",
      "area_code": "350124000000",
      "area_id": 1206 },
    {
      "area_name": "永泰县",
      "area_code": "350125000000",
      "area_id": 1207 },
    {
      "area_name": "平潭县",
      "area_code": "350128000000",
      "area_id": 1208 },
    {
      "area_name": "福清市",
      "area_code": "350181000000",
      "area_id": 1209 }],

    "city_id": 114 },
  {
    "city_name": "厦门市",
    "city_code": "350200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "350201000000",
      "area_id": 1210 },
    {
      "area_name": "思明区",
      "area_code": "350203000000",
      "area_id": 1211 },
    {
      "area_name": "海沧区",
      "area_code": "350205000000",
      "area_id": 1212 },
    {
      "area_name": "湖里区",
      "area_code": "350206000000",
      "area_id": 1213 },
    {
      "area_name": "集美区",
      "area_code": "350211000000",
      "area_id": 1214 },
    {
      "area_name": "同安区",
      "area_code": "350212000000",
      "area_id": 1215 },
    {
      "area_name": "翔安区",
      "area_code": "350213000000",
      "area_id": 1216 }],

    "city_id": 115 },
  {
    "city_name": "莆田市",
    "city_code": "350300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "350301000000",
      "area_id": 1217 },
    {
      "area_name": "城厢区",
      "area_code": "350302000000",
      "area_id": 1218 },
    {
      "area_name": "涵江区",
      "area_code": "350303000000",
      "area_id": 1219 },
    {
      "area_name": "荔城区",
      "area_code": "350304000000",
      "area_id": 1220 },
    {
      "area_name": "秀屿区",
      "area_code": "350305000000",
      "area_id": 1221 },
    {
      "area_name": "仙游县",
      "area_code": "350322000000",
      "area_id": 1222 }],

    "city_id": 116 },
  {
    "city_name": "三明市",
    "city_code": "350400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "350401000000",
      "area_id": 1223 },
    {
      "area_name": "梅列区",
      "area_code": "350402000000",
      "area_id": 1224 },
    {
      "area_name": "三元区",
      "area_code": "350403000000",
      "area_id": 1225 },
    {
      "area_name": "明溪县",
      "area_code": "350421000000",
      "area_id": 1226 },
    {
      "area_name": "清流县",
      "area_code": "350423000000",
      "area_id": 1227 },
    {
      "area_name": "宁化县",
      "area_code": "350424000000",
      "area_id": 1228 },
    {
      "area_name": "大田县",
      "area_code": "350425000000",
      "area_id": 1229 },
    {
      "area_name": "尤溪县",
      "area_code": "350426000000",
      "area_id": 1230 },
    {
      "area_name": "沙县",
      "area_code": "350427000000",
      "area_id": 1231 },
    {
      "area_name": "将乐县",
      "area_code": "350428000000",
      "area_id": 1232 },
    {
      "area_name": "泰宁县",
      "area_code": "350429000000",
      "area_id": 1233 },
    {
      "area_name": "建宁县",
      "area_code": "350430000000",
      "area_id": 1234 },
    {
      "area_name": "永安市",
      "area_code": "350481000000",
      "area_id": 1235 }],

    "city_id": 117 },
  {
    "city_name": "泉州市",
    "city_code": "350500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "350501000000",
      "area_id": 1236 },
    {
      "area_name": "金门县",
      "area_code": "350527000000",
      "area_id": 1237 },
    {
      "area_name": "鲤城区",
      "area_code": "350502000000",
      "area_id": 1238 },
    {
      "area_name": "丰泽区",
      "area_code": "350503000000",
      "area_id": 1239 },
    {
      "area_name": "洛江区",
      "area_code": "350504000000",
      "area_id": 1240 },
    {
      "area_name": "泉港区",
      "area_code": "350505000000",
      "area_id": 1241 },
    {
      "area_name": "惠安县",
      "area_code": "350521000000",
      "area_id": 1242 },
    {
      "area_name": "安溪县",
      "area_code": "350524000000",
      "area_id": 1243 },
    {
      "area_name": "永春县",
      "area_code": "350525000000",
      "area_id": 1244 },
    {
      "area_name": "德化县",
      "area_code": "350526000000",
      "area_id": 1245 },
    {
      "area_name": "石狮市",
      "area_code": "350581000000",
      "area_id": 1246 },
    {
      "area_name": "晋江市",
      "area_code": "350582000000",
      "area_id": 1247 },
    {
      "area_name": "南安市",
      "area_code": "350583000000",
      "area_id": 1248 }],

    "city_id": 118 },
  {
    "city_name": "漳州市",
    "city_code": "350600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "350601000000",
      "area_id": 1249 },
    {
      "area_name": "芗城区",
      "area_code": "350602000000",
      "area_id": 1250 },
    {
      "area_name": "龙文区",
      "area_code": "350603000000",
      "area_id": 1251 },
    {
      "area_name": "云霄县",
      "area_code": "350622000000",
      "area_id": 1252 },
    {
      "area_name": "漳浦县",
      "area_code": "350623000000",
      "area_id": 1253 },
    {
      "area_name": "诏安县",
      "area_code": "350624000000",
      "area_id": 1254 },
    {
      "area_name": "长泰县",
      "area_code": "350625000000",
      "area_id": 1255 },
    {
      "area_name": "东山县",
      "area_code": "350626000000",
      "area_id": 1256 },
    {
      "area_name": "南靖县",
      "area_code": "350627000000",
      "area_id": 1257 },
    {
      "area_name": "平和县",
      "area_code": "350628000000",
      "area_id": 1258 },
    {
      "area_name": "华安县",
      "area_code": "350629000000",
      "area_id": 1259 },
    {
      "area_name": "龙海市",
      "area_code": "350681000000",
      "area_id": 1260 }],

    "city_id": 119 },
  {
    "city_name": "南平市",
    "city_code": "350700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "350701000000",
      "area_id": 1261 },
    {
      "area_name": "延平区",
      "area_code": "350702000000",
      "area_id": 1262 },
    {
      "area_name": "建阳区",
      "area_code": "350703000000",
      "area_id": 1263 },
    {
      "area_name": "顺昌县",
      "area_code": "350721000000",
      "area_id": 1264 },
    {
      "area_name": "浦城县",
      "area_code": "350722000000",
      "area_id": 1265 },
    {
      "area_name": "光泽县",
      "area_code": "350723000000",
      "area_id": 1266 },
    {
      "area_name": "松溪县",
      "area_code": "350724000000",
      "area_id": 1267 },
    {
      "area_name": "政和县",
      "area_code": "350725000000",
      "area_id": 1268 },
    {
      "area_name": "邵武市",
      "area_code": "350781000000",
      "area_id": 1269 },
    {
      "area_name": "武夷山市",
      "area_code": "350782000000",
      "area_id": 1270 },
    {
      "area_name": "建瓯市",
      "area_code": "350783000000",
      "area_id": 1271 }],

    "city_id": 120 },
  {
    "city_name": "龙岩市",
    "city_code": "350800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "350801000000",
      "area_id": 1272 },
    {
      "area_name": "新罗区",
      "area_code": "350802000000",
      "area_id": 1273 },
    {
      "area_name": "永定区",
      "area_code": "350803000000",
      "area_id": 1274 },
    {
      "area_name": "长汀县",
      "area_code": "350821000000",
      "area_id": 1275 },
    {
      "area_name": "上杭县",
      "area_code": "350823000000",
      "area_id": 1276 },
    {
      "area_name": "武平县",
      "area_code": "350824000000",
      "area_id": 1277 },
    {
      "area_name": "连城县",
      "area_code": "350825000000",
      "area_id": 1278 },
    {
      "area_name": "漳平市",
      "area_code": "350881000000",
      "area_id": 1279 }],

    "city_id": 121 },
  {
    "city_name": "宁德市",
    "city_code": "350900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "350901000000",
      "area_id": 1280 },
    {
      "area_name": "蕉城区",
      "area_code": "350902000000",
      "area_id": 1281 },
    {
      "area_name": "霞浦县",
      "area_code": "350921000000",
      "area_id": 1282 },
    {
      "area_name": "古田县",
      "area_code": "350922000000",
      "area_id": 1283 },
    {
      "area_name": "屏南县",
      "area_code": "350923000000",
      "area_id": 1284 },
    {
      "area_name": "寿宁县",
      "area_code": "350924000000",
      "area_id": 1285 },
    {
      "area_name": "周宁县",
      "area_code": "350925000000",
      "area_id": 1286 },
    {
      "area_name": "柘荣县",
      "area_code": "350926000000",
      "area_id": 1287 },
    {
      "area_name": "福安市",
      "area_code": "350981000000",
      "area_id": 1288 },
    {
      "area_name": "福鼎市",
      "area_code": "350982000000",
      "area_id": 1289 }],

    "city_id": 122 }],

  "pro_code": "350000",
  "pro_id": 13,
  "pro_name": "福建省" },
{
  "pro_cities": [{
    "city_name": "南昌市",
    "city_code": "360100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "360101000000",
      "area_id": 1290 },
    {
      "area_name": "东湖区",
      "area_code": "360102000000",
      "area_id": 1291 },
    {
      "area_name": "西湖区",
      "area_code": "360103000000",
      "area_id": 1292 },
    {
      "area_name": "青云谱区",
      "area_code": "360104000000",
      "area_id": 1293 },
    {
      "area_name": "湾里区",
      "area_code": "360105000000",
      "area_id": 1294 },
    {
      "area_name": "青山湖区",
      "area_code": "360111000000",
      "area_id": 1295 },
    {
      "area_name": "新建区",
      "area_code": "360112000000",
      "area_id": 1296 },
    {
      "area_name": "南昌县",
      "area_code": "360121000000",
      "area_id": 1297 },
    {
      "area_name": "安义县",
      "area_code": "360123000000",
      "area_id": 1298 },
    {
      "area_name": "进贤县",
      "area_code": "360124000000",
      "area_id": 1299 }],

    "city_id": 123 },
  {
    "city_name": "景德镇市",
    "city_code": "360200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "360201000000",
      "area_id": 1300 },
    {
      "area_name": "昌江区",
      "area_code": "360202000000",
      "area_id": 1301 },
    {
      "area_name": "珠山区",
      "area_code": "360203000000",
      "area_id": 1302 },
    {
      "area_name": "浮梁县",
      "area_code": "360222000000",
      "area_id": 1303 },
    {
      "area_name": "乐平市",
      "area_code": "360281000000",
      "area_id": 1304 }],

    "city_id": 124 },
  {
    "city_name": "萍乡市",
    "city_code": "360300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "360301000000",
      "area_id": 1305 },
    {
      "area_name": "安源区",
      "area_code": "360302000000",
      "area_id": 1306 },
    {
      "area_name": "湘东区",
      "area_code": "360313000000",
      "area_id": 1307 },
    {
      "area_name": "莲花县",
      "area_code": "360321000000",
      "area_id": 1308 },
    {
      "area_name": "上栗县",
      "area_code": "360322000000",
      "area_id": 1309 },
    {
      "area_name": "芦溪县",
      "area_code": "360323000000",
      "area_id": 1310 }],

    "city_id": 125 },
  {
    "city_name": "九江市",
    "city_code": "360400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "360401000000",
      "area_id": 1311 },
    {
      "area_name": "濂溪区",
      "area_code": "360402000000",
      "area_id": 1312 },
    {
      "area_name": "浔阳区",
      "area_code": "360403000000",
      "area_id": 1313 },
    {
      "area_name": "柴桑区",
      "area_code": "360404000000",
      "area_id": 1314 },
    {
      "area_name": "武宁县",
      "area_code": "360423000000",
      "area_id": 1315 },
    {
      "area_name": "修水县",
      "area_code": "360424000000",
      "area_id": 1316 },
    {
      "area_name": "永修县",
      "area_code": "360425000000",
      "area_id": 1317 },
    {
      "area_name": "德安县",
      "area_code": "360426000000",
      "area_id": 1318 },
    {
      "area_name": "都昌县",
      "area_code": "360428000000",
      "area_id": 1319 },
    {
      "area_name": "湖口县",
      "area_code": "360429000000",
      "area_id": 1320 },
    {
      "area_name": "彭泽县",
      "area_code": "360430000000",
      "area_id": 1321 },
    {
      "area_name": "瑞昌市",
      "area_code": "360481000000",
      "area_id": 1322 },
    {
      "area_name": "共青城市",
      "area_code": "360482000000",
      "area_id": 1323 },
    {
      "area_name": "庐山市",
      "area_code": "360483000000",
      "area_id": 1324 }],

    "city_id": 126 },
  {
    "city_name": "新余市",
    "city_code": "360500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "360501000000",
      "area_id": 1325 },
    {
      "area_name": "渝水区",
      "area_code": "360502000000",
      "area_id": 1326 },
    {
      "area_name": "分宜县",
      "area_code": "360521000000",
      "area_id": 1327 }],

    "city_id": 127 },
  {
    "city_name": "鹰潭市",
    "city_code": "360600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "360601000000",
      "area_id": 1328 },
    {
      "area_name": "月湖区",
      "area_code": "360602000000",
      "area_id": 1329 },
    {
      "area_name": "余江区",
      "area_code": "360603000000",
      "area_id": 1330 },
    {
      "area_name": "贵溪市",
      "area_code": "360681000000",
      "area_id": 1331 }],

    "city_id": 128 },
  {
    "city_name": "赣州市",
    "city_code": "360700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "360701000000",
      "area_id": 1332 },
    {
      "area_name": "章贡区",
      "area_code": "360702000000",
      "area_id": 1333 },
    {
      "area_name": "南康区",
      "area_code": "360703000000",
      "area_id": 1334 },
    {
      "area_name": "赣县区",
      "area_code": "360704000000",
      "area_id": 1335 },
    {
      "area_name": "信丰县",
      "area_code": "360722000000",
      "area_id": 1336 },
    {
      "area_name": "大余县",
      "area_code": "360723000000",
      "area_id": 1337 },
    {
      "area_name": "上犹县",
      "area_code": "360724000000",
      "area_id": 1338 },
    {
      "area_name": "崇义县",
      "area_code": "360725000000",
      "area_id": 1339 },
    {
      "area_name": "安远县",
      "area_code": "360726000000",
      "area_id": 1340 },
    {
      "area_name": "龙南县",
      "area_code": "360727000000",
      "area_id": 1341 },
    {
      "area_name": "定南县",
      "area_code": "360728000000",
      "area_id": 1342 },
    {
      "area_name": "全南县",
      "area_code": "360729000000",
      "area_id": 1343 },
    {
      "area_name": "宁都县",
      "area_code": "360730000000",
      "area_id": 1344 },
    {
      "area_name": "于都县",
      "area_code": "360731000000",
      "area_id": 1345 },
    {
      "area_name": "兴国县",
      "area_code": "360732000000",
      "area_id": 1346 },
    {
      "area_name": "会昌县",
      "area_code": "360733000000",
      "area_id": 1347 },
    {
      "area_name": "寻乌县",
      "area_code": "360734000000",
      "area_id": 1348 },
    {
      "area_name": "石城县",
      "area_code": "360735000000",
      "area_id": 1349 },
    {
      "area_name": "瑞金市",
      "area_code": "360781000000",
      "area_id": 1350 }],

    "city_id": 129 },
  {
    "city_name": "吉安市",
    "city_code": "360800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "360801000000",
      "area_id": 1351 },
    {
      "area_name": "吉州区",
      "area_code": "360802000000",
      "area_id": 1352 },
    {
      "area_name": "青原区",
      "area_code": "360803000000",
      "area_id": 1353 },
    {
      "area_name": "吉安县",
      "area_code": "360821000000",
      "area_id": 1354 },
    {
      "area_name": "吉水县",
      "area_code": "360822000000",
      "area_id": 1355 },
    {
      "area_name": "峡江县",
      "area_code": "360823000000",
      "area_id": 1356 },
    {
      "area_name": "新干县",
      "area_code": "360824000000",
      "area_id": 1357 },
    {
      "area_name": "永丰县",
      "area_code": "360825000000",
      "area_id": 1358 },
    {
      "area_name": "泰和县",
      "area_code": "360826000000",
      "area_id": 1359 },
    {
      "area_name": "遂川县",
      "area_code": "360827000000",
      "area_id": 1360 },
    {
      "area_name": "万安县",
      "area_code": "360828000000",
      "area_id": 1361 },
    {
      "area_name": "安福县",
      "area_code": "360829000000",
      "area_id": 1362 },
    {
      "area_name": "永新县",
      "area_code": "360830000000",
      "area_id": 1363 },
    {
      "area_name": "井冈山市",
      "area_code": "360881000000",
      "area_id": 1364 }],

    "city_id": 130 },
  {
    "city_name": "宜春市",
    "city_code": "360900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "360901000000",
      "area_id": 1365 },
    {
      "area_name": "袁州区",
      "area_code": "360902000000",
      "area_id": 1366 },
    {
      "area_name": "奉新县",
      "area_code": "360921000000",
      "area_id": 1367 },
    {
      "area_name": "万载县",
      "area_code": "360922000000",
      "area_id": 1368 },
    {
      "area_name": "上高县",
      "area_code": "360923000000",
      "area_id": 1369 },
    {
      "area_name": "宜丰县",
      "area_code": "360924000000",
      "area_id": 1370 },
    {
      "area_name": "靖安县",
      "area_code": "360925000000",
      "area_id": 1371 },
    {
      "area_name": "铜鼓县",
      "area_code": "360926000000",
      "area_id": 1372 },
    {
      "area_name": "丰城市",
      "area_code": "360981000000",
      "area_id": 1373 },
    {
      "area_name": "樟树市",
      "area_code": "360982000000",
      "area_id": 1374 },
    {
      "area_name": "高安市",
      "area_code": "360983000000",
      "area_id": 1375 }],

    "city_id": 131 },
  {
    "city_name": "抚州市",
    "city_code": "361000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "361001000000",
      "area_id": 1376 },
    {
      "area_name": "临川区",
      "area_code": "361002000000",
      "area_id": 1377 },
    {
      "area_name": "东乡区",
      "area_code": "361003000000",
      "area_id": 1378 },
    {
      "area_name": "南城县",
      "area_code": "361021000000",
      "area_id": 1379 },
    {
      "area_name": "黎川县",
      "area_code": "361022000000",
      "area_id": 1380 },
    {
      "area_name": "南丰县",
      "area_code": "361023000000",
      "area_id": 1381 },
    {
      "area_name": "崇仁县",
      "area_code": "361024000000",
      "area_id": 1382 },
    {
      "area_name": "乐安县",
      "area_code": "361025000000",
      "area_id": 1383 },
    {
      "area_name": "宜黄县",
      "area_code": "361026000000",
      "area_id": 1384 },
    {
      "area_name": "金溪县",
      "area_code": "361027000000",
      "area_id": 1385 },
    {
      "area_name": "资溪县",
      "area_code": "361028000000",
      "area_id": 1386 },
    {
      "area_name": "广昌县",
      "area_code": "361030000000",
      "area_id": 1387 }],

    "city_id": 132 },
  {
    "city_name": "上饶市",
    "city_code": "361100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "361101000000",
      "area_id": 1388 },
    {
      "area_name": "信州区",
      "area_code": "361102000000",
      "area_id": 1389 },
    {
      "area_name": "广丰区",
      "area_code": "361103000000",
      "area_id": 1390 },
    {
      "area_name": "上饶县",
      "area_code": "361121000000",
      "area_id": 1391 },
    {
      "area_name": "玉山县",
      "area_code": "361123000000",
      "area_id": 1392 },
    {
      "area_name": "铅山县",
      "area_code": "361124000000",
      "area_id": 1393 },
    {
      "area_name": "横峰县",
      "area_code": "361125000000",
      "area_id": 1394 },
    {
      "area_name": "弋阳县",
      "area_code": "361126000000",
      "area_id": 1395 },
    {
      "area_name": "余干县",
      "area_code": "361127000000",
      "area_id": 1396 },
    {
      "area_name": "鄱阳县",
      "area_code": "361128000000",
      "area_id": 1397 },
    {
      "area_name": "万年县",
      "area_code": "361129000000",
      "area_id": 1398 },
    {
      "area_name": "婺源县",
      "area_code": "361130000000",
      "area_id": 1399 },
    {
      "area_name": "德兴市",
      "area_code": "361181000000",
      "area_id": 1400 }],

    "city_id": 133 }],

  "pro_code": "360000",
  "pro_id": 14,
  "pro_name": "江西省" },
{
  "pro_cities": [{
    "city_name": "济南市",
    "city_code": "370100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "370101000000",
      "area_id": 1401 },
    {
      "area_name": "历下区",
      "area_code": "370102000000",
      "area_id": 1402 },
    {
      "area_name": "市中区",
      "area_code": "370103000000",
      "area_id": 1403 },
    {
      "area_name": "槐荫区",
      "area_code": "370104000000",
      "area_id": 1404 },
    {
      "area_name": "天桥区",
      "area_code": "370105000000",
      "area_id": 1405 },
    {
      "area_name": "历城区",
      "area_code": "370112000000",
      "area_id": 1406 },
    {
      "area_name": "长清区",
      "area_code": "370113000000",
      "area_id": 1407 },
    {
      "area_name": "章丘区",
      "area_code": "370114000000",
      "area_id": 1408 },
    {
      "area_name": "济阳区",
      "area_code": "370115000000",
      "area_id": 1409 },
    {
      "area_name": "平阴县",
      "area_code": "370124000000",
      "area_id": 1410 },
    {
      "area_name": "商河县",
      "area_code": "370126000000",
      "area_id": 1411 },
    {
      "area_name": "济南高新技术产业开发区",
      "area_code": "370171000000",
      "area_id": 1412 }],

    "city_id": 134 },
  {
    "city_name": "青岛市",
    "city_code": "370200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "370201000000",
      "area_id": 1413 },
    {
      "area_name": "市南区",
      "area_code": "370202000000",
      "area_id": 1414 },
    {
      "area_name": "市北区",
      "area_code": "370203000000",
      "area_id": 1415 },
    {
      "area_name": "黄岛区",
      "area_code": "370211000000",
      "area_id": 1416 },
    {
      "area_name": "崂山区",
      "area_code": "370212000000",
      "area_id": 1417 },
    {
      "area_name": "李沧区",
      "area_code": "370213000000",
      "area_id": 1418 },
    {
      "area_name": "城阳区",
      "area_code": "370214000000",
      "area_id": 1419 },
    {
      "area_name": "即墨区",
      "area_code": "370215000000",
      "area_id": 1420 },
    {
      "area_name": "青岛高新技术产业开发区",
      "area_code": "370271000000",
      "area_id": 1421 },
    {
      "area_name": "胶州市",
      "area_code": "370281000000",
      "area_id": 1422 },
    {
      "area_name": "平度市",
      "area_code": "370283000000",
      "area_id": 1423 },
    {
      "area_name": "莱西市",
      "area_code": "370285000000",
      "area_id": 1424 }],

    "city_id": 135 },
  {
    "city_name": "淄博市",
    "city_code": "370300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "370301000000",
      "area_id": 1425 },
    {
      "area_name": "淄川区",
      "area_code": "370302000000",
      "area_id": 1426 },
    {
      "area_name": "张店区",
      "area_code": "370303000000",
      "area_id": 1427 },
    {
      "area_name": "博山区",
      "area_code": "370304000000",
      "area_id": 1428 },
    {
      "area_name": "临淄区",
      "area_code": "370305000000",
      "area_id": 1429 },
    {
      "area_name": "周村区",
      "area_code": "370306000000",
      "area_id": 1430 },
    {
      "area_name": "桓台县",
      "area_code": "370321000000",
      "area_id": 1431 },
    {
      "area_name": "高青县",
      "area_code": "370322000000",
      "area_id": 1432 },
    {
      "area_name": "沂源县",
      "area_code": "370323000000",
      "area_id": 1433 }],

    "city_id": 136 },
  {
    "city_name": "枣庄市",
    "city_code": "370400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "370401000000",
      "area_id": 1434 },
    {
      "area_name": "市中区",
      "area_code": "370402000000",
      "area_id": 1435 },
    {
      "area_name": "薛城区",
      "area_code": "370403000000",
      "area_id": 1436 },
    {
      "area_name": "峄城区",
      "area_code": "370404000000",
      "area_id": 1437 },
    {
      "area_name": "台儿庄区",
      "area_code": "370405000000",
      "area_id": 1438 },
    {
      "area_name": "山亭区",
      "area_code": "370406000000",
      "area_id": 1439 },
    {
      "area_name": "滕州市",
      "area_code": "370481000000",
      "area_id": 1440 }],

    "city_id": 137 },
  {
    "city_name": "东营市",
    "city_code": "370500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "370501000000",
      "area_id": 1441 },
    {
      "area_name": "东营区",
      "area_code": "370502000000",
      "area_id": 1442 },
    {
      "area_name": "河口区",
      "area_code": "370503000000",
      "area_id": 1443 },
    {
      "area_name": "垦利区",
      "area_code": "370505000000",
      "area_id": 1444 },
    {
      "area_name": "利津县",
      "area_code": "370522000000",
      "area_id": 1445 },
    {
      "area_name": "广饶县",
      "area_code": "370523000000",
      "area_id": 1446 },
    {
      "area_name": "东营经济技术开发区",
      "area_code": "370571000000",
      "area_id": 1447 },
    {
      "area_name": "东营港经济开发区",
      "area_code": "370572000000",
      "area_id": 1448 }],

    "city_id": 138 },
  {
    "city_name": "烟台市",
    "city_code": "370600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "370601000000",
      "area_id": 1449 },
    {
      "area_name": "芝罘区",
      "area_code": "370602000000",
      "area_id": 1450 },
    {
      "area_name": "福山区",
      "area_code": "370611000000",
      "area_id": 1451 },
    {
      "area_name": "牟平区",
      "area_code": "370612000000",
      "area_id": 1452 },
    {
      "area_name": "莱山区",
      "area_code": "370613000000",
      "area_id": 1453 },
    {
      "area_name": "长岛县",
      "area_code": "370634000000",
      "area_id": 1454 },
    {
      "area_name": "烟台高新技术产业开发区",
      "area_code": "370671000000",
      "area_id": 1455 },
    {
      "area_name": "烟台经济技术开发区",
      "area_code": "370672000000",
      "area_id": 1456 },
    {
      "area_name": "龙口市",
      "area_code": "370681000000",
      "area_id": 1457 },
    {
      "area_name": "莱阳市",
      "area_code": "370682000000",
      "area_id": 1458 },
    {
      "area_name": "莱州市",
      "area_code": "370683000000",
      "area_id": 1459 },
    {
      "area_name": "蓬莱市",
      "area_code": "370684000000",
      "area_id": 1460 },
    {
      "area_name": "招远市",
      "area_code": "370685000000",
      "area_id": 1461 },
    {
      "area_name": "栖霞市",
      "area_code": "370686000000",
      "area_id": 1462 },
    {
      "area_name": "海阳市",
      "area_code": "370687000000",
      "area_id": 1463 }],

    "city_id": 139 },
  {
    "city_name": "潍坊市",
    "city_code": "370700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "370701000000",
      "area_id": 1464 },
    {
      "area_name": "潍城区",
      "area_code": "370702000000",
      "area_id": 1465 },
    {
      "area_name": "寒亭区",
      "area_code": "370703000000",
      "area_id": 1466 },
    {
      "area_name": "坊子区",
      "area_code": "370704000000",
      "area_id": 1467 },
    {
      "area_name": "奎文区",
      "area_code": "370705000000",
      "area_id": 1468 },
    {
      "area_name": "临朐县",
      "area_code": "370724000000",
      "area_id": 1469 },
    {
      "area_name": "昌乐县",
      "area_code": "370725000000",
      "area_id": 1470 },
    {
      "area_name": "潍坊滨海经济技术开发区",
      "area_code": "370772000000",
      "area_id": 1471 },
    {
      "area_name": "青州市",
      "area_code": "370781000000",
      "area_id": 1472 },
    {
      "area_name": "诸城市",
      "area_code": "370782000000",
      "area_id": 1473 },
    {
      "area_name": "寿光市",
      "area_code": "370783000000",
      "area_id": 1474 },
    {
      "area_name": "安丘市",
      "area_code": "370784000000",
      "area_id": 1475 },
    {
      "area_name": "高密市",
      "area_code": "370785000000",
      "area_id": 1476 },
    {
      "area_name": "昌邑市",
      "area_code": "370786000000",
      "area_id": 1477 }],

    "city_id": 140 },
  {
    "city_name": "济宁市",
    "city_code": "370800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "370801000000",
      "area_id": 1478 },
    {
      "area_name": "任城区",
      "area_code": "370811000000",
      "area_id": 1479 },
    {
      "area_name": "兖州区",
      "area_code": "370812000000",
      "area_id": 1480 },
    {
      "area_name": "微山县",
      "area_code": "370826000000",
      "area_id": 1481 },
    {
      "area_name": "鱼台县",
      "area_code": "370827000000",
      "area_id": 1482 },
    {
      "area_name": "金乡县",
      "area_code": "370828000000",
      "area_id": 1483 },
    {
      "area_name": "嘉祥县",
      "area_code": "370829000000",
      "area_id": 1484 },
    {
      "area_name": "汶上县",
      "area_code": "370830000000",
      "area_id": 1485 },
    {
      "area_name": "泗水县",
      "area_code": "370831000000",
      "area_id": 1486 },
    {
      "area_name": "梁山县",
      "area_code": "370832000000",
      "area_id": 1487 },
    {
      "area_name": "济宁高新技术产业开发区",
      "area_code": "370871000000",
      "area_id": 1488 },
    {
      "area_name": "曲阜市",
      "area_code": "370881000000",
      "area_id": 1489 },
    {
      "area_name": "邹城市",
      "area_code": "370883000000",
      "area_id": 1490 }],

    "city_id": 141 },
  {
    "city_name": "泰安市",
    "city_code": "370900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "370901000000",
      "area_id": 1491 },
    {
      "area_name": "泰山区",
      "area_code": "370902000000",
      "area_id": 1492 },
    {
      "area_name": "岱岳区",
      "area_code": "370911000000",
      "area_id": 1493 },
    {
      "area_name": "宁阳县",
      "area_code": "370921000000",
      "area_id": 1494 },
    {
      "area_name": "东平县",
      "area_code": "370923000000",
      "area_id": 1495 },
    {
      "area_name": "新泰市",
      "area_code": "370982000000",
      "area_id": 1496 },
    {
      "area_name": "肥城市",
      "area_code": "370983000000",
      "area_id": 1497 }],

    "city_id": 142 },
  {
    "city_name": "威海市",
    "city_code": "371000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "371001000000",
      "area_id": 1498 },
    {
      "area_name": "环翠区",
      "area_code": "371002000000",
      "area_id": 1499 },
    {
      "area_name": "文登区",
      "area_code": "371003000000",
      "area_id": 1500 },
    {
      "area_name": "威海火炬高技术产业开发区",
      "area_code": "371071000000",
      "area_id": 1501 },
    {
      "area_name": "威海经济技术开发区",
      "area_code": "371072000000",
      "area_id": 1502 },
    {
      "area_name": "威海临港经济技术开发区",
      "area_code": "371073000000",
      "area_id": 1503 },
    {
      "area_name": "荣成市",
      "area_code": "371082000000",
      "area_id": 1504 },
    {
      "area_name": "乳山市",
      "area_code": "371083000000",
      "area_id": 1505 }],

    "city_id": 143 },
  {
    "city_name": "日照市",
    "city_code": "371100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "371101000000",
      "area_id": 1506 },
    {
      "area_name": "东港区",
      "area_code": "371102000000",
      "area_id": 1507 },
    {
      "area_name": "岚山区",
      "area_code": "371103000000",
      "area_id": 1508 },
    {
      "area_name": "五莲县",
      "area_code": "371121000000",
      "area_id": 1509 },
    {
      "area_name": "莒县",
      "area_code": "371122000000",
      "area_id": 1510 },
    {
      "area_name": "日照经济技术开发区",
      "area_code": "371171000000",
      "area_id": 1511 }],

    "city_id": 144 },
  {
    "city_name": "莱芜市",
    "city_code": "371200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "371201000000",
      "area_id": 1512 },
    {
      "area_name": "莱城区",
      "area_code": "371202000000",
      "area_id": 1513 },
    {
      "area_name": "钢城区",
      "area_code": "371203000000",
      "area_id": 1514 }],

    "city_id": 145 },
  {
    "city_name": "临沂市",
    "city_code": "371300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "371301000000",
      "area_id": 1515 },
    {
      "area_name": "兰山区",
      "area_code": "371302000000",
      "area_id": 1516 },
    {
      "area_name": "罗庄区",
      "area_code": "371311000000",
      "area_id": 1517 },
    {
      "area_name": "河东区",
      "area_code": "371312000000",
      "area_id": 1518 },
    {
      "area_name": "沂南县",
      "area_code": "371321000000",
      "area_id": 1519 },
    {
      "area_name": "郯城县",
      "area_code": "371322000000",
      "area_id": 1520 },
    {
      "area_name": "沂水县",
      "area_code": "371323000000",
      "area_id": 1521 },
    {
      "area_name": "兰陵县",
      "area_code": "371324000000",
      "area_id": 1522 },
    {
      "area_name": "费县",
      "area_code": "371325000000",
      "area_id": 1523 },
    {
      "area_name": "平邑县",
      "area_code": "371326000000",
      "area_id": 1524 },
    {
      "area_name": "莒南县",
      "area_code": "371327000000",
      "area_id": 1525 },
    {
      "area_name": "蒙阴县",
      "area_code": "371328000000",
      "area_id": 1526 },
    {
      "area_name": "临沭县",
      "area_code": "371329000000",
      "area_id": 1527 },
    {
      "area_name": "临沂高新技术产业开发区",
      "area_code": "371371000000",
      "area_id": 1528 },
    {
      "area_name": "临沂经济技术开发区",
      "area_code": "371372000000",
      "area_id": 1529 },
    {
      "area_name": "临沂临港经济开发区",
      "area_code": "371373000000",
      "area_id": 1530 }],

    "city_id": 146 },
  {
    "city_name": "德州市",
    "city_code": "371400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "371401000000",
      "area_id": 1531 },
    {
      "area_name": "德城区",
      "area_code": "371402000000",
      "area_id": 1532 },
    {
      "area_name": "陵城区",
      "area_code": "371403000000",
      "area_id": 1533 },
    {
      "area_name": "宁津县",
      "area_code": "371422000000",
      "area_id": 1534 },
    {
      "area_name": "庆云县",
      "area_code": "371423000000",
      "area_id": 1535 },
    {
      "area_name": "临邑县",
      "area_code": "371424000000",
      "area_id": 1536 },
    {
      "area_name": "齐河县",
      "area_code": "371425000000",
      "area_id": 1537 },
    {
      "area_name": "平原县",
      "area_code": "371426000000",
      "area_id": 1538 },
    {
      "area_name": "夏津县",
      "area_code": "371427000000",
      "area_id": 1539 },
    {
      "area_name": "武城县",
      "area_code": "371428000000",
      "area_id": 1540 },
    {
      "area_name": "德州经济技术开发区",
      "area_code": "371471000000",
      "area_id": 1541 },
    {
      "area_name": "德州运河经济开发区",
      "area_code": "371472000000",
      "area_id": 1542 },
    {
      "area_name": "乐陵市",
      "area_code": "371481000000",
      "area_id": 1543 },
    {
      "area_name": "禹城市",
      "area_code": "371482000000",
      "area_id": 1544 }],

    "city_id": 147 },
  {
    "city_name": "聊城市",
    "city_code": "371500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "371501000000",
      "area_id": 1545 },
    {
      "area_name": "东昌府区",
      "area_code": "371502000000",
      "area_id": 1546 },
    {
      "area_name": "阳谷县",
      "area_code": "371521000000",
      "area_id": 1547 },
    {
      "area_name": "莘县",
      "area_code": "371522000000",
      "area_id": 1548 },
    {
      "area_name": "茌平县",
      "area_code": "371523000000",
      "area_id": 1549 },
    {
      "area_name": "东阿县",
      "area_code": "371524000000",
      "area_id": 1550 },
    {
      "area_name": "冠县",
      "area_code": "371525000000",
      "area_id": 1551 },
    {
      "area_name": "高唐县",
      "area_code": "371526000000",
      "area_id": 1552 },
    {
      "area_name": "临清市",
      "area_code": "371581000000",
      "area_id": 1553 }],

    "city_id": 148 },
  {
    "city_name": "滨州市",
    "city_code": "371600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "371601000000",
      "area_id": 1554 },
    {
      "area_name": "滨城区",
      "area_code": "371602000000",
      "area_id": 1555 },
    {
      "area_name": "沾化区",
      "area_code": "371603000000",
      "area_id": 1556 },
    {
      "area_name": "惠民县",
      "area_code": "371621000000",
      "area_id": 1557 },
    {
      "area_name": "阳信县",
      "area_code": "371622000000",
      "area_id": 1558 },
    {
      "area_name": "无棣县",
      "area_code": "371623000000",
      "area_id": 1559 },
    {
      "area_name": "博兴县",
      "area_code": "371625000000",
      "area_id": 1560 },
    {
      "area_name": "邹平市",
      "area_code": "371681000000",
      "area_id": 1561 }],

    "city_id": 149 },
  {
    "city_name": "菏泽市",
    "city_code": "371700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "371701000000",
      "area_id": 1562 },
    {
      "area_name": "牡丹区",
      "area_code": "371702000000",
      "area_id": 1563 },
    {
      "area_name": "定陶区",
      "area_code": "371703000000",
      "area_id": 1564 },
    {
      "area_name": "曹县",
      "area_code": "371721000000",
      "area_id": 1565 },
    {
      "area_name": "单县",
      "area_code": "371722000000",
      "area_id": 1566 },
    {
      "area_name": "成武县",
      "area_code": "371723000000",
      "area_id": 1567 },
    {
      "area_name": "巨野县",
      "area_code": "371724000000",
      "area_id": 1568 },
    {
      "area_name": "郓城县",
      "area_code": "371725000000",
      "area_id": 1569 },
    {
      "area_name": "鄄城县",
      "area_code": "371726000000",
      "area_id": 1570 },
    {
      "area_name": "东明县",
      "area_code": "371728000000",
      "area_id": 1571 },
    {
      "area_name": "菏泽经济技术开发区",
      "area_code": "371771000000",
      "area_id": 1572 },
    {
      "area_name": "菏泽高新技术开发区",
      "area_code": "371772000000",
      "area_id": 1573 }],

    "city_id": 150 }],

  "pro_code": "370000",
  "pro_id": 15,
  "pro_name": "山东省" },
{
  "pro_cities": [{
    "city_name": "郑州市",
    "city_code": "410100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "410101000000",
      "area_id": 1574 },
    {
      "area_name": "中原区",
      "area_code": "410102000000",
      "area_id": 1575 },
    {
      "area_name": "二七区",
      "area_code": "410103000000",
      "area_id": 1576 },
    {
      "area_name": "管城回族区",
      "area_code": "410104000000",
      "area_id": 1577 },
    {
      "area_name": "金水区",
      "area_code": "410105000000",
      "area_id": 1578 },
    {
      "area_name": "上街区",
      "area_code": "410106000000",
      "area_id": 1579 },
    {
      "area_name": "惠济区",
      "area_code": "410108000000",
      "area_id": 1580 },
    {
      "area_name": "中牟县",
      "area_code": "410122000000",
      "area_id": 1581 },
    {
      "area_name": "郑州经济技术开发区",
      "area_code": "410171000000",
      "area_id": 1582 },
    {
      "area_name": "郑州高新技术产业开发区",
      "area_code": "410172000000",
      "area_id": 1583 },
    {
      "area_name": "郑州航空港经济综合实验区",
      "area_code": "410173000000",
      "area_id": 1584 },
    {
      "area_name": "巩义市",
      "area_code": "410181000000",
      "area_id": 1585 },
    {
      "area_name": "荥阳市",
      "area_code": "410182000000",
      "area_id": 1586 },
    {
      "area_name": "新密市",
      "area_code": "410183000000",
      "area_id": 1587 },
    {
      "area_name": "新郑市",
      "area_code": "410184000000",
      "area_id": 1588 },
    {
      "area_name": "登封市",
      "area_code": "410185000000",
      "area_id": 1589 }],

    "city_id": 151 },
  {
    "city_name": "开封市",
    "city_code": "410200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "410201000000",
      "area_id": 1590 },
    {
      "area_name": "龙亭区",
      "area_code": "410202000000",
      "area_id": 1591 },
    {
      "area_name": "顺河回族区",
      "area_code": "410203000000",
      "area_id": 1592 },
    {
      "area_name": "鼓楼区",
      "area_code": "410204000000",
      "area_id": 1593 },
    {
      "area_name": "禹王台区",
      "area_code": "410205000000",
      "area_id": 1594 },
    {
      "area_name": "祥符区",
      "area_code": "410212000000",
      "area_id": 1595 },
    {
      "area_name": "杞县",
      "area_code": "410221000000",
      "area_id": 1596 },
    {
      "area_name": "通许县",
      "area_code": "410222000000",
      "area_id": 1597 },
    {
      "area_name": "尉氏县",
      "area_code": "410223000000",
      "area_id": 1598 },
    {
      "area_name": "兰考县",
      "area_code": "410225000000",
      "area_id": 1599 }],

    "city_id": 152 },
  {
    "city_name": "洛阳市",
    "city_code": "410300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "410301000000",
      "area_id": 1600 },
    {
      "area_name": "老城区",
      "area_code": "410302000000",
      "area_id": 1601 },
    {
      "area_name": "西工区",
      "area_code": "410303000000",
      "area_id": 1602 },
    {
      "area_name": "瀍河回族区",
      "area_code": "410304000000",
      "area_id": 1603 },
    {
      "area_name": "涧西区",
      "area_code": "410305000000",
      "area_id": 1604 },
    {
      "area_name": "吉利区",
      "area_code": "410306000000",
      "area_id": 1605 },
    {
      "area_name": "洛龙区",
      "area_code": "410311000000",
      "area_id": 1606 },
    {
      "area_name": "孟津县",
      "area_code": "410322000000",
      "area_id": 1607 },
    {
      "area_name": "新安县",
      "area_code": "410323000000",
      "area_id": 1608 },
    {
      "area_name": "栾川县",
      "area_code": "410324000000",
      "area_id": 1609 },
    {
      "area_name": "嵩县",
      "area_code": "410325000000",
      "area_id": 1610 },
    {
      "area_name": "汝阳县",
      "area_code": "410326000000",
      "area_id": 1611 },
    {
      "area_name": "宜阳县",
      "area_code": "410327000000",
      "area_id": 1612 },
    {
      "area_name": "洛宁县",
      "area_code": "410328000000",
      "area_id": 1613 },
    {
      "area_name": "伊川县",
      "area_code": "410329000000",
      "area_id": 1614 },
    {
      "area_name": "洛阳高新技术产业开发区",
      "area_code": "410371000000",
      "area_id": 1615 },
    {
      "area_name": "偃师市",
      "area_code": "410381000000",
      "area_id": 1616 }],

    "city_id": 153 },
  {
    "city_name": "平顶山市",
    "city_code": "410400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "410401000000",
      "area_id": 1617 },
    {
      "area_name": "新华区",
      "area_code": "410402000000",
      "area_id": 1618 },
    {
      "area_name": "卫东区",
      "area_code": "410403000000",
      "area_id": 1619 },
    {
      "area_name": "石龙区",
      "area_code": "410404000000",
      "area_id": 1620 },
    {
      "area_name": "湛河区",
      "area_code": "410411000000",
      "area_id": 1621 },
    {
      "area_name": "宝丰县",
      "area_code": "410421000000",
      "area_id": 1622 },
    {
      "area_name": "叶县",
      "area_code": "410422000000",
      "area_id": 1623 },
    {
      "area_name": "鲁山县",
      "area_code": "410423000000",
      "area_id": 1624 },
    {
      "area_name": "郏县",
      "area_code": "410425000000",
      "area_id": 1625 },
    {
      "area_name": "平顶山高新技术产业开发区",
      "area_code": "410471000000",
      "area_id": 1626 },
    {
      "area_name": "平顶山市新城区",
      "area_code": "410472000000",
      "area_id": 1627 },
    {
      "area_name": "舞钢市",
      "area_code": "410481000000",
      "area_id": 1628 },
    {
      "area_name": "汝州市",
      "area_code": "410482000000",
      "area_id": 1629 }],

    "city_id": 154 },
  {
    "city_name": "安阳市",
    "city_code": "410500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "410501000000",
      "area_id": 1630 },
    {
      "area_name": "文峰区",
      "area_code": "410502000000",
      "area_id": 1631 },
    {
      "area_name": "北关区",
      "area_code": "410503000000",
      "area_id": 1632 },
    {
      "area_name": "殷都区",
      "area_code": "410505000000",
      "area_id": 1633 },
    {
      "area_name": "龙安区",
      "area_code": "410506000000",
      "area_id": 1634 },
    {
      "area_name": "安阳县",
      "area_code": "410522000000",
      "area_id": 1635 },
    {
      "area_name": "汤阴县",
      "area_code": "410523000000",
      "area_id": 1636 },
    {
      "area_name": "滑县",
      "area_code": "410526000000",
      "area_id": 1637 },
    {
      "area_name": "内黄县",
      "area_code": "410527000000",
      "area_id": 1638 },
    {
      "area_name": "安阳高新技术产业开发区",
      "area_code": "410571000000",
      "area_id": 1639 },
    {
      "area_name": "林州市",
      "area_code": "410581000000",
      "area_id": 1640 }],

    "city_id": 155 },
  {
    "city_name": "鹤壁市",
    "city_code": "410600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "410601000000",
      "area_id": 1641 },
    {
      "area_name": "鹤山区",
      "area_code": "410602000000",
      "area_id": 1642 },
    {
      "area_name": "山城区",
      "area_code": "410603000000",
      "area_id": 1643 },
    {
      "area_name": "淇滨区",
      "area_code": "410611000000",
      "area_id": 1644 },
    {
      "area_name": "浚县",
      "area_code": "410621000000",
      "area_id": 1645 },
    {
      "area_name": "淇县",
      "area_code": "410622000000",
      "area_id": 1646 },
    {
      "area_name": "鹤壁经济技术开发区",
      "area_code": "410671000000",
      "area_id": 1647 }],

    "city_id": 156 },
  {
    "city_name": "新乡市",
    "city_code": "410700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "410701000000",
      "area_id": 1648 },
    {
      "area_name": "红旗区",
      "area_code": "410702000000",
      "area_id": 1649 },
    {
      "area_name": "卫滨区",
      "area_code": "410703000000",
      "area_id": 1650 },
    {
      "area_name": "凤泉区",
      "area_code": "410704000000",
      "area_id": 1651 },
    {
      "area_name": "牧野区",
      "area_code": "410711000000",
      "area_id": 1652 },
    {
      "area_name": "新乡县",
      "area_code": "410721000000",
      "area_id": 1653 },
    {
      "area_name": "获嘉县",
      "area_code": "410724000000",
      "area_id": 1654 },
    {
      "area_name": "原阳县",
      "area_code": "410725000000",
      "area_id": 1655 },
    {
      "area_name": "延津县",
      "area_code": "410726000000",
      "area_id": 1656 },
    {
      "area_name": "封丘县",
      "area_code": "410727000000",
      "area_id": 1657 },
    {
      "area_name": "长垣县",
      "area_code": "410728000000",
      "area_id": 1658 },
    {
      "area_name": "新乡高新技术产业开发区",
      "area_code": "410771000000",
      "area_id": 1659 },
    {
      "area_name": "新乡经济技术开发区",
      "area_code": "410772000000",
      "area_id": 1660 },
    {
      "area_name": "新乡市平原城乡一体化示范区",
      "area_code": "410773000000",
      "area_id": 1661 },
    {
      "area_name": "卫辉市",
      "area_code": "410781000000",
      "area_id": 1662 },
    {
      "area_name": "辉县市",
      "area_code": "410782000000",
      "area_id": 1663 }],

    "city_id": 157 },
  {
    "city_name": "焦作市",
    "city_code": "410800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "410801000000",
      "area_id": 1664 },
    {
      "area_name": "解放区",
      "area_code": "410802000000",
      "area_id": 1665 },
    {
      "area_name": "中站区",
      "area_code": "410803000000",
      "area_id": 1666 },
    {
      "area_name": "马村区",
      "area_code": "410804000000",
      "area_id": 1667 },
    {
      "area_name": "山阳区",
      "area_code": "410811000000",
      "area_id": 1668 },
    {
      "area_name": "修武县",
      "area_code": "410821000000",
      "area_id": 1669 },
    {
      "area_name": "博爱县",
      "area_code": "410822000000",
      "area_id": 1670 },
    {
      "area_name": "武陟县",
      "area_code": "410823000000",
      "area_id": 1671 },
    {
      "area_name": "温县",
      "area_code": "410825000000",
      "area_id": 1672 },
    {
      "area_name": "焦作城乡一体化示范区",
      "area_code": "410871000000",
      "area_id": 1673 },
    {
      "area_name": "沁阳市",
      "area_code": "410882000000",
      "area_id": 1674 },
    {
      "area_name": "孟州市",
      "area_code": "410883000000",
      "area_id": 1675 }],

    "city_id": 158 },
  {
    "city_name": "濮阳市",
    "city_code": "410900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "410901000000",
      "area_id": 1676 },
    {
      "area_name": "华龙区",
      "area_code": "410902000000",
      "area_id": 1677 },
    {
      "area_name": "清丰县",
      "area_code": "410922000000",
      "area_id": 1678 },
    {
      "area_name": "南乐县",
      "area_code": "410923000000",
      "area_id": 1679 },
    {
      "area_name": "范县",
      "area_code": "410926000000",
      "area_id": 1680 },
    {
      "area_name": "台前县",
      "area_code": "410927000000",
      "area_id": 1681 },
    {
      "area_name": "濮阳县",
      "area_code": "410928000000",
      "area_id": 1682 },
    {
      "area_name": "河南濮阳工业园区",
      "area_code": "410971000000",
      "area_id": 1683 },
    {
      "area_name": "濮阳经济技术开发区",
      "area_code": "410972000000",
      "area_id": 1684 }],

    "city_id": 159 },
  {
    "city_name": "许昌市",
    "city_code": "411000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "411001000000",
      "area_id": 1685 },
    {
      "area_name": "魏都区",
      "area_code": "411002000000",
      "area_id": 1686 },
    {
      "area_name": "建安区",
      "area_code": "411003000000",
      "area_id": 1687 },
    {
      "area_name": "鄢陵县",
      "area_code": "411024000000",
      "area_id": 1688 },
    {
      "area_name": "襄城县",
      "area_code": "411025000000",
      "area_id": 1689 },
    {
      "area_name": "许昌经济技术开发区",
      "area_code": "411071000000",
      "area_id": 1690 },
    {
      "area_name": "禹州市",
      "area_code": "411081000000",
      "area_id": 1691 },
    {
      "area_name": "长葛市",
      "area_code": "411082000000",
      "area_id": 1692 }],

    "city_id": 160 },
  {
    "city_name": "漯河市",
    "city_code": "411100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "411101000000",
      "area_id": 1693 },
    {
      "area_name": "源汇区",
      "area_code": "411102000000",
      "area_id": 1694 },
    {
      "area_name": "郾城区",
      "area_code": "411103000000",
      "area_id": 1695 },
    {
      "area_name": "召陵区",
      "area_code": "411104000000",
      "area_id": 1696 },
    {
      "area_name": "舞阳县",
      "area_code": "411121000000",
      "area_id": 1697 },
    {
      "area_name": "临颍县",
      "area_code": "411122000000",
      "area_id": 1698 },
    {
      "area_name": "漯河经济技术开发区",
      "area_code": "411171000000",
      "area_id": 1699 }],

    "city_id": 161 },
  {
    "city_name": "三门峡市",
    "city_code": "411200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "411201000000",
      "area_id": 1700 },
    {
      "area_name": "湖滨区",
      "area_code": "411202000000",
      "area_id": 1701 },
    {
      "area_name": "陕州区",
      "area_code": "411203000000",
      "area_id": 1702 },
    {
      "area_name": "渑池县",
      "area_code": "411221000000",
      "area_id": 1703 },
    {
      "area_name": "卢氏县",
      "area_code": "411224000000",
      "area_id": 1704 },
    {
      "area_name": "河南三门峡经济开发区",
      "area_code": "411271000000",
      "area_id": 1705 },
    {
      "area_name": "义马市",
      "area_code": "411281000000",
      "area_id": 1706 },
    {
      "area_name": "灵宝市",
      "area_code": "411282000000",
      "area_id": 1707 }],

    "city_id": 162 },
  {
    "city_name": "南阳市",
    "city_code": "411300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "411301000000",
      "area_id": 1708 },
    {
      "area_name": "宛城区",
      "area_code": "411302000000",
      "area_id": 1709 },
    {
      "area_name": "卧龙区",
      "area_code": "411303000000",
      "area_id": 1710 },
    {
      "area_name": "南召县",
      "area_code": "411321000000",
      "area_id": 1711 },
    {
      "area_name": "方城县",
      "area_code": "411322000000",
      "area_id": 1712 },
    {
      "area_name": "西峡县",
      "area_code": "411323000000",
      "area_id": 1713 },
    {
      "area_name": "镇平县",
      "area_code": "411324000000",
      "area_id": 1714 },
    {
      "area_name": "内乡县",
      "area_code": "411325000000",
      "area_id": 1715 },
    {
      "area_name": "淅川县",
      "area_code": "411326000000",
      "area_id": 1716 },
    {
      "area_name": "社旗县",
      "area_code": "411327000000",
      "area_id": 1717 },
    {
      "area_name": "唐河县",
      "area_code": "411328000000",
      "area_id": 1718 },
    {
      "area_name": "新野县",
      "area_code": "411329000000",
      "area_id": 1719 },
    {
      "area_name": "桐柏县",
      "area_code": "411330000000",
      "area_id": 1720 },
    {
      "area_name": "南阳高新技术产业开发区",
      "area_code": "411371000000",
      "area_id": 1721 },
    {
      "area_name": "南阳市城乡一体化示范区",
      "area_code": "411372000000",
      "area_id": 1722 },
    {
      "area_name": "邓州市",
      "area_code": "411381000000",
      "area_id": 1723 }],

    "city_id": 163 },
  {
    "city_name": "商丘市",
    "city_code": "411400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "411401000000",
      "area_id": 1724 },
    {
      "area_name": "梁园区",
      "area_code": "411402000000",
      "area_id": 1725 },
    {
      "area_name": "睢阳区",
      "area_code": "411403000000",
      "area_id": 1726 },
    {
      "area_name": "民权县",
      "area_code": "411421000000",
      "area_id": 1727 },
    {
      "area_name": "睢县",
      "area_code": "411422000000",
      "area_id": 1728 },
    {
      "area_name": "宁陵县",
      "area_code": "411423000000",
      "area_id": 1729 },
    {
      "area_name": "柘城县",
      "area_code": "411424000000",
      "area_id": 1730 },
    {
      "area_name": "虞城县",
      "area_code": "411425000000",
      "area_id": 1731 },
    {
      "area_name": "夏邑县",
      "area_code": "411426000000",
      "area_id": 1732 },
    {
      "area_name": "豫东综合物流产业聚集区",
      "area_code": "411471000000",
      "area_id": 1733 },
    {
      "area_name": "河南商丘经济开发区",
      "area_code": "411472000000",
      "area_id": 1734 },
    {
      "area_name": "永城市",
      "area_code": "411481000000",
      "area_id": 1735 }],

    "city_id": 164 },
  {
    "city_name": "信阳市",
    "city_code": "411500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "411501000000",
      "area_id": 1736 },
    {
      "area_name": "浉河区",
      "area_code": "411502000000",
      "area_id": 1737 },
    {
      "area_name": "平桥区",
      "area_code": "411503000000",
      "area_id": 1738 },
    {
      "area_name": "罗山县",
      "area_code": "411521000000",
      "area_id": 1739 },
    {
      "area_name": "光山县",
      "area_code": "411522000000",
      "area_id": 1740 },
    {
      "area_name": "新县",
      "area_code": "411523000000",
      "area_id": 1741 },
    {
      "area_name": "商城县",
      "area_code": "411524000000",
      "area_id": 1742 },
    {
      "area_name": "固始县",
      "area_code": "411525000000",
      "area_id": 1743 },
    {
      "area_name": "潢川县",
      "area_code": "411526000000",
      "area_id": 1744 },
    {
      "area_name": "淮滨县",
      "area_code": "411527000000",
      "area_id": 1745 },
    {
      "area_name": "息县",
      "area_code": "411528000000",
      "area_id": 1746 },
    {
      "area_name": "信阳高新技术产业开发区",
      "area_code": "411571000000",
      "area_id": 1747 }],

    "city_id": 165 },
  {
    "city_name": "周口市",
    "city_code": "411600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "411601000000",
      "area_id": 1748 },
    {
      "area_name": "川汇区",
      "area_code": "411602000000",
      "area_id": 1749 },
    {
      "area_name": "扶沟县",
      "area_code": "411621000000",
      "area_id": 1750 },
    {
      "area_name": "西华县",
      "area_code": "411622000000",
      "area_id": 1751 },
    {
      "area_name": "商水县",
      "area_code": "411623000000",
      "area_id": 1752 },
    {
      "area_name": "沈丘县",
      "area_code": "411624000000",
      "area_id": 1753 },
    {
      "area_name": "郸城县",
      "area_code": "411625000000",
      "area_id": 1754 },
    {
      "area_name": "淮阳县",
      "area_code": "411626000000",
      "area_id": 1755 },
    {
      "area_name": "太康县",
      "area_code": "411627000000",
      "area_id": 1756 },
    {
      "area_name": "鹿邑县",
      "area_code": "411628000000",
      "area_id": 1757 },
    {
      "area_name": "河南周口经济开发区",
      "area_code": "411671000000",
      "area_id": 1758 },
    {
      "area_name": "项城市",
      "area_code": "411681000000",
      "area_id": 1759 }],

    "city_id": 166 },
  {
    "city_name": "驻马店市",
    "city_code": "411700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "411701000000",
      "area_id": 1760 },
    {
      "area_name": "驿城区",
      "area_code": "411702000000",
      "area_id": 1761 },
    {
      "area_name": "西平县",
      "area_code": "411721000000",
      "area_id": 1762 },
    {
      "area_name": "上蔡县",
      "area_code": "411722000000",
      "area_id": 1763 },
    {
      "area_name": "平舆县",
      "area_code": "411723000000",
      "area_id": 1764 },
    {
      "area_name": "正阳县",
      "area_code": "411724000000",
      "area_id": 1765 },
    {
      "area_name": "确山县",
      "area_code": "411725000000",
      "area_id": 1766 },
    {
      "area_name": "泌阳县",
      "area_code": "411726000000",
      "area_id": 1767 },
    {
      "area_name": "汝南县",
      "area_code": "411727000000",
      "area_id": 1768 },
    {
      "area_name": "遂平县",
      "area_code": "411728000000",
      "area_id": 1769 },
    {
      "area_name": "新蔡县",
      "area_code": "411729000000",
      "area_id": 1770 },
    {
      "area_name": "河南驻马店经济开发区",
      "area_code": "411771000000",
      "area_id": 1771 }],

    "city_id": 167 },
  {
    "city_name": "省直辖县级行政区划",
    "city_code": "419000000000",
    "city_areas": [{
      "area_name": "济源市",
      "area_code": "419001000000",
      "area_id": 1772 }],

    "city_id": 168 }],

  "pro_code": "410000",
  "pro_id": 16,
  "pro_name": "河南省" },
{
  "pro_cities": [{
    "city_name": "武汉市",
    "city_code": "420100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "420101000000",
      "area_id": 1773 },
    {
      "area_name": "江岸区",
      "area_code": "420102000000",
      "area_id": 1774 },
    {
      "area_name": "江汉区",
      "area_code": "420103000000",
      "area_id": 1775 },
    {
      "area_name": "硚口区",
      "area_code": "420104000000",
      "area_id": 1776 },
    {
      "area_name": "汉阳区",
      "area_code": "420105000000",
      "area_id": 1777 },
    {
      "area_name": "武昌区",
      "area_code": "420106000000",
      "area_id": 1778 },
    {
      "area_name": "青山区",
      "area_code": "420107000000",
      "area_id": 1779 },
    {
      "area_name": "洪山区",
      "area_code": "420111000000",
      "area_id": 1780 },
    {
      "area_name": "东西湖区",
      "area_code": "420112000000",
      "area_id": 1781 },
    {
      "area_name": "汉南区",
      "area_code": "420113000000",
      "area_id": 1782 },
    {
      "area_name": "蔡甸区",
      "area_code": "420114000000",
      "area_id": 1783 },
    {
      "area_name": "江夏区",
      "area_code": "420115000000",
      "area_id": 1784 },
    {
      "area_name": "黄陂区",
      "area_code": "420116000000",
      "area_id": 1785 },
    {
      "area_name": "新洲区",
      "area_code": "420117000000",
      "area_id": 1786 }],

    "city_id": 169 },
  {
    "city_name": "黄石市",
    "city_code": "420200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "420201000000",
      "area_id": 1787 },
    {
      "area_name": "黄石港区",
      "area_code": "420202000000",
      "area_id": 1788 },
    {
      "area_name": "西塞山区",
      "area_code": "420203000000",
      "area_id": 1789 },
    {
      "area_name": "下陆区",
      "area_code": "420204000000",
      "area_id": 1790 },
    {
      "area_name": "铁山区",
      "area_code": "420205000000",
      "area_id": 1791 },
    {
      "area_name": "阳新县",
      "area_code": "420222000000",
      "area_id": 1792 },
    {
      "area_name": "大冶市",
      "area_code": "420281000000",
      "area_id": 1793 }],

    "city_id": 170 },
  {
    "city_name": "十堰市",
    "city_code": "420300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "420301000000",
      "area_id": 1794 },
    {
      "area_name": "茅箭区",
      "area_code": "420302000000",
      "area_id": 1795 },
    {
      "area_name": "张湾区",
      "area_code": "420303000000",
      "area_id": 1796 },
    {
      "area_name": "郧阳区",
      "area_code": "420304000000",
      "area_id": 1797 },
    {
      "area_name": "郧西县",
      "area_code": "420322000000",
      "area_id": 1798 },
    {
      "area_name": "竹山县",
      "area_code": "420323000000",
      "area_id": 1799 },
    {
      "area_name": "竹溪县",
      "area_code": "420324000000",
      "area_id": 1800 },
    {
      "area_name": "房县",
      "area_code": "420325000000",
      "area_id": 1801 },
    {
      "area_name": "丹江口市",
      "area_code": "420381000000",
      "area_id": 1802 }],

    "city_id": 171 },
  {
    "city_name": "宜昌市",
    "city_code": "420500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "420501000000",
      "area_id": 1803 },
    {
      "area_name": "西陵区",
      "area_code": "420502000000",
      "area_id": 1804 },
    {
      "area_name": "伍家岗区",
      "area_code": "420503000000",
      "area_id": 1805 },
    {
      "area_name": "点军区",
      "area_code": "420504000000",
      "area_id": 1806 },
    {
      "area_name": "猇亭区",
      "area_code": "420505000000",
      "area_id": 1807 },
    {
      "area_name": "夷陵区",
      "area_code": "420506000000",
      "area_id": 1808 },
    {
      "area_name": "远安县",
      "area_code": "420525000000",
      "area_id": 1809 },
    {
      "area_name": "兴山县",
      "area_code": "420526000000",
      "area_id": 1810 },
    {
      "area_name": "秭归县",
      "area_code": "420527000000",
      "area_id": 1811 },
    {
      "area_name": "长阳土家族自治县",
      "area_code": "420528000000",
      "area_id": 1812 },
    {
      "area_name": "五峰土家族自治县",
      "area_code": "420529000000",
      "area_id": 1813 },
    {
      "area_name": "宜都市",
      "area_code": "420581000000",
      "area_id": 1814 },
    {
      "area_name": "当阳市",
      "area_code": "420582000000",
      "area_id": 1815 },
    {
      "area_name": "枝江市",
      "area_code": "420583000000",
      "area_id": 1816 }],

    "city_id": 172 },
  {
    "city_name": "襄阳市",
    "city_code": "420600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "420601000000",
      "area_id": 1817 },
    {
      "area_name": "襄城区",
      "area_code": "420602000000",
      "area_id": 1818 },
    {
      "area_name": "樊城区",
      "area_code": "420606000000",
      "area_id": 1819 },
    {
      "area_name": "襄州区",
      "area_code": "420607000000",
      "area_id": 1820 },
    {
      "area_name": "南漳县",
      "area_code": "420624000000",
      "area_id": 1821 },
    {
      "area_name": "谷城县",
      "area_code": "420625000000",
      "area_id": 1822 },
    {
      "area_name": "保康县",
      "area_code": "420626000000",
      "area_id": 1823 },
    {
      "area_name": "老河口市",
      "area_code": "420682000000",
      "area_id": 1824 },
    {
      "area_name": "枣阳市",
      "area_code": "420683000000",
      "area_id": 1825 },
    {
      "area_name": "宜城市",
      "area_code": "420684000000",
      "area_id": 1826 }],

    "city_id": 173 },
  {
    "city_name": "鄂州市",
    "city_code": "420700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "420701000000",
      "area_id": 1827 },
    {
      "area_name": "梁子湖区",
      "area_code": "420702000000",
      "area_id": 1828 },
    {
      "area_name": "华容区",
      "area_code": "420703000000",
      "area_id": 1829 },
    {
      "area_name": "鄂城区",
      "area_code": "420704000000",
      "area_id": 1830 }],

    "city_id": 174 },
  {
    "city_name": "荆门市",
    "city_code": "420800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "420801000000",
      "area_id": 1831 },
    {
      "area_name": "东宝区",
      "area_code": "420802000000",
      "area_id": 1832 },
    {
      "area_name": "掇刀区",
      "area_code": "420804000000",
      "area_id": 1833 },
    {
      "area_name": "沙洋县",
      "area_code": "420822000000",
      "area_id": 1834 },
    {
      "area_name": "钟祥市",
      "area_code": "420881000000",
      "area_id": 1835 },
    {
      "area_name": "京山市",
      "area_code": "420882000000",
      "area_id": 1836 }],

    "city_id": 175 },
  {
    "city_name": "孝感市",
    "city_code": "420900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "420901000000",
      "area_id": 1837 },
    {
      "area_name": "孝南区",
      "area_code": "420902000000",
      "area_id": 1838 },
    {
      "area_name": "孝昌县",
      "area_code": "420921000000",
      "area_id": 1839 },
    {
      "area_name": "大悟县",
      "area_code": "420922000000",
      "area_id": 1840 },
    {
      "area_name": "云梦县",
      "area_code": "420923000000",
      "area_id": 1841 },
    {
      "area_name": "应城市",
      "area_code": "420981000000",
      "area_id": 1842 },
    {
      "area_name": "安陆市",
      "area_code": "420982000000",
      "area_id": 1843 },
    {
      "area_name": "汉川市",
      "area_code": "420984000000",
      "area_id": 1844 }],

    "city_id": 176 },
  {
    "city_name": "荆州市",
    "city_code": "421000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "421001000000",
      "area_id": 1845 },
    {
      "area_name": "沙市区",
      "area_code": "421002000000",
      "area_id": 1846 },
    {
      "area_name": "荆州区",
      "area_code": "421003000000",
      "area_id": 1847 },
    {
      "area_name": "公安县",
      "area_code": "421022000000",
      "area_id": 1848 },
    {
      "area_name": "监利县",
      "area_code": "421023000000",
      "area_id": 1849 },
    {
      "area_name": "江陵县",
      "area_code": "421024000000",
      "area_id": 1850 },
    {
      "area_name": "荆州经济技术开发区",
      "area_code": "421071000000",
      "area_id": 1851 },
    {
      "area_name": "石首市",
      "area_code": "421081000000",
      "area_id": 1852 },
    {
      "area_name": "洪湖市",
      "area_code": "421083000000",
      "area_id": 1853 },
    {
      "area_name": "松滋市",
      "area_code": "421087000000",
      "area_id": 1854 }],

    "city_id": 177 },
  {
    "city_name": "黄冈市",
    "city_code": "421100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "421101000000",
      "area_id": 1855 },
    {
      "area_name": "黄州区",
      "area_code": "421102000000",
      "area_id": 1856 },
    {
      "area_name": "团风县",
      "area_code": "421121000000",
      "area_id": 1857 },
    {
      "area_name": "红安县",
      "area_code": "421122000000",
      "area_id": 1858 },
    {
      "area_name": "罗田县",
      "area_code": "421123000000",
      "area_id": 1859 },
    {
      "area_name": "英山县",
      "area_code": "421124000000",
      "area_id": 1860 },
    {
      "area_name": "浠水县",
      "area_code": "421125000000",
      "area_id": 1861 },
    {
      "area_name": "蕲春县",
      "area_code": "421126000000",
      "area_id": 1862 },
    {
      "area_name": "黄梅县",
      "area_code": "421127000000",
      "area_id": 1863 },
    {
      "area_name": "龙感湖管理区",
      "area_code": "421171000000",
      "area_id": 1864 },
    {
      "area_name": "麻城市",
      "area_code": "421181000000",
      "area_id": 1865 },
    {
      "area_name": "武穴市",
      "area_code": "421182000000",
      "area_id": 1866 }],

    "city_id": 178 },
  {
    "city_name": "咸宁市",
    "city_code": "421200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "421201000000",
      "area_id": 1867 },
    {
      "area_name": "咸安区",
      "area_code": "421202000000",
      "area_id": 1868 },
    {
      "area_name": "嘉鱼县",
      "area_code": "421221000000",
      "area_id": 1869 },
    {
      "area_name": "通城县",
      "area_code": "421222000000",
      "area_id": 1870 },
    {
      "area_name": "崇阳县",
      "area_code": "421223000000",
      "area_id": 1871 },
    {
      "area_name": "通山县",
      "area_code": "421224000000",
      "area_id": 1872 },
    {
      "area_name": "赤壁市",
      "area_code": "421281000000",
      "area_id": 1873 }],

    "city_id": 179 },
  {
    "city_name": "随州市",
    "city_code": "421300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "421301000000",
      "area_id": 1874 },
    {
      "area_name": "曾都区",
      "area_code": "421303000000",
      "area_id": 1875 },
    {
      "area_name": "随县",
      "area_code": "421321000000",
      "area_id": 1876 },
    {
      "area_name": "广水市",
      "area_code": "421381000000",
      "area_id": 1877 }],

    "city_id": 180 },
  {
    "city_name": "恩施土家族苗族自治州",
    "city_code": "422800000000",
    "city_areas": [{
      "area_name": "恩施市",
      "area_code": "422801000000",
      "area_id": 1878 },
    {
      "area_name": "利川市",
      "area_code": "422802000000",
      "area_id": 1879 },
    {
      "area_name": "建始县",
      "area_code": "422822000000",
      "area_id": 1880 },
    {
      "area_name": "巴东县",
      "area_code": "422823000000",
      "area_id": 1881 },
    {
      "area_name": "宣恩县",
      "area_code": "422825000000",
      "area_id": 1882 },
    {
      "area_name": "咸丰县",
      "area_code": "422826000000",
      "area_id": 1883 },
    {
      "area_name": "来凤县",
      "area_code": "422827000000",
      "area_id": 1884 },
    {
      "area_name": "鹤峰县",
      "area_code": "422828000000",
      "area_id": 1885 }],

    "city_id": 181 },
  {
    "city_name": "省直辖县级行政区划",
    "city_code": "429000000000",
    "city_areas": [{
      "area_name": "仙桃市",
      "area_code": "429004000000",
      "area_id": 1886 },
    {
      "area_name": "潜江市",
      "area_code": "429005000000",
      "area_id": 1887 },
    {
      "area_name": "天门市",
      "area_code": "429006000000",
      "area_id": 1888 },
    {
      "area_name": "神农架林区",
      "area_code": "429021000000",
      "area_id": 1889 }],

    "city_id": 182 }],

  "pro_code": "420000",
  "pro_id": 17,
  "pro_name": "湖北省" },
{
  "pro_cities": [{
    "city_name": "长沙市",
    "city_code": "430100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "430101000000",
      "area_id": 1890 },
    {
      "area_name": "芙蓉区",
      "area_code": "430102000000",
      "area_id": 1891 },
    {
      "area_name": "天心区",
      "area_code": "430103000000",
      "area_id": 1892 },
    {
      "area_name": "岳麓区",
      "area_code": "430104000000",
      "area_id": 1893 },
    {
      "area_name": "开福区",
      "area_code": "430105000000",
      "area_id": 1894 },
    {
      "area_name": "雨花区",
      "area_code": "430111000000",
      "area_id": 1895 },
    {
      "area_name": "望城区",
      "area_code": "430112000000",
      "area_id": 1896 },
    {
      "area_name": "长沙县",
      "area_code": "430121000000",
      "area_id": 1897 },
    {
      "area_name": "浏阳市",
      "area_code": "430181000000",
      "area_id": 1898 },
    {
      "area_name": "宁乡市",
      "area_code": "430182000000",
      "area_id": 1899 }],

    "city_id": 183 },
  {
    "city_name": "株洲市",
    "city_code": "430200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "430201000000",
      "area_id": 1900 },
    {
      "area_name": "荷塘区",
      "area_code": "430202000000",
      "area_id": 1901 },
    {
      "area_name": "芦淞区",
      "area_code": "430203000000",
      "area_id": 1902 },
    {
      "area_name": "石峰区",
      "area_code": "430204000000",
      "area_id": 1903 },
    {
      "area_name": "天元区",
      "area_code": "430211000000",
      "area_id": 1904 },
    {
      "area_name": "渌口区",
      "area_code": "430212000000",
      "area_id": 1905 },
    {
      "area_name": "攸县",
      "area_code": "430223000000",
      "area_id": 1906 },
    {
      "area_name": "茶陵县",
      "area_code": "430224000000",
      "area_id": 1907 },
    {
      "area_name": "炎陵县",
      "area_code": "430225000000",
      "area_id": 1908 },
    {
      "area_name": "云龙示范区",
      "area_code": "430271000000",
      "area_id": 1909 },
    {
      "area_name": "醴陵市",
      "area_code": "430281000000",
      "area_id": 1910 }],

    "city_id": 184 },
  {
    "city_name": "湘潭市",
    "city_code": "430300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "430301000000",
      "area_id": 1911 },
    {
      "area_name": "雨湖区",
      "area_code": "430302000000",
      "area_id": 1912 },
    {
      "area_name": "岳塘区",
      "area_code": "430304000000",
      "area_id": 1913 },
    {
      "area_name": "湘潭县",
      "area_code": "430321000000",
      "area_id": 1914 },
    {
      "area_name": "湖南湘潭高新技术产业园区",
      "area_code": "430371000000",
      "area_id": 1915 },
    {
      "area_name": "湘潭昭山示范区",
      "area_code": "430372000000",
      "area_id": 1916 },
    {
      "area_name": "湘潭九华示范区",
      "area_code": "430373000000",
      "area_id": 1917 },
    {
      "area_name": "湘乡市",
      "area_code": "430381000000",
      "area_id": 1918 },
    {
      "area_name": "韶山市",
      "area_code": "430382000000",
      "area_id": 1919 }],

    "city_id": 185 },
  {
    "city_name": "衡阳市",
    "city_code": "430400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "430401000000",
      "area_id": 1920 },
    {
      "area_name": "珠晖区",
      "area_code": "430405000000",
      "area_id": 1921 },
    {
      "area_name": "雁峰区",
      "area_code": "430406000000",
      "area_id": 1922 },
    {
      "area_name": "石鼓区",
      "area_code": "430407000000",
      "area_id": 1923 },
    {
      "area_name": "蒸湘区",
      "area_code": "430408000000",
      "area_id": 1924 },
    {
      "area_name": "南岳区",
      "area_code": "430412000000",
      "area_id": 1925 },
    {
      "area_name": "衡阳县",
      "area_code": "430421000000",
      "area_id": 1926 },
    {
      "area_name": "衡南县",
      "area_code": "430422000000",
      "area_id": 1927 },
    {
      "area_name": "衡山县",
      "area_code": "430423000000",
      "area_id": 1928 },
    {
      "area_name": "衡东县",
      "area_code": "430424000000",
      "area_id": 1929 },
    {
      "area_name": "祁东县",
      "area_code": "430426000000",
      "area_id": 1930 },
    {
      "area_name": "衡阳综合保税区",
      "area_code": "430471000000",
      "area_id": 1931 },
    {
      "area_name": "湖南衡阳高新技术产业园区",
      "area_code": "430472000000",
      "area_id": 1932 },
    {
      "area_name": "湖南衡阳松木经济开发区",
      "area_code": "430473000000",
      "area_id": 1933 },
    {
      "area_name": "耒阳市",
      "area_code": "430481000000",
      "area_id": 1934 },
    {
      "area_name": "常宁市",
      "area_code": "430482000000",
      "area_id": 1935 }],

    "city_id": 186 },
  {
    "city_name": "邵阳市",
    "city_code": "430500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "430501000000",
      "area_id": 1936 },
    {
      "area_name": "双清区",
      "area_code": "430502000000",
      "area_id": 1937 },
    {
      "area_name": "大祥区",
      "area_code": "430503000000",
      "area_id": 1938 },
    {
      "area_name": "北塔区",
      "area_code": "430511000000",
      "area_id": 1939 },
    {
      "area_name": "邵东县",
      "area_code": "430521000000",
      "area_id": 1940 },
    {
      "area_name": "新邵县",
      "area_code": "430522000000",
      "area_id": 1941 },
    {
      "area_name": "邵阳县",
      "area_code": "430523000000",
      "area_id": 1942 },
    {
      "area_name": "隆回县",
      "area_code": "430524000000",
      "area_id": 1943 },
    {
      "area_name": "洞口县",
      "area_code": "430525000000",
      "area_id": 1944 },
    {
      "area_name": "绥宁县",
      "area_code": "430527000000",
      "area_id": 1945 },
    {
      "area_name": "新宁县",
      "area_code": "430528000000",
      "area_id": 1946 },
    {
      "area_name": "城步苗族自治县",
      "area_code": "430529000000",
      "area_id": 1947 },
    {
      "area_name": "武冈市",
      "area_code": "430581000000",
      "area_id": 1948 }],

    "city_id": 187 },
  {
    "city_name": "岳阳市",
    "city_code": "430600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "430601000000",
      "area_id": 1949 },
    {
      "area_name": "岳阳楼区",
      "area_code": "430602000000",
      "area_id": 1950 },
    {
      "area_name": "云溪区",
      "area_code": "430603000000",
      "area_id": 1951 },
    {
      "area_name": "君山区",
      "area_code": "430611000000",
      "area_id": 1952 },
    {
      "area_name": "岳阳县",
      "area_code": "430621000000",
      "area_id": 1953 },
    {
      "area_name": "华容县",
      "area_code": "430623000000",
      "area_id": 1954 },
    {
      "area_name": "湘阴县",
      "area_code": "430624000000",
      "area_id": 1955 },
    {
      "area_name": "平江县",
      "area_code": "430626000000",
      "area_id": 1956 },
    {
      "area_name": "岳阳市屈原管理区",
      "area_code": "430671000000",
      "area_id": 1957 },
    {
      "area_name": "汨罗市",
      "area_code": "430681000000",
      "area_id": 1958 },
    {
      "area_name": "临湘市",
      "area_code": "430682000000",
      "area_id": 1959 }],

    "city_id": 188 },
  {
    "city_name": "常德市",
    "city_code": "430700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "430701000000",
      "area_id": 1960 },
    {
      "area_name": "武陵区",
      "area_code": "430702000000",
      "area_id": 1961 },
    {
      "area_name": "鼎城区",
      "area_code": "430703000000",
      "area_id": 1962 },
    {
      "area_name": "安乡县",
      "area_code": "430721000000",
      "area_id": 1963 },
    {
      "area_name": "汉寿县",
      "area_code": "430722000000",
      "area_id": 1964 },
    {
      "area_name": "澧县",
      "area_code": "430723000000",
      "area_id": 1965 },
    {
      "area_name": "临澧县",
      "area_code": "430724000000",
      "area_id": 1966 },
    {
      "area_name": "桃源县",
      "area_code": "430725000000",
      "area_id": 1967 },
    {
      "area_name": "石门县",
      "area_code": "430726000000",
      "area_id": 1968 },
    {
      "area_name": "常德市西洞庭管理区",
      "area_code": "430771000000",
      "area_id": 1969 },
    {
      "area_name": "津市市",
      "area_code": "430781000000",
      "area_id": 1970 }],

    "city_id": 189 },
  {
    "city_name": "张家界市",
    "city_code": "430800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "430801000000",
      "area_id": 1971 },
    {
      "area_name": "永定区",
      "area_code": "430802000000",
      "area_id": 1972 },
    {
      "area_name": "武陵源区",
      "area_code": "430811000000",
      "area_id": 1973 },
    {
      "area_name": "慈利县",
      "area_code": "430821000000",
      "area_id": 1974 },
    {
      "area_name": "桑植县",
      "area_code": "430822000000",
      "area_id": 1975 }],

    "city_id": 190 },
  {
    "city_name": "益阳市",
    "city_code": "430900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "430901000000",
      "area_id": 1976 },
    {
      "area_name": "资阳区",
      "area_code": "430902000000",
      "area_id": 1977 },
    {
      "area_name": "赫山区",
      "area_code": "430903000000",
      "area_id": 1978 },
    {
      "area_name": "南县",
      "area_code": "430921000000",
      "area_id": 1979 },
    {
      "area_name": "桃江县",
      "area_code": "430922000000",
      "area_id": 1980 },
    {
      "area_name": "安化县",
      "area_code": "430923000000",
      "area_id": 1981 },
    {
      "area_name": "益阳市大通湖管理区",
      "area_code": "430971000000",
      "area_id": 1982 },
    {
      "area_name": "湖南益阳高新技术产业园区",
      "area_code": "430972000000",
      "area_id": 1983 },
    {
      "area_name": "沅江市",
      "area_code": "430981000000",
      "area_id": 1984 }],

    "city_id": 191 },
  {
    "city_name": "郴州市",
    "city_code": "431000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "431001000000",
      "area_id": 1985 },
    {
      "area_name": "北湖区",
      "area_code": "431002000000",
      "area_id": 1986 },
    {
      "area_name": "苏仙区",
      "area_code": "431003000000",
      "area_id": 1987 },
    {
      "area_name": "桂阳县",
      "area_code": "431021000000",
      "area_id": 1988 },
    {
      "area_name": "宜章县",
      "area_code": "431022000000",
      "area_id": 1989 },
    {
      "area_name": "永兴县",
      "area_code": "431023000000",
      "area_id": 1990 },
    {
      "area_name": "嘉禾县",
      "area_code": "431024000000",
      "area_id": 1991 },
    {
      "area_name": "临武县",
      "area_code": "431025000000",
      "area_id": 1992 },
    {
      "area_name": "汝城县",
      "area_code": "431026000000",
      "area_id": 1993 },
    {
      "area_name": "桂东县",
      "area_code": "431027000000",
      "area_id": 1994 },
    {
      "area_name": "安仁县",
      "area_code": "431028000000",
      "area_id": 1995 },
    {
      "area_name": "资兴市",
      "area_code": "431081000000",
      "area_id": 1996 }],

    "city_id": 192 },
  {
    "city_name": "永州市",
    "city_code": "431100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "431101000000",
      "area_id": 1997 },
    {
      "area_name": "零陵区",
      "area_code": "431102000000",
      "area_id": 1998 },
    {
      "area_name": "冷水滩区",
      "area_code": "431103000000",
      "area_id": 1999 },
    {
      "area_name": "祁阳县",
      "area_code": "431121000000",
      "area_id": 2000 },
    {
      "area_name": "东安县",
      "area_code": "431122000000",
      "area_id": 2001 },
    {
      "area_name": "双牌县",
      "area_code": "431123000000",
      "area_id": 2002 },
    {
      "area_name": "道县",
      "area_code": "431124000000",
      "area_id": 2003 },
    {
      "area_name": "江永县",
      "area_code": "431125000000",
      "area_id": 2004 },
    {
      "area_name": "宁远县",
      "area_code": "431126000000",
      "area_id": 2005 },
    {
      "area_name": "蓝山县",
      "area_code": "431127000000",
      "area_id": 2006 },
    {
      "area_name": "新田县",
      "area_code": "431128000000",
      "area_id": 2007 },
    {
      "area_name": "江华瑶族自治县",
      "area_code": "431129000000",
      "area_id": 2008 },
    {
      "area_name": "永州经济技术开发区",
      "area_code": "431171000000",
      "area_id": 2009 },
    {
      "area_name": "永州市金洞管理区",
      "area_code": "431172000000",
      "area_id": 2010 },
    {
      "area_name": "永州市回龙圩管理区",
      "area_code": "431173000000",
      "area_id": 2011 }],

    "city_id": 193 },
  {
    "city_name": "怀化市",
    "city_code": "431200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "431201000000",
      "area_id": 2012 },
    {
      "area_name": "鹤城区",
      "area_code": "431202000000",
      "area_id": 2013 },
    {
      "area_name": "中方县",
      "area_code": "431221000000",
      "area_id": 2014 },
    {
      "area_name": "沅陵县",
      "area_code": "431222000000",
      "area_id": 2015 },
    {
      "area_name": "辰溪县",
      "area_code": "431223000000",
      "area_id": 2016 },
    {
      "area_name": "溆浦县",
      "area_code": "431224000000",
      "area_id": 2017 },
    {
      "area_name": "会同县",
      "area_code": "431225000000",
      "area_id": 2018 },
    {
      "area_name": "麻阳苗族自治县",
      "area_code": "431226000000",
      "area_id": 2019 },
    {
      "area_name": "新晃侗族自治县",
      "area_code": "431227000000",
      "area_id": 2020 },
    {
      "area_name": "芷江侗族自治县",
      "area_code": "431228000000",
      "area_id": 2021 },
    {
      "area_name": "靖州苗族侗族自治县",
      "area_code": "431229000000",
      "area_id": 2022 },
    {
      "area_name": "通道侗族自治县",
      "area_code": "431230000000",
      "area_id": 2023 },
    {
      "area_name": "怀化市洪江管理区",
      "area_code": "431271000000",
      "area_id": 2024 },
    {
      "area_name": "洪江市",
      "area_code": "431281000000",
      "area_id": 2025 }],

    "city_id": 194 },
  {
    "city_name": "娄底市",
    "city_code": "431300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "431301000000",
      "area_id": 2026 },
    {
      "area_name": "娄星区",
      "area_code": "431302000000",
      "area_id": 2027 },
    {
      "area_name": "双峰县",
      "area_code": "431321000000",
      "area_id": 2028 },
    {
      "area_name": "新化县",
      "area_code": "431322000000",
      "area_id": 2029 },
    {
      "area_name": "冷水江市",
      "area_code": "431381000000",
      "area_id": 2030 },
    {
      "area_name": "涟源市",
      "area_code": "431382000000",
      "area_id": 2031 }],

    "city_id": 195 },
  {
    "city_name": "湘西土家族苗族自治州",
    "city_code": "433100000000",
    "city_areas": [{
      "area_name": "吉首市",
      "area_code": "433101000000",
      "area_id": 2032 },
    {
      "area_name": "泸溪县",
      "area_code": "433122000000",
      "area_id": 2033 },
    {
      "area_name": "凤凰县",
      "area_code": "433123000000",
      "area_id": 2034 },
    {
      "area_name": "花垣县",
      "area_code": "433124000000",
      "area_id": 2035 },
    {
      "area_name": "保靖县",
      "area_code": "433125000000",
      "area_id": 2036 },
    {
      "area_name": "古丈县",
      "area_code": "433126000000",
      "area_id": 2037 },
    {
      "area_name": "永顺县",
      "area_code": "433127000000",
      "area_id": 2038 },
    {
      "area_name": "龙山县",
      "area_code": "433130000000",
      "area_id": 2039 },
    {
      "area_name": "湖南吉首经济开发区",
      "area_code": "433172000000",
      "area_id": 2040 },
    {
      "area_name": "湖南永顺经济开发区",
      "area_code": "433173000000",
      "area_id": 2041 }],

    "city_id": 196 }],

  "pro_code": "430000",
  "pro_id": 18,
  "pro_name": "湖南省" },
{
  "pro_cities": [{
    "city_name": "广州市",
    "city_code": "440100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "440101000000",
      "area_id": 2042 },
    {
      "area_name": "荔湾区",
      "area_code": "440103000000",
      "area_id": 2043 },
    {
      "area_name": "越秀区",
      "area_code": "440104000000",
      "area_id": 2044 },
    {
      "area_name": "海珠区",
      "area_code": "440105000000",
      "area_id": 2045 },
    {
      "area_name": "天河区",
      "area_code": "440106000000",
      "area_id": 2046 },
    {
      "area_name": "白云区",
      "area_code": "440111000000",
      "area_id": 2047 },
    {
      "area_name": "黄埔区",
      "area_code": "440112000000",
      "area_id": 2048 },
    {
      "area_name": "番禺区",
      "area_code": "440113000000",
      "area_id": 2049 },
    {
      "area_name": "花都区",
      "area_code": "440114000000",
      "area_id": 2050 },
    {
      "area_name": "南沙区",
      "area_code": "440115000000",
      "area_id": 2051 },
    {
      "area_name": "从化区",
      "area_code": "440117000000",
      "area_id": 2052 },
    {
      "area_name": "增城区",
      "area_code": "440118000000",
      "area_id": 2053 }],

    "city_id": 197 },
  {
    "city_name": "韶关市",
    "city_code": "440200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "440201000000",
      "area_id": 2054 },
    {
      "area_name": "武江区",
      "area_code": "440203000000",
      "area_id": 2055 },
    {
      "area_name": "浈江区",
      "area_code": "440204000000",
      "area_id": 2056 },
    {
      "area_name": "曲江区",
      "area_code": "440205000000",
      "area_id": 2057 },
    {
      "area_name": "始兴县",
      "area_code": "440222000000",
      "area_id": 2058 },
    {
      "area_name": "仁化县",
      "area_code": "440224000000",
      "area_id": 2059 },
    {
      "area_name": "翁源县",
      "area_code": "440229000000",
      "area_id": 2060 },
    {
      "area_name": "乳源瑶族自治县",
      "area_code": "440232000000",
      "area_id": 2061 },
    {
      "area_name": "新丰县",
      "area_code": "440233000000",
      "area_id": 2062 },
    {
      "area_name": "乐昌市",
      "area_code": "440281000000",
      "area_id": 2063 },
    {
      "area_name": "南雄市",
      "area_code": "440282000000",
      "area_id": 2064 }],

    "city_id": 198 },
  {
    "city_name": "深圳市",
    "city_code": "440300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "440301000000",
      "area_id": 2065 },
    {
      "area_name": "罗湖区",
      "area_code": "440303000000",
      "area_id": 2066 },
    {
      "area_name": "福田区",
      "area_code": "440304000000",
      "area_id": 2067 },
    {
      "area_name": "南山区",
      "area_code": "440305000000",
      "area_id": 2068 },
    {
      "area_name": "宝安区",
      "area_code": "440306000000",
      "area_id": 2069 },
    {
      "area_name": "龙岗区",
      "area_code": "440307000000",
      "area_id": 2070 },
    {
      "area_name": "盐田区",
      "area_code": "440308000000",
      "area_id": 2071 },
    {
      "area_name": "龙华区",
      "area_code": "440309000000",
      "area_id": 2072 },
    {
      "area_name": "坪山区",
      "area_code": "440310000000",
      "area_id": 2073 },
    {
      "area_name": "光明区",
      "area_code": "440311000000",
      "area_id": 2074 }],

    "city_id": 199 },
  {
    "city_name": "珠海市",
    "city_code": "440400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "440401000000",
      "area_id": 2075 },
    {
      "area_name": "香洲区",
      "area_code": "440402000000",
      "area_id": 2076 },
    {
      "area_name": "斗门区",
      "area_code": "440403000000",
      "area_id": 2077 },
    {
      "area_name": "金湾区",
      "area_code": "440404000000",
      "area_id": 2078 }],

    "city_id": 200 },
  {
    "city_name": "汕头市",
    "city_code": "440500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "440501000000",
      "area_id": 2079 },
    {
      "area_name": "龙湖区",
      "area_code": "440507000000",
      "area_id": 2080 },
    {
      "area_name": "金平区",
      "area_code": "440511000000",
      "area_id": 2081 },
    {
      "area_name": "濠江区",
      "area_code": "440512000000",
      "area_id": 2082 },
    {
      "area_name": "潮阳区",
      "area_code": "440513000000",
      "area_id": 2083 },
    {
      "area_name": "潮南区",
      "area_code": "440514000000",
      "area_id": 2084 },
    {
      "area_name": "澄海区",
      "area_code": "440515000000",
      "area_id": 2085 },
    {
      "area_name": "南澳县",
      "area_code": "440523000000",
      "area_id": 2086 }],

    "city_id": 201 },
  {
    "city_name": "佛山市",
    "city_code": "440600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "440601000000",
      "area_id": 2087 },
    {
      "area_name": "禅城区",
      "area_code": "440604000000",
      "area_id": 2088 },
    {
      "area_name": "南海区",
      "area_code": "440605000000",
      "area_id": 2089 },
    {
      "area_name": "顺德区",
      "area_code": "440606000000",
      "area_id": 2090 },
    {
      "area_name": "三水区",
      "area_code": "440607000000",
      "area_id": 2091 },
    {
      "area_name": "高明区",
      "area_code": "440608000000",
      "area_id": 2092 }],

    "city_id": 202 },
  {
    "city_name": "江门市",
    "city_code": "440700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "440701000000",
      "area_id": 2093 },
    {
      "area_name": "蓬江区",
      "area_code": "440703000000",
      "area_id": 2094 },
    {
      "area_name": "江海区",
      "area_code": "440704000000",
      "area_id": 2095 },
    {
      "area_name": "新会区",
      "area_code": "440705000000",
      "area_id": 2096 },
    {
      "area_name": "台山市",
      "area_code": "440781000000",
      "area_id": 2097 },
    {
      "area_name": "开平市",
      "area_code": "440783000000",
      "area_id": 2098 },
    {
      "area_name": "鹤山市",
      "area_code": "440784000000",
      "area_id": 2099 },
    {
      "area_name": "恩平市",
      "area_code": "440785000000",
      "area_id": 2100 }],

    "city_id": 203 },
  {
    "city_name": "湛江市",
    "city_code": "440800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "440801000000",
      "area_id": 2101 },
    {
      "area_name": "赤坎区",
      "area_code": "440802000000",
      "area_id": 2102 },
    {
      "area_name": "霞山区",
      "area_code": "440803000000",
      "area_id": 2103 },
    {
      "area_name": "坡头区",
      "area_code": "440804000000",
      "area_id": 2104 },
    {
      "area_name": "麻章区",
      "area_code": "440811000000",
      "area_id": 2105 },
    {
      "area_name": "遂溪县",
      "area_code": "440823000000",
      "area_id": 2106 },
    {
      "area_name": "徐闻县",
      "area_code": "440825000000",
      "area_id": 2107 },
    {
      "area_name": "廉江市",
      "area_code": "440881000000",
      "area_id": 2108 },
    {
      "area_name": "雷州市",
      "area_code": "440882000000",
      "area_id": 2109 },
    {
      "area_name": "吴川市",
      "area_code": "440883000000",
      "area_id": 2110 }],

    "city_id": 204 },
  {
    "city_name": "茂名市",
    "city_code": "440900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "440901000000",
      "area_id": 2111 },
    {
      "area_name": "茂南区",
      "area_code": "440902000000",
      "area_id": 2112 },
    {
      "area_name": "电白区",
      "area_code": "440904000000",
      "area_id": 2113 },
    {
      "area_name": "高州市",
      "area_code": "440981000000",
      "area_id": 2114 },
    {
      "area_name": "化州市",
      "area_code": "440982000000",
      "area_id": 2115 },
    {
      "area_name": "信宜市",
      "area_code": "440983000000",
      "area_id": 2116 }],

    "city_id": 205 },
  {
    "city_name": "肇庆市",
    "city_code": "441200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "441201000000",
      "area_id": 2117 },
    {
      "area_name": "端州区",
      "area_code": "441202000000",
      "area_id": 2118 },
    {
      "area_name": "鼎湖区",
      "area_code": "441203000000",
      "area_id": 2119 },
    {
      "area_name": "高要区",
      "area_code": "441204000000",
      "area_id": 2120 },
    {
      "area_name": "广宁县",
      "area_code": "441223000000",
      "area_id": 2121 },
    {
      "area_name": "怀集县",
      "area_code": "441224000000",
      "area_id": 2122 },
    {
      "area_name": "封开县",
      "area_code": "441225000000",
      "area_id": 2123 },
    {
      "area_name": "德庆县",
      "area_code": "441226000000",
      "area_id": 2124 },
    {
      "area_name": "四会市",
      "area_code": "441284000000",
      "area_id": 2125 }],

    "city_id": 206 },
  {
    "city_name": "惠州市",
    "city_code": "441300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "441301000000",
      "area_id": 2126 },
    {
      "area_name": "惠城区",
      "area_code": "441302000000",
      "area_id": 2127 },
    {
      "area_name": "惠阳区",
      "area_code": "441303000000",
      "area_id": 2128 },
    {
      "area_name": "博罗县",
      "area_code": "441322000000",
      "area_id": 2129 },
    {
      "area_name": "惠东县",
      "area_code": "441323000000",
      "area_id": 2130 },
    {
      "area_name": "龙门县",
      "area_code": "441324000000",
      "area_id": 2131 }],

    "city_id": 207 },
  {
    "city_name": "梅州市",
    "city_code": "441400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "441401000000",
      "area_id": 2132 },
    {
      "area_name": "梅江区",
      "area_code": "441402000000",
      "area_id": 2133 },
    {
      "area_name": "梅县区",
      "area_code": "441403000000",
      "area_id": 2134 },
    {
      "area_name": "大埔县",
      "area_code": "441422000000",
      "area_id": 2135 },
    {
      "area_name": "丰顺县",
      "area_code": "441423000000",
      "area_id": 2136 },
    {
      "area_name": "五华县",
      "area_code": "441424000000",
      "area_id": 2137 },
    {
      "area_name": "平远县",
      "area_code": "441426000000",
      "area_id": 2138 },
    {
      "area_name": "蕉岭县",
      "area_code": "441427000000",
      "area_id": 2139 },
    {
      "area_name": "兴宁市",
      "area_code": "441481000000",
      "area_id": 2140 }],

    "city_id": 208 },
  {
    "city_name": "汕尾市",
    "city_code": "441500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "441501000000",
      "area_id": 2141 },
    {
      "area_name": "城区",
      "area_code": "441502000000",
      "area_id": 2142 },
    {
      "area_name": "海丰县",
      "area_code": "441521000000",
      "area_id": 2143 },
    {
      "area_name": "陆河县",
      "area_code": "441523000000",
      "area_id": 2144 },
    {
      "area_name": "陆丰市",
      "area_code": "441581000000",
      "area_id": 2145 }],

    "city_id": 209 },
  {
    "city_name": "河源市",
    "city_code": "441600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "441601000000",
      "area_id": 2146 },
    {
      "area_name": "源城区",
      "area_code": "441602000000",
      "area_id": 2147 },
    {
      "area_name": "紫金县",
      "area_code": "441621000000",
      "area_id": 2148 },
    {
      "area_name": "龙川县",
      "area_code": "441622000000",
      "area_id": 2149 },
    {
      "area_name": "连平县",
      "area_code": "441623000000",
      "area_id": 2150 },
    {
      "area_name": "和平县",
      "area_code": "441624000000",
      "area_id": 2151 },
    {
      "area_name": "东源县",
      "area_code": "441625000000",
      "area_id": 2152 }],

    "city_id": 210 },
  {
    "city_name": "阳江市",
    "city_code": "441700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "441701000000",
      "area_id": 2153 },
    {
      "area_name": "江城区",
      "area_code": "441702000000",
      "area_id": 2154 },
    {
      "area_name": "阳东区",
      "area_code": "441704000000",
      "area_id": 2155 },
    {
      "area_name": "阳西县",
      "area_code": "441721000000",
      "area_id": 2156 },
    {
      "area_name": "阳春市",
      "area_code": "441781000000",
      "area_id": 2157 }],

    "city_id": 211 },
  {
    "city_name": "清远市",
    "city_code": "441800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "441801000000",
      "area_id": 2158 },
    {
      "area_name": "清城区",
      "area_code": "441802000000",
      "area_id": 2159 },
    {
      "area_name": "清新区",
      "area_code": "441803000000",
      "area_id": 2160 },
    {
      "area_name": "佛冈县",
      "area_code": "441821000000",
      "area_id": 2161 },
    {
      "area_name": "阳山县",
      "area_code": "441823000000",
      "area_id": 2162 },
    {
      "area_name": "连山壮族瑶族自治县",
      "area_code": "441825000000",
      "area_id": 2163 },
    {
      "area_name": "连南瑶族自治县",
      "area_code": "441826000000",
      "area_id": 2164 },
    {
      "area_name": "英德市",
      "area_code": "441881000000",
      "area_id": 2165 },
    {
      "area_name": "连州市",
      "area_code": "441882000000",
      "area_id": 2166 }],

    "city_id": 212 },
  {
    "city_name": "东莞市",
    "city_code": "441900000000",
    "city_areas": [{
      "area_name": "东城街道办事处",
      "area_code": "441900003000",
      "area_id": 2167 },
    {
      "area_name": "南城街道办事处",
      "area_code": "441900004000",
      "area_id": 2168 },
    {
      "area_name": "万江街道办事处",
      "area_code": "441900005000",
      "area_id": 2169 },
    {
      "area_name": "莞城街道办事处",
      "area_code": "441900006000",
      "area_id": 2170 },
    {
      "area_name": "石碣镇",
      "area_code": "441900101000",
      "area_id": 2171 },
    {
      "area_name": "石龙镇",
      "area_code": "441900102000",
      "area_id": 2172 },
    {
      "area_name": "茶山镇",
      "area_code": "441900103000",
      "area_id": 2173 },
    {
      "area_name": "石排镇",
      "area_code": "441900104000",
      "area_id": 2174 },
    {
      "area_name": "企石镇",
      "area_code": "441900105000",
      "area_id": 2175 },
    {
      "area_name": "横沥镇",
      "area_code": "441900106000",
      "area_id": 2176 },
    {
      "area_name": "桥头镇",
      "area_code": "441900107000",
      "area_id": 2177 },
    {
      "area_name": "谢岗镇",
      "area_code": "441900108000",
      "area_id": 2178 },
    {
      "area_name": "东坑镇",
      "area_code": "441900109000",
      "area_id": 2179 },
    {
      "area_name": "常平镇",
      "area_code": "441900110000",
      "area_id": 2180 },
    {
      "area_name": "寮步镇",
      "area_code": "441900111000",
      "area_id": 2181 },
    {
      "area_name": "樟木头镇",
      "area_code": "441900112000",
      "area_id": 2182 },
    {
      "area_name": "大朗镇",
      "area_code": "441900113000",
      "area_id": 2183 },
    {
      "area_name": "黄江镇",
      "area_code": "441900114000",
      "area_id": 2184 },
    {
      "area_name": "清溪镇",
      "area_code": "441900115000",
      "area_id": 2185 },
    {
      "area_name": "塘厦镇",
      "area_code": "441900116000",
      "area_id": 2186 },
    {
      "area_name": "凤岗镇",
      "area_code": "441900117000",
      "area_id": 2187 },
    {
      "area_name": "大岭山镇",
      "area_code": "441900118000",
      "area_id": 2188 },
    {
      "area_name": "长安镇",
      "area_code": "441900119000",
      "area_id": 2189 },
    {
      "area_name": "虎门镇",
      "area_code": "441900121000",
      "area_id": 2190 },
    {
      "area_name": "厚街镇",
      "area_code": "441900122000",
      "area_id": 2191 },
    {
      "area_name": "沙田镇",
      "area_code": "441900123000",
      "area_id": 2192 },
    {
      "area_name": "道滘镇",
      "area_code": "441900124000",
      "area_id": 2193 },
    {
      "area_name": "洪梅镇",
      "area_code": "441900125000",
      "area_id": 2194 },
    {
      "area_name": "麻涌镇",
      "area_code": "441900126000",
      "area_id": 2195 },
    {
      "area_name": "望牛墩镇",
      "area_code": "441900127000",
      "area_id": 2196 },
    {
      "area_name": "中堂镇",
      "area_code": "441900128000",
      "area_id": 2197 },
    {
      "area_name": "高埗镇",
      "area_code": "441900129000",
      "area_id": 2198 },
    {
      "area_name": "松山湖管委会",
      "area_code": "441900401000",
      "area_id": 2199 },
    {
      "area_name": "东莞港",
      "area_code": "441900402000",
      "area_id": 2200 },
    {
      "area_name": "东莞生态园",
      "area_code": "441900403000",
      "area_id": 2201 }],

    "city_id": 213 },
  {
    "city_name": "中山市",
    "city_code": "442000000000",
    "city_areas": [{
      "area_name": "石岐区街道办事处",
      "area_code": "442000001000",
      "area_id": 2202 },
    {
      "area_name": "东区街道办事处",
      "area_code": "442000002000",
      "area_id": 2203 },
    {
      "area_name": "火炬开发区街道办事处",
      "area_code": "442000003000",
      "area_id": 2204 },
    {
      "area_name": "西区街道办事处",
      "area_code": "442000004000",
      "area_id": 2205 },
    {
      "area_name": "南区街道办事处",
      "area_code": "442000005000",
      "area_id": 2206 },
    {
      "area_name": "五桂山街道办事处",
      "area_code": "442000006000",
      "area_id": 2207 },
    {
      "area_name": "小榄镇",
      "area_code": "442000100000",
      "area_id": 2208 },
    {
      "area_name": "黄圃镇",
      "area_code": "442000101000",
      "area_id": 2209 },
    {
      "area_name": "民众镇",
      "area_code": "442000102000",
      "area_id": 2210 },
    {
      "area_name": "东凤镇",
      "area_code": "442000103000",
      "area_id": 2211 },
    {
      "area_name": "东升镇",
      "area_code": "442000104000",
      "area_id": 2212 },
    {
      "area_name": "古镇镇",
      "area_code": "442000105000",
      "area_id": 2213 },
    {
      "area_name": "沙溪镇",
      "area_code": "442000106000",
      "area_id": 2214 },
    {
      "area_name": "坦洲镇",
      "area_code": "442000107000",
      "area_id": 2215 },
    {
      "area_name": "港口镇",
      "area_code": "442000108000",
      "area_id": 2216 },
    {
      "area_name": "三角镇",
      "area_code": "442000109000",
      "area_id": 2217 },
    {
      "area_name": "横栏镇",
      "area_code": "442000110000",
      "area_id": 2218 },
    {
      "area_name": "南头镇",
      "area_code": "442000111000",
      "area_id": 2219 },
    {
      "area_name": "阜沙镇",
      "area_code": "442000112000",
      "area_id": 2220 },
    {
      "area_name": "南朗镇",
      "area_code": "442000113000",
      "area_id": 2221 },
    {
      "area_name": "三乡镇",
      "area_code": "442000114000",
      "area_id": 2222 },
    {
      "area_name": "板芙镇",
      "area_code": "442000115000",
      "area_id": 2223 },
    {
      "area_name": "大涌镇",
      "area_code": "442000116000",
      "area_id": 2224 },
    {
      "area_name": "神湾镇",
      "area_code": "442000117000",
      "area_id": 2225 }],

    "city_id": 214 },
  {
    "city_name": "潮州市",
    "city_code": "445100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "445101000000",
      "area_id": 2226 },
    {
      "area_name": "湘桥区",
      "area_code": "445102000000",
      "area_id": 2227 },
    {
      "area_name": "潮安区",
      "area_code": "445103000000",
      "area_id": 2228 },
    {
      "area_name": "饶平县",
      "area_code": "445122000000",
      "area_id": 2229 }],

    "city_id": 215 },
  {
    "city_name": "揭阳市",
    "city_code": "445200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "445201000000",
      "area_id": 2230 },
    {
      "area_name": "榕城区",
      "area_code": "445202000000",
      "area_id": 2231 },
    {
      "area_name": "揭东区",
      "area_code": "445203000000",
      "area_id": 2232 },
    {
      "area_name": "揭西县",
      "area_code": "445222000000",
      "area_id": 2233 },
    {
      "area_name": "惠来县",
      "area_code": "445224000000",
      "area_id": 2234 },
    {
      "area_name": "普宁市",
      "area_code": "445281000000",
      "area_id": 2235 }],

    "city_id": 216 },
  {
    "city_name": "云浮市",
    "city_code": "445300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "445301000000",
      "area_id": 2236 },
    {
      "area_name": "云城区",
      "area_code": "445302000000",
      "area_id": 2237 },
    {
      "area_name": "云安区",
      "area_code": "445303000000",
      "area_id": 2238 },
    {
      "area_name": "新兴县",
      "area_code": "445321000000",
      "area_id": 2239 },
    {
      "area_name": "郁南县",
      "area_code": "445322000000",
      "area_id": 2240 },
    {
      "area_name": "罗定市",
      "area_code": "445381000000",
      "area_id": 2241 }],

    "city_id": 217 }],

  "pro_code": "440000",
  "pro_id": 19,
  "pro_name": "广东省" },
{
  "pro_cities": [{
    "city_name": "南宁市",
    "city_code": "450100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "450101000000",
      "area_id": 2242 },
    {
      "area_name": "兴宁区",
      "area_code": "450102000000",
      "area_id": 2243 },
    {
      "area_name": "青秀区",
      "area_code": "450103000000",
      "area_id": 2244 },
    {
      "area_name": "江南区",
      "area_code": "450105000000",
      "area_id": 2245 },
    {
      "area_name": "西乡塘区",
      "area_code": "450107000000",
      "area_id": 2246 },
    {
      "area_name": "良庆区",
      "area_code": "450108000000",
      "area_id": 2247 },
    {
      "area_name": "邕宁区",
      "area_code": "450109000000",
      "area_id": 2248 },
    {
      "area_name": "武鸣区",
      "area_code": "450110000000",
      "area_id": 2249 },
    {
      "area_name": "隆安县",
      "area_code": "450123000000",
      "area_id": 2250 },
    {
      "area_name": "马山县",
      "area_code": "450124000000",
      "area_id": 2251 },
    {
      "area_name": "上林县",
      "area_code": "450125000000",
      "area_id": 2252 },
    {
      "area_name": "宾阳县",
      "area_code": "450126000000",
      "area_id": 2253 },
    {
      "area_name": "横县",
      "area_code": "450127000000",
      "area_id": 2254 }],

    "city_id": 218 },
  {
    "city_name": "柳州市",
    "city_code": "450200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "450201000000",
      "area_id": 2255 },
    {
      "area_name": "城中区",
      "area_code": "450202000000",
      "area_id": 2256 },
    {
      "area_name": "鱼峰区",
      "area_code": "450203000000",
      "area_id": 2257 },
    {
      "area_name": "柳南区",
      "area_code": "450204000000",
      "area_id": 2258 },
    {
      "area_name": "柳北区",
      "area_code": "450205000000",
      "area_id": 2259 },
    {
      "area_name": "柳江区",
      "area_code": "450206000000",
      "area_id": 2260 },
    {
      "area_name": "柳城县",
      "area_code": "450222000000",
      "area_id": 2261 },
    {
      "area_name": "鹿寨县",
      "area_code": "450223000000",
      "area_id": 2262 },
    {
      "area_name": "融安县",
      "area_code": "450224000000",
      "area_id": 2263 },
    {
      "area_name": "融水苗族自治县",
      "area_code": "450225000000",
      "area_id": 2264 },
    {
      "area_name": "三江侗族自治县",
      "area_code": "450226000000",
      "area_id": 2265 }],

    "city_id": 219 },
  {
    "city_name": "桂林市",
    "city_code": "450300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "450301000000",
      "area_id": 2266 },
    {
      "area_name": "秀峰区",
      "area_code": "450302000000",
      "area_id": 2267 },
    {
      "area_name": "叠彩区",
      "area_code": "450303000000",
      "area_id": 2268 },
    {
      "area_name": "象山区",
      "area_code": "450304000000",
      "area_id": 2269 },
    {
      "area_name": "七星区",
      "area_code": "450305000000",
      "area_id": 2270 },
    {
      "area_name": "雁山区",
      "area_code": "450311000000",
      "area_id": 2271 },
    {
      "area_name": "临桂区",
      "area_code": "450312000000",
      "area_id": 2272 },
    {
      "area_name": "阳朔县",
      "area_code": "450321000000",
      "area_id": 2273 },
    {
      "area_name": "灵川县",
      "area_code": "450323000000",
      "area_id": 2274 },
    {
      "area_name": "全州县",
      "area_code": "450324000000",
      "area_id": 2275 },
    {
      "area_name": "兴安县",
      "area_code": "450325000000",
      "area_id": 2276 },
    {
      "area_name": "永福县",
      "area_code": "450326000000",
      "area_id": 2277 },
    {
      "area_name": "灌阳县",
      "area_code": "450327000000",
      "area_id": 2278 },
    {
      "area_name": "龙胜各族自治县",
      "area_code": "450328000000",
      "area_id": 2279 },
    {
      "area_name": "资源县",
      "area_code": "450329000000",
      "area_id": 2280 },
    {
      "area_name": "平乐县",
      "area_code": "450330000000",
      "area_id": 2281 },
    {
      "area_name": "恭城瑶族自治县",
      "area_code": "450332000000",
      "area_id": 2282 },
    {
      "area_name": "荔浦市",
      "area_code": "450381000000",
      "area_id": 2283 }],

    "city_id": 220 },
  {
    "city_name": "梧州市",
    "city_code": "450400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "450401000000",
      "area_id": 2284 },
    {
      "area_name": "万秀区",
      "area_code": "450403000000",
      "area_id": 2285 },
    {
      "area_name": "长洲区",
      "area_code": "450405000000",
      "area_id": 2286 },
    {
      "area_name": "龙圩区",
      "area_code": "450406000000",
      "area_id": 2287 },
    {
      "area_name": "苍梧县",
      "area_code": "450421000000",
      "area_id": 2288 },
    {
      "area_name": "藤县",
      "area_code": "450422000000",
      "area_id": 2289 },
    {
      "area_name": "蒙山县",
      "area_code": "450423000000",
      "area_id": 2290 },
    {
      "area_name": "岑溪市",
      "area_code": "450481000000",
      "area_id": 2291 }],

    "city_id": 221 },
  {
    "city_name": "北海市",
    "city_code": "450500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "450501000000",
      "area_id": 2292 },
    {
      "area_name": "海城区",
      "area_code": "450502000000",
      "area_id": 2293 },
    {
      "area_name": "银海区",
      "area_code": "450503000000",
      "area_id": 2294 },
    {
      "area_name": "铁山港区",
      "area_code": "450512000000",
      "area_id": 2295 },
    {
      "area_name": "合浦县",
      "area_code": "450521000000",
      "area_id": 2296 }],

    "city_id": 222 },
  {
    "city_name": "防城港市",
    "city_code": "450600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "450601000000",
      "area_id": 2297 },
    {
      "area_name": "港口区",
      "area_code": "450602000000",
      "area_id": 2298 },
    {
      "area_name": "防城区",
      "area_code": "450603000000",
      "area_id": 2299 },
    {
      "area_name": "上思县",
      "area_code": "450621000000",
      "area_id": 2300 },
    {
      "area_name": "东兴市",
      "area_code": "450681000000",
      "area_id": 2301 }],

    "city_id": 223 },
  {
    "city_name": "钦州市",
    "city_code": "450700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "450701000000",
      "area_id": 2302 },
    {
      "area_name": "钦南区",
      "area_code": "450702000000",
      "area_id": 2303 },
    {
      "area_name": "钦北区",
      "area_code": "450703000000",
      "area_id": 2304 },
    {
      "area_name": "灵山县",
      "area_code": "450721000000",
      "area_id": 2305 },
    {
      "area_name": "浦北县",
      "area_code": "450722000000",
      "area_id": 2306 }],

    "city_id": 224 },
  {
    "city_name": "贵港市",
    "city_code": "450800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "450801000000",
      "area_id": 2307 },
    {
      "area_name": "港北区",
      "area_code": "450802000000",
      "area_id": 2308 },
    {
      "area_name": "港南区",
      "area_code": "450803000000",
      "area_id": 2309 },
    {
      "area_name": "覃塘区",
      "area_code": "450804000000",
      "area_id": 2310 },
    {
      "area_name": "平南县",
      "area_code": "450821000000",
      "area_id": 2311 },
    {
      "area_name": "桂平市",
      "area_code": "450881000000",
      "area_id": 2312 }],

    "city_id": 225 },
  {
    "city_name": "玉林市",
    "city_code": "450900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "450901000000",
      "area_id": 2313 },
    {
      "area_name": "玉州区",
      "area_code": "450902000000",
      "area_id": 2314 },
    {
      "area_name": "福绵区",
      "area_code": "450903000000",
      "area_id": 2315 },
    {
      "area_name": "容县",
      "area_code": "450921000000",
      "area_id": 2316 },
    {
      "area_name": "陆川县",
      "area_code": "450922000000",
      "area_id": 2317 },
    {
      "area_name": "博白县",
      "area_code": "450923000000",
      "area_id": 2318 },
    {
      "area_name": "兴业县",
      "area_code": "450924000000",
      "area_id": 2319 },
    {
      "area_name": "北流市",
      "area_code": "450981000000",
      "area_id": 2320 }],

    "city_id": 226 },
  {
    "city_name": "百色市",
    "city_code": "451000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "451001000000",
      "area_id": 2321 },
    {
      "area_name": "右江区",
      "area_code": "451002000000",
      "area_id": 2322 },
    {
      "area_name": "田阳县",
      "area_code": "451021000000",
      "area_id": 2323 },
    {
      "area_name": "田东县",
      "area_code": "451022000000",
      "area_id": 2324 },
    {
      "area_name": "平果县",
      "area_code": "451023000000",
      "area_id": 2325 },
    {
      "area_name": "德保县",
      "area_code": "451024000000",
      "area_id": 2326 },
    {
      "area_name": "那坡县",
      "area_code": "451026000000",
      "area_id": 2327 },
    {
      "area_name": "凌云县",
      "area_code": "451027000000",
      "area_id": 2328 },
    {
      "area_name": "乐业县",
      "area_code": "451028000000",
      "area_id": 2329 },
    {
      "area_name": "田林县",
      "area_code": "451029000000",
      "area_id": 2330 },
    {
      "area_name": "西林县",
      "area_code": "451030000000",
      "area_id": 2331 },
    {
      "area_name": "隆林各族自治县",
      "area_code": "451031000000",
      "area_id": 2332 },
    {
      "area_name": "靖西市",
      "area_code": "451081000000",
      "area_id": 2333 }],

    "city_id": 227 },
  {
    "city_name": "贺州市",
    "city_code": "451100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "451101000000",
      "area_id": 2334 },
    {
      "area_name": "八步区",
      "area_code": "451102000000",
      "area_id": 2335 },
    {
      "area_name": "平桂区",
      "area_code": "451103000000",
      "area_id": 2336 },
    {
      "area_name": "昭平县",
      "area_code": "451121000000",
      "area_id": 2337 },
    {
      "area_name": "钟山县",
      "area_code": "451122000000",
      "area_id": 2338 },
    {
      "area_name": "富川瑶族自治县",
      "area_code": "451123000000",
      "area_id": 2339 }],

    "city_id": 228 },
  {
    "city_name": "河池市",
    "city_code": "451200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "451201000000",
      "area_id": 2340 },
    {
      "area_name": "金城江区",
      "area_code": "451202000000",
      "area_id": 2341 },
    {
      "area_name": "宜州区",
      "area_code": "451203000000",
      "area_id": 2342 },
    {
      "area_name": "南丹县",
      "area_code": "451221000000",
      "area_id": 2343 },
    {
      "area_name": "天峨县",
      "area_code": "451222000000",
      "area_id": 2344 },
    {
      "area_name": "凤山县",
      "area_code": "451223000000",
      "area_id": 2345 },
    {
      "area_name": "东兰县",
      "area_code": "451224000000",
      "area_id": 2346 },
    {
      "area_name": "罗城仫佬族自治县",
      "area_code": "451225000000",
      "area_id": 2347 },
    {
      "area_name": "环江毛南族自治县",
      "area_code": "451226000000",
      "area_id": 2348 },
    {
      "area_name": "巴马瑶族自治县",
      "area_code": "451227000000",
      "area_id": 2349 },
    {
      "area_name": "都安瑶族自治县",
      "area_code": "451228000000",
      "area_id": 2350 },
    {
      "area_name": "大化瑶族自治县",
      "area_code": "451229000000",
      "area_id": 2351 }],

    "city_id": 229 },
  {
    "city_name": "来宾市",
    "city_code": "451300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "451301000000",
      "area_id": 2352 },
    {
      "area_name": "兴宾区",
      "area_code": "451302000000",
      "area_id": 2353 },
    {
      "area_name": "忻城县",
      "area_code": "451321000000",
      "area_id": 2354 },
    {
      "area_name": "象州县",
      "area_code": "451322000000",
      "area_id": 2355 },
    {
      "area_name": "武宣县",
      "area_code": "451323000000",
      "area_id": 2356 },
    {
      "area_name": "金秀瑶族自治县",
      "area_code": "451324000000",
      "area_id": 2357 },
    {
      "area_name": "合山市",
      "area_code": "451381000000",
      "area_id": 2358 }],

    "city_id": 230 },
  {
    "city_name": "崇左市",
    "city_code": "451400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "451401000000",
      "area_id": 2359 },
    {
      "area_name": "江州区",
      "area_code": "451402000000",
      "area_id": 2360 },
    {
      "area_name": "扶绥县",
      "area_code": "451421000000",
      "area_id": 2361 },
    {
      "area_name": "宁明县",
      "area_code": "451422000000",
      "area_id": 2362 },
    {
      "area_name": "龙州县",
      "area_code": "451423000000",
      "area_id": 2363 },
    {
      "area_name": "大新县",
      "area_code": "451424000000",
      "area_id": 2364 },
    {
      "area_name": "天等县",
      "area_code": "451425000000",
      "area_id": 2365 },
    {
      "area_name": "凭祥市",
      "area_code": "451481000000",
      "area_id": 2366 }],

    "city_id": 231 }],

  "pro_code": "450000",
  "pro_id": 20,
  "pro_name": "广西壮族自治区" },
{
  "pro_cities": [{
    "city_name": "海口市",
    "city_code": "460100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "460101000000",
      "area_id": 2367 },
    {
      "area_name": "秀英区",
      "area_code": "460105000000",
      "area_id": 2368 },
    {
      "area_name": "龙华区",
      "area_code": "460106000000",
      "area_id": 2369 },
    {
      "area_name": "琼山区",
      "area_code": "460107000000",
      "area_id": 2370 },
    {
      "area_name": "美兰区",
      "area_code": "460108000000",
      "area_id": 2371 }],

    "city_id": 232 },
  {
    "city_name": "三亚市",
    "city_code": "460200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "460201000000",
      "area_id": 2372 },
    {
      "area_name": "海棠区",
      "area_code": "460202000000",
      "area_id": 2373 },
    {
      "area_name": "吉阳区",
      "area_code": "460203000000",
      "area_id": 2374 },
    {
      "area_name": "天涯区",
      "area_code": "460204000000",
      "area_id": 2375 },
    {
      "area_name": "崖州区",
      "area_code": "460205000000",
      "area_id": 2376 }],

    "city_id": 233 },
  {
    "city_name": "三沙市",
    "city_code": "460300000000",
    "city_areas": [{
      "area_name": "西沙群岛",
      "area_code": "460321000000",
      "area_id": 2377 },
    {
      "area_name": "南沙群岛",
      "area_code": "460322000000",
      "area_id": 2378 },
    {
      "area_name": "中沙群岛的岛礁及其海域",
      "area_code": "460323000000",
      "area_id": 2379 }],

    "city_id": 234 },
  {
    "city_name": "儋州市",
    "city_code": "460400000000",
    "city_areas": [{
      "area_name": "那大镇",
      "area_code": "460400100000",
      "area_id": 2380 },
    {
      "area_name": "和庆镇",
      "area_code": "460400101000",
      "area_id": 2381 },
    {
      "area_name": "南丰镇",
      "area_code": "460400102000",
      "area_id": 2382 },
    {
      "area_name": "大成镇",
      "area_code": "460400103000",
      "area_id": 2383 },
    {
      "area_name": "雅星镇",
      "area_code": "460400104000",
      "area_id": 2384 },
    {
      "area_name": "兰洋镇",
      "area_code": "460400105000",
      "area_id": 2385 },
    {
      "area_name": "光村镇",
      "area_code": "460400106000",
      "area_id": 2386 },
    {
      "area_name": "木棠镇",
      "area_code": "460400107000",
      "area_id": 2387 },
    {
      "area_name": "海头镇",
      "area_code": "460400108000",
      "area_id": 2388 },
    {
      "area_name": "峨蔓镇",
      "area_code": "460400109000",
      "area_id": 2389 },
    {
      "area_name": "王五镇",
      "area_code": "460400111000",
      "area_id": 2390 },
    {
      "area_name": "白马井镇",
      "area_code": "460400112000",
      "area_id": 2391 },
    {
      "area_name": "中和镇",
      "area_code": "460400113000",
      "area_id": 2392 },
    {
      "area_name": "排浦镇",
      "area_code": "460400114000",
      "area_id": 2393 },
    {
      "area_name": "东成镇",
      "area_code": "460400115000",
      "area_id": 2394 },
    {
      "area_name": "新州镇",
      "area_code": "460400116000",
      "area_id": 2395 },
    {
      "area_name": "洋浦经济开发区",
      "area_code": "460400499000",
      "area_id": 2396 },
    {
      "area_name": "华南热作学院",
      "area_code": "460400500000",
      "area_id": 2397 }],

    "city_id": 235 },
  {
    "city_name": "省直辖县级行政区划",
    "city_code": "469000000000",
    "city_areas": [{
      "area_name": "五指山市",
      "area_code": "469001000000",
      "area_id": 2398 },
    {
      "area_name": "琼海市",
      "area_code": "469002000000",
      "area_id": 2399 },
    {
      "area_name": "文昌市",
      "area_code": "469005000000",
      "area_id": 2400 },
    {
      "area_name": "万宁市",
      "area_code": "469006000000",
      "area_id": 2401 },
    {
      "area_name": "东方市",
      "area_code": "469007000000",
      "area_id": 2402 },
    {
      "area_name": "定安县",
      "area_code": "469021000000",
      "area_id": 2403 },
    {
      "area_name": "屯昌县",
      "area_code": "469022000000",
      "area_id": 2404 },
    {
      "area_name": "澄迈县",
      "area_code": "469023000000",
      "area_id": 2405 },
    {
      "area_name": "临高县",
      "area_code": "469024000000",
      "area_id": 2406 },
    {
      "area_name": "白沙黎族自治县",
      "area_code": "469025000000",
      "area_id": 2407 },
    {
      "area_name": "昌江黎族自治县",
      "area_code": "469026000000",
      "area_id": 2408 },
    {
      "area_name": "乐东黎族自治县",
      "area_code": "469027000000",
      "area_id": 2409 },
    {
      "area_name": "陵水黎族自治县",
      "area_code": "469028000000",
      "area_id": 2410 },
    {
      "area_name": "保亭黎族苗族自治县",
      "area_code": "469029000000",
      "area_id": 2411 },
    {
      "area_name": "琼中黎族苗族自治县",
      "area_code": "469030000000",
      "area_id": 2412 }],

    "city_id": 236 }],

  "pro_code": "460000",
  "pro_id": 21,
  "pro_name": "海南省" },
{
  "pro_cities": [{
    "city_name": "市辖区",
    "city_code": "500100000000",
    "city_areas": [{
      "area_name": "万州区",
      "area_code": "500101000000",
      "area_id": 2413 },
    {
      "area_name": "涪陵区",
      "area_code": "500102000000",
      "area_id": 2414 },
    {
      "area_name": "渝中区",
      "area_code": "500103000000",
      "area_id": 2415 },
    {
      "area_name": "大渡口区",
      "area_code": "500104000000",
      "area_id": 2416 },
    {
      "area_name": "江北区",
      "area_code": "500105000000",
      "area_id": 2417 },
    {
      "area_name": "沙坪坝区",
      "area_code": "500106000000",
      "area_id": 2418 },
    {
      "area_name": "九龙坡区",
      "area_code": "500107000000",
      "area_id": 2419 },
    {
      "area_name": "南岸区",
      "area_code": "500108000000",
      "area_id": 2420 },
    {
      "area_name": "北碚区",
      "area_code": "500109000000",
      "area_id": 2421 },
    {
      "area_name": "綦江区",
      "area_code": "500110000000",
      "area_id": 2422 },
    {
      "area_name": "大足区",
      "area_code": "500111000000",
      "area_id": 2423 },
    {
      "area_name": "渝北区",
      "area_code": "500112000000",
      "area_id": 2424 },
    {
      "area_name": "巴南区",
      "area_code": "500113000000",
      "area_id": 2425 },
    {
      "area_name": "黔江区",
      "area_code": "500114000000",
      "area_id": 2426 },
    {
      "area_name": "长寿区",
      "area_code": "500115000000",
      "area_id": 2427 },
    {
      "area_name": "江津区",
      "area_code": "500116000000",
      "area_id": 2428 },
    {
      "area_name": "合川区",
      "area_code": "500117000000",
      "area_id": 2429 },
    {
      "area_name": "永川区",
      "area_code": "500118000000",
      "area_id": 2430 },
    {
      "area_name": "南川区",
      "area_code": "500119000000",
      "area_id": 2431 },
    {
      "area_name": "璧山区",
      "area_code": "500120000000",
      "area_id": 2432 },
    {
      "area_name": "铜梁区",
      "area_code": "500151000000",
      "area_id": 2433 },
    {
      "area_name": "潼南区",
      "area_code": "500152000000",
      "area_id": 2434 },
    {
      "area_name": "荣昌区",
      "area_code": "500153000000",
      "area_id": 2435 },
    {
      "area_name": "开州区",
      "area_code": "500154000000",
      "area_id": 2436 },
    {
      "area_name": "梁平区",
      "area_code": "500155000000",
      "area_id": 2437 },
    {
      "area_name": "武隆区",
      "area_code": "500156000000",
      "area_id": 2438 }],

    "city_id": 237 },
  {
    "city_name": "县",
    "city_code": "500200000000",
    "city_areas": [{
      "area_name": "城口县",
      "area_code": "500229000000",
      "area_id": 2439 },
    {
      "area_name": "丰都县",
      "area_code": "500230000000",
      "area_id": 2440 },
    {
      "area_name": "垫江县",
      "area_code": "500231000000",
      "area_id": 2441 },
    {
      "area_name": "忠县",
      "area_code": "500233000000",
      "area_id": 2442 },
    {
      "area_name": "云阳县",
      "area_code": "500235000000",
      "area_id": 2443 },
    {
      "area_name": "奉节县",
      "area_code": "500236000000",
      "area_id": 2444 },
    {
      "area_name": "巫山县",
      "area_code": "500237000000",
      "area_id": 2445 },
    {
      "area_name": "巫溪县",
      "area_code": "500238000000",
      "area_id": 2446 },
    {
      "area_name": "石柱土家族自治县",
      "area_code": "500240000000",
      "area_id": 2447 },
    {
      "area_name": "秀山土家族苗族自治县",
      "area_code": "500241000000",
      "area_id": 2448 },
    {
      "area_name": "酉阳土家族苗族自治县",
      "area_code": "500242000000",
      "area_id": 2449 },
    {
      "area_name": "彭水苗族土家族自治县",
      "area_code": "500243000000",
      "area_id": 2450 }],

    "city_id": 238 }],

  "pro_code": "500000",
  "pro_id": 22,
  "pro_name": "重庆市" },
{
  "pro_cities": [{
    "city_name": "成都市",
    "city_code": "510100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "510101000000",
      "area_id": 2451 },
    {
      "area_name": "锦江区",
      "area_code": "510104000000",
      "area_id": 2452 },
    {
      "area_name": "青羊区",
      "area_code": "510105000000",
      "area_id": 2453 },
    {
      "area_name": "金牛区",
      "area_code": "510106000000",
      "area_id": 2454 },
    {
      "area_name": "武侯区",
      "area_code": "510107000000",
      "area_id": 2455 },
    {
      "area_name": "成华区",
      "area_code": "510108000000",
      "area_id": 2456 },
    {
      "area_name": "龙泉驿区",
      "area_code": "510112000000",
      "area_id": 2457 },
    {
      "area_name": "青白江区",
      "area_code": "510113000000",
      "area_id": 2458 },
    {
      "area_name": "新都区",
      "area_code": "510114000000",
      "area_id": 2459 },
    {
      "area_name": "温江区",
      "area_code": "510115000000",
      "area_id": 2460 },
    {
      "area_name": "双流区",
      "area_code": "510116000000",
      "area_id": 2461 },
    {
      "area_name": "郫都区",
      "area_code": "510117000000",
      "area_id": 2462 },
    {
      "area_name": "金堂县",
      "area_code": "510121000000",
      "area_id": 2463 },
    {
      "area_name": "大邑县",
      "area_code": "510129000000",
      "area_id": 2464 },
    {
      "area_name": "蒲江县",
      "area_code": "510131000000",
      "area_id": 2465 },
    {
      "area_name": "新津县",
      "area_code": "510132000000",
      "area_id": 2466 },
    {
      "area_name": "都江堰市",
      "area_code": "510181000000",
      "area_id": 2467 },
    {
      "area_name": "彭州市",
      "area_code": "510182000000",
      "area_id": 2468 },
    {
      "area_name": "邛崃市",
      "area_code": "510183000000",
      "area_id": 2469 },
    {
      "area_name": "崇州市",
      "area_code": "510184000000",
      "area_id": 2470 },
    {
      "area_name": "简阳市",
      "area_code": "510185000000",
      "area_id": 2471 }],

    "city_id": 239 },
  {
    "city_name": "自贡市",
    "city_code": "510300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "510301000000",
      "area_id": 2472 },
    {
      "area_name": "自流井区",
      "area_code": "510302000000",
      "area_id": 2473 },
    {
      "area_name": "贡井区",
      "area_code": "510303000000",
      "area_id": 2474 },
    {
      "area_name": "大安区",
      "area_code": "510304000000",
      "area_id": 2475 },
    {
      "area_name": "沿滩区",
      "area_code": "510311000000",
      "area_id": 2476 },
    {
      "area_name": "荣县",
      "area_code": "510321000000",
      "area_id": 2477 },
    {
      "area_name": "富顺县",
      "area_code": "510322000000",
      "area_id": 2478 }],

    "city_id": 240 },
  {
    "city_name": "攀枝花市",
    "city_code": "510400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "510401000000",
      "area_id": 2479 },
    {
      "area_name": "东区",
      "area_code": "510402000000",
      "area_id": 2480 },
    {
      "area_name": "西区",
      "area_code": "510403000000",
      "area_id": 2481 },
    {
      "area_name": "仁和区",
      "area_code": "510411000000",
      "area_id": 2482 },
    {
      "area_name": "米易县",
      "area_code": "510421000000",
      "area_id": 2483 },
    {
      "area_name": "盐边县",
      "area_code": "510422000000",
      "area_id": 2484 }],

    "city_id": 241 },
  {
    "city_name": "泸州市",
    "city_code": "510500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "510501000000",
      "area_id": 2485 },
    {
      "area_name": "江阳区",
      "area_code": "510502000000",
      "area_id": 2486 },
    {
      "area_name": "纳溪区",
      "area_code": "510503000000",
      "area_id": 2487 },
    {
      "area_name": "龙马潭区",
      "area_code": "510504000000",
      "area_id": 2488 },
    {
      "area_name": "泸县",
      "area_code": "510521000000",
      "area_id": 2489 },
    {
      "area_name": "合江县",
      "area_code": "510522000000",
      "area_id": 2490 },
    {
      "area_name": "叙永县",
      "area_code": "510524000000",
      "area_id": 2491 },
    {
      "area_name": "古蔺县",
      "area_code": "510525000000",
      "area_id": 2492 }],

    "city_id": 242 },
  {
    "city_name": "德阳市",
    "city_code": "510600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "510601000000",
      "area_id": 2493 },
    {
      "area_name": "旌阳区",
      "area_code": "510603000000",
      "area_id": 2494 },
    {
      "area_name": "罗江区",
      "area_code": "510604000000",
      "area_id": 2495 },
    {
      "area_name": "中江县",
      "area_code": "510623000000",
      "area_id": 2496 },
    {
      "area_name": "广汉市",
      "area_code": "510681000000",
      "area_id": 2497 },
    {
      "area_name": "什邡市",
      "area_code": "510682000000",
      "area_id": 2498 },
    {
      "area_name": "绵竹市",
      "area_code": "510683000000",
      "area_id": 2499 }],

    "city_id": 243 },
  {
    "city_name": "绵阳市",
    "city_code": "510700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "510701000000",
      "area_id": 2500 },
    {
      "area_name": "涪城区",
      "area_code": "510703000000",
      "area_id": 2501 },
    {
      "area_name": "游仙区",
      "area_code": "510704000000",
      "area_id": 2502 },
    {
      "area_name": "安州区",
      "area_code": "510705000000",
      "area_id": 2503 },
    {
      "area_name": "三台县",
      "area_code": "510722000000",
      "area_id": 2504 },
    {
      "area_name": "盐亭县",
      "area_code": "510723000000",
      "area_id": 2505 },
    {
      "area_name": "梓潼县",
      "area_code": "510725000000",
      "area_id": 2506 },
    {
      "area_name": "北川羌族自治县",
      "area_code": "510726000000",
      "area_id": 2507 },
    {
      "area_name": "平武县",
      "area_code": "510727000000",
      "area_id": 2508 },
    {
      "area_name": "江油市",
      "area_code": "510781000000",
      "area_id": 2509 }],

    "city_id": 244 },
  {
    "city_name": "广元市",
    "city_code": "510800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "510801000000",
      "area_id": 2510 },
    {
      "area_name": "利州区",
      "area_code": "510802000000",
      "area_id": 2511 },
    {
      "area_name": "昭化区",
      "area_code": "510811000000",
      "area_id": 2512 },
    {
      "area_name": "朝天区",
      "area_code": "510812000000",
      "area_id": 2513 },
    {
      "area_name": "旺苍县",
      "area_code": "510821000000",
      "area_id": 2514 },
    {
      "area_name": "青川县",
      "area_code": "510822000000",
      "area_id": 2515 },
    {
      "area_name": "剑阁县",
      "area_code": "510823000000",
      "area_id": 2516 },
    {
      "area_name": "苍溪县",
      "area_code": "510824000000",
      "area_id": 2517 }],

    "city_id": 245 },
  {
    "city_name": "遂宁市",
    "city_code": "510900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "510901000000",
      "area_id": 2518 },
    {
      "area_name": "船山区",
      "area_code": "510903000000",
      "area_id": 2519 },
    {
      "area_name": "安居区",
      "area_code": "510904000000",
      "area_id": 2520 },
    {
      "area_name": "蓬溪县",
      "area_code": "510921000000",
      "area_id": 2521 },
    {
      "area_name": "射洪县",
      "area_code": "510922000000",
      "area_id": 2522 },
    {
      "area_name": "大英县",
      "area_code": "510923000000",
      "area_id": 2523 }],

    "city_id": 246 },
  {
    "city_name": "内江市",
    "city_code": "511000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "511001000000",
      "area_id": 2524 },
    {
      "area_name": "市中区",
      "area_code": "511002000000",
      "area_id": 2525 },
    {
      "area_name": "东兴区",
      "area_code": "511011000000",
      "area_id": 2526 },
    {
      "area_name": "威远县",
      "area_code": "511024000000",
      "area_id": 2527 },
    {
      "area_name": "资中县",
      "area_code": "511025000000",
      "area_id": 2528 },
    {
      "area_name": "内江经济开发区",
      "area_code": "511071000000",
      "area_id": 2529 },
    {
      "area_name": "隆昌市",
      "area_code": "511083000000",
      "area_id": 2530 }],

    "city_id": 247 },
  {
    "city_name": "乐山市",
    "city_code": "511100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "511101000000",
      "area_id": 2531 },
    {
      "area_name": "市中区",
      "area_code": "511102000000",
      "area_id": 2532 },
    {
      "area_name": "沙湾区",
      "area_code": "511111000000",
      "area_id": 2533 },
    {
      "area_name": "五通桥区",
      "area_code": "511112000000",
      "area_id": 2534 },
    {
      "area_name": "金口河区",
      "area_code": "511113000000",
      "area_id": 2535 },
    {
      "area_name": "犍为县",
      "area_code": "511123000000",
      "area_id": 2536 },
    {
      "area_name": "井研县",
      "area_code": "511124000000",
      "area_id": 2537 },
    {
      "area_name": "夹江县",
      "area_code": "511126000000",
      "area_id": 2538 },
    {
      "area_name": "沐川县",
      "area_code": "511129000000",
      "area_id": 2539 },
    {
      "area_name": "峨边彝族自治县",
      "area_code": "511132000000",
      "area_id": 2540 },
    {
      "area_name": "马边彝族自治县",
      "area_code": "511133000000",
      "area_id": 2541 },
    {
      "area_name": "峨眉山市",
      "area_code": "511181000000",
      "area_id": 2542 }],

    "city_id": 248 },
  {
    "city_name": "南充市",
    "city_code": "511300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "511301000000",
      "area_id": 2543 },
    {
      "area_name": "顺庆区",
      "area_code": "511302000000",
      "area_id": 2544 },
    {
      "area_name": "高坪区",
      "area_code": "511303000000",
      "area_id": 2545 },
    {
      "area_name": "嘉陵区",
      "area_code": "511304000000",
      "area_id": 2546 },
    {
      "area_name": "南部县",
      "area_code": "511321000000",
      "area_id": 2547 },
    {
      "area_name": "营山县",
      "area_code": "511322000000",
      "area_id": 2548 },
    {
      "area_name": "蓬安县",
      "area_code": "511323000000",
      "area_id": 2549 },
    {
      "area_name": "仪陇县",
      "area_code": "511324000000",
      "area_id": 2550 },
    {
      "area_name": "西充县",
      "area_code": "511325000000",
      "area_id": 2551 },
    {
      "area_name": "阆中市",
      "area_code": "511381000000",
      "area_id": 2552 }],

    "city_id": 249 },
  {
    "city_name": "眉山市",
    "city_code": "511400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "511401000000",
      "area_id": 2553 },
    {
      "area_name": "东坡区",
      "area_code": "511402000000",
      "area_id": 2554 },
    {
      "area_name": "彭山区",
      "area_code": "511403000000",
      "area_id": 2555 },
    {
      "area_name": "仁寿县",
      "area_code": "511421000000",
      "area_id": 2556 },
    {
      "area_name": "洪雅县",
      "area_code": "511423000000",
      "area_id": 2557 },
    {
      "area_name": "丹棱县",
      "area_code": "511424000000",
      "area_id": 2558 },
    {
      "area_name": "青神县",
      "area_code": "511425000000",
      "area_id": 2559 }],

    "city_id": 250 },
  {
    "city_name": "宜宾市",
    "city_code": "511500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "511501000000",
      "area_id": 2560 },
    {
      "area_name": "翠屏区",
      "area_code": "511502000000",
      "area_id": 2561 },
    {
      "area_name": "南溪区",
      "area_code": "511503000000",
      "area_id": 2562 },
    {
      "area_name": "叙州区",
      "area_code": "511504000000",
      "area_id": 2563 },
    {
      "area_name": "江安县",
      "area_code": "511523000000",
      "area_id": 2564 },
    {
      "area_name": "长宁县",
      "area_code": "511524000000",
      "area_id": 2565 },
    {
      "area_name": "高县",
      "area_code": "511525000000",
      "area_id": 2566 },
    {
      "area_name": "珙县",
      "area_code": "511526000000",
      "area_id": 2567 },
    {
      "area_name": "筠连县",
      "area_code": "511527000000",
      "area_id": 2568 },
    {
      "area_name": "兴文县",
      "area_code": "511528000000",
      "area_id": 2569 },
    {
      "area_name": "屏山县",
      "area_code": "511529000000",
      "area_id": 2570 }],

    "city_id": 251 },
  {
    "city_name": "广安市",
    "city_code": "511600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "511601000000",
      "area_id": 2571 },
    {
      "area_name": "广安区",
      "area_code": "511602000000",
      "area_id": 2572 },
    {
      "area_name": "前锋区",
      "area_code": "511603000000",
      "area_id": 2573 },
    {
      "area_name": "岳池县",
      "area_code": "511621000000",
      "area_id": 2574 },
    {
      "area_name": "武胜县",
      "area_code": "511622000000",
      "area_id": 2575 },
    {
      "area_name": "邻水县",
      "area_code": "511623000000",
      "area_id": 2576 },
    {
      "area_name": "华蓥市",
      "area_code": "511681000000",
      "area_id": 2577 }],

    "city_id": 252 },
  {
    "city_name": "达州市",
    "city_code": "511700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "511701000000",
      "area_id": 2578 },
    {
      "area_name": "通川区",
      "area_code": "511702000000",
      "area_id": 2579 },
    {
      "area_name": "达川区",
      "area_code": "511703000000",
      "area_id": 2580 },
    {
      "area_name": "宣汉县",
      "area_code": "511722000000",
      "area_id": 2581 },
    {
      "area_name": "开江县",
      "area_code": "511723000000",
      "area_id": 2582 },
    {
      "area_name": "大竹县",
      "area_code": "511724000000",
      "area_id": 2583 },
    {
      "area_name": "渠县",
      "area_code": "511725000000",
      "area_id": 2584 },
    {
      "area_name": "达州经济开发区",
      "area_code": "511771000000",
      "area_id": 2585 },
    {
      "area_name": "万源市",
      "area_code": "511781000000",
      "area_id": 2586 }],

    "city_id": 253 },
  {
    "city_name": "雅安市",
    "city_code": "511800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "511801000000",
      "area_id": 2587 },
    {
      "area_name": "雨城区",
      "area_code": "511802000000",
      "area_id": 2588 },
    {
      "area_name": "名山区",
      "area_code": "511803000000",
      "area_id": 2589 },
    {
      "area_name": "荥经县",
      "area_code": "511822000000",
      "area_id": 2590 },
    {
      "area_name": "汉源县",
      "area_code": "511823000000",
      "area_id": 2591 },
    {
      "area_name": "石棉县",
      "area_code": "511824000000",
      "area_id": 2592 },
    {
      "area_name": "天全县",
      "area_code": "511825000000",
      "area_id": 2593 },
    {
      "area_name": "芦山县",
      "area_code": "511826000000",
      "area_id": 2594 },
    {
      "area_name": "宝兴县",
      "area_code": "511827000000",
      "area_id": 2595 }],

    "city_id": 254 },
  {
    "city_name": "巴中市",
    "city_code": "511900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "511901000000",
      "area_id": 2596 },
    {
      "area_name": "巴州区",
      "area_code": "511902000000",
      "area_id": 2597 },
    {
      "area_name": "恩阳区",
      "area_code": "511903000000",
      "area_id": 2598 },
    {
      "area_name": "通江县",
      "area_code": "511921000000",
      "area_id": 2599 },
    {
      "area_name": "南江县",
      "area_code": "511922000000",
      "area_id": 2600 },
    {
      "area_name": "平昌县",
      "area_code": "511923000000",
      "area_id": 2601 },
    {
      "area_name": "巴中经济开发区",
      "area_code": "511971000000",
      "area_id": 2602 }],

    "city_id": 255 },
  {
    "city_name": "资阳市",
    "city_code": "512000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "512001000000",
      "area_id": 2603 },
    {
      "area_name": "雁江区",
      "area_code": "512002000000",
      "area_id": 2604 },
    {
      "area_name": "安岳县",
      "area_code": "512021000000",
      "area_id": 2605 },
    {
      "area_name": "乐至县",
      "area_code": "512022000000",
      "area_id": 2606 }],

    "city_id": 256 },
  {
    "city_name": "阿坝藏族羌族自治州",
    "city_code": "513200000000",
    "city_areas": [{
      "area_name": "马尔康市",
      "area_code": "513201000000",
      "area_id": 2607 },
    {
      "area_name": "汶川县",
      "area_code": "513221000000",
      "area_id": 2608 },
    {
      "area_name": "理县",
      "area_code": "513222000000",
      "area_id": 2609 },
    {
      "area_name": "茂县",
      "area_code": "513223000000",
      "area_id": 2610 },
    {
      "area_name": "松潘县",
      "area_code": "513224000000",
      "area_id": 2611 },
    {
      "area_name": "九寨沟县",
      "area_code": "513225000000",
      "area_id": 2612 },
    {
      "area_name": "金川县",
      "area_code": "513226000000",
      "area_id": 2613 },
    {
      "area_name": "小金县",
      "area_code": "513227000000",
      "area_id": 2614 },
    {
      "area_name": "黑水县",
      "area_code": "513228000000",
      "area_id": 2615 },
    {
      "area_name": "壤塘县",
      "area_code": "513230000000",
      "area_id": 2616 },
    {
      "area_name": "阿坝县",
      "area_code": "513231000000",
      "area_id": 2617 },
    {
      "area_name": "若尔盖县",
      "area_code": "513232000000",
      "area_id": 2618 },
    {
      "area_name": "红原县",
      "area_code": "513233000000",
      "area_id": 2619 }],

    "city_id": 257 },
  {
    "city_name": "甘孜藏族自治州",
    "city_code": "513300000000",
    "city_areas": [{
      "area_name": "康定市",
      "area_code": "513301000000",
      "area_id": 2620 },
    {
      "area_name": "泸定县",
      "area_code": "513322000000",
      "area_id": 2621 },
    {
      "area_name": "丹巴县",
      "area_code": "513323000000",
      "area_id": 2622 },
    {
      "area_name": "九龙县",
      "area_code": "513324000000",
      "area_id": 2623 },
    {
      "area_name": "雅江县",
      "area_code": "513325000000",
      "area_id": 2624 },
    {
      "area_name": "道孚县",
      "area_code": "513326000000",
      "area_id": 2625 },
    {
      "area_name": "炉霍县",
      "area_code": "513327000000",
      "area_id": 2626 },
    {
      "area_name": "甘孜县",
      "area_code": "513328000000",
      "area_id": 2627 },
    {
      "area_name": "新龙县",
      "area_code": "513329000000",
      "area_id": 2628 },
    {
      "area_name": "德格县",
      "area_code": "513330000000",
      "area_id": 2629 },
    {
      "area_name": "白玉县",
      "area_code": "513331000000",
      "area_id": 2630 },
    {
      "area_name": "石渠县",
      "area_code": "513332000000",
      "area_id": 2631 },
    {
      "area_name": "色达县",
      "area_code": "513333000000",
      "area_id": 2632 },
    {
      "area_name": "理塘县",
      "area_code": "513334000000",
      "area_id": 2633 },
    {
      "area_name": "巴塘县",
      "area_code": "513335000000",
      "area_id": 2634 },
    {
      "area_name": "乡城县",
      "area_code": "513336000000",
      "area_id": 2635 },
    {
      "area_name": "稻城县",
      "area_code": "513337000000",
      "area_id": 2636 },
    {
      "area_name": "得荣县",
      "area_code": "513338000000",
      "area_id": 2637 }],

    "city_id": 258 },
  {
    "city_name": "凉山彝族自治州",
    "city_code": "513400000000",
    "city_areas": [{
      "area_name": "西昌市",
      "area_code": "513401000000",
      "area_id": 2638 },
    {
      "area_name": "木里藏族自治县",
      "area_code": "513422000000",
      "area_id": 2639 },
    {
      "area_name": "盐源县",
      "area_code": "513423000000",
      "area_id": 2640 },
    {
      "area_name": "德昌县",
      "area_code": "513424000000",
      "area_id": 2641 },
    {
      "area_name": "会理县",
      "area_code": "513425000000",
      "area_id": 2642 },
    {
      "area_name": "会东县",
      "area_code": "513426000000",
      "area_id": 2643 },
    {
      "area_name": "宁南县",
      "area_code": "513427000000",
      "area_id": 2644 },
    {
      "area_name": "普格县",
      "area_code": "513428000000",
      "area_id": 2645 },
    {
      "area_name": "布拖县",
      "area_code": "513429000000",
      "area_id": 2646 },
    {
      "area_name": "金阳县",
      "area_code": "513430000000",
      "area_id": 2647 },
    {
      "area_name": "昭觉县",
      "area_code": "513431000000",
      "area_id": 2648 },
    {
      "area_name": "喜德县",
      "area_code": "513432000000",
      "area_id": 2649 },
    {
      "area_name": "冕宁县",
      "area_code": "513433000000",
      "area_id": 2650 },
    {
      "area_name": "越西县",
      "area_code": "513434000000",
      "area_id": 2651 },
    {
      "area_name": "甘洛县",
      "area_code": "513435000000",
      "area_id": 2652 },
    {
      "area_name": "美姑县",
      "area_code": "513436000000",
      "area_id": 2653 },
    {
      "area_name": "雷波县",
      "area_code": "513437000000",
      "area_id": 2654 }],

    "city_id": 259 }],

  "pro_code": "510000",
  "pro_id": 23,
  "pro_name": "四川省" },
{
  "pro_cities": [{
    "city_name": "贵阳市",
    "city_code": "520100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "520101000000",
      "area_id": 2655 },
    {
      "area_name": "南明区",
      "area_code": "520102000000",
      "area_id": 2656 },
    {
      "area_name": "云岩区",
      "area_code": "520103000000",
      "area_id": 2657 },
    {
      "area_name": "花溪区",
      "area_code": "520111000000",
      "area_id": 2658 },
    {
      "area_name": "乌当区",
      "area_code": "520112000000",
      "area_id": 2659 },
    {
      "area_name": "白云区",
      "area_code": "520113000000",
      "area_id": 2660 },
    {
      "area_name": "观山湖区",
      "area_code": "520115000000",
      "area_id": 2661 },
    {
      "area_name": "开阳县",
      "area_code": "520121000000",
      "area_id": 2662 },
    {
      "area_name": "息烽县",
      "area_code": "520122000000",
      "area_id": 2663 },
    {
      "area_name": "修文县",
      "area_code": "520123000000",
      "area_id": 2664 },
    {
      "area_name": "清镇市",
      "area_code": "520181000000",
      "area_id": 2665 }],

    "city_id": 260 },
  {
    "city_name": "六盘水市",
    "city_code": "520200000000",
    "city_areas": [{
      "area_name": "钟山区",
      "area_code": "520201000000",
      "area_id": 2666 },
    {
      "area_name": "六枝特区",
      "area_code": "520203000000",
      "area_id": 2667 },
    {
      "area_name": "水城县",
      "area_code": "520221000000",
      "area_id": 2668 },
    {
      "area_name": "盘州市",
      "area_code": "520281000000",
      "area_id": 2669 }],

    "city_id": 261 },
  {
    "city_name": "遵义市",
    "city_code": "520300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "520301000000",
      "area_id": 2670 },
    {
      "area_name": "红花岗区",
      "area_code": "520302000000",
      "area_id": 2671 },
    {
      "area_name": "汇川区",
      "area_code": "520303000000",
      "area_id": 2672 },
    {
      "area_name": "播州区",
      "area_code": "520304000000",
      "area_id": 2673 },
    {
      "area_name": "桐梓县",
      "area_code": "520322000000",
      "area_id": 2674 },
    {
      "area_name": "绥阳县",
      "area_code": "520323000000",
      "area_id": 2675 },
    {
      "area_name": "正安县",
      "area_code": "520324000000",
      "area_id": 2676 },
    {
      "area_name": "道真仡佬族苗族自治县",
      "area_code": "520325000000",
      "area_id": 2677 },
    {
      "area_name": "务川仡佬族苗族自治县",
      "area_code": "520326000000",
      "area_id": 2678 },
    {
      "area_name": "凤冈县",
      "area_code": "520327000000",
      "area_id": 2679 },
    {
      "area_name": "湄潭县",
      "area_code": "520328000000",
      "area_id": 2680 },
    {
      "area_name": "余庆县",
      "area_code": "520329000000",
      "area_id": 2681 },
    {
      "area_name": "习水县",
      "area_code": "520330000000",
      "area_id": 2682 },
    {
      "area_name": "赤水市",
      "area_code": "520381000000",
      "area_id": 2683 },
    {
      "area_name": "仁怀市",
      "area_code": "520382000000",
      "area_id": 2684 }],

    "city_id": 262 },
  {
    "city_name": "安顺市",
    "city_code": "520400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "520401000000",
      "area_id": 2685 },
    {
      "area_name": "西秀区",
      "area_code": "520402000000",
      "area_id": 2686 },
    {
      "area_name": "平坝区",
      "area_code": "520403000000",
      "area_id": 2687 },
    {
      "area_name": "普定县",
      "area_code": "520422000000",
      "area_id": 2688 },
    {
      "area_name": "镇宁布依族苗族自治县",
      "area_code": "520423000000",
      "area_id": 2689 },
    {
      "area_name": "关岭布依族苗族自治县",
      "area_code": "520424000000",
      "area_id": 2690 },
    {
      "area_name": "紫云苗族布依族自治县",
      "area_code": "520425000000",
      "area_id": 2691 }],

    "city_id": 263 },
  {
    "city_name": "毕节市",
    "city_code": "520500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "520501000000",
      "area_id": 2692 },
    {
      "area_name": "七星关区",
      "area_code": "520502000000",
      "area_id": 2693 },
    {
      "area_name": "大方县",
      "area_code": "520521000000",
      "area_id": 2694 },
    {
      "area_name": "黔西县",
      "area_code": "520522000000",
      "area_id": 2695 },
    {
      "area_name": "金沙县",
      "area_code": "520523000000",
      "area_id": 2696 },
    {
      "area_name": "织金县",
      "area_code": "520524000000",
      "area_id": 2697 },
    {
      "area_name": "纳雍县",
      "area_code": "520525000000",
      "area_id": 2698 },
    {
      "area_name": "威宁彝族回族苗族自治县",
      "area_code": "520526000000",
      "area_id": 2699 },
    {
      "area_name": "赫章县",
      "area_code": "520527000000",
      "area_id": 2700 }],

    "city_id": 264 },
  {
    "city_name": "铜仁市",
    "city_code": "520600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "520601000000",
      "area_id": 2701 },
    {
      "area_name": "碧江区",
      "area_code": "520602000000",
      "area_id": 2702 },
    {
      "area_name": "万山区",
      "area_code": "520603000000",
      "area_id": 2703 },
    {
      "area_name": "江口县",
      "area_code": "520621000000",
      "area_id": 2704 },
    {
      "area_name": "玉屏侗族自治县",
      "area_code": "520622000000",
      "area_id": 2705 },
    {
      "area_name": "石阡县",
      "area_code": "520623000000",
      "area_id": 2706 },
    {
      "area_name": "思南县",
      "area_code": "520624000000",
      "area_id": 2707 },
    {
      "area_name": "印江土家族苗族自治县",
      "area_code": "520625000000",
      "area_id": 2708 },
    {
      "area_name": "德江县",
      "area_code": "520626000000",
      "area_id": 2709 },
    {
      "area_name": "沿河土家族自治县",
      "area_code": "520627000000",
      "area_id": 2710 },
    {
      "area_name": "松桃苗族自治县",
      "area_code": "520628000000",
      "area_id": 2711 }],

    "city_id": 265 },
  {
    "city_name": "黔西南布依族苗族自治州",
    "city_code": "522300000000",
    "city_areas": [{
      "area_name": "兴义市",
      "area_code": "522301000000",
      "area_id": 2712 },
    {
      "area_name": "兴仁市",
      "area_code": "522302000000",
      "area_id": 2713 },
    {
      "area_name": "普安县",
      "area_code": "522323000000",
      "area_id": 2714 },
    {
      "area_name": "晴隆县",
      "area_code": "522324000000",
      "area_id": 2715 },
    {
      "area_name": "贞丰县",
      "area_code": "522325000000",
      "area_id": 2716 },
    {
      "area_name": "望谟县",
      "area_code": "522326000000",
      "area_id": 2717 },
    {
      "area_name": "册亨县",
      "area_code": "522327000000",
      "area_id": 2718 },
    {
      "area_name": "安龙县",
      "area_code": "522328000000",
      "area_id": 2719 }],

    "city_id": 266 },
  {
    "city_name": "黔东南苗族侗族自治州",
    "city_code": "522600000000",
    "city_areas": [{
      "area_name": "凯里市",
      "area_code": "522601000000",
      "area_id": 2720 },
    {
      "area_name": "黄平县",
      "area_code": "522622000000",
      "area_id": 2721 },
    {
      "area_name": "施秉县",
      "area_code": "522623000000",
      "area_id": 2722 },
    {
      "area_name": "三穗县",
      "area_code": "522624000000",
      "area_id": 2723 },
    {
      "area_name": "镇远县",
      "area_code": "522625000000",
      "area_id": 2724 },
    {
      "area_name": "岑巩县",
      "area_code": "522626000000",
      "area_id": 2725 },
    {
      "area_name": "天柱县",
      "area_code": "522627000000",
      "area_id": 2726 },
    {
      "area_name": "锦屏县",
      "area_code": "522628000000",
      "area_id": 2727 },
    {
      "area_name": "剑河县",
      "area_code": "522629000000",
      "area_id": 2728 },
    {
      "area_name": "台江县",
      "area_code": "522630000000",
      "area_id": 2729 },
    {
      "area_name": "黎平县",
      "area_code": "522631000000",
      "area_id": 2730 },
    {
      "area_name": "榕江县",
      "area_code": "522632000000",
      "area_id": 2731 },
    {
      "area_name": "从江县",
      "area_code": "522633000000",
      "area_id": 2732 },
    {
      "area_name": "雷山县",
      "area_code": "522634000000",
      "area_id": 2733 },
    {
      "area_name": "麻江县",
      "area_code": "522635000000",
      "area_id": 2734 },
    {
      "area_name": "丹寨县",
      "area_code": "522636000000",
      "area_id": 2735 }],

    "city_id": 267 },
  {
    "city_name": "黔南布依族苗族自治州",
    "city_code": "522700000000",
    "city_areas": [{
      "area_name": "都匀市",
      "area_code": "522701000000",
      "area_id": 2736 },
    {
      "area_name": "福泉市",
      "area_code": "522702000000",
      "area_id": 2737 },
    {
      "area_name": "荔波县",
      "area_code": "522722000000",
      "area_id": 2738 },
    {
      "area_name": "贵定县",
      "area_code": "522723000000",
      "area_id": 2739 },
    {
      "area_name": "瓮安县",
      "area_code": "522725000000",
      "area_id": 2740 },
    {
      "area_name": "独山县",
      "area_code": "522726000000",
      "area_id": 2741 },
    {
      "area_name": "平塘县",
      "area_code": "522727000000",
      "area_id": 2742 },
    {
      "area_name": "罗甸县",
      "area_code": "522728000000",
      "area_id": 2743 },
    {
      "area_name": "长顺县",
      "area_code": "522729000000",
      "area_id": 2744 },
    {
      "area_name": "龙里县",
      "area_code": "522730000000",
      "area_id": 2745 },
    {
      "area_name": "惠水县",
      "area_code": "522731000000",
      "area_id": 2746 },
    {
      "area_name": "三都水族自治县",
      "area_code": "522732000000",
      "area_id": 2747 }],

    "city_id": 268 }],

  "pro_code": "520000",
  "pro_id": 24,
  "pro_name": "贵州省" },
{
  "pro_cities": [{
    "city_name": "昆明市",
    "city_code": "530100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "530101000000",
      "area_id": 2748 },
    {
      "area_name": "五华区",
      "area_code": "530102000000",
      "area_id": 2749 },
    {
      "area_name": "盘龙区",
      "area_code": "530103000000",
      "area_id": 2750 },
    {
      "area_name": "官渡区",
      "area_code": "530111000000",
      "area_id": 2751 },
    {
      "area_name": "西山区",
      "area_code": "530112000000",
      "area_id": 2752 },
    {
      "area_name": "东川区",
      "area_code": "530113000000",
      "area_id": 2753 },
    {
      "area_name": "呈贡区",
      "area_code": "530114000000",
      "area_id": 2754 },
    {
      "area_name": "晋宁区",
      "area_code": "530115000000",
      "area_id": 2755 },
    {
      "area_name": "富民县",
      "area_code": "530124000000",
      "area_id": 2756 },
    {
      "area_name": "宜良县",
      "area_code": "530125000000",
      "area_id": 2757 },
    {
      "area_name": "石林彝族自治县",
      "area_code": "530126000000",
      "area_id": 2758 },
    {
      "area_name": "嵩明县",
      "area_code": "530127000000",
      "area_id": 2759 },
    {
      "area_name": "禄劝彝族苗族自治县",
      "area_code": "530128000000",
      "area_id": 2760 },
    {
      "area_name": "寻甸回族彝族自治县",
      "area_code": "530129000000",
      "area_id": 2761 },
    {
      "area_name": "安宁市",
      "area_code": "530181000000",
      "area_id": 2762 }],

    "city_id": 269 },
  {
    "city_name": "曲靖市",
    "city_code": "530300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "530301000000",
      "area_id": 2763 },
    {
      "area_name": "麒麟区",
      "area_code": "530302000000",
      "area_id": 2764 },
    {
      "area_name": "沾益区",
      "area_code": "530303000000",
      "area_id": 2765 },
    {
      "area_name": "马龙区",
      "area_code": "530304000000",
      "area_id": 2766 },
    {
      "area_name": "陆良县",
      "area_code": "530322000000",
      "area_id": 2767 },
    {
      "area_name": "师宗县",
      "area_code": "530323000000",
      "area_id": 2768 },
    {
      "area_name": "罗平县",
      "area_code": "530324000000",
      "area_id": 2769 },
    {
      "area_name": "富源县",
      "area_code": "530325000000",
      "area_id": 2770 },
    {
      "area_name": "会泽县",
      "area_code": "530326000000",
      "area_id": 2771 },
    {
      "area_name": "宣威市",
      "area_code": "530381000000",
      "area_id": 2772 }],

    "city_id": 270 },
  {
    "city_name": "玉溪市",
    "city_code": "530400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "530401000000",
      "area_id": 2773 },
    {
      "area_name": "红塔区",
      "area_code": "530402000000",
      "area_id": 2774 },
    {
      "area_name": "江川区",
      "area_code": "530403000000",
      "area_id": 2775 },
    {
      "area_name": "澄江县",
      "area_code": "530422000000",
      "area_id": 2776 },
    {
      "area_name": "通海县",
      "area_code": "530423000000",
      "area_id": 2777 },
    {
      "area_name": "华宁县",
      "area_code": "530424000000",
      "area_id": 2778 },
    {
      "area_name": "易门县",
      "area_code": "530425000000",
      "area_id": 2779 },
    {
      "area_name": "峨山彝族自治县",
      "area_code": "530426000000",
      "area_id": 2780 },
    {
      "area_name": "新平彝族傣族自治县",
      "area_code": "530427000000",
      "area_id": 2781 },
    {
      "area_name": "元江哈尼族彝族傣族自治县",
      "area_code": "530428000000",
      "area_id": 2782 }],

    "city_id": 271 },
  {
    "city_name": "保山市",
    "city_code": "530500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "530501000000",
      "area_id": 2783 },
    {
      "area_name": "隆阳区",
      "area_code": "530502000000",
      "area_id": 2784 },
    {
      "area_name": "施甸县",
      "area_code": "530521000000",
      "area_id": 2785 },
    {
      "area_name": "龙陵县",
      "area_code": "530523000000",
      "area_id": 2786 },
    {
      "area_name": "昌宁县",
      "area_code": "530524000000",
      "area_id": 2787 },
    {
      "area_name": "腾冲市",
      "area_code": "530581000000",
      "area_id": 2788 }],

    "city_id": 272 },
  {
    "city_name": "昭通市",
    "city_code": "530600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "530601000000",
      "area_id": 2789 },
    {
      "area_name": "昭阳区",
      "area_code": "530602000000",
      "area_id": 2790 },
    {
      "area_name": "鲁甸县",
      "area_code": "530621000000",
      "area_id": 2791 },
    {
      "area_name": "巧家县",
      "area_code": "530622000000",
      "area_id": 2792 },
    {
      "area_name": "盐津县",
      "area_code": "530623000000",
      "area_id": 2793 },
    {
      "area_name": "大关县",
      "area_code": "530624000000",
      "area_id": 2794 },
    {
      "area_name": "永善县",
      "area_code": "530625000000",
      "area_id": 2795 },
    {
      "area_name": "绥江县",
      "area_code": "530626000000",
      "area_id": 2796 },
    {
      "area_name": "镇雄县",
      "area_code": "530627000000",
      "area_id": 2797 },
    {
      "area_name": "彝良县",
      "area_code": "530628000000",
      "area_id": 2798 },
    {
      "area_name": "威信县",
      "area_code": "530629000000",
      "area_id": 2799 },
    {
      "area_name": "水富市",
      "area_code": "530681000000",
      "area_id": 2800 }],

    "city_id": 273 },
  {
    "city_name": "丽江市",
    "city_code": "530700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "530701000000",
      "area_id": 2801 },
    {
      "area_name": "古城区",
      "area_code": "530702000000",
      "area_id": 2802 },
    {
      "area_name": "玉龙纳西族自治县",
      "area_code": "530721000000",
      "area_id": 2803 },
    {
      "area_name": "永胜县",
      "area_code": "530722000000",
      "area_id": 2804 },
    {
      "area_name": "华坪县",
      "area_code": "530723000000",
      "area_id": 2805 },
    {
      "area_name": "宁蒗彝族自治县",
      "area_code": "530724000000",
      "area_id": 2806 }],

    "city_id": 274 },
  {
    "city_name": "普洱市",
    "city_code": "530800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "530801000000",
      "area_id": 2807 },
    {
      "area_name": "思茅区",
      "area_code": "530802000000",
      "area_id": 2808 },
    {
      "area_name": "宁洱哈尼族彝族自治县",
      "area_code": "530821000000",
      "area_id": 2809 },
    {
      "area_name": "墨江哈尼族自治县",
      "area_code": "530822000000",
      "area_id": 2810 },
    {
      "area_name": "景东彝族自治县",
      "area_code": "530823000000",
      "area_id": 2811 },
    {
      "area_name": "景谷傣族彝族自治县",
      "area_code": "530824000000",
      "area_id": 2812 },
    {
      "area_name": "镇沅彝族哈尼族拉祜族自治县",
      "area_code": "530825000000",
      "area_id": 2813 },
    {
      "area_name": "江城哈尼族彝族自治县",
      "area_code": "530826000000",
      "area_id": 2814 },
    {
      "area_name": "孟连傣族拉祜族佤族自治县",
      "area_code": "530827000000",
      "area_id": 2815 },
    {
      "area_name": "澜沧拉祜族自治县",
      "area_code": "530828000000",
      "area_id": 2816 },
    {
      "area_name": "西盟佤族自治县",
      "area_code": "530829000000",
      "area_id": 2817 }],

    "city_id": 275 },
  {
    "city_name": "临沧市",
    "city_code": "530900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "530901000000",
      "area_id": 2818 },
    {
      "area_name": "临翔区",
      "area_code": "530902000000",
      "area_id": 2819 },
    {
      "area_name": "凤庆县",
      "area_code": "530921000000",
      "area_id": 2820 },
    {
      "area_name": "云县",
      "area_code": "530922000000",
      "area_id": 2821 },
    {
      "area_name": "永德县",
      "area_code": "530923000000",
      "area_id": 2822 },
    {
      "area_name": "镇康县",
      "area_code": "530924000000",
      "area_id": 2823 },
    {
      "area_name": "双江拉祜族佤族布朗族傣族自治县",
      "area_code": "530925000000",
      "area_id": 2824 },
    {
      "area_name": "耿马傣族佤族自治县",
      "area_code": "530926000000",
      "area_id": 2825 },
    {
      "area_name": "沧源佤族自治县",
      "area_code": "530927000000",
      "area_id": 2826 }],

    "city_id": 276 },
  {
    "city_name": "楚雄彝族自治州",
    "city_code": "532300000000",
    "city_areas": [{
      "area_name": "楚雄市",
      "area_code": "532301000000",
      "area_id": 2827 },
    {
      "area_name": "双柏县",
      "area_code": "532322000000",
      "area_id": 2828 },
    {
      "area_name": "牟定县",
      "area_code": "532323000000",
      "area_id": 2829 },
    {
      "area_name": "南华县",
      "area_code": "532324000000",
      "area_id": 2830 },
    {
      "area_name": "姚安县",
      "area_code": "532325000000",
      "area_id": 2831 },
    {
      "area_name": "大姚县",
      "area_code": "532326000000",
      "area_id": 2832 },
    {
      "area_name": "永仁县",
      "area_code": "532327000000",
      "area_id": 2833 },
    {
      "area_name": "元谋县",
      "area_code": "532328000000",
      "area_id": 2834 },
    {
      "area_name": "武定县",
      "area_code": "532329000000",
      "area_id": 2835 },
    {
      "area_name": "禄丰县",
      "area_code": "532331000000",
      "area_id": 2836 }],

    "city_id": 277 },
  {
    "city_name": "红河哈尼族彝族自治州",
    "city_code": "532500000000",
    "city_areas": [{
      "area_name": "个旧市",
      "area_code": "532501000000",
      "area_id": 2837 },
    {
      "area_name": "开远市",
      "area_code": "532502000000",
      "area_id": 2838 },
    {
      "area_name": "蒙自市",
      "area_code": "532503000000",
      "area_id": 2839 },
    {
      "area_name": "弥勒市",
      "area_code": "532504000000",
      "area_id": 2840 },
    {
      "area_name": "屏边苗族自治县",
      "area_code": "532523000000",
      "area_id": 2841 },
    {
      "area_name": "建水县",
      "area_code": "532524000000",
      "area_id": 2842 },
    {
      "area_name": "石屏县",
      "area_code": "532525000000",
      "area_id": 2843 },
    {
      "area_name": "泸西县",
      "area_code": "532527000000",
      "area_id": 2844 },
    {
      "area_name": "元阳县",
      "area_code": "532528000000",
      "area_id": 2845 },
    {
      "area_name": "红河县",
      "area_code": "532529000000",
      "area_id": 2846 },
    {
      "area_name": "金平苗族瑶族傣族自治县",
      "area_code": "532530000000",
      "area_id": 2847 },
    {
      "area_name": "绿春县",
      "area_code": "532531000000",
      "area_id": 2848 },
    {
      "area_name": "河口瑶族自治县",
      "area_code": "532532000000",
      "area_id": 2849 }],

    "city_id": 278 },
  {
    "city_name": "文山壮族苗族自治州",
    "city_code": "532600000000",
    "city_areas": [{
      "area_name": "文山市",
      "area_code": "532601000000",
      "area_id": 2850 },
    {
      "area_name": "砚山县",
      "area_code": "532622000000",
      "area_id": 2851 },
    {
      "area_name": "西畴县",
      "area_code": "532623000000",
      "area_id": 2852 },
    {
      "area_name": "麻栗坡县",
      "area_code": "532624000000",
      "area_id": 2853 },
    {
      "area_name": "马关县",
      "area_code": "532625000000",
      "area_id": 2854 },
    {
      "area_name": "丘北县",
      "area_code": "532626000000",
      "area_id": 2855 },
    {
      "area_name": "广南县",
      "area_code": "532627000000",
      "area_id": 2856 },
    {
      "area_name": "富宁县",
      "area_code": "532628000000",
      "area_id": 2857 }],

    "city_id": 279 },
  {
    "city_name": "西双版纳傣族自治州",
    "city_code": "532800000000",
    "city_areas": [{
      "area_name": "景洪市",
      "area_code": "532801000000",
      "area_id": 2858 },
    {
      "area_name": "勐海县",
      "area_code": "532822000000",
      "area_id": 2859 },
    {
      "area_name": "勐腊县",
      "area_code": "532823000000",
      "area_id": 2860 }],

    "city_id": 280 },
  {
    "city_name": "大理白族自治州",
    "city_code": "532900000000",
    "city_areas": [{
      "area_name": "大理市",
      "area_code": "532901000000",
      "area_id": 2861 },
    {
      "area_name": "漾濞彝族自治县",
      "area_code": "532922000000",
      "area_id": 2862 },
    {
      "area_name": "祥云县",
      "area_code": "532923000000",
      "area_id": 2863 },
    {
      "area_name": "宾川县",
      "area_code": "532924000000",
      "area_id": 2864 },
    {
      "area_name": "弥渡县",
      "area_code": "532925000000",
      "area_id": 2865 },
    {
      "area_name": "南涧彝族自治县",
      "area_code": "532926000000",
      "area_id": 2866 },
    {
      "area_name": "巍山彝族回族自治县",
      "area_code": "532927000000",
      "area_id": 2867 },
    {
      "area_name": "永平县",
      "area_code": "532928000000",
      "area_id": 2868 },
    {
      "area_name": "云龙县",
      "area_code": "532929000000",
      "area_id": 2869 },
    {
      "area_name": "洱源县",
      "area_code": "532930000000",
      "area_id": 2870 },
    {
      "area_name": "剑川县",
      "area_code": "532931000000",
      "area_id": 2871 },
    {
      "area_name": "鹤庆县",
      "area_code": "532932000000",
      "area_id": 2872 }],

    "city_id": 281 },
  {
    "city_name": "德宏傣族景颇族自治州",
    "city_code": "533100000000",
    "city_areas": [{
      "area_name": "瑞丽市",
      "area_code": "533102000000",
      "area_id": 2873 },
    {
      "area_name": "芒市",
      "area_code": "533103000000",
      "area_id": 2874 },
    {
      "area_name": "梁河县",
      "area_code": "533122000000",
      "area_id": 2875 },
    {
      "area_name": "盈江县",
      "area_code": "533123000000",
      "area_id": 2876 },
    {
      "area_name": "陇川县",
      "area_code": "533124000000",
      "area_id": 2877 }],

    "city_id": 282 },
  {
    "city_name": "怒江傈僳族自治州",
    "city_code": "533300000000",
    "city_areas": [{
      "area_name": "泸水市",
      "area_code": "533301000000",
      "area_id": 2878 },
    {
      "area_name": "福贡县",
      "area_code": "533323000000",
      "area_id": 2879 },
    {
      "area_name": "贡山独龙族怒族自治县",
      "area_code": "533324000000",
      "area_id": 2880 },
    {
      "area_name": "兰坪白族普米族自治县",
      "area_code": "533325000000",
      "area_id": 2881 }],

    "city_id": 283 },
  {
    "city_name": "迪庆藏族自治州",
    "city_code": "533400000000",
    "city_areas": [{
      "area_name": "香格里拉市",
      "area_code": "533401000000",
      "area_id": 2882 },
    {
      "area_name": "德钦县",
      "area_code": "533422000000",
      "area_id": 2883 },
    {
      "area_name": "维西傈僳族自治县",
      "area_code": "533423000000",
      "area_id": 2884 }],

    "city_id": 284 }],

  "pro_code": "530000",
  "pro_id": 25,
  "pro_name": "云南省" },
{
  "pro_cities": [{
    "city_name": "拉萨市",
    "city_code": "540100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "540101000000",
      "area_id": 2885 },
    {
      "area_name": "城关区",
      "area_code": "540102000000",
      "area_id": 2886 },
    {
      "area_name": "堆龙德庆区",
      "area_code": "540103000000",
      "area_id": 2887 },
    {
      "area_name": "达孜区",
      "area_code": "540104000000",
      "area_id": 2888 },
    {
      "area_name": "林周县",
      "area_code": "540121000000",
      "area_id": 2889 },
    {
      "area_name": "当雄县",
      "area_code": "540122000000",
      "area_id": 2890 },
    {
      "area_name": "尼木县",
      "area_code": "540123000000",
      "area_id": 2891 },
    {
      "area_name": "曲水县",
      "area_code": "540124000000",
      "area_id": 2892 },
    {
      "area_name": "墨竹工卡县",
      "area_code": "540127000000",
      "area_id": 2893 },
    {
      "area_name": "格尔木藏青工业园区",
      "area_code": "540171000000",
      "area_id": 2894 },
    {
      "area_name": "拉萨经济技术开发区",
      "area_code": "540172000000",
      "area_id": 2895 },
    {
      "area_name": "西藏文化旅游创意园区",
      "area_code": "540173000000",
      "area_id": 2896 },
    {
      "area_name": "达孜工业园区",
      "area_code": "540174000000",
      "area_id": 2897 }],

    "city_id": 285 },
  {
    "city_name": "日喀则市",
    "city_code": "540200000000",
    "city_areas": [{
      "area_name": "桑珠孜区",
      "area_code": "540202000000",
      "area_id": 2898 },
    {
      "area_name": "南木林县",
      "area_code": "540221000000",
      "area_id": 2899 },
    {
      "area_name": "江孜县",
      "area_code": "540222000000",
      "area_id": 2900 },
    {
      "area_name": "定日县",
      "area_code": "540223000000",
      "area_id": 2901 },
    {
      "area_name": "萨迦县",
      "area_code": "540224000000",
      "area_id": 2902 },
    {
      "area_name": "拉孜县",
      "area_code": "540225000000",
      "area_id": 2903 },
    {
      "area_name": "昂仁县",
      "area_code": "540226000000",
      "area_id": 2904 },
    {
      "area_name": "谢通门县",
      "area_code": "540227000000",
      "area_id": 2905 },
    {
      "area_name": "白朗县",
      "area_code": "540228000000",
      "area_id": 2906 },
    {
      "area_name": "仁布县",
      "area_code": "540229000000",
      "area_id": 2907 },
    {
      "area_name": "康马县",
      "area_code": "540230000000",
      "area_id": 2908 },
    {
      "area_name": "定结县",
      "area_code": "540231000000",
      "area_id": 2909 },
    {
      "area_name": "仲巴县",
      "area_code": "540232000000",
      "area_id": 2910 },
    {
      "area_name": "亚东县",
      "area_code": "540233000000",
      "area_id": 2911 },
    {
      "area_name": "吉隆县",
      "area_code": "540234000000",
      "area_id": 2912 },
    {
      "area_name": "聂拉木县",
      "area_code": "540235000000",
      "area_id": 2913 },
    {
      "area_name": "萨嘎县",
      "area_code": "540236000000",
      "area_id": 2914 },
    {
      "area_name": "岗巴县",
      "area_code": "540237000000",
      "area_id": 2915 }],

    "city_id": 286 },
  {
    "city_name": "昌都市",
    "city_code": "540300000000",
    "city_areas": [{
      "area_name": "卡若区",
      "area_code": "540302000000",
      "area_id": 2916 },
    {
      "area_name": "江达县",
      "area_code": "540321000000",
      "area_id": 2917 },
    {
      "area_name": "贡觉县",
      "area_code": "540322000000",
      "area_id": 2918 },
    {
      "area_name": "类乌齐县",
      "area_code": "540323000000",
      "area_id": 2919 },
    {
      "area_name": "丁青县",
      "area_code": "540324000000",
      "area_id": 2920 },
    {
      "area_name": "察雅县",
      "area_code": "540325000000",
      "area_id": 2921 },
    {
      "area_name": "八宿县",
      "area_code": "540326000000",
      "area_id": 2922 },
    {
      "area_name": "左贡县",
      "area_code": "540327000000",
      "area_id": 2923 },
    {
      "area_name": "芒康县",
      "area_code": "540328000000",
      "area_id": 2924 },
    {
      "area_name": "洛隆县",
      "area_code": "540329000000",
      "area_id": 2925 },
    {
      "area_name": "边坝县",
      "area_code": "540330000000",
      "area_id": 2926 }],

    "city_id": 287 },
  {
    "city_name": "林芝市",
    "city_code": "540400000000",
    "city_areas": [{
      "area_name": "巴宜区",
      "area_code": "540402000000",
      "area_id": 2927 },
    {
      "area_name": "工布江达县",
      "area_code": "540421000000",
      "area_id": 2928 },
    {
      "area_name": "米林县",
      "area_code": "540422000000",
      "area_id": 2929 },
    {
      "area_name": "墨脱县",
      "area_code": "540423000000",
      "area_id": 2930 },
    {
      "area_name": "波密县",
      "area_code": "540424000000",
      "area_id": 2931 },
    {
      "area_name": "察隅县",
      "area_code": "540425000000",
      "area_id": 2932 },
    {
      "area_name": "朗县",
      "area_code": "540426000000",
      "area_id": 2933 }],

    "city_id": 288 },
  {
    "city_name": "山南市",
    "city_code": "540500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "540501000000",
      "area_id": 2934 },
    {
      "area_name": "乃东区",
      "area_code": "540502000000",
      "area_id": 2935 },
    {
      "area_name": "扎囊县",
      "area_code": "540521000000",
      "area_id": 2936 },
    {
      "area_name": "贡嘎县",
      "area_code": "540522000000",
      "area_id": 2937 },
    {
      "area_name": "桑日县",
      "area_code": "540523000000",
      "area_id": 2938 },
    {
      "area_name": "琼结县",
      "area_code": "540524000000",
      "area_id": 2939 },
    {
      "area_name": "曲松县",
      "area_code": "540525000000",
      "area_id": 2940 },
    {
      "area_name": "措美县",
      "area_code": "540526000000",
      "area_id": 2941 },
    {
      "area_name": "洛扎县",
      "area_code": "540527000000",
      "area_id": 2942 },
    {
      "area_name": "加查县",
      "area_code": "540528000000",
      "area_id": 2943 },
    {
      "area_name": "隆子县",
      "area_code": "540529000000",
      "area_id": 2944 },
    {
      "area_name": "错那县",
      "area_code": "540530000000",
      "area_id": 2945 },
    {
      "area_name": "浪卡子县",
      "area_code": "540531000000",
      "area_id": 2946 }],

    "city_id": 289 },
  {
    "city_name": "那曲市",
    "city_code": "540600000000",
    "city_areas": [{
      "area_name": "色尼区",
      "area_code": "540602000000",
      "area_id": 2947 },
    {
      "area_name": "嘉黎县",
      "area_code": "540621000000",
      "area_id": 2948 },
    {
      "area_name": "比如县",
      "area_code": "540622000000",
      "area_id": 2949 },
    {
      "area_name": "聂荣县",
      "area_code": "540623000000",
      "area_id": 2950 },
    {
      "area_name": "安多县",
      "area_code": "540624000000",
      "area_id": 2951 },
    {
      "area_name": "申扎县",
      "area_code": "540625000000",
      "area_id": 2952 },
    {
      "area_name": "索县",
      "area_code": "540626000000",
      "area_id": 2953 },
    {
      "area_name": "班戈县",
      "area_code": "540627000000",
      "area_id": 2954 },
    {
      "area_name": "巴青县",
      "area_code": "540628000000",
      "area_id": 2955 },
    {
      "area_name": "尼玛县",
      "area_code": "540629000000",
      "area_id": 2956 },
    {
      "area_name": "双湖县",
      "area_code": "540630000000",
      "area_id": 2957 }],

    "city_id": 290 },
  {
    "city_name": "阿里地区",
    "city_code": "542500000000",
    "city_areas": [{
      "area_name": "普兰县",
      "area_code": "542521000000",
      "area_id": 2958 },
    {
      "area_name": "札达县",
      "area_code": "542522000000",
      "area_id": 2959 },
    {
      "area_name": "噶尔县",
      "area_code": "542523000000",
      "area_id": 2960 },
    {
      "area_name": "日土县",
      "area_code": "542524000000",
      "area_id": 2961 },
    {
      "area_name": "革吉县",
      "area_code": "542525000000",
      "area_id": 2962 },
    {
      "area_name": "改则县",
      "area_code": "542526000000",
      "area_id": 2963 },
    {
      "area_name": "措勤县",
      "area_code": "542527000000",
      "area_id": 2964 }],

    "city_id": 291 }],

  "pro_code": "540000",
  "pro_id": 26,
  "pro_name": "西藏自治区" },
{
  "pro_cities": [{
    "city_name": "西安市",
    "city_code": "610100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "610101000000",
      "area_id": 2965 },
    {
      "area_name": "新城区",
      "area_code": "610102000000",
      "area_id": 2966 },
    {
      "area_name": "碑林区",
      "area_code": "610103000000",
      "area_id": 2967 },
    {
      "area_name": "莲湖区",
      "area_code": "610104000000",
      "area_id": 2968 },
    {
      "area_name": "灞桥区",
      "area_code": "610111000000",
      "area_id": 2969 },
    {
      "area_name": "未央区",
      "area_code": "610112000000",
      "area_id": 2970 },
    {
      "area_name": "雁塔区",
      "area_code": "610113000000",
      "area_id": 2971 },
    {
      "area_name": "阎良区",
      "area_code": "610114000000",
      "area_id": 2972 },
    {
      "area_name": "临潼区",
      "area_code": "610115000000",
      "area_id": 2973 },
    {
      "area_name": "长安区",
      "area_code": "610116000000",
      "area_id": 2974 },
    {
      "area_name": "高陵区",
      "area_code": "610117000000",
      "area_id": 2975 },
    {
      "area_name": "鄠邑区",
      "area_code": "610118000000",
      "area_id": 2976 },
    {
      "area_name": "蓝田县",
      "area_code": "610122000000",
      "area_id": 2977 },
    {
      "area_name": "周至县",
      "area_code": "610124000000",
      "area_id": 2978 }],

    "city_id": 292 },
  {
    "city_name": "铜川市",
    "city_code": "610200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "610201000000",
      "area_id": 2979 },
    {
      "area_name": "王益区",
      "area_code": "610202000000",
      "area_id": 2980 },
    {
      "area_name": "印台区",
      "area_code": "610203000000",
      "area_id": 2981 },
    {
      "area_name": "耀州区",
      "area_code": "610204000000",
      "area_id": 2982 },
    {
      "area_name": "宜君县",
      "area_code": "610222000000",
      "area_id": 2983 }],

    "city_id": 293 },
  {
    "city_name": "宝鸡市",
    "city_code": "610300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "610301000000",
      "area_id": 2984 },
    {
      "area_name": "渭滨区",
      "area_code": "610302000000",
      "area_id": 2985 },
    {
      "area_name": "金台区",
      "area_code": "610303000000",
      "area_id": 2986 },
    {
      "area_name": "陈仓区",
      "area_code": "610304000000",
      "area_id": 2987 },
    {
      "area_name": "凤翔县",
      "area_code": "610322000000",
      "area_id": 2988 },
    {
      "area_name": "岐山县",
      "area_code": "610323000000",
      "area_id": 2989 },
    {
      "area_name": "扶风县",
      "area_code": "610324000000",
      "area_id": 2990 },
    {
      "area_name": "眉县",
      "area_code": "610326000000",
      "area_id": 2991 },
    {
      "area_name": "陇县",
      "area_code": "610327000000",
      "area_id": 2992 },
    {
      "area_name": "千阳县",
      "area_code": "610328000000",
      "area_id": 2993 },
    {
      "area_name": "麟游县",
      "area_code": "610329000000",
      "area_id": 2994 },
    {
      "area_name": "凤县",
      "area_code": "610330000000",
      "area_id": 2995 },
    {
      "area_name": "太白县",
      "area_code": "610331000000",
      "area_id": 2996 }],

    "city_id": 294 },
  {
    "city_name": "咸阳市",
    "city_code": "610400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "610401000000",
      "area_id": 2997 },
    {
      "area_name": "秦都区",
      "area_code": "610402000000",
      "area_id": 2998 },
    {
      "area_name": "杨陵区",
      "area_code": "610403000000",
      "area_id": 2999 },
    {
      "area_name": "渭城区",
      "area_code": "610404000000",
      "area_id": 3000 },
    {
      "area_name": "三原县",
      "area_code": "610422000000",
      "area_id": 3001 },
    {
      "area_name": "泾阳县",
      "area_code": "610423000000",
      "area_id": 3002 },
    {
      "area_name": "乾县",
      "area_code": "610424000000",
      "area_id": 3003 },
    {
      "area_name": "礼泉县",
      "area_code": "610425000000",
      "area_id": 3004 },
    {
      "area_name": "永寿县",
      "area_code": "610426000000",
      "area_id": 3005 },
    {
      "area_name": "长武县",
      "area_code": "610428000000",
      "area_id": 3006 },
    {
      "area_name": "旬邑县",
      "area_code": "610429000000",
      "area_id": 3007 },
    {
      "area_name": "淳化县",
      "area_code": "610430000000",
      "area_id": 3008 },
    {
      "area_name": "武功县",
      "area_code": "610431000000",
      "area_id": 3009 },
    {
      "area_name": "兴平市",
      "area_code": "610481000000",
      "area_id": 3010 },
    {
      "area_name": "彬州市",
      "area_code": "610482000000",
      "area_id": 3011 }],

    "city_id": 295 },
  {
    "city_name": "渭南市",
    "city_code": "610500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "610501000000",
      "area_id": 3012 },
    {
      "area_name": "临渭区",
      "area_code": "610502000000",
      "area_id": 3013 },
    {
      "area_name": "华州区",
      "area_code": "610503000000",
      "area_id": 3014 },
    {
      "area_name": "潼关县",
      "area_code": "610522000000",
      "area_id": 3015 },
    {
      "area_name": "大荔县",
      "area_code": "610523000000",
      "area_id": 3016 },
    {
      "area_name": "合阳县",
      "area_code": "610524000000",
      "area_id": 3017 },
    {
      "area_name": "澄城县",
      "area_code": "610525000000",
      "area_id": 3018 },
    {
      "area_name": "蒲城县",
      "area_code": "610526000000",
      "area_id": 3019 },
    {
      "area_name": "白水县",
      "area_code": "610527000000",
      "area_id": 3020 },
    {
      "area_name": "富平县",
      "area_code": "610528000000",
      "area_id": 3021 },
    {
      "area_name": "韩城市",
      "area_code": "610581000000",
      "area_id": 3022 },
    {
      "area_name": "华阴市",
      "area_code": "610582000000",
      "area_id": 3023 }],

    "city_id": 296 },
  {
    "city_name": "延安市",
    "city_code": "610600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "610601000000",
      "area_id": 3024 },
    {
      "area_name": "宝塔区",
      "area_code": "610602000000",
      "area_id": 3025 },
    {
      "area_name": "安塞区",
      "area_code": "610603000000",
      "area_id": 3026 },
    {
      "area_name": "延长县",
      "area_code": "610621000000",
      "area_id": 3027 },
    {
      "area_name": "延川县",
      "area_code": "610622000000",
      "area_id": 3028 },
    {
      "area_name": "子长县",
      "area_code": "610623000000",
      "area_id": 3029 },
    {
      "area_name": "志丹县",
      "area_code": "610625000000",
      "area_id": 3030 },
    {
      "area_name": "吴起县",
      "area_code": "610626000000",
      "area_id": 3031 },
    {
      "area_name": "甘泉县",
      "area_code": "610627000000",
      "area_id": 3032 },
    {
      "area_name": "富县",
      "area_code": "610628000000",
      "area_id": 3033 },
    {
      "area_name": "洛川县",
      "area_code": "610629000000",
      "area_id": 3034 },
    {
      "area_name": "宜川县",
      "area_code": "610630000000",
      "area_id": 3035 },
    {
      "area_name": "黄龙县",
      "area_code": "610631000000",
      "area_id": 3036 },
    {
      "area_name": "黄陵县",
      "area_code": "610632000000",
      "area_id": 3037 }],

    "city_id": 297 },
  {
    "city_name": "汉中市",
    "city_code": "610700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "610701000000",
      "area_id": 3038 },
    {
      "area_name": "汉台区",
      "area_code": "610702000000",
      "area_id": 3039 },
    {
      "area_name": "南郑区",
      "area_code": "610703000000",
      "area_id": 3040 },
    {
      "area_name": "城固县",
      "area_code": "610722000000",
      "area_id": 3041 },
    {
      "area_name": "洋县",
      "area_code": "610723000000",
      "area_id": 3042 },
    {
      "area_name": "西乡县",
      "area_code": "610724000000",
      "area_id": 3043 },
    {
      "area_name": "勉县",
      "area_code": "610725000000",
      "area_id": 3044 },
    {
      "area_name": "宁强县",
      "area_code": "610726000000",
      "area_id": 3045 },
    {
      "area_name": "略阳县",
      "area_code": "610727000000",
      "area_id": 3046 },
    {
      "area_name": "镇巴县",
      "area_code": "610728000000",
      "area_id": 3047 },
    {
      "area_name": "留坝县",
      "area_code": "610729000000",
      "area_id": 3048 },
    {
      "area_name": "佛坪县",
      "area_code": "610730000000",
      "area_id": 3049 }],

    "city_id": 298 },
  {
    "city_name": "榆林市",
    "city_code": "610800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "610801000000",
      "area_id": 3050 },
    {
      "area_name": "榆阳区",
      "area_code": "610802000000",
      "area_id": 3051 },
    {
      "area_name": "横山区",
      "area_code": "610803000000",
      "area_id": 3052 },
    {
      "area_name": "府谷县",
      "area_code": "610822000000",
      "area_id": 3053 },
    {
      "area_name": "靖边县",
      "area_code": "610824000000",
      "area_id": 3054 },
    {
      "area_name": "定边县",
      "area_code": "610825000000",
      "area_id": 3055 },
    {
      "area_name": "绥德县",
      "area_code": "610826000000",
      "area_id": 3056 },
    {
      "area_name": "米脂县",
      "area_code": "610827000000",
      "area_id": 3057 },
    {
      "area_name": "佳县",
      "area_code": "610828000000",
      "area_id": 3058 },
    {
      "area_name": "吴堡县",
      "area_code": "610829000000",
      "area_id": 3059 },
    {
      "area_name": "清涧县",
      "area_code": "610830000000",
      "area_id": 3060 },
    {
      "area_name": "子洲县",
      "area_code": "610831000000",
      "area_id": 3061 },
    {
      "area_name": "神木市",
      "area_code": "610881000000",
      "area_id": 3062 }],

    "city_id": 299 },
  {
    "city_name": "安康市",
    "city_code": "610900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "610901000000",
      "area_id": 3063 },
    {
      "area_name": "汉滨区",
      "area_code": "610902000000",
      "area_id": 3064 },
    {
      "area_name": "汉阴县",
      "area_code": "610921000000",
      "area_id": 3065 },
    {
      "area_name": "石泉县",
      "area_code": "610922000000",
      "area_id": 3066 },
    {
      "area_name": "宁陕县",
      "area_code": "610923000000",
      "area_id": 3067 },
    {
      "area_name": "紫阳县",
      "area_code": "610924000000",
      "area_id": 3068 },
    {
      "area_name": "岚皋县",
      "area_code": "610925000000",
      "area_id": 3069 },
    {
      "area_name": "平利县",
      "area_code": "610926000000",
      "area_id": 3070 },
    {
      "area_name": "镇坪县",
      "area_code": "610927000000",
      "area_id": 3071 },
    {
      "area_name": "旬阳县",
      "area_code": "610928000000",
      "area_id": 3072 },
    {
      "area_name": "白河县",
      "area_code": "610929000000",
      "area_id": 3073 }],

    "city_id": 300 },
  {
    "city_name": "商洛市",
    "city_code": "611000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "611001000000",
      "area_id": 3074 },
    {
      "area_name": "商州区",
      "area_code": "611002000000",
      "area_id": 3075 },
    {
      "area_name": "洛南县",
      "area_code": "611021000000",
      "area_id": 3076 },
    {
      "area_name": "丹凤县",
      "area_code": "611022000000",
      "area_id": 3077 },
    {
      "area_name": "商南县",
      "area_code": "611023000000",
      "area_id": 3078 },
    {
      "area_name": "山阳县",
      "area_code": "611024000000",
      "area_id": 3079 },
    {
      "area_name": "镇安县",
      "area_code": "611025000000",
      "area_id": 3080 },
    {
      "area_name": "柞水县",
      "area_code": "611026000000",
      "area_id": 3081 }],

    "city_id": 301 }],

  "pro_code": "610000",
  "pro_id": 27,
  "pro_name": "陕西省" },
{
  "pro_cities": [{
    "city_name": "兰州市",
    "city_code": "620100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "620101000000",
      "area_id": 3082 },
    {
      "area_name": "城关区",
      "area_code": "620102000000",
      "area_id": 3083 },
    {
      "area_name": "七里河区",
      "area_code": "620103000000",
      "area_id": 3084 },
    {
      "area_name": "西固区",
      "area_code": "620104000000",
      "area_id": 3085 },
    {
      "area_name": "安宁区",
      "area_code": "620105000000",
      "area_id": 3086 },
    {
      "area_name": "红古区",
      "area_code": "620111000000",
      "area_id": 3087 },
    {
      "area_name": "永登县",
      "area_code": "620121000000",
      "area_id": 3088 },
    {
      "area_name": "皋兰县",
      "area_code": "620122000000",
      "area_id": 3089 },
    {
      "area_name": "榆中县",
      "area_code": "620123000000",
      "area_id": 3090 },
    {
      "area_name": "兰州新区",
      "area_code": "620171000000",
      "area_id": 3091 }],

    "city_id": 302 },
  {
    "city_name": "嘉峪关市",
    "city_code": "620200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "620201000000",
      "area_id": 3092 }],

    "city_id": 303 },
  {
    "city_name": "金昌市",
    "city_code": "620300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "620301000000",
      "area_id": 3093 },
    {
      "area_name": "金川区",
      "area_code": "620302000000",
      "area_id": 3094 },
    {
      "area_name": "永昌县",
      "area_code": "620321000000",
      "area_id": 3095 }],

    "city_id": 304 },
  {
    "city_name": "白银市",
    "city_code": "620400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "620401000000",
      "area_id": 3096 },
    {
      "area_name": "白银区",
      "area_code": "620402000000",
      "area_id": 3097 },
    {
      "area_name": "平川区",
      "area_code": "620403000000",
      "area_id": 3098 },
    {
      "area_name": "靖远县",
      "area_code": "620421000000",
      "area_id": 3099 },
    {
      "area_name": "会宁县",
      "area_code": "620422000000",
      "area_id": 3100 },
    {
      "area_name": "景泰县",
      "area_code": "620423000000",
      "area_id": 3101 }],

    "city_id": 305 },
  {
    "city_name": "天水市",
    "city_code": "620500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "620501000000",
      "area_id": 3102 },
    {
      "area_name": "秦州区",
      "area_code": "620502000000",
      "area_id": 3103 },
    {
      "area_name": "麦积区",
      "area_code": "620503000000",
      "area_id": 3104 },
    {
      "area_name": "清水县",
      "area_code": "620521000000",
      "area_id": 3105 },
    {
      "area_name": "秦安县",
      "area_code": "620522000000",
      "area_id": 3106 },
    {
      "area_name": "甘谷县",
      "area_code": "620523000000",
      "area_id": 3107 },
    {
      "area_name": "武山县",
      "area_code": "620524000000",
      "area_id": 3108 },
    {
      "area_name": "张家川回族自治县",
      "area_code": "620525000000",
      "area_id": 3109 }],

    "city_id": 306 },
  {
    "city_name": "武威市",
    "city_code": "620600000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "620601000000",
      "area_id": 3110 },
    {
      "area_name": "凉州区",
      "area_code": "620602000000",
      "area_id": 3111 },
    {
      "area_name": "民勤县",
      "area_code": "620621000000",
      "area_id": 3112 },
    {
      "area_name": "古浪县",
      "area_code": "620622000000",
      "area_id": 3113 },
    {
      "area_name": "天祝藏族自治县",
      "area_code": "620623000000",
      "area_id": 3114 }],

    "city_id": 307 },
  {
    "city_name": "张掖市",
    "city_code": "620700000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "620701000000",
      "area_id": 3115 },
    {
      "area_name": "甘州区",
      "area_code": "620702000000",
      "area_id": 3116 },
    {
      "area_name": "肃南裕固族自治县",
      "area_code": "620721000000",
      "area_id": 3117 },
    {
      "area_name": "民乐县",
      "area_code": "620722000000",
      "area_id": 3118 },
    {
      "area_name": "临泽县",
      "area_code": "620723000000",
      "area_id": 3119 },
    {
      "area_name": "高台县",
      "area_code": "620724000000",
      "area_id": 3120 },
    {
      "area_name": "山丹县",
      "area_code": "620725000000",
      "area_id": 3121 }],

    "city_id": 308 },
  {
    "city_name": "平凉市",
    "city_code": "620800000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "620801000000",
      "area_id": 3122 },
    {
      "area_name": "崆峒区",
      "area_code": "620802000000",
      "area_id": 3123 },
    {
      "area_name": "泾川县",
      "area_code": "620821000000",
      "area_id": 3124 },
    {
      "area_name": "灵台县",
      "area_code": "620822000000",
      "area_id": 3125 },
    {
      "area_name": "崇信县",
      "area_code": "620823000000",
      "area_id": 3126 },
    {
      "area_name": "庄浪县",
      "area_code": "620825000000",
      "area_id": 3127 },
    {
      "area_name": "静宁县",
      "area_code": "620826000000",
      "area_id": 3128 },
    {
      "area_name": "华亭市",
      "area_code": "620881000000",
      "area_id": 3129 }],

    "city_id": 309 },
  {
    "city_name": "酒泉市",
    "city_code": "620900000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "620901000000",
      "area_id": 3130 },
    {
      "area_name": "肃州区",
      "area_code": "620902000000",
      "area_id": 3131 },
    {
      "area_name": "金塔县",
      "area_code": "620921000000",
      "area_id": 3132 },
    {
      "area_name": "瓜州县",
      "area_code": "620922000000",
      "area_id": 3133 },
    {
      "area_name": "肃北蒙古族自治县",
      "area_code": "620923000000",
      "area_id": 3134 },
    {
      "area_name": "阿克塞哈萨克族自治县",
      "area_code": "620924000000",
      "area_id": 3135 },
    {
      "area_name": "玉门市",
      "area_code": "620981000000",
      "area_id": 3136 },
    {
      "area_name": "敦煌市",
      "area_code": "620982000000",
      "area_id": 3137 }],

    "city_id": 310 },
  {
    "city_name": "庆阳市",
    "city_code": "621000000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "621001000000",
      "area_id": 3138 },
    {
      "area_name": "西峰区",
      "area_code": "621002000000",
      "area_id": 3139 },
    {
      "area_name": "庆城县",
      "area_code": "621021000000",
      "area_id": 3140 },
    {
      "area_name": "环县",
      "area_code": "621022000000",
      "area_id": 3141 },
    {
      "area_name": "华池县",
      "area_code": "621023000000",
      "area_id": 3142 },
    {
      "area_name": "合水县",
      "area_code": "621024000000",
      "area_id": 3143 },
    {
      "area_name": "正宁县",
      "area_code": "621025000000",
      "area_id": 3144 },
    {
      "area_name": "宁县",
      "area_code": "621026000000",
      "area_id": 3145 },
    {
      "area_name": "镇原县",
      "area_code": "621027000000",
      "area_id": 3146 }],

    "city_id": 311 },
  {
    "city_name": "定西市",
    "city_code": "621100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "621101000000",
      "area_id": 3147 },
    {
      "area_name": "安定区",
      "area_code": "621102000000",
      "area_id": 3148 },
    {
      "area_name": "通渭县",
      "area_code": "621121000000",
      "area_id": 3149 },
    {
      "area_name": "陇西县",
      "area_code": "621122000000",
      "area_id": 3150 },
    {
      "area_name": "渭源县",
      "area_code": "621123000000",
      "area_id": 3151 },
    {
      "area_name": "临洮县",
      "area_code": "621124000000",
      "area_id": 3152 },
    {
      "area_name": "漳县",
      "area_code": "621125000000",
      "area_id": 3153 },
    {
      "area_name": "岷县",
      "area_code": "621126000000",
      "area_id": 3154 }],

    "city_id": 312 },
  {
    "city_name": "陇南市",
    "city_code": "621200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "621201000000",
      "area_id": 3155 },
    {
      "area_name": "武都区",
      "area_code": "621202000000",
      "area_id": 3156 },
    {
      "area_name": "成县",
      "area_code": "621221000000",
      "area_id": 3157 },
    {
      "area_name": "文县",
      "area_code": "621222000000",
      "area_id": 3158 },
    {
      "area_name": "宕昌县",
      "area_code": "621223000000",
      "area_id": 3159 },
    {
      "area_name": "康县",
      "area_code": "621224000000",
      "area_id": 3160 },
    {
      "area_name": "西和县",
      "area_code": "621225000000",
      "area_id": 3161 },
    {
      "area_name": "礼县",
      "area_code": "621226000000",
      "area_id": 3162 },
    {
      "area_name": "徽县",
      "area_code": "621227000000",
      "area_id": 3163 },
    {
      "area_name": "两当县",
      "area_code": "621228000000",
      "area_id": 3164 }],

    "city_id": 313 },
  {
    "city_name": "临夏回族自治州",
    "city_code": "622900000000",
    "city_areas": [{
      "area_name": "临夏市",
      "area_code": "622901000000",
      "area_id": 3165 },
    {
      "area_name": "临夏县",
      "area_code": "622921000000",
      "area_id": 3166 },
    {
      "area_name": "康乐县",
      "area_code": "622922000000",
      "area_id": 3167 },
    {
      "area_name": "永靖县",
      "area_code": "622923000000",
      "area_id": 3168 },
    {
      "area_name": "广河县",
      "area_code": "622924000000",
      "area_id": 3169 },
    {
      "area_name": "和政县",
      "area_code": "622925000000",
      "area_id": 3170 },
    {
      "area_name": "东乡族自治县",
      "area_code": "622926000000",
      "area_id": 3171 },
    {
      "area_name": "积石山保安族东乡族撒拉族自治县",
      "area_code": "622927000000",
      "area_id": 3172 }],

    "city_id": 314 },
  {
    "city_name": "甘南藏族自治州",
    "city_code": "623000000000",
    "city_areas": [{
      "area_name": "合作市",
      "area_code": "623001000000",
      "area_id": 3173 },
    {
      "area_name": "临潭县",
      "area_code": "623021000000",
      "area_id": 3174 },
    {
      "area_name": "卓尼县",
      "area_code": "623022000000",
      "area_id": 3175 },
    {
      "area_name": "舟曲县",
      "area_code": "623023000000",
      "area_id": 3176 },
    {
      "area_name": "迭部县",
      "area_code": "623024000000",
      "area_id": 3177 },
    {
      "area_name": "玛曲县",
      "area_code": "623025000000",
      "area_id": 3178 },
    {
      "area_name": "碌曲县",
      "area_code": "623026000000",
      "area_id": 3179 },
    {
      "area_name": "夏河县",
      "area_code": "623027000000",
      "area_id": 3180 }],

    "city_id": 315 }],

  "pro_code": "620000",
  "pro_id": 28,
  "pro_name": "甘肃省" },
{
  "pro_cities": [{
    "city_name": "西宁市",
    "city_code": "630100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "630101000000",
      "area_id": 3181 },
    {
      "area_name": "城东区",
      "area_code": "630102000000",
      "area_id": 3182 },
    {
      "area_name": "城中区",
      "area_code": "630103000000",
      "area_id": 3183 },
    {
      "area_name": "城西区",
      "area_code": "630104000000",
      "area_id": 3184 },
    {
      "area_name": "城北区",
      "area_code": "630105000000",
      "area_id": 3185 },
    {
      "area_name": "大通回族土族自治县",
      "area_code": "630121000000",
      "area_id": 3186 },
    {
      "area_name": "湟中县",
      "area_code": "630122000000",
      "area_id": 3187 },
    {
      "area_name": "湟源县",
      "area_code": "630123000000",
      "area_id": 3188 }],

    "city_id": 316 },
  {
    "city_name": "海东市",
    "city_code": "630200000000",
    "city_areas": [{
      "area_name": "乐都区",
      "area_code": "630202000000",
      "area_id": 3189 },
    {
      "area_name": "平安区",
      "area_code": "630203000000",
      "area_id": 3190 },
    {
      "area_name": "民和回族土族自治县",
      "area_code": "630222000000",
      "area_id": 3191 },
    {
      "area_name": "互助土族自治县",
      "area_code": "630223000000",
      "area_id": 3192 },
    {
      "area_name": "化隆回族自治县",
      "area_code": "630224000000",
      "area_id": 3193 },
    {
      "area_name": "循化撒拉族自治县",
      "area_code": "630225000000",
      "area_id": 3194 }],

    "city_id": 317 },
  {
    "city_name": "海北藏族自治州",
    "city_code": "632200000000",
    "city_areas": [{
      "area_name": "门源回族自治县",
      "area_code": "632221000000",
      "area_id": 3195 },
    {
      "area_name": "祁连县",
      "area_code": "632222000000",
      "area_id": 3196 },
    {
      "area_name": "海晏县",
      "area_code": "632223000000",
      "area_id": 3197 },
    {
      "area_name": "刚察县",
      "area_code": "632224000000",
      "area_id": 3198 }],

    "city_id": 318 },
  {
    "city_name": "黄南藏族自治州",
    "city_code": "632300000000",
    "city_areas": [{
      "area_name": "同仁县",
      "area_code": "632321000000",
      "area_id": 3199 },
    {
      "area_name": "尖扎县",
      "area_code": "632322000000",
      "area_id": 3200 },
    {
      "area_name": "泽库县",
      "area_code": "632323000000",
      "area_id": 3201 },
    {
      "area_name": "河南蒙古族自治县",
      "area_code": "632324000000",
      "area_id": 3202 }],

    "city_id": 319 },
  {
    "city_name": "海南藏族自治州",
    "city_code": "632500000000",
    "city_areas": [{
      "area_name": "共和县",
      "area_code": "632521000000",
      "area_id": 3203 },
    {
      "area_name": "同德县",
      "area_code": "632522000000",
      "area_id": 3204 },
    {
      "area_name": "贵德县",
      "area_code": "632523000000",
      "area_id": 3205 },
    {
      "area_name": "兴海县",
      "area_code": "632524000000",
      "area_id": 3206 },
    {
      "area_name": "贵南县",
      "area_code": "632525000000",
      "area_id": 3207 }],

    "city_id": 320 },
  {
    "city_name": "果洛藏族自治州",
    "city_code": "632600000000",
    "city_areas": [{
      "area_name": "玛沁县",
      "area_code": "632621000000",
      "area_id": 3208 },
    {
      "area_name": "班玛县",
      "area_code": "632622000000",
      "area_id": 3209 },
    {
      "area_name": "甘德县",
      "area_code": "632623000000",
      "area_id": 3210 },
    {
      "area_name": "达日县",
      "area_code": "632624000000",
      "area_id": 3211 },
    {
      "area_name": "久治县",
      "area_code": "632625000000",
      "area_id": 3212 },
    {
      "area_name": "玛多县",
      "area_code": "632626000000",
      "area_id": 3213 }],

    "city_id": 321 },
  {
    "city_name": "玉树藏族自治州",
    "city_code": "632700000000",
    "city_areas": [{
      "area_name": "玉树市",
      "area_code": "632701000000",
      "area_id": 3214 },
    {
      "area_name": "杂多县",
      "area_code": "632722000000",
      "area_id": 3215 },
    {
      "area_name": "称多县",
      "area_code": "632723000000",
      "area_id": 3216 },
    {
      "area_name": "治多县",
      "area_code": "632724000000",
      "area_id": 3217 },
    {
      "area_name": "囊谦县",
      "area_code": "632725000000",
      "area_id": 3218 },
    {
      "area_name": "曲麻莱县",
      "area_code": "632726000000",
      "area_id": 3219 }],

    "city_id": 322 },
  {
    "city_name": "海西蒙古族藏族自治州",
    "city_code": "632800000000",
    "city_areas": [{
      "area_name": "格尔木市",
      "area_code": "632801000000",
      "area_id": 3220 },
    {
      "area_name": "德令哈市",
      "area_code": "632802000000",
      "area_id": 3221 },
    {
      "area_name": "茫崖市",
      "area_code": "632803000000",
      "area_id": 3222 },
    {
      "area_name": "乌兰县",
      "area_code": "632821000000",
      "area_id": 3223 },
    {
      "area_name": "都兰县",
      "area_code": "632822000000",
      "area_id": 3224 },
    {
      "area_name": "天峻县",
      "area_code": "632823000000",
      "area_id": 3225 },
    {
      "area_name": "大柴旦行政委员会",
      "area_code": "632857000000",
      "area_id": 3226 }],

    "city_id": 323 }],

  "pro_code": "630000",
  "pro_id": 29,
  "pro_name": "青海省" },
{
  "pro_cities": [{
    "city_name": "银川市",
    "city_code": "640100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "640101000000",
      "area_id": 3227 },
    {
      "area_name": "兴庆区",
      "area_code": "640104000000",
      "area_id": 3228 },
    {
      "area_name": "西夏区",
      "area_code": "640105000000",
      "area_id": 3229 },
    {
      "area_name": "金凤区",
      "area_code": "640106000000",
      "area_id": 3230 },
    {
      "area_name": "永宁县",
      "area_code": "640121000000",
      "area_id": 3231 },
    {
      "area_name": "贺兰县",
      "area_code": "640122000000",
      "area_id": 3232 },
    {
      "area_name": "灵武市",
      "area_code": "640181000000",
      "area_id": 3233 }],

    "city_id": 324 },
  {
    "city_name": "石嘴山市",
    "city_code": "640200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "640201000000",
      "area_id": 3234 },
    {
      "area_name": "大武口区",
      "area_code": "640202000000",
      "area_id": 3235 },
    {
      "area_name": "惠农区",
      "area_code": "640205000000",
      "area_id": 3236 },
    {
      "area_name": "平罗县",
      "area_code": "640221000000",
      "area_id": 3237 }],

    "city_id": 325 },
  {
    "city_name": "吴忠市",
    "city_code": "640300000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "640301000000",
      "area_id": 3238 },
    {
      "area_name": "利通区",
      "area_code": "640302000000",
      "area_id": 3239 },
    {
      "area_name": "红寺堡区",
      "area_code": "640303000000",
      "area_id": 3240 },
    {
      "area_name": "盐池县",
      "area_code": "640323000000",
      "area_id": 3241 },
    {
      "area_name": "同心县",
      "area_code": "640324000000",
      "area_id": 3242 },
    {
      "area_name": "青铜峡市",
      "area_code": "640381000000",
      "area_id": 3243 }],

    "city_id": 326 },
  {
    "city_name": "固原市",
    "city_code": "640400000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "640401000000",
      "area_id": 3244 },
    {
      "area_name": "原州区",
      "area_code": "640402000000",
      "area_id": 3245 },
    {
      "area_name": "西吉县",
      "area_code": "640422000000",
      "area_id": 3246 },
    {
      "area_name": "隆德县",
      "area_code": "640423000000",
      "area_id": 3247 },
    {
      "area_name": "泾源县",
      "area_code": "640424000000",
      "area_id": 3248 },
    {
      "area_name": "彭阳县",
      "area_code": "640425000000",
      "area_id": 3249 }],

    "city_id": 327 },
  {
    "city_name": "中卫市",
    "city_code": "640500000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "640501000000",
      "area_id": 3250 },
    {
      "area_name": "沙坡头区",
      "area_code": "640502000000",
      "area_id": 3251 },
    {
      "area_name": "中宁县",
      "area_code": "640521000000",
      "area_id": 3252 },
    {
      "area_name": "海原县",
      "area_code": "640522000000",
      "area_id": 3253 }],

    "city_id": 328 }],

  "pro_code": "640000",
  "pro_id": 30,
  "pro_name": "宁夏回族自治区" },
{
  "pro_cities": [{
    "city_name": "乌鲁木齐市",
    "city_code": "650100000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "650101000000",
      "area_id": 3254 },
    {
      "area_name": "天山区",
      "area_code": "650102000000",
      "area_id": 3255 },
    {
      "area_name": "沙依巴克区",
      "area_code": "650103000000",
      "area_id": 3256 },
    {
      "area_name": "新市区",
      "area_code": "650104000000",
      "area_id": 3257 },
    {
      "area_name": "水磨沟区",
      "area_code": "650105000000",
      "area_id": 3258 },
    {
      "area_name": "头屯河区",
      "area_code": "650106000000",
      "area_id": 3259 },
    {
      "area_name": "达坂城区",
      "area_code": "650107000000",
      "area_id": 3260 },
    {
      "area_name": "米东区",
      "area_code": "650109000000",
      "area_id": 3261 },
    {
      "area_name": "乌鲁木齐县",
      "area_code": "650121000000",
      "area_id": 3262 },
    {
      "area_name": "乌鲁木齐经济技术开发区",
      "area_code": "650171000000",
      "area_id": 3263 },
    {
      "area_name": "乌鲁木齐高新技术产业开发区",
      "area_code": "650172000000",
      "area_id": 3264 }],

    "city_id": 329 },
  {
    "city_name": "克拉玛依市",
    "city_code": "650200000000",
    "city_areas": [{
      "area_name": "市辖区",
      "area_code": "650201000000",
      "area_id": 3265 },
    {
      "area_name": "独山子区",
      "area_code": "650202000000",
      "area_id": 3266 },
    {
      "area_name": "克拉玛依区",
      "area_code": "650203000000",
      "area_id": 3267 },
    {
      "area_name": "白碱滩区",
      "area_code": "650204000000",
      "area_id": 3268 },
    {
      "area_name": "乌尔禾区",
      "area_code": "650205000000",
      "area_id": 3269 }],

    "city_id": 330 },
  {
    "city_name": "吐鲁番市",
    "city_code": "650400000000",
    "city_areas": [{
      "area_name": "高昌区",
      "area_code": "650402000000",
      "area_id": 3270 },
    {
      "area_name": "鄯善县",
      "area_code": "650421000000",
      "area_id": 3271 },
    {
      "area_name": "托克逊县",
      "area_code": "650422000000",
      "area_id": 3272 }],

    "city_id": 331 },
  {
    "city_name": "哈密市",
    "city_code": "650500000000",
    "city_areas": [{
      "area_name": "伊州区",
      "area_code": "650502000000",
      "area_id": 3273 },
    {
      "area_name": "巴里坤哈萨克自治县",
      "area_code": "650521000000",
      "area_id": 3274 },
    {
      "area_name": "伊吾县",
      "area_code": "650522000000",
      "area_id": 3275 }],

    "city_id": 332 },
  {
    "city_name": "昌吉回族自治州",
    "city_code": "652300000000",
    "city_areas": [{
      "area_name": "昌吉市",
      "area_code": "652301000000",
      "area_id": 3276 },
    {
      "area_name": "阜康市",
      "area_code": "652302000000",
      "area_id": 3277 },
    {
      "area_name": "呼图壁县",
      "area_code": "652323000000",
      "area_id": 3278 },
    {
      "area_name": "玛纳斯县",
      "area_code": "652324000000",
      "area_id": 3279 },
    {
      "area_name": "奇台县",
      "area_code": "652325000000",
      "area_id": 3280 },
    {
      "area_name": "吉木萨尔县",
      "area_code": "652327000000",
      "area_id": 3281 },
    {
      "area_name": "木垒哈萨克自治县",
      "area_code": "652328000000",
      "area_id": 3282 }],

    "city_id": 333 },
  {
    "city_name": "博尔塔拉蒙古自治州",
    "city_code": "652700000000",
    "city_areas": [{
      "area_name": "博乐市",
      "area_code": "652701000000",
      "area_id": 3283 },
    {
      "area_name": "阿拉山口市",
      "area_code": "652702000000",
      "area_id": 3284 },
    {
      "area_name": "精河县",
      "area_code": "652722000000",
      "area_id": 3285 },
    {
      "area_name": "温泉县",
      "area_code": "652723000000",
      "area_id": 3286 }],

    "city_id": 334 },
  {
    "city_name": "巴音郭楞蒙古自治州",
    "city_code": "652800000000",
    "city_areas": [{
      "area_name": "库尔勒市",
      "area_code": "652801000000",
      "area_id": 3287 },
    {
      "area_name": "轮台县",
      "area_code": "652822000000",
      "area_id": 3288 },
    {
      "area_name": "尉犁县",
      "area_code": "652823000000",
      "area_id": 3289 },
    {
      "area_name": "若羌县",
      "area_code": "652824000000",
      "area_id": 3290 },
    {
      "area_name": "且末县",
      "area_code": "652825000000",
      "area_id": 3291 },
    {
      "area_name": "焉耆回族自治县",
      "area_code": "652826000000",
      "area_id": 3292 },
    {
      "area_name": "和静县",
      "area_code": "652827000000",
      "area_id": 3293 },
    {
      "area_name": "和硕县",
      "area_code": "652828000000",
      "area_id": 3294 },
    {
      "area_name": "博湖县",
      "area_code": "652829000000",
      "area_id": 3295 },
    {
      "area_name": "库尔勒经济技术开发区",
      "area_code": "652871000000",
      "area_id": 3296 }],

    "city_id": 335 },
  {
    "city_name": "阿克苏地区",
    "city_code": "652900000000",
    "city_areas": [{
      "area_name": "阿克苏市",
      "area_code": "652901000000",
      "area_id": 3297 },
    {
      "area_name": "温宿县",
      "area_code": "652922000000",
      "area_id": 3298 },
    {
      "area_name": "库车县",
      "area_code": "652923000000",
      "area_id": 3299 },
    {
      "area_name": "沙雅县",
      "area_code": "652924000000",
      "area_id": 3300 },
    {
      "area_name": "新和县",
      "area_code": "652925000000",
      "area_id": 3301 },
    {
      "area_name": "拜城县",
      "area_code": "652926000000",
      "area_id": 3302 },
    {
      "area_name": "乌什县",
      "area_code": "652927000000",
      "area_id": 3303 },
    {
      "area_name": "阿瓦提县",
      "area_code": "652928000000",
      "area_id": 3304 },
    {
      "area_name": "柯坪县",
      "area_code": "652929000000",
      "area_id": 3305 }],

    "city_id": 336 },
  {
    "city_name": "克孜勒苏柯尔克孜自治州",
    "city_code": "653000000000",
    "city_areas": [{
      "area_name": "阿图什市",
      "area_code": "653001000000",
      "area_id": 3306 },
    {
      "area_name": "阿克陶县",
      "area_code": "653022000000",
      "area_id": 3307 },
    {
      "area_name": "阿合奇县",
      "area_code": "653023000000",
      "area_id": 3308 },
    {
      "area_name": "乌恰县",
      "area_code": "653024000000",
      "area_id": 3309 }],

    "city_id": 337 },
  {
    "city_name": "喀什地区",
    "city_code": "653100000000",
    "city_areas": [{
      "area_name": "喀什市",
      "area_code": "653101000000",
      "area_id": 3310 },
    {
      "area_name": "疏附县",
      "area_code": "653121000000",
      "area_id": 3311 },
    {
      "area_name": "疏勒县",
      "area_code": "653122000000",
      "area_id": 3312 },
    {
      "area_name": "英吉沙县",
      "area_code": "653123000000",
      "area_id": 3313 },
    {
      "area_name": "泽普县",
      "area_code": "653124000000",
      "area_id": 3314 },
    {
      "area_name": "莎车县",
      "area_code": "653125000000",
      "area_id": 3315 },
    {
      "area_name": "叶城县",
      "area_code": "653126000000",
      "area_id": 3316 },
    {
      "area_name": "麦盖提县",
      "area_code": "653127000000",
      "area_id": 3317 },
    {
      "area_name": "岳普湖县",
      "area_code": "653128000000",
      "area_id": 3318 },
    {
      "area_name": "伽师县",
      "area_code": "653129000000",
      "area_id": 3319 },
    {
      "area_name": "巴楚县",
      "area_code": "653130000000",
      "area_id": 3320 },
    {
      "area_name": "塔什库尔干塔吉克自治县",
      "area_code": "653131000000",
      "area_id": 3321 }],

    "city_id": 338 },
  {
    "city_name": "和田地区",
    "city_code": "653200000000",
    "city_areas": [{
      "area_name": "和田市",
      "area_code": "653201000000",
      "area_id": 3322 },
    {
      "area_name": "和田县",
      "area_code": "653221000000",
      "area_id": 3323 },
    {
      "area_name": "墨玉县",
      "area_code": "653222000000",
      "area_id": 3324 },
    {
      "area_name": "皮山县",
      "area_code": "653223000000",
      "area_id": 3325 },
    {
      "area_name": "洛浦县",
      "area_code": "653224000000",
      "area_id": 3326 },
    {
      "area_name": "策勒县",
      "area_code": "653225000000",
      "area_id": 3327 },
    {
      "area_name": "于田县",
      "area_code": "653226000000",
      "area_id": 3328 },
    {
      "area_name": "民丰县",
      "area_code": "653227000000",
      "area_id": 3329 }],

    "city_id": 339 },
  {
    "city_name": "伊犁哈萨克自治州",
    "city_code": "654000000000",
    "city_areas": [{
      "area_name": "伊宁市",
      "area_code": "654002000000",
      "area_id": 3330 },
    {
      "area_name": "奎屯市",
      "area_code": "654003000000",
      "area_id": 3331 },
    {
      "area_name": "霍尔果斯市",
      "area_code": "654004000000",
      "area_id": 3332 },
    {
      "area_name": "伊宁县",
      "area_code": "654021000000",
      "area_id": 3333 },
    {
      "area_name": "察布查尔锡伯自治县",
      "area_code": "654022000000",
      "area_id": 3334 },
    {
      "area_name": "霍城县",
      "area_code": "654023000000",
      "area_id": 3335 },
    {
      "area_name": "巩留县",
      "area_code": "654024000000",
      "area_id": 3336 },
    {
      "area_name": "新源县",
      "area_code": "654025000000",
      "area_id": 3337 },
    {
      "area_name": "昭苏县",
      "area_code": "654026000000",
      "area_id": 3338 },
    {
      "area_name": "特克斯县",
      "area_code": "654027000000",
      "area_id": 3339 },
    {
      "area_name": "尼勒克县",
      "area_code": "654028000000",
      "area_id": 3340 }],

    "city_id": 340 },
  {
    "city_name": "塔城地区",
    "city_code": "654200000000",
    "city_areas": [{
      "area_name": "塔城市",
      "area_code": "654201000000",
      "area_id": 3341 },
    {
      "area_name": "乌苏市",
      "area_code": "654202000000",
      "area_id": 3342 },
    {
      "area_name": "额敏县",
      "area_code": "654221000000",
      "area_id": 3343 },
    {
      "area_name": "沙湾县",
      "area_code": "654223000000",
      "area_id": 3344 },
    {
      "area_name": "托里县",
      "area_code": "654224000000",
      "area_id": 3345 },
    {
      "area_name": "裕民县",
      "area_code": "654225000000",
      "area_id": 3346 },
    {
      "area_name": "和布克赛尔蒙古自治县",
      "area_code": "654226000000",
      "area_id": 3347 }],

    "city_id": 341 },
  {
    "city_name": "阿勒泰地区",
    "city_code": "654300000000",
    "city_areas": [{
      "area_name": "阿勒泰市",
      "area_code": "654301000000",
      "area_id": 3348 },
    {
      "area_name": "布尔津县",
      "area_code": "654321000000",
      "area_id": 3349 },
    {
      "area_name": "富蕴县",
      "area_code": "654322000000",
      "area_id": 3350 },
    {
      "area_name": "福海县",
      "area_code": "654323000000",
      "area_id": 3351 },
    {
      "area_name": "哈巴河县",
      "area_code": "654324000000",
      "area_id": 3352 },
    {
      "area_name": "青河县",
      "area_code": "654325000000",
      "area_id": 3353 },
    {
      "area_name": "吉木乃县",
      "area_code": "654326000000",
      "area_id": 3354 }],

    "city_id": 342 },
  {
    "city_name": "自治区直辖县级行政区划",
    "city_code": "659000000000",
    "city_areas": [{
      "area_name": "石河子市",
      "area_code": "659001000000",
      "area_id": 3355 },
    {
      "area_name": "阿拉尔市",
      "area_code": "659002000000",
      "area_id": 3356 },
    {
      "area_name": "图木舒克市",
      "area_code": "659003000000",
      "area_id": 3357 },
    {
      "area_name": "五家渠市",
      "area_code": "659004000000",
      "area_id": 3358 },
    {
      "area_name": "铁门关市",
      "area_code": "659006000000",
      "area_id": 3359 }],

    "city_id": 343 }],

  "pro_code": "650000",
  "pro_id": 31,
  "pro_name": "新疆维吾尔自治区" }];var _default =


{
  areaList: areaList };exports.default = _default;

/***/ }),

/***/ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\main.js":
/*!***********************************************************************!*\
  !*** C:/Users/120412/Documents/HBuilderProjects/hello-uniapp/main.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, createApp) {__webpack_require__(/*! uni-pages */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\pages.json");
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));

var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\store\\index.js"));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\App.vue"));
var _http = _interopRequireDefault(__webpack_require__(/*! ./api/http.js */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\api\\http.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var msg = function msg(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;var mask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;var icon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'none';
  //统一提示方便全局修改
  if (Boolean(title) === false) {
    return;
  }
  uni.showToast({
    title: title,
    duration: duration,
    mask: mask,
    icon: icon });

};
var prePage = function prePage() {
  var pages = getCurrentPages();
  var prePage = pages[pages.length - 2];



  return prePage.$vm;
};

_vue.default.config.productionTip = false;

_App.default.mpType = 'app';

_vue.default.prototype.$store = _store.default;
_vue.default.prototype.$api = { msg: msg, prePage: prePage };
_vue.default.prototype.$http = _http.default;

var app = new _vue.default(_objectSpread({},
_App.default));

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createApp"]))

/***/ }),

/***/ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\main.js?{\"page\":\"pages%2Fcart%2Fcart\"}":
/*!******************************************************************************************************!*\
  !*** C:/Users/120412/Documents/HBuilderProjects/hello-uniapp/main.js?{"page":"pages%2Fcart%2Fcart"} ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _cart = _interopRequireDefault(__webpack_require__(/*! ./pages/cart/cart.vue */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\pages\\cart\\cart.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_cart.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\main.js?{\"page\":\"pages%2Fcategory%2Fcategory\"}":
/*!**************************************************************************************************************!*\
  !*** C:/Users/120412/Documents/HBuilderProjects/hello-uniapp/main.js?{"page":"pages%2Fcategory%2Fcategory"} ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _category = _interopRequireDefault(__webpack_require__(/*! ./pages/category/category.vue */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\pages\\category\\category.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_category.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\main.js?{\"page\":\"pages%2Findex%2Fguide\"}":
/*!********************************************************************************************************!*\
  !*** C:/Users/120412/Documents/HBuilderProjects/hello-uniapp/main.js?{"page":"pages%2Findex%2Fguide"} ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _guide = _interopRequireDefault(__webpack_require__(/*! ./pages/index/guide.vue */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\pages\\index\\guide.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_guide.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\main.js?{\"page\":\"pages%2Findex%2Findex\"}":
/*!********************************************************************************************************!*\
  !*** C:/Users/120412/Documents/HBuilderProjects/hello-uniapp/main.js?{"page":"pages%2Findex%2Findex"} ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/index/index.vue */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\pages\\index\\index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\main.js?{\"page\":\"pages%2Flogin%2Flogin\"}":
/*!********************************************************************************************************!*\
  !*** C:/Users/120412/Documents/HBuilderProjects/hello-uniapp/main.js?{"page":"pages%2Flogin%2Flogin"} ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _login = _interopRequireDefault(__webpack_require__(/*! ./pages/login/login.vue */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\pages\\login\\login.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_login.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\main.js?{\"page\":\"pages%2Fuser%2Fuser\"}":
/*!******************************************************************************************************!*\
  !*** C:/Users/120412/Documents/HBuilderProjects/hello-uniapp/main.js?{"page":"pages%2Fuser%2Fuser"} ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _user = _interopRequireDefault(__webpack_require__(/*! ./pages/user/user.vue */ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\pages\\user\\user.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_user.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\pages.json":
/*!**************************************************************************!*\
  !*** C:/Users/120412/Documents/HBuilderProjects/hello-uniapp/pages.json ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "C:\\Users\\120412\\Documents\\HBuilderProjects\\hello-uniapp\\store\\index.js":
/*!******************************************************************************!*\
  !*** C:/Users/120412/Documents/HBuilderProjects/hello-uniapp/store/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    hasLogin: false,
    userInfo: uni.getStorageSync('userInfo') || {},
    token: uni.getStorageSync('token') || '' },

  mutations: {
    login: function login(state, provider) {
      state.hasLogin = true;
      state.userInfo = provider;
      uni.setStorage({ //缓存用户登陆状态
        key: 'userInfo',
        data: provider });

    },
    setToken: function setToken(state, provider) {
      state.token = provider;
      uni.setStorage({ //缓存用户登陆状态
        key: 'token',
        data: provider });

    },
    loginOut: function loginOut(state) {
      state.hasLogin = false;
      state.userInfo = {};
      state.token = '';
      uni.removeStorage(_defineProperty({
        key: 'userInfo' }, "key",
      'token'));

    } },

  actions: {} });var _default =




store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["default"]))

/***/ })

}]);