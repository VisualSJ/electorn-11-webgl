System.register("chunks:///_virtual/backbutton.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './scenelist.ts', './TestFramework.ts'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, CCString, CCInteger, Vec3, assetManager, profiler, Canvas, Layers, find, Label, game, ScrollView, director, Director, resources, JsonAsset, Layout, Component, sceneArray, TestFramework, ReceivedCode, StateCode;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCString = module.CCString;
      CCInteger = module.CCInteger;
      Vec3 = module.Vec3;
      assetManager = module.assetManager;
      profiler = module.profiler;
      Canvas = module.Canvas;
      Layers = module.Layers;
      find = module.find;
      Label = module.Label;
      game = module.game;
      ScrollView = module.ScrollView;
      director = module.director;
      Director = module.Director;
      resources = module.resources;
      JsonAsset = module.JsonAsset;
      Layout = module.Layout;
      Component = module.Component;
    }, function (module) {
      sceneArray = module.sceneArray;
    }, function (module) {
      TestFramework = module.TestFramework;
      ReceivedCode = module.ReceivedCode;
      StateCode = module.StateCode;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

      cclegacy._RF.push({}, "022e0824UxEDY4MQ1JBg2L7", "backbutton", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BackButton = exports('BackButton', (_dec = ccclass("BackButton"), _dec2 = property(CCString), _dec3 = property(CCInteger), _dec4 = property(CCInteger), _dec5 = property(CCInteger), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BackButton, _Component);

        function BackButton() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "testServerAddress", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "testServerPort", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "timeout", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "retryTime", _descriptor4, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "autoTest", false);

          return _this;
        }

        var _proto = BackButton.prototype;

        _proto.__preload = function __preload() {
          var sceneInfo = assetManager.main.config.scenes;
          var array = [];
          sceneInfo.forEach(function (i) {
            return array.push(i.url);
          });
          array.sort();

          for (var i = 0; i < array.length; i++) {
            var str = array[i];

            if (str.includes('TestList') || str.includes('subPack') || str.includes('static-ui-replace')) {
              continue;
            }

            if (str.includes('asset-bundle-zip') && !assetManager.downloader.remoteServerAddress) {
              continue;
            }

            var firstIndex = str.lastIndexOf('/') + 1;
            var lastIndex = str.lastIndexOf('.scene');
            sceneArray.push(str.substring(firstIndex, lastIndex));
          }
        };

        _proto.manuallyControl = function manuallyControl() {
          this.node.getChildByName('PrevButton').active = true;
          this.node.getChildByName('NextButton').active = true;
          this.node.getChildByName('back').active = true;
          profiler.showStats();
        };

        _proto.autoControl = function autoControl() {
          this.node.getChildByName('PrevButton').active = false;
          this.node.getChildByName('NextButton').active = false;
          this.node.getChildByName('back').active = false;
          profiler.hideStats();
        };

        BackButton.saveOffset = function saveOffset() {
          if (BackButton._scrollNode) {
            BackButton._offset = new Vec3(0, BackButton._scrollCom.getScrollOffset().y, 0);
          }
        };

        BackButton.saveIndex = function saveIndex(index) {
          BackButton._sceneIndex = index;
          BackButton.refreshButton();
        };

        BackButton.refreshButton = function refreshButton() {
          if (BackButton._sceneIndex === -1) {
            BackButton._prevNode.active = false;
            BackButton._nextNode.active = false;
          } else {
            BackButton._prevNode.active = true;
            BackButton._nextNode.active = true;
          }
        };

        _proto.start = function start() {
          var _this2 = this;

          var camera = this.node.getComponent(Canvas).cameraComponent;
          if (camera.visibility & Layers.Enum.UI_2D) camera.visibility &= ~Layers.Enum.UI_2D;
          this.sceneName = find("backRoot").getChildByName("sceneName").getComponent(Label);
          game.addPersistRootNode(this.node);
          BackButton._scrollNode = this.node.getParent().getChildByPath('Canvas/ScrollView');

          if (BackButton._scrollNode) {
            BackButton._scrollCom = BackButton._scrollNode.getComponent(ScrollView);
          }

          BackButton._blockInput = this.node.getChildByName('BlockInput');
          BackButton._blockInput.active = false;
          BackButton._prevNode = this.node.getChildByName('PrevButton');
          BackButton._nextNode = this.node.getChildByName('NextButton');

          if (BackButton._prevNode && BackButton._nextNode) {
            BackButton.refreshButton();
          }

          director.on(Director.EVENT_BEFORE_SCENE_LOADING, this.switchSceneName, this);
          TestFramework.instance.connect(this.testServerAddress, this.testServerPort, this.timeout, this.retryTime, function (err) {
            if (err) {
              _this2.autoTest = false;
            } else {
              TestFramework.instance.startTest({
                time: Date.now()
              }, function (err) {
                if (err) {
                  _this2.autoTest = false;
                } else {
                  _this2.autoTest = true;

                  _this2.autoControl();

                  TestFramework.instance.onmessage = function (state, message) {
                    if (state === ReceivedCode.CHANGE_SCENE) {
                      _this2.nextScene();
                    }
                  };

                  resources.load('auto-test-list', JsonAsset, function (err, asset) {
                    var staticScenes = asset.json["static-scenes"];
                    var testList = sceneArray.filter(function (x) {
                      return staticScenes.indexOf(x) !== -1;
                    });
                    sceneArray.length = 0;
                    sceneArray.push.apply(sceneArray, testList);

                    _this2.nextScene();
                  });
                }
              });
            }
          });
        };

        _proto.onDestroy = function onDestroy() {
          var length = sceneArray.length;

          for (var i = 0; i < length; i++) {
            sceneArray.pop();
          }
        };

        _proto.switchSceneName = function switchSceneName() {
          if (this.getSceneName() == null) {
            return;
          }

          this.sceneName.node.active = true;
          this.sceneName.string = this.getSceneName();
        };

        _proto.backToList = function backToList() {
          var _this3 = this;

          director.resume();
          BackButton._blockInput.active = true;
          director.loadScene('TestList', function () {
            _this3.sceneName.node.active = false;
            BackButton._sceneIndex = -1;
            BackButton.refreshButton();
            BackButton._scrollNode = _this3.node.parent.getChildByPath('Canvas/ScrollView');

            if (BackButton._scrollNode) {
              BackButton._scrollCom = BackButton._scrollNode.getComponent(ScrollView);

              BackButton._scrollCom.content.getComponent(Layout).updateLayout();

              BackButton._scrollCom.scrollToOffset(BackButton.offset, 0.1, true);
            }

            BackButton._blockInput.active = false;
          });
        };

        _proto.nextScene = function nextScene() {
          var _this4 = this;

          director.resume();
          BackButton._blockInput.active = true;
          this.updateSceneIndex(true);
          director.loadScene(this.getSceneName(), function () {
            if (_this4.autoTest) {
              TestFramework.instance.postMessage(StateCode.SCENE_CHANGED, _this4.getSceneName(), '', function (err) {
                if (err) {
                  _this4.manuallyControl();
                } else if (BackButton._sceneIndex === sceneArray.length - 1) {
                  TestFramework.instance.endTest('', function () {
                    _this4.manuallyControl();
                  });
                } else {
                  _this4.nextScene();
                }
              });
            }

            BackButton._blockInput.active = false;
          });
        };

        _proto.preScene = function preScene() {
          director.resume();
          BackButton._blockInput.active = true;
          this.updateSceneIndex(false);
          director.loadScene(this.getSceneName(), function () {
            BackButton._blockInput.active = false;
          });
        };

        _proto.updateSceneIndex = function updateSceneIndex(next) {
          if (next) {
            BackButton._sceneIndex + 1 >= sceneArray.length ? BackButton._sceneIndex = 0 : BackButton._sceneIndex += 1;
          } else {
            BackButton._sceneIndex - 1 < 0 ? BackButton._sceneIndex = sceneArray.length - 1 : BackButton._sceneIndex -= 1;
          }
        };

        _proto.getSceneName = function getSceneName() {
          return sceneArray[BackButton._sceneIndex];
        };

        _createClass(BackButton, null, [{
          key: "offset",
          get: function get() {
            return BackButton._offset;
          },
          set: function set(value) {
            BackButton._offset = value;
          }
        }]);

        return BackButton;
      }(Component), _defineProperty(_class3, "_offset", new Vec3()), _defineProperty(_class3, "_scrollNode", null), _defineProperty(_class3, "_scrollCom", null), _defineProperty(_class3, "_sceneIndex", -1), _defineProperty(_class3, "_blockInput", void 0), _defineProperty(_class3, "_prevNode", void 0), _defineProperty(_class3, "_nextNode", void 0), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "testServerAddress", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '127.0.0.1';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "testServerPort", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 8080;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "timeout", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5000;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "retryTime", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/graphics-continuous-filling.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, Vec2, Vec3, Node, Graphics, UITransform, math, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec2 = module.Vec2;
      Vec3 = module.Vec3;
      Node = module.Node;
      Graphics = module.Graphics;
      UITransform = module.UITransform;
      math = module.math;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "027fazjnA9F8bfae44tQFpj", "graphics-continuous-filling", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var temp_vec2 = new Vec2();
      var GraphicsContinuousFilling = exports('GraphicsContinuousFilling', (_dec = ccclass('GraphicsContinuousFilling'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GraphicsContinuousFilling, _Component);

        function GraphicsContinuousFilling() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "pos", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "worldPos", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "graphics", null);

          _defineProperty(_assertThisInitialized(_this), "minX", 0);

          _defineProperty(_assertThisInitialized(_this), "minY", 0);

          _defineProperty(_assertThisInitialized(_this), "maxX", 0);

          _defineProperty(_assertThisInitialized(_this), "maxY", 0);

          return _this;
        }

        var _proto = GraphicsContinuousFilling.prototype;

        _proto.start = function start() {
          var _this$getComponent;

          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.graphics = this.getComponent(Graphics);
          var trans = this.getComponent(UITransform);
          var wPos = (_this$getComponent = this.getComponent(UITransform)) === null || _this$getComponent === void 0 ? void 0 : _this$getComponent.convertToWorldSpaceAR(new Vec3(), this.worldPos);
          this.minX = -trans.anchorX * trans.width + wPos.x;
          this.maxX = (1 - trans.anchorX) * trans.width + wPos.x;
          this.minY = -trans.anchorY * trans.height + wPos.y;
          this.maxY = (1 - trans.anchorY) * trans.height + wPos.y;
          this.graphics.lineWidth = 10;
        };

        _proto.onDestroy = function onDestroy() {
          this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        };

        _proto.onTouchStart = function onTouchStart(touch, event) {
          touch.getUILocation(temp_vec2);
          var x = math.clamp(temp_vec2.x, this.minX, this.maxX);
          var y = math.clamp(temp_vec2.y, this.minY, this.maxY);
          this.pos.set(x - this.worldPos.x, y - this.worldPos.y, 0);
        };

        _proto.onTouchMove = function onTouchMove(touch, event) {
          this.graphics.moveTo(this.pos.x, this.pos.y);
          touch.getUILocation(temp_vec2);
          var x = math.clamp(temp_vec2.x, this.minX, this.maxX);
          var y = math.clamp(temp_vec2.y, this.minY, this.maxY);
          this.pos.set(x - this.worldPos.x, y - this.worldPos.y, 0);
          this.graphics.lineTo(this.pos.x, this.pos.y);
          this.graphics.stroke();
        };

        _proto.clear = function clear() {
          this.graphics.clear();
        };

        return GraphicsContinuousFilling;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Utils.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('isEmptyObject', isEmptyObject);

      cclegacy._RF.push({}, "04e49novIVI34Kk+WZjsnZW", "Utils", undefined);

      function isEmptyObject(obj) {
        for (var i in obj) {
          return false;
        }

        return true;
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/use-render-texture-asset.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, RenderTexture, Sprite, Camera, SpriteFrame, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      RenderTexture = module.RenderTexture;
      Sprite = module.Sprite;
      Camera = module.Camera;
      SpriteFrame = module.SpriteFrame;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "07d94W9KPNNpZuDMYnjBRSX", "use-render-texture-asset", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var UseRenderTextureAsset = exports('UseRenderTextureAsset', (_dec = ccclass("UseRenderTextureAsset"), _dec2 = menu('RenderTexture/UseRenderTextureAsset'), _dec3 = property(RenderTexture), _dec4 = property(Sprite), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UseRenderTextureAsset, _Component);

        function UseRenderTextureAsset() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "render", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "content", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = UseRenderTextureAsset.prototype;

        _proto.start = function start() {
          var renderTex = this.render;
          var camera = this.getComponent(Camera);
          camera.targetTexture = renderTex;
          var spriteFrame = this.content.spriteFrame;
          var sp = new SpriteFrame();
          sp.reset({
            originalSize: spriteFrame.originalSize,
            rect: spriteFrame.rect,
            offset: spriteFrame.offset,
            isRotate: spriteFrame.rotated
          });
          sp.texture = renderTex;
          this.content.spriteFrame = sp;
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return UseRenderTextureAsset;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "render", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/pauseButton.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
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

      cclegacy._RF.push({}, "0c9580onAlEC7RVsSoBOlCI", "pauseButton", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var button = exports('button', (_dec = ccclass("button"), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(button, _Component);

        function button() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = button.prototype;

        _proto.onPause = function onPause() {
          director.pause();
        };

        _proto.onResume = function onResume() {
          director.resume();
        };

        return button;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/static-batcher.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Node, Label, BatchingUtility, Component;

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
      Node = module.Node;
      Label = module.Label;
      BatchingUtility = module.BatchingUtility;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "0dbb7y1BqdBcpQru04GUrg1", "static-batcher", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var StaticBatcher = exports('StaticBatcher', (_dec = ccclass('StaticBatcher'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(StaticBatcher, _Component);

        function StaticBatcher() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "staticNode", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "buttonLabel", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_batched", false);

          return _this;
        }

        var _proto = StaticBatcher.prototype;

        _proto.onBtnClick = function onBtnClick() {
          if (this._batched) {
            BatchingUtility.unbatchStaticModel(this.staticNode, this.node);
            this._batched = false;
            this.buttonLabel.string = 'Batch';
          } else {
            BatchingUtility.batchStaticModel(this.staticNode, this.node);
            this._batched = true;
            this.buttonLabel.string = 'Unbatch';
          }
        };

        return StaticBatcher;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "staticNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "buttonLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/slider-ctrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, Color, Sprite, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      Sprite = module.Sprite;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _temp;

      cclegacy._RF.push({}, "0dc81FpNV1Gu7PzuHGs1FyN", "slider-ctrl", undefined);

      var ccclass = _decorator.ccclass,
          menu = _decorator.menu;
      var SliderCtrl = exports('SliderCtrl', (_dec = ccclass("SliderCtrl"), _dec2 = menu('UI/SliderCtrl'), _dec(_class = _dec2(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SliderCtrl, _Component);

        function SliderCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_color", new Color());

          return _this;
        }

        var _proto = SliderCtrl.prototype;

        _proto.start = function start() {// Your initialization goes here.
        };

        _proto.changeAlpha = function changeAlpha(slider) {
          var spriteComp = this.getComponent(Sprite);

          this._color.set(spriteComp.color);

          this._color.a = slider.progress * 255;
          spriteComp.color = this._color;
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return SliderCtrl;
      }(Component), _temp)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/changeUniform.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Vec4, Sprite, Component;

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
      Vec4 = module.Vec4;
      Sprite = module.Sprite;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "0e601yHzVhLwYhF9dgYNzIT", "changeUniform", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ChangeUniform = exports('ChangeUniform', (_dec = ccclass('ChangeUniform'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ChangeUniform, _Component);

        function ChangeUniform() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "startTime", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "intervalTime", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "spriteCom", null);

          _defineProperty(_assertThisInitialized(_this), "materialIns", null);

          _defineProperty(_assertThisInitialized(_this), "cha", false);

          _defineProperty(_assertThisInitialized(_this), "color", new Vec4(1, 1, 1, 1));

          return _this;
        }

        var _proto = ChangeUniform.prototype;

        _proto.start = function start() {
          // Your initialization goes here.
          this.cha = false;
          this.spriteCom = this.node.getComponent(Sprite); // this.materialIns = this.spriteCom.sharedMaterial;

          this.materialIns = this.spriteCom.material;
          this.schedule(this.changeUni, this.intervalTime, 1000, this.startTime);
        };

        _proto.changeUni = function changeUni() {
          if (this.cha) {
            this.color.set(1, 1, 0, 1);
          } else {
            this.color.set(1, 1, 1, 1);
          }

          this.materialIns.setProperty('mainColor', this.color);
          this.cha = !this.cha;
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return ChangeUniform;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "startTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "intervalTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IntersectRayTest.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Label, Prefab, Camera, geometry, Node, instantiate, MeshRenderer, systemEvent, SystemEventType, Vec3, GFXAttributeName, Vec2, Color, Component;

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
      Prefab = module.Prefab;
      Camera = module.Camera;
      geometry = module.geometry;
      Node = module.Node;
      instantiate = module.instantiate;
      MeshRenderer = module.MeshRenderer;
      systemEvent = module.systemEvent;
      SystemEventType = module.SystemEventType;
      Vec3 = module.Vec3;
      GFXAttributeName = module.GFXAttributeName;
      Vec2 = module.Vec2;
      Color = module.Color;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "107d8RVVo1LYoC6nEcHgFgp", "IntersectRayTest", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property; // const { Model } = renderer.scene

      var map = {};
      var IntersectRayTest = exports('IntersectRayTest', (_dec = ccclass('IntersectRayTest'), _dec2 = property({
        type: Label
      }), _dec3 = property({
        type: Prefab
      }), _dec4 = property({
        type: Camera
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(IntersectRayTest, _Component);

        function IntersectRayTest() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "tips", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "point", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "mainCamera", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_ray", new geometry.Ray());

          _defineProperty(_assertThisInitialized(_this), "_modelComps", []);

          _defineProperty(_assertThisInitialized(_this), "_points", []);

          return _this;
        }

        var _proto = IntersectRayTest.prototype;

        _proto.onLoad = function onLoad() {
          this._container = new Node('_TEST_');
          this.node.scene.addChild(this._container);

          this._points.push(instantiate(this.point));

          this._points.push(instantiate(this.point));

          this._points.push(instantiate(this.point));

          this._container.addChild(this._points[0]);

          this._container.addChild(this._points[1]);

          this._container.addChild(this._points[2]);

          this._points[0].active = false;
          this._points[1].active = false;
          this._points[2].active = false;
          this._modelComps = this.getComponentsInChildren(MeshRenderer);
        };

        _proto.onEnable = function onEnable() {
          systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
        };

        _proto.onDisable = function onDisable() {
          systemEvent.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
        };

        _proto.onTouchStart = function onTouchStart(touch, event) {
          this._points[0].active = false;
          this._points[1].active = false;
          this._points[2].active = false;
          var loc = touch.getLocation();
          this.mainCamera.screenPointToRay(loc.x, loc.y, this._ray);

          for (var i = 0; i < this._modelComps.length; i++) {
            var mo = this._modelComps[i].model;
            var me = this._modelComps[i].mesh;
            var opt = {
              'mode': geometry.ERaycastMode.CLOSEST,
              'distance': Infinity,
              'result': [],
              'subIndices': [],
              'doubleSided': false
            };
            var dis = geometry.intersect.rayModel(this._ray, mo, opt);

            if (dis) {
              console.log(mo.node.name, dis);

              if (mo.node.name == 'Cube') {
                map['Cube'] = dis;
              } else if (mo.node.name == 'Cube-non-uniform-scaled') {
                map['Cube-non-uniform-scaled'] = dis;
              }

              var r_cube = map['Cube'];
              var r_cube_nus = map['Cube-non-uniform-scaled'];
              if (r_cube && r_cube_nus) this.testEquals(r_cube, r_cube_nus, 4);
              var r = opt.result;
              var s = opt.subIndices; // test dis is equals result[0]

              this.testEquals(dis, r[0].distance, 0);

              if (me.subMeshCount == 1) {
                var vertex = new Vec3();
                var pos = me.renderingSubMeshes[0].geometricInfo.positions;
                var posIndex = r[0].vertexIndex0 * 3;
                vertex.set(pos[posIndex], pos[posIndex + 1], pos[posIndex + 2]);
                Vec3.transformMat4(vertex, vertex, mo.node.worldMatrix);

                this._points[0].setWorldPosition(vertex);

                posIndex = r[0].vertexIndex1 * 3;
                vertex.set(pos[posIndex], pos[posIndex + 1], pos[posIndex + 2]);
                Vec3.transformMat4(vertex, vertex, mo.node.worldMatrix);

                this._points[1].setWorldPosition(vertex);

                posIndex = r[0].vertexIndex2 * 3;
                vertex.set(pos[posIndex], pos[posIndex + 1], pos[posIndex + 2]);
                Vec3.transformMat4(vertex, vertex, mo.node.worldMatrix);

                this._points[2].setWorldPosition(vertex);

                this._points[0].active = true;
                this._points[1].active = true;
                this._points[2].active = true;
                /**GET UV  */

                var tex_coord = me.readAttribute(s[0], GFXAttributeName.ATTR_TEX_COORD);

                if (tex_coord) {
                  var uv = new Vec2();
                  var uvIndex = r[0].vertexIndex0 * 2;
                  uv.set(tex_coord[uvIndex], tex_coord[uvIndex + 1]);
                  console.log(JSON.stringify(uv));
                  uvIndex = r[0].vertexIndex1 * 2;
                  uv.set(tex_coord[uvIndex], tex_coord[uvIndex + 1]);
                  console.log(JSON.stringify(uv));
                  uvIndex = r[0].vertexIndex2 * 2;
                  uv.set(tex_coord[uvIndex], tex_coord[uvIndex + 1]);
                  console.log(JSON.stringify(uv));
                }
              } else {
                var hitPoint = new Vec3();

                this._ray.computeHit(hitPoint, r[0].distance);

                this._points[0].setWorldPosition(hitPoint);

                this._points[0].active = true;
              }
            }
          }
        };

        _proto.testEquals = function testEquals(a, b, precision) {
          if (Math.abs(a - b) > precision) {
            this.tips.string = "请建立 issue 并截图。" + ("Math.abs(" + a.toPrecision(3) + " - " + b.toPrecision(3) + ") > " + precision);
            this.tips.color = Color.RED;
          }
        };

        return IntersectRayTest;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tips", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "point", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "mainCamera", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/coordinate-ui-local-local.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Enum, Label, Node, Vec3, UITransform, Component;

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
      Enum = module.Enum;
      Label = module.Label;
      Node = module.Node;
      Vec3 = module.Vec3;
      UITransform = module.UITransform;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "11114hQBC1PGK1Ap1XNGEjC", "coordinate-ui-local-local", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var ConvertType;

      (function (ConvertType) {
        ConvertType[ConvertType["LOCAL"] = 0] = "LOCAL";
        ConvertType[ConvertType["WORLD"] = 1] = "WORLD";
      })(ConvertType || (ConvertType = {}));

      Enum(ConvertType);
      var CoordinateUILocalLocal = exports('CoordinateUILocalLocal', (_dec = ccclass("CoordinateUILocalLocal"), _dec2 = menu('UI/CoordinateUILocalLocal'), _dec3 = property({
        type: ConvertType
      }), _dec4 = property(Label), _dec5 = property(Node), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CoordinateUILocalLocal, _Component);

        function CoordinateUILocalLocal() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "convertType", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "showLabel", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "aim", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_time", 0);

          _defineProperty(_assertThisInitialized(_this), "_transform", null);

          _defineProperty(_assertThisInitialized(_this), "_aimTransform", null);

          _defineProperty(_assertThisInitialized(_this), "_out", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_fixPoint", new Vec3(100, 100, 0));

          return _this;
        }

        var _proto = CoordinateUILocalLocal.prototype;

        _proto.start = function start() {
          this._transform = this.getComponent(UITransform);
          this._aimTransform = this.aim.getComponent(UITransform);
        };

        _proto.update = function update(deltaTime) {
          var pos = this.node.position;

          if (this._time >= 0.2) {
            if (pos.x > 200) {
              this.node.setPosition(-200, pos.y, pos.z);
            } else {
              this.node.setPosition(pos.x + 5, pos.y, pos.z);
            }

            this._time = 0;
          }

          this._time += deltaTime;

          if (this.convertType === ConvertType.LOCAL) {
            pos = this.node.worldPosition;

            this._aimTransform.convertToNodeSpaceAR(pos, this._out);

            this.showLabel.string = "\u91D1\u5E01\u4F4D\u7F6E\u4E0E\u4E0B\u65B9\u56FE\u6807\u4F4D\u7F6E\u8DDD\u79BB 5 \u7684\u500D\u6570\uFF1A" + this._out.toString();
          } else {
            this._transform.convertToWorldSpaceAR(this._fixPoint, this._out);

            this.showLabel.string = "\u521D\u59CB\u4E0E\u91D1\u5E01 x \u8F74\u76F8\u8DDD 100 \u7684\u70B9\u7684\u4E16\u754C\u5750\u6807\n\u5B9E\u9645\u89C2\u5BDF\u6BCF\u6B21\u5750\u6807 x \u8F74\u5DEE\u503C\u4E3A 5\uFF1A" + this._out.toString();
          }
        };

        return CoordinateUILocalLocal;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "convertType", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ConvertType.LOCAL;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "showLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "aim", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TestFramework.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Client.ts', './Utils.ts'], function (exports) {
  'use strict';

  var _createClass, _defineProperty, cclegacy, Client, isEmptyObject;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Client = module.Client;
    }, function (module) {
      isEmptyObject = module.isEmptyObject;
    }],
    execute: function () {
      exports({
        ReceivedCode: void 0,
        StateCode: void 0
      });

      cclegacy._RF.push({}, "123f32xQl9OcIs4nIjjgO2A", "TestFramework", undefined);

      var StateCode;

      (function (StateCode) {
        StateCode["START"] = "Start";
        StateCode["ERROR"] = "Error";
        StateCode["END"] = "End";
        StateCode["SCENE_CHANGED"] = "SceneChanged";
        StateCode["PERFORMANCE"] = "Performance";
      })(StateCode || (StateCode = exports('StateCode', {})));

      var ReceivedCode;

      (function (ReceivedCode) {
        ReceivedCode["FAILED"] = "Failed";
        ReceivedCode["ERROR"] = "Error";
        ReceivedCode["Pass"] = "Pass";
        ReceivedCode["OK"] = "Ok";
        ReceivedCode["CHANGE_SCENE"] = "ChangeScene";
      })(ReceivedCode || (ReceivedCode = exports('ReceivedCode', {})));

      var TestFramework = exports('TestFramework', /*#__PURE__*/function () {
        function TestFramework() {
          _defineProperty(this, "onmessage", null);

          _defineProperty(this, "_timeout", 5000);

          _defineProperty(this, "_maxRetryTime", 3);

          _defineProperty(this, "_client", null);

          _defineProperty(this, "_eventQueue", {});

          _defineProperty(this, "_msgId", 0);

          _defineProperty(this, "_timeoutTimer", 0);
        }

        var _proto = TestFramework.prototype;

        _proto.connect = function connect(address, port, timeout, maxRetryTime, cb) {
          var _this = this;

          if (address === void 0) {
            address = '127.0.0.1';
          }

          if (port === void 0) {
            port = 8080;
          }

          if (timeout === void 0) {
            timeout = 5000;
          }

          if (maxRetryTime === void 0) {
            maxRetryTime = 3;
          }

          this._maxRetryTime = maxRetryTime;
          this._timeout = timeout;
          this._client = new Client(address, port);
          var timer = setTimeout(function () {
            _this._client.close();

            cb(new Error('connect failed'));
          }, timeout);

          this._client.onopen = function () {
            _this._client.onopen = null;
            clearTimeout(timer);
            cb(null);
          };

          this._client.onmessage = function (event) {
            var _JSON$parse = JSON.parse(event.data),
                id = _JSON$parse.id,
                state = _JSON$parse.state,
                message = _JSON$parse.message;

            var testEvent = _this._eventQueue[id];
            delete _this._eventQueue[id];

            if (testEvent) {
              testEvent.cb(state !== ReceivedCode.OK && state !== ReceivedCode.Pass ? new Error('Failed') : null, message);
            }

            _this.onmessage && _this.onmessage(state, message);
          };
        };

        _proto.startTest = function startTest(message, cb) {
          this.postMessage(StateCode.START, '', message, cb);
        };

        _proto.postMessage = function postMessage(state, sceneName, message, cb) {
          var _this2 = this;

          if (sceneName === void 0) {
            sceneName = '';
          }

          var msgId = ++this._msgId;
          this._eventQueue[msgId] = {
            id: msgId,
            state: state,
            sceneName: sceneName,
            message: message,
            cb: cb,
            startTime: Date.now(),
            retry: 0
          };

          if (!this._timeoutTimer) {
            this._timeoutTimer = setInterval(function () {
              var now = Date.now();

              for (var id in _this2._eventQueue) {
                var event = _this2._eventQueue[id];

                if (now - event.startTime > _this2._timeout) {
                  if (event.retry > _this2._maxRetryTime) {
                    delete _this2._eventQueue[id];
                    event.cb(new Error('connection disconected'));
                  } else {
                    event.retry++;
                    event.startTime = Date.now();

                    _this2._client.postMessage({
                      id: event.id,
                      state: event.state,
                      sceneName: event.sceneName,
                      message: event.message,
                      time: Date.now()
                    });
                  }
                }
              }

              if (isEmptyObject(_this2._eventQueue)) {
                clearInterval(_this2._timeoutTimer);
                _this2._timeoutTimer = 0;
              }
            }, 200);
          }

          this._client.postMessage({
            id: msgId,
            state: state,
            sceneName: sceneName,
            message: message,
            time: Date.now()
          });
        };

        _proto.endTest = function endTest(message, cb) {
          this.postMessage(StateCode.END, '', message, cb);
        };

        _proto.disconnect = function disconnect() {
          this._client.close();
        };

        _createClass(TestFramework, null, [{
          key: "instance",
          get: function get() {
            if (!TestFramework._instance) {
              TestFramework._instance = new TestFramework();
            }

            return TestFramework._instance;
          }
        }]);

        return TestFramework;
      }());

      _defineProperty(TestFramework, "_instance", null);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/asset-bundle-zip.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Label, Node, assetManager, log, Texture2D, Sprite, SpriteFrame, AudioClip, AudioSource, director, Component;

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
      Node = module.Node;
      assetManager = module.assetManager;
      log = module.log;
      Texture2D = module.Texture2D;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      AudioClip = module.AudioClip;
      AudioSource = module.AudioSource;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "14a26xCrOlOiZGaqGY0Vbto", "asset-bundle-zip", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AssetBundleZip = exports('AssetBundleZip', (_dec = ccclass('AssetBundleZip'), _dec2 = property(Label), _dec3 = property(Node), _dec4 = property({
        type: [Label]
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AssetBundleZip, _Component);

        function AssetBundleZip() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "loadTips", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "showWindow", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "labels", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_audioSource", null);

          _defineProperty(_assertThisInitialized(_this), "_isLoading", false);

          return _this;
        }

        var _proto = AssetBundleZip.prototype; // LIFE-CYCLE CALLBACKS:

        _proto.onLoad = function onLoad() {
          var testBundle = assetManager.getBundle('TestBundleZip');

          if (testBundle) {
            this.labels[0].string = "已加载";
          }
        };

        _proto.onClickBundle = function onClickBundle() {
          var _this2 = this;

          var testBundle = assetManager.getBundle('TestBundleZip');

          if (testBundle || this._isLoading) {
            return;
          }

          this._onClear();

          this._isLoading = true;
          this.loadTips.string = "Bundle Loading....";
          assetManager.loadBundle('TestBundleZip', function (err) {
            if (err) {
              log('Error url [' + err + ']');
              return;
            }

            _this2._isLoading = false;
            _this2.loadTips.string = "Bundle loaded Successfully!";
            _this2.labels[0].string = "已加载";
          });
        };

        _proto.onClickTexture = function onClickTexture() {
          var _this3 = this;

          if (this._isLoading) return;
          var testBundle = assetManager.getBundle('TestBundleZip');

          if (!testBundle) {
            this.loadTips.string = "操作失败，请先加载 Asset Bundle";
            return;
          }

          this._onClear();

          this._isLoading = true;
          this.loadTips.string = "Texture Loading....";
          testBundle.load("content/texture", Texture2D, function (err, asset) {
            if (err) {
              log('Error url [' + err + ']');
              return;
            }

            _this3._isLoading = false;
            _this3.loadTips.string = "";
            var node = new Node("New Node");
            node.setPosition(0, 0);
            var component = node.addComponent(Sprite);
            var sp = new SpriteFrame();
            sp.texture = asset;
            component.spriteFrame = sp;
            _this3.labels[1].string = "已加载";

            _this3.showWindow.addChild(node);
          });
        };

        _proto.onClickAudio = function onClickAudio() {
          var _this4 = this;

          if (this._isLoading) return;
          var testBundle = assetManager.getBundle('TestBundleZip');

          if (!testBundle) {
            this.loadTips.string = "操作失败，请先加载 Asset Bundle";
            return;
          }

          this._onClear();

          this._isLoading = true;
          this.loadTips.string = "Audio Loading....";
          testBundle.load("audio", AudioClip, function (err, asset) {
            if (err) {
              log('Error url [' + err + ']');
              return;
            }

            _this4._isLoading = false;
            _this4.loadTips.string = "";
            var node = new Node("New Node");
            node.setPosition(0, 0);
            var component = node.addComponent(AudioSource);
            component.clip = asset;
            component.play();
            _this4._audioSource = component;
            _this4.loadTips.string = "播放音乐";
            _this4.labels[2].string = "已加载";

            _this4.showWindow.addChild(node);
          });
        };

        _proto.onClickScene = function onClickScene() {
          var _this5 = this;

          if (this._isLoading) return;
          var testBundle = assetManager.getBundle('TestBundleZip');

          if (!testBundle) {
            this.loadTips.string = "操作失败，请先加载 Asset Bundle";
            return;
          }

          this._onClear();

          this._isLoading = true;
          this.loadTips.string = "Scene Loading....";
          testBundle.loadScene("sub-scene", function (err, asset) {
            if (err) {
              log('Error url [' + err + ']');
              return;
            }

            _this5._isLoading = false;
            _this5.loadTips.string = "";
            director.runScene(asset);
          });
        };

        _proto.onClickDestroy = function onClickDestroy() {
          if (this._isLoading) return;
          var testBundle = assetManager.getBundle('TestBundleZip');

          if (!testBundle) {
            this.loadTips.string = "操作失败，请先加载 Asset Bundle";
            return;
          }

          this._onClear();

          assetManager.removeBundle(testBundle);
          this.loadTips.string = "分包已被销毁";
          this.labels[0].string = "加载 Asset Bundle";
          this.labels[1].string = "加载 Texture";
          this.labels[2].string = "加载 Audio";
          this.labels[3].string = "加载 Scene";
        };

        _proto.onClickRelease = function onClickRelease() {
          if (this._isLoading) return;
          var testBundle = assetManager.getBundle('TestBundleZip');

          if (!testBundle) {
            this.loadTips.string = "操作失败，请先加载 Asset Bundle";
            return;
          }

          this._onClear();

          testBundle.releaseAll();
          this.loadTips.string = "资源已被释放";
          this.labels[1].string = "加载 Texture";
          this.labels[2].string = "加载 Audio";
          this.labels[3].string = "加载 Scene";
        };

        _proto._onClear = function _onClear() {
          this.showWindow.removeAllChildren();

          if (this._audioSource && this._audioSource instanceof AudioSource) {
            this._audioSource.stop();
          }
        };

        return AssetBundleZip;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "loadTips", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "showWindow", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "labels", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ModelTest.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Node, Prefab, Label, instantiate, Layers, UIMeshRenderer, Component;

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
      Node = module.Node;
      Prefab = module.Prefab;
      Label = module.Label;
      instantiate = module.instantiate;
      Layers = module.Layers;
      UIMeshRenderer = module.UIMeshRenderer;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "15859qFB2VKHqSh4HAQ+N0S", "ModelTest", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var ModelTest = exports('ModelTest', (_dec = ccclass("ModelTest"), _dec2 = menu('UI/ModelTest'), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Prefab
      }), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ModelTest, _Component);

        function ModelTest() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "mount", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "prefab", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_meshMounted", false);

          _defineProperty(_assertThisInitialized(_this), "_buttonLabel", null);

          return _this;
        }

        var _proto = ModelTest.prototype;

        _proto.start = function start() {
          // Your initialization goes here.
          this._buttonLabel = this.node.children[0].getComponent(Label);
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        _proto.onClick = function onClick() {
          if (this._meshMounted) {
            var c = this.mount.children[0];
            c.removeFromParent();
            c.destroy();
            this._buttonLabel.string = 'Add';
            this._meshMounted = false;
          } else {
            var _c = instantiate(this.prefab);

            _c.layer = Layers.Enum.UI_2D;

            _c.setScale(100, 100, 100);

            this.mount.addChild(_c);

            _c.addComponent(UIMeshRenderer);

            this._buttonLabel.string = 'Remove';
            this._meshMounted = true;
          }
        };

        return ModelTest;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mount", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DragonBonesCollider.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, PhysicsSystem2D, Contact2DType, EPhysics2DDrawFlags, Sprite, Color, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      PhysicsSystem2D = module.PhysicsSystem2D;
      Contact2DType = module.Contact2DType;
      EPhysics2DDrawFlags = module.EPhysics2DDrawFlags;
      Sprite = module.Sprite;
      Color = module.Color;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "18a59OM3shCs5K8L9hCo3rK", "DragonBonesCollider", undefined);

      var ccclass = _decorator.ccclass;
      var DragonBonesCollider = exports('DragonBonesCollider', (_dec = ccclass('DragonBonesCollider'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DragonBonesCollider, _Component);

        function DragonBonesCollider() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "touchingCountMap", new Map());

          _defineProperty(_assertThisInitialized(_this), "debugDrawFlags", 0);

          return _this;
        }

        var _proto = DragonBonesCollider.prototype;

        _proto.start = function start() {
          // Your initialization goes here.
          PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
          this.debugDrawFlags = PhysicsSystem2D.instance.debugDrawFlags;
        };

        _proto.onEnable = function onEnable() {
          PhysicsSystem2D.instance.debugDrawFlags = this.debugDrawFlags | EPhysics2DDrawFlags.Shape;
        };

        _proto.onDisable = function onDisable() {
          PhysicsSystem2D.instance.debugDrawFlags = this.debugDrawFlags;
        };

        _proto.addContact = function addContact(c) {
          var count = this.touchingCountMap.get(c.node) || 0;
          this.touchingCountMap.set(c.node, ++count);
          var sprite = c.getComponent(Sprite);

          if (sprite) {
            sprite.color = Color.RED;
          }
        };

        _proto.removeContact = function removeContact(c) {
          var count = this.touchingCountMap.get(c.node) || 0;
          --count;

          if (count <= 0) {
            this.touchingCountMap["delete"](c.node);
            var sprite = c.getComponent(Sprite);

            if (sprite) {
              sprite.color = Color.WHITE;
            }
          } else {
            this.touchingCountMap.set(c.node, count);
          }
        };

        _proto.onBeginContact = function onBeginContact(a, b) {
          this.addContact(a);
          this.addContact(b);
        };

        _proto.onEndContact = function onEndContact(a, b) {
          this.removeContact(a);
          this.removeContact(b);
        };

        return DragonBonesCollider;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/page-view-ctrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, PageView, Label, instantiate, Vec3, Color, Sprite, Component;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      PageView = module.PageView;
      Label = module.Label;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
      Color = module.Color;
      Sprite = module.Sprite;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _class3, _temp;

      cclegacy._RF.push({}, "18f1cBj+JdJfr9Z5uh3wi34", "page-view-ctrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var PageViewCtrl = exports('PageViewCtrl', (_dec = ccclass("PageViewCtrl"), _dec2 = menu('UI/PageViewCtrl'), _dec3 = property(Prefab), _dec4 = property(PageView), _dec5 = property(Label), _dec6 = property({
        type: PageView.Direction
      }), _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PageViewCtrl, _Component);

        function PageViewCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "curNum", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "curTotal", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "pageTeample", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "target", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "label", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "direction", _descriptor6, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = PageViewCtrl.prototype;

        _proto._createPage = function _createPage() {
          var page = instantiate(this.pageTeample);
          page.name = "page_" + this.curNum;
          page.setPosition(new Vec3());
          var color = new Color();
          color.r = Math.floor(Math.random() * 255);
          color.g = Math.floor(Math.random() * 255);
          color.b = Math.floor(Math.random() * 255);
          var comp = page.getComponent(Sprite);
          comp.color = color;
          return page;
        };

        _proto.onLoad = function onLoad() {
          // 设置的当前页面为 1
          this.target.setCurrentPageIndex(0);
        };

        _proto.update = function update() {
          // 当前页面索引
          var extra = this.direction === PageView.Direction.Vertical ? '\n' : '';
          this.label.string = "\u7B2C" + extra + (this.target.getCurrentPageIndex() + 1) + (extra + "\u9875");
        } // 返回首页
        ;

        _proto.onJumpHome = function onJumpHome() {
          // 第二个参数为滚动所需时间，默认值为 0.3 秒
          this.target.scrollToPage(0);
        } // 添加页面
        ;

        _proto.plusPage = function plusPage(callback) {
          if (this.curNum >= this.curTotal) {
            return;
          }

          this.curNum++;

          if (callback) {
            callback();
          }
        } // 减少页面
        ;

        _proto.lessPageNum = function lessPageNum(callback) {
          if (this.curNum <= 0) {
            return;
          }

          this.curNum--;

          if (callback) {
            callback();
          }
        } // 添加页面
        ;

        _proto.onAddPage = function onAddPage() {
          var _this2 = this;

          this.plusPage(function () {
            _this2.target.addPage(_this2._createPage());
          });
        } // 插入当前页面
        ;

        _proto.onInsertPage = function onInsertPage() {
          var _this3 = this;

          this.plusPage(function () {
            _this3.target.insertPage(_this3._createPage(), _this3.target.getCurrentPageIndex());
          });
        } // 移除最后一个页面
        ;

        _proto.onRemovePage = function onRemovePage() {
          var _this4 = this;

          this.lessPageNum(function () {
            var pages = _this4.target.getPages();

            _this4.target.removePage(pages[pages.length - 1]);

            if (_this4.curNum === 0) {
              _this4.onAddPage();
            }
          });
        } // 移除当前页面
        ;

        _proto.onRemovePageAtIndex = function onRemovePageAtIndex() {
          var _this5 = this;

          this.lessPageNum(function () {
            _this5.target.removePageAtIndex(_this5.target.getCurrentPageIndex());

            if (_this5.curNum === 0) {
              _this5.onAddPage();
            }
          });
        } // 移除所有页面
        ;

        _proto.onRemoveAllPage = function onRemoveAllPage() {
          this.target.removeAllPages();
          this.curNum = 0;
          this.onAddPage();
        } // 监听事件
        ;

        _proto.onPageEvent = function onPageEvent(sender, eventType) {
          // // 翻页事件
          // if (eventType !== PageView.EventType.PAGE_TURNING) {
          //     return;
          // }
          console.log("当前所在的页面索引:" + sender.getCurrentPageIndex());
        };

        return PageViewCtrl;
      }(Component), _defineProperty(_class3, "Direction", PageView.Direction), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "curNum", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "curTotal", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "pageTeample", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return PageView.Direction.Horizontal;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/particle-normal.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Prefab, instantiate, Component;

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
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "198732t5gxBkreDnzUqpqKP", "particle-normal", undefined);

      var ccclass = _decorator.ccclass,
          type = _decorator.type;
      var ParticleControl = exports('ParticleControl', (_dec = ccclass('ParticleControl'), _dec2 = type(Prefab), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ParticleControl, _Component);

        function ParticleControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "spritePrefab", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "totalNum", 20);

          return _this;
        }

        var _proto = ParticleControl.prototype;

        _proto.start = function start() {
          this.schedule(this.addParticle, 1);
        };

        _proto.addParticle = function addParticle() {
          if (this.totalNum > 0) {
            var particle = instantiate(this.spritePrefab);
            particle.parent = this.node;
            particle.setPosition(Math.random() * 200, Math.random() * 200);
            this.totalNum--;
          }
        };

        return ParticleControl;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "spritePrefab", [_dec2], {
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

System.register("chunks:///_virtual/graphics-line-join.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, Graphics, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Graphics = module.Graphics;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "1c5e8plAmhLNI/zRXjnw0+i", "graphics-line-join", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var LineCap = Graphics.LineCap;
      var LineJoin = Graphics.LineJoin;
      var GraphicsLineJoin = exports('GraphicsLineJoin', (_dec = ccclass('GraphicsLineJoin'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GraphicsLineJoin, _Component);

        function GraphicsLineJoin() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "graphics", null);

          _defineProperty(_assertThisInitialized(_this), "time", 0);

          _defineProperty(_assertThisInitialized(_this), "radius", 100);

          return _this;
        }

        var _proto = GraphicsLineJoin.prototype;

        _proto.start = function start() {
          // Your initialization goes here.
          this.graphics = this.getComponent(Graphics);
          this.graphics.lineWidth = 20;
          this.draw();
        };

        _proto.draw = function draw() {
          var graphics = this.graphics;
          graphics.clear();
          var rx = this.radius * Math.sin(this.time);
          var ry = -this.radius * Math.cos(this.time); // line join

          graphics.lineCap = LineCap.BUTT;
          graphics.lineJoin = LineJoin.BEVEL;
          this.drawLine(-200, 0, rx, ry);
          graphics.lineJoin = LineJoin.MITER;
          this.drawLine(0, 0, rx, ry);
          graphics.lineJoin = LineJoin.ROUND;
          this.drawLine(200, 0, rx, ry); // line cap

          graphics.lineJoin = LineJoin.MITER;
          graphics.lineCap = LineCap.BUTT;
          this.drawLine(0, -125, rx, ry);
          graphics.lineCap = LineCap.SQUARE;
          this.drawLine(-200, -125, rx, ry);
          graphics.lineCap = LineCap.ROUND;
          this.drawLine(200, -125, rx, ry);
        };

        _proto.drawLine = function drawLine(x, y, rx, ry) {
          var graphics = this.graphics;
          graphics.moveTo(x + rx, y + ry);
          graphics.lineTo(x, y);
          graphics.lineTo(x - rx, y + ry);
          graphics.stroke();
        };

        _proto.update = function update(dt) {
          this.time += dt * 0.5;
          this.draw();
        };

        return GraphicsLineJoin;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/graphics-draw-before-init.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Node, Graphics, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Graphics = module.Graphics;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "1d492ntcNpHzpqOcIZLVpin", "graphics-draw-before-init", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var GraphicsDrawBeforeInit = exports('GraphicsDrawBeforeInit', (_dec = ccclass('GraphicsDrawBeforeInit'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GraphicsDrawBeforeInit, _Component);

        function GraphicsDrawBeforeInit() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = GraphicsDrawBeforeInit.prototype;

        _proto.start = function start() {
          var node = new Node('graphics');
          var g = node.addComponent(Graphics);
          g.clear();
          g.lineWidth = 10;
          g.fillColor.fromHEX('#ff0000'); // rect

          g.rect(-250, 0, 200, 100); // round rect

          g.roundRect(50, 0, 200, 100, 20);
          g.stroke();
          g.fill();
          node.parent = this.node;
        };

        return GraphicsDrawBeforeInit;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DragonBonesMode.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Material, dragonBones, Label, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Material = module.Material;
      dragonBones = module.dragonBones;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _temp;

      cclegacy._RF.push({}, "1ec8fGOAJdGnKarDJTeyxnS", "DragonBonesMode", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DragonBonesMode = exports('DragonBonesMode', (_dec = ccclass('DragonBonesMode'), _dec2 = property({
        type: Material
      }), _dec3 = property({
        type: Material
      }), _dec4 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec5 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec6 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec7 = property({
        type: Label
      }), _dec8 = property({
        type: Label
      }), _dec9 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DragonBonesMode, _Component);

        function DragonBonesMode() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "grayMaterial", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "normalMaterial", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "db0", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "db1", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "db2", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "batchLabel", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "cacheLabel", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "matLabel", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "isGray", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "isBatch", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "isCache", _descriptor11, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = DragonBonesMode.prototype;

        _proto.onGray = function onGray() {
          this.isGray = !this.isGray;
          var label = "gray";
          if (this.isGray) label = "normal";
          this.matLabel.string = label;
          var material = this.grayMaterial;

          if (!this.isGray) {
            material = this.normalMaterial;
          }

          this.db0.setMaterial(material, 0);
          this.db0.markForUpdateRenderData(true);
          this.db1.setMaterial(material, 0);
          this.db1.markForUpdateRenderData(true);
          this.db2.setMaterial(material, 0);
          this.db2.markForUpdateRenderData();
        };

        _proto.onBatch = function onBatch() {
          this.isBatch = !this.isBatch;
          var label = "batch";
          if (this.isBatch) label = "no batch";
          this.batchLabel.string = label; // this.db0!.enableBatch = this.isBatch;
          // this.db1!.enableBatch = this.isBatch;
          // this.db2!.enableBatch = this.isBatch;
        };

        _proto.onCache = function onCache() {
          this.isCache = !this.isCache;
          var label = "cache";
          if (this.isCache) label = "no cache";
          this.cacheLabel.string = label;
          var mode = dragonBones.ArmatureDisplay.AnimationCacheMode.SHARED_CACHE;
          if (!this.isCache) mode = dragonBones.ArmatureDisplay.AnimationCacheMode.REALTIME;
          this.db0.setAnimationCacheMode(mode);
          this.db1.setAnimationCacheMode(mode);
          this.db2.setAnimationCacheMode(mode);
        };

        return DragonBonesMode;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "grayMaterial", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "normalMaterial", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "db0", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "db1", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "db2", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "batchLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "cacheLabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "matLabel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "isGray", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "isBatch", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "isCache", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SpineAttach.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, sp, Label, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sp = module.sp;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class2, _class3, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "1f4fb/2fX9O26fHciliNUu8", "SpineAttach", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;

      var _class = exports('default', (_dec = ccclass('SpineAttach'), _dec2 = property({
        type: sp.Skeleton
      }), _dec3 = property({
        type: Label
      }), _dec(_class2 = (_class3 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(_class3, _Component);

        function _class3() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "skeleton", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "modeLabel", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = _class3.prototype;

        _proto.changeMode = function changeMode() {
          var isCached = this.skeleton.isAnimationCached();

          if (isCached) {
            this.skeleton.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.REALTIME);
            this.modeLabel.string = "cache";
          } else {
            this.skeleton.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE);
            this.modeLabel.string = "realtime";
          }
        };

        return _class3;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class3.prototype, "skeleton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class3.prototype, "modeLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class3)) || _class2));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/pause.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "20eccyukcdKQoxfRMYT7lCm", "pause", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var newScript = exports('newScript', (_dec = ccclass("newScript"), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(newScript, _Component);

        function newScript() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "timer", false);

          _defineProperty(_assertThisInitialized(_this), "_y", 0);

          return _this;
        }

        var _proto = newScript.prototype;

        _proto.start = function start() {
          this._y = this.node.position.y;
        };

        _proto.update = function update(deltaTime) {
          this.node.position = new Vec3(this.node.position.x, this._y, this.node.position.z);

          if (this._y <= 0) {
            this.timer = true;
          }

          if (this._y >= 2) {
            this.timer = false;
          }

          if (deltaTime > 1) {
            // hack for first frame
            deltaTime = 1;
          }

          if (this.timer) {
            this._y += 1 * deltaTime;
          }

          if (this.timer == false) {
            this._y -= 1 * deltaTime;
          }
        };

        return newScript;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/motion-streak-ctrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, MotionStreak, Texture2D, Animation, Component;

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
      MotionStreak = module.MotionStreak;
      Texture2D = module.Texture2D;
      Animation = module.Animation;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "22ac1BM7stAG4GBDo0Vwp7q", "motion-streak-ctrl", undefined);

      var ccclass = _decorator.ccclass,
          type = _decorator.type;
      var MotionStreakCtrl = exports('MotionStreakCtrl', (_dec = ccclass('MotionStreakCtrl'), _dec2 = type(MotionStreak), _dec3 = type(Texture2D), _dec4 = type(Animation), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MotionStreakCtrl, _Component);

        function MotionStreakCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "motionStreak", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "newTexture", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "animationCom", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_changed", true);

          _defineProperty(_assertThisInitialized(_this), "_oldTexture", null);

          return _this;
        }

        var _proto = MotionStreakCtrl.prototype;

        _proto.onLoad = function onLoad() {
          this._changed = true;
          this._oldTexture = this.motionStreak.texture;
        };

        _proto.onClick = function onClick() {
          if (this._changed) {
            this.setMotionStreak(2, 3, 20, this.newTexture);
          } else {
            this.setMotionStreak(0.5, 1, 30, this._oldTexture);
          }

          this._changed = !this._changed;
        };

        _proto.setMotionStreak = function setMotionStreak(fadeTime, minSeg, stroke, texture) {
          this.motionStreak.fadeTime = fadeTime;
          this.motionStreak.minSeg = minSeg;
          this.motionStreak.stroke = stroke;
          this.motionStreak.texture = texture;
        };

        _proto.lateUpdate = function lateUpdate() {
          if (!this.animationCom.getState('move_around').isPlaying) {
            this.animationCom.play();
          }
        };

        _proto.onDisable = function onDisable() {
          this.animationCom.stop();
        };

        return MotionStreakCtrl;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "motionStreak", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "newTexture", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "animationCom", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DragonBonesCtrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, dragonBones, Node, macro, director, Vec3, SystemEventType, systemEvent, Component;

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
      dragonBones = module.dragonBones;
      Node = module.Node;
      macro = module.macro;
      director = module.director;
      Vec3 = module.Vec3;
      SystemEventType = module.SystemEventType;
      systemEvent = module.systemEvent;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _temp, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class3, _class4, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp2;

      cclegacy._RF.push({}, "2323bz+GgZJZ5mpHSfuf3kv", "DragonBonesCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          requireComponent = _decorator.requireComponent;
      var NORMAL_ANIMATION_GROUP = "normal";
      var AIM_ANIMATION_GROUP = "aim";
      var ATTACK_ANIMATION_GROUP = "attack";
      var JUMP_SPEED = -20;
      var NORMALIZE_MOVE_SPEED = 3.6;
      var MAX_MOVE_SPEED_FRONT = NORMALIZE_MOVE_SPEED * 1.4;
      var MAX_MOVE_SPEED_BACK = NORMALIZE_MOVE_SPEED * 1.0;
      var WEAPON_R_LIST = ["weapon_1502b_r", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d", "weapon_1005e"];
      var WEAPON_L_LIST = ["weapon_1502b_l", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d"];
      var SKINS = ["mecha_1502b", "skin_a", "skin_b", "skin_c"];
      var GROUND = -200;
      var G = -0.6;
      var DragonBonesCtrl = exports('default', (_dec2 = ccclass('DragonBonesCtrl'), _dec3 = requireComponent(dragonBones.ArmatureDisplay), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Node
      }), _dec7 = property({
        type: Node
      }), _dec8 = property({
        type: Node
      }), _dec9 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec10 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec2(_class3 = _dec3(_class3 = (_class4 = (_temp2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DragonBonesCtrl, _Component);

        function DragonBonesCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "touchHandler", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "upButton", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "downButton", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "leftButton", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "rightButton", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "weaponArmature", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "skinArmature", _descriptor7, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_bullets", []);

          _defineProperty(_assertThisInitialized(_this), "_left", false);

          _defineProperty(_assertThisInitialized(_this), "_right", false);

          _defineProperty(_assertThisInitialized(_this), "_isJumpingA", false);

          _defineProperty(_assertThisInitialized(_this), "_isJumpingB", false);

          _defineProperty(_assertThisInitialized(_this), "_isSquating", false);

          _defineProperty(_assertThisInitialized(_this), "_isAttackingA", false);

          _defineProperty(_assertThisInitialized(_this), "_isAttackingB", false);

          _defineProperty(_assertThisInitialized(_this), "_weaponRIndex", 0);

          _defineProperty(_assertThisInitialized(_this), "_weaponLIndex", 0);

          _defineProperty(_assertThisInitialized(_this), "_skinIndex", 0);

          _defineProperty(_assertThisInitialized(_this), "_faceDir", 1);

          _defineProperty(_assertThisInitialized(_this), "_aimDir", 0);

          _defineProperty(_assertThisInitialized(_this), "_moveDir", 0);

          _defineProperty(_assertThisInitialized(_this), "_aimRadian", 0);

          _defineProperty(_assertThisInitialized(_this), "_speedX", 0);

          _defineProperty(_assertThisInitialized(_this), "_speedY", 0);

          _defineProperty(_assertThisInitialized(_this), "_armature", null);

          _defineProperty(_assertThisInitialized(_this), "_armatureDisplay", null);

          _defineProperty(_assertThisInitialized(_this), "_weaponR", null);

          _defineProperty(_assertThisInitialized(_this), "_weaponL", null);

          _defineProperty(_assertThisInitialized(_this), "_aimState", null);

          _defineProperty(_assertThisInitialized(_this), "_walkState", null);

          _defineProperty(_assertThisInitialized(_this), "_attackState", null);

          _defineProperty(_assertThisInitialized(_this), "_target", new Vec3(0, 0, 0));

          _defineProperty(_assertThisInitialized(_this), "_mouseDown_", false);

          return _this;
        }

        var _proto2 = DragonBonesCtrl.prototype; // use this for initialization

        _proto2.onLoad = function onLoad() {
          var _this2 = this;

          this._armatureDisplay = this.getComponent(dragonBones.ArmatureDisplay);
          this._armature = this._armatureDisplay.armature();

          this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);

          this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);

          this._armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this._animationEventHandler, this);

          this._weaponR = this._armature.getSlot('weapon_r').childArmature;
          this._weaponL = this._armature.getSlot('weapon_l').childArmature;

          this._weaponR.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);

          this._weaponL.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this); // load all skin data


          for (var i = 1; i < SKINS.length; i++) {
            this.skinArmature.armatureName = SKINS[i];
          }

          for (var _i = 1; _i < WEAPON_R_LIST.length; _i++) {
            this.weaponArmature.armatureName = WEAPON_R_LIST[_i];
          }

          this._updateAnimation();

          if (this.touchHandler) {
            // touch event
            this.touchHandler.on(SystemEventType.TOUCH_START, function (event) {
              _this2._mouseDown_ = true;
              var touchLoc = event.getUILocation();

              _this2.aim(touchLoc.x, touchLoc.y);

              _this2.attack(true);
            }, this);
            this.touchHandler.on(SystemEventType.TOUCH_END, function (event) {
              _this2._mouseDown_ = false;

              _this2.attack(false);
            }, this);
            this.touchHandler.on(SystemEventType.TOUCH_MOVE, function (event) {
              var touchLoc = event.getUILocation();

              _this2.aim(touchLoc.x, touchLoc.y);
            }, this);
          }

          if (this.upButton) {
            this.upButton.on(SystemEventType.TOUCH_START, function (event) {
              _this2.jump();
            }, this);
          }

          if (this.downButton) {
            this.downButton.on(SystemEventType.TOUCH_START, function (event) {
              _this2.squat(true);
            }, this);
            this.downButton.on(SystemEventType.TOUCH_END, function (event) {
              _this2.squat(false);
            }, this);
            this.downButton.on(SystemEventType.TOUCH_CANCEL, function (event) {
              _this2.squat(false);
            }, this);
          }

          if (this.leftButton) {
            this.leftButton.on(SystemEventType.TOUCH_START, function (event) {
              _this2._left = true;

              _this2._updateMove(-1);
            }, this);
            this.leftButton.on(SystemEventType.TOUCH_END, function (event) {
              _this2._left = false;

              _this2._updateMove(-1);
            }, this);
            this.leftButton.on(SystemEventType.TOUCH_CANCEL, function (event) {
              _this2._left = false;

              _this2._updateMove(-1);
            }, this);
          }

          if (this.rightButton) {
            this.rightButton.on(SystemEventType.TOUCH_START, function (event) {
              _this2._right = true;

              _this2._updateMove(1);
            }, this);
            this.rightButton.on(SystemEventType.TOUCH_END, function (event) {
              _this2._right = false;

              _this2._updateMove(1);
            }, this);
            this.rightButton.on(SystemEventType.TOUCH_CANCEL, function (event) {
              _this2._right = false;

              _this2._updateMove(1);
            }, this);
          } // keyboard events


          systemEvent.on(SystemEventType.KEY_DOWN, function (event) {
            _this2._keyHandler(event.keyCode, true);
          }, this);
          systemEvent.on(SystemEventType.KEY_UP, function (event) {
            _this2._keyHandler(event.keyCode, false);
          }, this);
        };

        _proto2._keyHandler = function _keyHandler(keyCode, isDown) {
          switch (keyCode) {
            case macro.KEY.a:
            case macro.KEY.left:
              this._left = isDown;

              this._updateMove(-1);

              break;

            case macro.KEY.d:
            case macro.KEY.right:
              this._right = isDown;

              this._updateMove(1);

              break;

            case macro.KEY.w:
            case macro.KEY.up:
              if (isDown) {
                this.jump();
              }

              break;

            case macro.KEY.s:
            case macro.KEY.down:
              this.squat(isDown);
              break;

            case macro.KEY.q:
              if (isDown) {
                this.switchWeaponR();
              }

              break;

            case macro.KEY.e:
              if (isDown) {
                this.switchWeaponL();
              }

              break;

            case macro.KEY.space:
              if (isDown) {
                this.switchWeaponR();
                this.switchWeaponL();
              }

              break;

            default:
              return;
          }
        };

        _proto2._updateMove = function _updateMove(dir) {
          if (this._left && this._right) {
            this.move(dir);
          } else if (this._left) {
            this.move(-1);
          } else if (this._right) {
            this.move(1);
          } else {
            this.move(0);
          }
        };

        _proto2.move = function move(dir) {
          if (this._moveDir === dir) {
            return;
          }

          this._moveDir = dir;

          this._updateAnimation();
        };

        _proto2.jump = function jump() {
          if (this._isJumpingA) {
            return;
          }

          this._isJumpingA = true;

          this._armature.animation.fadeIn("jump_1", -1, -1, 0, NORMAL_ANIMATION_GROUP);

          this._walkState = null;
        };

        _proto2.squat = function squat(isSquating) {
          if (this._isSquating === isSquating) {
            return;
          }

          this._isSquating = isSquating;

          this._updateAnimation();
        };

        _proto2.attack = function attack(isAttacking) {
          if (this._isAttackingA == isAttacking) {
            return;
          }

          this._isAttackingA = isAttacking;
        };

        _proto2.switchWeaponL = function switchWeaponL() {
          this._weaponL.removeEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);

          this._weaponLIndex++;

          if (this._weaponLIndex >= WEAPON_L_LIST.length) {
            this._weaponLIndex = 0;
          }

          var newWeaponName = WEAPON_L_LIST[this._weaponLIndex];
          var factory = dragonBones.CCFactory.getInstance();
          this._weaponL = factory.buildArmature(newWeaponName);
          this._armature.getSlot('weapon_l').childArmature = this._weaponL;

          this._weaponL.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        };

        _proto2.switchWeaponR = function switchWeaponR() {
          this._weaponR.removeEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);

          this._weaponRIndex++;

          if (this._weaponRIndex >= WEAPON_R_LIST.length) {
            this._weaponRIndex = 0;
          }

          var newWeaponName = WEAPON_R_LIST[this._weaponRIndex];
          var factory = dragonBones.CCFactory.getInstance();
          this._weaponR = factory.buildArmature(newWeaponName);
          this._armature.getSlot('weapon_r').childArmature = this._weaponR;

          this._weaponR.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        };

        _proto2.switchSkin = function switchSkin() {
          this._skinIndex++;

          if (this._skinIndex >= SKINS.length) {
            this._skinIndex = 0;
          }

          var skinName = SKINS[this._skinIndex];
          var factory = dragonBones.CCFactory.getInstance();
          var skinData = factory.getArmatureData(skinName).defaultSkin;
          factory.replaceSkin(this._armatureDisplay.armature(), skinData, false, ["weapon_l", "weapon_r"]);
        };

        _proto2.aim = function aim(x, y) {
          if (this._aimDir === 0) {
            this._aimDir = 10;
          }

          var t = this._target = this.node.parent._uiProps.uiTransformComp.convertToNodeSpaceAR(new Vec3(x, y, 0));
        };

        _proto2.update = function update(dt) {
          this._updatePosition();

          this._updateAim();

          this._updateAttack();

          this._enterFrameHandler(dt);
        };

        _proto2.onDisable = function onDisable() {
          // clean the bullets
          for (var i = this._bullets.length - 1; i >= 0; i--) {
            var bullet = this._bullets[i];
            bullet.enabled = false;
          }

          this._bullets = [];
        };

        _proto2.addBullet = function addBullet(bullet) {
          this._bullets.push(bullet);
        };

        _proto2._enterFrameHandler = function _enterFrameHandler(dt) {
          for (var i = this._bullets.length - 1; i >= 0; i--) {
            var bullet = this._bullets[i];

            if (bullet.update()) {
              this._bullets.splice(i, 1);
            }
          }
        };

        _proto2._animationEventHandler = function _animationEventHandler(event) {
          if (event.type === dragonBones.EventObject.FADE_IN_COMPLETE) {
            if (event.animationState.name === "jump_1") {
              this._isJumpingB = true;
              this._speedY = -JUMP_SPEED;

              if (this._moveDir != 0) {
                if (this._moveDir * this._faceDir > 0) {
                  this._speedX = MAX_MOVE_SPEED_FRONT * this._faceDir;
                } else {
                  this._speedX = -MAX_MOVE_SPEED_BACK * this._faceDir;
                }
              }

              this._armature.animation.fadeIn("jump_2", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            } else if (event.animationState.name === "jump_4") {
              this._updateAnimation();
            }
          } else if (event.type === dragonBones.EventObject.FADE_OUT_COMPLETE) {
            if (event.animationState.name === "attack_01") {
              this._isAttackingB = false;
              this._attackState = null;
            }
          } else if (event.type === dragonBones.EventObject.COMPLETE) {
            if (event.animationState.name === "jump_4") {
              this._isJumpingA = false;
              this._isJumpingB = false;

              this._updateAnimation();
            }
          }
        };

        _proto2._frameEventHandler = function _frameEventHandler(event, bone, armature) {
          if (event.name === "fire") {
            // var firePointBone = event.armature.getBone("firePoint");
            var localPoint = new Vec3(event.bone.global.x, event.bone.global.y, 0);
            var display = event.armature.display;
            var globalPoint = display.node.convertToWorldSpace(localPoint);

            this._fire(globalPoint);
          }
        };

        _proto2._fire = function _fire(firePoint) {
          firePoint.x += Math.random() * 2 - 1;
          firePoint.y += Math.random() * 2 - 1;
          firePoint.z = 0;

          var armature = this._armatureDisplay.buildArmature("bullet_01");

          var effect = this._armatureDisplay.buildArmature("fire_effect_01");

          var radian = this._faceDir < 0 ? Math.PI - this._aimRadian : this._aimRadian;
          var bullet = new DragonBullet();
          bullet.init(this.node.parent, armature, effect, radian + Math.random() * 0.02 - 0.01, 40, firePoint);
          this.addBullet(bullet);
        };

        _proto2._updateAnimation = function _updateAnimation() {
          if (this._isJumpingA) {
            return;
          }

          if (this._isSquating) {
            this._speedX = 0;
            this._armature.animation.fadeIn("squat", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            this._walkState = null;
            return;
          }

          if (this._moveDir === 0) {
            this._speedX = 0;
            this._armature.animation.fadeIn("idle", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            this._walkState = null;
          } else {
            if (!this._walkState) {
              this._walkState = this._armature.animation.fadeIn("walk", -1, -1, 0, NORMAL_ANIMATION_GROUP);
              this._walkState.resetToPose = false;
            }

            if (this._moveDir * this._faceDir > 0) {
              this._walkState.timeScale = MAX_MOVE_SPEED_FRONT / NORMALIZE_MOVE_SPEED;
            } else {
              this._walkState.timeScale = -MAX_MOVE_SPEED_BACK / NORMALIZE_MOVE_SPEED;
            }

            if (this._moveDir * this._faceDir > 0) {
              this._speedX = MAX_MOVE_SPEED_FRONT * this._faceDir;
            } else {
              this._speedX = -MAX_MOVE_SPEED_BACK * this._faceDir;
            }
          }
        };

        _proto2._updatePosition = function _updatePosition() {
          var camera = director.root.ui.getFirstRenderCamera(this.node);
          var pos = this.node.getPosition();

          if (this._speedX !== 0) {
            pos.x += this._speedX;
            var minX = -camera.width / 2;
            var maxX = camera.width / 2;

            if (pos.x < minX) {
              pos.x = minX;
            } else if (pos.x > maxX) {
              pos.x = maxX;
            }

            this.node.setPosition(pos);
          }

          if (this._speedY != 0) {
            if (this._speedY > 5 && this._speedY + G <= 5) {
              this._armature.animation.fadeIn("jump_3", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            }

            this._speedY += G;
            pos.y += this._speedY;

            if (pos.y < GROUND) {
              pos.y = GROUND;
              this._speedY = 0;
              this._armature.animation.fadeIn("jump_4", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            }

            this.node.setPosition(pos);
          }
        };

        _proto2._updateAim = function _updateAim() {
          if (!this._mouseDown_) return;

          if (this._aimDir === 0) {
            return;
          }

          var pos = this.node.getPosition();
          var scale = this.node.getScale();
          this._faceDir = this._target.x > pos.x ? 1 : -1;

          if (scale.x * this._faceDir < 0) {
            scale.x *= -1;

            if (this._moveDir) {
              this._updateAnimation();
            }

            this.node.setScale(scale);
          }

          var aimOffsetY = this._armature.getBone("chest").global.y * scale.y;

          if (this._faceDir > 0) {
            this._aimRadian = Math.atan2(this._target.y - pos.y - aimOffsetY, this._target.x - pos.x);
          } else {
            this._aimRadian = Math.PI - Math.atan2(this._target.y - pos.y - aimOffsetY, this._target.x - pos.x);

            if (this._aimRadian > Math.PI) {
              this._aimRadian -= Math.PI * 2;
            }
          }

          var aimDir = 0;

          if (this._aimRadian > 0) {
            aimDir = 1;
          } else {
            aimDir = -1;
          }

          if (this._aimDir != aimDir) {
            this._aimDir = aimDir; // Animation mixing.

            if (this._aimDir >= 0) {
              this._aimState = this._armature.animation.fadeIn("aim_up", -1.0, -1, 0, AIM_ANIMATION_GROUP);
            } else {
              this._aimState = this._armature.animation.fadeIn("aim_down", -1.0, -1, 0, AIM_ANIMATION_GROUP);
            }

            this._aimState.resetToPose = false;
          }

          this._aimState.weight = Math.abs(this._aimRadian / Math.PI * 2); //_armature.invalidUpdate("pelvis"); // Only update bone mask.

          this._armature.invalidUpdate();
        };

        _proto2._updateAttack = function _updateAttack() {
          if (!this._isAttackingA || this._isAttackingB) {
            return;
          }

          this._isAttackingB = true; // Animation mixing.

          this._attackState = this._armature.animation.fadeIn("attack_01", -1.0, -1, 0, ATTACK_ANIMATION_GROUP, dragonBones.AnimationFadeOutMode.SameGroup);
          this._attackState.resetToPose = false;
          this._attackState.autoFadeOutTime = this._attackState.fadeTotalTime;
        };

        return DragonBonesCtrl;
      }(Component), _temp2), (_descriptor = _applyDecoratedDescriptor(_class4.prototype, "touchHandler", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class4.prototype, "upButton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class4.prototype, "downButton", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class4.prototype, "leftButton", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class4.prototype, "rightButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class4.prototype, "weaponArmature", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class4.prototype, "skinArmature", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class4)) || _class3) || _class3));
      var DragonBullet = exports('DragonBullet', (_dec = ccclass('DragonBullet'), _dec(_class = (_temp = /*#__PURE__*/function () {
        function DragonBullet() {
          _defineProperty(this, "_speedX", 0);

          _defineProperty(this, "_speedY", 0);

          _defineProperty(this, "_armature", null);

          _defineProperty(this, "_armatureDisplay", null);

          _defineProperty(this, "_effect", null);
        }

        var _proto = DragonBullet.prototype;

        _proto.init = function init(parentNode, armature, effect, radian, speed, position) {
          this._speedX = Math.cos(radian) * speed;
          this._speedY = Math.sin(radian) * speed;

          var thePos = parentNode._uiProps.uiTransformComp.convertToNodeSpaceAR(position);

          armature.playAnimation("idle");
          var armatureNode = armature.node;
          armatureNode.setPosition(thePos);
          armatureNode.angle = radian * macro.DEG;
          this._armature = armature;

          if (effect) {
            this._effect = effect;
            var effectDisplay = this._effect.node;
            effectDisplay.angle = radian * macro.DEG;
            effectDisplay.setPosition(thePos);
            effectDisplay.scaleX = 1 + Math.random() * 1;
            effectDisplay.scaleY = 1 + Math.random() * 0.5;

            if (Math.random() < 0.5) {
              effectDisplay.scaleY *= -1;
            }

            this._effect.playAnimation("idle");

            parentNode.addChild(effectDisplay);
          }

          parentNode.addChild(armatureNode);
        };

        _proto.update = function update() {
          var armatureNode = this._armature.node;
          var pos = armatureNode.getPosition();
          pos.x += this._speedX;
          pos.y += this._speedY;
          armatureNode.setPosition(pos);
          var uiTrans = armatureNode.parent._uiProps.uiTransformComp;
          var worldPos = uiTrans.convertToWorldSpaceAR(armatureNode.getPosition());
          var camera = director.root.ui.getFirstRenderCamera(armatureNode);

          if (worldPos.x < -100 || worldPos.x >= camera.width + 100 || worldPos.y < -100 || worldPos.y >= camera.height + 100) {
            this.doClean();
            return true;
          }

          return false;
        };

        _proto.onDisable = function onDisable() {
          this.doClean();
        };

        _proto.doClean = function doClean() {
          this._armature.node.removeFromParent();

          if (this._effect) {
            this._effect.node.removeFromParent();
          }
        };

        return DragonBullet;
      }(), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PreloadAssets.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _defineProperty, _assertThisInitialized, _initializerDefineProperty, cclegacy, _decorator, Node, Label, Prefab, SpriteFrame, resources, director, SpriteAtlas, Font, TextureCube, Texture2D, log, AudioSource, Layers, instantiate, MeshRenderer, UIMeshRenderer, builtinResMgr, Sprite, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Prefab = module.Prefab;
      SpriteFrame = module.SpriteFrame;
      resources = module.resources;
      director = module.director;
      SpriteAtlas = module.SpriteAtlas;
      Font = module.Font;
      TextureCube = module.TextureCube;
      Texture2D = module.Texture2D;
      log = module.log;
      AudioSource = module.AudioSource;
      Layers = module.Layers;
      instantiate = module.instantiate;
      MeshRenderer = module.MeshRenderer;
      UIMeshRenderer = module.UIMeshRenderer;
      builtinResMgr = module.builtinResMgr;
      Sprite = module.Sprite;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "23363UvMkJDuL3mTFnNcJCg", "PreloadAssets", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PreloadAssets = exports('PreloadAssets', (_dec = ccclass('PreloadAssets'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Label
      }), _dec4 = property({
        type: [Node]
      }), _dec5 = property({
        type: Prefab
      }), _dec6 = property({
        type: SpriteFrame
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PreloadAssets, _Component);

        function PreloadAssets() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_lastType", '');

          _defineProperty(_assertThisInitialized(_this), "_btnLabel", null);

          _defineProperty(_assertThisInitialized(_this), "_audioSource", null);

          _defineProperty(_assertThisInitialized(_this), "_isLoading", false);

          _defineProperty(_assertThisInitialized(_this), "_urls", {
            Audio: "test_assets/audio",
            Txt: "test_assets/text",
            ImageAsset: "test_assets/PurpleMonster",
            Texture2D: "test_assets/PurpleMonster/texture",
            Font: "test_assets/font",
            SpriteAtlas: "test_assets/atlas",
            SpriteFrame: "test_assets/image/spriteFrame",
            Prefab: "test_assets/prefab",
            Animation: "test_assets/testAnim",
            Scene: "test_assets/test-preload-scene",
            TextureCube: "test_assets/cubemap",
            Material: "test_assets/testMat",
            Mesh: "test_assets/Monster/monster",
            Skeleton: "test_assets/Monster/Armature",
            Dir: 'test_assets'
          });

          _initializerDefineProperty(_assertThisInitialized(_this), "showWindow", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "loadTips", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "loadList", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "loadAnimTestPrefab", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "loadMaterialSpriteFrame", _descriptor5, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = PreloadAssets.prototype; // use this for initialization

        _proto.onLoad = function onLoad() {
          // registered event
          this._onRegisteredEvent();
        };

        _proto.onDestroy = function onDestroy() {};

        _proto._onRegisteredEvent = function _onRegisteredEvent() {
          for (var i = 0; i < this.loadList.length; ++i) {
            this.loadList[i].on(Node.EventType.TOUCH_END, this._onClick.bind(this));
          }
        };

        _proto._onClick = function _onClick(event) {
          if (this._isLoading) {
            return;
          }

          this._onClear();

          this._curType = event.target.name.split('_')[1];

          if (this._lastType !== "" && this._curType === this._lastType) {
            this.loadTips.string = '';

            this._onShowResClick(event);

            return;
          }

          if (this._btnLabel) {
            this._btnLabel.string = "已加载 " + this._lastType;
          }

          this._lastType = this._curType;
          this._btnLabel = event.target.getChildByName("Label").getComponent(Label);
          this.loadTips.string = this._curType + " Loading....";
          this._isLoading = true;

          this._load();
        };

        _proto._load = function _load() {
          var url = this._urls[this._curType];

          var loadCallBack = this._loadCallBack.bind(this);

          switch (this._curType) {
            case 'SpriteFrame':
              // specify the type to load sub asset from texture's url
              resources.preload(url, SpriteFrame, loadCallBack);
              break;

            case 'Texture2D':
              resources.preload(url, Texture2D, loadCallBack);
              break;

            case 'TextureCube':
              resources.preload(url, TextureCube, loadCallBack);
              break;

            case 'Font':
              resources.preload(url, Font, loadCallBack);
              break;

            case 'SpriteAtlas':
              resources.preload(url, SpriteAtlas, loadCallBack);
              break;

            case 'Animation':
            case 'Prefab':
            case 'Skeleton':
            case 'Mesh':
            case 'ImageAsset':
            case 'Txt':
            case 'Audio':
            case 'Material':
            case 'Skeleton':
              resources.preload(url, loadCallBack);
              break;

            case 'Scene':
              director.preloadScene(url, loadCallBack);
              break;

            case 'Dir':
              resources.preloadDir(url, loadCallBack);
              break;
          }
        };

        _proto._loadCallBack = function _loadCallBack(err, data) {
          this._isLoading = false;

          if (err) {
            log('Error url [' + err + ']');
            return;
          }

          if (this._btnLabel) {
            if (this._curType === "Audio") {
              this._btnLabel.string = "播放";
            } else {
              this._btnLabel.string = "创建";
            }

            this._btnLabel.string += this._curType;
          }

          this.loadTips.string = this._curType + " Preloaded Successfully!";
        };

        _proto._onClear = function _onClear() {
          this.showWindow.removeAllChildren();

          if (this._audioSource && this._audioSource instanceof AudioSource) {
            this._audioSource.stop();
          }
        };

        _proto._onShowResClick = function _onShowResClick(event) {
          var _this2 = this;

          var url = this._urls[this._curType];

          switch (this._curType) {
            case 'SpriteFrame':
              // specify the type to load sub asset from texture's url
              resources.load(url, SpriteFrame, function (err, asset) {
                return _this2._createNode(_this2._curType, asset);
              });
              break;

            case 'Texture2D':
              resources.load(url, Texture2D, function (err, asset) {
                return _this2._createNode(_this2._curType, asset);
              });
              break;

            case 'TextureCube':
              resources.load(url, TextureCube, function (err, asset) {
                return _this2._createNode(_this2._curType, asset);
              });
              break;

            case 'Font':
              resources.load(url, Font, function (err, asset) {
                return _this2._createNode(_this2._curType, asset);
              });
              break;

            case 'SpriteAtlas':
              resources.load(url, SpriteAtlas, function (err, asset) {
                return _this2._createNode(_this2._curType, asset);
              });
              break;

            case 'Animation':
            case 'Prefab':
            case 'Skeleton':
            case 'Mesh':
            case 'ImageAsset':
            case 'Txt':
            case 'Audio':
            case 'Material':
            case 'Skeleton':
              resources.load(url, function (err, asset) {
                return _this2._createNode(_this2._curType, asset);
              });
              break;

            case 'Scene':
              director.loadScene(url);
              break;

            case 'Dir':
              resources.loadDir(url, function (err, assets) {
                _this2.loadTips.string = "The asset loaded: ";
                assets.forEach(function (r) {
                  return _this2.loadTips.string += r.name + ";";
                });
              });
              break;
          }
        };

        _proto._createNode = function _createNode(type, res) {
          var _model$material;

          this.loadTips.string = "";
          var node = new Node("New " + type);
          node.layer = Layers.Enum.UI_2D;
          node.setPosition(0, 0, 0);
          var component = null;

          switch (this._curType) {
            case "SpriteFrame":
              component = node.addComponent(Sprite);
              component.spriteFrame = res;
              break;

            case "SpriteAtlas":
              component = node.addComponent(Sprite);
              component.spriteFrame = res.getSpriteFrames()[0];
              break;

            case "Texture2D":
              var cube = instantiate(this.loadAnimTestPrefab);
              var model = cube.getComponent(MeshRenderer);
              model === null || model === void 0 ? void 0 : (_model$material = model.material) === null || _model$material === void 0 ? void 0 : _model$material.setProperty('albedoMap', res);
              cube.setPosition(0, 0, 50);
              cube.setScale(100, 100, 100);
              cube.parent = this.showWindow;
              break;

            case 'ImageAsset':
              component = node.addComponent(Sprite);
              var spriteFrame = new SpriteFrame();
              var tex = new Texture2D();
              tex.image = res;
              spriteFrame.texture = tex;
              component.spriteFrame = spriteFrame;
              break;

            case "Audio":
              component = node.addComponent(AudioSource);
              component.clip = res;
              component.play();
              this._audioSource = component;
              this.loadTips.string = "播放音乐。";
              break;

            case "Txt":
              component = node.addComponent(Label);
              component.lineHeight = 40;
              component.string = res.text;
              break;

            case "Material":
              component = node.addComponent(Sprite);
              component.sharedMaterials = res;
              component.spriteFrame = this.loadMaterialSpriteFrame;
              break;

            case "Font":
              component = node.addComponent(Label);
              component.font = res;
              component.lineHeight = 40;
              component.string = "This is BitmapFont!";
              break;

            case 'Mesh':
              component = node.addComponent(MeshRenderer);
              node.addComponent(UIMeshRenderer);
              node.setPosition(0, 0, 50);
              node.setScale(5, 5, 5);
              component.mesh = res;
              component.material = builtinResMgr.get('standard-material');
              break;

            case "Prefab":
              var prefab = instantiate(res);
              prefab.parent = node;
              prefab.setPosition(0, 0, 0);
              break;

            default:
              this.loadTips.string = "此项没有展示效果";
              break;
          }

          this.showWindow.addChild(node);
        };

        return PreloadAssets;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "showWindow", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "loadTips", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "loadList", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "loadAnimTestPrefab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "loadMaterialSpriteFrame", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/use-render-texture-to-model.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, MeshRenderer, RenderTexture, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      MeshRenderer = module.MeshRenderer;
      RenderTexture = module.RenderTexture;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "273937WXQBIKKGFsZAzGHKx", "use-render-texture-to-model", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var UseRenderTextureToModel = exports('UseRenderTextureToModel', (_dec = ccclass('UseRenderTextureToModel'), _dec2 = property(MeshRenderer), _dec3 = property(RenderTexture), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UseRenderTextureToModel, _Component);

        function UseRenderTextureToModel() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "quad", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "rtTexture", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = UseRenderTextureToModel.prototype;

        _proto.start = function start() {
          var _this2 = this; // Your initialization goes here.


          this.scheduleOnce(function () {
            var material = _this2.quad.getMaterialInstance(0);

            if (!material) {
              return;
            }

            _this2.quad.setMaterialInstance(0, material);

            material.setProperty('mainTexture', _this2.rtTexture, 0);
          }, 3);
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return UseRenderTextureToModel;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "quad", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rtTexture", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/rotate.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Vec3, math, Component;

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
      Vec3 = module.Vec3;
      math = module.math;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

      cclegacy._RF.push({}, "28769dseGxNyq/PV1QPTk17", "rotate", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var rotate = exports('rotate', (_dec = ccclass("rotate"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(rotate, _Component);

        function rotate() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "xAxis", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "xTo", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "yAxis", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "yTo", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "zAxis", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "zTo", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "time", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "loop", _descriptor8, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "originEuler", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "currT", 0);

          return _this;
        }

        var _proto = rotate.prototype;

        _proto.start = function start() {
          // Your initialization goes here.
          this.originEuler.set(this.node.eulerAngles);
        };

        _proto.update = function update(dt) {
          // Your update function goes here.
          if (this.loop && this.currT + dt > this.time) {
            return;
          }

          this.currT = math.repeat(this.currT + dt, this.time);
          var x = this.xAxis ? math.lerp(this.originEuler.x, this.xTo, this.currT / this.time) : this.node.eulerAngles.x;
          var y = this.yAxis ? math.lerp(this.originEuler.y, this.yTo, this.currT / this.time) : this.node.eulerAngles.y;
          var z = this.zAxis ? math.lerp(this.originEuler.z, this.zTo, this.currT / this.time) : this.node.eulerAngles.z;
          this.node.setRotationFromEuler(x, y, z);
        };

        return rotate;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "xAxis", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "xTo", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "yAxis", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "yTo", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "zAxis", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "zTo", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "time", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "loop", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenClone.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, tween, Vec3, find, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      Vec3 = module.Vec3;
      find = module.find;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "2a301uexdZCzKvVP44F+yc2", "TweenClone", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var TweenClone = exports('TweenClone', (_dec = ccclass("TweenClone"), _dec2 = menu("tween/TweenClone"), _dec(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TweenClone, _Component);

        function TweenClone() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = TweenClone.prototype;

        _proto.onLoad = function onLoad() {
          // 先创建一个缓动作为模板
          var tweenTemplate = tween({}).to(4, {
            scale: new Vec3(3, 3, 3)
          }); // 复制 tween，并使用节点 cocos 作为 target

          this.tweenClone0 = tweenTemplate.clone(find('TweenClone/cocos')); // 复制 tween，并使用节点 cocos2 作为 target

          this.tweenClone1 = tweenTemplate.clone(find('TweenClone/cocos2'));
        };

        _proto.onEnable = function onEnable() {
          this.tweenClone0.start();
          this.tweenClone1.start();
        };

        _proto.onDisable = function onDisable() {
          this.tweenClone0.stop();
          this.tweenClone1.stop();
        };

        return TweenClone;
      }(Component)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RaycastModelTest.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Material, Camera, MeshRenderer, geometry, systemEvent, SystemEventType, Component;

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
      Material = module.Material;
      Camera = module.Camera;
      MeshRenderer = module.MeshRenderer;
      geometry = module.geometry;
      systemEvent = module.systemEvent;
      SystemEventType = module.SystemEventType;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "2b0a2MPT3xIFJHQ0fZRqYF2", "RaycastModelTest", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var RaycastModelTest = exports('RaycastModelTest', (_dec = ccclass("RaycastModelTest"), _dec2 = property({
        type: Material
      }), _dec3 = property({
        type: Material
      }), _dec4 = property({
        type: Camera
      }), _dec5 = property({
        type: MeshRenderer
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RaycastModelTest, _Component);

        function RaycastModelTest() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "defaultMaterial", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "rayMaterial", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "cameraCom", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "modelCom", _descriptor4, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_ray", new geometry.Ray());

          return _this;
        }

        var _proto = RaycastModelTest.prototype;

        _proto.onEnable = function onEnable() {
          systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
        };

        _proto.onDisable = function onDisable() {
          systemEvent.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
        };

        _proto.onTouchStart = function onTouchStart(touch, event) {
          var point = touch.getLocation();
          this.cameraCom.screenPointToRay(point.x, point.y, this._ray);

          if (geometry.intersect.rayModel(this._ray, this.modelCom.model)) {
            this.modelCom.material = this.rayMaterial;
          } else {
            this.modelCom.material = this.defaultMaterial;
          }
        };

        return RaycastModelTest;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "defaultMaterial", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rayMaterial", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cameraCom", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "modelCom", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/tiled.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, Size, UITransform, view, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Size = module.Size;
      UITransform = module.UITransform;
      view = module.view;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _temp;

      cclegacy._RF.push({}, "2b357qH4X1IbY1T5THVmIyE", "tiled", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var Tiled = exports('Tiled', (_dec = ccclass("Tiled"), _dec2 = menu('UI/Tiled'), _dec(_class = _dec2(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Tiled, _Component);

        function Tiled() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_startSize", new Size());

          return _this;
        }

        var _proto = Tiled.prototype;

        _proto.start = function start() {
          var uiTrans = this.getComponent(UITransform);

          this._startSize.set(uiTrans.contentSize);
        };

        _proto.update = function update(dt) {
          var size = view.getVisibleSize();
          var limit = size.width * 0.7;
          var uiTrans = this.getComponent(UITransform);
          var content = uiTrans.contentSize;
          var width = content.width;

          if (width > limit) {
            this.enabled = false;
          }

          uiTrans.setContentSize(width + 5, content.height);
        };

        return Tiled;
      }(Component), _temp)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NetworkCtrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Label, Asset, loader, sys, assetManager, assert, Component;

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
      Asset = module.Asset;
      loader = module.loader;
      sys = module.sys;
      assetManager = module.assetManager;
      assert = module.assert;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "2b4f5mwy11Bl7RSImxjHp/i", "NetworkCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property; // imported from socket-io.js

      var NetworkCtrl = exports('NetworkCtrl', (_dec = ccclass('NetworkCtrl'), _dec2 = property({
        type: Label
      }), _dec3 = property({
        type: Label
      }), _dec4 = property({
        type: Label
      }), _dec5 = property({
        type: Label
      }), _dec6 = property({
        type: Asset
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(NetworkCtrl, _Component);

        function NetworkCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "xhr", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "xhrAB", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "xhrTimeout", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "websocket", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "wssCacert", _descriptor5, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_reconnectCount", 0);

          _defineProperty(_assertThisInitialized(_this), "_xhrXHR", null);

          _defineProperty(_assertThisInitialized(_this), "_xhrHRAB", null);

          _defineProperty(_assertThisInitialized(_this), "_xhrXHRTimeout", null);

          _defineProperty(_assertThisInitialized(_this), "_wsiSendBinary", null);

          _defineProperty(_assertThisInitialized(_this), "_sioClient", null);

          _defineProperty(_assertThisInitialized(_this), "tag", '');

          return _this;
        }

        var _proto = NetworkCtrl.prototype; // use this for initialization

        _proto.start = function start() {
          this._wsiSendBinary = null;
          this._xhrXHR = null;
          this._xhrHRAB = null;
          this._xhrXHRTimeout = null;
          this.xhr.string = 'waiting..';
          this.xhrAB.string = 'waiting..';
          this.xhrTimeout.string = 'waiting..';
          this.websocket.string = 'waiting..';
          this.sendXHR();
          this.sendXHRAB();
          this.sendXHRTimeout();
          this.prepareWebSocket();
        };

        _proto.onDestroy = function onDestroy() {
          var wsiSendBinary = this._wsiSendBinary;

          if (wsiSendBinary) {
            wsiSendBinary.onopen = null;
            wsiSendBinary.onmessage = null;
            wsiSendBinary.onerror = null;
            wsiSendBinary.onclose = null;
            wsiSendBinary.close();
          }

          this.rmXhrEventListener(this._xhrXHR);
          this.rmXhrEventListener(this._xhrHRAB);
          this.rmXhrEventListener(this._xhrXHRTimeout);
        };

        _proto.sendXHR = function sendXHR() {
          var xhr = loader.getXMLHttpRequest();
          this.streamXHREventsToLabel(xhr, this.xhr, 'GET');
          xhr.open('GET', 'https://httpbin.org/get?show_env=1', true);

          if (sys.isNative) {
            xhr.setRequestHeader('Accept-Encoding', 'gzip,deflate');
          } // note: In Internet Explorer, the timeout property may be set only after calling the open()
          // method and before calling the send() method.


          xhr.timeout = 10000; // 10 seconds for timeout

          xhr.send();
          this._xhrXHR = xhr;
        };

        _proto.sendXHRAB = function sendXHRAB() {
          var xhr = loader.getXMLHttpRequest();
          this.streamXHREventsToLabel(xhr, this.xhrAB, 'POST');
          xhr.open('POST', 'https://httpbin.org/post'); // set Content-type "text/plain" to post ArrayBuffer or ArrayBufferView

          xhr.setRequestHeader('Content-Type', 'text/plain'); // Uint8Array is an ArrayBufferView

          xhr.send(new Uint8Array([1, 2, 3, 4, 5]));
          this._xhrHRAB = xhr;
        };

        _proto.sendXHRTimeout = function sendXHRTimeout() {
          var xhr = new XMLHttpRequest();
          this.streamXHREventsToLabel(xhr, this.xhrTimeout, 'GET');
          xhr.open('GET', 'https://192.168.22.222', true); // note: In Internet Explorer, the timeout property may be set only after calling the open()
          // method and before calling the send() method.

          xhr.timeout = 5000; // 5 seconds for timeout

          xhr.send();
          this._xhrXHRTimeout = xhr;
        };

        _proto.prepareWebSocket = function prepareWebSocket() {
          var self = this;
          var websocketLabel = this.websocket.node.getParent().getComponent(Label);
          var respLabel = this.websocket;
          var url = this.wssCacert.nativeUrl;

          if (assetManager.cacheManager) {
            url = assetManager.cacheManager.getCache(url) || assetManager.cacheManager.getTemp(url) || url;
          } // We should pass the cacert to libwebsockets used in native platform, otherwise the wss connection would be closed.
          // @ts-ignore


          this._wsiSendBinary = new WebSocket('wss://echo.websocket.org', [], url);
          this._wsiSendBinary.binaryType = 'arraybuffer';

          this._wsiSendBinary.onopen = function (evt) {
            respLabel.string = 'Opened!';
            websocketLabel.string = 'WebSocket: onopen';
          };

          this._wsiSendBinary.onmessage = function (evt) {
            var binary = new Uint8Array(evt.data);
            var binaryStr = 'response bin msg: ';
            var str = '0x';
            var hexMap = '0123456789ABCDEF'.split('');
            assert(hexMap.length == 16);

            for (var i = 0; i < binary.length; i++) {
              str += hexMap[binary[i] >> 4];
              str += hexMap[binary[i] & 0x0F];
            }

            binaryStr += str;
            respLabel.string = binaryStr;
            websocketLabel.string = 'WebSocket: onmessage';
          };

          this._wsiSendBinary.onerror = function (evt) {
            websocketLabel.string = 'WebSocket: onerror';
            respLabel.string = 'Error!';
          };

          this._wsiSendBinary.onclose = function (evt) {
            websocketLabel.string = 'WebSocket: onclose'; // After close, it's no longer possible to use it again,
            // if you want to send another request, you need to create a new websocket instance

            self._wsiSendBinary = null;
            respLabel.string = 'Close!';
          };

          this.scheduleOnce(this.sendWebSocketBinary, 1);
        };

        _proto.sendWebSocketBinary = function sendWebSocketBinary() {
          var _this2 = this;

          var websocketLabel = this.websocket.node.getParent().getComponent(Label);

          if (!this._wsiSendBinary) {
            return;
          }

          if (this._wsiSendBinary.readyState === WebSocket.OPEN) {
            websocketLabel.string = 'WebSocket: sendbinary';
            var buf = 'Hello WebSocket中文,\0 I\'m\0 a\0 binary\0 message\0.';
            var arrData = new Uint16Array(buf.length);

            for (var i = 0; i < buf.length; i++) {
              arrData[i] = buf.charCodeAt(i);
            }

            this._wsiSendBinary.send(arrData.buffer);
          } else {
            var warningStr = 'send binary websocket instance wasn\'t ready...';
            websocketLabel.string = 'WebSocket: not ready';
            this.websocket.string = warningStr;
            this.scheduleOnce(function () {
              _this2.sendWebSocketBinary();
            }, 1);
          }
        };

        _proto.streamXHREventsToLabel = function streamXHREventsToLabel(xhr, label, method, responseHandler) {
          var handler = responseHandler || function (response) {
            return method + ' Response (30 chars): ' + response.substring(0, 30) + '...';
          };

          var eventLabel = label.node.getParent().getComponent(Label);
          var eventLabelOrigin = eventLabel.string; // Simple events

          ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventName) {
            xhr['on' + eventName] = function () {
              eventLabel.string = eventLabelOrigin + '\nEvent : ' + eventName;

              if (eventName === 'timeout') {
                label.string += '(timeout)';
              } else if (eventName === 'loadend') {
                label.string += '...loadend!';
              }
            };
          }); // Special event

          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status >= 200) {
              label.string = handler(xhr.responseText);
            } else if (xhr.status === 404) {
              label.string = '404 page not found!';
            } else if (xhr.readyState === 3) {
              label.string = 'Request dealing!';
            } else if (xhr.readyState === 2) {
              label.string = 'Request received!';
            } else if (xhr.readyState === 1) {
              label.string = 'Server connection established! Request hasn\'t been received';
            } else if (xhr.readyState === 0) {
              label.string = 'Request hasn\'t been initiated!';
            }
          };
        };

        _proto.rmXhrEventListener = function rmXhrEventListener(xhr) {
          if (!xhr) {
            return;
          }

          ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventName) {
            xhr['on' + eventName] = null;
          });
          xhr.onreadystatechange = null;
        };

        return NetworkCtrl;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "xhr", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "xhrAB", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "xhrTimeout", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "websocket", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "wssCacert", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AsyncFunctionsTest.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './ui-log.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, cclegacy, _decorator, Component, UILog;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      UILog = module.UILog;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "2c510NsGGFIbpHzebAjhUU0", "AsyncFunctionsTest", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var AsyncFunctionsTest = exports('AsyncFunctionsTest', (_dec = ccclass('AsyncFunctionsTest'), _dec2 = menu('TestCases/Scripting/LanguageFeature/AsyncFunctionsTest'), _dec3 = property(UILog), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AsyncFunctionsTest, _Component);

        function AsyncFunctionsTest() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "logPanel", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = AsyncFunctionsTest.prototype;

        _proto.start = function start() {
          var _this2 = this;

          _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    // Directly running an async function should be OK.
                    _this2._getLogPanelChecked().addLabel("Async function starts at " + new Date()); // cc.log(`Async function starts at ${new Date()}`);


                    _context.next = 3;
                    return sleep(2000);

                  case 3:
                    _this2._getLogPanelChecked().addLabel("Async function ends at " + new Date() + "(Expected: 2 seconds past)"); // cc.log(`Async function ends at ${new Date()}(Expected: 2 seconds past)`);


                    _context.prev = 4;

                    _this2._getLogPanelChecked().addLabel("Async function(which is throw-ful) starts at " + new Date());

                    _context.next = 8;
                    return sleepThrow(1000);

                  case 8:
                    _context.next = 13;
                    break;

                  case 10:
                    _context.prev = 10;
                    _context.t0 = _context["catch"](4);

                    _this2._getLogPanelChecked().addLabel("Async function(which is throw-ful) throws \"" + _context.t0 + "\" at " + new Date() + "(Expected: 1 seconds past)");

                  case 13:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[4, 10]]);
          }))();
        };

        _proto._getLogPanelChecked = function _getLogPanelChecked() {
          if (this.isValid) {
            return this.logPanel;
          } else {
            // This may happen if the scene has been destroyed.
            // For simplification, we return a mocking stuff...
            return {
              addLabel: function addLabel() {// ...
              }
            };
          }
        };

        return AsyncFunctionsTest;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "logPanel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class) || _class));

      function sleep(_x) {
        return _sleep.apply(this, arguments);
      }

      function _sleep() {
        _sleep = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(duration) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return new Promise(function (resolve, reject) {
                    // `await` in async function should be OK.
                    setTimeout(function () {
                      resolve();
                    }, duration);
                  });

                case 2:
                  return _context3.abrupt("return", _context3.sent);

                case 3:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));
        return _sleep.apply(this, arguments);
      }

      var sleepThrow = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(at) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return new Promise(function (resolve, reject) {
                    // `await` in lambda should be OK.
                    setTimeout(function () {
                      reject(new Error("Oops..."));
                    }, at);
                  });

                case 2:
                  return _context2.abrupt("return", _context2.sent);

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function sleepThrow(_x2) {
          return _ref2.apply(this, arguments);
        };
      }();

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/batch-tester.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Prefab, Label, Slider, director, instantiate, Component;

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
      Prefab = module.Prefab;
      Label = module.Label;
      Slider = module.Slider;
      director = module.director;
      instantiate = module.instantiate;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

      cclegacy._RF.push({}, "2e116ACZoBGcpoJL3RMAD5+", "batch-tester", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BatchTester = exports('BatchTester', (_dec = ccclass('BatchTester'), _dec2 = property(Prefab), _dec3 = property(Label), _dec4 = property(Slider), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BatchTester, _Component);

        function BatchTester() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "prefab", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "label", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "slider", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "count", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "xinterval", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "zinterval", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "hoverSpeed", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "maxCount", _descriptor8, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_nodes", []);

          _defineProperty(_assertThisInitialized(_this), "_delays", []);

          return _this;
        }

        var _proto = BatchTester.prototype;

        _proto.start = function start() {
          for (var i = 0; i < this.count; i++) {
            for (var j = 0; j < 10; j++) {
              this._createBatch(i, j);
            }
          }

          this.label.string = 'Boxes: ' + this.count * 100;
          this.slider.progress = this.count / this.maxCount;
        };

        _proto.update = function update() {
          var t = director.getCurrentTime();

          for (var i = 0; i < this._nodes.length; i++) {
            var node = this._nodes[i];
            var delay = this._delays[i];
            var position = node.position;
            var y = Math.sin(delay + t * this.hoverSpeed);
            node.setPosition(position.x, y, position.z);
          }
        };

        _proto.setCount = function setCount(e) {
          var count = Math.floor(e.progress * this.maxCount);

          if (count > this.count) {
            for (var i = this.count; i < count; i++) {
              for (var j = 0; j < 10; j++) {
                this._createBatch(i, j);
              }
            }
          } else {
            if (this._nodes.length > 0) {
              for (var _i = count; _i < this.count; _i++) {
                for (var _j = 0; _j < 10; _j++) {
                  var _this$_nodes$splice$;

                  var idx = count * 100;
                  (_this$_nodes$splice$ = this._nodes.splice(idx, 10)[0].parent) === null || _this$_nodes$splice$ === void 0 ? void 0 : _this$_nodes$splice$.setParent(null);

                  this._delays.splice(idx, 10);
                }
              }
            }
          }

          this.count = count;
          this.label.string = 'Boxes: ' + this.count * 100;
        };

        _proto._createBatch = function _createBatch(i, j) {
          var node = instantiate(this.prefab);
          node.setPosition(j * this.xinterval, 0, i * this.zinterval);
          node.name = '' + (i * 10 + j) * 10;
          node.setParent(this.node.parent);
          Array.prototype.push.apply(this._nodes, node.children);
          Array.prototype.push.apply(this._delays, node.children.map(function () {
            return Math.random() * Math.PI * 2;
          }));
        };

        return BatchTester;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "slider", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "count", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 15;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "xinterval", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 6;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "zinterval", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "hoverSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.01;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "maxCount", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/loadSubPack.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Button, loader, math, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Button = module.Button;
      loader = module.loader;
      math = module.math;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "30af6PoiY9LnL7y8Z0Qg4vY", "loadSubPack", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var loadSubPack = exports('loadSubPack', (_dec = ccclass("loadSubPack"), _dec2 = property({
        type: Label
      }), _dec3 = property({
        type: Button
      }), _dec4 = property({
        type: Button
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(loadSubPack, _Component);

        function loadSubPack() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "label", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "createButton_1", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "createButton_2", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = loadSubPack.prototype;

        _proto.start = function start() {
          // Your initialization goes here.
          this.loadSubPackages();
        };

        _proto.loadSubPackages = function loadSubPackages() {
          var _this2 = this;

          this.createButton_1.node.active = false;
          this.createButton_2.node.active = false;
          this.label.string = 'Load subPackage...';
          loader.downloader.loadSubpackage('sub-pack-01', function (err) {
            if (err) {
              _this2.label.string = 'load sub-pack-01 failed!';
              _this2.label.color = math.Color.RED;
              return console.error(err);
            }

            _this2.label.string = 'load sub-pack-01 success!';
            console.log("load subpackage(sub-pack-01) successfully.");
            _this2.createButton_1.node.active = true;
            loader.downloader.loadSubpackage('sub-pack-02', function (err) {
              if (err) {
                _this2.label.string = 'load sub-pack-02 failed!';
                _this2.label.color = math.Color.RED;
                return console.error(err);
              }

              _this2.label.string += '\n load sub-pack-02 success!';
              console.log("load subpackage(sub-pack-02) successfully.");
              _this2.createButton_2.node.active = true;
              _this2.label.string += '\n load all success!';
            });
          });
        };

        _proto.jumpToSubScene01 = function jumpToSubScene01() {
          director.loadScene('subPack01');
        };

        _proto.jumpToSubScene02 = function jumpToSubScene02() {
          director.loadScene('subPack02');
        };

        return loadSubPack;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "createButton_1", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "createButton_2", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TransformController.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Node, Toggle, Vec3, Component;

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
      Node = module.Node;
      Toggle = module.Toggle;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

      cclegacy._RF.push({}, "31227RC6XlF3qraA74BrA9+", "TransformController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var _temp_num = 0;
      var TransformController = exports('TransformController', (_dec = ccclass("TransformController"), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Toggle
      }), _dec7 = property({
        type: Toggle
      }), _dec8 = property({
        type: Toggle
      }), _dec9 = property({
        type: Toggle
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TransformController, _Component);

        function TransformController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "particle1", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "particle2", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "particle3", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "particle4", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "check1", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "check2", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "check3", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "check4", _descriptor8, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_translate", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_rotate", new Vec3());

          return _this;
        }

        var _proto = TransformController.prototype;

        _proto.start = function start() {// Your initialization goes here.
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        _proto.onTranslateChanged = function onTranslateChanged(slider, data) {
          this._translate.set(0, 0, slider.progress * 10 - _temp_num);

          _temp_num = slider.progress * 10;

          if (this.check1.isChecked) {
            this.particle1.translate(this._translate);
          }

          if (this.check2.isChecked) {
            this.particle2.translate(this._translate);
          }

          if (this.check3.isChecked) {
            this.particle3.translate(this._translate);
          }

          if (this.check4.isChecked) {
            this.particle4.translate(this._translate);
          }
        };

        _proto.onRotateChanged = function onRotateChanged(slider, data) {
          this._rotate.set(slider.progress * 90, 0, 0);

          if (this.check1.isChecked) {
            this.particle1.setRotationFromEuler(this.particle1.eulerAngles.x, this._rotate.x, this.particle1.eulerAngles.z);
          }

          if (this.check2.isChecked) {
            this.particle2.setRotationFromEuler(this.particle2.eulerAngles.x, this._rotate.x, this.particle2.eulerAngles.z);
          }

          if (this.check3.isChecked) {
            this.particle3.setRotationFromEuler(this.particle3.eulerAngles.x, this._rotate.x, this.particle3.eulerAngles.z);
          }

          if (this.check4.isChecked) {
            this.particle4.setRotationFromEuler(this.particle4.eulerAngles.x, this._rotate.x, this.particle4.eulerAngles.z);
          }
        };

        return TransformController;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "particle1", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "particle2", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "particle3", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "particle4", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "check1", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "check2", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "check3", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "check4", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/migrate-canvas.ts", ['cc'], function () {
  'use strict';

  var cclegacy, director, Director, Canvas, Camera, game, Node;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
      Director = module.Director;
      Canvas = module.Canvas;
      Camera = module.Camera;
      game = module.game;
      Node = module.Node;
    }],
    execute: function () {
      cclegacy._RF.push({}, "357c1B+j+ZEKrORrCBMY+0Y", "migrate-canvas", undefined);

      var customLayerMask = 0x000fffff;
      var builtinLayerMask = 0xfff00000;
      director.on(Director.EVENT_AFTER_SCENE_LAUNCH, function () {
        var _director$getScene, _director$getScene2, _director$getScene3;

        var roots = (_director$getScene = director.getScene()) === null || _director$getScene === void 0 ? void 0 : _director$getScene.children;
        var allCanvases = (_director$getScene2 = director.getScene()) === null || _director$getScene2 === void 0 ? void 0 : _director$getScene2.getComponentsInChildren(Canvas);
        if (allCanvases.length <= 1) return;
        allCanvases = allCanvases.filter(function (x) {
          return !!x.cameraComponent;
        });
        var allCameras = (_director$getScene3 = director.getScene()) === null || _director$getScene3 === void 0 ? void 0 : _director$getScene3.getComponentsInChildren(Camera);
        var usedLayer = 0;
        allCameras.forEach(function (x) {
          return usedLayer |= x.visibility & customLayerMask;
        });
        var persistCanvas = [];

        for (var i = 0, l = roots.length; i < l; i++) {
          var root = roots[i];
          if (!game.isPersistRootNode(root)) continue;
          var canvases = root.getComponentsInChildren(Canvas);
          if (canvases.length === 0) continue;
          persistCanvas.push.apply(persistCanvas, canvases.filter(function (x) {
            return !!x.cameraComponent;
          }));
        }

        persistCanvas.forEach(function (val) {
          var isLayerCollided = allCanvases.find(function (x) {
            return x !== val && x.cameraComponent.visibility & val.cameraComponent.visibility & customLayerMask;
          });

          if (isLayerCollided) {
            var availableLayers = ~usedLayer;
            var lastAvailableLayer = availableLayers & ~(availableLayers - 1);
            val.cameraComponent.visibility = lastAvailableLayer | val.cameraComponent.visibility & builtinLayerMask;
            setChildrenLayer(val.node, lastAvailableLayer);
            usedLayer |= availableLayers;
          }
        });
      });

      function setChildrenLayer(node, layer) {
        for (var i = 0, l = node.children.length; i < l; i++) {
          node.children[i].layer = layer;
          setChildrenLayer(node.children[i], layer);
        }
      }

      var setParentEngine = Node.prototype.setParent;
      {
        Node.prototype.setParent = function (value, keepWorldTransform) {
          setParentEngine.call(this, value, keepWorldTransform);
          if (!value) return; // find canvas

          var layer = getCanvasCameraLayer(this);

          if (layer) {
            this.layer = layer;
            setChildrenLayer(this, layer);
          }
        };
      }

      function getCanvasCameraLayer(node) {
        var layer = 0;
        var canvas = node.getComponent(Canvas);

        if (canvas && canvas.cameraComponent) {
          if (canvas.cameraComponent.visibility & canvas.node.layer) {
            layer = canvas.node.layer;
          } else {
            layer = canvas.cameraComponent.visibility & ~(canvas.cameraComponent.visibility - 1);
          }

          return layer;
        }

        if (node.parent) {
          layer = getCanvasCameraLayer(node.parent);
        }

        return layer;
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/system-event-PC.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, systemEvent, SystemEventType, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      systemEvent = module.systemEvent;
      SystemEventType = module.SystemEventType;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "3624chdE5lPlaJCHJz9nFgZ", "system-event-PC", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var systemEventPC = exports('systemEventPC', (_dec = ccclass("systemEventPC"), _dec2 = property(Label), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(systemEventPC, _Component);

        function systemEventPC() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "labelShow", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = systemEventPC.prototype;

        _proto.start = function start() {
          systemEvent.on(SystemEventType.MOUSE_DOWN, this.onMouseDown, this);
          systemEvent.on(SystemEventType.MOUSE_UP, this.onMouseUp, this);
          systemEvent.on(SystemEventType.MOUSE_MOVE, this.onMouseMove, this);
          systemEvent.on(SystemEventType.MOUSE_WHEEL, this.onMouseScroll, this);
          systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
          systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
        };

        _proto.onDestroy = function onDestroy() {
          systemEvent.off(SystemEventType.MOUSE_DOWN, this.onMouseDown, this);
          systemEvent.off(SystemEventType.MOUSE_UP, this.onMouseUp, this);
          systemEvent.off(SystemEventType.MOUSE_MOVE, this.onMouseMove, this);
          systemEvent.off(SystemEventType.MOUSE_WHEEL, this.onMouseScroll, this);
          systemEvent.off(SystemEventType.KEY_DOWN, this.onKeyDown, this);
          systemEvent.off(SystemEventType.KEY_UP, this.onKeyUp, this);
        };

        _proto.onMouseDown = function onMouseDown(event) {
          this.labelShow.string = "MOUSE_DOWN: " + event.getLocation();
        };

        _proto.onMouseMove = function onMouseMove(event) {
          this.labelShow.string = "MOUSE_MOVE: " + event.getLocation();
        };

        _proto.onMouseUp = function onMouseUp(event) {
          this.labelShow.string = 'MOUSE_UP';
        };

        _proto.onMouseScroll = function onMouseScroll(event) {
          this.labelShow.string = "MOUSE_SCROLL: " + event.getScrollY();
        };

        _proto.onTouchCancel = function onTouchCancel(event) {
          this.labelShow.string = 'MOUSE_LEAVE';
        };

        _proto.onKeyDown = function onKeyDown(event) {
          this.labelShow.string = "KeyDown: " + String.fromCharCode(event.keyCode);
        };

        _proto.onKeyUp = function onKeyUp() {
          this.labelShow.string = "KeyUp";
        };

        return systemEventPC;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "labelShow", [_dec2], {
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

System.register("chunks:///_virtual/RaycastColliderTest.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Material, Camera, MeshRenderer, geometry, systemEvent, SystemEventType, PhysicsSystem, Component;

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
      Material = module.Material;
      Camera = module.Camera;
      MeshRenderer = module.MeshRenderer;
      geometry = module.geometry;
      systemEvent = module.systemEvent;
      SystemEventType = module.SystemEventType;
      PhysicsSystem = module.PhysicsSystem;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "37034s9FztAjYJasirfUmAr", "RaycastColliderTest", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var RaycastColliderTest = exports('RaycastColliderTest', (_dec = ccclass("RaycastColliderTest"), _dec2 = property({
        type: Material
      }), _dec3 = property({
        type: Material
      }), _dec4 = property({
        type: Camera
      }), _dec5 = property({
        type: MeshRenderer
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RaycastColliderTest, _Component);

        function RaycastColliderTest() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "defaultMaterial", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "rayMaterial", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "cameraCom", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "modelCom", _descriptor4, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_ray", new geometry.Ray());

          return _this;
        }

        var _proto = RaycastColliderTest.prototype;

        _proto.onEnable = function onEnable() {
          systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
        };

        _proto.onDisable = function onDisable() {
          systemEvent.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
        };

        _proto.onTouchStart = function onTouchStart(touch, event) {
          this.cameraCom.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);

          if (PhysicsSystem.instance.raycast(this._ray)) {
            var r = PhysicsSystem.instance.raycastResults;

            for (var i = 0; i < r.length; i++) {
              var item = r[i];

              if (item.collider.node.uuid == this.modelCom.node.uuid) {
                this.modelCom.material = this.rayMaterial;
              }
            }
          } else {
            this.modelCom.material = this.defaultMaterial;
          }
        };

        return RaycastColliderTest;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "defaultMaterial", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rayMaterial", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cameraCom", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "modelCom", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/mask-use-image-stencil.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, SpriteFrame, Label, Mask, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      Label = module.Label;
      Mask = module.Mask;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "37545UEL51DoZgd4hrYyzOH", "mask-use-image-stencil", undefined);

      var ccclass = _decorator.ccclass,
          type = _decorator.type;
      var MaskUseImageStencil = exports('MaskUseImageStencil', (_dec = ccclass('MaskUseImageStencil'), _dec2 = type(SpriteFrame), _dec3 = type(Label), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MaskUseImageStencil, _Component);

        function MaskUseImageStencil() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "image", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "label", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = MaskUseImageStencil.prototype;

        _proto.start = function start() {
          var _this2 = this;

          var mask = this.getComponent(Mask);
          this.scheduleOnce(function () {
            mask.type = Mask.Type.IMAGE_STENCIL;

            _this2.scheduleOnce(function () {
              mask.enabled = false;

              _this2.scheduleOnce(function () {
                mask.type = Mask.Type.GRAPHICS_STENCIL;
                var g = mask.graphics;
                g.clear();
                g.lineWidth = 10;
                g.fillColor.fromHEX('#ff0000');
                g.moveTo(-80, 0);
                g.lineTo(0, -150);
                g.lineTo(80, 0);
                g.lineTo(0, 150);
                g.close();
                g.stroke();
                g.fill();
                mask.enabled = true;

                _this2.scheduleOnce(function () {
                  mask.spriteFrame = mask.spriteFrame = _this2.image;
                  mask.type = Mask.Type.IMAGE_STENCIL;
                  mask.alphaThreshold = 0.1;

                  _this2.scheduleOnce(function () {
                    mask.type = Mask.Type.RECT;
                    _this2.label.string = '测试完成';
                  }, 2);
                }, 2);
              }, 1);
            }, 1);
          }, 2);
        };

        return MaskUseImageStencil;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "image", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/label-model-component.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, _createClass, cclegacy, _decorator, Color, Font, quat, Vec3, Camera, Canvas, Node, UITransform, Label, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      Font = module.Font;
      quat = module.quat;
      Vec3 = module.Vec3;
      Camera = module.Camera;
      Canvas = module.Canvas;
      Node = module.Node;
      UITransform = module.UITransform;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "378c6HWD4pOybbqKzh7da60", "label-model-component", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var LabelModelComponent = exports('LabelModelComponent', (_dec = ccclass('LabelModelComponent'), _dec2 = menu('自定义脚本/LabelModel/label-model-component'), _dec3 = property({
        type: Color
      }), _dec4 = property({
        type: Font
      }), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LabelModelComponent, _Component);

        function LabelModelComponent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "_string", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "_typeName", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "_color", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "_font", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "_priority", _descriptor5, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_label", null);

          _defineProperty(_assertThisInitialized(_this), "_camera", null);

          _defineProperty(_assertThisInitialized(_this), "_worldRot", quat());

          _defineProperty(_assertThisInitialized(_this), "_lastCameraWPos", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_wPos", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_cameraWPos", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_lastWPos", new Vec3());

          return _this;
        }

        var _proto = LabelModelComponent.prototype;

        _proto.onEnable = function onEnable() {
          this._camera = this.node.scene.getComponentInChildren(Camera);

          if (this.labelInit()) {
            return;
          }

          var canvas = this.node.scene.getComponentInChildren(Canvas);

          if (!canvas) {
            return;
          }

          var root = canvas.node.getChildByName('label-model-manager');

          if (!root) {
            root = new Node('label-model-manager');
            root.setParent(canvas.node);
            root.setSiblingIndex(0);
            root.addComponent(UITransform);
          }

          var labelNode = new Node(this._typeName);
          labelNode.setParent(root);
          var labelTrans = labelNode.getComponent(UITransform);
          var label = labelNode.addComponent(Label);
          labelTrans.setContentSize(200, 50);
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          this._label = label;
          this.labelInit();
        };

        _proto.lateUpdate = function lateUpdate() {
          this._camera.node.getWorldRotation(this._worldRot);

          this.node.setWorldRotation(this._worldRot);

          if (!this._camera || !this._label) {
            return;
          }

          this.node.getWorldPosition(this._wPos);

          this._camera.node.getWorldPosition(this._cameraWPos);

          if (this._cameraWPos.equals(this._lastCameraWPos) && this._wPos.equals(this._lastWPos)) {
            return;
          }

          this._lastCameraWPos.set(this._cameraWPos);

          this._lastWPos.set(this._wPos); // [HACK]
          // @ts-ignore


          this._camera._camera.update();

          this._camera.convertToUINode(this._wPos, this._label.node.parent, this._wPos);

          this._label.node.setPosition(this._wPos);
        };

        _proto.onDisable = function onDisable() {
          if (this._label) {
            this._label.node.active = false;
          }
        };

        _proto.onDestroy = function onDestroy() {
          if (this._label && this._label.node) {
            this._label.node.destroy();
          }
        };

        _proto.labelInit = function labelInit() {
          if (this._label) {
            this._label.string = this._string;
            this._label.font = this._font;
            this._label.color = this._color;
            this._label.node.active = true;
            return true;
          }

          return false;
        };

        _createClass(LabelModelComponent, [{
          key: "color",
          get: function get() {
            return this._color;
          },
          set: function set(value) {
            this._color.set(value);
          }
        }, {
          key: "string",
          get: function get() {
            return this._string;
          },
          set: function set(value) {
            this._string = value;
          }
        }, {
          key: "typeName",
          get: function get() {
            return this._typeName;
          },
          set: function set(value) {
            this._typeName = value;
          }
        }, {
          key: "font",
          get: function get() {
            return this._font;
          },
          set: function set(value) {
            this._font = value;
          }
        }, {
          key: "priority",
          get: function get() {
            return this._priority;
          },
          set: function set(value) {
            this._priority = value;
          }
        }]);

        return LabelModelComponent;
      }(Component), _temp), (_applyDecoratedDescriptor(_class2.prototype, "color", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "string", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "string"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "typeName", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "typeName"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "font", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "font"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "priority", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "priority"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_string", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_typeName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'name-block';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_color", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Color.WHITE.clone();
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_font", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_priority", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/shield-node.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, TiledLayer, Prefab, v2, Vec3, Component, instantiate, SystemEventType;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      TiledLayer = module.TiledLayer;
      Prefab = module.Prefab;
      v2 = module.v2;
      Vec3 = module.Vec3;
      Component = module.Component;
      instantiate = module.instantiate;
      SystemEventType = module.SystemEventType;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "39257srVZlHmqGvdeIRPFlt", "shield-node", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ShieldNode = exports('ShieldNode', (_dec = ccclass('ShieldNode'), _dec2 = property({
        type: TiledLayer
      }), _dec3 = property({
        type: Prefab
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ShieldNode, _Component);

        function ShieldNode() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "tiledLayer", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodePrefab", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ShieldNode.prototype;

        _proto.start = function start() {
          this.initScene(this.nodePrefab);
        };

        _proto.initScene = function initScene(prefab) {
          var _this2 = this;

          var posArr = [v2(-249, 96), v2(-150, 76), v2(-60, 54), v2(-248, -144), v2(-89, -34)];
          var tmpP = new Vec3();

          var _loop = function _loop(i) {
            var shieldNode = instantiate(prefab);
            shieldNode.setPosition(posArr[i].x, posArr[i].y);

            _this2.tiledLayer.addUserNode(shieldNode);

            shieldNode.on(SystemEventType.TOUCH_MOVE, function (event) {
              var deltaMove = event.getUIDelta();
              shieldNode.getPosition(tmpP);
              tmpP.x += deltaMove.x;
              tmpP.y += deltaMove.y;
              shieldNode.setPosition(tmpP);
            });
          };

          for (var i = 0; i < posArr.length; i++) {
            _loop(i);
          }
        };

        return ShieldNode;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tiledLayer", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nodePrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/render-ui-to-model.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, MeshRenderer, Canvas, RenderTexture, view, Component;

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
      MeshRenderer = module.MeshRenderer;
      Canvas = module.Canvas;
      RenderTexture = module.RenderTexture;
      view = module.view;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "39d78FLjklEWZX29QTsFrlf", "render-ui-to-model", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var RenderUIToModel = exports('RenderUIToModel', (_dec = ccclass('RenderUIToModel'), _dec2 = menu('RenderTexture/RenderUIToModel'), _dec3 = property(MeshRenderer), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RenderUIToModel, _Component);

        function RenderUIToModel() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "model", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "renderTexture", null);

          return _this;
        }

        var _proto = RenderUIToModel.prototype;

        _proto.start = function start() {
          var canvas = this.getComponent(Canvas);
          var tex = new RenderTexture();
          tex.name = 'render-ui-to-model';
          var size = view.getVisibleSize();
          tex.reset({
            width: size.width,
            height: size.height
          });
          this.renderTexture = tex;
          canvas.targetTexture = tex;
          var mat = this.model.material;
          mat.setProperty('mainTexture', tex);
        };

        _proto.onDestroy = function onDestroy() {
          if (this.renderTexture) {
            this.renderTexture.destroy();
            this.renderTexture = null;
          }
        };

        return RenderUIToModel;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "model", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SpineSkin.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, sp, Component;

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
      sp = module.sp;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "3f265FzgzJO6pzW2KvpATcO", "SpineSkin", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SpineSkin = exports('SpineSkin', (_dec = ccclass('SpineSkin'), _dec2 = property({
        type: sp.Skeleton
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SpineSkin, _Component);

        function SpineSkin() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "spine", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "skinId", 0);

          return _this;
        }

        var _proto = SpineSkin.prototype;

        _proto.start = function start() {// Your initialization goes here.
        };

        _proto.change = function change() {
          var skins = ['girl', 'boy', 'girl-blue-cape', 'girl-spring-dress'].map(function (x) {
            return "full-skins/" + x;
          });
          this.skinId = (this.skinId + 1) % skins.length;
          this.spine.setSkin(skins[this.skinId]);
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return SpineSkin;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "spine", [_dec2], {
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

System.register("chunks:///_virtual/sport_light_2.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "4078agfjjFO0bRMuakuCcmd", "sport_light_2", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var sport_light_1 = exports('sport_light_1', (_dec = ccclass('sport_light_2'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(sport_light_1, _Component);

        function sport_light_1() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_nowA", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_time", 0);

          return _this;
        }

        var _proto = sport_light_1.prototype;

        _proto.start = function start() {
          // Your initialization goes here.
          this._nowA = this.node.eulerAngles;
        };

        _proto.update = function update(deltaTime) {
          // Your update function goes here.
          this._time += 0.01;
          this._nowA.x = (Math.cos(this._time) + 1.0) * 0.5 * -90.0 - 90.0;
          this.node.setRotationFromEuler(this._nowA.x, this._nowA.y, this._nowA.z);
        };

        return sport_light_1;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/static-ui.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, UIStaticBatch, sys, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      UIStaticBatch = module.UIStaticBatch;
      sys = module.sys;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "408fcDtyplHQJTZZxumfuDE", "static-ui", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var StaticUI = exports('StaticUI', (_dec = ccclass("StaticUI"), _dec2 = menu('UI/StaticUI'), _dec3 = property(Label), _dec4 = property({
        type: [UIStaticBatch]
      }), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(StaticUI, _Component);

        function StaticUI() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "tipLabel", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "newSceneName", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "uiStaticBatchCompList", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = StaticUI.prototype;

        _proto.start = function start() {
          this.scheduleOnce(this.func, 1.5);
          var local = sys.localStorage;
          var item = local.getItem('ui-static-level');

          if (item) {
            this.tipLabel.string = "\u7B2C " + parseInt(item) + " \u6B21\u5207\u56DE";
          } else {
            this.tipLabel.string = "\u7B2C 0 \u6B21\u5207\u56DE";
          }

          for (var i = 0; i < this.uiStaticBatchCompList.length; i++) {
            var element = this.uiStaticBatchCompList[i];
            element.markAsDirty();
          }
        };

        _proto.func = function func() {
          var local = sys.localStorage;
          var item = local.getItem('ui-static-level');

          if (item) {
            var level = parseInt(item);

            if (level > 5) {
              local.removeItem('ui-static-level');
              return;
            }

            level++;

            if (this.newSceneName === 'static-ui') {
              local.setItem('ui-static-level', "" + level);
            }
          } else if (this.newSceneName === 'static-ui') {
            local.setItem('ui-static-level', '1');
          }

          director.loadScene(this.newSceneName);
        };

        return StaticUI;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tipLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "newSceneName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "uiStaticBatchCompList", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenThen.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, tween, Vec3, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "41b6eByJ95GqoEm8dx4EHvo", "TweenThen", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var TweenThen = exports('TweenThen', (_dec = ccclass("TweenThen"), _dec2 = menu("tween/TweenThen"), _dec(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TweenThen, _Component);

        function TweenThen() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = TweenThen.prototype;

        _proto.onLoad = function onLoad() {
          var scale = tween().to(1, {
            scale: new Vec3(2, 2, 2)
          });
          var rotate = tween().to(1, {
            eulerAngles: new Vec3(45, 45, 45)
          });
          var move = tween().to(1, {
            position: new Vec3(0, 5, 0)
          }); // 先缩放，再旋转，再移动

          this.tweenThen = tween(this.node).then(scale).then(rotate).then(move);
        };

        _proto.onEnable = function onEnable() {
          this.tweenThen.start();
        };

        _proto.onDisable = function onDisable() {
          this.tweenThen.stop();
        };

        return TweenThen;
      }(Component)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/acceleration-event.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Node, Label, Vec2, systemEvent, SystemEventType, Component;

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
      Node = module.Node;
      Label = module.Label;
      Vec2 = module.Vec2;
      systemEvent = module.systemEvent;
      SystemEventType = module.SystemEventType;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "44134JoDuRB5akTgWYcuSTB", "acceleration-event", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var accelerationEvent = exports('accelerationEvent', (_dec = ccclass('accelerationEvent'), _dec2 = property(Node), _dec3 = property(Label), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(accelerationEvent, _Component);

        function accelerationEvent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "target", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "btnLabel", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "speed", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "acc", new Vec2(0, 0));

          _defineProperty(_assertThisInitialized(_this), "accelerometerEnable", false);

          return _this;
        }

        var _proto = accelerationEvent.prototype;

        _proto.start = function start() {
          this.accelerometerEnable = false;
          systemEvent.setAccelerometerInterval(0.5);
          systemEvent.on(SystemEventType.DEVICEMOTION, this.moveBall, this);
        };

        _proto.onDestroy = function onDestroy() {
          systemEvent.off(SystemEventType.DEVICEMOTION, this.moveBall, this);
        };

        _proto.update = function update(dt) {
          var pos = this.target.position;
          this.target.setPosition(pos.x + this.acc.x * dt * this.speed, pos.y);
          pos = this.target.position;
          this.target.setPosition(pos.x, pos.y, pos.z + -this.acc.y * dt * this.speed);
        };

        _proto.moveBall = function moveBall(event) {
          this.acc.x = event.acc.x;
          this.acc.y = event.acc.y;
        };

        _proto.onOpenAccelerometer = function onOpenAccelerometer() {
          this.accelerometerEnable = !this.accelerometerEnable;

          if (this.accelerometerEnable) {
            this.btnLabel.string = 'Accelerometer On';
          } else {
            this.btnLabel.string = 'Accelerometer Off';
          }

          if (!this.accelerometerEnable) {
            this.acc.x = 0;
            this.acc.y = 0;
          }

          systemEvent.setAccelerometerEnabled(this.accelerometerEnable);
        };

        _proto.resetPosition = function resetPosition() {
          this.target.setPosition(0, 0.5, 0);
        };

        return accelerationEvent;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/first-person-camera.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, math, macro, systemEvent, SystemEvent, game, Component;

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
      math = module.math;
      macro = module.macro;
      systemEvent = module.systemEvent;
      SystemEvent = module.SystemEvent;
      game = module.game;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "445598TP61LhoVLGOAdP05g", "first-person-camera", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Vec2 = math.Vec2,
          Vec3 = math.Vec3,
          Quat = math.Quat;
      var v2_1 = new Vec2();
      var v2_2 = new Vec2();
      var v3_1 = new Vec3();
      var qt_1 = new Quat();
      var KEYCODE = {
        W: 'W'.charCodeAt(0),
        S: 'S'.charCodeAt(0),
        A: 'A'.charCodeAt(0),
        D: 'D'.charCodeAt(0),
        Q: 'Q'.charCodeAt(0),
        E: 'E'.charCodeAt(0),
        SHIFT: macro.KEY.shift
      };
      var FirstPersonCamera = exports('FirstPersonCamera', (_dec = property({
        slide: true,
        range: [0.05, 0.5, 0.01]
      }), ccclass(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FirstPersonCamera, _Component);

        function FirstPersonCamera() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "moveSpeed", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "moveSpeedShiftScale", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "damp", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "rotateSpeed", _descriptor4, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_euler", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_velocity", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_position", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_speedScale", 1);

          return _this;
        }

        var _proto = FirstPersonCamera.prototype;

        _proto.onLoad = function onLoad() {
          systemEvent.on(SystemEvent.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
          systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
          systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
          systemEvent.on(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
          systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
          systemEvent.on(SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
          Vec3.copy(this._euler, this.node.eulerAngles);
          Vec3.copy(this._position, this.node.position);
        };

        _proto.onDestroy = function onDestroy() {
          systemEvent.off(SystemEvent.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
          systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
          systemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
          systemEvent.off(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
          systemEvent.off(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
          systemEvent.off(SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
        };

        _proto.update = function update(dt) {
          // position
          Vec3.transformQuat(v3_1, this._velocity, this.node.rotation);
          Vec3.scaleAndAdd(this._position, this._position, v3_1, this.moveSpeed * this._speedScale);
          Vec3.lerp(v3_1, this.node.position, this._position, dt / this.damp);
          this.node.setPosition(v3_1); // rotation

          Quat.fromEuler(qt_1, this._euler.x, this._euler.y, this._euler.z);
          Quat.slerp(qt_1, this.node.rotation, qt_1, dt / this.damp);
          this.node.setRotation(qt_1);
        };

        _proto.onMouseWheel = function onMouseWheel(e) {
          var delta = -e.getScrollY() * this.moveSpeed * 0.1; // delta is positive when scroll down

          Vec3.transformQuat(v3_1, Vec3.UNIT_Z, this.node.rotation);
          Vec3.scaleAndAdd(this._position, this.node.position, v3_1, delta);
        };

        _proto.onKeyDown = function onKeyDown(e) {
          var v = this._velocity;

          if (e.keyCode === KEYCODE.SHIFT) {
            this._speedScale = this.moveSpeedShiftScale;
          } else if (e.keyCode === KEYCODE.W) {
            if (v.z === 0) {
              v.z = -1;
            }
          } else if (e.keyCode === KEYCODE.S) {
            if (v.z === 0) {
              v.z = 1;
            }
          } else if (e.keyCode === KEYCODE.A) {
            if (v.x === 0) {
              v.x = -1;
            }
          } else if (e.keyCode === KEYCODE.D) {
            if (v.x === 0) {
              v.x = 1;
            }
          } else if (e.keyCode === KEYCODE.Q) {
            if (v.y === 0) {
              v.y = -1;
            }
          } else if (e.keyCode === KEYCODE.E) {
            if (v.y === 0) {
              v.y = 1;
            }
          }
        };

        _proto.onKeyUp = function onKeyUp(e) {
          var v = this._velocity;

          if (e.keyCode === KEYCODE.SHIFT) {
            this._speedScale = 1;
          } else if (e.keyCode === KEYCODE.W) {
            if (v.z < 0) {
              v.z = 0;
            }
          } else if (e.keyCode === KEYCODE.S) {
            if (v.z > 0) {
              v.z = 0;
            }
          } else if (e.keyCode === KEYCODE.A) {
            if (v.x < 0) {
              v.x = 0;
            }
          } else if (e.keyCode === KEYCODE.D) {
            if (v.x > 0) {
              v.x = 0;
            }
          } else if (e.keyCode === KEYCODE.Q) {
            if (v.y < 0) {
              v.y = 0;
            }
          } else if (e.keyCode === KEYCODE.E) {
            if (v.y > 0) {
              v.y = 0;
            }
          }
        };

        _proto.onTouchStart = function onTouchStart() {
          if (game.canvas['requestPointerLock']) {
            game.canvas.requestPointerLock();
          }
        };

        _proto.onTouchMove = function onTouchMove(t, e) {
          e.getStartLocation(v2_1);

          if (v2_1.x > game.canvas.width * 0.4) {
            // rotation
            e.getDelta(v2_2);
            this._euler.y -= v2_2.x * this.rotateSpeed * 0.1;
            this._euler.x += v2_2.y * this.rotateSpeed * 0.1;
          } else {
            // position
            e.getLocation(v2_2);
            Vec2.subtract(v2_2, v2_2, v2_1);
            this._velocity.x = v2_2.x * 0.01;
            this._velocity.z = -v2_2.y * 0.01;
          }
        };

        _proto.onTouchEnd = function onTouchEnd(t, e) {
          if (document.exitPointerLock) {
            document.exitPointerLock();
          }

          e.getStartLocation(v2_1);

          if (v2_1.x < game.canvas.width * 0.4) {
            // position
            this._velocity.x = 0;
            this._velocity.z = 0;
          }
        };

        return FirstPersonCamera;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "moveSpeedShiftScale", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "damp", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.2;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "rotateSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/fill-sprite.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Label, Sprite, Component;

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
      Sprite = module.Sprite;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _temp;

      cclegacy._RF.push({}, "44cd8itOoFJP6edfxYpJg8o", "fill-sprite", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var FillSprite = exports('FillSprite', (_dec = ccclass("FillSprite"), _dec2 = property({
        type: Label
      }), _dec3 = property({
        type: Sprite
      }), _dec4 = property({
        type: Label
      }), _dec5 = property({
        type: Sprite
      }), _dec6 = property({
        type: Label
      }), _dec7 = property({
        type: Sprite
      }), _dec8 = property({
        type: Label
      }), _dec9 = property({
        type: Sprite
      }), _dec10 = property({
        type: Label
      }), _dec11 = property({
        type: Sprite
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FillSprite, _Component);

        function FillSprite() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "hlabel", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "hhorizontal", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "vlabel", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "vhorizontal", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "mclabel", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "mc", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lblabel", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lb", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "rblabel", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "rb", _descriptor10, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "timer", 0);

          _defineProperty(_assertThisInitialized(_this), "lTimer", 0);

          _defineProperty(_assertThisInitialized(_this), "rTimer", 0.2);

          return _this;
        }

        var _proto = FillSprite.prototype;

        _proto.vh = function vh(num) {
          this.vhorizontal.getComponent(Sprite).fillRange = num;
          this.hhorizontal.getComponent(Sprite).fillRange = num;
          this.mc.getComponent(Sprite).fillRange = num;
        };

        _proto.update = function update(deltaTime) {
          this.timer += 0.1 * deltaTime;

          if (this.timer > 1) {
            this.timer = 0;
          }

          this.lTimer += 0.1 * deltaTime;

          if (this.lTimer > 0.3) {
            this.lTimer = 0;
          }

          this.rTimer += 0.1 * deltaTime;

          if (this.rTimer > 0.5) {
            this.rTimer = 0.2;
          }

          this.vh(this.timer);
          this.lb.getComponent(Sprite).fillRange = this.lTimer;
          this.rb.getComponent(Sprite).fillRange = this.rTimer;
          this.vlabel.getComponent(Label).string = '填充类型：垂直填充 ' + Math.floor(this.timer * 100) + '%';
          this.hlabel.getComponent(Label).string = '填充类型：水平填充 ' + Math.floor(this.timer * 100) + '%';
          this.mclabel.getComponent(Label).string = 'center(0.5, 0.5) rang ' + Math.floor(this.timer * 100) / 100;
          this.lblabel.getComponent(Label).string = 'center(0, 0) rang ' + Math.floor(this.lTimer * 100) / 100;
          this.rblabel.getComponent(Label).string = 'center(1, 0) rang ' + Math.floor(this.rTimer * 100) / 100;
        };

        return FillSprite;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "hlabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "hhorizontal", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "vlabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "vhorizontal", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "mclabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "mc", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "lblabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "lb", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "rblabel", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "rb", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/visibility-changed.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "4718c1lvcRNgoBh13xZK3lW", "visibility-changed", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var VisibilityChanged = exports('VisibilityChanged', (_dec = ccclass("VisibilityChanged"), _dec2 = menu('UI/VisibilityChanged'), _dec3 = property(Node), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(VisibilityChanged, _Component);

        function VisibilityChanged() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "target", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = VisibilityChanged.prototype;

        _proto.start = function start() {
          var _this2 = this;

          this.scheduleOnce(function () {
            _this2.node.setParent(_this2.target);

            _this2.node.walk(function (child) {
              child.layer = _this2.target.layer;
            });
          }, 1);
        };

        return VisibilityChanged;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoadRes_example.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _defineProperty, _assertThisInitialized, _initializerDefineProperty, cclegacy, _decorator, Node, SpriteAtlas, loader, Layers, Sprite, Prefab, instantiate, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      SpriteAtlas = module.SpriteAtlas;
      loader = module.loader;
      Layers = module.Layers;
      Sprite = module.Sprite;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "4b343jq4LREvorHBiCggFf4", "LoadRes_example", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var builtInEffectList = ['711ebe11-f673-4cd9-9a83-63c60ba54c5b.json', '971bdb23-3ff6-43eb-b422-1c30165a3663.json', '17debcc3-0a6b-4b8a-b00b-dc58b885581e.json', 'd1346436-ac96-4271-b863-1f4fdead95b0.json', '60f7195c-ec2a-45eb-ba94-8955f60e81d0.json', '1baf0fc9-befa-459c-8bdd-af1a450a0319.json', '1d08ef62-a503-4ce2-8b9a-46c90873f7d3.json', 'a7612b54-35e3-4238-a1a9-4a7b54635839.json', 'a3cd009f-0ab0-420d-9278-b9fdab939bbc.json'];
      var LoadResExample = exports('LoadResExample', (_dec = ccclass("LoadResExample"), _dec2 = property({
        type: Node
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LoadResExample, _Component);

        function LoadResExample() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_url", ["test_assets/atlas", "test_assets/prefab"]);

          _initializerDefineProperty(_assertThisInitialized(_this), "content", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = LoadResExample.prototype;

        _proto.loadSpriteFrame = function loadSpriteFrame() {
          var _this2 = this;

          var url = this._url[0];

          this._releaseResource(url, SpriteAtlas);

          loader.loadRes(url, SpriteAtlas, function (err, atlas) {
            _this2._removeAllChildren();

            loader.setAutoRelease(atlas, true);
            var node = new Node();
            node.layer = Layers.Enum.UI_2D;

            _this2.content.addChild(node);

            node.setPosition(0, 0, 0);
            var sprite = node.addComponent(Sprite);
            sprite.spriteFrame = atlas.getSpriteFrame('sheep_run_0');
          });
        };

        _proto.loadPrefab = function loadPrefab() {
          var _this3 = this;

          var url = this._url[1];

          this._releaseResource(url, Prefab);

          loader.loadRes(url, Prefab, function (err, prefab) {
            _this3._removeAllChildren();

            loader.setAutoRelease(prefab, true);
            var node = instantiate(prefab);
            node.layer = Layers.Enum.UI_2D;

            _this3.content.addChild(node);

            node.setPosition(0, 0, 0);
          });
        };

        _proto.onDisable = function onDisable() {
          this._releaseResource(this._url[0], SpriteAtlas);

          this._releaseResource(this._url[1], Prefab);
        };

        _proto._removeAllChildren = function _removeAllChildren() {
          this.content.removeAllChildren();
        };

        _proto._releaseResource = function _releaseResource(url, type) {
          this._removeAllChildren();

          var res = loader.getRes(url, type);
          var all = loader.getDependsRecursively(res);

          this._removeBuiltInEffect(all);

          loader.release(all);
        };

        _proto._removeBuiltInEffect = function _removeBuiltInEffect(deps) {
          var cache = [];

          for (var i = 0; i < deps.length; i++) {
            for (var j = 0; j < builtInEffectList.length; j++) {
              if (deps[i].includes(builtInEffectList[j])) {
                cache.push(i);
              }
            }
          }

          for (var k = 0; k < cache.length; k++) {
            delete deps[cache[k]];
          }

          cache = [];
        };

        _proto.backToAssetLoading = function backToAssetLoading() {
          director.loadScene('AssetLoading');
        };

        return LoadResExample;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec2], {
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

System.register("chunks:///_virtual/list-view-ctrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Vec3, Node, ScrollView, Button, Label, instantiate, UITransform, error, Component;

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
      Vec3 = module.Vec3;
      Node = module.Node;
      ScrollView = module.ScrollView;
      Button = module.Button;
      Label = module.Label;
      instantiate = module.instantiate;
      UITransform = module.UITransform;
      error = module.error;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _temp;

      cclegacy._RF.push({}, "4cd67QgY99J/q8+hpaUQjt0", "list-view-ctrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;

      var _temp_vec3 = new Vec3();

      var ListViewCtrl = exports('ListViewCtrl', (_dec = ccclass("ListViewCtrl"), _dec2 = menu('UI/ListViewCtrl'), _dec3 = property(Node), _dec4 = property(ScrollView), _dec5 = property(Button), _dec6 = property(Button), _dec7 = property(Button), _dec8 = property(Label), _dec9 = property(Label), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ListViewCtrl, _Component);

        function ListViewCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "itemTemplate", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "scrollView", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spawnCount", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "totalCount", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spacing", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "bufferZone", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "btnAddItem", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "btnRemoveItem", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "btnJumpToPosition", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lblJumpPosition", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lblTotalItems", _descriptor11, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_content", null);

          _defineProperty(_assertThisInitialized(_this), "_items", []);

          _defineProperty(_assertThisInitialized(_this), "_updateTimer", 0);

          _defineProperty(_assertThisInitialized(_this), "_updateInterval", 0.2);

          _defineProperty(_assertThisInitialized(_this), "_lastContentPosY", 0);

          return _this;
        }

        var _proto = ListViewCtrl.prototype;

        _proto.onLoad = function onLoad() {
          this._content = this.scrollView.content;
          this.initialize();
          this._updateTimer = 0;
          this._updateInterval = 0.2;
          this._lastContentPosY = 0; // use this variable to detect if we are scrolling up or down
        } // 初始化 item
        ;

        _proto.initialize = function initialize() {
          this._itemTemplateUITrans = this.itemTemplate._uiProps.uiTransformComp;
          this._contentUITrans = this._content._uiProps.uiTransformComp;
          this._contentUITrans.height = this.totalCount * (this._itemTemplateUITrans.height + this.spacing) + this.spacing; // get total content height

          for (var i = 0; i < this.spawnCount; ++i) {
            // spawn items, we only need to do this once
            var item = instantiate(this.itemTemplate);

            this._content.addChild(item);

            var itemUITrans = item._uiProps.uiTransformComp;
            item.setPosition(0, -itemUITrans.height * (0.5 + i) - this.spacing * (i + 1), 0);
            var labelComp = item.getComponentInChildren(Label);
            labelComp.string = "item_" + i;

            this._items.push(item);
          }
        };

        _proto.getPositionInView = function getPositionInView(item) {
          // get item position in scrollview's node space
          var worldPos = item.parent.getComponent(UITransform).convertToWorldSpaceAR(item.position);
          var viewPos = this.scrollView.node.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
          return viewPos;
        };

        _proto.update = function update(dt) {
          this._updateTimer += dt;
          if (this._updateTimer < this._updateInterval) return; // we don't need to do the math every frame

          this._updateTimer = 0;
          var items = this._items;
          var buffer = this.bufferZone;
          var isDown = this.scrollView.content.position.y < this._lastContentPosY; // scrolling direction

          var offset = (this._itemTemplateUITrans.height + this.spacing) * items.length;

          for (var i = 0; i < items.length; ++i) {
            var viewPos = this.getPositionInView(items[i]);
            items[i].getPosition(_temp_vec3);

            if (isDown) {
              // if away from buffer zone and not reaching top of content
              if (viewPos.y < -buffer && _temp_vec3.y + offset < 0) {
                _temp_vec3.y += offset;
                items[i].setPosition(_temp_vec3);
              }
            } else {
              // if away from buffer zone and not reaching bottom of content
              if (viewPos.y > buffer && _temp_vec3.y - offset > -this._contentUITrans.height) {
                _temp_vec3.y -= offset;
                items[i].setPosition(_temp_vec3);
              }
            }
          } // update lastContentPosY


          this._lastContentPosY = this.scrollView.content.position.y;
          this.lblTotalItems.string = "Total Items: " + this.totalCount;
        };

        _proto.addItem = function addItem() {
          this._contentUITrans.height = (this.totalCount + 1) * (this._itemTemplateUITrans.height + this.spacing) + this.spacing; // get total content height

          this.totalCount = this.totalCount + 1;
        };

        _proto.removeItem = function removeItem() {
          if (this.totalCount - 1 < 30) {
            error("can't remove item less than 30!");
            return;
          }

          this._contentUITrans.height = (this.totalCount - 1) * (this._itemTemplateUITrans.height + this.spacing) + this.spacing; // get total content height

          this.totalCount = this.totalCount - 1;
          this.moveBottomItemToTop();
        };

        _proto.moveBottomItemToTop = function moveBottomItemToTop() {
          var offset = (this._itemTemplateUITrans.height + this.spacing) * this._items.length;
          var length = this._items.length;
          var item = this.getItemAtBottom();
          item.getPosition(_temp_vec3); // whether need to move to top

          if (_temp_vec3.y + offset < 0) {
            _temp_vec3.y = _temp_vec3.y + offset;
            item.setPosition(_temp_vec3);
          }
        };

        _proto.getItemAtBottom = function getItemAtBottom() {
          var item = this._items[0];

          for (var i = 1; i < this._items.length; ++i) {
            if (item.position.y > this._items[i].position.y) {
              item = this._items[i];
            }
          }

          return item;
        };

        _proto.scrollToFixedPosition = function scrollToFixedPosition() {
          this.scrollView.scrollToOffset(new Vec3(0, 500, 0), 2, true);
        };

        return ListViewCtrl;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "itemTemplate", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spawnCount", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "totalCount", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "spacing", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "bufferZone", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "btnAddItem", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "btnRemoveItem", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "btnJumpToPosition", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "lblJumpPosition", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "lblTotalItems", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MorphController.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _defineProperty, _assertThisInitialized, _initializerDefineProperty, _createClass, cclegacy, _decorator, Prefab, Layout, CCFloat, MeshRenderer, instantiate, find, Label, Slider, EventHandler, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _initializerDefineProperty = module.initializerDefineProperty;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Layout = module.Layout;
      CCFloat = module.CCFloat;
      MeshRenderer = module.MeshRenderer;
      instantiate = module.instantiate;
      find = module.find;
      Label = module.Label;
      Slider = module.Slider;
      EventHandler = module.EventHandler;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "4e36bPGhGpItLiswUnsyx0x", "MorphController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode;
      var MorphController = exports('MorphController', (_dec = ccclass('MorphController'), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: Layout
      }), _dec4 = property({
        type: [CCFloat],
        range: [0, 1, 0.1],
        slide: true
      }), _dec(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MorphController, _Component);

        function MorphController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_weightsControl", []);

          _defineProperty(_assertThisInitialized(_this), "_modelComp", null);

          _defineProperty(_assertThisInitialized(_this), "_totalTargets", 0);

          _initializerDefineProperty(_assertThisInitialized(_this), "controlItemPrfb", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "itemLayout", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = MorphController.prototype;

        _proto.setWeights = function setWeights(weights) {
          if (weights.length === 0) {
            return;
          }

          for (var iSubMeshMorph = 0; iSubMeshMorph < this._morph.subMeshMorphs.length; ++iSubMeshMorph) {
            if (this._morph.subMeshMorphs[iSubMeshMorph]) {
              this._modelComp.setWeights(weights, iSubMeshMorph);
            }
          }
        };

        _proto.start = function start() {
          this._modelComp = this.node.getComponent(MeshRenderer);

          if (!this._modelComp) {
            return;
          }

          var mesh = this._modelComp.mesh;

          if (!mesh) {
            return;
          }

          this._morph = mesh.struct.morph;

          if (!this._morph) {
            return;
          }

          if (this._morph.subMeshMorphs.length === 0) {
            // TODO submeshcount是0
            console.warn('submesh count is 0');
            return;
          }

          var firstNonNullSubMeshMorph = this._morph.subMeshMorphs.find(function (subMeshMorph) {
            return !!subMeshMorph;
          });

          if (!firstNonNullSubMeshMorph) {
            // TODO 任何 submesh 都没有Morph
            console.warn("all submesh don't have morph");
            return;
          }

          if (!this._morph.subMeshMorphs.every(function (subMeshMorph) {
            return !subMeshMorph || subMeshMorph.targets.length === firstNonNullSubMeshMorph.targets.length;
          })) {
            // TODO 每个 submesh 的target数量不一样
            console.warn("not all submesh count are the same");
          }

          var subMeshMorph = this._morph.subMeshMorphs[0];
          var nTargets = subMeshMorph ? subMeshMorph.targets.length : 0;
          this._totalTargets = nTargets;
          this.weightsControl = new Array(nTargets).fill(0);
          {
            this.initUI();
          }
        };

        _proto.initUI = function initUI() {
          for (var i = 0; i < this._totalTargets; i++) {
            var _find, _find2;

            var controlItem = instantiate(this.controlItemPrfb);
            controlItem.parent = this.itemLayout.node;
            var nameLabel = (_find = find('Name', controlItem)) === null || _find === void 0 ? void 0 : _find.getComponent(Label);

            if (nameLabel) {
              nameLabel.string = '' + i;
            }

            var slider = (_find2 = find('Slider', controlItem)) === null || _find2 === void 0 ? void 0 : _find2.getComponent(Slider);
            var sliderEventHandler = new EventHandler();
            sliderEventHandler.target = this.node;
            sliderEventHandler.handler = "onSliderChanged";
            sliderEventHandler.component = "MorphController";
            sliderEventHandler.customEventData = '' + i;
            slider === null || slider === void 0 ? void 0 : slider.slideEvents.push(sliderEventHandler);
          }
        };

        _proto.onSliderChanged = function onSliderChanged(target, customEventData) {
          {
            console.log(target, customEventData);
          }
          var index = Number.parseInt(customEventData);
          this.weightsControl[index] = target.progress;
          this.weightsControl = this.weightsControl;
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        _createClass(MorphController, [{
          key: "weightsControl",
          get: function get() {
            return this._weightsControl;
          },
          set: function set(value) {
            // undo时会每个元素进行数组的一次set，等待fix
            if (value.length != this._totalTargets) {
              return;
            }

            this._weightsControl = value;
            this.setWeights(this._weightsControl);
          }
        }]);

        return MorphController;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "controlItemPrfb", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "itemLayout", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "weightsControl", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "weightsControl"), _class2.prototype)), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/listitem.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './scenelist.ts', './backbutton.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, Label, director, Component, sceneArray, BackButton;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      sceneArray = module.sceneArray;
    }, function (module) {
      BackButton = module.BackButton;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "4fa73P9DaREY7uj4BrhuimX", "listitem", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ListItem = exports('ListItem', (_dec = ccclass("ListItem"), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ListItem, _Component);

        function ListItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "index", -1);

          _defineProperty(_assertThisInitialized(_this), "_name", "");

          _defineProperty(_assertThisInitialized(_this), "label", null);

          return _this;
        }

        var _proto = ListItem.prototype;

        _proto.onload = function onload() {};

        _proto.start = function start() {
          // Your initialization goes here.
          this.index = this.node.getSiblingIndex();
          this._name = "";

          if (this.node) {
            this.label = this.node.getComponentInChildren(Label);
          }

          this.updateItem(this.index, sceneArray[this.index]);
        };

        _proto.loadScene = function loadScene() {
          BackButton.saveOffset();
          BackButton.saveIndex(this.index);
          director.loadScene(this._name);
        };

        _proto.updateItem = function updateItem(idx, name) {
          this.index = idx;
          this._name = name;

          if (this.label) {
            this.label.string = name;
          }
        };

        return ListItem;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenStop.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, tween, Vec3, Quat, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "5372db1ch5D9rAE0w2hyKmg", "TweenStop", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var TweenStop = exports('TweenStop', (_dec = ccclass("TweenStop"), _dec2 = menu("tween/TweenStop"), _dec(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TweenStop, _Component);

        function TweenStop() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = TweenStop.prototype;

        _proto.onLoad = function onLoad() {
          var _this = this;

          var scale = tween().to(1, {
            scale: new Vec3(3, 3, 3)
          });
          var rotate = tween().to(1, {
            rotation: new Quat(Math.sin(60), Math.sin(60), Math.sin(60), Math.cos(60))
          });
          this.tweenStop = tween(this.node).then(scale).call(function () {
            // 停止缓动
            _this.tweenStop.stop();
          }).then(rotate);
        };

        _proto.onEnable = function onEnable() {
          this.tweenStop.start();
        };

        _proto.onDisable = function onDisable() {
          this.tweenStop.stop();
        };

        return TweenStop;
      }(Component)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SpineMeshEffect.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, sp, Size, Component;

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
      sp = module.sp;
      Size = module.Size;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class2, _class3, _descriptor, _temp;

      cclegacy._RF.push({}, "57b56AV9fFA5brJJCNWOURt", "SpineMeshEffect", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;

      var _class = exports('default', (_dec = ccclass('SpineMeshEffect'), _dec2 = property({
        type: sp.Skeleton
      }), _dec(_class2 = (_class3 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(_class3, _Component);

        function _class3() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "skeleton", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_swirlTime", 0);

          _defineProperty(_assertThisInitialized(_this), "_maxEffect", 0);

          _defineProperty(_assertThisInitialized(_this), "_index", 0);

          _defineProperty(_assertThisInitialized(_this), "_bound", void 0);

          _defineProperty(_assertThisInitialized(_this), "_swirlEffect", void 0);

          _defineProperty(_assertThisInitialized(_this), "_jitterEffect", void 0);

          return _this;
        }

        var _proto = _class3.prototype;

        _proto.start = function start() {
          this._swirlTime = 0;
          this._maxEffect = 3;
          this._index = 0;
          var skeletonNodeUIProps = this.skeleton.node._uiProps.uiTransformComp;
          this._bound = new Size(skeletonNodeUIProps.width, skeletonNodeUIProps.height);
          this._swirlEffect = new sp.VertexEffectDelegate();

          this._swirlEffect.initSwirlWithPowOut(0, 2);

          this._jitterEffect = new sp.VertexEffectDelegate();

          this._jitterEffect.initJitter(20, 20);
        };

        _proto.switchEffect = function switchEffect() {
          this._index++;

          if (this._index >= this._maxEffect) {
            this._index = 0;
          }

          switch (this._index) {
            case 0:
              this.skeleton.setVertexEffectDelegate(null);
              break;

            case 1:
              this.skeleton.setVertexEffectDelegate(this._jitterEffect);
              break;

            case 2:
              this.skeleton.setVertexEffectDelegate(this._swirlEffect);
              break;
          }
        };

        _proto.update = function update(dt) {
          if (this._index == 2) {
            this._swirlTime += dt;
            var percent = this._swirlTime % 2;
            if (percent > 1) percent = 1 - (percent - 1);
            var bound = this._bound;

            var swirlEffect = this._swirlEffect.getSwirlVertexEffect();

            swirlEffect.angle = 360 * percent;
            swirlEffect.centerX = bound.width * 0.5;
            swirlEffect.centerY = bound.height * 0.5;
            swirlEffect.radius = percent * Math.sqrt(bound.width * bound.width + bound.height * bound.height);
          }
        };

        return _class3;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class3.prototype, "skeleton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class3)) || _class2));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ui-log.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, _createForOfIteratorHelperLoose, _createClass, cclegacy, _decorator, Prefab, Size, Vec3, instantiate, ScrollView, Layout, UITransform, Widget, safeMeasureText, fragmentText, Label, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Size = module.Size;
      Vec3 = module.Vec3;
      instantiate = module.instantiate;
      ScrollView = module.ScrollView;
      Layout = module.Layout;
      UITransform = module.UITransform;
      Widget = module.Widget;
      safeMeasureText = module.safeMeasureText;
      fragmentText = module.fragmentText;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "582baHkZuZBgLuu7k76+F1C", "ui-log", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var FIXED_HEIGHT = 20;
      var TOTAL_PADDING = 4;
      var UILog = exports('UILog', (_dec = ccclass("UILog"), _dec2 = menu('UI/UILog'), _dec3 = property(Prefab), _dec4 = property(Prefab), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UILog, _Component);

        function UILog() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "panel", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "item", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "workOnLoad", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "logPanel", null);

          _initializerDefineProperty(_assertThisInitialized(_this), "_size", _descriptor4, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_itemList", []);

          _defineProperty(_assertThisInitialized(_this), "_itemPool", []);

          _defineProperty(_assertThisInitialized(_this), "_context", null);

          _defineProperty(_assertThisInitialized(_this), "_scrollView", null);

          _defineProperty(_assertThisInitialized(_this), "_offset", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_originPos", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_layout", null);

          return _this;
        }

        var _proto = UILog.prototype;

        _proto.onLoad = function onLoad() {
          var canvas = document.createElement('canvas');
          this._context = canvas.getContext('2d');

          if (this._context) {
            this._context.font = FIXED_HEIGHT + "px Arial";
            this._context.lineWidth = FIXED_HEIGHT + 2;
          }

          if (this.workOnLoad) {
            this.initLog({
              isAlign: true,
              isAlignLeft: true,
              isAlignBottom: true,
              left: 50,
              bottom: 50
            });
          }
        };

        _proto.initLog = function initLog(config) {
          config = config || {
            isAlign: false
          };
          var panel = this.logPanel = instantiate(this.panel);
          panel.parent = this.node;
          var scrollView = panel.getComponent(ScrollView);
          this._scrollView = scrollView;
          this._layout = scrollView.content.getComponent(Layout);

          this._originPos.set(scrollView.content.position);

          this._originPos.y = this._size.height / 2;
          var transform = panel.getComponent(UITransform);
          transform.contentSize = this.size;

          if (config.pos) {
            panel.setPosition(config.pos);
          }

          if (!!config.isAlign) {
            var widget = panel.addComponent(Widget);
            widget.isAlignLeft = !!config.isAlignLeft;
            widget.isAlignBottom = !!config.isAlignBottom;
            widget.isAlignRight = !!config.isAlignRight;
            widget.isAlignTop = !!config.isAlignTop;
            widget.left = config.left || 0;
            widget.bottom = config.bottom || 0;
            widget.right = config.right || 0;
            widget.top = config.top || 0;
          }

          var mask = panel.getChildByName('view');
          var maskWidget = mask.addComponent(Widget);
          maskWidget.isAlignBottom = maskWidget.isAlignLeft = maskWidget.isAlignRight = maskWidget.isAlignTop = true;
          maskWidget.left = maskWidget.right = maskWidget.top = maskWidget.bottom = 0;
        };

        _proto.addLabel = function addLabel(str) {
          var _this$_context, _this$_layout;

          if (!this.item || !this.logPanel || str.length <= 0) {
            return;
          }

          var paragraphedStrings = str.split('\n');
          var spliteStrings = [];
          var maxWidth = this._size.width;
          (_this$_context = this._context) === null || _this$_context === void 0 ? void 0 : _this$_context.clearRect(0, 0, maxWidth, this._size.height);

          for (var _iterator = _createForOfIteratorHelperLoose(paragraphedStrings), _step; !(_step = _iterator()).done;) {
            var para = _step.value;
            var allWidth = safeMeasureText(this._context, para);
            var textFragment = fragmentText(para, allWidth, maxWidth - TOTAL_PADDING, this._measureText());
            spliteStrings = spliteStrings.concat(textFragment);
          }

          var text = spliteStrings.join('\n');

          var item = this._allocItem();

          var content = this._scrollView ? this._scrollView.content : null;
          item.parent = content;
          var itemTransComp = item.getComponent(UITransform);
          var itemBgTransComp = item.children[0].getComponent(UITransform);
          itemBgTransComp.width = itemTransComp.width = maxWidth;
          var itemHeight = spliteStrings.length * (FIXED_HEIGHT + 2);
          itemBgTransComp.height = itemTransComp.height = itemHeight;
          var labelTransComp = item.children[1].getComponent(UITransform);
          labelTransComp.width = maxWidth - TOTAL_PADDING;
          labelTransComp.height = spliteStrings.length * FIXED_HEIGHT;
          var labelComp = labelTransComp.getComponent(Label);
          labelComp.string = text;
          (_this$_layout = this._layout) === null || _this$_layout === void 0 ? void 0 : _this$_layout.updateLayout();
          var conteTrans = content ? content.getComponent(UITransform) : null;

          if (conteTrans && conteTrans.height > this._size.height) {
            var _this$_scrollView;

            this._offset.set(0, conteTrans.height - this._size.height, 0);

            (_this$_scrollView = this._scrollView) === null || _this$_scrollView === void 0 ? void 0 : _this$_scrollView.scrollToOffset(this._offset, 0.5, true);
          }
        };

        _proto.clearLabel = function clearLabel() {
          for (var i = 0; i < this._itemList.length; i++) {
            var e = this._itemList[i];

            this._freeItem(e);
          }

          this._itemList.length = 0;
        };

        _proto._allocItem = function _allocItem() {
          if (this._itemPool.length > 0) {
            return this._itemPool.pop();
          }

          var root = instantiate(this.item);
          return root;
        };

        _proto._freeItem = function _freeItem(item) {
          this._itemPool.push(item);
        };

        _proto._measureText = function _measureText() {
          var ctx = this._context;
          return function (str) {
            return safeMeasureText(ctx, str);
          };
        };

        _createClass(UILog, [{
          key: "size",
          get: function get() {
            return this._size;
          },
          set: function set(value) {
            if (this._size.equals(value)) {
              return;
            }

            this._size.set(value);

            if (this.logPanel) {
              var transform = this.logPanel.getComponent(UITransform);
              transform.contentSize = this._size;
            }
          }
        }]);

        return UILog;
      }(Component), _temp), (_applyDecoratedDescriptor(_class2.prototype, "size", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "size"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "panel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "item", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "workOnLoad", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_size", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Size(100, 100);
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/scroll-view-events.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, ScrollBar, ScrollView, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      ScrollBar = module.ScrollBar;
      ScrollView = module.ScrollView;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "59084rPhUpND6Eu0YGtvknr", "scroll-view-events", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ScrollViewEvents = exports('ScrollViewEvents', (_dec = ccclass("ScrollViewEvents"), _dec2 = property(Label), _dec3 = property({
        type: ScrollBar.Direction
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ScrollViewEvents, _Component);

        function ScrollViewEvents() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "eventLabel", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "direction", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ScrollViewEvents.prototype;

        _proto.start = function start() {
          if (this.direction === ScrollBar.Direction.VERTICAL) {
            this.node.on(ScrollView.EventType.SCROLL_TO_BOTTOM, this.eventScrollToBottom, this);
            this.node.on(ScrollView.EventType.SCROLL_TO_TOP, this.eventScrollToTop, this);
            this.node.on(ScrollView.EventType.BOUNCE_BOTTOM, this.bounceBottom, this);
            this.node.on(ScrollView.EventType.BOUNCE_TOP, this.bounceTop, this);
          } else {
            this.node.on(ScrollView.EventType.SCROLL_TO_LEFT, this.eventScrollToLeft, this);
            this.node.on(ScrollView.EventType.SCROLL_TO_RIGHT, this.eventScrollToRight, this);
            this.node.on(ScrollView.EventType.BOUNCE_LEFT, this.bounceLeft, this);
            this.node.on(ScrollView.EventType.BOUNCE_RIGHT, this.bounceRight, this);
          }
        };

        _proto.eventScrollToLeft = function eventScrollToLeft(scroll) {
          this.eventLabel.string = 'ScrollToLeft';
        };

        _proto.eventScrollToBottom = function eventScrollToBottom(scroll) {
          this.eventLabel.string = 'ScrollToBottom';
        };

        _proto.eventScrollToRight = function eventScrollToRight(scroll) {
          this.eventLabel.string = 'ScrollToRight';
        };

        _proto.eventScrollToTop = function eventScrollToTop(scroll) {
          this.eventLabel.string = 'ScrollToTop';
        };

        _proto.bounceLeft = function bounceLeft(scroll) {
          this.eventLabel.string = 'BounceLeft';
        };

        _proto.bounceBottom = function bounceBottom(scroll) {
          this.eventLabel.string = 'BounceBottom';
        };

        _proto.bounceRight = function bounceRight(scroll) {
          this.eventLabel.string = 'BounceRight';
        };

        _proto.bounceTop = function bounceTop(scroll) {
          this.eventLabel.string = 'BounceTop';
        };

        return ScrollViewEvents;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "eventLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ScrollBar.Direction.HORIZONTAL;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/trimmed.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Graphics, UITransform, Color, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Graphics = module.Graphics;
      UITransform = module.UITransform;
      Color = module.Color;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "59e15ttAZ5Ku5epzgIxZVbi", "trimmed", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode,
          menu = _decorator.menu;
      var Trimmed = exports('Trimmed', (_dec = ccclass("Trimmed"), _dec2 = menu('UI/Trimmed'), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec(_class = _dec2(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Trimmed, _Component);

        function Trimmed() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "trimmed", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "noTrimmed", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Trimmed.prototype;

        _proto.start = function start() {
          var g = this.node.getComponent(Graphics);
          var trimmedContentSize = this.trimmed.getComponent(UITransform).contentSize;
          var noTrimmedContentSize = this.noTrimmed.getComponent(UITransform).contentSize;
          g.clear();
          g.lineWidth = 2;
          g.strokeColor = Color.RED;
          g.moveTo(this.trimmed.position.x - trimmedContentSize.width / 2 + 1, trimmedContentSize.height / 2 - 1);
          g.lineTo(this.trimmed.position.x + trimmedContentSize.width / 2 - 1, trimmedContentSize.height / 2 - 1);
          g.lineTo(this.trimmed.position.x + trimmedContentSize.width / 2 - 1, -trimmedContentSize.height / 2 + 1);
          g.lineTo(this.trimmed.position.x - trimmedContentSize.width / 2 + 1, -trimmedContentSize.height / 2 + 1);
          g.lineTo(this.trimmed.position.x - trimmedContentSize.width / 2 + 1, trimmedContentSize.height / 2 - 1);
          g.moveTo(this.noTrimmed.position.x - noTrimmedContentSize.width / 2 + 1, noTrimmedContentSize.height / 2 - 1);
          g.lineTo(this.noTrimmed.position.x + noTrimmedContentSize.width / 2 - 1, noTrimmedContentSize.height / 2 - 1);
          g.lineTo(this.noTrimmed.position.x + noTrimmedContentSize.width / 2 - 1, -noTrimmedContentSize.height / 2 + 1);
          g.lineTo(this.noTrimmed.position.x - noTrimmedContentSize.width / 2 + 1, -noTrimmedContentSize.height / 2 + 1);
          g.lineTo(this.noTrimmed.position.x - noTrimmedContentSize.width / 2 + 1, noTrimmedContentSize.height / 2 - 1);
          g.stroke();
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return Trimmed;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "trimmed", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "noTrimmed", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/node-move.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Vec3, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "5cd33koVLVEppCM1HguV765", "node-move", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var NodeMove = exports('NodeMove', (_dec = ccclass('NodeMove'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(NodeMove, _Component);

        function NodeMove() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = NodeMove.prototype;

        _proto.start = function start() {
          var _this = this;

          var x = this.node.position.x;
          var y = this.node.position.y;
          var z = this.node.position.z;
          var vec3 = new Vec3(x, y, z);
          this.schedule(function (dt) {
            x += dt;
            vec3.x = x;

            _this.node.setPosition(vec3);

            if (x >= 5) {
              x = -5;
            }
          });
        };

        return NodeMove;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenRepeat2.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, tween, Vec3, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "5de1coi5aBBspa8mURWNyUS", "TweenRepeat2", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var TweenRepeat2 = exports('TweenRepeat2', (_dec = ccclass("TweenRepeat2"), _dec2 = menu("tween/TweenRepeat2"), _dec(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TweenRepeat2, _Component);

        function TweenRepeat2() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = TweenRepeat2.prototype;

        _proto.onLoad = function onLoad() {
          /**
           * 这里 repeat 重复的是嵌入的 Tween, target 将取上下文中的
           * 这个例子和脚本 TweenRepeat 中的效果是一样的
           */
          this.tweenRepeat = tween(this.node).repeat(3, tween().by(1, {
            scale: new Vec3(2, 2, 2)
          }));
        };

        _proto.onEnable = function onEnable() {
          this.tweenRepeat.start();
        };

        _proto.onDisable = function onDisable() {
          this.tweenRepeat.stop();
        };

        return TweenRepeat2;
      }(Component)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SpineBoyCtrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "63fd6NWWQxCt6fDTJtglY8d", "SpineBoyCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SpineBoyCtrl = exports('default', (_dec = ccclass('SpineBoyCtrl'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SpineBoyCtrl, _Component);

        function SpineBoyCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "mixTime", 0.2);

          _defineProperty(_assertThisInitialized(_this), "spine", void 0);

          _defineProperty(_assertThisInitialized(_this), "_hasStop", true);

          return _this;
        }

        var _proto = SpineBoyCtrl.prototype;

        _proto.onLoad = function onLoad() {
          var _this2 = this;

          var spine = this.spine = this.getComponent('sp.Skeleton');

          this._setMix('walk', 'run');

          this._setMix('run', 'jump');

          this._setMix('walk', 'jump');

          spine.setStartListener(function (trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            console.log("[track %s][animation %s] start.", trackEntry.trackIndex, animationName);
          });
          spine.setInterruptListener(function (trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            console.log("[track %s][animation %s] interrupt.", trackEntry.trackIndex, animationName);
          });
          spine.setEndListener(function (trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            console.log("[track %s][animation %s] end.", trackEntry.trackIndex, animationName);
          });
          spine.setDisposeListener(function (trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            console.log("[track %s][animation %s] will be disposed.", trackEntry.trackIndex, animationName);
          });
          spine.setCompleteListener(function (trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";

            if (animationName === 'shoot') {
              _this2.spine.clearTrack(1);
            }

            var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
            console.log("[track %s][animation %s] complete: %s", trackEntry.trackIndex, animationName, loopCount);
          });
          spine.setEventListener(function (trackEntry, event) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            console.log("[track %s][animation %s] event: %s, %s, %s, %s", trackEntry.trackIndex, animationName, event.data.name, event.intValue, event.floatValue, event.stringValue);
          });
          this._hasStop = false;
        } // OPTIONS
        ;

        _proto.toggleDebugSlots = function toggleDebugSlots() {
          var _this$spine;

          this.spine.debugSlots = !((_this$spine = this.spine) === null || _this$spine === void 0 ? void 0 : _this$spine.debugSlots);
        };

        _proto.toggleDebugBones = function toggleDebugBones() {
          var _this$spine2;

          this.spine.debugBones = !((_this$spine2 = this.spine) === null || _this$spine2 === void 0 ? void 0 : _this$spine2.debugBones);
        };

        _proto.toggleDebugMesh = function toggleDebugMesh() {
          var _this$spine3;

          this.spine.debugMesh = !((_this$spine3 = this.spine) === null || _this$spine3 === void 0 ? void 0 : _this$spine3.debugMesh);
        };

        _proto.toggleUseTint = function toggleUseTint() {
          var _this$spine4;

          this.spine.useTint = !((_this$spine4 = this.spine) === null || _this$spine4 === void 0 ? void 0 : _this$spine4.useTint);
        };

        _proto.toggleTimeScale = function toggleTimeScale() {
          if (this.spine.timeScale === 1.0) {
            this.spine.timeScale = 0.3;
          } else {
            this.spine.timeScale = 1.0;
          }
        } // ANIMATIONS
        ;

        _proto.stop = function stop() {
          var _this$spine5;

          (_this$spine5 = this.spine) === null || _this$spine5 === void 0 ? void 0 : _this$spine5.clearTrack(0);
          this._hasStop = true;
        };

        _proto.walk = function walk() {
          var _this$spine6;

          (_this$spine6 = this.spine) === null || _this$spine6 === void 0 ? void 0 : _this$spine6.setAnimation(0, 'walk', true);
          this._hasStop = false;
        };

        _proto.run = function run() {
          var _this$spine7;

          (_this$spine7 = this.spine) === null || _this$spine7 === void 0 ? void 0 : _this$spine7.setAnimation(0, 'run', true);
          this._hasStop = false;
        };

        _proto.jump = function jump() {
          var _this$spine8, _this$spine9;

          var oldAnim = (_this$spine8 = this.spine) === null || _this$spine8 === void 0 ? void 0 : _this$spine8.animation;
          (_this$spine9 = this.spine) === null || _this$spine9 === void 0 ? void 0 : _this$spine9.setAnimation(0, 'jump', false);

          if (oldAnim && !this._hasStop) {
            var _this$spine10;

            (_this$spine10 = this.spine) === null || _this$spine10 === void 0 ? void 0 : _this$spine10.addAnimation(0, oldAnim === 'run' ? 'run' : 'walk', true, 0);
          }
        };

        _proto.shoot = function shoot() {
          var _this$spine11;

          (_this$spine11 = this.spine) === null || _this$spine11 === void 0 ? void 0 : _this$spine11.setAnimation(1, 'shoot', false);
        };

        _proto.idle = function idle() {
          var _this$spine12;

          (_this$spine12 = this.spine) === null || _this$spine12 === void 0 ? void 0 : _this$spine12.setAnimation(0, 'idle', true);
        };

        _proto.portal = function portal() {
          var _this$spine13;

          (_this$spine13 = this.spine) === null || _this$spine13 === void 0 ? void 0 : _this$spine13.setAnimation(0, 'portal', false);
        } //
        ;

        _proto._setMix = function _setMix(anim1, anim2) {
          var _this$spine14, _this$spine15;

          (_this$spine14 = this.spine) === null || _this$spine14 === void 0 ? void 0 : _this$spine14.setMix(anim1, anim2, this.mixTime);
          (_this$spine15 = this.spine) === null || _this$spine15 === void 0 ? void 0 : _this$spine15.setMix(anim2, anim1, this.mixTime);
        };

        return SpineBoyCtrl;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/release-depend-asset.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, Node, loader, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Node = module.Node;
      loader = module.loader;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "66f91i0DbtJxrxCWvnTAzUa", "release-depend-asset", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var releaseDependAsset = exports('releaseDependAsset', (_dec = ccclass('releaseDependAsset'), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: Node
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(releaseDependAsset, _Component);

        function releaseDependAsset() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "prefabAsset", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "prefabNode", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = releaseDependAsset.prototype;

        _proto.releaseAsset = function releaseAsset() {
          if (!this.prefabNode) {
            return;
          }

          if (!this.prefabNode.active) {
            return;
          }

          this.prefabNode.active = false;
          this.prefabNode.parent = null;
          var deps = loader.getDependsRecursively(this.prefabAsset);
          loader.release(deps);
        };

        return releaseDependAsset;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefabAsset", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefabNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/scenelist.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, instantiate, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "687185yW5hKPJX0ATIa74GL", "scenelist", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var sceneArray = exports('sceneArray', []);
      var SceneManager = exports('SceneManager', (_dec = ccclass("scenemanager"), _dec2 = property({
        type: Prefab
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SceneManager, _Component);

        function SceneManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "itemPrefab", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = SceneManager.prototype;

        _proto.onLoad = function onLoad() {
          if (this.itemPrefab) {
            for (var i = 0; i < sceneArray.length; i++) {
              var item = instantiate(this.itemPrefab);
              this.node.addChild(item);
            }
          }
        };

        return SceneManager;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "itemPrefab", [_dec2], {
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

System.register("chunks:///_virtual/extension-detection.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, error, director, GFXFeature, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      error = module.error;
      director = module.director;
      GFXFeature = module.GFXFeature;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "69edbvI+KVFQJEDKsfPvq75", "extension-detection", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ExtensionDetection = exports('ExtensionDetection', (_dec = ccclass('ExtensionDetection'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ExtensionDetection, _Component);

        function ExtensionDetection() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "feature", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "tips", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ExtensionDetection.prototype;

        _proto.start = function start() {
          var label = this.node.getComponent(Label);

          if (!this.feature.length || !label) {
            return;
          }

          var featureNames = Object.keys(GFXFeature);
          var str = this.feature.toUpperCase();

          if (!featureNames.includes(str)) {
            error("Type error of GFXFeature");
            return;
          }

          var featureName = str;

          if (!director.root.device.hasFeature(GFXFeature[featureName])) {
            label.string = "GFX feature '" + this.feature + "' is not supported on this device,\n" + this.tips;
          }
        };

        return ExtensionDetection;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "feature", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tips", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenShowHide.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, tween, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "6a2e0eywUlNDLyQo4AyRY+G", "TweenShowHide", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var TweenShowHide = exports('TweenShowHide', (_dec = ccclass("TweenShowHide"), _dec2 = menu("tween/TweenShowHide"), _dec(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TweenShowHide, _Component);

        function TweenShowHide() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = TweenShowHide.prototype;

        _proto.onLoad = function onLoad() {
          /**
           * 注意 target 需要是 Node 的，才可以使用 show 和 hide
           */
          this.tweenSH = tween(this.node).delay(0.1).hide().delay(0.1).show().union().repeatForever();
        };

        _proto.onEnable = function onEnable() {
          this.tweenSH.start();
        };

        _proto.onDisable = function onDisable() {
          this.tweenSH.stop();
        };

        return TweenShowHide;
      }(Component)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenParallel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, tween, Vec3, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "6e30eSvH65K7a4saHr5Vhy9", "TweenParallel", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var TweenParallel = exports('TweenParallel', (_dec = ccclass("TweenParallel"), _dec2 = menu("tween/TweenParallel"), _dec(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TweenParallel, _Component);

        function TweenParallel() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = TweenParallel.prototype;

        _proto.onLoad = function onLoad() {
          this.tweenParallel = tween(this.node) // 同时执行两个 Tween
          .parallel(tween().to(2, {
            scale: new Vec3(1, 2, 3)
          }), tween().to(2, {
            position: new Vec3(3, 0, 3)
          })).call(function () {
            console.log('All tweens finished.');
          });
        };

        _proto.onEnable = function onEnable() {
          this.tweenParallel.start();
        };

        _proto.onDisable = function onDisable() {
          this.tweenParallel.stop();
        };

        return TweenParallel;
      }(Component)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/rotate-around-axis.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Vec3, Quat, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "6ebf6h60j5MUKTFQSGSfF39", "rotate-around-axis", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;

      var _v3_0 = new Vec3();

      var _quat_0 = new Quat();

      var RotateAroundAxis = exports('RotateAroundAxis', (_dec = ccclass("RotateAroundAxis"), _dec2 = menu("UI/RotateAroundAxis"), _dec(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RotateAroundAxis, _Component);

        function RotateAroundAxis() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = RotateAroundAxis.prototype;

        _proto.update = function update(deltaTime) {
          _v3_0.set(-1, 1, 0);

          _v3_0.normalize();

          Quat.rotateAround(_quat_0, this.node.rotation, _v3_0, Math.PI * 0.01);
          this.node.setRotation(_quat_0);
        };

        return RotateAroundAxis;
      }(Component)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/mask-inverted-event.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, SystemEventType, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      SystemEventType = module.SystemEventType;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "70ef4zUKLxDA5zRBYDljNmp", "mask-inverted-event", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var MaskInvertedEvent = exports('MaskInvertedEvent', (_dec = ccclass("MaskInvertedEvent"), _dec2 = menu('UI/MaskInvertedEvent'), _dec3 = property(Label), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MaskInvertedEvent, _Component);

        function MaskInvertedEvent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "label", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "string", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = MaskInvertedEvent.prototype;

        _proto.start = function start() {
          this.node.on(SystemEventType.TOUCH_START, this.callback, this);
        };

        _proto.callback = function callback() {
          this.label.string = this.string;
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return MaskInvertedEvent;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "string", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenRepeat.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, tween, Vec3, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "7529cHC0KVCgqpBE8238J1i", "TweenRepeat", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var TweenRepeat = exports('TweenRepeat', (_dec = ccclass("TweenRepeat"), _dec2 = menu("tween/TweenRepeat"), _dec(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TweenRepeat, _Component);

        function TweenRepeat() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = TweenRepeat.prototype;

        _proto.onLoad = function onLoad() {
          this.tweenRepeat = tween(this.node).by(1, {
            scale: new Vec3(2, 2, 2)
          }) // 对前一个 by 重复执行 3次
          .repeat(3).call(function () {
            console.log('All tweens finished.');
          });
        };

        _proto.onEnable = function onEnable() {
          this.tweenRepeat.start();
        };

        _proto.onDisable = function onDisable() {
          this.tweenRepeat.stop();
        };

        return TweenRepeat;
      }(Component)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/tween-test.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, tween, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _temp;

      cclegacy._RF.push({}, "7681ePAf7VHKpuKOshcVeC7", "tween-test", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      /**
       * 老示例的兼容性测试
       *
       * 如果是想要缓动 node 的属性，可以参考其它脚本
       */

      var TweenTest = exports('TweenTest', (_dec = ccclass("tween-test"), _dec2 = menu("tween/tween-test"), _dec(_class = _dec2(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TweenTest, _Component);

        function TweenTest() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_wPos", new Vec3(0, 0, 0));

          _defineProperty(_assertThisInitialized(_this), "_wScale", new Vec3(1, 1, 1));

          _defineProperty(_assertThisInitialized(_this), "_lEuler", new Vec3(0, 0, 0));

          return _this;
        }

        var _proto = TweenTest.prototype;

        _proto.onLoad = function onLoad() {
          Vec3.copy(this._wPos, this.node.worldPosition);
          /**
           * 注意，这里的 easing 的值类型在 V1.1 已经变动了，为了测试旧版本的兼容性，这里没有将其改成正确的值
           */

          this.tweenPos = tween(this._wPos).to(3, new Vec3(10, 10, 10), {
            easing: 'bounceInOut'
          }).to(3, new Vec3(0, 0, 0), {
            easing: 'elasticOut'
          }).union().repeat(Infinity);
          Vec3.copy(this._wScale, this.node.worldScale);
          /**
           * 下面 Tween 中的 easing 是正确的
           */

          this.tweenScale = tween(this._wScale).to(0.5, new Vec3(3, 3, 3), {
            easing: 'bounceInOut'
          }).to(0.5, new Vec3(1, 1, 1), {
            easing: 'elasticOut'
          }).union().repeat(Infinity);
          Vec3.copy(this._lEuler, this.node.eulerAngles);
          this.tweenEuler = tween(this._lEuler).to(4.5, new Vec3(360, 360, 360), {
            easing: 'bounceInOut'
          }).to(4.5, new Vec3(0, 0, 0), {
            easing: 'elasticOut'
          }).union().repeat(Infinity);
        };

        _proto.onEnable = function onEnable() {
          this.tweenPos.start();
          this.tweenScale.start();
          this.tweenEuler.start();
        };

        _proto.onDisable = function onDisable() {
          this.tweenPos.stop();
          this.tweenScale.stop();
          this.tweenEuler.stop();
        };

        _proto.update = function update() {
          this.node.worldPosition = this._wPos;
          this.node.worldScale = this._wScale;
          this.node.eulerAngles = this._lEuler;
        };

        return TweenTest;
      }(Component), _temp)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/click-change-size.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Size, UITransform, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Size = module.Size;
      UITransform = module.UITransform;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "777b0Dcg3JNZI1dOiazs1tI", "click-change-size", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var ClickChangeSize = exports('ClickChangeSize', (_dec = ccclass("ClickChangeSize"), _dec2 = menu('UI/ClickChangeSize'), _dec3 = property(Node), _dec4 = property(Size), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ClickChangeSize, _Component);

        function ClickChangeSize() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "target", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "size", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ClickChangeSize.prototype;

        _proto.start = function start() {
          // Your initialization goes here.
          this.node.on('click', this.click, this);
        };

        _proto.click = function click() {
          if (this.target) {
            var uiTrans = this.target.getComponent(UITransform);
            uiTrans.contentSize = this.size;
          }
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return ClickChangeSize;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Size();
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MultiTouchCtrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Vec2, Toggle, Node, systemEvent, SystemEventType, macro, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec2 = module.Vec2;
      Toggle = module.Toggle;
      Node = module.Node;
      systemEvent = module.systemEvent;
      SystemEventType = module.SystemEventType;
      macro = module.macro;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "778bduOkDZEJoQ2kO/MRUcF", "MultiTouchCtrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;

      var _temp_vec2_1 = new Vec2();

      var _temp_vec2_2 = new Vec2();

      var _temp_delta = new Vec2();

      var MultiTouchCtrl = exports('MultiTouchCtrl', (_dec = ccclass("MultiTouchCtrl"), _dec2 = property(Toggle), _dec3 = property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MultiTouchCtrl, _Component);

        function MultiTouchCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "toggle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "target", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = MultiTouchCtrl.prototype;

        _proto.start = function start() {
          systemEvent.on(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
          this.changeMulti();
        };

        _proto.onDestroy = function onDestroy() {
          systemEvent.off(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
        };

        _proto.changeMulti = function changeMulti() {
          if (this.toggle.isChecked) {
            macro.ENABLE_MULTI_TOUCH = true;
          } else {
            macro.ENABLE_MULTI_TOUCH = false;
          }
        };

        _proto.onTouchMove = function onTouchMove(touch, event) {
          var touches = event.getAllTouches();
          var changedTouches = event.getTouches();

          if (macro.ENABLE_MULTI_TOUCH && touches.length > 1) {
            var touch1 = null;
            var touch2 = null;
            var delta2 = new Vec2();

            if (changedTouches.length > 1) {
              touch1 = touches[0];
              touch2 = touches[1];
              touch2.getDelta(delta2);
            } else {
              touch1 = touch;
              var diffID = touch1.getID();
              var str = '';

              for (var i = 0; i < touches.length; i++) {
                var element = touches[i];
                str += element.getID() + " - ";

                if (element.getID() !== diffID) {
                  touch2 = element;
                  break;
                }
              }
            }

            var delta1 = touch1.getDelta(_temp_delta);
            var touchPoint1 = touch1.getLocation(_temp_vec2_1);
            var touchPoint2 = touch2.getLocation(_temp_vec2_2);
            var distance = touchPoint1.subtract(touchPoint2);
            var delta = delta1.subtract(delta2);

            if (Math.abs(distance.x) > Math.abs(distance.y)) {
              this.target.setScale((distance.x + delta.x) / distance.x * this.target.getScale().x, this.target.getScale().y, 1);
            } else {
              this.target.setScale(this.target.getScale().x, (distance.y + delta.y) / distance.y * this.target.getScale().y, 1);
            }
          }
        };

        return MultiTouchCtrl;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "toggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/coordinate-ui-3d.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, Node, Camera, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Node = module.Node;
      Camera = module.Camera;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "78245HzqEFHMruIc9YDEFAZ", "coordinate-ui-3d", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;

      var _v3_0 = new Vec3();

      var CoordinateUI3D = exports('CoordinateUI3D', (_dec = ccclass("CoordinateUI3D"), _dec2 = menu("UI/CoordinateUI3D"), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Camera
      }), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CoordinateUI3D, _Component);

        function CoordinateUI3D() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "D3Node", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "UINode", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "mainCamera", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = CoordinateUI3D.prototype;

        _proto.lateUpdate = function lateUpdate(deltaTime) {
          this.D3Node.getWorldPosition(_v3_0);
          this.mainCamera.convertToUINode(_v3_0, this.UINode.parent, _v3_0);
          this.UINode.setPosition(_v3_0);
        };

        return CoordinateUI3D;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "D3Node", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "UINode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "mainCamera", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/dynamic-tiled-map.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, loader, TiledMapAsset, TiledMap, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      loader = module.loader;
      TiledMapAsset = module.TiledMapAsset;
      TiledMap = module.TiledMap;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "7b7e1jUf5dIgqilm/MYNV6T", "dynamic-tiled-map", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DynamicTiledMap = exports('DynamicTiledMap', (_dec = ccclass('DynamicTiledMap'), _dec2 = property({
        type: Node
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DynamicTiledMap, _Component);

        function DynamicTiledMap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "targetNode", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = DynamicTiledMap.prototype;

        _proto.start = function start() {// Your initialization goes here.
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        _proto.onLoadTileMap = function onLoadTileMap(url) {
          var _this2 = this;

          loader.loadRes(url, TiledMapAsset, function (err, tmxAsset) {
            if (err) {
              console.error(err);
              return;
            }

            _this2.onCreateTileMap(tmxAsset);
          });
        };

        _proto.onCreateTileMap = function onCreateTileMap(tmxAsset) {
          this.targetNode.destroyAllChildren();
          var node = new Node();
          this.targetNode.addChild(node);
          var tileMap = node.addComponent(TiledMap);
          tileMap.tmxAsset = tmxAsset;
        };

        _proto.onBtnCreateTileMap = function onBtnCreateTileMap() {
          var url = 'tilemap/tile_iso_offset';
          this.onLoadTileMap(url);
        };

        _proto.onBtnCreateTileMapWithTsx = function onBtnCreateTileMapWithTsx() {
          var url = 'tilemap/tile_iso_offset_with_tsx';
          this.onLoadTileMap(url);
        };

        return DynamicTiledMap;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "targetNode", [_dec2], {
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

System.register("chunks:///_virtual/MaterialTextureAnimation.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Texture2D, Animation, error, Component, UniformCurveValueAdapter, AnimationClip, ComponentModifier, js, MeshRenderer;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Texture2D = module.Texture2D;
      Animation = module.Animation;
      error = module.error;
      Component = module.Component;
      UniformCurveValueAdapter = module.UniformCurveValueAdapter;
      AnimationClip = module.AnimationClip;
      ComponentModifier = module.ComponentModifier;
      js = module.js;
      MeshRenderer = module.MeshRenderer;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "7bcf6oXnxJKBK7SHzLOoCmh", "MaterialTextureAnimation", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * This component demonstrates how material texture animation run.
       */

      var MaterialTextureAnimation = exports('MaterialTextureAnimation', (_dec = ccclass("MaterialTextureAnimation"), _dec2 = property([Texture2D]), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MaterialTextureAnimation, _Component);

        function MaterialTextureAnimation() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "textures", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = MaterialTextureAnimation.prototype;

        _proto.start = function start() {
          var animationComponent = this.node.getComponent(Animation);

          if (!animationComponent) {
            error("Animation component is required for this script.");
            return;
          }

          var clip = createMaterialTextureAnimationClip(this.textures);
          animationComponent.clips = [clip];
          animationComponent.defaultClip = clip;
          animationComponent.playOnLoad = true;
        };

        return MaterialTextureAnimation;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "textures", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class2)) || _class));

      function createMaterialTextureAnimationClip(textures) {
        // Animate every texture for 1 sec.
        var defaultKeys = textures.map(function (texture, index) {
          return index;
        }); // Setup the value adapter.

        var uca = new UniformCurveValueAdapter();
        uca.passIndex = 0;
        uca.uniformName = 'albedoMap';
        var animationClip = new AnimationClip();
        animationClip.wrapMode = AnimationClip.WrapMode.Loop;
        animationClip.keys = [defaultKeys];
        animationClip.duration = defaultKeys[defaultKeys.length - 1] + 1;
        animationClip.curves = [{
          modifiers: [new ComponentModifier(js.getClassName(MeshRenderer)), 'sharedMaterials', 0],
          valueAdapter: uca,
          data: {
            keys: 0,
            values: textures
          }
        }];
        return animationClip;
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/sport_light_1.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "7c371gYlBVOU5uHz9LbkNjm", "sport_light_1", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var sport_light_1 = exports('sport_light_1', (_dec = ccclass('sport_light_1'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(sport_light_1, _Component);

        function sport_light_1() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_nowA", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_time", 0);

          return _this;
        }

        var _proto = sport_light_1.prototype;

        _proto.start = function start() {
          // Your initialization goes here.
          this._nowA = this.node.eulerAngles;
        };

        _proto.update = function update(deltaTime) {
          // Your update function goes here.
          this._time += 0.01;
          this._nowA.x = (Math.sin(this._time) + 1.0) * 0.5 * -90.0;
          this.node.setRotationFromEuler(this._nowA.x, this._nowA.y, this._nowA.z);
        };

        return sport_light_1;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/click-event.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "7d7e9Ou69ZHXLtYZ7k+65CX", "click-event", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ClickEvent = exports('ClickEvent', (_dec = ccclass("ClickEvent"), _dec2 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ClickEvent, _Component);

        function ClickEvent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "notice", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ClickEvent.prototype;

        _proto.start = function start() {// Your initialization goes here.
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        _proto.onButtonClick = function onButtonClick() {
          if (this.notice) {
            this.notice.string = this.node.name + ' had click!';
          }
        };

        return ClickEvent;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "notice", [_dec2], {
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

System.register("chunks:///_virtual/webview-ctrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, WebView, Label, Node, sys, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      WebView = module.WebView;
      Label = module.Label;
      Node = module.Node;
      sys = module.sys;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "802edHUpoRJ75rf3RFyK+c0", "webview-ctrl", undefined);

      var ccclass = _decorator.ccclass,
          type = _decorator.type;
      var WebviewCtrl = exports('WebviewCtrl', (_dec = ccclass('WebviewCtrl'), _dec2 = type(WebView), _dec3 = type(Label), _dec4 = type(Node), _dec5 = type(Label), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(WebviewCtrl, _Component);

        function WebviewCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "webview", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "eventTips", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "noSupport", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "platform", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = WebviewCtrl.prototype;

        _proto.start = function start() {
          // 隐藏不支持 video player 的平台
          switch (sys.platform) {
            case sys.MACOS:
            case sys.ALIPAY_MINI_GAME:
            case sys.BYTEDANCE_MINI_GAME:
            case sys.COCOSPLAY:
            case sys.HUAWEI_QUICK_GAME:
            case sys.OPPO_MINI_GAME:
            case sys.VIVO_MINI_GAME:
            case sys.XIAOMI_QUICK_GAME:
            case sys.BAIDU_MINI_GAME:
            case sys.WECHAT_GAME:
            case sys.LINKSURE_MINI_GAME:
            case sys.QTT_MINI_GAME:
            case sys.WIN32:
              this.noSupport.active = true;
              this.webview.node.active = false;
              break;
          }

          this.platform.string = "platform: " + sys.platform;
        };

        _proto.onGoTo = function onGoTo() {
          this.webview.url = 'https://www.baidu.com';
        };

        _proto.onEventTypes = function onEventTypes(target, eventType) {
          this.eventTips.string = '触发事件：' + eventType;
        };

        return WebviewCtrl;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "webview", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "eventTips", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "noSupport", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "platform", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UniformKTest.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Animation, UniformCurveValueAdapter, AnimationClip, animation, js, MeshRenderer, math, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      UniformCurveValueAdapter = module.UniformCurveValueAdapter;
      AnimationClip = module.AnimationClip;
      animation = module.animation;
      js = module.js;
      MeshRenderer = module.MeshRenderer;
      math = module.math;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "83558/TWJFKr7fv70/K70at", "UniformKTest", undefined);

      var ccclass = _decorator.ccclass;
      var UniformKTest = exports('UniformKTest', (_dec = ccclass('UniformKTest'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UniformKTest, _Component);

        function UniformKTest() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = UniformKTest.prototype;

        _proto.start = function start() {
          var testClip = this._makeTestClip();

          var animationComponent = this.node.addComponent(Animation);
          animationComponent.clips = [testClip];
          animationComponent.defaultClip = testClip;
          animationComponent.playOnLoad = true;
        };

        _proto._makeTestClip = function _makeTestClip() {
          var uniformValueAdapter = new UniformCurveValueAdapter();
          uniformValueAdapter.passIndex = 0;
          uniformValueAdapter.uniformName = 'albedo';
          var animationClip = new AnimationClip();
          animationClip.wrapMode = AnimationClip.WrapMode.Loop;
          animationClip.duration = 2.0;
          animationClip.keys = [[0, 0.3, 0.5, 1.0, 1.7, 2.0]];
          animationClip.curves = [{
            modifiers: [new animation.HierarchyPath('Nested'), new animation.ComponentPath(js.getClassName(MeshRenderer)), "sharedMaterials", 0],
            valueAdapter: uniformValueAdapter,
            data: {
              keys: 0,
              values: [new math.Color(0), new math.Color(10), new math.Color(70), new math.Color(80), new math.Color(150), new math.Color(255)]
            }
          }];
          return animationClip;
        };

        return UniformKTest;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ByteCodeLoader.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './ByteCodeCache.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Component, LastTimeResult;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      LastTimeResult = module.LastTimeResult;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "837f0IrH45KSY3rRxEsmFC6", "ByteCodeLoader", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ByteCodeCache = exports('ByteCodeCache', (_dec = ccclass('ByteCodeCache'), _dec2 = property({
        type: Label
      }), _dec3 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ByteCodeCache, _Component);

        function ByteCodeCache() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "statusLabel", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "titleLabel", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ByteCodeCache.prototype;

        _proto.start = function start() {
          setTimeout(this.runTest.bind(this), 0);
        };

        _proto.runTest = function runTest() {
          this.titleLabel.string = 'Bytecode Test';

          if (typeof jsb === 'undefined' || !jsb.saveByteCode) {
            this.statusLabel.string = 'Bytecode is not supported!';
          } else {
            if (LastTimeResult.done) {
              this.statusLabel.string = LastTimeResult.message;
              this.titleLabel.string = 'Bytecode Test (cached result)';
              return;
            }

            do {
              this.statusLabel.string = 'Generating JS file..';
              var src_file = jsb.fileUtils.getWritablePath() + 'bytecode_bigjs.js';
              var src_file2 = jsb.fileUtils.getWritablePath() + 'bytecode_bigjs2.js';
              {
                var start = new Date().getTime();

                if (jsb.fileUtils.isFileExist(src_file)) {
                  jsb.fileUtils.removeFile(src_file);
                }

                if (jsb.fileUtils.isFileExist(src_file2)) {
                  jsb.fileUtils.removeFile(src_file2);
                }

                var codeLines = ['function test_func_0() { return Math.random();}'];
                var funcCount = 100000;

                for (var i = 1; i < funcCount; i++) {
                  codeLines.push("function test_func_" + i + "() { return test_func_" + (i - 1) + "() * Math.random();}");
                }

                codeLines.push("if(Math.random() < 0.00000001) console.log(\"wow \" + test_func_" + (funcCount - 1) + "());");
                var codeText = codeLines.join('\n');
                var ok = jsb.fileUtils.writeStringToFile(codeText + "\"Success bc\"", src_file);

                if (!ok) {
                  this.statusLabel.string += '\n - failed to save source code.';
                  break;
                }

                ok = jsb.fileUtils.writeStringToFile(codeText + "\"Success js\"", src_file2);

                if (!ok) {
                  this.statusLabel.string += '\n - failed to save source code..';
                  break;
                }

                this.statusLabel.string += '\n - file size ' + codeText.length;
                var end = new Date().getTime();
                this.statusLabel.string += '\n - generating scripts takes ' + (end - start) + 'ms';
              }
              this.statusLabel.string += '\nGenerating bytecode..';
              var dstFile = src_file + '.bc';
              {
                if (jsb.fileUtils.isFileExist(dstFile)) {
                  jsb.fileUtils.removeFile(dstFile);
                }

                var _start = new Date().getTime();

                var _ok = jsb.saveByteCode(src_file, dstFile);

                var _end = new Date().getTime();

                if (!_ok) {
                  this.statusLabel.string += '\n - failed to generate bytecode!';
                  break;
                }

                this.statusLabel.string += '\n - generating bytecode takes ' + (_end - _start) + 'ms';
              }
              this.statusLabel.string += '\nRunning bytecode.. (shorter time expected)';
              {
                var _start2 = new Date().getTime();

                var result = require(dstFile);

                var _end2 = new Date().getTime();

                this.statusLabel.string += '\n - script return: ' + result;
                this.statusLabel.string += '\n - require bytecode takes ' + (_end2 - _start2) + 'ms';
              }
              this.statusLabel.string += '\nRunning text script.. (longer time expected)';
              {
                var _start3 = new Date().getTime();

                var _result = require(src_file2);

                var _end3 = new Date().getTime();

                this.statusLabel.string += '\n - script return: ' + _result;
                this.statusLabel.string += '\n - require text script takes ' + (_end3 - _start3) + 'ms';
              }
            } while (false);

            LastTimeResult.done = true;
            LastTimeResult.message = this.statusLabel.string;
          }
        };

        return ByteCodeCache;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "statusLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "titleLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenCustomProgress.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, tween, Vec3, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "838c8pQgaNIO7KFfZzgLtHR", "TweenCustomProgress", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var TweenCustomProgress = exports('TweenCustomProgress', (_dec = ccclass("TweenCustomProgress"), _dec2 = menu("tween/TweenCustomProgress"), _dec(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TweenCustomProgress, _Component);

        function TweenCustomProgress() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = TweenCustomProgress.prototype;

        _proto.onLoad = function onLoad() {
          // 对所有属性自定义 progress
          var scaleTween = tween(this.node).to(2, {
            scale: new Vec3(3, 2, 1)
          }, {
            progress: function progress(start, end, current, ratio) {
              return start + (end - start) * ratio;
            }
          }); // 对单个属性自定义 progress

          this.tweenCP = tween(this.node).to(2, {
            position: new Vec3(2, 2, -2)
          }, {
            progress: function progress(start, end, current, ratio) {
              return start + (end - start) * ratio * ratio * ratio;
            }
          }).reverseTime(scaleTween);
        };

        _proto.onEnable = function onEnable() {
          this.tweenCP.start();
        };

        _proto.onDisable = function onDisable() {
          this.tweenCP.stop();
        };

        return TweenCustomProgress;
      }(Component)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SwitchAnimation.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _defineProperty, _assertThisInitialized, _initializerDefineProperty, cclegacy, _decorator, Animation, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "857abdgcIpHIZ2oM4/tfffa", "SwitchAnimation", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SwitchAnimation = exports('SwitchAnimation', (_dec = ccclass("SwitchAnimation"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SwitchAnimation, _Component);

        function SwitchAnimation() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "num", 0);

          _defineProperty(_assertThisInitialized(_this), "_duration", 0.3);

          _initializerDefineProperty(_assertThisInitialized(_this), "minDuration", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "maxDuration", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = SwitchAnimation.prototype;

        _proto["switch"] = function _switch() {
          if (this.num == 0) {
            this.animationComponent.crossFade("Walk", this._duration);
          }

          if (this.num == 1) {
            this.animationComponent.crossFade("Run", this._duration);
          }

          if (this.num == 2) {
            this.animationComponent.crossFade("Idle", this._duration);
            this.num = -1;
          }

          this.num++;
        };

        _proto.onDurationEditBoxChange = function onDurationEditBoxChange(slider) {
          this._duration = (this.maxDuration - this.minDuration) * slider.progress;
        };

        _proto.start = function start() {
          this.animationComponent = this.node.getComponent(Animation);
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return SwitchAnimation;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "minDuration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "maxDuration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ReplaceSlotDisplay.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, dragonBones, Component;

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
      dragonBones = module.dragonBones;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "8c143MTiytPEpW1sihXhDt7", "ReplaceSlotDisplay", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ReplaceSlotDisplay = exports('ReplaceSlotDisplay', (_dec = ccclass('ReplaceSlotDisplay'), _dec2 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec3 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ReplaceSlotDisplay, _Component);

        function ReplaceSlotDisplay() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "armatureDisplay", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "replaceArmatureDisplay", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_leftWeaponIndex", 0);

          _defineProperty(_assertThisInitialized(_this), "_rightDisplayIndex", 0);

          _defineProperty(_assertThisInitialized(_this), "_rightDisplayNames", []);

          _defineProperty(_assertThisInitialized(_this), "_rightDisplayOffset", []);

          return _this;
        }

        var _proto = ReplaceSlotDisplay.prototype;

        _proto.start = function start() {
          this.replaceArmatureDisplay.node.active = false;
          this._leftWeaponIndex = 0;
          this._rightDisplayIndex = 0;
          this._rightDisplayNames = ["weapon_1004_r", "weapon_1004d_r"];
          this._rightDisplayOffset = [{
            x: 0,
            y: 0
          }, {
            x: -60,
            y: 100
          }];
        };

        _proto.left = function left() {
          var armature = this.armatureDisplay.armature();
          var slot = armature.getSlot("weapon_hand_l");
          slot.displayIndex = slot.displayIndex == 0 ? 4 : 0;
        };

        _proto.right = function right() {
          this._rightDisplayIndex++;
          this._rightDisplayIndex %= this._rightDisplayNames.length;
          var armature = this.armatureDisplay.armature();
          var slot = armature.getSlot("weapon_hand_r");
          var displayName = this._rightDisplayNames[this._rightDisplayIndex];
          var factory = dragonBones.CCFactory.getInstance();
          factory.replaceSlotDisplay(this.replaceArmatureDisplay.getArmatureKey(), "weapon", "weapon_r", displayName, slot);
          var offset = this._rightDisplayOffset[this._rightDisplayIndex];
          slot.parent.offset.x = offset.x;
          slot.parent.offset.y = offset.y;
          armature.invalidUpdate();
        };

        return ReplaceSlotDisplay;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "armatureDisplay", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "replaceArmatureDisplay", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/render-camera-to-model.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, MeshRenderer, RenderTexture, Camera, Component;

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
      MeshRenderer = module.MeshRenderer;
      RenderTexture = module.RenderTexture;
      Camera = module.Camera;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "8ed22sN8h5F/Yqo7TkUBfq+", "render-camera-to-model", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var RenderCameraToModel = exports('RenderCameraToModel', (_dec = ccclass('RenderCameraToModel'), _dec2 = menu('RenderTexture/RenderCameraToModel'), _dec3 = property(MeshRenderer), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RenderCameraToModel, _Component);

        function RenderCameraToModel() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "model", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_renderTex", null);

          return _this;
        }

        var _proto = RenderCameraToModel.prototype;

        _proto.start = function start() {
          // Your initialization goes here.
          var renderTex = this._renderTex = new RenderTexture();
          renderTex.reset({
            width: 256,
            height: 256
          });
          var cameraComp = this.getComponent(Camera);
          cameraComp.targetTexture = renderTex;
          var pass = this.model.material.passes[0];
          var binding = pass.getBinding('mainTexture');
          pass.bindTexture(binding, renderTex.getGFXTexture());
        };

        _proto.onDestroy = function onDestroy() {
          if (this._renderTex) {
            this._renderTex.destroy();

            this._renderTex = null;
          }
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return RenderCameraToModel;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "model", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/particle-sprite-change.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ParticleSystem2D, SpriteFrame, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ParticleSystem2D = module.ParticleSystem2D;
      SpriteFrame = module.SpriteFrame;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "9022dbOFcVDObg+SkEHYofd", "particle-sprite-change", undefined);

      var ccclass = _decorator.ccclass,
          type = _decorator.type;
      var ParticleSpriteChange = exports('ParticleSpriteChange', (_dec = ccclass('ParticleSpriteChange'), _dec2 = type(ParticleSystem2D), _dec3 = type(SpriteFrame), _dec4 = type(SpriteFrame), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ParticleSpriteChange, _Component);

        function ParticleSpriteChange() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "particle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spError", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "add", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ParticleSpriteChange.prototype;

        _proto.changeCustom = function changeCustom() {
          var ps = this.particle;

          if (ps.spriteFrame !== this.spError) {
            ps.spriteFrame = this.spError;
          } else {
            ps.spriteFrame = this.add;
          }
        };

        return ParticleSpriteChange;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "particle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spError", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "add", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/video-player-ctrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, VideoClip, VideoPlayer, Label, Slider, Node, sys, Component;

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
      VideoClip = module.VideoClip;
      VideoPlayer = module.VideoPlayer;
      Label = module.Label;
      Slider = module.Slider;
      Node = module.Node;
      sys = module.sys;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp;

      cclegacy._RF.push({}, "94e230TPKRPMqKKeFyoIO/J", "video-player-ctrl", undefined);

      var ccclass = _decorator.ccclass,
          type = _decorator.type;
      var VideoPlayerCtrl = exports('VideoPlayerCtrl', (_dec = ccclass('VideoPlayerCtrl'), _dec2 = type(VideoClip), _dec3 = type(VideoPlayer), _dec4 = type(Label), _dec5 = type(Label), _dec6 = type(Label), _dec7 = type(Slider), _dec8 = type(Node), _dec9 = type(Node), _dec10 = type(Label), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(VideoPlayerCtrl, _Component);

        function VideoPlayerCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "videClip", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "videoPlayer", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "eventType", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "playbackRate", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "stayOnBottom", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "slider", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "stayOnBottomTips", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "noSupport", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "platform", _descriptor9, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_playbackRate", 1);

          return _this;
        }

        var _proto = VideoPlayerCtrl.prototype;

        _proto.start = function start() {
          // 隐藏不支持 video player 的平台
          switch (sys.platform) {
            case sys.MACOS:
            case sys.ALIPAY_MINI_GAME:
            case sys.BYTEDANCE_MINI_GAME:
            case sys.COCOSPLAY:
            case sys.HUAWEI_QUICK_GAME:
            case sys.VIVO_MINI_GAME:
            case sys.XIAOMI_QUICK_GAME:
            case sys.BAIDU_MINI_GAME:
            case sys.LINKSURE_MINI_GAME:
            case sys.QTT_MINI_GAME:
            case sys.WIN32:
              this.noSupport.active = true;
              this.videoPlayer.node.active = false;
              break;
          }

          this.platform.string = "platform: " + sys.platform;
          this.eventType.string = 'nothing';
        };

        _proto.onStayOnBottom = function onStayOnBottom() {
          this.videoPlayer.stayOnBottom = !this.videoPlayer.stayOnBottom;
          var state = this.videoPlayer.stayOnBottom ? '关闭' : '打开';
          this.stayOnBottom.string = state + " stayOnBottom";
          this.stayOnBottomTips.active = this.videoPlayer.stayOnBottom;
        };

        _proto.onPlaybackRate = function onPlaybackRate() {
          this._playbackRate = this._playbackRate++ >= 3 ? 1 : this._playbackRate;
          this.videoPlayer.playbackRate = this._playbackRate;
          this.playbackRate.string = "x" + this._playbackRate;
        };

        _proto.onSlider = function onSlider(slider) {
          this.videoPlayer.currentTime = slider.progress * this.videoPlayer.duration;
        };

        _proto.onPlayLocalVideo = function onPlayLocalVideo() {
          this.videoPlayer.resourceType = VideoPlayer.ResourceType.LOCAL;

          if (this.videoPlayer.clip === this.videClip) {
            this.videoPlayer.play();
          } else {
            this.videoPlayer.clip = this.videClip;
          }
        };

        _proto.onPlayRemoteVideo = function onPlayRemoteVideo() {
          this.videoPlayer.resourceType = VideoPlayer.ResourceType.REMOTE;
          var remoteURL = 'http://download.cocos.org/CocosTest/test-case/movie.mp4';

          if (this.videoPlayer.remoteURL === remoteURL) {
            this.videoPlayer.play();
          } else {
            this.videoPlayer.remoteURL = remoteURL;
          }
        };

        _proto.onEventType = function onEventType(target, type) {
          this.eventType.string = type;

          switch (type) {
            case VideoPlayer.EventType.READY_TO_PLAY:
            case VideoPlayer.EventType.META_LOADED:
              this.videoPlayer.play();
              break;
          }
        };

        _proto.update = function update() {
          this.slider.progress = this.videoPlayer.currentTime / this.videoPlayer.duration;
        };

        return VideoPlayerCtrl;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "videClip", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "videoPlayer", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "eventType", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "playbackRate", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "stayOnBottom", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "slider", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "stayOnBottomTips", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "noSupport", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "platform", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/node-event.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Label, Node, Component;

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
      Node = module.Node;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "96eb5gupZdFEr/6F/8WWVUA", "node-event", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var NodeEvent = exports('NodeEvent', (_dec = ccclass("NodeEvent"), _dec2 = menu('Event/NodeEvent'), _dec3 = property(Label), _dec4 = property(Node), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(NodeEvent, _Component);

        function NodeEvent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "labelComp", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "receiver", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_receiver", null);

          return _this;
        }

        var _proto = NodeEvent.prototype;

        _proto.start = function start() {
          if (this.receiver) {
            this._receiver = this.receiver.getComponent(NodeEvent);
          } else {
            this._receiver = this;
          }

          this.node.on('click', this.click, this._receiver);
        };

        _proto.onDestroy = function onDestroy() {
          this.node.off('click', this.click, this._receiver);
        };

        _proto.click = function click() {
          this.labelComp.string = "Receiver is: " + this._receiver.node.name;
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return NodeEvent;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "labelComp", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "receiver", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/use-render-texture-to-sprite.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, RenderTexture, Sprite, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      RenderTexture = module.RenderTexture;
      Sprite = module.Sprite;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "977eavsJ0tLkJ4Oyd3LtHF5", "use-render-texture-to-sprite", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var UseRenderTextureToSprite = exports('UseRenderTextureToSprite', (_dec = ccclass('UseRenderTextureToSprite'), _dec2 = property(RenderTexture), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UseRenderTextureToSprite, _Component);

        function UseRenderTextureToSprite() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "render", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = UseRenderTextureToSprite.prototype;

        _proto.start = function start() {
          var renderTex = this.render;
          var spriteFrame = this.getComponent(Sprite).spriteFrame;
          spriteFrame.texture = renderTex;
        };

        return UseRenderTextureToSprite;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "render", [_dec2], {
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

System.register("chunks:///_virtual/gold.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Label, Component;

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
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "9cb89iurc1Dl4w4xqSuIEHk", "gold", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var gold = exports('gold', (_dec = ccclass("gold"), _dec2 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(gold, _Component);

        function gold() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "label", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "test", 0);

          return _this;
        }

        var _proto = gold.prototype;

        _proto.start = function start() {// Your initialization goes here.
        };

        _proto.onButton = function onButton() {
          this.test += 1;
          this.label.string = "" + this.test;

          if (this.test > 9) {
            this.test = 0;
          }
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return gold;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec2], {
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

System.register("chunks:///_virtual/layout-change-order.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, UITransform, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UITransform = module.UITransform;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "9d410ZZ47ZDeYDqx999RaNZ", "layout-change-order", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode;
      var LayoutChangeOrder = exports('LayoutChangeOrder', (_dec = ccclass('LayoutChangeOrder'), _dec(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LayoutChangeOrder, _Component);

        function LayoutChangeOrder() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "changePriority", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = LayoutChangeOrder.prototype;

        _proto.start = function start() {
          var children = this.node.children;
          var uiTrans = children[2].getComponent(UITransform);

          if (this.changePriority) {
            uiTrans.priority = 1;
          } else {
            children[2].setSiblingIndex(1);
          }
        };

        return LayoutChangeOrder;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "changePriority", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/event-first.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Prefab, Label, Button, instantiate, SystemEventType, Component;

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
      Prefab = module.Prefab;
      Label = module.Label;
      Button = module.Button;
      instantiate = module.instantiate;
      SystemEventType = module.SystemEventType;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "9deb3uG0i1DWYBatN5dSscL", "event-first", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var eventFirst = exports('eventFirst', (_dec = ccclass('eventFirst'), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: Label
      }), _dec4 = property({
        type: Button
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(eventFirst, _Component);

        function eventFirst() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "prefabNode", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "labelShow", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "button", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "item", null);

          return _this;
        }

        var _proto = eventFirst.prototype;

        _proto.onLoad = function onLoad() {
          this.item = instantiate(this.prefabNode);
        };

        _proto.start = function start() {// Your initialization goes here.
        };

        _proto.onEnable = function onEnable() {
          this.eventOn();
        };

        _proto.eventOn = function eventOn() {
          this.item.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
          this.item.on(SystemEventType.TOUCH_END, this.onTouchEnd, this);
          this.item.on(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
          this.item.on(SystemEventType.TOUCH_CANCEL, this.onTouchCancel, this);
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        _proto.onDisable = function onDisable() {
          this.item.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
          this.item.off(SystemEventType.TOUCH_END, this.onTouchEnd, this);
          this.item.off(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
          this.item.off(SystemEventType.TOUCH_CANCEL, this.onTouchCancel, this);
        };

        _proto.onTouchStart = function onTouchStart(event) {
          this.labelShow.string = "TouchStart: " + event.getLocation();
          console.log("TouchStart: " + event.getLocation());
        };

        _proto.onTouchMove = function onTouchMove(event) {
          this.labelShow.string = "TouchMove: " + event.getLocation();
          console.log("TouchMove: " + event.getLocation());
        };

        _proto.onTouchEnd = function onTouchEnd(event) {
          this.labelShow.string = 'TouchEnd';
          console.log('TouchEnd');
        };

        _proto.onTouchCancel = function onTouchCancel(event) {
          this.labelShow.string = 'TouchCancel';
          console.log('TouchCancel');
        };

        _proto.createChild = function createChild() {
          this.node.addChild(this.item);
          this.button.node.active = false;
        };

        return eventFirst;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefabNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "labelShow", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "button", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/editbox-ctrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, EditBox, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      EditBox = module.EditBox;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "a1095F095BAuqFmE8yQddG4", "editbox-ctrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var EditboxCtrl = exports('EditboxCtrl', (_dec = ccclass("EditboxCtrl"), _dec2 = menu('UI/EditboxCtrl'), _dec3 = property(EditBox), _dec4 = property(EditBox), _dec5 = property(EditBox), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EditboxCtrl, _Component);

        function EditboxCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "editBox1", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "editBox2", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "editBox3", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = EditboxCtrl.prototype;

        _proto.start = function start() {// Your initialization goes here.
        };

        _proto.setFocus = function setFocus(event, custom) {
          if (custom === '1') {
            this.editBox1.setFocus();
          } else if (custom === '2') {
            this.editBox2.setFocus();
          } else if (custom === '3') {
            this.editBox3.setFocus();
          }
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return EditboxCtrl;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "editBox1", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "editBox2", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "editBox3", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/material-test.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Color, Node, MeshRenderer, director, Label, GFXCullMode, Component;

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
      Color = module.Color;
      Node = module.Node;
      MeshRenderer = module.MeshRenderer;
      director = module.director;
      Label = module.Label;
      GFXCullMode = module.GFXCullMode;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "a133filF+BE/b9gjDYAmj56", "material-test", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var color = Color.WHITE.clone();
      var MaterialTest = exports('MaterialTest', (_dec = ccclass("MaterialTest"), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MaterialTest, _Component);

        function MaterialTest() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "manualAlbedo", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "manualMetallic", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "manualAlphaTest", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_material", null);

          return _this;
        }

        var _proto = MaterialTest.prototype;

        _proto.start = function start() {
          this._material = this.node.getComponent(MeshRenderer).material;
        };

        _proto.update = function update() {
          this.node.setRotationFromEuler(0, director.getCurrentTime() * 0.01, 0);
        } // callbacks
        ;

        _proto.useAlbedoMap = function useAlbedoMap(e) {
          this._material.recompileShaders({
            USE_ALBEDO_MAP: e.isChecked
          });

          this.manualAlbedo.active = !e.isChecked;
        };

        _proto.useMetallicMap = function useMetallicMap(e) {
          this._material.recompileShaders({
            USE_METALLIC_ROUGHNESS_MAP: e.isChecked
          });

          this.manualMetallic.active = !e.isChecked;
        };

        _proto.useAlphaTest = function useAlphaTest(e) {
          this._material.recompileShaders({
            USE_ALPHA_TEST: e.isChecked
          });

          this.manualAlphaTest.active = e.isChecked;
        };

        _proto.setAlbedo = function setAlbedo(e) {
          var li = e.progress * 255;
          color.set(li, li, li, li);

          this._material.setProperty('albedo', color);

          this.manualAlbedo.getComponentInChildren(Label).string = e.progress.toFixed(1);
        };

        _proto.setMetallic = function setMetallic(e) {
          this._material.setProperty('metallic', e.progress);

          this.manualMetallic.getComponentInChildren(Label).string = e.progress.toFixed(1);
        };

        _proto.setAlphaThreshold = function setAlphaThreshold(e) {
          this._material.setProperty('alphaThreshold', e.progress);

          this.manualAlphaTest.getComponentInChildren(Label).string = e.progress.toFixed(1);
        };

        _proto.cullFrontFace = function cullFrontFace(e) {
          this._material.overridePipelineStates({
            rasterizerState: {
              cullMode: e.isChecked ? GFXCullMode.FRONT : GFXCullMode.BACK
            }
          });
        };

        return MaterialTest;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "manualAlbedo", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "manualMetallic", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "manualAlphaTest", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/system-event.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, systemEvent, SystemEventType, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      systemEvent = module.systemEvent;
      SystemEventType = module.SystemEventType;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "a1f49jKDlBFO4sao4R7Z9g2", "system-event", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var SystemEvent = exports('SystemEvent', (_dec = ccclass("SystemEvent"), _dec2 = menu('Event/SystemEvent'), _dec3 = property(Label), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SystemEvent, _Component);

        function SystemEvent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "labelShow", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = SystemEvent.prototype;

        _proto.start = function start() {
          systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
          systemEvent.on(SystemEventType.TOUCH_END, this.onTouchEnd, this);
          systemEvent.on(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
          systemEvent.on(SystemEventType.TOUCH_CANCEL, this.onTouchCancel, this);
          systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
          systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
        };

        _proto.onDestroy = function onDestroy() {
          systemEvent.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
          systemEvent.off(SystemEventType.TOUCH_END, this.onTouchEnd, this);
          systemEvent.off(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
          systemEvent.off(SystemEventType.TOUCH_CANCEL, this.onTouchCancel, this);
          systemEvent.off(SystemEventType.KEY_DOWN, this.onKeyDown, this);
          systemEvent.off(SystemEventType.KEY_UP, this.onKeyUp, this);
        };

        _proto.onTouchStart = function onTouchStart(touch, event) {
          this.labelShow.string = "TouchStart: " + event.getLocation();
        };

        _proto.onTouchMove = function onTouchMove(touch, event) {
          this.labelShow.string = "TouchMove: " + event.getLocation();
        };

        _proto.onTouchEnd = function onTouchEnd(touch, event) {
          this.labelShow.string = 'TouchEnd';
        };

        _proto.onTouchCancel = function onTouchCancel(touch, event) {
          this.labelShow.string = 'TouchCancel';
        };

        _proto.onKeyDown = function onKeyDown(event) {
          this.labelShow.string = "KeyDown: " + String.fromCharCode(event.keyCode);
        };

        _proto.onKeyUp = function onKeyUp() {
          this.labelShow.string = "KeyUp";
        };

        return SystemEvent;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "labelShow", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/sphere_light.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "a2018D8J3dIiYOJf8RTv9VA", "sphere_light", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var typescript = exports('typescript', (_dec = ccclass('typescript'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(typescript, _Component);

        function typescript() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_nowP", new Vec3(0.0, 0.0, 0.0));

          _defineProperty(_assertThisInitialized(_this), "_startP", 0.0);

          _defineProperty(_assertThisInitialized(_this), "_low", 2.0);

          _defineProperty(_assertThisInitialized(_this), "_height", 3.51);

          _defineProperty(_assertThisInitialized(_this), "_time", 0);

          return _this;
        }

        var _proto = typescript.prototype;

        _proto.start = function start() {
          // Your initialization goes here.
          this._nowP = this.node.position;
          this._startP = Math.asin((this._nowP.y - this._low) / (this._height - this._low));
        };

        _proto.update = function update(deltaTime) {
          this._time += 0.01;
          this._nowP.y = (Math.sin(this._time - this._startP) + 1.0) * 2.0 * (this._height - this._low) + this._low;
          this.node.setPosition(this._nowP);
        };

        return typescript;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/click-and-listener.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _temp;

      cclegacy._RF.push({}, "a9268xYoEFIPLoutplf7g9g", "click-and-listener", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var ClickAndListener = exports('ClickAndListener', (_dec = ccclass("ClickAndListener"), _dec2 = menu('UI/ClickAndListener'), _dec(_class = _dec2(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ClickAndListener, _Component);

        function ClickAndListener() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_label", null);

          return _this;
        }

        var _proto = ClickAndListener.prototype;

        _proto.start = function start() {
          this._label = this.getComponent(Label);
        };

        _proto.clickCallback = function clickCallback(event, data) {
          this._label.string = data;
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return ClickAndListener;
      }(Component), _temp)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Test.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, EditBox, SpriteFrame, find, Label, Sprite, Vec3, Component;

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
      EditBox = module.EditBox;
      SpriteFrame = module.SpriteFrame;
      find = module.find;
      Label = module.Label;
      Sprite = module.Sprite;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "acb91WgF7FLwbelgCmr78H7", "Test", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Test = exports('Test', (_dec = ccclass("Test"), _dec2 = property({
        type: EditBox
      }), _dec3 = property({
        type: SpriteFrame
      }), _dec4 = property({
        type: SpriteFrame
      }), _dec5 = property({
        type: SpriteFrame
      }), _dec6 = property({
        type: SpriteFrame
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Test, _Component);

        function Test() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "editbox", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sf", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sea", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lake", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "mountain", _descriptor5, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "tipLabel", null);

          _defineProperty(_assertThisInitialized(_this), "showLabel", null);

          _defineProperty(_assertThisInitialized(_this), "_sprite", null);

          _defineProperty(_assertThisInitialized(_this), "_label", '替换成功');

          return _this;
        }

        var _proto = Test.prototype;

        _proto.start = function start() {
          var _canvas$getChildByNam, _canvas$getChildByNam2;

          var canvas = find('Canvas');
          this.tipLabel = canvas === null || canvas === void 0 ? void 0 : (_canvas$getChildByNam = canvas.getChildByName('Label-1')) === null || _canvas$getChildByNam === void 0 ? void 0 : _canvas$getChildByNam.getComponent(Label);
          this.showLabel = canvas === null || canvas === void 0 ? void 0 : (_canvas$getChildByNam2 = canvas.getChildByName('Label-2')) === null || _canvas$getChildByNam2 === void 0 ? void 0 : _canvas$getChildByNam2.getComponent(Label);
          this._sprite = this.node.getComponent(Sprite);
        };

        _proto.test = function test(name) {
          this._sprite.changeSpriteFrameFromAtlas(name);
        };

        _proto.button = function button() {
          this.tipLabel.node.setPosition(0, 1000, 0);
        };

        _proto.button1 = function button1() {
          this.test(this.editbox.string);

          if (this._sprite.spriteFrame !== null) {
            this.showLabel.string = this._label + ' ' + this.editbox.string;
          }

          if (this._sprite.spriteAtlas === null) {
            this.showLabel.string = "替换失败" + this.editbox.string;
          }

          if (this._sprite.spriteAtlas != null && this._sprite.spriteFrame == null) {
            this.showLabel.string = "请输入正确的名字";
          }

          this.tipLabel.node.setPosition(0, 1000, 0);
        };

        _proto.button2 = function button2() {
          this._sprite.spriteAtlas = null;
          this.showLabel.string = '清除图集';
          this._label = '替换失败';
        };

        _proto.button3 = function button3(name) {
          this.name = this.editbox.string;

          if (this.name == 'tree') {
            this._sprite.spriteFrame = this.sf;
            this.showLabel.string = '更换图片 tree';
          }

          if (this.name == 'sea') {
            this._sprite.spriteFrame = this.sea;
            this.showLabel.string = '更换图片 sea';
          }

          if (this.name == 'lake') {
            this._sprite.spriteFrame = this.lake;
            this.showLabel.string = '更换图片 lake';
          }

          if (this.name == 'mountain') {
            this._sprite.spriteFrame = this.mountain;
            this.showLabel.string = '更换图片 mountain';
          }

          if (this.name != 'mountain' && this.name != 'lake' && this.name != 'sea' && this.name != 'tree') {
            this.showLabel.string = '请输入正确的名字';
          }
        };

        _proto.button4 = function button4() {
          this.tipLabel.node.position = new Vec3(90, 72, 0);
        };

        return Test;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "editbox", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sf", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sea", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lake", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "mountain", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/particle-custom-change.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ParticleSystem2D, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ParticleSystem2D = module.ParticleSystem2D;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "afc74+MThhNObj4Y7mBV5OT", "particle-custom-change", undefined);

      var ccclass = _decorator.ccclass,
          type = _decorator.type;
      var ParticleCustomChange = exports('ParticleCustomChange', (_dec = ccclass('ParticleCustomChange'), _dec2 = type(ParticleSystem2D), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ParticleCustomChange, _Component);

        function ParticleCustomChange() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "particle", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ParticleCustomChange.prototype;

        _proto.changeCustom = function changeCustom() {
          this.particle.custom = !this.particle.custom;
        };

        return ParticleCustomChange;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "particle", [_dec2], {
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

System.register("chunks:///_virtual/BuildTimeConstantsTest.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './env'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Label, Component, env;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      env = module;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "b0326gWXPZCZZWtUz1h2XSP", "BuildTimeConstantsTest", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu,
          executeInEditMode = _decorator.executeInEditMode; // import * as buildTimeConstants from 'build-time-constants';

      var keys = Object.keys(env).sort();
      var BuildTimeConstantsTest = exports('BuildTimeConstantsTest', (_dec = ccclass('BuildTimeConstantsTest'), _dec2 = menu('TestCases/Scripting/BuildTimeConstantsTest'), _dec3 = property(Node), _dec(_class = _dec2(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BuildTimeConstantsTest, _Component);

        function BuildTimeConstantsTest() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "labelNode", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = BuildTimeConstantsTest.prototype;

        _proto.start = function start() {
          var label = this.labelNode.getComponent(Label);
          var keyNameMaxLen = keys.reduce(function (len, key) {
            return Math.max(len, key.length);
          }, 0);
          label.string = "            " + keys.map(function (key) {
            var value = env[key];
            var valueRep = typeof value === 'boolean' ? value ? 'V' : 'X' : value;
            return key.padStart(keyNameMaxLen, ' ') + " : " + valueRep;
          }).join('\n') + "\n";
        };

        return BuildTimeConstantsTest;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "labelNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenRepeatForever.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, tween, Vec3, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "b06c2YjnhhEwJmoSA0i153H", "TweenRepeatForever", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var TweenRepeatForever = exports('TweenRepeatForever', (_dec = ccclass("TweenRepeatForever"), _dec2 = menu("tween/TweenRepeatForever"), _dec(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TweenRepeatForever, _Component);

        function TweenRepeatForever() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = TweenRepeatForever.prototype;

        _proto.onLoad = function onLoad() {
          // 一直重复执行下去
          this.tweenRF = tween(this.node).by(1, {
            scale: new Vec3(2, 2, 2)
          }).repeatForever();
        };

        _proto.onEnable = function onEnable() {
          this.tweenRF.start();
        };

        _proto.onDisable = function onDisable() {
          /**
           * v1.0.4 版本开始，当缓动目标为 node 后，节点销毁后将会自动进行 stop
           */
          // this.tweenRF.stop();
        };

        return TweenRepeatForever;
      }(Component)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/wire-frame.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, _inheritsLoose, cclegacy, _decorator, Material, GFXPrimitiveMode, Vec4, MeshRenderer, utils, primitives, Component;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Material = module.Material;
      GFXPrimitiveMode = module.GFXPrimitiveMode;
      Vec4 = module.Vec4;
      MeshRenderer = module.MeshRenderer;
      utils = module.utils;
      primitives = module.primitives;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "b4f9555Y+ZOYbMoZ8HBVqT8", "wire-frame", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var wireFrame = exports('wireFrame', (_dec = ccclass('wireFrame'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(wireFrame, _Component);

        function wireFrame() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = wireFrame.prototype;

        _proto.onEnable = function onEnable() {
          if (wireFrame.lineMat == null) {
            wireFrame.lineMat = new Material();
            wireFrame.lineMat.initialize({
              effectName: 'unlit',
              states: {
                primitive: GFXPrimitiveMode.LINE_LIST
              }
            });
            wireFrame.lineMat.setProperty('mainColor', new Vec4(0, 0, 0, 1));
          }

          var model = this.getComponent(MeshRenderer);

          if (model && model.mesh && model.mesh.subMeshCount > 0) {
            var newModel = this.addComponent(MeshRenderer);
            var geo = {
              positions: model.mesh.renderingSubMeshes[0].geometricInfo.positions.slice(),
              indices: model.mesh.renderingSubMeshes[0].geometricInfo.indices.slice()
            };
            var mesh = utils.createMesh(primitives.wireframed(geo));
            newModel.material = wireFrame.lineMat;
            newModel.mesh = mesh;
          }
        };

        return wireFrame;
      }(Component), _defineProperty(_class2, "lineMat", null), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Client.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _createClass, _defineProperty, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b6d024kRaRAM6r6jQ+zjtlM", "Client", undefined);

      var Client = exports('Client', /*#__PURE__*/function () {
        _createClass(Client, [{
          key: "connected",
          get: function get() {
            return this._connected;
          }
        }]);

        function Client(address, port) {
          var _this = this;

          if (address === void 0) {
            address = '127.0.0.1';
          }

          if (port === void 0) {
            port = 8080;
          }

          _defineProperty(this, "_socket", null);

          _defineProperty(this, "_connected", false);

          _defineProperty(this, "_timer", 0);

          _defineProperty(this, "onopen", null);

          _defineProperty(this, "onmessage", null);

          _defineProperty(this, "onclose", null);

          var init = function init() {
            _this._socket = new WebSocket('ws://' + address + ':' + port);

            _this._socket.onmessage = function (event) {
              _this.onmessage && _this.onmessage(event);
            };

            _this._socket.onopen = function () {
              _this._connected = true;
              _this.onopen && _this.onopen();
            };

            _this._socket.onerror = function () {
              _this._connected = false;
              _this._timer = setTimeout(init, 1000);
            };

            _this._socket.onclose = function () {
              _this._connected = false;
              _this.onclose && _this.onclose();
            };
          };

          init();
        }

        var _proto = Client.prototype;

        _proto.postMessage = function postMessage(message) {
          if (this._connected) {
            if (typeof message !== 'string' && !(message instanceof ArrayBuffer) && !ArrayBuffer.isView(message)) {
              message = JSON.stringify(message);
            }

            this._socket.send(message);

            return true;
          }
        };

        _proto.close = function close() {
          this._socket.close();

          if (this._timer) {
            clearTimeout(this._timer);
          }
        };

        return Client;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AssetLoading.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _defineProperty, _assertThisInitialized, _initializerDefineProperty, cclegacy, _decorator, Node, Label, Prefab, SpriteFrame, loader, director, SpriteAtlas, Font, TextureCube, Texture2D, log, AudioSource, Layers, instantiate, MeshRenderer, UIMeshRenderer, builtinResMgr, Sprite, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Prefab = module.Prefab;
      SpriteFrame = module.SpriteFrame;
      loader = module.loader;
      director = module.director;
      SpriteAtlas = module.SpriteAtlas;
      Font = module.Font;
      TextureCube = module.TextureCube;
      Texture2D = module.Texture2D;
      log = module.log;
      AudioSource = module.AudioSource;
      Layers = module.Layers;
      instantiate = module.instantiate;
      MeshRenderer = module.MeshRenderer;
      UIMeshRenderer = module.UIMeshRenderer;
      builtinResMgr = module.builtinResMgr;
      Sprite = module.Sprite;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "b7a38N/ysBPxb/1g3EBPfn4", "AssetLoading", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AssetLoading = exports('AssetLoading', (_dec = ccclass("AssetLoading"), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Label
      }), _dec4 = property({
        type: [Node]
      }), _dec5 = property({
        type: Prefab
      }), _dec6 = property({
        type: SpriteFrame
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AssetLoading, _Component);

        function AssetLoading() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_lastType", '');

          _defineProperty(_assertThisInitialized(_this), "_curRes", null);

          _defineProperty(_assertThisInitialized(_this), "_btnLabel", null);

          _defineProperty(_assertThisInitialized(_this), "_audioSource", null);

          _defineProperty(_assertThisInitialized(_this), "_isLoading", false);

          _defineProperty(_assertThisInitialized(_this), "_urls", {
            Audio: "test_assets/audio",
            Txt: "test_assets/text",
            ImageAsset: "test_assets/PurpleMonster",
            Texture2D: "test_assets/PurpleMonster/texture",
            Font: "test_assets/font",
            SpriteAtlas: "test_assets/atlas.plist",
            SpriteFrame: "test_assets/image/spriteFrame",
            Prefab: "test_assets/prefab",
            Animation: "test_assets/testAnim",
            Scene: "test_assets/test-scene",
            TextureCube: "test_assets/cubemap",
            CORS: "https://download.cocos.org/CocosTest/test-case/logo.png",
            Material: "test_assets/testMat",
            Mesh: "test_assets/Monster/monster.mesh",
            Skeleton: "test_assets/Monster/Armature.skeleton"
          });

          _initializerDefineProperty(_assertThisInitialized(_this), "showWindow", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "loadTips", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "loadList", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "loadAnimTestPrefab", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "loadMaterialSpriteFrame", _descriptor5, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = AssetLoading.prototype; // use this for initialization

        _proto.onLoad = function onLoad() {
          // registered event
          this._onRegisteredEvent();
        };

        _proto.onDestroy = function onDestroy() {
          if (this._curRes) {
            loader.releaseAsset(this._curRes);
          }
        };

        _proto._onRegisteredEvent = function _onRegisteredEvent() {
          for (var i = 0; i < this.loadList.length; ++i) {
            this.loadList[i].on(Node.EventType.TOUCH_END, this._onClick.bind(this));
          }
        };

        _proto._onClick = function _onClick(event) {
          if (this._isLoading) {
            return;
          }

          this._onClear();

          var target = event.target;

          if (target) {
            var curType = target.name.split('_')[1];

            if (curType in this._urls) {
              this._curType = curType;
            }
          }

          if (this._lastType !== "" && this._curType === this._lastType) {
            this.loadTips.string = '';

            this._onShowResClick(event);

            return;
          }

          if (this._btnLabel) {
            this._btnLabel.string = "已加载 " + this._lastType;
          }

          this._lastType = this._curType;

          if (target) {
            this._btnLabel = target.getChildByName("Label").getComponent(Label);
          }

          this.loadTips.string = this._curType + " Loading....";
          this._isLoading = true;

          this._load();
        };

        _proto._load = function _load() {
          var url = this._urls[this._curType];

          var loadCallBack = this._loadCallBack.bind(this);

          switch (this._curType) {
            case 'SpriteFrame':
              // specify the type to load sub asset from texture's url
              loader.loadRes(url, SpriteFrame, loadCallBack);
              break;

            case 'Texture2D':
              loader.loadRes(url, Texture2D, loadCallBack);
              break;

            case 'TextureCube':
              loader.loadRes(url, TextureCube, loadCallBack);
              break;

            case 'Font':
              loader.loadRes(url, Font, loadCallBack);
              break;

            case 'SpriteAtlas':
              loader.loadRes(url, SpriteAtlas, loadCallBack);
              break;

            case 'Animation':
            case 'Prefab':
            case 'Skeleton':
            case 'Mesh':
            case 'ImageAsset':
            case 'Txt':
            case 'Audio':
            case 'Material':
            case 'Skeleton':
              loader.loadRes(url, loadCallBack);
              break;

            case 'Scene':
              director.loadScene(url);
              break;

            case 'CORS':
              loader.load(url, loadCallBack);
              this.loadTips.string = "CORS image should report texImage2D error under WebGL and works ok under Canvas";
              break;

            default:
              loader.load(url, loadCallBack);
              break;
          }
        };

        _proto._loadCallBack = function _loadCallBack(err, res) {
          this._isLoading = false;

          if (err) {
            log('Error url [' + err + ']');
            return;
          }

          if (this._curType === 'ImageAsset' || this._curType === 'CORS') {
            this._curRes = new Texture2D();
            this._curRes.image = res;
          } else {
            this._curRes = res;
          }

          if (this._btnLabel) {
            if (this._curType === "Audio") {
              this._btnLabel.string = "播放";
            } else {
              this._btnLabel.string = "创建";
            }

            this._btnLabel.string += this._curType;
          }

          this.loadTips.string = this._curType + " Loaded Successfully!";
        };

        _proto._onClear = function _onClear() {
          this.showWindow.removeAllChildren();

          if (this._audioSource && this._audioSource instanceof AudioSource) {
            this._audioSource.stop();
          }
        };

        _proto._onShowResClick = function _onShowResClick(event) {
          if (this._curType === "Scene") {
            return;
          }

          this._createNode(this._curType, this._curRes);
        };

        _proto._createNode = function _createNode(type, res) {
          this.loadTips.string = "";
          var node = new Node("New " + type);
          node.layer = Layers.Enum.UI_2D;
          node.setPosition(0, 0, 0);
          var component = null;

          switch (this._curType) {
            case "SpriteFrame":
              component = node.addComponent(Sprite);
              component.spriteFrame = res;
              break;

            case "SpriteAtlas":
              component = node.addComponent(Sprite);
              component.spriteFrame = res.getSpriteFrames()[0];
              break;

            case "Texture2D":
              var cube = instantiate(this.loadAnimTestPrefab);
              var model = cube.getComponent(MeshRenderer);
              model.material.setProperty('albedoMap', res);
              cube.setPosition(0, 0, 50);
              cube.setScale(100, 100, 100);
              cube.parent = this.showWindow;
              break;

            case 'ImageAsset':
            case "CORS":
              component = node.addComponent(Sprite);
              var spriteFrame = new SpriteFrame();
              spriteFrame.texture = res;
              component.spriteFrame = spriteFrame;
              break;

            case "Audio":
              component = node.addComponent(AudioSource);
              component.clip = res;
              component.play();
              this._audioSource = component;
              this.loadTips.string = "播放音乐。";
              break;

            case "Txt":
              component = node.addComponent(Label);
              component.lineHeight = 40;
              component.string = res.text;
              break;

            case "Material":
              component = node.addComponent(Sprite);
              component.sharedMaterials = res;
              component.spriteFrame = this.loadMaterialSpriteFrame;
              break;

            case "Font":
              component = node.addComponent(Label);
              component.font = res;
              component.lineHeight = 40;
              component.string = "This is BitmapFont!";
              break;

            case 'Mesh':
              component = node.addComponent(MeshRenderer);
              node.addComponent(UIMeshRenderer);
              node.setPosition(0, 0, 50);
              node.setScale(5, 5, 5);
              component.mesh = res;
              component.material = builtinResMgr.get('standard-material');
              break;

            case "Prefab":
              var prefab = instantiate(res);
              prefab.parent = node;
              prefab.setPosition(0, 0, 0);
              break;

            default:
              this.loadTips.string = "此项没有展示效果";
              break;
          }

          this.showWindow.addChild(node);
        };

        return AssetLoading;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "showWindow", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "loadTips", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "loadList", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "loadAnimTestPrefab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "loadMaterialSpriteFrame", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/event-info.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, view, systemEvent, SystemEventType, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      view = module.view;
      systemEvent = module.systemEvent;
      SystemEventType = module.SystemEventType;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "b7fbeTedz5DS48dh969Stjm", "event-info", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var EventInfo = exports('EventInfo', (_dec = ccclass("EventInfo"), _dec2 = menu('Event/EventInfo'), _dec3 = property(Label), _dec4 = property(Label), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EventInfo, _Component);

        function EventInfo() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "label", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "top", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = EventInfo.prototype;

        _proto.start = function start() {
          this.top.string = "\u5C4F\u5E55\u5C3A\u5BF8: " + view.getCanvasSize() + " \n UI \u5C3A\u5BF8: " + view.getVisibleSize();
          systemEvent.on(SystemEventType.TOUCH_START, this._touchStart, this);
          systemEvent.on(SystemEventType.TOUCH_MOVE, this._touchMove, this);
          systemEvent.on(SystemEventType.TOUCH_END, this._touchEnd, this);
          systemEvent.on(SystemEventType.MOUSE_MOVE, this._mouseMove, this);
          systemEvent.on(SystemEventType.MOUSE_UP, this._mouseUp, this);
        };

        _proto.onDestroy = function onDestroy() {
          systemEvent.off(SystemEventType.TOUCH_START, this._touchStart, this);
          systemEvent.off(SystemEventType.TOUCH_MOVE, this._touchMove, this);
          systemEvent.off(SystemEventType.TOUCH_END, this._touchEnd, this);
          systemEvent.off(SystemEventType.MOUSE_MOVE, this._mouseMove, this);
          systemEvent.off(SystemEventType.MOUSE_UP, this._mouseUp, this);
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        _proto._touchStart = function _touchStart(touch) {
          var content = "touch startLocation:  " + touch.getStartLocation() + " \n";
          content += "UI touch startLocation:  " + touch.getUIStartLocation() + " \n";
          this.label.string = content;
        };

        _proto._touchMove = function _touchMove(event) {
          var content = '';
          content += 'touch pre location: ' + event.getPreviousLocation() + '\n';
          content += 'touch location: ' + event.getLocation() + '\n';
          content += 'touch delta: ' + event.getDelta() + '\n';
          content += 'touch location in view: ' + event.getLocationInView() + '\n';
          content += 'UI touch pre location: ' + event.getUIPreviousLocation() + '\n';
          content += 'UI touch location: ' + event.getUILocation() + '\n';
          content += 'UI touch delta: ' + event.getUIDelta() + '\n';
          this.label.string = content;
        };

        _proto._touchEnd = function _touchEnd() {
          this.label.string = 'End';
        };

        _proto._mouseMove = function _mouseMove(event) {
          var content = '';
          content += 'mouse pre location: ' + event.getPreviousLocation() + '\n';
          content += 'mouse location: ' + event.getLocation() + '\n';
          content += 'mouse delta: ' + event.getDelta() + '\n';
          content += 'mouse location in view: ' + event.getLocationInView() + '\n';
          content += 'UI mouse pre location: ' + event.getUIPreviousLocation() + '\n';
          content += 'UI mouse location: ' + event.getUILocation() + '\n';
          content += 'UI mouse delta: ' + event.getUIDelta() + '\n';
          this.label.string = content;
        };

        _proto._mouseUp = function _mouseUp() {
          this.label.string = 'End';
        };

        return EventInfo;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "top", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/change-graphics.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Graphics, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Graphics = module.Graphics;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "b8d16/SKKRMO5pWpEllhAXf", "change-graphics", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var ChangeGraphics = exports('ChangeGraphics', (_dec = ccclass("ChangeGraphics"), _dec2 = menu('UI/ChangeGraphics'), _dec(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ChangeGraphics, _Component);

        function ChangeGraphics() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = ChangeGraphics.prototype;

        _proto.start = function start() {// Your initialization goes here.
        };

        _proto.drawRect = function drawRect() {
          var g = this.getComponent(Graphics);
          g.clear();
          g.lineWidth = 10;
          g.fillColor.fromHEX('#ff0000'); // rect

          g.rect(-250, 0, 200, 100); // round rect

          g.roundRect(50, 0, 200, 100, 20);
          g.stroke();
          g.fill();
        };

        _proto.drawArc = function drawArc() {
          var g = this.getComponent(Graphics);
          g.clear();
          g.lineWidth = 5;
          g.fillColor.fromHEX('#ff0000');
          g.arc(0, 0, 100, Math.PI / 2, Math.PI, false);
          g.lineTo(0, 0);
          g.close();
          g.stroke();
          g.fill();
          g.fillColor.fromHEX('#00ff00');
          g.arc(-10, 10, 100, Math.PI / 2, Math.PI, true);
          g.lineTo(-10, 10);
          g.close();
          g.stroke();
          g.fill();
        };

        _proto.drawLineTo = function drawLineTo() {
          var g = this.getComponent(Graphics);
          g.clear();
          g.lineWidth = 10;
          g.fillColor.fromHEX('#ff0000');
          g.moveTo(-20, 0);
          g.lineTo(0, -100);
          g.lineTo(20, 0);
          g.lineTo(0, 100);
          g.close();
          g.stroke();
          g.fill();
        };

        _proto.drawEllipse = function drawEllipse() {
          var g = this.getComponent(Graphics);
          g.clear();
          g.lineWidth = 10;
          g.fillColor.fromHEX('#ff0000');
          g.circle(150, 0, 100);
          g.ellipse(-150, 0, 100, 70);
          g.stroke();
          g.fill();
        };

        return ChangeGraphics;
      }(Component)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/toggle-ctrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ToggleContainer, Label, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ToggleContainer = module.ToggleContainer;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "bb72epOWF9CCrIWL9vgq1Ge", "toggle-ctrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ToggleCtrl = exports('ToggleCtrl', (_dec = ccclass('ToggleCtrl'), _dec2 = property(ToggleContainer), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ToggleCtrl, _Component);

        function ToggleCtrl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "group", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ToggleCtrl.prototype;

        _proto.start = function start() {
          var node = this.group.node.getChildByName('Label');
          var label = node.getComponent(Label);
          label.string += "\n toggleItems length : " + this.group.toggleItems.length;
        };

        return ToggleCtrl;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "group", [_dec2], {
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

System.register("chunks:///_virtual/AnimationEventTesting.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Label, Component;

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
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "bc36fyzATlDor7Phlki8dYB", "AnimationEventTesting", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AnimationEventTesting = exports('AnimationEventTesting', (_dec = ccclass("AnimationEventTesting"), _dec2 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AnimationEventTesting, _Component);

        function AnimationEventTesting() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "label", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_times", 1);

          return _this;
        }

        var _proto = AnimationEventTesting.prototype;

        _proto.start = function start() {// Your initialization goes here.
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        _proto.AnimationEventTest = function AnimationEventTest(param) {
          this.label.string = "第" + this._times++ + "次，" + param;
        };

        return AnimationEventTesting;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec2], {
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

System.register("chunks:///_virtual/capture_to_web.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Sprite, Camera, SpriteFrame, RenderTexture, Component;

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
      Sprite = module.Sprite;
      Camera = module.Camera;
      SpriteFrame = module.SpriteFrame;
      RenderTexture = module.RenderTexture;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "c0df2m0GMhJYpH+xSMVYVVQ", "capture_to_web", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var CaptureToWeb = exports('CaptureToWeb', (_dec = ccclass('CaptureToWeb'), _dec2 = menu('RenderTexture/CaptureToWeb'), _dec3 = property(Sprite), _dec4 = property(Camera), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CaptureToWeb, _Component);

        function CaptureToWeb() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "sprite", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "camera", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_renderTex", null);

          return _this;
        }

        var _proto = CaptureToWeb.prototype;

        _proto.start = function start() {
          var spriteFrame = this.sprite.spriteFrame;
          var sp = new SpriteFrame();
          sp.reset({
            originalSize: spriteFrame.originalSize,
            rect: spriteFrame.rect,
            offset: spriteFrame.offset,
            isRotate: spriteFrame.rotated,
            borderTop: spriteFrame.insetTop,
            borderLeft: spriteFrame.insetLeft,
            borderBottom: spriteFrame.insetBottom,
            borderRight: spriteFrame.insetRight
          });
          var renderTex = this._renderTex = new RenderTexture();
          renderTex.reset({
            width: 128,
            height: 128
          });
          this.camera.targetTexture = renderTex;
          sp.texture = renderTex;
          this.sprite.spriteFrame = sp;
          this.scheduleOnce(function () {
            renderTex.resize(512, 512);
          }, 2);
        };

        _proto.onDestroy = function onDestroy() {
          if (this._renderTex) {
            this._renderTex.destroy();

            this._renderTex = null;
          }
        };

        return CaptureToWeb;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sprite", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShowTips.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "c161aJHiblOroMdOeGczlfU", "ShowTips", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ShowTips = exports('ShowTips', (_dec = ccclass("ShowTips"), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ShowTips, _Component);

        function ShowTips() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "tips", null);

          _defineProperty(_assertThisInitialized(_this), "ifShow", true);

          return _this;
        }

        var _proto = ShowTips.prototype;

        _proto.showTip = function showTip() {
          if (this.ifShow == false) {
            this.tips.setPosition(0, 1000, 0);
          }

          if (this.ifShow) {
            this.tips.setPosition(0, 0, 0);
          }

          this.ifShow = !this.ifShow;
        };

        _proto.start = function start() {
          // Your initialization goes here.
          this.tips = this.node.getChildByName('tips');
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return ShowTips;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoadSpine.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, loader, sp, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      loader = module.loader;
      sp = module.sp;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "c17afOJ5PBHxIigUOVBfvPh", "LoadSpine", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var LoadSpine = exports('LoadSpine', (_dec = ccclass('LoadSpine'), _dec2 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LoadSpine, _Component);

        function LoadSpine() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "tips", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = LoadSpine.prototype;

        _proto.start = function start() {
          var _this2 = this; // Your initialization goes here.


          loader.loadRes("spine/alien/alien-pro", sp.SkeletonData, function (err, spineAsset) {
            if (err) {
              _this2.tips.string = "Failed to load asset";
              return;
            }

            var comp = _this2.getComponent('sp.Skeleton');

            comp.skeletonData = spineAsset;
            var ani = comp.setAnimation(0, 'run', true);
            _this2.tips.string = 'Load Success';
          });
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return LoadSpine;
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

System.register("chunks:///_virtual/toggle-event-ctrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "c22adkyonxMMq+dz11Rnh0V", "toggle-event-ctrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ToggleEvent = exports('ToggleEvent', (_dec = ccclass('ToggleEvent'), _dec2 = property(Label), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ToggleEvent, _Component);

        function ToggleEvent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "tips", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ToggleEvent.prototype;

        _proto.onToggleClick = function onToggleClick(toggle) {
          this.tips.string = "\u89E6\u53D1\u4E86 toggle \u4E8B\u4EF6\uFF0C\u5F53\u524D Toggle \u72B6\u6001\u4E3A\uFF1A" + toggle.isChecked;
        };

        _proto.onToggleContainerClick = function onToggleContainerClick(toggle) {
          this.tips.string = "\u89E6\u53D1\u4E86 ToggleContainer \u4E8B\u4EF6\uFF0C\u70B9\u4E86" + toggle.node.name + "\u7684 Toggle";
        };

        return ToggleEvent;
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

System.register("chunks:///_virtual/graphics-mask.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Mask, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Mask = module.Mask;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "c3558UrdgNCJ4ibMKFaVL2l", "graphics-mask", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu,
          executeInEditMode = _decorator.executeInEditMode;
      var GraphicsMask = exports('GraphicsMask', (_dec = ccclass("GraphicsMask"), _dec2 = menu('UI/GraphicsMask'), _dec(_class = _dec2(_class = executeInEditMode(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GraphicsMask, _Component);

        function GraphicsMask() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = GraphicsMask.prototype;

        _proto.start = function start() {
          this.drawArc();
        };

        _proto.drawArc = function drawArc() {
          var mask = this.getComponent(Mask);
          var g = mask.graphics;
          g.clear();
          g.lineWidth = 10;
          g.fillColor.fromHEX('#ff0000');
          g.moveTo(-80, 0);
          g.lineTo(0, -150);
          g.lineTo(80, 0);
          g.lineTo(0, 150);
          g.close();
          g.stroke();
          g.fill();
        };

        return GraphicsMask;
      }(Component)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CameraController.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Vec3, Quat, math, Component;

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
      Vec3 = module.Vec3;
      Quat = module.Quat;
      math = module.math;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "c40916EtdZOjJLnC+2Jc6AL", "CameraController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var CameraController = exports('CameraController', (_dec = ccclass("CameraController"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CameraController, _Component);

        function CameraController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "translateDelta", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "rotateDelta", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_rotateDelta", 0);

          _defineProperty(_assertThisInitialized(_this), "_temp_vec3", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_temp_quat", new Quat());

          return _this;
        }

        var _proto = CameraController.prototype;

        _proto.start = function start() {
          // Your initialization goes here.
          this._rotateDelta = math.toRadian(this.rotateDelta);
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        _proto.translate = function translate(leftRight, backForth, dt) {
          Vec3.set(this._temp_vec3, leftRight * this.translateDelta * dt, 0, backForth * this.translateDelta * dt);
          this.node.translate(this._temp_vec3);
        };

        _proto.rotate = function rotate(longitudinal, perpendicular, dt) {
          Quat.fromEuler(this._temp_quat, perpendicular * this.rotateDelta * dt, longitudinal * this.rotateDelta * dt, 0);
          this.node.rotate(this._temp_quat);
        };

        _proto.onPushJoystick = function onPushJoystick(dt, customEventData) {
          switch (customEventData) {
            case 'F':
              this.translate(0, -1, dt);
              break;

            case 'B':
              this.translate(0, 1, dt);
              break;

            case 'L':
              this.translate(-1, 0, dt);
              break;

            case 'R':
              this.translate(1, 0, dt);
              break;

            case 'U':
              this.rotate(0, 1, dt);
              break;

            case 'D':
              this.rotate(0, -1, dt);
              break;

            case 'RL':
              this.rotate(1, 0, dt);
              break;

            case 'RR':
              this.rotate(-1, 0, dt);
              break;
          }
        };

        return CameraController;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "translateDelta", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rotateDelta", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/widget-preformance.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Prefab, SpriteFrame, instantiate, UITransform, Sprite, Widget, Color, Component;

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
      Prefab = module.Prefab;
      SpriteFrame = module.SpriteFrame;
      instantiate = module.instantiate;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      Widget = module.Widget;
      Color = module.Color;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "c4ef3eRVBJBtpMR5pXx2QQZ", "widget-preformance", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var WidgetPreformance = exports('WidgetPreformance', (_dec = ccclass("WidgetPreformance"), _dec2 = menu('UI/WidgetPreformance'), _dec3 = property(Prefab), _dec4 = property(SpriteFrame), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(WidgetPreformance, _Component);

        function WidgetPreformance() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "performancePrefab", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "bgTex", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "nodeA", null);

          return _this;
        }

        var _proto = WidgetPreformance.prototype;

        _proto.start = function start() {
          var i = 0;
          this.nodeA = instantiate(this.performancePrefab);
          this.node.addChild(this.nodeA);
          var uiTrans = this.node.getComponent(UITransform);
          uiTrans.setContentSize(400, 500);
          var sprite = this.nodeA.getComponent(Sprite);
          sprite.spriteFrame = this.bgTex;
          var arr = [true, false];

          for (i = 0; i < 500; i++) {
            var child = instantiate(this.performancePrefab);
            child.name = "layer_" + (i + 1);
            this.nodeA.addChild(child);
            var childWidgetComp = child.getComponent(Widget);
            childWidgetComp.isAlignTop = true;
            var bol = arr[Math.floor(Math.random() * arr.length)];
            childWidgetComp.isAlignLeft = bol;
            bol = arr[Math.floor(Math.random() * arr.length)];
            childWidgetComp.isAlignBottom = true;
            childWidgetComp.isAlignRight = bol;
            childWidgetComp.top = 0;
            childWidgetComp.left = Math.random() * 200;
            childWidgetComp.bottom = 0;
            childWidgetComp.right = Math.random() * 150;
            var renderComp = child.getComponent(Sprite);
            renderComp.color = new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255, 255);
          }

          this.schedule(this.adjustWidget, 0.5);
        };

        _proto.onDisable = function onDisable() {
          this.unschedule(this.adjustWidget);
        };

        _proto.adjustWidget = function adjustWidget() {
          var uiTrans = this.nodeA.getComponent(UITransform);
          var size = uiTrans.contentSize;
          uiTrans.setContentSize(size.width, Math.random() * 200);
        };

        return WidgetPreformance;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "performancePrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bgTex", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/widget-destroy.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Prefab, Label, Vec3, instantiate, director, widgetManager, Component;

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
      Prefab = module.Prefab;
      Label = module.Label;
      Vec3 = module.Vec3;
      instantiate = module.instantiate;
      director = module.director;
      widgetManager = module.widgetManager;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "c5e6bCykblPn6fE7lnHQtss", "widget-destroy", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var WidgetDestroy = exports('WidgetDestroy', (_dec = ccclass("WidgetDestroy"), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: Label
      }), _dec4 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(WidgetDestroy, _Component);

        function WidgetDestroy() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "defaultPre", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "coinNumber", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "activeWidgetNum", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "movePos", new Vec3(-200, 0, 0));

          return _this;
        }

        var _proto = WidgetDestroy.prototype;

        _proto.createPrefab = function createPrefab() {
          var item = instantiate(this.defaultPre);
          this.node.addChild(item);
          this.schedule(this.updateLabel, 0.5);
        };

        _proto.destroyThenCreate = function destroyThenCreate() {
          if (this.node.children.length < 1) {
            return;
          }

          this.node.children[this.node.children.length - 1].destroy();
          this.createPrefab();
        };

        _proto.moveRoot = function moveRoot() {
          this.movePos.x += 20;
          this.node.setPosition(this.movePos);
        };

        _proto.updateLabel = function updateLabel() {
          this.coinNumber.string = 'The Coin Num is:' + director.getScene().children[2].children[3].children.length;
          this.activeWidgetNum.string = 'The active Widget Num is:' + (widgetManager._activeWidgetsIterator.length - 5); // 此处的 5 为当前场景非create出的组件的widget数量
          // 提示中的 activeNode 和 iconNum 的差值为常驻节点的 widget 数量（目前也为5）
        };

        return WidgetDestroy;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "defaultPre", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "coinNumber", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "activeWidgetNum", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/loadSubPackages.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Node, loader, Color, assetManager, SpriteAtlas, Sprite, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      loader = module.loader;
      Color = module.Color;
      assetManager = module.assetManager;
      SpriteAtlas = module.SpriteAtlas;
      Sprite = module.Sprite;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "c613aqM8DtJXq0RwpVyXnS/", "loadSubPackages", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var loadSubPackages = exports('loadSubPackages', (_dec = ccclass("loadSubPackages"), _dec2 = property({
        type: Label
      }), _dec3 = property({
        type: Node
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(loadSubPackages, _Component);

        function loadSubPackages() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "label", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "canvas", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = loadSubPackages.prototype;

        _proto.start = function start() {
          // Your initialization goes here.
          this.loadSubPackage();
        };

        _proto.loadSubPackage = function loadSubPackage() {
          var _this2 = this;

          this.label.string = 'Load subPackage...';
          loader.downloader.loadSubpackage('subPackage', function (err) {
            if (err) {
              _this2.label.string = 'load subPackage failed!';
              _this2.label.color = Color.RED;
              return console.error(err);
            }

            _this2.label.string = 'load subPackage success!';
            console.log("load subpackage(subPackage) successfully.");

            _this2.loadSpriteAtlas();
          });
        };

        _proto.loadSpriteAtlas = function loadSpriteAtlas() {
          var _this3 = this;

          assetManager.getBundle('subPackage').load('sheep', SpriteAtlas, function (err, atlas) {
            if (err) {
              return console.error(err);
            }

            loader.setAutoRelease(atlas, true);
            var node = new Node();

            _this3.canvas.addChild(node);

            node.setPosition(0, 0, 0);
            var sprite = node.addComponent(Sprite);
            sprite.spriteFrame = atlas.getSpriteFrame('sheep_down_0');
            _this3.label.string += '\nLoad atlas in subPackage success!';
            console.log('Load atlas in subPackage success!');
          });
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return loadSubPackages;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "canvas", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenActionCallBack.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, tween, Quat, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      tween = module.tween;
      Quat = module.Quat;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "c674fT0YG9Jo6W4Cp5LYcqA", "TweenActionCallBack", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var TweenActionCallBack = exports('TweenActionCallBack', (_dec = ccclass("TweenActionCallBack"), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TweenActionCallBack, _Component);

        function TweenActionCallBack() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_scale", new Vec3(1, 1, 1));

          return _this;
        }

        var _proto = TweenActionCallBack.prototype;

        _proto.onLoad = function onLoad() {
          var that = this;
          var times = 0;
          this.tween = tween(this._scale) // 延迟 1s
          .delay(1).by(1, new Vec3(1, 1, 1), {
            'onStart': function onStart() {
              // 第二遍开始的时候，移动node
              if (times == 1) that.node.translate(new Vec3(0, 10, 0));
            },
            'onUpdate': function onUpdate() {
              that.node.scale = that._scale;
            },
            'onComplete': function onComplete() {
              // 第三遍完成的时候, 旋转Node
              if (times == 2) that.node.rotate(Quat.fromEuler(new Quat(), 0, 45, 0));
              times++;
            }
          }).repeat(3);
        };

        _proto.onEnable = function onEnable() {
          this.tween.start();
        };

        _proto.onDisable = function onDisable() {
          this.tween.stop();
        };

        return TweenActionCallBack;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CoreJsTest.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './ui-log.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Component, UILog;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      UILog = module.UILog;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "c743e/HL69CAqH8vec3N4x9", "CoreJsTest", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var CoreJsTest = exports('CoreJsTest', (_dec = ccclass('CoreJsTest'), _dec2 = menu('TestCases/Scripting/LanguageFeature/CoreJsTest'), _dec3 = property(UILog), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CoreJsTest, _Component);

        function CoreJsTest() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "logPanel", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = CoreJsTest.prototype;

        _proto.start = function start() {
          this.logPanel.addLabel("\u6D4B\u8BD5\u5F00\u59CB...\n---------------------------------------");

          this._runTests();

          this.logPanel.addLabel("---------------------------------------\n\u6D4B\u8BD5\u7ED3\u675F\uFF01");
        };

        _proto._runTests = function _runTests() {
          var asserts = this._asserts.bind(this);

          asserts(shouldBeDefined(globalThis)); // asserts(shouldBeDefined(globalThis.what));

          function shouldBeDefined(value) {
            return typeof value !== 'undefined';
          }
        };

        _proto._asserts = function _asserts(expr) {
          if (!expr) {
            this.logPanel.addLabel("\u2716 \u6D4B\u8BD5\u5931\u8D25\uFF01");
          }
        };

        return CoreJsTest;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "logPanel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ButtonEventCapture.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, EventHandler, Button, Component;

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
      EventHandler = module.EventHandler;
      Button = module.Button;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "c78c8Aob3dDEZX15sLNznvP", "ButtonEventCapture", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var emptyArr = new Array();
      var ButtonEventCapture = exports('ButtonEventCapture', (_dec = ccclass("ButtonEventCapture"), _dec2 = property({
        type: EventHandler
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ButtonEventCapture, _Component);

        function ButtonEventCapture() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "eventHandler", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_button", null);

          _defineProperty(_assertThisInitialized(_this), "_click", false);

          return _this;
        }

        var _proto = ButtonEventCapture.prototype;

        _proto.start = function start() {
          // Your initialization goes here.
          this._button = this.getComponent(Button);

          this._button.node.on(Button.EventType.CLICK, this.click, this);
        };

        _proto.click = function click() {
          this._click = true;
        };

        _proto.update = function update(deltaTime) {
          // Your update function goes here.
          if (this._click) {
            emptyArr[0] = deltaTime;
            this.eventHandler.emit(emptyArr);
            this._click = false;
          }
        };

        return ButtonEventCapture;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "eventHandler", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new EventHandler();
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenRemoveSelf.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, tween, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "c7949ZkV0JICKrGvOPs4iyK", "TweenRemoveSelf", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var TweenRemoveSelf = exports('TweenRemoveSelf', (_dec = ccclass("TweenRemoveSelf"), _dec2 = menu("tween/TweenRemoveSelf"), _dec(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TweenRemoveSelf, _Component);

        function TweenRemoveSelf() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = TweenRemoveSelf.prototype;

        _proto.onLoad = function onLoad() {
          /**
           * 注意 target 需要是 Node 的，才可以使用 removeSelf
           */
          this.tweenRemoveSelf = tween(this.node).delay(1).removeSelf();
        };

        _proto.onEnable = function onEnable() {
          this.tweenRemoveSelf.start();
        };

        _proto.onDisable = function onDisable() {
          this.tweenRemoveSelf.stop();
        };

        return TweenRemoveSelf;
      }(Component)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/instanced-color.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, Color, MeshRenderer, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      MeshRenderer = module.MeshRenderer;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "cb4458YfHxLYJuKZiHvk9m8", "instanced-color", undefined);

      var ccclass = _decorator.ccclass;

      var _color = new Color();

      var _data = new Float32Array(4);

      var InstancedColor = exports('InstancedColor', (_dec = ccclass('InstancedColor'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(InstancedColor, _Component);

        function InstancedColor() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_models", []);

          return _this;
        }

        var _proto = InstancedColor.prototype;

        _proto.start = function start() {
          this._models = this.node.getComponentsInChildren(MeshRenderer);
        };

        _proto.update = function update(deltaTime) {
          var models = this._models;
          var len = models.length;

          for (var i = 0; i < len; i++) {
            var model = models[i];
            Color.toArray(_data, _color.fromHSV((model.node.position.y + 1) * 0.5, 0.5, 1));
            model.setInstancedAttribute('a_color_instanced', _data);
          }
        };

        return InstancedColor;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/deprecated-testing.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Animation, AnimationClip, Vec3, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      AnimationClip = module.AnimationClip;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "cc4f9IgmW9NVpqXTd8nWoW4", "deprecated-testing", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DeprecatedTesting = exports('DeprecatedTesting', (_dec = ccclass("deprecated-testing"), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DeprecatedTesting, _Component);

        function DeprecatedTesting() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = DeprecatedTesting.prototype;

        _proto.start = function start() {
          var anim = this.node.addComponent(Animation);
          var clip = new AnimationClip('DD'); // API 更名

          anim.addClip(clip); // API 更名 + 参数不兼容

          anim.removeClip(clip); // 静态成员函数更名
          // @ts-ignore

          Vec3['sub'];
        };

        return DeprecatedTesting;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/testJsList.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "cfb87ZSolxPPaNTWpnTT9v5", "testJsList", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var TestJsList = exports('TestJsList', (_dec = ccclass("TestJsList"), _dec2 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TestJsList, _Component);

        function TestJsList() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "label", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = TestJsList.prototype;

        _proto.start = function start() {
          var str = globalThis['JS_LIST_TIPS'];

          if (str.length) {
            this.label.string = str;
          }
        };

        return TestJsList;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec2], {
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

System.register("chunks:///_virtual/render-ui-to-spriteframe.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Sprite, SpriteFrame, RenderTexture, view, Canvas, Component;

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
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      RenderTexture = module.RenderTexture;
      view = module.view;
      Canvas = module.Canvas;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "d5a0eQxO1FNObBKLceL0sgB", "render-ui-to-spriteframe", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var RenderUIToSpriteFrame = exports('RenderUIToSpriteFrame', (_dec = ccclass('RenderUIToSpriteFrame'), _dec2 = menu('RenderTexture/RenderUIToSpriteFrame'), _dec3 = property(Sprite), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RenderUIToSpriteFrame, _Component);

        function RenderUIToSpriteFrame() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "content", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_renderTex", null);

          return _this;
        }

        var _proto = RenderUIToSpriteFrame.prototype;

        _proto.start = function start() {
          var spriteFrame = this.content.spriteFrame;
          var sp = new SpriteFrame();
          sp.reset({
            originalSize: spriteFrame.originalSize,
            rect: spriteFrame.rect,
            offset: spriteFrame.offset,
            isRotate: spriteFrame.rotated,
            borderTop: spriteFrame.insetTop,
            borderLeft: spriteFrame.insetLeft,
            borderBottom: spriteFrame.insetBottom,
            borderRight: spriteFrame.insetRight
          });
          var renderTex = this._renderTex = new RenderTexture();
          var size = view.getVisibleSize();
          renderTex.reset({
            width: size.width,
            height: size.height
          });
          var cameraComp = this.getComponent(Canvas);
          cameraComp.targetTexture = renderTex;
          sp.texture = renderTex;
          this.content.spriteFrame = sp;
        };

        _proto.onDestroy = function onDestroy() {
          if (this._renderTex) {
            this._renderTex.destroy();

            this._renderTex = null;
          }
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return RenderUIToSpriteFrame;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenDelay.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, tween, Vec3, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "d6bdf6xbXNOfayKGwLKR4B9", "TweenDelay", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var TweenDelay = exports('TweenDelay', (_dec = ccclass("TweenDelay"), _dec2 = menu("tween/TweenDelay"), _dec(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TweenDelay, _Component);

        function TweenDelay() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = TweenDelay.prototype;

        _proto.onLoad = function onLoad() {
          this.tweenDelay = tween(this.node) // 延迟 1s
          .delay(1).to(1, {
            scale: new Vec3(2, 2, 2)
          }) // 再延迟 1s
          .delay(1).to(1, {
            scale: new Vec3(3, 3, 3)
          });
        };

        _proto.onEnable = function onEnable() {
          this.tweenDelay.start();
        };

        _proto.onDisable = function onDisable() {
          this.tweenDelay.stop();
        };

        return TweenDelay;
      }(Component)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/progress.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, ProgressBar, Component;

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
      ProgressBar = module.ProgressBar;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "d99e6wmJJRKFLcXIDvt9F5V", "progress", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var progress = exports('progress', (_dec = ccclass("progress"), _dec2 = property({
        type: ProgressBar
      }), _dec3 = property({
        type: ProgressBar
      }), _dec4 = property({
        type: ProgressBar
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(progress, _Component);

        function progress() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "sprite", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ProgressBar", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "reProgressBar", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "timer", 0);

          return _this;
        }

        var _proto = progress.prototype;

        _proto.start = function start() {// Your initialization goes here.
        };

        _proto.pro = function pro(num) {
          this.sprite.getComponent(ProgressBar).progress = num;
          this.ProgressBar.getComponent(ProgressBar).progress = num;
          this.reProgressBar.getComponent(ProgressBar).progress = num;
        };

        _proto.update = function update(deltaTime) {
          this.timer += 0.1 * deltaTime;

          if (this.timer > 1) {
            this.timer = 0;
          }

          this.pro(this.timer);
        };

        return progress;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ProgressBar", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "reProgressBar", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoadDragonBones.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, dragonBones, loader, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      dragonBones = module.dragonBones;
      loader = module.loader;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "db25aaEuudOurDFcTFrx3Al", "LoadDragonBones", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var LoadDragonBones = exports('LoadDragonBones', (_dec = ccclass('LoadDragonBones'), _dec2 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LoadDragonBones, _Component);

        function LoadDragonBones() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "dragonBones", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = LoadDragonBones.prototype;

        _proto.start = function start() {// Your initialization goes here.
        };

        _proto.dynamicCreate = function dynamicCreate() {
          var _this2 = this;

          loader.loadRes('dragonBones/NewDragonTest', dragonBones.DragonBonesAsset, function (err, res) {
            if (err) {
              console.error(err);
              return;
            }

            _this2.dragonBones.dragonAsset = res;
            loader.loadRes('dragonBones/texture', dragonBones.DragonBonesAtlasAsset, function (err, res) {
              if (err) {
                console.error(err);
                return;
              }

              _this2.dragonBones.dragonAtlasAsset = res;
              _this2.dragonBones.armatureName = "armatureName";

              _this2.dragonBones.playAnimation('stand', 0);
            });
          });
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return LoadDragonBones;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "dragonBones", [_dec2], {
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

System.register("chunks:///_virtual/SpineCollider.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, PhysicsSystem2D, Contact2DType, EPhysics2DDrawFlags, Sprite, Color, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      PhysicsSystem2D = module.PhysicsSystem2D;
      Contact2DType = module.Contact2DType;
      EPhysics2DDrawFlags = module.EPhysics2DDrawFlags;
      Sprite = module.Sprite;
      Color = module.Color;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "dc74fi10upIPZ9ydQe0eazG", "SpineCollider", undefined);

      var ccclass = _decorator.ccclass;
      var SpineCollider = exports('SpineCollider', (_dec = ccclass('SpineCollider'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SpineCollider, _Component);

        function SpineCollider() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "touchingCountMap", new Map());

          _defineProperty(_assertThisInitialized(_this), "debugDrawFlags", 0);

          return _this;
        }

        var _proto = SpineCollider.prototype;

        _proto.start = function start() {
          // Your initialization goes here.
          PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
          this.debugDrawFlags = PhysicsSystem2D.instance.debugDrawFlags;
        };

        _proto.onEnable = function onEnable() {
          PhysicsSystem2D.instance.debugDrawFlags = this.debugDrawFlags | EPhysics2DDrawFlags.Shape;
        };

        _proto.onDisable = function onDisable() {
          PhysicsSystem2D.instance.debugDrawFlags = this.debugDrawFlags;
        };

        _proto.addContact = function addContact(c) {
          var count = this.touchingCountMap.get(c.node) || 0;
          this.touchingCountMap.set(c.node, ++count);
          var sprite = c.getComponent(Sprite);

          if (sprite) {
            sprite.color = Color.RED;
          }
        };

        _proto.removeContact = function removeContact(c) {
          var count = this.touchingCountMap.get(c.node) || 0;
          --count;

          if (count <= 0) {
            this.touchingCountMap["delete"](c.node);
            var sprite = c.getComponent(Sprite);

            if (sprite) {
              sprite.color = Color.WHITE;
            }
          } else {
            this.touchingCountMap.set(c.node, count);
          }
        };

        _proto.onBeginContact = function onBeginContact(a, b) {
          this.addContact(a);
          this.addContact(b);
        };

        _proto.onEndContact = function onEndContact(a, b) {
          this.removeContact(a);
          this.removeContact(b);
        };

        return SpineCollider;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/editbox-event.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Label, Component;

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
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "dc817Zk5fFIwL416ijXNkBW", "editbox-event", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          menu = _decorator.menu;
      var EditboxEvent = exports('EditboxEvent', (_dec = ccclass("EditboxEvent"), _dec2 = menu('UI/EditboxEvent'), _dec3 = property(Label), _dec(_class = _dec2(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EditboxEvent, _Component);

        function EditboxEvent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "showLabel", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_isReturn", false);

          return _this;
        }

        var _proto = EditboxEvent.prototype;

        _proto.start = function start() {// Your initialization goes here.
        };

        _proto.editBegan = function editBegan(event, custom) {
          this.showLabel.string = custom;
          this._isReturn = false;
        };

        _proto.editEnd = function editEnd(event, custom) {
          if (this._isReturn) {
            return;
          }

          this.showLabel.string = custom;
        };

        _proto.editReturn = function editReturn(event, custom) {
          this.showLabel.string = custom;
          this._isReturn = true;
        };

        _proto.editInputing = function editInputing(input, event, custom) {
          this.showLabel.string = custom + ": " + input;
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return EditboxEvent;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "showLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/rich-text-event.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, Vec3, instantiate, find, Label, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Vec3 = module.Vec3;
      instantiate = module.instantiate;
      find = module.find;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "dd8a3yRmjdPM68OsJes8h4E", "rich-text-event", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var RichTextEvent = exports('RichTextEvent', (_dec = ccclass('RichTextEvent'), _dec2 = property(Prefab), _dec3 = property(Vec3), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RichTextEvent, _Component);

        function RichTextEvent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "templateTips", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "position", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = RichTextEvent.prototype;

        _proto.onClick = function onClick(event, param) {
          var node = instantiate(this.templateTips);
          node.position = this.position;
          node.parent = find('Canvas');
          var label = node.getComponent(Label);
          label.string = 'Duang Duang';
        };

        return RichTextEvent;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "templateTips", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "position", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CullingTestInfo.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, _defineProperty, _assertThisInitialized, cclegacy, _decorator, director, Label, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "e8e3eja+elEoatyfXsCtgKY", "CullingTestInfo", undefined);

      var ccclass = _decorator.ccclass;
      var CullingTestInfo = exports('CullingTestInfo', (_dec = ccclass("CullingTestInfo"), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CullingTestInfo, _Component);

        function CullingTestInfo() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_label", null);

          _defineProperty(_assertThisInitialized(_this), "_states", []);

          _defineProperty(_assertThisInitialized(_this), "_oldFns", []);

          return _this;
        }

        var _proto = CullingTestInfo.prototype;

        _proto.start = function start() {
          var _this2 = this;

          var models = director.getScene().renderScene.models;

          var _loop = function _loop(i) {
            var model = models[i];
            var oldFn = _this2._oldFns[i] = model.updateUBOs.bind(model);

            model.updateUBOs = function () {
              _this2._states[i].visible = true;
              return oldFn(arguments.length > 0 ? arguments.length <= 0 ? undefined : arguments[0] : 0);
            };

            _this2._states.push({
              model: model,
              visible: false
            });
          };

          for (var i = 0; i < models.length; i++) {
            _loop(i);
          }

          this._label = this.node.getComponent(Label);
        };

        _proto.update = function update() {
          var info = '';

          for (var i = 0; i < this._states.length; i++) {
            var state = this._states[i];

            if (state.visible) {
              info += state.model.node.name + '\n';
              state.visible = false;
            }
          }

          this._label.string = info;
        };

        _proto.onDestroy = function onDestroy() {
          for (var i = 0; i < this._states.length; i++) {
            var model = this._states[i].model;
            model.updateUBOs = this._oldFns[i];
          }
        };

        return CullingTestInfo;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/asset-bundle.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Label, Node, assetManager, log, Texture2D, Layers, Sprite, SpriteFrame, AudioClip, AudioSource, director, Component;

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
      Node = module.Node;
      assetManager = module.assetManager;
      log = module.log;
      Texture2D = module.Texture2D;
      Layers = module.Layers;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
      AudioClip = module.AudioClip;
      AudioSource = module.AudioSource;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "ec39dDiCpxNyrqH9XbtLdcb", "asset-bundle", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AssetBundle = exports('AssetBundle', (_dec = ccclass('AssetBundle'), _dec2 = property(Label), _dec3 = property(Node), _dec4 = property({
        type: [Label]
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AssetBundle, _Component);

        function AssetBundle() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "loadTips", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "showWindow", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "labels", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_audioSource", null);

          _defineProperty(_assertThisInitialized(_this), "_isLoading", false);

          return _this;
        }

        var _proto = AssetBundle.prototype; // LIFE-CYCLE CALLBACKS:

        _proto.onLoad = function onLoad() {
          var testBundle = assetManager.getBundle('TestBundle');

          if (testBundle) {
            this.labels[0].string = "已加载";
          }
        };

        _proto.onClickBundle = function onClickBundle() {
          var _this2 = this;

          var testBundle = assetManager.getBundle('TestBundle');

          if (testBundle || this._isLoading) {
            return;
          }

          this._onClear();

          this._isLoading = true;
          this.loadTips.string = "Bundle Loading....";
          assetManager.loadBundle('TestBundle', function (err) {
            if (err) {
              log('Error url [' + err + ']');
              return;
            }

            _this2._isLoading = false;
            _this2.loadTips.string = "Bundle loaded Successfully!";
            _this2.labels[0].string = "已加载";
          });
        };

        _proto.onClickTexture = function onClickTexture() {
          var _this3 = this;

          if (this._isLoading) return;
          var testBundle = assetManager.getBundle('TestBundle');

          if (!testBundle) {
            this.loadTips.string = "操作失败，请先加载 Asset Bundle";
            return;
          }

          this._onClear();

          this._isLoading = true;
          this.loadTips.string = "Texture Loading....";
          testBundle.load("gold/texture", Texture2D, function (err, asset) {
            if (err) {
              log('Error url [' + err + ']');
              return;
            }

            _this3._isLoading = false;
            _this3.loadTips.string = "";
            var node = new Node("New Node");
            node.layer = Layers.Enum.UI_2D;
            node.setPosition(0, 0);
            var component = node.addComponent(Sprite);
            var sp = new SpriteFrame();
            sp.texture = asset;
            component.spriteFrame = sp;
            _this3.labels[1].string = "已加载";

            _this3.showWindow.addChild(node);
          });
        };

        _proto.onClickAudio = function onClickAudio() {
          var _this4 = this;

          if (this._isLoading) return;
          var testBundle = assetManager.getBundle('TestBundle');

          if (!testBundle) {
            this.loadTips.string = "操作失败，请先加载 Asset Bundle";
            return;
          }

          this._onClear();

          this._isLoading = true;
          this.loadTips.string = "Audio Loading....";
          testBundle.load("ss", AudioClip, function (err, asset) {
            if (err) {
              log('Error url [' + err + ']');
              return;
            }

            _this4._isLoading = false;
            _this4.loadTips.string = "";
            var node = new Node("New Node");
            node.layer = Layers.Enum.UI_2D;
            node.setPosition(0, 0);
            var component = node.addComponent(AudioSource);
            component.clip = asset;
            component.play();
            _this4._audioSource = component;
            _this4.loadTips.string = "播放音乐";
            _this4.labels[2].string = "已加载";

            _this4.showWindow.addChild(node);
          });
        };

        _proto.onClickScene = function onClickScene() {
          var _this5 = this;

          if (this._isLoading) return;
          var testBundle = assetManager.getBundle('TestBundle');

          if (!testBundle) {
            this.loadTips.string = "操作失败，请先加载 Asset Bundle";
            return;
          }

          this._onClear();

          this._isLoading = true;
          this.loadTips.string = "Scene Loading....";
          testBundle.loadScene("sub-scene", function (err, asset) {
            if (err) {
              log('Error url [' + err + ']');
              return;
            }

            _this5._isLoading = false;
            _this5.loadTips.string = "";
            director.runScene(asset);
          });
        };

        _proto.onClickDestroy = function onClickDestroy() {
          if (this._isLoading) return;
          var testBundle = assetManager.getBundle('TestBundle');

          if (!testBundle) {
            this.loadTips.string = "操作失败，请先加载 Asset Bundle";
            return;
          }

          this._onClear();

          assetManager.removeBundle(testBundle);
          this.loadTips.string = "分包已被销毁";
          this.labels[0].string = "加载 Asset Bundle";
          this.labels[1].string = "加载 Texture";
          this.labels[2].string = "加载 Audio";
          this.labels[3].string = "加载 Scene";
        };

        _proto.onClickRelease = function onClickRelease() {
          if (this._isLoading) return;
          var testBundle = assetManager.getBundle('TestBundle');

          if (!testBundle) {
            this.loadTips.string = "操作失败，请先加载 Asset Bundle";
            return;
          }

          this._onClear();

          testBundle.releaseAll();
          this.loadTips.string = "资源已被释放";
          this.labels[1].string = "加载 Texture";
          this.labels[2].string = "加载 Audio";
          this.labels[3].string = "加载 Scene";
        };

        _proto._onClear = function _onClear() {
          this.showWindow.removeAllChildren();

          if (this._audioSource && this._audioSource instanceof AudioSource) {
            this._audioSource.stop();
          }
        };

        return AssetBundle;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "loadTips", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "showWindow", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "labels", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RaycastCanvasTest.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Canvas, Label, geometry, systemEvent, SystemEventType, UITransform, Component;

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
      Canvas = module.Canvas;
      Label = module.Label;
      geometry = module.geometry;
      systemEvent = module.systemEvent;
      SystemEventType = module.SystemEventType;
      UITransform = module.UITransform;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "ef1feyKBBBGoLo0Surp/QQK", "RaycastCanvasTest", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var RaycastCanvasTest = exports('RaycastCanvasTest', (_dec = ccclass("RaycastCanvasTest"), _dec2 = property({
        type: Canvas
      }), _dec3 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RaycastCanvasTest, _Component);

        function RaycastCanvasTest() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "canvas", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "label", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_ray", new geometry.Ray());

          _defineProperty(_assertThisInitialized(_this), "_aabb", new geometry.AABB());

          return _this;
        }

        var _proto = RaycastCanvasTest.prototype;

        _proto.onEnable = function onEnable() {
          this.label.string = '点击文字测试射线检测';
          systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
        };

        _proto.onDisable = function onDisable() {
          systemEvent.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
        };

        _proto.onTouchStart = function onTouchStart(touch, event) {
          this.label.string = '点击文字测试射线检测';
          var uiCamera = this.canvas.camera;
          var point = touch.getLocation();
          uiCamera.screenPointToRay(this._ray, point.x, point.y);
          var uiTrans = this.label.getComponent(UITransform);
          uiTrans.getComputeAABB(this._aabb);

          if (geometry.intersect.rayAABB(this._ray, this._aabb)) {
            this.label.string = '检测成功';
          }
        };

        return RaycastCanvasTest;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "canvas", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DragonBonesAttach.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, dragonBones, Prefab, Label, Color, instantiate, Sprite, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      dragonBones = module.dragonBones;
      Prefab = module.Prefab;
      Label = module.Label;
      Color = module.Color;
      instantiate = module.instantiate;
      Sprite = module.Sprite;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class2, _class3, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

      cclegacy._RF.push({}, "f0494pzVKJIkrGKPQXf09Qb", "DragonBonesAttach", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;

      var _class = exports('default', (_dec = ccclass('DragonBonesAttach'), _dec2 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec3 = property({
        type: Prefab
      }), _dec4 = property({
        type: Label
      }), _dec(_class2 = (_class3 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(_class3, _Component);

        function _class3() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "skeleton", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "targetPrefab", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "modeLabel", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "redBoneName", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "greenBoneName", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "blueBoneName", _descriptor6, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = _class3.prototype;

        _proto.generateAllNodes = function generateAllNodes() {
          this.destroyAllNodes();
          var red = this.createSocket(this.redBoneName, new Color(255, 0, 0));
          var green = this.createSocket(this.greenBoneName, new Color(0, 255, 0));
          var blue = this.createSocket(this.blueBoneName, new Color(0, 0, 255));
          this.skeleton.sockets = [red, green, blue];
        };

        _proto.destroyUnusual = function destroyUnusual() {
          this.destroyAllNodes();
        };

        _proto.destroyAllNodes = function destroyAllNodes() {
          var sockets = this.skeleton.sockets;

          for (var _iterator = _createForOfIteratorHelperLoose(sockets), _step; !(_step = _iterator()).done;) {
            var s = _step.value;
            s.target.removeFromParent();
          }

          this.skeleton.sockets = [];
        };

        _proto.generateSomeNodes = function generateSomeNodes() {
          var _this2 = this;

          var sockets = this.skeleton.sockets;
          var greens = sockets.filter(function (x) {
            var _x$target;

            return ((_x$target = x.target) === null || _x$target === void 0 ? void 0 : _x$target.name) == _this2.greenBoneName;
          });

          if (greens.length === 0) {
            var green = this.createSocket(this.greenBoneName, new Color(0, 255, 0));
            sockets.push(green);
            this.skeleton.sockets = sockets;
          }
        };

        _proto.destroySomeNodes = function destroySomeNodes() {
          var sockets = this.skeleton.sockets;

          for (var l = sockets.length - 1; l >= 0; l--) {
            if (sockets[l].target.name === this.greenBoneName) {
              var s = sockets.splice(l, 1);
              s[0].target.removeFromParent();
              this.skeleton.sockets = sockets;
              break;
            }
          }
        };

        _proto.changeMode = function changeMode() {
          var isCached = this.skeleton.isAnimationCached();

          if (isCached) {
            this.skeleton.setAnimationCacheMode(dragonBones.ArmatureDisplay.AnimationCacheMode.REALTIME);
            this.modeLabel.string = "cache";
          } else {
            this.skeleton.setAnimationCacheMode(dragonBones.ArmatureDisplay.AnimationCacheMode.SHARED_CACHE);
            this.modeLabel.string = "realtime";
          }
        };

        _proto.createSocket = function createSocket(name, color) {
          var dbNode = new dragonBones.DragonBoneSocket();
          dbNode.path = this.skeleton.querySocketPathByName(name)[0];
          var child = dbNode.target = instantiate(this.targetPrefab);
          child.parent = this.node;
          child.name = name;
          var sp = child.getComponent(Sprite);
          sp.color = color;
          return dbNode;
        };

        return _class3;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class3.prototype, "skeleton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class3.prototype, "targetPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class3.prototype, "modeLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class3.prototype, "redBoneName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "toujiaoR";
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class3.prototype, "greenBoneName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "shouL";
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class3.prototype, "blueBoneName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "bone24";
        }
      })), _class3)) || _class2));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ByteCodeCache.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f0c346Uy2hLS7HWIBLGbqsJ", "ByteCodeCache", undefined);

      var LastTimeResult = exports('LastTimeResult', {
        done: false,
        message: ''
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/tips-ctrl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "f0d55ZA5HNAO4T4xzVj2DVW", "tips-ctrl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var TipsCtrl = exports('TipsCtrl', (_dec = ccclass('TipsCtrl'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TipsCtrl, _Component);

        function TipsCtrl() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = TipsCtrl.prototype;

        _proto.onFinish = function onFinish() {
          this.node.destroy();
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        return TipsCtrl;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioController.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AudioClip, AudioSource, Label, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioClip = module.AudioClip;
      AudioSource = module.AudioSource;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "f2021d/1FdLjaJsU4R5oYSM", "AudioController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AudioController = exports('AudioController', (_dec = ccclass("AudioController"), _dec2 = property({
        type: [AudioClip]
      }), _dec3 = property({
        type: AudioSource
      }), _dec4 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AudioController, _Component);

        function AudioController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "clips", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "audioSource", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nameLabel", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = AudioController.prototype;

        _proto.start = function start() {// Your initialization goes here.
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }
        ;

        _proto.onButtonClicked = function onButtonClicked(event, index) {
          var clip = this.clips[index];
          this.nameLabel.string = clip.name;
          this.audioSource.playOneShot(clip);
        };

        _proto.onVolumeSliderChanged = function onVolumeSliderChanged(eventTarget) {
          this.audioSource.volume = eventTarget.progress;
        };

        return AudioController;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "clips", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "audioSource", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nameLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/puzzle.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _defineProperty, _assertThisInitialized, _initializerDefineProperty, cclegacy, _decorator, ccenum, Node, Vec2, systemEvent, SystemEventType, Vec3, macro, view, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ccenum = module.ccenum;
      Node = module.Node;
      Vec2 = module.Vec2;
      systemEvent = module.systemEvent;
      SystemEventType = module.SystemEventType;
      Vec3 = module.Vec3;
      macro = module.macro;
      view = module.view;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

      cclegacy._RF.push({}, "fbbb4nzS11HVI7P0lFdPl+g", "puzzle", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MoveDirection;

      (function (MoveDirection) {
        MoveDirection[MoveDirection["NONE"] = 0] = "NONE";
        MoveDirection[MoveDirection["UP"] = 1] = "UP";
        MoveDirection[MoveDirection["DOWN"] = 2] = "DOWN";
        MoveDirection[MoveDirection["LEFT"] = 3] = "LEFT";
        MoveDirection[MoveDirection["RIGHT"] = 4] = "RIGHT";
      })(MoveDirection || (MoveDirection = {}));

      var minTilesCount = 2;
      var mapMoveStep = 1;
      var minMoveValue = 50;
      ccenum(MoveDirection);
      var Puzzle = exports('Puzzle', (_dec = ccclass('Puzzle'), _dec2 = property({
        type: Node
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Puzzle, _Component);

        function Puzzle() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_touchStartPos", new Vec2());

          _defineProperty(_assertThisInitialized(_this), "_isMapLoaded", false);

          _initializerDefineProperty(_assertThisInitialized(_this), "floorLayerName", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "barrierLayerName", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "objectGroupName", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "startObjectName", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "successObjectName", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "player", _descriptor6, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_touching", false);

          _defineProperty(_assertThisInitialized(_this), "_succeedLayer", null);

          _defineProperty(_assertThisInitialized(_this), "_curTile", new Vec2());

          _defineProperty(_assertThisInitialized(_this), "_startTile", new Vec2());

          _defineProperty(_assertThisInitialized(_this), "_endTile", new Vec2());

          _defineProperty(_assertThisInitialized(_this), "_tiledMap", null);

          _defineProperty(_assertThisInitialized(_this), "_layerFloor", null);

          _defineProperty(_assertThisInitialized(_this), "_layerBarrier", null);

          return _this;
        }

        var _proto = Puzzle.prototype;

        _proto.onLoad = function onLoad() {
          var _this2 = this;

          if (!this._isMapLoaded) {
            this.player.active = false;
          }

          systemEvent.on(SystemEventType.KEY_UP, this._onKeyPressed, this);
          this.node.on(SystemEventType.TOUCH_START, function (touch, event) {
            _this2._touching = true;

            _this2._touchStartPos.set(touch.getLocation());
          });
          this.node.on(SystemEventType.TOUCH_END, function (touch, event) {
            if (!_this2._touching || !_this2._isMapLoaded || _this2._succeedLayer.active) return;
            _this2._touching = false;
            var touchPos = touch.getLocation();
            var movedX = touchPos.x - _this2._touchStartPos.x;
            var movedY = touchPos.y - _this2._touchStartPos.y;
            var movedXValue = Math.abs(movedX);
            var movedYValue = Math.abs(movedY);

            if (movedXValue < minMoveValue && movedYValue < minMoveValue) {
              // touch moved not enough
              return;
            }

            var tp = _this2._curTile;
            var newTile = new Vec2(tp.x, tp.y);
            var mapMoveDir = MoveDirection.NONE;

            if (movedXValue >= movedYValue) {
              // move to right or left
              if (movedX > 0) {
                newTile.x += 1;
                mapMoveDir = MoveDirection.LEFT;
              } else {
                newTile.x -= 1;
                mapMoveDir = MoveDirection.RIGHT;
              }
            } else {
              // move to up or down
              if (movedY > 0) {
                newTile.y -= 1;
                mapMoveDir = MoveDirection.DOWN;
              } else {
                newTile.y += 1;
                mapMoveDir = MoveDirection.UP;
              }
            }

            _this2._tryMoveToNewTile(newTile, mapMoveDir);
          });
        };

        _proto.onDestroy = function onDestroy() {
          systemEvent.off(SystemEventType.KEY_UP, this._onKeyPressed, this);
        };

        _proto.restartGame = function restartGame() {
          this._succeedLayer.active = false;

          this._curTile.set(this._startTile);

          this._updatePlayerPos();

          this._initMapPos();
        };

        _proto.start = function start() {
          // init the map position
          this._initMapPos(); // init the succeed layer


          this._succeedLayer = this.node.getParent().getChildByName('succeedLayer');
          this._succeedLayer.active = false; // init the player position

          this._tiledMap = this.node.getComponent('cc.TiledMap');

          var objectGroup = this._tiledMap.getObjectGroup(this.objectGroupName);

          if (!objectGroup) return;
          var startObj = objectGroup.getObject(this.startObjectName);
          var endObj = objectGroup.getObject(this.successObjectName);
          if (!startObj || !endObj) return;
          var startPos = new Vec2(startObj.x, startObj.y);
          var endPos = new Vec2(endObj.x, endObj.y);
          this._layerFloor = this._tiledMap.getLayer(this.floorLayerName);
          this._layerBarrier = this._tiledMap.getLayer(this.barrierLayerName);
          if (!this._layerFloor || !this._layerBarrier) return;
          this._curTile = this._startTile = this._getTilePos(startPos);
          this._endTile = this._getTilePos(endPos);

          if (this.player) {
            this._updatePlayerPos();

            this.player.active = true;
          }

          this._isMapLoaded = true;
        };

        _proto._initMapPos = function _initMapPos() {
          this.node.setPosition(0, 0);
        };

        _proto._updatePlayerPos = function _updatePlayerPos() {
          var pos = this._layerFloor.getPositionAt(this._curTile);

          this.player.setPosition(new Vec3(pos.x, pos.y, 0));
        };

        _proto._getTilePos = function _getTilePos(posInPixel) {
          var mapSize = this.node._uiProps.uiTransformComp.contentSize;

          var tileSize = this._tiledMap.getTileSize();

          var x = Math.floor(posInPixel.x / tileSize.width);
          var y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);
          return new Vec2(x, y);
        };

        _proto._onKeyPressed = function _onKeyPressed(event) {
          if (!this._isMapLoaded || this._succeedLayer.active) return;
          var newTile = new Vec2(this._curTile.x, this._curTile.y);
          var mapMoveDir = MoveDirection.NONE;

          switch (event.keyCode) {
            case macro.KEY.up:
              newTile.y -= 1;
              mapMoveDir = MoveDirection.DOWN;
              break;

            case macro.KEY.down:
              newTile.y += 1;
              mapMoveDir = MoveDirection.UP;
              break;

            case macro.KEY.left:
              newTile.x -= 1;
              mapMoveDir = MoveDirection.RIGHT;
              break;

            case macro.KEY.right:
              newTile.x += 1;
              mapMoveDir = MoveDirection.LEFT;
              break;

            default:
              return;
          }

          this._tryMoveToNewTile(newTile, mapMoveDir);
        };

        _proto._tryMoveToNewTile = function _tryMoveToNewTile(newTile, mapMoveDir) {
          var mapSize = this._tiledMap.getMapSize();

          if (newTile.x < 0 || newTile.x >= mapSize.width) return;
          if (newTile.y < 0 || newTile.y >= mapSize.height) return;

          if (this._layerBarrier.getTileGIDAt(newTile.x, newTile.y)) {
            console.log('This way is blocked!');
            return false;
          } // update the player position


          this._curTile = newTile;

          this._updatePlayerPos(); // move the map if necessary


          this._tryMoveMap(mapMoveDir); // check the player is success or not


          if (this._curTile.equals(this._endTile)) {
            console.log('succeed');
            this._succeedLayer.active = true;
          }
        };

        _proto._tryMoveMap = function _tryMoveMap(moveDir) {
          // get necessary data
          var mapContentSize = this.node._uiProps.uiTransformComp.contentSize;
          var mapPos = this.node.getPosition();
          var playerPos = this.player.getPosition();
          var viewSize = view.getVisibleSize();

          var tileSize = this._tiledMap.getTileSize();

          var minDisX = minTilesCount * tileSize.width;
          var minDisY = minTilesCount * tileSize.height;
          var disX = playerPos.x + mapPos.x;
          var disY = playerPos.y + mapPos.y;
          var newPos;

          switch (moveDir) {
            case MoveDirection.UP:
              if (disY < minDisY) {
                newPos = new Vec2(mapPos.x, mapPos.y + tileSize.height * mapMoveStep);
              }

              break;

            case MoveDirection.DOWN:
              if (viewSize.height - disY - tileSize.height < minDisY) {
                newPos = new Vec2(mapPos.x, mapPos.y - tileSize.height * mapMoveStep);
              }

              break;

            case MoveDirection.LEFT:
              if (viewSize.width - disX - tileSize.width < minDisX) {
                newPos = new Vec2(mapPos.x - tileSize.width * mapMoveStep, mapPos.y);
              }

              break;

            case MoveDirection.RIGHT:
              if (disX < minDisX) {
                newPos = new Vec2(mapPos.x + tileSize.width * mapMoveStep, mapPos.y);
              }

              break;

            default:
              return;
          }

          var vsize = view.getVisibleSize();
          var voffset = view.getVisibleOrigin();

          if (newPos) {
            // calculate the position range of map
            var minX = viewSize.width - mapContentSize.width - voffset.x;
            var maxX = voffset.x;
            var minY = viewSize.height - mapContentSize.height - voffset.y;
            var maxY = voffset.y;
            if (newPos.x < minX) newPos.x = minX;
            if (newPos.x > maxX) newPos.x = maxX;
            if (newPos.y < minY) newPos.y = minY;
            if (newPos.y > maxY) newPos.y = maxY;

            if (newPos.x != mapPos.x || newPos.y != mapPos.y) {
              console.log('Move the map to new position: ', newPos);
              this.node.setPosition(newPos.x, newPos.y);
            }
          }
        };

        return Puzzle;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "floorLayerName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'floor';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "barrierLayerName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'barrier';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "objectGroupName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'players';
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "startObjectName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'SpawnPoint';
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "successObjectName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'SuccessPoint';
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "player", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoadResDir_example.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Node, Prefab, ScrollView, UITransform, instantiate, Label, loader, JsonAsset, js, SpriteFrame, Component;

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
      Node = module.Node;
      Prefab = module.Prefab;
      ScrollView = module.ScrollView;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      loader = module.loader;
      JsonAsset = module.JsonAsset;
      js = module.js;
      SpriteFrame = module.SpriteFrame;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "fbf7dF/vuxDcKIaWPb56M3y", "LoadResDir_example", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var builtInEffectList = ['711ebe11-f673-4cd9-9a83-63c60ba54c5b', '971bdb23-3ff6-43eb-b422-1c30165a3663', '17debcc3-0a6b-4b8a-b00b-dc58b885581e', 'd1346436-ac96-4271-b863-1f4fdead95b0', '60f7195c-ec2a-45eb-ba94-8955f60e81d0', '1baf0fc9-befa-459c-8bdd-af1a450a0319', '1d08ef62-a503-4ce2-8b9a-46c90873f7d3', 'a7612b54-35e3-4238-a1a9-4a7b54635839', 'a3cd009f-0ab0-420d-9278-b9fdab939bbc'];
      var LoadResDirExample = exports('LoadResDirExample', (_dec = ccclass("LoadResDirExample"), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Prefab
      }), _dec4 = property({
        type: ScrollView
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LoadResDirExample, _Component);

        function LoadResDirExample() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "btnClearAll", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "label", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "scrollView", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_assets", []);

          _defineProperty(_assertThisInitialized(_this), "_hasLoading", false);

          return _this;
        }

        var _proto = LoadResDirExample.prototype;

        _proto._init = function _init() {
          var uiTrans = this.scrollView.content.getComponent(UITransform);
          uiTrans.height = 0;
          this.btnClearAll.active = false;
        };

        _proto.onLoad = function onLoad() {
          this._init();
        };

        _proto._createLabel = function _createLabel(text) {
          var node = instantiate(this.label);
          var label = node.getComponent(Label);
          label.string = text;
          this.scrollView.content.addChild(node);
        };

        _proto._clear = function _clear() {
          this.scrollView.content.removeAllChildren();

          for (var i = 0; i < this._assets.length; ++i) {
            var asset = this._assets[i]; // 需要释放所有资源依赖

            var deps = loader.getDependsRecursively(asset);

            this._removeBuiltInEffect(deps);

            loader.release(deps);
          }

          this._assets = [];
        };

        _proto._removeBuiltInEffect = function _removeBuiltInEffect(deps) {
          var cache = [];

          for (var i = 0; i < deps.length; i++) {
            for (var j = 0; j < builtInEffectList.length; j++) {
              if (deps[i].includes(builtInEffectList[j])) {
                cache.push(i);
              }
            }
          }

          for (var k = 0; k < cache.length; k++) {
            delete deps[cache[k]];
          }

          cache = [];
        };

        _proto.onClearAll = function onClearAll() {
          var uiTrans = this.scrollView.content.getComponent(UITransform);
          uiTrans.height = 0;
          this.btnClearAll.active = false;

          this._clear();
        };

        _proto.onLoadAll = function onLoadAll() {
          var _this2 = this;

          if (this._hasLoading) {
            return;
          }

          this._hasLoading = true;

          this._clear();

          this._createLabel("Load All Assets");

          this.scrollView.scrollToTop();
          this.btnClearAll.active = false; // 防止加载的过程中清除资源

          loader.loadResDir("test_assets", function (err, assets) {
            if (!_this2.isValid && err) {
              return;
            }

            _this2._assets = assets;

            for (var i = 0; i < assets.length; ++i) {
              var asset = assets[i];
              var info = asset.toString();

              if (!info) {
                if (asset instanceof JsonAsset) {
                  info = JSON.stringify(asset.json, null, 4);
                } else {
                  info = info || asset.name || js.getClassName(asset);
                }
              }

              _this2._createLabel(info);
            }

            _this2._hasLoading = false;
            _this2.btnClearAll.active = true;
          });
        };

        _proto.onLoadSpriteFrameAll = function onLoadSpriteFrameAll() {
          var _this3 = this;

          if (this._hasLoading) {
            return;
          }

          this._hasLoading = true;

          this._clear();

          this._createLabel("Load All Sprite Frame");

          this.scrollView.scrollToTop();
          this.btnClearAll.active = false; // 防止加载的过程中清除资源

          loader.loadResDir("test_assets", SpriteFrame, function (err, assets) {
            if (!_this3.isValid) {
              return;
            }

            _this3._assets = assets;

            for (var i = 0; i < assets.length; ++i) {
              var asset = assets[i];

              _this3._createLabel(asset.name);
            }

            _this3._hasLoading = false;
            _this3.btnClearAll.active = true;
          });
        };

        return LoadResDirExample;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnClearAll", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./scenelist.ts', './Client.ts', './Utils.ts', './TestFramework.ts', './backbutton.ts', './graphics-continuous-filling.ts', './use-render-texture-asset.ts', './pauseButton.ts', './static-batcher.ts', './slider-ctrl.ts', './changeUniform.ts', './IntersectRayTest.ts', './coordinate-ui-local-local.ts', './asset-bundle-zip.ts', './ModelTest.ts', './DragonBonesCollider.ts', './page-view-ctrl.ts', './particle-normal.ts', './graphics-line-join.ts', './graphics-draw-before-init.ts', './DragonBonesMode.ts', './SpineAttach.ts', './pause.ts', './motion-streak-ctrl.ts', './DragonBonesCtrl.ts', './PreloadAssets.ts', './use-render-texture-to-model.ts', './rotate.ts', './TweenClone.ts', './RaycastModelTest.ts', './tiled.ts', './NetworkCtrl.ts', './ui-log.ts', './AsyncFunctionsTest.ts', './batch-tester.ts', './loadSubPack.ts', './TransformController.ts', './migrate-canvas.ts', './system-event-PC.ts', './RaycastColliderTest.ts', './mask-use-image-stencil.ts', './label-model-component.ts', './shield-node.ts', './render-ui-to-model.ts', './SpineSkin.ts', './sport_light_2.ts', './static-ui.ts', './TweenThen.ts', './acceleration-event.ts', './first-person-camera.ts', './fill-sprite.ts', './visibility-changed.ts', './LoadRes_example.ts', './list-view-ctrl.ts', './MorphController.ts', './listitem.ts', './TweenStop.ts', './SpineMeshEffect.ts', './scroll-view-events.ts', './trimmed.ts', './node-move.ts', './TweenRepeat2.ts', './SpineBoyCtrl.ts', './release-depend-asset.ts', './extension-detection.ts', './TweenShowHide.ts', './TweenParallel.ts', './rotate-around-axis.ts', './mask-inverted-event.ts', './TweenRepeat.ts', './tween-test.ts', './click-change-size.ts', './MultiTouchCtrl.ts', './coordinate-ui-3d.ts', './dynamic-tiled-map.ts', './MaterialTextureAnimation.ts', './sport_light_1.ts', './click-event.ts', './webview-ctrl.ts', './UniformKTest.ts', './ByteCodeCache.ts', './ByteCodeLoader.ts', './TweenCustomProgress.ts', './SwitchAnimation.ts', './ReplaceSlotDisplay.ts', './render-camera-to-model.ts', './particle-sprite-change.ts', './video-player-ctrl.ts', './node-event.ts', './use-render-texture-to-sprite.ts', './gold.ts', './layout-change-order.ts', './event-first.ts', './editbox-ctrl.ts', './material-test.ts', './system-event.ts', './sphere_light.ts', './click-and-listener.ts', './Test.ts', './particle-custom-change.ts', './BuildTimeConstantsTest.ts', './TweenRepeatForever.ts', './wire-frame.ts', './AssetLoading.ts', './event-info.ts', './change-graphics.ts', './toggle-ctrl.ts', './AnimationEventTesting.ts', './capture_to_web.ts', './ShowTips.ts', './LoadSpine.ts', './toggle-event-ctrl.ts', './graphics-mask.ts', './CameraController.ts', './widget-preformance.ts', './widget-destroy.ts', './loadSubPackages.ts', './TweenActionCallBack.ts', './CoreJsTest.ts', './ButtonEventCapture.ts', './TweenRemoveSelf.ts', './instanced-color.ts', './deprecated-testing.ts', './testJsList.ts', './render-ui-to-spriteframe.ts', './TweenDelay.ts', './progress.ts', './LoadDragonBones.ts', './SpineCollider.ts', './editbox-event.ts', './rich-text-event.ts', './CullingTestInfo.ts', './asset-bundle.ts', './RaycastCanvasTest.ts', './DragonBonesAttach.ts', './tips-ctrl.ts', './AudioController.ts', './puzzle.ts', './LoadResDir_example.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
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