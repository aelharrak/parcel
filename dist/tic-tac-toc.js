// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({2:[function(require,module,exports) {
var playerPicto = ['X', 'O'];
var tour = 0;
var playerOne = 'guest 1';
var playerTwo = 'guest 2';

var players = [];

element(".one-player").addEventListener("click", function () {
    show('.play');
    hide('.control');
});

element(".next").addEventListener("click", function () {
    hide('.play');
    show('#stage');
    var playerOne = element('input[name="user-one"]').value !== '' || playerOne;
    players.push(playerOne);
    element('#message').innerHTML = 'Hello ' + playerOne;
});

function show(selector) {
    element(selector).style.display = 'block';
}
function hide(selector) {
    element(selector).style.display = 'none';
}

var buttons = document.querySelectorAll("#stage span");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        if (this.innerHTML !== 'X' && this.innerHTML !== 'O' && this.innerHTML !== ' - ' && searchWinner(playerPicto[tour % 2]) === false) {

            this.innerHTML = playerPicto[tour];
            if (searchWinner(this.innerHTML)) {
                element('#message').innerHTML = ' Stop Winner is  player ' + this.innerHTML + ' ! ';
                return false;
            }
            ++tour;
            tour = tour % 2;
            element('#message').innerHTML = "Joueur " + playerPicto[tour] + " c'est à vous !";
        }
    });
}

function searchWinner(player) {
    if (buttons[0].innerHTML === player && buttons[1].innerHTML === player && buttons[2].innerHTML === player || buttons[3].innerHTML === player && buttons[4].innerHTML === player && buttons[5].innerHTML === player || buttons[6].innerHTML === player && buttons[7].innerHTML === player && buttons[8].innerHTML === player || buttons[0].innerHTML === player && buttons[3].innerHTML === player && buttons[6].innerHTML === player || buttons[1].innerHTML === player && buttons[4].innerHTML === player && buttons[7].innerHTML === player || buttons[2].innerHTML === player && buttons[5].innerHTML === player && buttons[8].innerHTML === player || buttons[0].innerHTML === player && buttons[4].innerHTML === player && buttons[8].innerHTML === player || buttons[2].innerHTML === player && buttons[4].innerHTML === player && buttons[6].innerHTML === player) {
        return true;
    }
    return false;
}

var button = element("button[id=reset]");
button.addEventListener("click", function () {
    resetStage();
});

function resetStage() {
    var x = document.querySelectorAll("#stage span"),
        i = void 0;
    for (i = 0; i < x.length; i++) {
        x[i].innerHTML = "&nbsp;";
    }
}

function log(element) {
    console.log(element);
}

function element(selector) {
    return document.querySelector(selector);
}
},{}],3:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '29709' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[3,2])
//# sourceMappingURL=/dist/tic-tac-toc.map