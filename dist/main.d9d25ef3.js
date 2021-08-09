// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
// console.log(111);
var defaultData = [{
  logo: "A",
  url: "https://www.acfun.cn"
}, {
  logo: "B",
  url: "https://www.bilibili.com"
}]; //取出来是字符串

var localData = window.localStorage.getItem("nav");
var navData = JSON.parse(localData) || defaultData;

var render = function render() {
  //渲染前先把有的删除掉
  $(".navList").find("li:not(.addButton)").remove();
  navData.forEach(function (element, index) {
    // console.log(element);
    var $li = $("<li class=\"navItem\">\n        <div class=\"itemWraper\">\n      <div class=\"buttonPic\">".concat(element.logo, "</div>\n      <div class=\"buttonText\">").concat(formatUrl(element.url), "</div>\n      <div class=\"close\"><svg class=\"icon\">\n      <use xlink:href=\"#icon-close\"></use>\n    </svg></div>\n    </div>\n  </li>")).insertBefore(".addButton");
    $li.on("click", function (e) {
      window.open(element.url);
    });
    $li.on("click", ".close", function (e) {
      e.stopPropagation();
      navData.splice(index, 1);
      render();
    });
  });
}; //去除url中的其他字符


var formatUrl = function formatUrl(url) {
  return url.replace("https://", "").replace("http://").replace("www.", "").replace("//.*/", "");
};

render(); // let a = "dfdfd";
// a.toUpperCase();

$(".addButton").on("click", function () {
  var url = window.prompt("输入需要保持的导航网址吧~");
  console.log(url);

  if (url.trim() === "" || !url) {
    return;
  }

  if (url.indexOf("https://") === -1) {
    url = "https://" + url;
  }

  navData.push({
    logo: formatUrl(url)[0].toUpperCase(),
    url: url
  });
  window.localStorage.setItem("nav", JSON.stringify(navData));
  render();
});

window.onbeforeunload = function () {
  window.localStorage.setItem("nav", JSON.stringify(navData));
};

$(document).on("keyup", function (e) {
  //   console.log(e.originalEvent.key);
  var key = e.originalEvent.key;
  navData.forEach(function (item) {
    if (key === item.logo.toLowerCase()) {
      window.open(item.url);
    }
  });
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.d9d25ef3.js.map