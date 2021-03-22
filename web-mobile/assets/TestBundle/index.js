System.register("chunks:///_virtual/back-to-asset-bundle.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, director, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "08a78TLL5ZAp5sJNvOPvzaG", "back-to-asset-bundle", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BackToAssetBundle = exports('BackToAssetBundle', (_dec = ccclass('BackToAssetBundle'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BackToAssetBundle, _Component);

        function BackToAssetBundle() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = BackToAssetBundle.prototype;

        _proto.start = function start() {// Your initialization goes here.
        };

        _proto.onClick = function onClick() {
          director.loadScene('asset-bundle');
        };

        return BackToAssetBundle;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TestBundle", ['./back-to-asset-bundle.ts'], function () {
  'use strict';

  return {
    setters: [null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/TestBundle', 'chunks:///_virtual/TestBundle'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});