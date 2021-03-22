System.register("chunks:///_virtual/subScript01.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Label, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "b7bc1kcej9IAKuEsO63LZ0U", "subScript01", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var subScript01 = exports('subScript01', (_dec = ccclass("subScript01"), _dec2 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(subScript01, _Component);

        function subScript01() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "tips", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "backRoot", null);

          return _this;
        }

        var _proto = subScript01.prototype;

        _proto.start = function start() {
          // Your initialization goes here.
          this.backRoot = this.node.getParent().getChildByName('backRoot');

          if (this.backRoot) {
            this.backRoot.active = false;
          }

          console.log('subScript01 load finish');
          this.tips.string = "subScript01 load finish!";
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        _proto.backToList = function backToList() {
          if (this.backRoot) {
            this.backRoot.active = true;
          }

          director.loadScene('sub-packages');
        };

        return subScript01;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "tips", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/sub-pack-01", ['./subScript01.ts'], function () {
  'use strict';

  return {
    setters: [null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/sub-pack-01', 'chunks:///_virtual/sub-pack-01'); 
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