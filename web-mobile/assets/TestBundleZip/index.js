System.register("chunks:///_virtual/back-to-asset-bundle-zip.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
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

      cclegacy._RF.push({}, "f41baua30VOAZvJNcu9E9KG", "back-to-asset-bundle-zip", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BackToAssetBundleZip = exports('BackToAssetBundleZip', (_dec = ccclass('BackToAssetBundleZip'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BackToAssetBundleZip, _Component);

        function BackToAssetBundleZip() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = BackToAssetBundleZip.prototype;

        _proto.onClick = function onClick() {
          director.loadScene('asset-bundle-zip');
        };

        return BackToAssetBundleZip;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TestBundleZip", ['./back-to-asset-bundle-zip.ts'], function () {
  'use strict';

  return {
    setters: [null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/TestBundleZip', 'chunks:///_virtual/TestBundleZip'); 
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