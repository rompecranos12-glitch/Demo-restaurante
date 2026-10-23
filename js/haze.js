/* @ds-bundle: {"format":4,"namespace":"Haze","components":[{"name":"Logo"},{"name":"Splash"},{"name":"Plate"},{"name":"DishRow"},{"name":"DishFeature"},{"name":"DishSheet"},{"name":"Pairing"},{"name":"Story"},{"name":"TastingMenu"},{"name":"CartPanel"},{"name":"ServiceDock"},{"name":"Bill"},{"name":"Thanks"},{"name":"KitchenBoard"},{"name":"TableBoard"},{"name":"AdminReports"},{"name":"DishEditor"},{"name":"QRSheet"},{"name":"FeedbackInbox"},{"name":"AdminUsers"},{"name":"CartaCliente"},{"name":"TenantThemes"}]} */
var Haze = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../src/shims/react.js
  var require_react = __commonJS({
    "../src/shims/react.js"(exports, module) {
      module.exports = window.React;
    }
  });

  // ../src/node_modules/qrcode-generator/qrcode.js
  var require_qrcode = __commonJS({
    "../src/node_modules/qrcode-generator/qrcode.js"(exports, module) {
      var qrcode2 = (function() {
        var qrcode3 = function(typeNumber, errorCorrectionLevel) {
          var PAD0 = 236;
          var PAD1 = 17;
          var _typeNumber = typeNumber;
          var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
          var _modules = null;
          var _moduleCount = 0;
          var _dataCache = null;
          var _dataList = [];
          var _this = {};
          var makeImpl = function(test, maskPattern) {
            _moduleCount = _typeNumber * 4 + 17;
            _modules = (function(moduleCount) {
              var modules = new Array(moduleCount);
              for (var row = 0; row < moduleCount; row += 1) {
                modules[row] = new Array(moduleCount);
                for (var col = 0; col < moduleCount; col += 1) {
                  modules[row][col] = null;
                }
              }
              return modules;
            })(_moduleCount);
            setupPositionProbePattern(0, 0);
            setupPositionProbePattern(_moduleCount - 7, 0);
            setupPositionProbePattern(0, _moduleCount - 7);
            setupPositionAdjustPattern();
            setupTimingPattern();
            setupTypeInfo(test, maskPattern);
            if (_typeNumber >= 7) {
              setupTypeNumber(test);
            }
            if (_dataCache == null) {
              _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
            }
            mapData(_dataCache, maskPattern);
          };
          var setupPositionProbePattern = function(row, col) {
            for (var r = -1; r <= 7; r += 1) {
              if (row + r <= -1 || _moduleCount <= row + r) continue;
              for (var c = -1; c <= 7; c += 1) {
                if (col + c <= -1 || _moduleCount <= col + c) continue;
                if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
                  _modules[row + r][col + c] = true;
                } else {
                  _modules[row + r][col + c] = false;
                }
              }
            }
          };
          var getBestMaskPattern = function() {
            var minLostPoint = 0;
            var pattern = 0;
            for (var i = 0; i < 8; i += 1) {
              makeImpl(true, i);
              var lostPoint = QRUtil.getLostPoint(_this);
              if (i == 0 || minLostPoint > lostPoint) {
                minLostPoint = lostPoint;
                pattern = i;
              }
            }
            return pattern;
          };
          var setupTimingPattern = function() {
            for (var r = 8; r < _moduleCount - 8; r += 1) {
              if (_modules[r][6] != null) {
                continue;
              }
              _modules[r][6] = r % 2 == 0;
            }
            for (var c = 8; c < _moduleCount - 8; c += 1) {
              if (_modules[6][c] != null) {
                continue;
              }
              _modules[6][c] = c % 2 == 0;
            }
          };
          var setupPositionAdjustPattern = function() {
            var pos = QRUtil.getPatternPosition(_typeNumber);
            for (var i = 0; i < pos.length; i += 1) {
              for (var j = 0; j < pos.length; j += 1) {
                var row = pos[i];
                var col = pos[j];
                if (_modules[row][col] != null) {
                  continue;
                }
                for (var r = -2; r <= 2; r += 1) {
                  for (var c = -2; c <= 2; c += 1) {
                    if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                      _modules[row + r][col + c] = true;
                    } else {
                      _modules[row + r][col + c] = false;
                    }
                  }
                }
              }
            }
          };
          var setupTypeNumber = function(test) {
            var bits = QRUtil.getBCHTypeNumber(_typeNumber);
            for (var i = 0; i < 18; i += 1) {
              var mod = !test && (bits >> i & 1) == 1;
              _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
            }
            for (var i = 0; i < 18; i += 1) {
              var mod = !test && (bits >> i & 1) == 1;
              _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
            }
          };
          var setupTypeInfo = function(test, maskPattern) {
            var data = _errorCorrectionLevel << 3 | maskPattern;
            var bits = QRUtil.getBCHTypeInfo(data);
            for (var i = 0; i < 15; i += 1) {
              var mod = !test && (bits >> i & 1) == 1;
              if (i < 6) {
                _modules[i][8] = mod;
              } else if (i < 8) {
                _modules[i + 1][8] = mod;
              } else {
                _modules[_moduleCount - 15 + i][8] = mod;
              }
            }
            for (var i = 0; i < 15; i += 1) {
              var mod = !test && (bits >> i & 1) == 1;
              if (i < 8) {
                _modules[8][_moduleCount - i - 1] = mod;
              } else if (i < 9) {
                _modules[8][15 - i - 1 + 1] = mod;
              } else {
                _modules[8][15 - i - 1] = mod;
              }
            }
            _modules[_moduleCount - 8][8] = !test;
          };
          var mapData = function(data, maskPattern) {
            var inc = -1;
            var row = _moduleCount - 1;
            var bitIndex = 7;
            var byteIndex = 0;
            var maskFunc = QRUtil.getMaskFunction(maskPattern);
            for (var col = _moduleCount - 1; col > 0; col -= 2) {
              if (col == 6) col -= 1;
              while (true) {
                for (var c = 0; c < 2; c += 1) {
                  if (_modules[row][col - c] == null) {
                    var dark = false;
                    if (byteIndex < data.length) {
                      dark = (data[byteIndex] >>> bitIndex & 1) == 1;
                    }
                    var mask = maskFunc(row, col - c);
                    if (mask) {
                      dark = !dark;
                    }
                    _modules[row][col - c] = dark;
                    bitIndex -= 1;
                    if (bitIndex == -1) {
                      byteIndex += 1;
                      bitIndex = 7;
                    }
                  }
                }
                row += inc;
                if (row < 0 || _moduleCount <= row) {
                  row -= inc;
                  inc = -inc;
                  break;
                }
              }
            }
          };
          var createBytes = function(buffer, rsBlocks) {
            var offset = 0;
            var maxDcCount = 0;
            var maxEcCount = 0;
            var dcdata = new Array(rsBlocks.length);
            var ecdata = new Array(rsBlocks.length);
            for (var r = 0; r < rsBlocks.length; r += 1) {
              var dcCount = rsBlocks[r].dataCount;
              var ecCount = rsBlocks[r].totalCount - dcCount;
              maxDcCount = Math.max(maxDcCount, dcCount);
              maxEcCount = Math.max(maxEcCount, ecCount);
              dcdata[r] = new Array(dcCount);
              for (var i = 0; i < dcdata[r].length; i += 1) {
                dcdata[r][i] = 255 & buffer.getBuffer()[i + offset];
              }
              offset += dcCount;
              var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
              var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);
              var modPoly = rawPoly.mod(rsPoly);
              ecdata[r] = new Array(rsPoly.getLength() - 1);
              for (var i = 0; i < ecdata[r].length; i += 1) {
                var modIndex = i + modPoly.getLength() - ecdata[r].length;
                ecdata[r][i] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
              }
            }
            var totalCodeCount = 0;
            for (var i = 0; i < rsBlocks.length; i += 1) {
              totalCodeCount += rsBlocks[i].totalCount;
            }
            var data = new Array(totalCodeCount);
            var index = 0;
            for (var i = 0; i < maxDcCount; i += 1) {
              for (var r = 0; r < rsBlocks.length; r += 1) {
                if (i < dcdata[r].length) {
                  data[index] = dcdata[r][i];
                  index += 1;
                }
              }
            }
            for (var i = 0; i < maxEcCount; i += 1) {
              for (var r = 0; r < rsBlocks.length; r += 1) {
                if (i < ecdata[r].length) {
                  data[index] = ecdata[r][i];
                  index += 1;
                }
              }
            }
            return data;
          };
          var createData = function(typeNumber2, errorCorrectionLevel2, dataList) {
            var rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, errorCorrectionLevel2);
            var buffer = qrBitBuffer();
            for (var i = 0; i < dataList.length; i += 1) {
              var data = dataList[i];
              buffer.put(data.getMode(), 4);
              buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
              data.write(buffer);
            }
            var totalDataCount = 0;
            for (var i = 0; i < rsBlocks.length; i += 1) {
              totalDataCount += rsBlocks[i].dataCount;
            }
            if (buffer.getLengthInBits() > totalDataCount * 8) {
              throw "code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")";
            }
            if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
              buffer.put(0, 4);
            }
            while (buffer.getLengthInBits() % 8 != 0) {
              buffer.putBit(false);
            }
            while (true) {
              if (buffer.getLengthInBits() >= totalDataCount * 8) {
                break;
              }
              buffer.put(PAD0, 8);
              if (buffer.getLengthInBits() >= totalDataCount * 8) {
                break;
              }
              buffer.put(PAD1, 8);
            }
            return createBytes(buffer, rsBlocks);
          };
          _this.addData = function(data, mode) {
            mode = mode || "Byte";
            var newData = null;
            switch (mode) {
              case "Numeric":
                newData = qrNumber(data);
                break;
              case "Alphanumeric":
                newData = qrAlphaNum(data);
                break;
              case "Byte":
                newData = qr8BitByte(data);
                break;
              case "Kanji":
                newData = qrKanji(data);
                break;
              default:
                throw "mode:" + mode;
            }
            _dataList.push(newData);
            _dataCache = null;
          };
          _this.isDark = function(row, col) {
            if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
              throw row + "," + col;
            }
            return _modules[row][col];
          };
          _this.getModuleCount = function() {
            return _moduleCount;
          };
          _this.make = function() {
            if (_typeNumber < 1) {
              var typeNumber2 = 1;
              for (; typeNumber2 < 40; typeNumber2++) {
                var rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, _errorCorrectionLevel);
                var buffer = qrBitBuffer();
                for (var i = 0; i < _dataList.length; i++) {
                  var data = _dataList[i];
                  buffer.put(data.getMode(), 4);
                  buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
                  data.write(buffer);
                }
                var totalDataCount = 0;
                for (var i = 0; i < rsBlocks.length; i++) {
                  totalDataCount += rsBlocks[i].dataCount;
                }
                if (buffer.getLengthInBits() <= totalDataCount * 8) {
                  break;
                }
              }
              _typeNumber = typeNumber2;
            }
            makeImpl(false, getBestMaskPattern());
          };
          _this.createTableTag = function(cellSize, margin) {
            cellSize = cellSize || 2;
            margin = typeof margin == "undefined" ? cellSize * 4 : margin;
            var qrHtml = "";
            qrHtml += '<table style="';
            qrHtml += " border-width: 0px; border-style: none;";
            qrHtml += " border-collapse: collapse;";
            qrHtml += " padding: 0px; margin: " + margin + "px;";
            qrHtml += '">';
            qrHtml += "<tbody>";
            for (var r = 0; r < _this.getModuleCount(); r += 1) {
              qrHtml += "<tr>";
              for (var c = 0; c < _this.getModuleCount(); c += 1) {
                qrHtml += '<td style="';
                qrHtml += " border-width: 0px; border-style: none;";
                qrHtml += " border-collapse: collapse;";
                qrHtml += " padding: 0px; margin: 0px;";
                qrHtml += " width: " + cellSize + "px;";
                qrHtml += " height: " + cellSize + "px;";
                qrHtml += " background-color: ";
                qrHtml += _this.isDark(r, c) ? "#000000" : "#ffffff";
                qrHtml += ";";
                qrHtml += '"/>';
              }
              qrHtml += "</tr>";
            }
            qrHtml += "</tbody>";
            qrHtml += "</table>";
            return qrHtml;
          };
          _this.createSvgTag = function(cellSize, margin, alt, title) {
            var opts = {};
            if (typeof arguments[0] == "object") {
              opts = arguments[0];
              cellSize = opts.cellSize;
              margin = opts.margin;
              alt = opts.alt;
              title = opts.title;
            }
            cellSize = cellSize || 2;
            margin = typeof margin == "undefined" ? cellSize * 4 : margin;
            alt = typeof alt === "string" ? { text: alt } : alt || {};
            alt.text = alt.text || null;
            alt.id = alt.text ? alt.id || "qrcode-description" : null;
            title = typeof title === "string" ? { text: title } : title || {};
            title.text = title.text || null;
            title.id = title.text ? title.id || "qrcode-title" : null;
            var size = _this.getModuleCount() * cellSize + margin * 2;
            var c, mc, r, mr, qrSvg = "", rect;
            rect = "l" + cellSize + ",0 0," + cellSize + " -" + cellSize + ",0 0,-" + cellSize + "z ";
            qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
            qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : "";
            qrSvg += ' viewBox="0 0 ' + size + " " + size + '" ';
            qrSvg += ' preserveAspectRatio="xMinYMin meet"';
            qrSvg += title.text || alt.text ? ' role="img" aria-labelledby="' + escapeXml([title.id, alt.id].join(" ").trim()) + '"' : "";
            qrSvg += ">";
            qrSvg += title.text ? '<title id="' + escapeXml(title.id) + '">' + escapeXml(title.text) + "</title>" : "";
            qrSvg += alt.text ? '<description id="' + escapeXml(alt.id) + '">' + escapeXml(alt.text) + "</description>" : "";
            qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
            qrSvg += '<path d="';
            for (r = 0; r < _this.getModuleCount(); r += 1) {
              mr = r * cellSize + margin;
              for (c = 0; c < _this.getModuleCount(); c += 1) {
                if (_this.isDark(r, c)) {
                  mc = c * cellSize + margin;
                  qrSvg += "M" + mc + "," + mr + rect;
                }
              }
            }
            qrSvg += '" stroke="transparent" fill="black"/>';
            qrSvg += "</svg>";
            return qrSvg;
          };
          _this.createDataURL = function(cellSize, margin) {
            cellSize = cellSize || 2;
            margin = typeof margin == "undefined" ? cellSize * 4 : margin;
            var size = _this.getModuleCount() * cellSize + margin * 2;
            var min = margin;
            var max = size - margin;
            return createDataURL(size, size, function(x, y) {
              if (min <= x && x < max && min <= y && y < max) {
                var c = Math.floor((x - min) / cellSize);
                var r = Math.floor((y - min) / cellSize);
                return _this.isDark(r, c) ? 0 : 1;
              } else {
                return 1;
              }
            });
          };
          _this.createImgTag = function(cellSize, margin, alt) {
            cellSize = cellSize || 2;
            margin = typeof margin == "undefined" ? cellSize * 4 : margin;
            var size = _this.getModuleCount() * cellSize + margin * 2;
            var img = "";
            img += "<img";
            img += ' src="';
            img += _this.createDataURL(cellSize, margin);
            img += '"';
            img += ' width="';
            img += size;
            img += '"';
            img += ' height="';
            img += size;
            img += '"';
            if (alt) {
              img += ' alt="';
              img += escapeXml(alt);
              img += '"';
            }
            img += "/>";
            return img;
          };
          var escapeXml = function(s) {
            var escaped = "";
            for (var i = 0; i < s.length; i += 1) {
              var c = s.charAt(i);
              switch (c) {
                case "<":
                  escaped += "&lt;";
                  break;
                case ">":
                  escaped += "&gt;";
                  break;
                case "&":
                  escaped += "&amp;";
                  break;
                case '"':
                  escaped += "&quot;";
                  break;
                default:
                  escaped += c;
                  break;
              }
            }
            return escaped;
          };
          var _createHalfASCII = function(margin) {
            var cellSize = 1;
            margin = typeof margin == "undefined" ? cellSize * 2 : margin;
            var size = _this.getModuleCount() * cellSize + margin * 2;
            var min = margin;
            var max = size - margin;
            var y, x, r1, r2, p;
            var blocks = {
              "\u2588\u2588": "\u2588",
              "\u2588 ": "\u2580",
              " \u2588": "\u2584",
              "  ": " "
            };
            var blocksLastLineNoMargin = {
              "\u2588\u2588": "\u2580",
              "\u2588 ": "\u2580",
              " \u2588": " ",
              "  ": " "
            };
            var ascii = "";
            for (y = 0; y < size; y += 2) {
              r1 = Math.floor((y - min) / cellSize);
              r2 = Math.floor((y + 1 - min) / cellSize);
              for (x = 0; x < size; x += 1) {
                p = "\u2588";
                if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
                  p = " ";
                }
                if (min <= x && x < max && min <= y + 1 && y + 1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
                  p += " ";
                } else {
                  p += "\u2588";
                }
                ascii += margin < 1 && y + 1 >= max ? blocksLastLineNoMargin[p] : blocks[p];
              }
              ascii += "\n";
            }
            if (size % 2 && margin > 0) {
              return ascii.substring(0, ascii.length - size - 1) + Array(size + 1).join("\u2580");
            }
            return ascii.substring(0, ascii.length - 1);
          };
          _this.createASCII = function(cellSize, margin) {
            cellSize = cellSize || 1;
            if (cellSize < 2) {
              return _createHalfASCII(margin);
            }
            cellSize -= 1;
            margin = typeof margin == "undefined" ? cellSize * 2 : margin;
            var size = _this.getModuleCount() * cellSize + margin * 2;
            var min = margin;
            var max = size - margin;
            var y, x, r, p;
            var white = Array(cellSize + 1).join("\u2588\u2588");
            var black = Array(cellSize + 1).join("  ");
            var ascii = "";
            var line = "";
            for (y = 0; y < size; y += 1) {
              r = Math.floor((y - min) / cellSize);
              line = "";
              for (x = 0; x < size; x += 1) {
                p = 1;
                if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
                  p = 0;
                }
                line += p ? white : black;
              }
              for (r = 0; r < cellSize; r += 1) {
                ascii += line + "\n";
              }
            }
            return ascii.substring(0, ascii.length - 1);
          };
          _this.renderTo2dContext = function(context, cellSize) {
            cellSize = cellSize || 2;
            var length = _this.getModuleCount();
            for (var row = 0; row < length; row++) {
              for (var col = 0; col < length; col++) {
                context.fillStyle = _this.isDark(row, col) ? "black" : "white";
                context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
              }
            }
          };
          return _this;
        };
        qrcode3.stringToBytesFuncs = {
          "default": function(s) {
            var bytes = [];
            for (var i = 0; i < s.length; i += 1) {
              var c = s.charCodeAt(i);
              bytes.push(c & 255);
            }
            return bytes;
          }
        };
        qrcode3.stringToBytes = qrcode3.stringToBytesFuncs["default"];
        qrcode3.createStringToBytes = function(unicodeData, numChars) {
          var unicodeMap = (function() {
            var bin = base64DecodeInputStream(unicodeData);
            var read = function() {
              var b = bin.read();
              if (b == -1) throw "eof";
              return b;
            };
            var count = 0;
            var unicodeMap2 = {};
            while (true) {
              var b0 = bin.read();
              if (b0 == -1) break;
              var b1 = read();
              var b2 = read();
              var b3 = read();
              var k = String.fromCharCode(b0 << 8 | b1);
              var v = b2 << 8 | b3;
              unicodeMap2[k] = v;
              count += 1;
            }
            if (count != numChars) {
              throw count + " != " + numChars;
            }
            return unicodeMap2;
          })();
          var unknownChar = "?".charCodeAt(0);
          return function(s) {
            var bytes = [];
            for (var i = 0; i < s.length; i += 1) {
              var c = s.charCodeAt(i);
              if (c < 128) {
                bytes.push(c);
              } else {
                var b = unicodeMap[s.charAt(i)];
                if (typeof b == "number") {
                  if ((b & 255) == b) {
                    bytes.push(b);
                  } else {
                    bytes.push(b >>> 8);
                    bytes.push(b & 255);
                  }
                } else {
                  bytes.push(unknownChar);
                }
              }
            }
            return bytes;
          };
        };
        var QRMode = {
          MODE_NUMBER: 1 << 0,
          MODE_ALPHA_NUM: 1 << 1,
          MODE_8BIT_BYTE: 1 << 2,
          MODE_KANJI: 1 << 3
        };
        var QRErrorCorrectionLevel = {
          L: 1,
          M: 0,
          Q: 3,
          H: 2
        };
        var QRMaskPattern = {
          PATTERN000: 0,
          PATTERN001: 1,
          PATTERN010: 2,
          PATTERN011: 3,
          PATTERN100: 4,
          PATTERN101: 5,
          PATTERN110: 6,
          PATTERN111: 7
        };
        var QRUtil = (function() {
          var PATTERN_POSITION_TABLE = [
            [],
            [6, 18],
            [6, 22],
            [6, 26],
            [6, 30],
            [6, 34],
            [6, 22, 38],
            [6, 24, 42],
            [6, 26, 46],
            [6, 28, 50],
            [6, 30, 54],
            [6, 32, 58],
            [6, 34, 62],
            [6, 26, 46, 66],
            [6, 26, 48, 70],
            [6, 26, 50, 74],
            [6, 30, 54, 78],
            [6, 30, 56, 82],
            [6, 30, 58, 86],
            [6, 34, 62, 90],
            [6, 28, 50, 72, 94],
            [6, 26, 50, 74, 98],
            [6, 30, 54, 78, 102],
            [6, 28, 54, 80, 106],
            [6, 32, 58, 84, 110],
            [6, 30, 58, 86, 114],
            [6, 34, 62, 90, 118],
            [6, 26, 50, 74, 98, 122],
            [6, 30, 54, 78, 102, 126],
            [6, 26, 52, 78, 104, 130],
            [6, 30, 56, 82, 108, 134],
            [6, 34, 60, 86, 112, 138],
            [6, 30, 58, 86, 114, 142],
            [6, 34, 62, 90, 118, 146],
            [6, 30, 54, 78, 102, 126, 150],
            [6, 24, 50, 76, 102, 128, 154],
            [6, 28, 54, 80, 106, 132, 158],
            [6, 32, 58, 84, 110, 136, 162],
            [6, 26, 54, 82, 110, 138, 166],
            [6, 30, 58, 86, 114, 142, 170]
          ];
          var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
          var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
          var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
          var _this = {};
          var getBCHDigit = function(data) {
            var digit = 0;
            while (data != 0) {
              digit += 1;
              data >>>= 1;
            }
            return digit;
          };
          _this.getBCHTypeInfo = function(data) {
            var d = data << 10;
            while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
              d ^= G15 << getBCHDigit(d) - getBCHDigit(G15);
            }
            return (data << 10 | d) ^ G15_MASK;
          };
          _this.getBCHTypeNumber = function(data) {
            var d = data << 12;
            while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
              d ^= G18 << getBCHDigit(d) - getBCHDigit(G18);
            }
            return data << 12 | d;
          };
          _this.getPatternPosition = function(typeNumber) {
            return PATTERN_POSITION_TABLE[typeNumber - 1];
          };
          _this.getMaskFunction = function(maskPattern) {
            switch (maskPattern) {
              case QRMaskPattern.PATTERN000:
                return function(i, j) {
                  return (i + j) % 2 == 0;
                };
              case QRMaskPattern.PATTERN001:
                return function(i, j) {
                  return i % 2 == 0;
                };
              case QRMaskPattern.PATTERN010:
                return function(i, j) {
                  return j % 3 == 0;
                };
              case QRMaskPattern.PATTERN011:
                return function(i, j) {
                  return (i + j) % 3 == 0;
                };
              case QRMaskPattern.PATTERN100:
                return function(i, j) {
                  return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
                };
              case QRMaskPattern.PATTERN101:
                return function(i, j) {
                  return i * j % 2 + i * j % 3 == 0;
                };
              case QRMaskPattern.PATTERN110:
                return function(i, j) {
                  return (i * j % 2 + i * j % 3) % 2 == 0;
                };
              case QRMaskPattern.PATTERN111:
                return function(i, j) {
                  return (i * j % 3 + (i + j) % 2) % 2 == 0;
                };
              default:
                throw "bad maskPattern:" + maskPattern;
            }
          };
          _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
            var a = qrPolynomial([1], 0);
            for (var i = 0; i < errorCorrectLength; i += 1) {
              a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0));
            }
            return a;
          };
          _this.getLengthInBits = function(mode, type) {
            if (1 <= type && type < 10) {
              switch (mode) {
                case QRMode.MODE_NUMBER:
                  return 10;
                case QRMode.MODE_ALPHA_NUM:
                  return 9;
                case QRMode.MODE_8BIT_BYTE:
                  return 8;
                case QRMode.MODE_KANJI:
                  return 8;
                default:
                  throw "mode:" + mode;
              }
            } else if (type < 27) {
              switch (mode) {
                case QRMode.MODE_NUMBER:
                  return 12;
                case QRMode.MODE_ALPHA_NUM:
                  return 11;
                case QRMode.MODE_8BIT_BYTE:
                  return 16;
                case QRMode.MODE_KANJI:
                  return 10;
                default:
                  throw "mode:" + mode;
              }
            } else if (type < 41) {
              switch (mode) {
                case QRMode.MODE_NUMBER:
                  return 14;
                case QRMode.MODE_ALPHA_NUM:
                  return 13;
                case QRMode.MODE_8BIT_BYTE:
                  return 16;
                case QRMode.MODE_KANJI:
                  return 12;
                default:
                  throw "mode:" + mode;
              }
            } else {
              throw "type:" + type;
            }
          };
          _this.getLostPoint = function(qrcode4) {
            var moduleCount = qrcode4.getModuleCount();
            var lostPoint = 0;
            for (var row = 0; row < moduleCount; row += 1) {
              for (var col = 0; col < moduleCount; col += 1) {
                var sameCount = 0;
                var dark = qrcode4.isDark(row, col);
                for (var r = -1; r <= 1; r += 1) {
                  if (row + r < 0 || moduleCount <= row + r) {
                    continue;
                  }
                  for (var c = -1; c <= 1; c += 1) {
                    if (col + c < 0 || moduleCount <= col + c) {
                      continue;
                    }
                    if (r == 0 && c == 0) {
                      continue;
                    }
                    if (dark == qrcode4.isDark(row + r, col + c)) {
                      sameCount += 1;
                    }
                  }
                }
                if (sameCount > 5) {
                  lostPoint += 3 + sameCount - 5;
                }
              }
            }
            ;
            for (var row = 0; row < moduleCount - 1; row += 1) {
              for (var col = 0; col < moduleCount - 1; col += 1) {
                var count = 0;
                if (qrcode4.isDark(row, col)) count += 1;
                if (qrcode4.isDark(row + 1, col)) count += 1;
                if (qrcode4.isDark(row, col + 1)) count += 1;
                if (qrcode4.isDark(row + 1, col + 1)) count += 1;
                if (count == 0 || count == 4) {
                  lostPoint += 3;
                }
              }
            }
            for (var row = 0; row < moduleCount; row += 1) {
              for (var col = 0; col < moduleCount - 6; col += 1) {
                if (qrcode4.isDark(row, col) && !qrcode4.isDark(row, col + 1) && qrcode4.isDark(row, col + 2) && qrcode4.isDark(row, col + 3) && qrcode4.isDark(row, col + 4) && !qrcode4.isDark(row, col + 5) && qrcode4.isDark(row, col + 6)) {
                  lostPoint += 40;
                }
              }
            }
            for (var col = 0; col < moduleCount; col += 1) {
              for (var row = 0; row < moduleCount - 6; row += 1) {
                if (qrcode4.isDark(row, col) && !qrcode4.isDark(row + 1, col) && qrcode4.isDark(row + 2, col) && qrcode4.isDark(row + 3, col) && qrcode4.isDark(row + 4, col) && !qrcode4.isDark(row + 5, col) && qrcode4.isDark(row + 6, col)) {
                  lostPoint += 40;
                }
              }
            }
            var darkCount = 0;
            for (var col = 0; col < moduleCount; col += 1) {
              for (var row = 0; row < moduleCount; row += 1) {
                if (qrcode4.isDark(row, col)) {
                  darkCount += 1;
                }
              }
            }
            var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
            lostPoint += ratio * 10;
            return lostPoint;
          };
          return _this;
        })();
        var QRMath = (function() {
          var EXP_TABLE = new Array(256);
          var LOG_TABLE = new Array(256);
          for (var i = 0; i < 8; i += 1) {
            EXP_TABLE[i] = 1 << i;
          }
          for (var i = 8; i < 256; i += 1) {
            EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
          }
          for (var i = 0; i < 255; i += 1) {
            LOG_TABLE[EXP_TABLE[i]] = i;
          }
          var _this = {};
          _this.glog = function(n) {
            if (n < 1) {
              throw "glog(" + n + ")";
            }
            return LOG_TABLE[n];
          };
          _this.gexp = function(n) {
            while (n < 0) {
              n += 255;
            }
            while (n >= 256) {
              n -= 255;
            }
            return EXP_TABLE[n];
          };
          return _this;
        })();
        function qrPolynomial(num, shift) {
          if (typeof num.length == "undefined") {
            throw num.length + "/" + shift;
          }
          var _num = (function() {
            var offset = 0;
            while (offset < num.length && num[offset] == 0) {
              offset += 1;
            }
            var _num2 = new Array(num.length - offset + shift);
            for (var i = 0; i < num.length - offset; i += 1) {
              _num2[i] = num[i + offset];
            }
            return _num2;
          })();
          var _this = {};
          _this.getAt = function(index) {
            return _num[index];
          };
          _this.getLength = function() {
            return _num.length;
          };
          _this.multiply = function(e) {
            var num2 = new Array(_this.getLength() + e.getLength() - 1);
            for (var i = 0; i < _this.getLength(); i += 1) {
              for (var j = 0; j < e.getLength(); j += 1) {
                num2[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i)) + QRMath.glog(e.getAt(j)));
              }
            }
            return qrPolynomial(num2, 0);
          };
          _this.mod = function(e) {
            if (_this.getLength() - e.getLength() < 0) {
              return _this;
            }
            var ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e.getAt(0));
            var num2 = new Array(_this.getLength());
            for (var i = 0; i < _this.getLength(); i += 1) {
              num2[i] = _this.getAt(i);
            }
            for (var i = 0; i < e.getLength(); i += 1) {
              num2[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
            }
            return qrPolynomial(num2, 0).mod(e);
          };
          return _this;
        }
        ;
        var QRRSBlock = (function() {
          var RS_BLOCK_TABLE = [
            // L
            // M
            // Q
            // H
            // 1
            [1, 26, 19],
            [1, 26, 16],
            [1, 26, 13],
            [1, 26, 9],
            // 2
            [1, 44, 34],
            [1, 44, 28],
            [1, 44, 22],
            [1, 44, 16],
            // 3
            [1, 70, 55],
            [1, 70, 44],
            [2, 35, 17],
            [2, 35, 13],
            // 4
            [1, 100, 80],
            [2, 50, 32],
            [2, 50, 24],
            [4, 25, 9],
            // 5
            [1, 134, 108],
            [2, 67, 43],
            [2, 33, 15, 2, 34, 16],
            [2, 33, 11, 2, 34, 12],
            // 6
            [2, 86, 68],
            [4, 43, 27],
            [4, 43, 19],
            [4, 43, 15],
            // 7
            [2, 98, 78],
            [4, 49, 31],
            [2, 32, 14, 4, 33, 15],
            [4, 39, 13, 1, 40, 14],
            // 8
            [2, 121, 97],
            [2, 60, 38, 2, 61, 39],
            [4, 40, 18, 2, 41, 19],
            [4, 40, 14, 2, 41, 15],
            // 9
            [2, 146, 116],
            [3, 58, 36, 2, 59, 37],
            [4, 36, 16, 4, 37, 17],
            [4, 36, 12, 4, 37, 13],
            // 10
            [2, 86, 68, 2, 87, 69],
            [4, 69, 43, 1, 70, 44],
            [6, 43, 19, 2, 44, 20],
            [6, 43, 15, 2, 44, 16],
            // 11
            [4, 101, 81],
            [1, 80, 50, 4, 81, 51],
            [4, 50, 22, 4, 51, 23],
            [3, 36, 12, 8, 37, 13],
            // 12
            [2, 116, 92, 2, 117, 93],
            [6, 58, 36, 2, 59, 37],
            [4, 46, 20, 6, 47, 21],
            [7, 42, 14, 4, 43, 15],
            // 13
            [4, 133, 107],
            [8, 59, 37, 1, 60, 38],
            [8, 44, 20, 4, 45, 21],
            [12, 33, 11, 4, 34, 12],
            // 14
            [3, 145, 115, 1, 146, 116],
            [4, 64, 40, 5, 65, 41],
            [11, 36, 16, 5, 37, 17],
            [11, 36, 12, 5, 37, 13],
            // 15
            [5, 109, 87, 1, 110, 88],
            [5, 65, 41, 5, 66, 42],
            [5, 54, 24, 7, 55, 25],
            [11, 36, 12, 7, 37, 13],
            // 16
            [5, 122, 98, 1, 123, 99],
            [7, 73, 45, 3, 74, 46],
            [15, 43, 19, 2, 44, 20],
            [3, 45, 15, 13, 46, 16],
            // 17
            [1, 135, 107, 5, 136, 108],
            [10, 74, 46, 1, 75, 47],
            [1, 50, 22, 15, 51, 23],
            [2, 42, 14, 17, 43, 15],
            // 18
            [5, 150, 120, 1, 151, 121],
            [9, 69, 43, 4, 70, 44],
            [17, 50, 22, 1, 51, 23],
            [2, 42, 14, 19, 43, 15],
            // 19
            [3, 141, 113, 4, 142, 114],
            [3, 70, 44, 11, 71, 45],
            [17, 47, 21, 4, 48, 22],
            [9, 39, 13, 16, 40, 14],
            // 20
            [3, 135, 107, 5, 136, 108],
            [3, 67, 41, 13, 68, 42],
            [15, 54, 24, 5, 55, 25],
            [15, 43, 15, 10, 44, 16],
            // 21
            [4, 144, 116, 4, 145, 117],
            [17, 68, 42],
            [17, 50, 22, 6, 51, 23],
            [19, 46, 16, 6, 47, 17],
            // 22
            [2, 139, 111, 7, 140, 112],
            [17, 74, 46],
            [7, 54, 24, 16, 55, 25],
            [34, 37, 13],
            // 23
            [4, 151, 121, 5, 152, 122],
            [4, 75, 47, 14, 76, 48],
            [11, 54, 24, 14, 55, 25],
            [16, 45, 15, 14, 46, 16],
            // 24
            [6, 147, 117, 4, 148, 118],
            [6, 73, 45, 14, 74, 46],
            [11, 54, 24, 16, 55, 25],
            [30, 46, 16, 2, 47, 17],
            // 25
            [8, 132, 106, 4, 133, 107],
            [8, 75, 47, 13, 76, 48],
            [7, 54, 24, 22, 55, 25],
            [22, 45, 15, 13, 46, 16],
            // 26
            [10, 142, 114, 2, 143, 115],
            [19, 74, 46, 4, 75, 47],
            [28, 50, 22, 6, 51, 23],
            [33, 46, 16, 4, 47, 17],
            // 27
            [8, 152, 122, 4, 153, 123],
            [22, 73, 45, 3, 74, 46],
            [8, 53, 23, 26, 54, 24],
            [12, 45, 15, 28, 46, 16],
            // 28
            [3, 147, 117, 10, 148, 118],
            [3, 73, 45, 23, 74, 46],
            [4, 54, 24, 31, 55, 25],
            [11, 45, 15, 31, 46, 16],
            // 29
            [7, 146, 116, 7, 147, 117],
            [21, 73, 45, 7, 74, 46],
            [1, 53, 23, 37, 54, 24],
            [19, 45, 15, 26, 46, 16],
            // 30
            [5, 145, 115, 10, 146, 116],
            [19, 75, 47, 10, 76, 48],
            [15, 54, 24, 25, 55, 25],
            [23, 45, 15, 25, 46, 16],
            // 31
            [13, 145, 115, 3, 146, 116],
            [2, 74, 46, 29, 75, 47],
            [42, 54, 24, 1, 55, 25],
            [23, 45, 15, 28, 46, 16],
            // 32
            [17, 145, 115],
            [10, 74, 46, 23, 75, 47],
            [10, 54, 24, 35, 55, 25],
            [19, 45, 15, 35, 46, 16],
            // 33
            [17, 145, 115, 1, 146, 116],
            [14, 74, 46, 21, 75, 47],
            [29, 54, 24, 19, 55, 25],
            [11, 45, 15, 46, 46, 16],
            // 34
            [13, 145, 115, 6, 146, 116],
            [14, 74, 46, 23, 75, 47],
            [44, 54, 24, 7, 55, 25],
            [59, 46, 16, 1, 47, 17],
            // 35
            [12, 151, 121, 7, 152, 122],
            [12, 75, 47, 26, 76, 48],
            [39, 54, 24, 14, 55, 25],
            [22, 45, 15, 41, 46, 16],
            // 36
            [6, 151, 121, 14, 152, 122],
            [6, 75, 47, 34, 76, 48],
            [46, 54, 24, 10, 55, 25],
            [2, 45, 15, 64, 46, 16],
            // 37
            [17, 152, 122, 4, 153, 123],
            [29, 74, 46, 14, 75, 47],
            [49, 54, 24, 10, 55, 25],
            [24, 45, 15, 46, 46, 16],
            // 38
            [4, 152, 122, 18, 153, 123],
            [13, 74, 46, 32, 75, 47],
            [48, 54, 24, 14, 55, 25],
            [42, 45, 15, 32, 46, 16],
            // 39
            [20, 147, 117, 4, 148, 118],
            [40, 75, 47, 7, 76, 48],
            [43, 54, 24, 22, 55, 25],
            [10, 45, 15, 67, 46, 16],
            // 40
            [19, 148, 118, 6, 149, 119],
            [18, 75, 47, 31, 76, 48],
            [34, 54, 24, 34, 55, 25],
            [20, 45, 15, 61, 46, 16]
          ];
          var qrRSBlock = function(totalCount, dataCount) {
            var _this2 = {};
            _this2.totalCount = totalCount;
            _this2.dataCount = dataCount;
            return _this2;
          };
          var _this = {};
          var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {
            switch (errorCorrectionLevel) {
              case QRErrorCorrectionLevel.L:
                return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
              case QRErrorCorrectionLevel.M:
                return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
              case QRErrorCorrectionLevel.Q:
                return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
              case QRErrorCorrectionLevel.H:
                return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
              default:
                return void 0;
            }
          };
          _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {
            var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);
            if (typeof rsBlock == "undefined") {
              throw "bad rs block @ typeNumber:" + typeNumber + "/errorCorrectionLevel:" + errorCorrectionLevel;
            }
            var length = rsBlock.length / 3;
            var list = [];
            for (var i = 0; i < length; i += 1) {
              var count = rsBlock[i * 3 + 0];
              var totalCount = rsBlock[i * 3 + 1];
              var dataCount = rsBlock[i * 3 + 2];
              for (var j = 0; j < count; j += 1) {
                list.push(qrRSBlock(totalCount, dataCount));
              }
            }
            return list;
          };
          return _this;
        })();
        var qrBitBuffer = function() {
          var _buffer = [];
          var _length = 0;
          var _this = {};
          _this.getBuffer = function() {
            return _buffer;
          };
          _this.getAt = function(index) {
            var bufIndex = Math.floor(index / 8);
            return (_buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
          };
          _this.put = function(num, length) {
            for (var i = 0; i < length; i += 1) {
              _this.putBit((num >>> length - i - 1 & 1) == 1);
            }
          };
          _this.getLengthInBits = function() {
            return _length;
          };
          _this.putBit = function(bit) {
            var bufIndex = Math.floor(_length / 8);
            if (_buffer.length <= bufIndex) {
              _buffer.push(0);
            }
            if (bit) {
              _buffer[bufIndex] |= 128 >>> _length % 8;
            }
            _length += 1;
          };
          return _this;
        };
        var qrNumber = function(data) {
          var _mode = QRMode.MODE_NUMBER;
          var _data = data;
          var _this = {};
          _this.getMode = function() {
            return _mode;
          };
          _this.getLength = function(buffer) {
            return _data.length;
          };
          _this.write = function(buffer) {
            var data2 = _data;
            var i = 0;
            while (i + 2 < data2.length) {
              buffer.put(strToNum(data2.substring(i, i + 3)), 10);
              i += 3;
            }
            if (i < data2.length) {
              if (data2.length - i == 1) {
                buffer.put(strToNum(data2.substring(i, i + 1)), 4);
              } else if (data2.length - i == 2) {
                buffer.put(strToNum(data2.substring(i, i + 2)), 7);
              }
            }
          };
          var strToNum = function(s) {
            var num = 0;
            for (var i = 0; i < s.length; i += 1) {
              num = num * 10 + chatToNum(s.charAt(i));
            }
            return num;
          };
          var chatToNum = function(c) {
            if ("0" <= c && c <= "9") {
              return c.charCodeAt(0) - "0".charCodeAt(0);
            }
            throw "illegal char :" + c;
          };
          return _this;
        };
        var qrAlphaNum = function(data) {
          var _mode = QRMode.MODE_ALPHA_NUM;
          var _data = data;
          var _this = {};
          _this.getMode = function() {
            return _mode;
          };
          _this.getLength = function(buffer) {
            return _data.length;
          };
          _this.write = function(buffer) {
            var s = _data;
            var i = 0;
            while (i + 1 < s.length) {
              buffer.put(
                getCode(s.charAt(i)) * 45 + getCode(s.charAt(i + 1)),
                11
              );
              i += 2;
            }
            if (i < s.length) {
              buffer.put(getCode(s.charAt(i)), 6);
            }
          };
          var getCode = function(c) {
            if ("0" <= c && c <= "9") {
              return c.charCodeAt(0) - "0".charCodeAt(0);
            } else if ("A" <= c && c <= "Z") {
              return c.charCodeAt(0) - "A".charCodeAt(0) + 10;
            } else {
              switch (c) {
                case " ":
                  return 36;
                case "$":
                  return 37;
                case "%":
                  return 38;
                case "*":
                  return 39;
                case "+":
                  return 40;
                case "-":
                  return 41;
                case ".":
                  return 42;
                case "/":
                  return 43;
                case ":":
                  return 44;
                default:
                  throw "illegal char :" + c;
              }
            }
          };
          return _this;
        };
        var qr8BitByte = function(data) {
          var _mode = QRMode.MODE_8BIT_BYTE;
          var _data = data;
          var _bytes = qrcode3.stringToBytes(data);
          var _this = {};
          _this.getMode = function() {
            return _mode;
          };
          _this.getLength = function(buffer) {
            return _bytes.length;
          };
          _this.write = function(buffer) {
            for (var i = 0; i < _bytes.length; i += 1) {
              buffer.put(_bytes[i], 8);
            }
          };
          return _this;
        };
        var qrKanji = function(data) {
          var _mode = QRMode.MODE_KANJI;
          var _data = data;
          var stringToBytes = qrcode3.stringToBytesFuncs["SJIS"];
          if (!stringToBytes) {
            throw "sjis not supported.";
          }
          !(function(c, code) {
            var test = stringToBytes(c);
            if (test.length != 2 || (test[0] << 8 | test[1]) != code) {
              throw "sjis not supported.";
            }
          })("\u53CB", 38726);
          var _bytes = stringToBytes(data);
          var _this = {};
          _this.getMode = function() {
            return _mode;
          };
          _this.getLength = function(buffer) {
            return ~~(_bytes.length / 2);
          };
          _this.write = function(buffer) {
            var data2 = _bytes;
            var i = 0;
            while (i + 1 < data2.length) {
              var c = (255 & data2[i]) << 8 | 255 & data2[i + 1];
              if (33088 <= c && c <= 40956) {
                c -= 33088;
              } else if (57408 <= c && c <= 60351) {
                c -= 49472;
              } else {
                throw "illegal char at " + (i + 1) + "/" + c;
              }
              c = (c >>> 8 & 255) * 192 + (c & 255);
              buffer.put(c, 13);
              i += 2;
            }
            if (i < data2.length) {
              throw "illegal char at " + (i + 1);
            }
          };
          return _this;
        };
        var byteArrayOutputStream = function() {
          var _bytes = [];
          var _this = {};
          _this.writeByte = function(b) {
            _bytes.push(b & 255);
          };
          _this.writeShort = function(i) {
            _this.writeByte(i);
            _this.writeByte(i >>> 8);
          };
          _this.writeBytes = function(b, off, len) {
            off = off || 0;
            len = len || b.length;
            for (var i = 0; i < len; i += 1) {
              _this.writeByte(b[i + off]);
            }
          };
          _this.writeString = function(s) {
            for (var i = 0; i < s.length; i += 1) {
              _this.writeByte(s.charCodeAt(i));
            }
          };
          _this.toByteArray = function() {
            return _bytes;
          };
          _this.toString = function() {
            var s = "";
            s += "[";
            for (var i = 0; i < _bytes.length; i += 1) {
              if (i > 0) {
                s += ",";
              }
              s += _bytes[i];
            }
            s += "]";
            return s;
          };
          return _this;
        };
        var base64EncodeOutputStream = function() {
          var _buffer = 0;
          var _buflen = 0;
          var _length = 0;
          var _base64 = "";
          var _this = {};
          var writeEncoded = function(b) {
            _base64 += String.fromCharCode(encode(b & 63));
          };
          var encode = function(n) {
            if (n < 0) {
            } else if (n < 26) {
              return 65 + n;
            } else if (n < 52) {
              return 97 + (n - 26);
            } else if (n < 62) {
              return 48 + (n - 52);
            } else if (n == 62) {
              return 43;
            } else if (n == 63) {
              return 47;
            }
            throw "n:" + n;
          };
          _this.writeByte = function(n) {
            _buffer = _buffer << 8 | n & 255;
            _buflen += 8;
            _length += 1;
            while (_buflen >= 6) {
              writeEncoded(_buffer >>> _buflen - 6);
              _buflen -= 6;
            }
          };
          _this.flush = function() {
            if (_buflen > 0) {
              writeEncoded(_buffer << 6 - _buflen);
              _buffer = 0;
              _buflen = 0;
            }
            if (_length % 3 != 0) {
              var padlen = 3 - _length % 3;
              for (var i = 0; i < padlen; i += 1) {
                _base64 += "=";
              }
            }
          };
          _this.toString = function() {
            return _base64;
          };
          return _this;
        };
        var base64DecodeInputStream = function(str) {
          var _str = str;
          var _pos = 0;
          var _buffer = 0;
          var _buflen = 0;
          var _this = {};
          _this.read = function() {
            while (_buflen < 8) {
              if (_pos >= _str.length) {
                if (_buflen == 0) {
                  return -1;
                }
                throw "unexpected end of file./" + _buflen;
              }
              var c = _str.charAt(_pos);
              _pos += 1;
              if (c == "=") {
                _buflen = 0;
                return -1;
              } else if (c.match(/^\s$/)) {
                continue;
              }
              _buffer = _buffer << 6 | decode(c.charCodeAt(0));
              _buflen += 6;
            }
            var n = _buffer >>> _buflen - 8 & 255;
            _buflen -= 8;
            return n;
          };
          var decode = function(c) {
            if (65 <= c && c <= 90) {
              return c - 65;
            } else if (97 <= c && c <= 122) {
              return c - 97 + 26;
            } else if (48 <= c && c <= 57) {
              return c - 48 + 52;
            } else if (c == 43) {
              return 62;
            } else if (c == 47) {
              return 63;
            } else {
              throw "c:" + c;
            }
          };
          return _this;
        };
        var gifImage = function(width, height) {
          var _width = width;
          var _height = height;
          var _data = new Array(width * height);
          var _this = {};
          _this.setPixel = function(x, y, pixel) {
            _data[y * _width + x] = pixel;
          };
          _this.write = function(out) {
            out.writeString("GIF87a");
            out.writeShort(_width);
            out.writeShort(_height);
            out.writeByte(128);
            out.writeByte(0);
            out.writeByte(0);
            out.writeByte(0);
            out.writeByte(0);
            out.writeByte(0);
            out.writeByte(255);
            out.writeByte(255);
            out.writeByte(255);
            out.writeString(",");
            out.writeShort(0);
            out.writeShort(0);
            out.writeShort(_width);
            out.writeShort(_height);
            out.writeByte(0);
            var lzwMinCodeSize = 2;
            var raster = getLZWRaster(lzwMinCodeSize);
            out.writeByte(lzwMinCodeSize);
            var offset = 0;
            while (raster.length - offset > 255) {
              out.writeByte(255);
              out.writeBytes(raster, offset, 255);
              offset += 255;
            }
            out.writeByte(raster.length - offset);
            out.writeBytes(raster, offset, raster.length - offset);
            out.writeByte(0);
            out.writeString(";");
          };
          var bitOutputStream = function(out) {
            var _out = out;
            var _bitLength = 0;
            var _bitBuffer = 0;
            var _this2 = {};
            _this2.write = function(data, length) {
              if (data >>> length != 0) {
                throw "length over";
              }
              while (_bitLength + length >= 8) {
                _out.writeByte(255 & (data << _bitLength | _bitBuffer));
                length -= 8 - _bitLength;
                data >>>= 8 - _bitLength;
                _bitBuffer = 0;
                _bitLength = 0;
              }
              _bitBuffer = data << _bitLength | _bitBuffer;
              _bitLength = _bitLength + length;
            };
            _this2.flush = function() {
              if (_bitLength > 0) {
                _out.writeByte(_bitBuffer);
              }
            };
            return _this2;
          };
          var getLZWRaster = function(lzwMinCodeSize) {
            var clearCode = 1 << lzwMinCodeSize;
            var endCode = (1 << lzwMinCodeSize) + 1;
            var bitLength = lzwMinCodeSize + 1;
            var table = lzwTable();
            for (var i = 0; i < clearCode; i += 1) {
              table.add(String.fromCharCode(i));
            }
            table.add(String.fromCharCode(clearCode));
            table.add(String.fromCharCode(endCode));
            var byteOut = byteArrayOutputStream();
            var bitOut = bitOutputStream(byteOut);
            bitOut.write(clearCode, bitLength);
            var dataIndex = 0;
            var s = String.fromCharCode(_data[dataIndex]);
            dataIndex += 1;
            while (dataIndex < _data.length) {
              var c = String.fromCharCode(_data[dataIndex]);
              dataIndex += 1;
              if (table.contains(s + c)) {
                s = s + c;
              } else {
                bitOut.write(table.indexOf(s), bitLength);
                if (table.size() < 4095) {
                  if (table.size() == 1 << bitLength) {
                    bitLength += 1;
                  }
                  table.add(s + c);
                }
                s = c;
              }
            }
            bitOut.write(table.indexOf(s), bitLength);
            bitOut.write(endCode, bitLength);
            bitOut.flush();
            return byteOut.toByteArray();
          };
          var lzwTable = function() {
            var _map = {};
            var _size = 0;
            var _this2 = {};
            _this2.add = function(key) {
              if (_this2.contains(key)) {
                throw "dup key:" + key;
              }
              _map[key] = _size;
              _size += 1;
            };
            _this2.size = function() {
              return _size;
            };
            _this2.indexOf = function(key) {
              return _map[key];
            };
            _this2.contains = function(key) {
              return typeof _map[key] != "undefined";
            };
            return _this2;
          };
          return _this;
        };
        var createDataURL = function(width, height, getPixel) {
          var gif = gifImage(width, height);
          for (var y = 0; y < height; y += 1) {
            for (var x = 0; x < width; x += 1) {
              gif.setPixel(x, y, getPixel(x, y));
            }
          }
          var b = byteArrayOutputStream();
          gif.write(b);
          var base64 = base64EncodeOutputStream();
          var bytes = b.toByteArray();
          for (var i = 0; i < bytes.length; i += 1) {
            base64.writeByte(bytes[i]);
          }
          base64.flush();
          return "data:image/gif;base64," + base64;
        };
        return qrcode3;
      })();
      !(function() {
        qrcode2.stringToBytesFuncs["UTF-8"] = function(s) {
          function toUTF8Array(str) {
            var utf8 = [];
            for (var i = 0; i < str.length; i++) {
              var charcode = str.charCodeAt(i);
              if (charcode < 128) utf8.push(charcode);
              else if (charcode < 2048) {
                utf8.push(
                  192 | charcode >> 6,
                  128 | charcode & 63
                );
              } else if (charcode < 55296 || charcode >= 57344) {
                utf8.push(
                  224 | charcode >> 12,
                  128 | charcode >> 6 & 63,
                  128 | charcode & 63
                );
              } else {
                i++;
                charcode = 65536 + ((charcode & 1023) << 10 | str.charCodeAt(i) & 1023);
                utf8.push(
                  240 | charcode >> 18,
                  128 | charcode >> 12 & 63,
                  128 | charcode >> 6 & 63,
                  128 | charcode & 63
                );
              }
            }
            return utf8;
          }
          return toUTF8Array(s);
        };
      })();
      (function(factory) {
        if (typeof define === "function" && define.amd) {
          define([], factory);
        } else if (typeof exports === "object") {
          module.exports = factory();
        }
      })(function() {
        return qrcode2;
      });
    }
  });

  // ../src/index.jsx
  var index_exports = {};
  __export(index_exports, {
    AddButton: () => AddButton,
    AdminReports: () => AdminReports,
    AdminUsers: () => AdminUsers,
    Allergens: () => Allergens,
    Bill: () => Bill,
    Button: () => Button,
    CartBar: () => CartBar,
    CartPanel: () => CartPanel,
    CartaCliente: () => CartaCliente,
    CategoryBar: () => CategoryBar,
    Check: () => Check,
    Chip: () => Chip,
    ConsentCard: () => ConsentCard,
    DATA: () => data_exports,
    DietIcon: () => DietIcon,
    DishDetail: () => DishDetail,
    DishEditor: () => DishEditor,
    DishFeature: () => DishFeature,
    DishRow: () => DishRow,
    DishSheet: () => DishSheet,
    FeedbackInbox: () => FeedbackInbox,
    Field: () => Field,
    FilterChips: () => FilterChips,
    Guests: () => Guests,
    Icon: () => Icon,
    KitchenBoard: () => KitchenBoard,
    LangSwitch: () => LangSwitch,
    Leader: () => Leader,
    Logo: () => Logo,
    Money: () => Money,
    Pairing: () => Pairing,
    Phone: () => Phone,
    Plate: () => Plate,
    PrivacyNote: () => PrivacyNote,
    QRCode: () => QRCode,
    QRSheet: () => QRSheet,
    Screen: () => Screen,
    SearchField: () => SearchField,
    SectionTitle: () => SectionTitle,
    Segmented: () => Segmented,
    ServiceDock: () => ServiceDock,
    Sheet: () => Sheet,
    SlotBanner: () => SlotBanner,
    Splash: () => Splash,
    Stepper: () => Stepper,
    Story: () => Story,
    SuggestRail: () => SuggestRail,
    Switch: () => Switch,
    TableBoard: () => TableBoard,
    TableTag: () => TableTag,
    TagLabel: () => TagLabel,
    TandaCard: () => TandaCard,
    TastingMenu: () => TastingMenu,
    TenantThemes: () => TenantThemes,
    Thanks: () => Thanks,
    Toast: () => Toast,
    TopBar: () => TopBar,
    Tracker: () => Tracker,
    UTIL: () => util_exports
  });

  // ../src/core.jsx
  var import_react = __toESM(require_react());

  // ../src/logo-paths.json
  var logo_paths_default = { viewBox: [8, 8, 502, 143], glyphs: { "0": "M33.04 147.5L7.77 147.5L65.90 7.5L91.17 7.5Z", "1": "M108.58 148.21C108.31 148.13 107.97 147.9 107.83 147.71L107.56 147.36L107.53 78.18C107.5 18.66 107.52 8.93 107.68 8.57C108.07 7.63 107.19 7.69 120.06 7.65C133.1 7.61 132.44 7.57 132.89 8.55C133.11 9.04 133.12 9.75 133.12 27.91L133.12 46.76L132.81 50.66C132.64 52.81 132.39 55.66 132.25 57C131.61 63.48 131.65 64.12 132.75 64.12C133.36 64.13 133.63 63.87 135.07 61.94C139.98 55.38 148.36 50.5 157 49.2C161.85 48.46 170.94 49.16 175.69 50.62C183.64 53.08 189.26 57.8 193.55 65.64C194.55 67.47 196.55 72.75 196.89 74.48C197.03 75.21 197.28 76.38 197.44 77.06C198.79 82.87 198.81 83.59 198.81 117.94C198.81 149.87 198.87 147.47 198.08 148.05C197.57 148.43 174.6 148.47 173.9 148.09C173.07 147.63 173.12 149.66 173.12 120.52C173.12 89.6 173.11 89.1 172.13 85.29C170.61 79.35 167.06 75.47 161.5 73.65C157.89 72.46 152.38 72.52 148.94 73.78C143.01 75.94 138.32 80.46 136.14 86.12C134.85 89.49 134.29 91.47 133.76 94.5C133.21 97.65 133.21 97.55 133.13 122.88C133.06 149.51 133.12 147.67 132.32 148.1C131.83 148.37 109.44 148.47 108.58 148.21Z", "2": "M247.38 151.43C243.23 151.07 242.03 150.85 237 149.52C234.14 148.76 230.28 146.83 227.13 144.58C224.38 142.62 223.91 142.2 221.74 139.74C219.71 137.44 219.58 137.27 218.01 134.57C216.47 131.93 216.4 131.77 215.49 128.92C214.43 125.61 214.27 124.91 214.06 122.75C213.5 116.91 213.85 112.93 215.33 108.5C216.38 105.38 216.89 104.33 218.76 101.5C221.52 97.31 226.57 92.77 230.56 90.88C234.49 89.03 238.26 87.71 241.67 87C242.3 86.87 243.29 86.65 243.88 86.51C246.97 85.77 259.89 85.68 263.88 86.36C266.84 86.87 270.41 87.77 274.62 89.05C277.85 90.03 278.15 89.92 278.23 87.73C278.28 86.43 278.08 84.29 277.86 83.59C276.01 77.87 272.53 73.98 267.23 71.71C263.26 70.02 259.52 69.5 254.77 69.99C251.47 70.33 250.82 70.47 247.69 71.52C243.06 73.08 241.65 73.97 237.74 77.83C234.27 81.25 235.11 81.34 228.62 76.88C226.25 75.24 222.82 72.89 221 71.63C217.17 69 216.88 68.74 216.88 67.96C216.88 65.42 226.94 56.98 233.67 53.88C242.44 49.83 253.99 48.08 264.5 49.19C275.66 50.37 279.86 51.61 286.86 55.79C296.15 61.33 301.7 70.72 303.22 83.48L303.56 86.31L303.59 116.66C303.64 150.36 303.7 147.62 302.83 148.1C302.22 148.43 279.77 148.43 279.16 148.09C278.43 147.69 278.4 147.56 278.35 143.37C278.3 139.3 278.25 138.96 277.63 138.63C276.85 138.21 276.6 138.37 273.75 141.19C266.62 148.23 260.76 151.03 252.17 151.5C250.87 151.57 249.7 151.62 249.56 151.61C249.43 151.6 248.44 151.52 247.38 151.43Z M257.06 131.31C260.78 131.09 265.14 129.57 268.69 127.28C273.53 124.15 277.25 118.24 278 112.48C278.38 109.56 278.09 109.06 275.44 108.05C267.81 105.16 262.25 104.11 256.62 104.5C254.48 104.65 254.49 104.64 252.19 105.07C244.23 106.55 238.54 113.13 239.49 119.76C240.17 124.48 242.27 127.23 247.1 129.7C249.42 130.89 253.12 131.66 255.44 131.42C255.64 131.4 256.38 131.35 257.06 131.31Z", "3": "M401.99 147.5L321.04 147.17L320.82 146.67L320.75 145.64L320.73 129.79L320.85 128.32L321.03 127.37L321.33 126.46L321.99 125.19L322.87 124.01L324.19 122.52L356.86 87.36L367.97 75.33L368.95 74.04L322.38 73.5L322.38 51.5L401.02 51.89L401.22 52.98L401.26 55.86L401.23 69.33L401.10 70.80L400.90 71.74L400.59 72.65L399.90 73.91L399.02 75.09L397.70 76.58L390.17 84.60L385.46 89.77L377.94 97.80L353.92 123.75L353.28 124.56L353.03 125.04L401.99 125.5Z", "4": "M461.75 151.49C456.06 151.05 449.19 149.85 446.31 148.79C435.2 144.72 428.44 139.8 422.26 131.31C413.52 119.31 410.39 102.97 413.95 87.94C418.29 69.57 431.93 55.07 449.08 50.57C460.6 47.55 474.53 48.68 484.8 53.45C500.51 60.76 509.64 76.27 510.4 96.94C510.62 103 510.39 105.12 509.46 105.8L509.11 106.06L474.15 106.12C446.39 106.17 439.13 106.22 438.91 106.34C437.64 107.07 438.22 110 440.69 115.34C443 120.32 448.02 124.66 454.39 127.17C460.03 129.39 469.05 129.16 474.87 126.63C478.54 125.04 482.47 121.65 485.31 117.62C487.01 115.22 487.44 114.87 488.48 115.06C488.94 115.14 506.38 123.87 507.31 124.49C508.59 125.33 508.5 125.92 506.68 128.75C502.03 135.97 495.18 142.23 487.62 146.16C484.67 147.7 481.43 148.92 478.5 149.61C476.64 150.05 471.55 151.08 470.75 151.18C470.14 151.26 463.56 151.63 463.25 151.61C463.15 151.6 462.47 151.54 461.75 151.49Z M484.41 87.66C485.36 87.23 485.45 86.16 484.69 84.06C481.54 75.36 472.96 70 462.19 70.01C456.34 70.01 449.95 72.61 445.89 76.64C442.93 79.58 439.88 84.61 439.88 86.54C439.88 87.41 440.25 87.67 441.66 87.76C443.99 87.92 484.04 87.82 484.41 87.66Z" } };

  // ../src/data.js
  var data_exports = {};
  __export(data_exports, {
    ALLERGENS: () => ALLERGENS,
    CATEGORIES: () => CATEGORIES,
    DISH: () => DISH,
    DISHES: () => DISHES,
    PHOTO_META: () => PHOTO_META,
    RESTAURANT: () => RESTAURANT,
    TABLES: () => TABLES,
    TASTING: () => TASTING,
    TICKETS: () => TICKETS,
    photo: () => photo
  });

  // ../src/photos.json
  var photos_default = {
    "agua-smart": "img/agua-smart.webp",
    cafe: "img/cafe.webp",
    "coca-cola": "img/coca-cola.webp",
    empanadas: "img/empanadas.webp",
    hamburguesa: "img/hamburguesa.webp",
    helado: "img/helado.webp",
    medialunas: "img/medialunas.webp",
    "papas-fritas": "img/papas-fritas.webp",
    parrilla: "img/parrilla.webp",
    pizza: "img/pizza.webp",
    spaghetti: "img/spaghetti.webp",
    tiramisu: "img/tiramisu.webp",
    "vino-gran-reserva": "img/vino-gran-reserva.webp",
    "vino-malbec-reserva": "img/vino-malbec-reserva.webp",
    "vino-sauvignon-blanc": "img/vino-sauvignon-blanc.webp"
  };

  // ../src/data.js
  var photo = (key) => photos_default[key];
  var PHOTO_META = {
    pizza: { shape: "round" },
    spaghetti: { shape: "round" },
    parrilla: { shape: "round" },
    hamburguesa: { shape: "wide" },
    empanadas: { shape: "wide" },
    "papas-fritas": { shape: "wide" },
    helado: { shape: "round" },
    tiramisu: { shape: "wide" },
    cafe: { shape: "wide" },
    medialunas: { shape: "round" },
    "coca-cola": { shape: "tall" },
    "agua-smart": { shape: "tall" },
    "vino-gran-reserva": { shape: "tall" },
    "vino-malbec-reserva": { shape: "tall" },
    "vino-sauvignon-blanc": { shape: "tall" }
  };
  var RESTAURANT = {
    name: "haze",
    table: 12,
    currency: "ARS",
    googleReviewUrl: "https://g.page/r/ejemplo/review"
  };
  var CATEGORIES = [
    { id: "entradas", name: { es: "Entradas", en: "Starters", pt: "Entradas" }, slots: ["almuerzo", "merienda", "happy", "cena"] },
    { id: "pizzas", name: { es: "Pizzas", en: "Pizzas", pt: "Pizzas" }, slots: ["almuerzo", "happy", "cena"] },
    { id: "pastas", name: { es: "Pastas", en: "Pasta", pt: "Massas" }, slots: ["almuerzo", "cena"] },
    { id: "parrilla", name: { es: "Parrilla", en: "Grill", pt: "Parrilla" }, slots: ["almuerzo", "cena"] },
    { id: "hamburguesas", name: { es: "Hamburguesas", en: "Burgers", pt: "Hamb\xFArgueres" }, slots: ["almuerzo", "happy", "cena"] },
    { id: "acomp", name: { es: "Para compartir", en: "To share", pt: "Para dividir" }, slots: ["almuerzo", "happy", "cena"] },
    { id: "postres", name: { es: "Postres", en: "Desserts", pt: "Sobremesas" }, slots: ["almuerzo", "merienda", "cena"] },
    { id: "cafe", name: { es: "Cafeter\xEDa", en: "Coffee", pt: "Cafeteria" }, slots: ["desayuno", "almuerzo", "merienda", "cena"] },
    { id: "bebidas", name: { es: "Bebidas", en: "Drinks", pt: "Bebidas" }, slots: ["desayuno", "almuerzo", "merienda", "happy", "cena"] },
    { id: "vinos", name: { es: "Vinos", en: "Wines", pt: "Vinhos" }, slots: ["almuerzo", "happy", "cena"] }
  ];
  var cook = {
    id: "punto",
    label: { es: "Punto de cocci\xF3n", en: "Doneness", pt: "Ponto" },
    required: true,
    def: 1,
    options: [
      { es: "Jugoso", en: "Rare", pt: "Mal passado" },
      { es: "A punto", en: "Medium", pt: "Ao ponto" },
      { es: "Bien cocido", en: "Well done", pt: "Bem passado" }
    ]
  };
  var DISHES = [
    {
      id: "empanadas",
      cat: "entradas",
      photo: "empanadas",
      sector: "cocina",
      price: 7800,
      time: [12, 15],
      name: { es: "Empanadas de carne cortada a cuchillo", en: "Hand-cut beef empanadas", pt: "Empanadas de carne cortada \xE0 faca" },
      desc: { es: "Dos unidades, horneadas al momento. Cebolla de verdeo, comino y un hilo de aceitunas.", en: "Two pieces, baked to order. Spring onion, cumin and a thread of olives.", pt: "Duas unidades, assadas na hora. Cebolinha, cominho e um fio de azeitonas." },
      diet: [],
      allergens: ["gluten", "huevo"],
      tags: [],
      pairing: ["vino-malbec-reserva"],
      variants: [{ id: "relleno", label: { es: "Relleno", en: "Filling", pt: "Recheio" }, required: true, def: 0, options: [{ es: "Carne cortada a cuchillo", en: "Hand-cut beef", pt: "Carne cortada \xE0 faca" }, { es: "Humita", en: "Corn humita", pt: "Humita" }] }],
      extras: [{ id: "salsa", label: { es: "Salsa criolla", en: "Criolla sauce", pt: "Molho criollo" }, price: 600 }],
      story: {
        text: { es: "Se cortan a cuchillo porque la carne molida suelta el jugo y la empanada llega seca. La masa lleva grasa vacuna y se hornea en horno de barro a 280 grados.", en: "We cut the beef by hand because ground meat releases its juices and the empanada arrives dry. The dough is made with beef fat and baked in a clay oven at 280 degrees.", pt: "A carne \xE9 cortada \xE0 faca porque a mo\xEDda solta o caldo e a empanada chega seca. A massa leva gordura bovina e assa em forno de barro a 280 graus." },
        origins: [
          { ing: { es: "Carne", en: "Beef", pt: "Carne" }, who: "Frigor\xEDfico Los \xC1lamos", where: "Entre R\xEDos" },
          { ing: { es: "Cebolla de verdeo", en: "Spring onion", pt: "Cebolinha" }, who: "Quinta Don An\xEDbal", where: "Escobar" }
        ]
      }
    },
    {
      id: "pizza",
      cat: "pizzas",
      photo: "pizza",
      sector: "cocina",
      price: 16500,
      time: [18, 22],
      tags: ["popular"],
      name: { es: "Pizza de pepperoni", en: "Pepperoni pizza", pt: "Pizza de pepperoni" },
      desc: { es: "Masa de 48 horas, salsa de tomate asado, muzzarella y pepperoni curado. Or\xE9gano al salir.", en: "48-hour dough, roasted tomato sauce, mozzarella and cured pepperoni. Oregano to finish.", pt: "Massa de 48 horas, molho de tomate assado, mu\xE7arela e pepperoni curado. Or\xE9gano para finalizar." },
      diet: ["picante"],
      allergens: ["gluten", "lacteos"],
      pairing: ["vino-malbec-reserva"],
      variants: [{ id: "tam", label: { es: "Tama\xF1o", en: "Size", pt: "Tamanho" }, required: true, def: 0, options: [{ es: "Para uno", en: "Personal", pt: "Individual" }, { es: "Grande, para compartir", en: "Large, to share", pt: "Grande, para dividir", delta: 5500 }] }],
      extras: [{ id: "muzza", label: { es: "Muzzarella extra", en: "Extra mozzarella", pt: "Mu\xE7arela extra" }, price: 2200 }, { id: "aji", label: { es: "Aj\xED molido", en: "Chili flakes", pt: "Pimenta mo\xEDda" }, price: 0 }],
      removes: [{ es: "Sin or\xE9gano", en: "No oregano", pt: "Sem or\xE9gano" }]
    },
    {
      id: "spaghetti",
      cat: "pastas",
      photo: "spaghetti",
      sector: "cocina",
      price: 15800,
      time: [16, 20],
      name: { es: "Espaguetis a la bolognesa", en: "Spaghetti bolognese", pt: "Espaguete \xE0 bolonhesa" },
      desc: { es: "Pasta seca al dente con rag\xFA de cocci\xF3n lenta, tomates cherry confitados, albahaca y parmesano.", en: "Al dente dried pasta with slow-cooked rag\xF9, confit cherry tomatoes, basil and parmesan.", pt: "Massa seca al dente com ragu de cozimento lento, tomates-cereja confitados, manjeric\xE3o e parmes\xE3o." },
      diet: [],
      allergens: ["gluten", "lacteos", "apio"],
      tags: [],
      pairing: ["vino-gran-reserva"],
      extras: [{ id: "parm", label: { es: "M\xE1s parmesano", en: "Extra parmesan", pt: "Mais parmes\xE3o" }, price: 1200 }],
      removes: [{ es: "Sin albahaca", en: "No basil", pt: "Sem manjeric\xE3o" }]
    },
    {
      id: "parrilla",
      cat: "parrilla",
      photo: "parrilla",
      sector: "parrilla",
      price: 26900,
      time: [25, 30],
      tags: ["chef"],
      name: { es: "Cortes a la parrilla con papas r\xFAsticas", en: "Grilled cuts with rustic potatoes", pt: "Cortes na parrilla com batatas r\xFAsticas" },
      desc: { es: "Selecci\xF3n del parrillero sobre brasas de quebracho. Papas asadas con romero y tomate al horno.", en: "The grill master's selection over quebracho embers. Roasted potatoes with rosemary and oven tomato.", pt: "Sele\xE7\xE3o do parrillero sobre brasas de quebracho. Batatas assadas com alecrim e tomate ao forno." },
      diet: ["sintacc"],
      allergens: [],
      pairing: ["vino-malbec-reserva", "vino-gran-reserva"],
      variants: [cook, { id: "guarn", label: { es: "Guarnici\xF3n", en: "Side", pt: "Acompanhamento" }, def: 0, options: [{ es: "Papas r\xFAsticas", en: "Rustic potatoes", pt: "Batatas r\xFAsticas" }, { es: "Ensalada mixta", en: "Mixed salad", pt: "Salada mista" }, { es: "Pur\xE9 de calabaza", en: "Pumpkin pur\xE9e", pt: "Pur\xEA de ab\xF3bora", delta: 1800 }] }],
      extras: [{ id: "chimi", label: { es: "Chimichurri de la casa", en: "House chimichurri", pt: "Chimichurri da casa" }, price: 900 }, { id: "huevo", label: { es: "Huevo a la plancha", en: "Fried egg", pt: "Ovo na chapa" }, price: 1200 }],
      removes: [{ es: "Sin romero", en: "No rosemary", pt: "Sem alecrim" }],
      story: {
        text: { es: "Novillo de pastura, madurado catorce d\xEDas. El fuego se arma con quebracho blanco y espinillo; se cocina siempre del lado del hueso primero, sin apuro y sin pinchar.", en: "Grass-fed steer, aged fourteen days. The fire is built with white quebracho and espinillo; we always cook bone-side first, unhurried and without piercing.", pt: "Novilho criado a pasto, maturado por quatorze dias. O fogo \xE9 feito com quebracho-branco e espinillo; cozinhamos sempre primeiro do lado do osso, sem pressa e sem furar." },
        origins: [
          { ing: { es: "Novillo", en: "Steer", pt: "Novilho" }, who: "Estancia La Aurora", where: "Gualeguaych\xFA, Entre R\xEDos" },
          { ing: { es: "Papas", en: "Potatoes", pt: "Batatas" }, who: "Chacra Santa In\xE9s", where: "Balcarce, Buenos Aires" },
          { ing: { es: "Le\xF1a", en: "Wood", pt: "Lenha" }, who: "Hermanos Ledesma", where: "Chaco" }
        ]
      }
    },
    {
      id: "hamburguesa",
      cat: "hamburguesas",
      photo: "hamburguesa",
      sector: "parrilla",
      price: 18900,
      time: [15, 20],
      tags: ["popular"],
      name: { es: "Haze burger con papas", en: "Haze burger with fries", pt: "Haze burger com batatas" },
      desc: { es: "Medall\xF3n de 180 g sellado en plancha, cheddar, lechuga crespa y mayonesa de ajo en pan de papa con s\xE9samo.", en: "180 g patty seared on the plancha, cheddar, curly lettuce and garlic mayo on a sesame potato bun.", pt: "Hamb\xFArguer de 180 g selado na chapa, cheddar, alface crespa e maionese de alho em p\xE3o de batata com gergelim." },
      diet: [],
      allergens: ["gluten", "lacteos", "huevo", "sesamo"],
      pairing: ["coca-cola"],
      variants: [{ ...cook, def: 1 }],
      extras: [{ id: "panceta", label: { es: "Panceta ahumada", en: "Smoked bacon", pt: "Bacon defumado" }, price: 1800 }, { id: "huevo", label: { es: "Huevo frito", en: "Fried egg", pt: "Ovo frito" }, price: 1200 }, { id: "cheddar", label: { es: "Cheddar extra", en: "Extra cheddar", pt: "Cheddar extra" }, price: 1500 }],
      removes: [{ es: "Sin cebolla", en: "No onion", pt: "Sem cebola" }, { es: "Sin lechuga", en: "No lettuce", pt: "Sem alface" }, { es: "Sin mayonesa", en: "No mayo", pt: "Sem maionese" }]
    },
    {
      id: "papas-fritas",
      cat: "acomp",
      photo: "papas-fritas",
      sector: "cocina",
      price: 7200,
      time: [10, 12],
      name: { es: "Papas fritas", en: "French fries", pt: "Batatas fritas" },
      desc: { es: "Cortadas a mano, fritas dos veces en aceite de girasol. Sal marina y perejil.", en: "Hand-cut, twice-fried in sunflower oil. Sea salt and parsley.", pt: "Cortadas \xE0 m\xE3o, fritas duas vezes em \xF3leo de girassol. Sal marinho e salsinha." },
      diet: ["vegetariano", "sintacc"],
      allergens: [],
      tags: [],
      extras: [{ id: "cheddar", label: { es: "Cheddar fundido", en: "Melted cheddar", pt: "Cheddar derretido" }, price: 1500 }]
    },
    {
      id: "tiramisu",
      cat: "postres",
      photo: "tiramisu",
      sector: "postres",
      price: 8900,
      time: [5, 8],
      tags: ["novedad"],
      name: { es: "Tiramis\xFA de la casa", en: "House tiramis\xF9", pt: "Tiramis\xF9 da casa" },
      desc: { es: "Vainillas embebidas en caf\xE9, crema de mascarpone y cacao amargo. Se arma cada ma\xF1ana.", en: "Ladyfingers soaked in coffee, mascarpone cream and bitter cocoa. Made fresh every morning.", pt: "Biscoitos champanhe embebidos em caf\xE9, creme de mascarpone e cacau amargo. Feito toda manh\xE3." },
      diet: ["vegetariano"],
      allergens: ["gluten", "lacteos", "huevo"],
      pairing: ["cafe"],
      story: {
        text: { es: "Receta de la nonna de Luc\xEDa, la pastelera: sin crema de leche, con yemas batidas a ba\xF1o mar\xEDa y un caf\xE9 de tueste medio que se prepara antes del servicio.", en: "Recipe from Luc\xEDa the pastry chef's nonna: no cream, egg yolks whisked over a water bath and a medium-roast coffee brewed before service.", pt: "Receita da nonna da Luc\xEDa, a confeiteira: sem creme de leite, com gemas batidas em banho-maria e um caf\xE9 de torra m\xE9dia preparado antes do servi\xE7o." },
        origins: [{ ing: { es: "Caf\xE9", en: "Coffee", pt: "Caf\xE9" }, who: "Tostadores Zapata", where: "Palermo, CABA" }, { ing: { es: "Mascarpone", en: "Mascarpone", pt: "Mascarpone" }, who: "L\xE1cteos La Pampa", where: "Pehuaj\xF3" }]
      }
    },
    {
      id: "helado",
      cat: "postres",
      photo: "helado",
      sector: "postres",
      price: 7900,
      time: [4, 6],
      name: { es: "Helado de crema con chocolate", en: "Cream ice cream with chocolate", pt: "Sorvete de creme com chocolate" },
      desc: { es: "Tres bochas de crema de vainilla, salsa tibia de chocolate semiamargo y escamas de chocolate.", en: "Three scoops of vanilla cream, warm dark chocolate sauce and chocolate shavings.", pt: "Tr\xEAs bolas de sorvete de baunilha, calda morna de chocolate meio amargo e raspas de chocolate." },
      diet: ["vegetariano", "sintacc"],
      allergens: ["lacteos"],
      tags: [],
      pairing: ["cafe"]
    },
    {
      id: "cafe",
      cat: "cafe",
      photo: "cafe",
      sector: "barra",
      price: 3900,
      time: [3, 5],
      name: { es: "Caf\xE9 con leche", en: "Latte", pt: "Caf\xE9 com leite" },
      desc: { es: "Doble espresso de tueste medio con leche texturizada. Arte latte de la casa.", en: "Double medium-roast espresso with steamed milk. House latte art.", pt: "Espresso duplo de torra m\xE9dia com leite vaporizado. Latte art da casa." },
      diet: ["vegetariano", "sintacc"],
      allergens: ["lacteos"],
      tags: [],
      variants: [{ id: "leche", label: { es: "Leche", en: "Milk", pt: "Leite" }, def: 0, options: [{ es: "Entera", en: "Whole", pt: "Integral" }, { es: "Sin lactosa", en: "Lactose-free", pt: "Sem lactose" }, { es: "De avena", en: "Oat", pt: "De aveia", delta: 600 }] }]
    },
    {
      id: "medialunas",
      cat: "cafe",
      photo: "medialunas",
      sector: "cocina",
      price: 4800,
      time: [5, 7],
      name: { es: "Medialunas de manteca", en: "Butter croissants", pt: "Croissants de manteiga" },
      desc: { es: "Tres unidades de hojaldre de manteca, tibias. Con alm\xEDbar o sin.", en: "Three warm butter-laminated croissants. With or without syrup.", pt: "Tr\xEAs croissants folhados de manteiga, mornos. Com ou sem calda." },
      diet: ["vegetariano"],
      allergens: ["gluten", "lacteos", "huevo"],
      tags: ["popular"],
      pairing: ["cafe"],
      variants: [{ id: "alm", label: { es: "Terminaci\xF3n", en: "Finish", pt: "Finaliza\xE7\xE3o" }, def: 0, options: [{ es: "Con alm\xEDbar", en: "With syrup", pt: "Com calda" }, { es: "Sin alm\xEDbar", en: "No syrup", pt: "Sem calda" }] }]
    },
    {
      id: "coca-cola",
      cat: "bebidas",
      photo: "coca-cola",
      sector: "barra",
      price: 3600,
      time: [1, 2],
      name: { es: "Coca-Cola 500 ml", en: "Coca-Cola 500 ml", pt: "Coca-Cola 500 ml" },
      desc: { es: "Bien fr\xEDa. Con hielo y lim\xF3n si quer\xE9s.", en: "Ice cold. With ice and lemon if you like.", pt: "Bem gelada. Com gelo e lim\xE3o se quiser." },
      diet: ["vegano", "sintacc"],
      allergens: [],
      tags: [],
      variants: [{ id: "serv", label: { es: "Servicio", en: "Serving", pt: "Servi\xE7o" }, def: 0, options: [{ es: "Con hielo y lim\xF3n", en: "Ice and lemon", pt: "Gelo e lim\xE3o" }, { es: "Sin hielo", en: "No ice", pt: "Sem gelo" }] }]
    },
    {
      id: "agua-smart",
      cat: "bebidas",
      photo: "agua-smart",
      sector: "barra",
      price: 4200,
      time: [1, 2],
      soldOut: true,
      name: { es: "Agua sin gas 1,5 L", en: "Still water 1.5 L", pt: "\xC1gua sem g\xE1s 1,5 L" },
      desc: { es: "Agua mineralizada con electrolitos, sin gas.", en: "Mineralized still water with electrolytes.", pt: "\xC1gua mineralizada com eletr\xF3litos, sem g\xE1s." },
      diet: ["vegano", "sintacc"],
      allergens: [],
      tags: []
    },
    {
      id: "vino-gran-reserva",
      cat: "vinos",
      photo: "vino-gran-reserva",
      sector: "barra",
      price: 38e3,
      time: [2, 4],
      tags: ["chef"],
      name: { es: "Gran Reserva", en: "Gran Reserva", pt: "Gran Reserva" },
      desc: { es: "Tinto de Mendoza, Hector Durigutti. Fruta negra, especias dulces y taninos firmes.", en: "Red from Mendoza, Hector Durigutti. Black fruit, sweet spice and firm tannins.", pt: "Tinto de Mendoza, Hector Durigutti. Frutas negras, especiarias doces e taninos firmes." },
      diet: ["vegano"],
      allergens: ["sulfitos"],
      unit: { es: "Botella 750 ml", en: "750 ml bottle", pt: "Garrafa 750 ml" },
      pairing: []
    },
    {
      id: "vino-malbec-reserva",
      cat: "vinos",
      photo: "vino-malbec-reserva",
      sector: "barra",
      price: 29500,
      time: [2, 4],
      tags: ["popular"],
      name: { es: "Malbec Reserva", en: "Malbec Reserva", pt: "Malbec Reserva" },
      desc: { es: "Malbec de Mendoza, Hector Durigutti. Ciruela, violeta y un final largo de cacao.", en: "Malbec from Mendoza, Hector Durigutti. Plum, violet and a long cocoa finish.", pt: "Malbec de Mendoza, Hector Durigutti. Ameixa, violeta e final longo de cacau." },
      diet: ["vegano"],
      allergens: ["sulfitos"],
      unit: { es: "Botella 750 ml", en: "750 ml bottle", pt: "Garrafa 750 ml" },
      pairing: []
    },
    {
      id: "vino-sauvignon-blanc",
      cat: "vinos",
      photo: "vino-sauvignon-blanc",
      sector: "barra",
      price: 24e3,
      time: [2, 4],
      name: { es: "Los Riscos Sauvignon Blanc", en: "Los Riscos Sauvignon Blanc", pt: "Los Riscos Sauvignon Blanc" },
      desc: { es: "Blanco reserva de Vi\xF1a Requingua, Chile. C\xEDtrico, herbal y de acidez vibrante.", en: "Reserva white from Vi\xF1a Requingua, Chile. Citrus, herbal, with vibrant acidity.", pt: "Branco reserva da Vi\xF1a Requingua, Chile. C\xEDtrico, herbal e de acidez vibrante." },
      diet: ["vegano"],
      allergens: ["sulfitos"],
      unit: { es: "Botella 750 ml", en: "750 ml bottle", pt: "Garrafa 750 ml" },
      pairing: []
    }
  ];
  var DISH = Object.fromEntries(DISHES.map((d) => [d.id, d]));
  var ALLERGENS = {
    gluten: { es: "Gluten", en: "Gluten", pt: "Gl\xFAten" },
    lacteos: { es: "L\xE1cteos", en: "Dairy", pt: "Latic\xEDnios" },
    huevo: { es: "Huevo", en: "Egg", pt: "Ovo" },
    apio: { es: "Apio", en: "Celery", pt: "Aipo" },
    sesamo: { es: "S\xE9samo", en: "Sesame", pt: "Gergelim" },
    sulfitos: { es: "Sulfitos", en: "Sulphites", pt: "Sulfitos" }
  };
  var TASTING = {
    title: { es: "Noche de Malbec", en: "Malbec Night", pt: "Noite de Malbec" },
    sub: { es: "Cuatro pasos con maridaje \xB7 jueves 29 de octubre \xB7 21:00", en: "Four courses with pairing \xB7 Thursday, October 29 \xB7 9:00 pm", pt: "Quatro etapas com harmoniza\xE7\xE3o \xB7 quinta, 29 de outubro \xB7 21:00" },
    price: 58e3,
    steps: [
      { n: "I", dish: "empanadas", title: { es: "Empanada de carne cortada a cuchillo", en: "Hand-cut beef empanada", pt: "Empanada de carne cortada \xE0 faca" }, wine: { es: "Los Riscos Sauvignon Blanc, copa", en: "Los Riscos Sauvignon Blanc, glass", pt: "Los Riscos Sauvignon Blanc, ta\xE7a" }, at: "21:00" },
      { n: "II", dish: "spaghetti", title: { es: "Espaguetis con rag\xFA de cocci\xF3n lenta", en: "Spaghetti with slow-cooked rag\xF9", pt: "Espaguete com ragu de cozimento lento" }, wine: { es: "Malbec Reserva, copa", en: "Malbec Reserva, glass", pt: "Malbec Reserva, ta\xE7a" }, at: "21:25" },
      { n: "III", dish: "parrilla", title: { es: "Cortes del parrillero y papas r\xFAsticas", en: "Grill master's cuts and rustic potatoes", pt: "Cortes do parrillero e batatas r\xFAsticas" }, wine: { es: "Gran Reserva, copa", en: "Gran Reserva, glass", pt: "Gran Reserva, ta\xE7a" }, at: "21:55" },
      { n: "IV", dish: "tiramisu", title: { es: "Tiramis\xFA y caf\xE9 de especialidad", en: "Tiramis\xF9 and specialty coffee", pt: "Tiramis\xF9 e caf\xE9 especial" }, wine: { es: "Caf\xE9 de filtro", en: "Filter coffee", pt: "Caf\xE9 coado" }, at: "22:30" }
    ]
  };
  var TICKETS = [
    { id: "a1", mesa: 7, tanda: 1, sector: "parrilla", status: "nuevo", mins: 0.4, items: [{ q: 2, name: "Cortes a la parrilla", mods: ["Punto: a punto", "Guarnici\xF3n: ensalada mixta"], note: "" }, { q: 1, name: "Haze burger", mods: ["Punto: bien cocido", "SIN CEBOLLA"], note: "Alergia al man\xED" }] },
    { id: "a2", mesa: 12, tanda: 2, sector: "cocina", status: "nuevo", mins: 1.2, items: [{ q: 1, name: "Pizza de pepperoni", mods: ["Grande", "+ Muzzarella extra"], note: "" }, { q: 1, name: "Papas fritas", mods: [], note: "Salen con la pizza" }] },
    { id: "a3", mesa: 3, tanda: 1, sector: "cocina", status: "prep", mins: 9.5, items: [{ q: 2, name: "Empanadas de carne", mods: ["Carne cortada a cuchillo"], note: "" }, { q: 1, name: "Espaguetis bolognesa", mods: ["SIN ALBAHACA"], note: "" }] },
    { id: "a4", mesa: 9, tanda: 1, sector: "parrilla", status: "prep", mins: 17.2, items: [{ q: 3, name: "Cortes a la parrilla", mods: ["Punto: jugoso", "Guarnici\xF3n: papas r\xFAsticas"], note: "Cumplea\xF1os, sale con vela" }] },
    { id: "a5", mesa: 5, tanda: 2, sector: "barra", status: "prep", mins: 3.1, items: [{ q: 2, name: "Malbec Reserva", mods: ["Botella", "Descorchar en mesa"], note: "" }, { q: 1, name: "Coca-Cola 500 ml", mods: ["Sin hielo"], note: "" }] },
    { id: "a6", mesa: 2, tanda: 1, sector: "postres", status: "listo", mins: 6, items: [{ q: 2, name: "Tiramis\xFA de la casa", mods: [], note: "" }, { q: 2, name: "Caf\xE9 con leche", mods: ["Leche de avena"], note: "" }] }
  ];
  var TABLES = [
    { n: 1, status: "libre" },
    { n: 2, status: "servida", call: false, amount: 41200 },
    { n: 3, status: "prep", amount: 33400 },
    { n: 4, status: "libre" },
    { n: 5, status: "prep", amount: 71e3 },
    { n: 6, status: "pidio", amount: 18900, call: false },
    { n: 7, status: "pidio", amount: 62300, call: true, callMins: 2 },
    { n: 8, status: "libre" },
    { n: 9, status: "prep", amount: 80700 },
    { n: 10, status: "cuenta", amount: 56800 },
    { n: 11, status: "libre" },
    { n: 12, status: "servida", amount: 44100 }
  ];

  // ../src/util.js
  var util_exports = {};
  __export(util_exports, {
    LANGS: () => LANGS,
    SLOTS: () => SLOTS,
    STR: () => STR,
    clock: () => clock,
    loc: () => loc,
    money: () => money,
    pad2: () => pad2,
    slotAt: () => slotAt,
    tr: () => tr
  });
  var LANGS = [
    { id: "es", label: "ES", name: "Espa\xF1ol" },
    { id: "en", label: "EN", name: "English" },
    { id: "pt", label: "PT", name: "Portugu\xEAs" }
  ];
  var money = (n) => "$" + Math.round(n).toLocaleString("es-AR");
  var pad2 = (n) => String(n).padStart(2, "0");
  var clock = (h) => `${pad2(Math.floor(h) % 24)}:${pad2(Math.round(h % 1 * 60))}`;
  var SLOTS = [
    { id: "desayuno", from: 7, to: 11.5, theme: "dia", label: { es: "Desayuno", en: "Breakfast", pt: "Caf\xE9 da manh\xE3" } },
    { id: "almuerzo", from: 11.5, to: 16, theme: "dia", label: { es: "Almuerzo", en: "Lunch", pt: "Almo\xE7o" } },
    { id: "merienda", from: 16, to: 18, theme: "dia", label: { es: "Merienda", en: "Afternoon", pt: "Lanche" } },
    { id: "happy", from: 18, to: 20, theme: "noche", label: { es: "Happy hour", en: "Happy hour", pt: "Happy hour" } },
    { id: "cena", from: 20, to: 25, theme: "noche", label: { es: "Cena", en: "Dinner", pt: "Jantar" } }
  ];
  function slotAt(hour) {
    const h = hour < 7 ? hour + 24 : hour;
    return SLOTS.find((s) => h >= s.from && h < s.to) || SLOTS[SLOTS.length - 1];
  }
  var STR = {
    es: {
      table: "Mesa",
      search: "Buscar en la carta",
      add: "Agregar",
      soldOut: "Agotado hoy",
      callWaiter: "Llamar al mozo",
      waiterCalled: "Mozo avisado",
      askBill: "Pedir la cuenta",
      billAsked: "Cuenta pedida",
      myOrder: "Mi pedido",
      yourOrder: "Tu pedido",
      confirmOrder: "Confirmar pedido",
      sentToKitchen: "Pedido enviado",
      allergens: "Al\xE9rgenos",
      contains: "Contiene",
      noAllergens: "Sin al\xE9rgenos declarados",
      choose: "Eleg\xED",
      extras: "Extras",
      remove: "Sacar",
      notes: "Aclaraciones para la cocina",
      notesPh: "Ej.: sin cebolla, alergia a los frutos secos",
      pairing: "Va bien con",
      story: "Historia del plato",
      origin: "Origen",
      min: "min",
      recommended: "Recomendado del chef",
      novelty: "Novedad",
      popular: "M\xE1s pedido",
      vegan: "Vegano",
      vegetarian: "Vegetariano",
      glutenFree: "Sin TACC",
      spicy: "Picante",
      dairyFree: "Sin l\xE1cteos",
      batch: "Tanda",
      received: "Recibido",
      preparing: "En preparaci\xF3n",
      ready: "Listo",
      served: "Servido",
      suggest: "Sum\xE1 algo m\xE1s",
      total: "Total",
      subtotal: "Subtotal",
      tip: "Propina",
      noTip: "Sin propina",
      other: "Otro",
      split: "Dividir la cuenta",
      splitAll: "Todo junto",
      splitEqual: "Partes iguales",
      splitItems: "Por \xEDtem",
      eachPays: "cada uno",
      yourShare: "Tu parte",
      people: "Personas",
      payMP: "Pagar con Mercado Pago",
      payCard: "Tarjeta de cr\xE9dito o d\xE9bito",
      payNote: "No guardamos los datos de tu tarjeta. El cobro lo procesa Mercado Pago.",
      receipt: "Comprobante",
      receiptBy: "Envi\xE1rmelo por",
      email: "Mail",
      whatsapp: "WhatsApp",
      thanks: "Gracias por venir",
      thanksSub: "Tu opini\xF3n nos ayuda a seguir mejorando. Eleg\xED lo que prefieras.",
      privateFb: "Contanos en privado c\xF3mo estuvo",
      privateFbSub: "Llega directo al due\xF1o. No se publica.",
      googleFb: "Dej\xE1 tu rese\xF1a en Google",
      googleFbSub: "Se abre Google Maps con la rese\xF1a lista.",
      yourScore: "Tu puntaje",
      comment: "Comentarios",
      send: "Enviar",
      sent: "Recibido, gracias.",
      menuUntil: "Men\xFA hasta las",
      welcomeDay: "Buen d\xEDa",
      welcomeNight: "Buenas noches",
      guests: "En la mesa",
      you: "Vos",
      addedBy: "Sum\xF3",
      empty: "Todav\xEDa no pediste nada",
      lang: "Idioma",
      all: "Todo",
      from: "Desde",
      event: "Men\xFA degustaci\xF3n",
      perPerson: "por persona",
      confirmTable: "Reservar mi lugar"
    },
    en: {
      table: "Table",
      search: "Search the menu",
      add: "Add",
      soldOut: "Sold out today",
      callWaiter: "Call the waiter",
      waiterCalled: "Waiter notified",
      askBill: "Ask for the bill",
      billAsked: "Bill requested",
      myOrder: "My order",
      yourOrder: "Your order",
      confirmOrder: "Confirm order",
      sentToKitchen: "Order sent",
      allergens: "Allergens",
      contains: "Contains",
      noAllergens: "No declared allergens",
      choose: "Choose",
      extras: "Extras",
      remove: "Remove",
      notes: "Notes for the kitchen",
      notesPh: "E.g. no onion, nut allergy",
      pairing: "Pairs well with",
      story: "The story",
      origin: "Origin",
      min: "min",
      recommended: "Chef's pick",
      novelty: "New",
      popular: "Most ordered",
      vegan: "Vegan",
      vegetarian: "Vegetarian",
      glutenFree: "Gluten-free",
      spicy: "Spicy",
      dairyFree: "Dairy-free",
      batch: "Round",
      received: "Received",
      preparing: "Preparing",
      ready: "Ready",
      served: "Served",
      suggest: "Add something else",
      total: "Total",
      subtotal: "Subtotal",
      tip: "Tip",
      noTip: "No tip",
      other: "Other",
      split: "Split the bill",
      splitAll: "Together",
      splitEqual: "Equal parts",
      splitItems: "By item",
      eachPays: "each",
      yourShare: "Your share",
      people: "People",
      payMP: "Pay with Mercado Pago",
      payCard: "Credit or debit card",
      payNote: "We never store your card details. Mercado Pago processes the payment.",
      receipt: "Receipt",
      receiptBy: "Send it by",
      email: "Email",
      whatsapp: "WhatsApp",
      thanks: "Thank you for coming",
      thanksSub: "Your opinion helps us improve. Choose what you prefer.",
      privateFb: "Tell us privately how it was",
      privateFbSub: "Goes straight to the owner. Never published.",
      googleFb: "Leave a Google review",
      googleFbSub: "Opens Google Maps with the review ready.",
      yourScore: "Your score",
      comment: "Comments",
      send: "Send",
      sent: "Received, thank you.",
      menuUntil: "Menu until",
      welcomeDay: "Good day",
      welcomeNight: "Good evening",
      guests: "At the table",
      you: "You",
      addedBy: "Added by",
      empty: "You haven't ordered yet",
      lang: "Language",
      all: "All",
      from: "From",
      event: "Tasting menu",
      perPerson: "per person",
      confirmTable: "Book my seat"
    },
    pt: {
      table: "Mesa",
      search: "Buscar no card\xE1pio",
      add: "Adicionar",
      soldOut: "Esgotado hoje",
      callWaiter: "Chamar o gar\xE7om",
      waiterCalled: "Gar\xE7om avisado",
      askBill: "Pedir a conta",
      billAsked: "Conta pedida",
      myOrder: "Meu pedido",
      yourOrder: "Seu pedido",
      confirmOrder: "Confirmar pedido",
      sentToKitchen: "Pedido enviado",
      allergens: "Al\xE9rgenos",
      contains: "Cont\xE9m",
      noAllergens: "Sem al\xE9rgenos declarados",
      choose: "Escolha",
      extras: "Extras",
      remove: "Tirar",
      notes: "Observa\xE7\xF5es para a cozinha",
      notesPh: "Ex.: sem cebola, alergia a castanhas",
      pairing: "Combina com",
      story: "A hist\xF3ria do prato",
      origin: "Origem",
      min: "min",
      recommended: "Indica\xE7\xE3o do chef",
      novelty: "Novidade",
      popular: "Mais pedido",
      vegan: "Vegano",
      vegetarian: "Vegetariano",
      glutenFree: "Sem gl\xFAten",
      spicy: "Picante",
      dairyFree: "Sem lactose",
      batch: "Rodada",
      received: "Recebido",
      preparing: "Em preparo",
      ready: "Pronto",
      served: "Servido",
      suggest: "Adicione mais algo",
      total: "Total",
      subtotal: "Subtotal",
      tip: "Gorjeta",
      noTip: "Sem gorjeta",
      other: "Outro",
      split: "Dividir a conta",
      splitAll: "Tudo junto",
      splitEqual: "Partes iguais",
      splitItems: "Por item",
      eachPays: "cada um",
      yourShare: "Sua parte",
      people: "Pessoas",
      payMP: "Pagar com Mercado Pago",
      payCard: "Cart\xE3o de cr\xE9dito ou d\xE9bito",
      payNote: "N\xE3o guardamos os dados do seu cart\xE3o. O Mercado Pago processa a cobran\xE7a.",
      receipt: "Comprovante",
      receiptBy: "Enviar por",
      email: "E-mail",
      whatsapp: "WhatsApp",
      thanks: "Obrigado pela visita",
      thanksSub: "Sua opini\xE3o nos ajuda a melhorar. Escolha o que preferir.",
      privateFb: "Conte em privado como foi",
      privateFbSub: "Chega direto ao dono. N\xE3o \xE9 publicado.",
      googleFb: "Deixe sua avalia\xE7\xE3o no Google",
      googleFbSub: "Abre o Google Maps com a avalia\xE7\xE3o pronta.",
      yourScore: "Sua nota",
      comment: "Coment\xE1rios",
      send: "Enviar",
      sent: "Recebido, obrigado.",
      menuUntil: "Card\xE1pio at\xE9 as",
      welcomeDay: "Bom dia",
      welcomeNight: "Boa noite",
      guests: "Na mesa",
      you: "Voc\xEA",
      addedBy: "Adicionou",
      empty: "Voc\xEA ainda n\xE3o pediu nada",
      lang: "Idioma",
      all: "Tudo",
      from: "A partir de",
      event: "Menu degusta\xE7\xE3o",
      perPerson: "por pessoa",
      confirmTable: "Reservar meu lugar"
    }
  };
  var tr = (lang, key) => STR[lang] && STR[lang][key] || STR.es[key] || key;
  var loc = (obj, lang) => obj && typeof obj === "object" ? obj[lang] || obj.es : obj;

  // ../src/core.jsx
  var P = {
    plus: "M12 5v14M5 12h14",
    minus: "M5 12h14",
    close: "M6 6l12 12M18 6L6 18",
    check: "M5 12.5l4.5 4.5L19 7.5",
    clock: "M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 7.5V12l3 2",
    bell: "M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15zM10 20.5a2 2 0 0 0 4 0",
    receipt: "M6.5 3.5h11v17l-2.75-1.6-2.75 1.6-2.75-1.6-2.75 1.6zM9.5 8.5h5M9.5 12h5",
    search: "M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM16 16l4 4",
    arrow: "M5 12h14M13 6l6 6-6 6",
    external: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
    star: "M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z",
    leaf: "M5 19c0-8 5-13 14-14 0 9-5 14-13 14zM5 19c3-5 6-8 10-10",
    sprout: "M12 20v-7M12 13c0-4-3-6-7-6 0 4 3 6 7 6zM12 11c0-3 2.5-5 6-5 0 3.5-2.5 5-6 5z",
    wheat: "M12 21V9M12 9c-2.500 0-4-1.500-4-4 2.500 0 4 1.500 4 4zM12 9c2.500 0 4-1.500 4-4-2.500 0-4 1.500-4 4zM12 14c-2.500 0-4-1.500-4-4M12 14c2.500 0 4-1.500 4-4M4 4l16 16",
    chili: "M15.500 5.500c3 .5 5 3.500 3.500 7.500-1.800 4.800-7 7-13 6 5-1 8.500-3 9-7.500.3-2.600 0-4 .5-6zM15.500 5.500c.5-1.500 1.500-2.300 3-2.500",
    dropoff: "M12 3.500c3.500 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2.500-6 6-10zM4 4l16 16",
    glass: "M8 3.500h8c0 5-1 8-4 8.500S8 8.500 8 3.500zM12 12v8M8.500 20.500h7",
    printer: "M7 9V4h10v5M7 17H5v-6h14v6h-2M7 14h10v6H7z",
    volume: "M4 10v4h3.500L12 18V6L7.500 10zM15.500 9c1.300 1.500 1.300 4.500 0 6M18 7c2.200 2.700 2.200 7.300 0 10",
    alert: "M12 4l9 16H3zM12 10v4M12 17h.01",
    qr: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2M14 18h2v2M18 18h2v2",
    download: "M12 4v11M7.500 10.500L12 15l4.500-4.500M5 20h14",
    user: "M12 4.500a3.500 3.500 0 1 0 0 7 3.500 3.500 0 0 0 0-7zM5 20c.5-4 3.500-6 7-6s6.500 2 7 6",
    down: "M6 9l6 6 6-6",
    right: "M9 6l6 6-6 6",
    left: "M15 6l-6 6 6 6",
    edit: "M4 20l1-4L16.500 4.500a1.700 1.700 0 0 1 2.400 0l.6.6a1.700 1.700 0 0 1 0 2.400L8 19z",
    pause: "M8 5v14M16 5v14",
    play: "M7 5l12 7-12 7z",
    mail: "M4.500 5.500h15a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1zM4 7l8 6 8-6",
    chat: "M5 19l1.200-3.700A7.500 7.500 0 1 1 9 18z",
    lock: "M6 10.500h12a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.500a1 1 0 0 1 1-1zM8 10.500V8a4 4 0 0 1 8 0v2.500",
    card: "M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM3 10h18M6.500 15h3",
    flame: "M12 3c1 3.500 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3.500 2-4.500.2 1.500 1 2 2 2-.5-3 0-5 1-7.500z",
    chart: "M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6",
    users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3.500 19c.4-3.200 2.700-5 5.500-5s5.100 1.800 5.500 5M16 5.300a3 3 0 0 1 0 5.400M17.500 14.200c1.600.6 2.700 2.100 3 4.800",
    tag: "M3.500 12.500V4.500h8l9 9-8 8zM8 8.500h.01",
    tune: "M4 7h9M17 7h3M4 17h3M11 17h9M15 4v6M9 14v6",
    home: "M4 11l8-7 8 7v8.500a.5.5 0 0 1-.5.5H15v-6H9v6H4.500a.5.5 0 0 1-.5-.5z",
    copy: "M9 9h10v11H9zM5 15V4h10",
    dot: "M12 12h.01"
  };
  function Icon({ name, size = 20, className = "", style }) {
    return /* @__PURE__ */ import_react.default.createElement(
      "svg",
      {
        className: `hz-icon ${className}`,
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        style
      },
      /* @__PURE__ */ import_react.default.createElement("path", { d: P[name] || P.dot })
    );
  }
  function Logo({ height = 28, mono = false, animate = false, className = "", label = "haze" }) {
    const [x, y, w, h] = logo_paths_default.viewBox;
    const pad = 4;
    const g = logo_paths_default.glyphs;
    return /* @__PURE__ */ import_react.default.createElement(
      "svg",
      {
        className: `hz-logo${mono ? " hz-logo--mono" : ""}${animate ? " hz-logo--in" : ""} ${className}`,
        viewBox: `${x - pad} ${y - pad} ${w + pad * 2} ${h + pad * 2}`,
        height,
        style: { width: height * (w + pad * 2) / (h + pad * 2) },
        role: "img",
        "aria-label": label
      },
      /* @__PURE__ */ import_react.default.createElement("path", { className: "hz-logo__slash", fillRule: "evenodd", d: g["0"] }),
      /* @__PURE__ */ import_react.default.createElement("g", { className: "hz-logo__word" }, /* @__PURE__ */ import_react.default.createElement("path", { fillRule: "evenodd", d: g["1"] }), /* @__PURE__ */ import_react.default.createElement("path", { fillRule: "evenodd", d: g["2"] }), /* @__PURE__ */ import_react.default.createElement("path", { fillRule: "evenodd", d: g["3"] }), /* @__PURE__ */ import_react.default.createElement("path", { fillRule: "evenodd", d: g["4"] }))
    );
  }
  function Plate({ photo: photo2, size = 96, ring = true, off = false, shape, className = "" }) {
    const s = shape || PHOTO_META[photo2] && PHOTO_META[photo2].shape || "round";
    return /* @__PURE__ */ import_react.default.createElement("span", { className: `hz-plate hz-plate--${s}${ring ? " hz-plate--ring" : ""}${off ? " is-off" : ""} ${className}`, style: { "--s": size + "px" } }, /* @__PURE__ */ import_react.default.createElement("span", { className: "hz-plate__bed" }), /* @__PURE__ */ import_react.default.createElement("img", { className: "hz-plate__img", src: photo(photo2), alt: "", loading: "lazy", decoding: "async", draggable: "false" }));
  }
  var DIET = {
    vegano: { icon: "leaf", key: "vegan" },
    vegetariano: { icon: "sprout", key: "vegetarian" },
    sintacc: { icon: "wheat", key: "glutenFree" },
    picante: { icon: "chili", key: "spicy" },
    sinlacteos: { icon: "dropoff", key: "dairyFree" }
  };
  var DIET_IDS = Object.keys(DIET);
  function DietIcon({ id, lang = "es", size = 16, withLabel = false }) {
    const d = DIET[id];
    if (!d) return null;
    const label = tr(lang, d.key);
    return /* @__PURE__ */ import_react.default.createElement("span", { className: `hz-diet${withLabel ? " hz-diet--label" : ""}`, title: label, "aria-label": withLabel ? void 0 : label, role: withLabel ? void 0 : "img" }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: d.icon, size }), withLabel && /* @__PURE__ */ import_react.default.createElement("span", null, label));
  }
  var TAGS = { chef: { icon: "star", key: "recommended" }, novedad: { icon: "dot", key: "novelty", slash: true }, popular: { icon: "flame", key: "popular" } };
  function TagLabel({ id, lang = "es" }) {
    const t = TAGS[id];
    if (!t) return null;
    return /* @__PURE__ */ import_react.default.createElement("span", { className: "hz-tag label-caps" }, t.slash ? /* @__PURE__ */ import_react.default.createElement("span", { className: "hz-tag__slash", "aria-hidden": "true" }, "/") : /* @__PURE__ */ import_react.default.createElement(Icon, { name: t.icon, size: 12 }), tr(lang, t.key));
  }
  function Money({ v, className = "" }) {
    return /* @__PURE__ */ import_react.default.createElement("span", { className: `price hz-money ${className}` }, /* @__PURE__ */ import_react.default.createElement("span", { className: "hz-money__cur" }, "$"), Math.round(v).toLocaleString("es-AR"));
  }
  function Button({ kind = "primary", icon, children, block, className = "", ...rest }) {
    return /* @__PURE__ */ import_react.default.createElement("button", { type: "button", className: `hz-btn hz-btn--${kind}${block ? " hz-btn--block" : ""} button ${className}`, ...rest }, icon && /* @__PURE__ */ import_react.default.createElement(Icon, { name: icon, size: 18 }), children);
  }
  function Chip({ active, icon, children, onClick, className = "" }) {
    return /* @__PURE__ */ import_react.default.createElement("button", { type: "button", className: `hz-chip${active ? " is-on" : ""} ${className}`, "aria-pressed": !!active, onClick }, icon && /* @__PURE__ */ import_react.default.createElement(Icon, { name: icon, size: 16 }), /* @__PURE__ */ import_react.default.createElement("span", null, children));
  }
  function Segmented({ options, value, onChange, label, className = "" }) {
    return /* @__PURE__ */ import_react.default.createElement("div", { className: `hz-seg ${className}`, role: "radiogroup", "aria-label": label }, options.map((o) => /* @__PURE__ */ import_react.default.createElement("button", { key: o.id, type: "button", role: "radio", "aria-checked": value === o.id, className: value === o.id ? "is-on" : "", onClick: () => onChange && onChange(o.id) }, o.label)));
  }
  function Stepper({ value, onChange, min = 0, max = 99, size = "md", label = "" }) {
    return /* @__PURE__ */ import_react.default.createElement("div", { className: `hz-step hz-step--${size}`, role: "group", "aria-label": label }, /* @__PURE__ */ import_react.default.createElement("button", { type: "button", "aria-label": "Quitar uno", disabled: value <= min, onClick: () => onChange(Math.max(min, value - 1)) }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "minus", size: size === "sm" ? 16 : 20 })), /* @__PURE__ */ import_react.default.createElement("output", { "aria-live": "polite", className: "price" }, value), /* @__PURE__ */ import_react.default.createElement("button", { type: "button", "aria-label": "Sumar uno", disabled: value >= max, onClick: () => onChange(Math.min(max, value + 1)) }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "plus", size: size === "sm" ? 16 : 20 })));
  }
  function Field({ label, children, hint }) {
    return /* @__PURE__ */ import_react.default.createElement("label", { className: "hz-field" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "label-caps hz-field__label" }, label), children, hint && /* @__PURE__ */ import_react.default.createElement("span", { className: "hz-field__hint caption" }, hint));
  }
  function Check({ checked, onChange, children, sub, price }) {
    return /* @__PURE__ */ import_react.default.createElement("label", { className: `hz-check${checked ? " is-on" : ""}` }, /* @__PURE__ */ import_react.default.createElement("input", { type: "checkbox", checked: !!checked, onChange: (e) => onChange && onChange(e.target.checked) }), /* @__PURE__ */ import_react.default.createElement("span", { className: "hz-check__box" }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "check", size: 14 })), /* @__PURE__ */ import_react.default.createElement("span", { className: "hz-check__text" }, /* @__PURE__ */ import_react.default.createElement("span", null, children), sub && /* @__PURE__ */ import_react.default.createElement("small", { className: "caption" }, sub)), price !== void 0 && /* @__PURE__ */ import_react.default.createElement("span", { className: "hz-check__price price" }, price > 0 ? "+" + money(price) : ""));
  }
  function Sheet({ open, onClose, children, label, tall = false }) {
    return /* @__PURE__ */ import_react.default.createElement("div", { className: `hz-sheetwrap${open ? " is-open" : ""}`, "aria-hidden": !open }, /* @__PURE__ */ import_react.default.createElement("div", { className: "hz-scrim", onClick: onClose }), /* @__PURE__ */ import_react.default.createElement("section", { className: `hz-sheet${tall ? " hz-sheet--tall" : ""}`, role: "dialog", "aria-modal": "true", "aria-label": label }, /* @__PURE__ */ import_react.default.createElement("span", { className: "hz-sheet__grip", "aria-hidden": "true" }), children));
  }
  function SectionTitle({ children, aside, className = "" }) {
    return /* @__PURE__ */ import_react.default.createElement("div", { className: `hz-sectiontitle ${className}` }, /* @__PURE__ */ import_react.default.createElement("h2", { className: "display-md" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "hz-slash", "aria-hidden": "true" }, "/"), children), aside && /* @__PURE__ */ import_react.default.createElement("span", { className: "caption hz-sectiontitle__aside" }, aside));
  }

  // ../src/carta.jsx
  var import_react2 = __toESM(require_react());
  function Splash({ lang = "es", table = 12, slot, onDone, autoMs = 3e3, replayKey = 0 }) {
    const [gone, setGone] = (0, import_react2.useState)(false);
    const fin = (0, import_react2.useRef)(false);
    const timers = (0, import_react2.useRef)([]);
    const finish = () => {
      if (fin.current) return;
      fin.current = true;
      setGone(true);
      if (onDone) timers.current.push(setTimeout(onDone, 700));
    };
    (0, import_react2.useEffect)(() => {
      fin.current = false;
      setGone(false);
      timers.current.push(setTimeout(finish, autoMs));
      return () => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
      };
    }, [replayKey, autoMs]);
    return /* @__PURE__ */ import_react2.default.createElement("div", { className: `hz-splash${gone ? " is-gone" : ""}`, key: replayKey, "aria-hidden": gone, onClick: finish }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "hz-splash__haze" }), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hz-splash__center" }, /* @__PURE__ */ import_react2.default.createElement(Logo, { height: 74, animate: true, className: "hz-splash__logo" }), /* @__PURE__ */ import_react2.default.createElement("p", { className: "hz-splash__line label-caps" }, tr(lang, "table"), " ", table, slot ? /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement("span", { "aria-hidden": "true" }, " \xB7 "), loc(slot.label, lang)) : null)), /* @__PURE__ */ import_react2.default.createElement("span", { className: "hz-splash__bar" }));
  }
  function LangSwitch({ lang, onChange }) {
    return /* @__PURE__ */ import_react2.default.createElement("div", { className: "hz-lang", role: "radiogroup", "aria-label": tr(lang, "lang") }, LANGS.map((l, i) => /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, { key: l.id }, i > 0 && /* @__PURE__ */ import_react2.default.createElement("span", { className: "hz-lang__rule", "aria-hidden": "true" }), /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", role: "radio", "aria-checked": lang === l.id, lang: l.id, title: l.name, className: lang === l.id ? "is-on" : "", onClick: () => onChange && onChange(l.id) }, l.label))));
  }
  function TableTag({ n = 12, lang = "es" }) {
    return /* @__PURE__ */ import_react2.default.createElement("span", { className: "hz-table label-caps" }, /* @__PURE__ */ import_react2.default.createElement("span", null, tr(lang, "table")), /* @__PURE__ */ import_react2.default.createElement("b", { className: "price" }, n));
  }
  function TopBar({ lang, onLang, table = 12 }) {
    return /* @__PURE__ */ import_react2.default.createElement("header", { className: "hz-top" }, /* @__PURE__ */ import_react2.default.createElement(Logo, { height: 24 }), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hz-top__right" }, /* @__PURE__ */ import_react2.default.createElement(LangSwitch, { lang, onChange: onLang }), /* @__PURE__ */ import_react2.default.createElement(TableTag, { n: table, lang })));
  }
  function SlotBanner({ slot, lang = "es" }) {
    const night = slot.theme === "noche";
    const until = slot.to > 24 ? slot.to - 24 : slot.to;
    return /* @__PURE__ */ import_react2.default.createElement("section", { className: "hz-slot" }, /* @__PURE__ */ import_react2.default.createElement("p", { className: "hz-slot__hello display-lg" }, /* @__PURE__ */ import_react2.default.createElement("em", null, night ? tr(lang, "welcomeNight") : tr(lang, "welcomeDay"), ".")), /* @__PURE__ */ import_react2.default.createElement("p", { className: "hz-slot__meta label-caps" }, /* @__PURE__ */ import_react2.default.createElement("span", null, loc(slot.label, lang)), /* @__PURE__ */ import_react2.default.createElement("i", { "aria-hidden": "true" }), /* @__PURE__ */ import_react2.default.createElement("span", null, tr(lang, "menuUntil"), " ", clock(until))));
  }
  function SearchField({ value, onChange, lang = "es" }) {
    return /* @__PURE__ */ import_react2.default.createElement("label", { className: "hz-search" }, /* @__PURE__ */ import_react2.default.createElement(Icon, { name: "search", size: 20 }), /* @__PURE__ */ import_react2.default.createElement("input", { type: "search", value, placeholder: tr(lang, "search"), onChange: (e) => onChange && onChange(e.target.value), "aria-label": tr(lang, "search") }));
  }
  function FilterChips({ active = [], onToggle, lang = "es", ids = DIET_IDS }) {
    const key = { vegano: "vegan", vegetariano: "vegetarian", sintacc: "glutenFree", picante: "spicy", sinlacteos: "dairyFree" };
    const icon = { vegano: "leaf", vegetariano: "sprout", sintacc: "wheat", picante: "chili", sinlacteos: "dropoff" };
    return /* @__PURE__ */ import_react2.default.createElement("div", { className: "hz-filters", role: "group", "aria-label": "Filtros" }, ids.map((id) => /* @__PURE__ */ import_react2.default.createElement(Chip, { key: id, icon: icon[id], active: active.includes(id), onClick: () => onToggle && onToggle(id) }, tr(lang, key[id]))));
  }
  function CategoryBar({ cats, active, onPick, lang = "es" }) {
    const ref = (0, import_react2.useRef)(null);
    (0, import_react2.useEffect)(() => {
      const el = ref.current && ref.current.querySelector(".is-on");
      if (el && ref.current) ref.current.scrollTo({ left: el.offsetLeft - 24, behavior: "smooth" });
    }, [active]);
    return /* @__PURE__ */ import_react2.default.createElement("nav", { className: "hz-cats", "aria-label": "Categor\xEDas", ref }, cats.map((c) => /* @__PURE__ */ import_react2.default.createElement("button", { key: c.id, type: "button", className: `hz-cats__item${c.id === active ? " is-on" : ""}`, "aria-current": c.id === active ? "true" : void 0, onClick: () => onPick && onPick(c.id) }, loc(c.name, lang))));
  }
  function prepTime(d, lang) {
    return `${d.time[0]}\u2013${d.time[1]} ${tr(lang, "min")}`;
  }
  function AddButton({ qty = 0, onClick, label, off }) {
    return /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: `hz-add${qty ? " is-on" : ""}`, "aria-label": label, disabled: off, onClick: (e) => {
      e.stopPropagation();
      onClick && onClick();
    } }, qty ? /* @__PURE__ */ import_react2.default.createElement("b", { className: "price" }, qty) : /* @__PURE__ */ import_react2.default.createElement(Icon, { name: "plus", size: 20 }));
  }
  function DishRow({ dish, lang = "es", onOpen, onAdd, qty = 0 }) {
    const off = !!dish.soldOut;
    const name = loc(dish.name, lang);
    return /* @__PURE__ */ import_react2.default.createElement("article", { className: `hz-row${off ? " is-off" : ""}` }, /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: "hz-row__main", onClick: () => onOpen && onOpen(dish), "aria-label": name }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "hz-row__text" }, dish.tags && dish.tags.length > 0 && /* @__PURE__ */ import_react2.default.createElement("span", { className: "hz-row__tags" }, dish.tags.map((t) => /* @__PURE__ */ import_react2.default.createElement(TagLabel, { key: t, id: t, lang }))), /* @__PURE__ */ import_react2.default.createElement("h3", { className: "dish-name" }, name), /* @__PURE__ */ import_react2.default.createElement("p", { className: "body-sm hz-row__desc" }, loc(dish.desc, lang)), /* @__PURE__ */ import_react2.default.createElement("span", { className: "hz-row__meta caption" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "hz-row__time" }, /* @__PURE__ */ import_react2.default.createElement(Icon, { name: "clock", size: 14 }), prepTime(dish, lang)), (dish.diet || []).map((d) => /* @__PURE__ */ import_react2.default.createElement(DietIcon, { key: d, id: d, lang, size: 15 }))), off ? /* @__PURE__ */ import_react2.default.createElement("span", { className: "hz-row__off label-caps" }, tr(lang, "soldOut")) : /* @__PURE__ */ import_react2.default.createElement(Money, { v: dish.price })), /* @__PURE__ */ import_react2.default.createElement(Plate, { photo: dish.photo, size: dish.photo && ["tall"].includes(shapeOf(dish)) ? 124 : 116, off })), !off && /* @__PURE__ */ import_react2.default.createElement(AddButton, { qty, label: `${tr(lang, "add")} ${name}`, onClick: () => onAdd && onAdd(dish) }));
  }
  function shapeOf(d) {
    return (PHOTO_META[d.photo] || {}).shape || "round";
  }
  function DishFeature({ dish, lang = "es", onOpen, onAdd, qty = 0 }) {
    const name = loc(dish.name, lang);
    return /* @__PURE__ */ import_react2.default.createElement("article", { className: "hz-feature" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "hz-feature__top" }, /* @__PURE__ */ import_react2.default.createElement(TagLabel, { id: "chef", lang })), /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: "hz-feature__main", onClick: () => onOpen && onOpen(dish), "aria-label": name }, /* @__PURE__ */ import_react2.default.createElement(Plate, { photo: dish.photo, size: 232 }), /* @__PURE__ */ import_react2.default.createElement("h3", { className: "display-lg" }, name), /* @__PURE__ */ import_react2.default.createElement("p", { className: "body-sm" }, loc(dish.desc, lang))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hz-feature__foot" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "hz-feature__price" }, /* @__PURE__ */ import_react2.default.createElement(Money, { v: dish.price, className: "price-lg" }), /* @__PURE__ */ import_react2.default.createElement("span", { className: "caption" }, /* @__PURE__ */ import_react2.default.createElement(Icon, { name: "clock", size: 14 }), prepTime(dish, lang))), /* @__PURE__ */ import_react2.default.createElement(AddButton, { qty, label: `${tr(lang, "add")} ${name}`, onClick: () => onAdd && onAdd(dish) })));
  }
  function Pairing({ ids, lang = "es", onAdd, onOpen }) {
    const items = (ids || []).map((id) => DISH[id]).filter(Boolean);
    if (!items.length) return null;
    return /* @__PURE__ */ import_react2.default.createElement("section", { className: "hz-pair" }, /* @__PURE__ */ import_react2.default.createElement("h3", { className: "label-caps hz-block-label" }, /* @__PURE__ */ import_react2.default.createElement(Icon, { name: "glass", size: 16 }), tr(lang, "pairing")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hz-pair__rail" }, items.map((d) => /* @__PURE__ */ import_react2.default.createElement("article", { key: d.id, className: "hz-pair__card" }, /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: "hz-pair__main", onClick: () => onOpen && onOpen(d) }, /* @__PURE__ */ import_react2.default.createElement(Plate, { photo: d.photo, size: 84, ring: false }), /* @__PURE__ */ import_react2.default.createElement("span", { className: "dish-name-sm" }, loc(d.name, lang)), /* @__PURE__ */ import_react2.default.createElement(Money, { v: d.price })), /* @__PURE__ */ import_react2.default.createElement(AddButton, { label: `${tr(lang, "add")} ${loc(d.name, lang)}`, onClick: () => onAdd && onAdd(d) })))));
  }
  function Story({ story, lang = "es", defaultOpen = false }) {
    const [open, setOpen] = (0, import_react2.useState)(defaultOpen);
    if (!story) return null;
    return /* @__PURE__ */ import_react2.default.createElement("section", { className: `hz-story${open ? " is-open" : ""}` }, /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: "hz-story__head", "aria-expanded": open, onClick: () => setOpen(!open) }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "label-caps hz-block-label" }, tr(lang, "story")), /* @__PURE__ */ import_react2.default.createElement(Icon, { name: "down", size: 20 })), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hz-story__body" }, /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("p", { className: "story" }, loc(story.text, lang)), /* @__PURE__ */ import_react2.default.createElement("dl", { className: "hz-origins" }, /* @__PURE__ */ import_react2.default.createElement("dt", { className: "label-caps" }, tr(lang, "origin")), /* @__PURE__ */ import_react2.default.createElement("dd", null), story.origins.map((o, i) => /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, { key: i }, /* @__PURE__ */ import_react2.default.createElement("dt", null, loc(o.ing, lang)), /* @__PURE__ */ import_react2.default.createElement("dd", null, /* @__PURE__ */ import_react2.default.createElement("b", null, o.who), /* @__PURE__ */ import_react2.default.createElement("span", null, o.where))))))));
  }
  function Allergens({ list = [], lang = "es" }) {
    return /* @__PURE__ */ import_react2.default.createElement("section", { className: "hz-allergens" }, /* @__PURE__ */ import_react2.default.createElement("h3", { className: "label-caps hz-block-label" }, tr(lang, "allergens")), list.length ? /* @__PURE__ */ import_react2.default.createElement("p", { className: "body-sm" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "hz-allergens__lead" }, tr(lang, "contains"), ":"), " ", list.map((a, i) => /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, { key: a }, i > 0 && ", ", /* @__PURE__ */ import_react2.default.createElement("strong", null, loc(ALLERGENS[a], lang) || a))), ".") : /* @__PURE__ */ import_react2.default.createElement("p", { className: "body-sm" }, tr(lang, "noAllergens"), "."));
  }
  function DishDetail({ dish, lang = "es", onClose, onAdd, onOpenOther }) {
    const [qty, setQty] = (0, import_react2.useState)(1);
    const [vsel, setVsel] = (0, import_react2.useState)(() => Object.fromEntries((dish.variants || []).map((v) => {
      var _a;
      return [v.id, (_a = v.def) != null ? _a : 0];
    })));
    const [esel, setEsel] = (0, import_react2.useState)({});
    const [rsel, setRsel] = (0, import_react2.useState)({});
    const [notes, setNotes] = (0, import_react2.useState)("");
    const delta = (dish.variants || []).reduce((s, v) => s + ((v.options[vsel[v.id]] || {}).delta || 0), 0);
    const extras = (dish.extras || []).filter((e) => esel[e.id]).reduce((s, e) => s + e.price, 0);
    const unit = dish.price + delta + extras;
    const submit = () => onAdd && onAdd({
      dish,
      qty,
      unit,
      variants: (dish.variants || []).map((v) => `${loc(v.label, lang)}: ${loc(v.options[vsel[v.id]], lang)}`),
      extras: (dish.extras || []).filter((e) => esel[e.id]).map((e) => "+ " + loc(e.label, lang)),
      removes: (dish.removes || []).filter((_, i) => rsel[i]).map((r) => loc(r, lang)),
      notes
    });
    return /* @__PURE__ */ import_react2.default.createElement("div", { className: "hz-dish" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "hz-dish__scroll" }, /* @__PURE__ */ import_react2.default.createElement("header", { className: "hz-dish__hero" }, /* @__PURE__ */ import_react2.default.createElement("button", { type: "button", className: "hz-dish__close", onClick: onClose, "aria-label": "Cerrar" }, /* @__PURE__ */ import_react2.default.createElement(Icon, { name: "close", size: 22 })), /* @__PURE__ */ import_react2.default.createElement(Plate, { photo: dish.photo, size: dish.photo && shapeOf(dish) === "tall" ? 270 : 256, off: !!dish.soldOut })), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hz-dish__body" }, dish.tags && dish.tags.length > 0 && /* @__PURE__ */ import_react2.default.createElement("div", { className: "hz-row__tags" }, dish.tags.map((t) => /* @__PURE__ */ import_react2.default.createElement(TagLabel, { key: t, id: t, lang }))), /* @__PURE__ */ import_react2.default.createElement("h2", { className: "display-xl hz-dish__name" }, loc(dish.name, lang)), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hz-dish__meta" }, /* @__PURE__ */ import_react2.default.createElement(Money, { v: dish.price, className: "price-lg" }), /* @__PURE__ */ import_react2.default.createElement("span", { className: "caption" }, /* @__PURE__ */ import_react2.default.createElement(Icon, { name: "clock", size: 14 }), prepTime(dish, lang)), dish.unit && /* @__PURE__ */ import_react2.default.createElement("span", { className: "caption" }, loc(dish.unit, lang))), dish.diet && dish.diet.length > 0 && /* @__PURE__ */ import_react2.default.createElement("div", { className: "hz-dish__diets" }, dish.diet.map((d) => /* @__PURE__ */ import_react2.default.createElement(DietIcon, { key: d, id: d, lang, withLabel: true }))), /* @__PURE__ */ import_react2.default.createElement("p", { className: "body hz-dish__desc" }, loc(dish.desc, lang)), /* @__PURE__ */ import_react2.default.createElement(Allergens, { list: dish.allergens, lang }), (dish.variants || []).map((v) => /* @__PURE__ */ import_react2.default.createElement("fieldset", { key: v.id, className: "hz-opt" }, /* @__PURE__ */ import_react2.default.createElement("legend", { className: "label-caps hz-block-label" }, loc(v.label, lang), v.required && /* @__PURE__ */ import_react2.default.createElement("i", { "aria-hidden": "true" }, " \xB7")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "hz-opt__list", role: "radiogroup" }, v.options.map((o, i) => /* @__PURE__ */ import_react2.default.createElement("button", { key: i, type: "button", role: "radio", "aria-checked": vsel[v.id] === i, className: `hz-radio${vsel[v.id] === i ? " is-on" : ""}`, onClick: () => setVsel({ ...vsel, [v.id]: i }) }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "hz-radio__dot" }), /* @__PURE__ */ import_react2.default.createElement("span", { className: "hz-radio__label" }, loc(o, lang)), o.delta ? /* @__PURE__ */ import_react2.default.createElement("span", { className: "price caption" }, "+", money(o.delta)) : null))))), dish.extras && dish.extras.length > 0 && /* @__PURE__ */ import_react2.default.createElement("fieldset", { className: "hz-opt" }, /* @__PURE__ */ import_react2.default.createElement("legend", { className: "label-caps hz-block-label" }, tr(lang, "extras")), dish.extras.map((e) => /* @__PURE__ */ import_react2.default.createElement(Check, { key: e.id, checked: !!esel[e.id], onChange: (c) => setEsel({ ...esel, [e.id]: c }), price: e.price }, loc(e.label, lang)))), dish.removes && dish.removes.length > 0 && /* @__PURE__ */ import_react2.default.createElement("fieldset", { className: "hz-opt" }, /* @__PURE__ */ import_react2.default.createElement("legend", { className: "label-caps hz-block-label" }, tr(lang, "remove")), dish.removes.map((r, i) => /* @__PURE__ */ import_react2.default.createElement(Check, { key: i, checked: !!rsel[i], onChange: (c) => setRsel({ ...rsel, [i]: c }) }, loc(r, lang)))), /* @__PURE__ */ import_react2.default.createElement("label", { className: "hz-notes" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "label-caps hz-block-label" }, tr(lang, "notes")), /* @__PURE__ */ import_react2.default.createElement("textarea", { rows: 2, value: notes, onChange: (e) => setNotes(e.target.value), placeholder: tr(lang, "notesPh") })), /* @__PURE__ */ import_react2.default.createElement(Pairing, { ids: dish.pairing, lang, onAdd: (d) => onAdd && onAdd({ dish: d, qty: 1, unit: d.price, variants: [], extras: [], removes: [], notes: "" }), onOpen: onOpenOther }), /* @__PURE__ */ import_react2.default.createElement(Story, { story: dish.story, lang }))), /* @__PURE__ */ import_react2.default.createElement("footer", { className: "hz-dish__foot" }, /* @__PURE__ */ import_react2.default.createElement(Stepper, { value: qty, min: 1, onChange: setQty, label: "Cantidad" }), /* @__PURE__ */ import_react2.default.createElement(Button, { kind: "primary", block: true, disabled: !!dish.soldOut, onClick: submit }, /* @__PURE__ */ import_react2.default.createElement("span", null, dish.soldOut ? tr(lang, "soldOut") : tr(lang, "add")), !dish.soldOut && /* @__PURE__ */ import_react2.default.createElement("span", { className: "price hz-btn__sum" }, money(unit * qty)))));
  }
  function DishSheet({ dish, open, onClose, ...rest }) {
    return /* @__PURE__ */ import_react2.default.createElement(Sheet, { open, onClose, tall: true, label: dish ? loc(dish.name, rest.lang || "es") : "" }, dish && /* @__PURE__ */ import_react2.default.createElement(DishDetail, { key: dish.id, dish, onClose, ...rest }));
  }

  // ../src/pedido.jsx
  var import_react3 = __toESM(require_react());
  function CartBar({ count = 0, total = 0, onOpen, lang = "es" }) {
    return /* @__PURE__ */ import_react3.default.createElement("button", { type: "button", className: `hz-cartbar${count ? " is-on" : ""}`, onClick: onOpen, "aria-label": `${tr(lang, "myOrder")}: ${count}`, tabIndex: count ? 0 : -1 }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "hz-cartbar__count price", key: count }, count), /* @__PURE__ */ import_react3.default.createElement("span", { className: "hz-cartbar__label button" }, tr(lang, "myOrder")), /* @__PURE__ */ import_react3.default.createElement("span", { className: "hz-cartbar__total price" }, money(total)), /* @__PURE__ */ import_react3.default.createElement(Icon, { name: "right", size: 18 }));
  }
  function Guests({ names, lang = "es", active, onPick }) {
    return /* @__PURE__ */ import_react3.default.createElement("div", { className: "hz-guests" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "label-caps" }, tr(lang, "guests")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "hz-guests__list" }, names.map((n, i) => /* @__PURE__ */ import_react3.default.createElement("button", { key: n, type: "button", className: `hz-guest${active === n ? " is-on" : ""}`, onClick: () => onPick && onPick(n), "aria-pressed": active === n }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "hz-guest__av", "aria-hidden": "true" }, n.slice(0, 1)), i === 0 ? tr(lang, "you") : n))));
  }
  function SuggestRail({ ids, lang = "es", onAdd }) {
    if (!ids || !ids.length) return null;
    return /* @__PURE__ */ import_react3.default.createElement("section", { className: "hz-suggest" }, /* @__PURE__ */ import_react3.default.createElement("h3", { className: "label-caps hz-block-label" }, tr(lang, "suggest")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "hz-suggest__rail" }, ids.map((id) => {
      const d = DISH[id];
      if (!d) return null;
      return /* @__PURE__ */ import_react3.default.createElement("article", { key: id, className: "hz-suggest__card" }, /* @__PURE__ */ import_react3.default.createElement(Plate, { photo: d.photo, size: 64, ring: false }), /* @__PURE__ */ import_react3.default.createElement("span", { className: "hz-suggest__txt" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "dish-name-sm" }, loc(d.name, lang)), /* @__PURE__ */ import_react3.default.createElement(Money, { v: d.price })), /* @__PURE__ */ import_react3.default.createElement(AddButton, { label: `${tr(lang, "add")} ${loc(d.name, lang)}`, onClick: () => onAdd && onAdd(d) }));
    })));
  }
  function CartPanel({ lines = [], guests = ["Vos"], lang = "es", table = 12, onQty, onClose, onConfirm, suggestions = [], onAddSuggestion, who, onWho }) {
    const total = lines.reduce((s, l) => s + l.unit * l.qty, 0);
    return /* @__PURE__ */ import_react3.default.createElement("div", { className: "hz-cart" }, /* @__PURE__ */ import_react3.default.createElement("header", { className: "hz-cart__head" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("h2", { className: "display-md" }, tr(lang, "yourOrder")), /* @__PURE__ */ import_react3.default.createElement("p", { className: "caption" }, tr(lang, "table"), " ", table)), /* @__PURE__ */ import_react3.default.createElement("button", { type: "button", className: "hz-iconbtn", onClick: onClose, "aria-label": "Cerrar" }, /* @__PURE__ */ import_react3.default.createElement(Icon, { name: "close", size: 22 }))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "hz-cart__scroll" }, /* @__PURE__ */ import_react3.default.createElement(Guests, { names: guests, lang, active: who, onPick: onWho }), lines.length === 0 ? /* @__PURE__ */ import_react3.default.createElement("p", { className: "hz-cart__empty story" }, tr(lang, "empty"), ".") : /* @__PURE__ */ import_react3.default.createElement("ul", { className: "hz-lines" }, lines.map((l) => /* @__PURE__ */ import_react3.default.createElement("li", { key: l.key, className: "hz-line" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "hz-guest__av hz-line__who", title: `${tr(lang, "addedBy")} ${l.who}`, "aria-label": `${tr(lang, "addedBy")} ${l.who}` }, l.who.slice(0, 1)), /* @__PURE__ */ import_react3.default.createElement("div", { className: "hz-line__txt" }, /* @__PURE__ */ import_react3.default.createElement("h3", { className: "dish-name-sm" }, loc(l.dish.name, lang)), [...l.variants, ...l.extras, ...l.removes.map((r) => "\u2014 " + r)].length > 0 && /* @__PURE__ */ import_react3.default.createElement("p", { className: "caption" }, [...l.variants, ...l.extras, ...l.removes.map((r) => "\u2014 " + r)].join(" \xB7 ")), l.notes && /* @__PURE__ */ import_react3.default.createElement("p", { className: "caption hz-line__note" }, "\u201C", l.notes, "\u201D"), /* @__PURE__ */ import_react3.default.createElement(Stepper, { size: "sm", value: l.qty, min: 0, onChange: (q) => onQty && onQty(l.key, q), label: loc(l.dish.name, lang) })), /* @__PURE__ */ import_react3.default.createElement(Money, { v: l.unit * l.qty })))), /* @__PURE__ */ import_react3.default.createElement(SuggestRail, { ids: suggestions, lang, onAdd: onAddSuggestion })), /* @__PURE__ */ import_react3.default.createElement("footer", { className: "hz-cart__foot" }, /* @__PURE__ */ import_react3.default.createElement("dl", { className: "hz-total" }, /* @__PURE__ */ import_react3.default.createElement("dt", { className: "label-caps" }, tr(lang, "subtotal")), /* @__PURE__ */ import_react3.default.createElement("dd", null, /* @__PURE__ */ import_react3.default.createElement(Money, { v: total, className: "price-lg" }))), /* @__PURE__ */ import_react3.default.createElement(Button, { kind: "primary", block: true, disabled: !lines.length, onClick: onConfirm }, tr(lang, "confirmOrder"))));
  }
  var STEPS = ["received", "preparing", "ready", "served"];
  function Tracker({ status = 0, lang = "es", times = [] }) {
    return /* @__PURE__ */ import_react3.default.createElement("ol", { className: "hz-track", "aria-label": "Estado del pedido" }, STEPS.map((s, i) => {
      const st = i < status ? "done" : i === status ? "now" : "next";
      return /* @__PURE__ */ import_react3.default.createElement("li", { key: s, className: `hz-track__step is-${st}`, "aria-current": st === "now" ? "step" : void 0 }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "hz-track__dot" }, st === "done" ? /* @__PURE__ */ import_react3.default.createElement(Icon, { name: "check", size: 13 }) : null), /* @__PURE__ */ import_react3.default.createElement("span", { className: "hz-track__label caption" }, tr(lang, s)), times[i] && /* @__PURE__ */ import_react3.default.createElement("span", { className: "hz-track__time caption price" }, times[i]));
    }));
  }
  function TandaCard({ batch, lang = "es", open = false }) {
    const items = batch.items;
    const count = items.reduce((s, i) => s + i.qty, 0);
    return /* @__PURE__ */ import_react3.default.createElement("article", { className: `hz-tanda is-s${batch.status}` }, /* @__PURE__ */ import_react3.default.createElement("header", { className: "hz-tanda__head" }, /* @__PURE__ */ import_react3.default.createElement("h3", { className: "dish-name-sm" }, tr(lang, "batch"), " ", batch.n), /* @__PURE__ */ import_react3.default.createElement("span", { className: "caption price" }, batch.time, " \xB7 ", count, " ", count === 1 ? "\xEDtem" : "\xEDtems")), /* @__PURE__ */ import_react3.default.createElement(Tracker, { status: batch.status, lang, times: batch.times }), open && /* @__PURE__ */ import_react3.default.createElement("ul", { className: "hz-tanda__items caption" }, items.map((it, i) => /* @__PURE__ */ import_react3.default.createElement("li", { key: i }, it.qty, " \xD7 ", loc(it.dish.name, lang)))));
  }
  function ServiceDock({ lang = "es", waiter = "idle", bill = "idle", onWaiter, onBill }) {
    return /* @__PURE__ */ import_react3.default.createElement("div", { className: "hz-dock", role: "group", "aria-label": "Servicio" }, /* @__PURE__ */ import_react3.default.createElement("button", { type: "button", className: `hz-dock__btn${waiter !== "idle" ? " is-done" : ""}`, onClick: onWaiter, "aria-live": "polite" }, /* @__PURE__ */ import_react3.default.createElement(Icon, { name: waiter !== "idle" ? "check" : "bell", size: 18 }), /* @__PURE__ */ import_react3.default.createElement("span", null, waiter !== "idle" ? tr(lang, "waiterCalled") : tr(lang, "callWaiter"))), /* @__PURE__ */ import_react3.default.createElement("span", { className: "hz-dock__rule", "aria-hidden": "true" }), /* @__PURE__ */ import_react3.default.createElement("button", { type: "button", className: `hz-dock__btn${bill !== "idle" ? " is-done" : ""}`, onClick: onBill, "aria-live": "polite" }, /* @__PURE__ */ import_react3.default.createElement(Icon, { name: bill !== "idle" ? "check" : "receipt", size: 18 }), /* @__PURE__ */ import_react3.default.createElement("span", null, bill !== "idle" ? tr(lang, "billAsked") : tr(lang, "askBill"))));
  }
  function Toast({ show, children }) {
    return /* @__PURE__ */ import_react3.default.createElement("div", { className: `hz-toast${show ? " is-on" : ""}`, role: "status", "aria-live": "polite" }, /* @__PURE__ */ import_react3.default.createElement(Icon, { name: "check", size: 16 }), /* @__PURE__ */ import_react3.default.createElement("span", null, children));
  }

  // ../src/pago.jsx
  var import_react4 = __toESM(require_react());
  function Leader({ left, right, strong = false, className = "" }) {
    return /* @__PURE__ */ import_react4.default.createElement("div", { className: `hz-leader${strong ? " is-strong" : ""} ${className}` }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "hz-leader__l" }, left), /* @__PURE__ */ import_react4.default.createElement("i", { "aria-hidden": "true" }), /* @__PURE__ */ import_react4.default.createElement("span", { className: "hz-leader__r price" }, right));
  }
  var DEMO_BILL = [
    { id: "l1", name: "Cortes a la parrilla", qty: 2, unit: 26900, who: "Vos" },
    { id: "l2", name: "Haze burger con papas", qty: 1, unit: 20700, who: "Lu" },
    { id: "l3", name: "Malbec Reserva", qty: 1, unit: 29500, who: "Vos" },
    { id: "l4", name: "Coca-Cola 500 ml", qty: 1, unit: 3600, who: "Mati" },
    { id: "l5", name: "Tiramis\xFA de la casa", qty: 2, unit: 8900, who: "Lu" }
  ];
  function Bill({ lines = DEMO_BILL, lang = "es", table = 12, initialSplit = "all", initialTip = 0, onPay, dateLabel = "Jue 23 oct \xB7 22:41" }) {
    const [split, setSplit] = (0, import_react4.useState)(initialSplit);
    const [people, setPeople] = (0, import_react4.useState)(3);
    const [mine, setMine] = (0, import_react4.useState)({ l1: true, l3: true });
    const [tip, setTip] = (0, import_react4.useState)(initialTip);
    const [recv, setRecv] = (0, import_react4.useState)("whatsapp");
    const subtotal = lines.reduce((s, l) => s + l.unit * l.qty, 0);
    const base = split === "all" ? subtotal : split === "equal" ? Math.round(subtotal / people) : lines.filter((l) => mine[l.id]).reduce((s, l) => s + l.unit * l.qty, 0);
    const tipAmt = Math.round(base * tip / 100);
    const total = base + tipAmt;
    const label = split === "all" ? tr(lang, "total") : tr(lang, "yourShare");
    return /* @__PURE__ */ import_react4.default.createElement("div", { className: "hz-bill" }, /* @__PURE__ */ import_react4.default.createElement("article", { className: "hz-ticket" }, /* @__PURE__ */ import_react4.default.createElement("header", { className: "hz-ticket__head" }, /* @__PURE__ */ import_react4.default.createElement(Logo, { height: 20, mono: true }), /* @__PURE__ */ import_react4.default.createElement("span", { className: "caption price" }, tr(lang, "table"), " ", table, " \xB7 ", dateLabel)), /* @__PURE__ */ import_react4.default.createElement("div", { className: "hz-ticket__lines" }, lines.map((l) => split === "items" ? /* @__PURE__ */ import_react4.default.createElement("label", { key: l.id, className: `hz-ticket__pick${mine[l.id] ? " is-on" : ""}` }, /* @__PURE__ */ import_react4.default.createElement("input", { type: "checkbox", checked: !!mine[l.id], onChange: (e) => setMine({ ...mine, [l.id]: e.target.checked }) }), /* @__PURE__ */ import_react4.default.createElement("span", { className: "hz-check__box" }, /* @__PURE__ */ import_react4.default.createElement(Icon, { name: "check", size: 14 })), /* @__PURE__ */ import_react4.default.createElement(Leader, { left: /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, l.qty, " \xD7 ", l.name, /* @__PURE__ */ import_react4.default.createElement("small", { className: "caption" }, " \xB7 ", l.who)), right: money(l.unit * l.qty) })) : /* @__PURE__ */ import_react4.default.createElement(Leader, { key: l.id, left: /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, l.qty, " \xD7 ", l.name), right: money(l.unit * l.qty) }))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "hz-ticket__sum" }, /* @__PURE__ */ import_react4.default.createElement(Leader, { left: tr(lang, "subtotal"), right: money(subtotal) }), split === "equal" && /* @__PURE__ */ import_react4.default.createElement(Leader, { left: `${tr(lang, "splitEqual")} \xB7 ${people}`, right: money(base) }), split === "items" && /* @__PURE__ */ import_react4.default.createElement(Leader, { left: tr(lang, "yourShare"), right: money(base) }), /* @__PURE__ */ import_react4.default.createElement(Leader, { left: `${tr(lang, "tip")}${tip ? ` \xB7 ${tip}%` : ""}`, right: tip ? money(tipAmt) : "\u2014" }), /* @__PURE__ */ import_react4.default.createElement(Leader, { strong: true, left: label, right: money(total) })), /* @__PURE__ */ import_react4.default.createElement("span", { className: "hz-ticket__edge", "aria-hidden": "true" })), /* @__PURE__ */ import_react4.default.createElement("section", { className: "hz-bill__block" }, /* @__PURE__ */ import_react4.default.createElement("h3", { className: "label-caps hz-block-label" }, tr(lang, "split")), /* @__PURE__ */ import_react4.default.createElement(Segmented, { value: split, onChange: setSplit, label: tr(lang, "split"), options: [{ id: "all", label: tr(lang, "splitAll") }, { id: "equal", label: tr(lang, "splitEqual") }, { id: "items", label: tr(lang, "splitItems") }] }), split === "equal" && /* @__PURE__ */ import_react4.default.createElement("div", { className: "hz-bill__equal" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "body-sm" }, tr(lang, "people")), /* @__PURE__ */ import_react4.default.createElement(Stepper, { value: people, min: 2, max: 20, onChange: setPeople, label: tr(lang, "people") }), /* @__PURE__ */ import_react4.default.createElement("span", { className: "price-lg price" }, money(Math.round(subtotal / people)), " ", /* @__PURE__ */ import_react4.default.createElement("small", { className: "caption" }, tr(lang, "eachPays"))))), /* @__PURE__ */ import_react4.default.createElement("section", { className: "hz-bill__block" }, /* @__PURE__ */ import_react4.default.createElement("h3", { className: "label-caps hz-block-label" }, tr(lang, "tip")), /* @__PURE__ */ import_react4.default.createElement("div", { className: "hz-tips", role: "radiogroup", "aria-label": tr(lang, "tip") }, [0, 10, 15, 20].map((p) => /* @__PURE__ */ import_react4.default.createElement("button", { key: p, type: "button", role: "radio", "aria-checked": tip === p, className: `hz-tip${tip === p ? " is-on" : ""}`, onClick: () => setTip(p) }, /* @__PURE__ */ import_react4.default.createElement("b", { className: "price" }, p === 0 ? "\u2014" : p + "%"), /* @__PURE__ */ import_react4.default.createElement("small", { className: "caption" }, p === 0 ? tr(lang, "noTip") : money(Math.round(base * p / 100))))))), /* @__PURE__ */ import_react4.default.createElement("section", { className: "hz-bill__pay" }, /* @__PURE__ */ import_react4.default.createElement(Button, { kind: "primary", block: true, icon: "card", onClick: () => onPay && onPay(total) }, /* @__PURE__ */ import_react4.default.createElement("span", null, tr(lang, "payMP")), /* @__PURE__ */ import_react4.default.createElement("span", { className: "price hz-btn__sum" }, money(total))), /* @__PURE__ */ import_react4.default.createElement(Button, { kind: "ghost", block: true, icon: "card" }, tr(lang, "payCard")), /* @__PURE__ */ import_react4.default.createElement("p", { className: "caption hz-bill__note" }, /* @__PURE__ */ import_react4.default.createElement(Icon, { name: "lock", size: 14 }), tr(lang, "payNote"))), /* @__PURE__ */ import_react4.default.createElement("section", { className: "hz-bill__block" }, /* @__PURE__ */ import_react4.default.createElement("h3", { className: "label-caps hz-block-label" }, tr(lang, "receipt")), /* @__PURE__ */ import_react4.default.createElement(Segmented, { value: recv, onChange: setRecv, label: tr(lang, "receiptBy"), options: [{ id: "whatsapp", label: tr(lang, "whatsapp") }, { id: "email", label: tr(lang, "email") }] }), /* @__PURE__ */ import_react4.default.createElement(Field, { label: recv === "email" ? tr(lang, "email") : tr(lang, "whatsapp") }, /* @__PURE__ */ import_react4.default.createElement("input", { className: "hz-input", inputMode: recv === "email" ? "email" : "tel", placeholder: recv === "email" ? "nombre@mail.com" : "+54 9 11 \xB7\xB7\xB7\xB7  \xB7\xB7\xB7\xB7" }))));
  }
  function Thanks({ lang = "es", name = "", googleUrl = RESTAURANT.googleReviewUrl, initialView = "choose" }) {
    const [view, setView] = (0, import_react4.useState)(initialView);
    const [score, setScore] = (0, import_react4.useState)(0);
    const [text, setText] = (0, import_react4.useState)("");
    const [later, setLater] = (0, import_react4.useState)(false);
    const [push, setPush] = (0, import_react4.useState)(false);
    return /* @__PURE__ */ import_react4.default.createElement("div", { className: "hz-thanks" }, /* @__PURE__ */ import_react4.default.createElement("header", { className: "hz-thanks__head" }, /* @__PURE__ */ import_react4.default.createElement(Logo, { height: 22 }), /* @__PURE__ */ import_react4.default.createElement("h2", { className: "display-xl" }, tr(lang, "thanks"), name ? /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, ", ", /* @__PURE__ */ import_react4.default.createElement("em", null, name)) : null, "."), /* @__PURE__ */ import_react4.default.createElement("p", { className: "body" }, tr(lang, "thanksSub"))), view === "choose" && /* @__PURE__ */ import_react4.default.createElement("div", { className: "hz-thanks__opts" }, /* @__PURE__ */ import_react4.default.createElement("button", { type: "button", className: "hz-opt-card", onClick: () => setView("private") }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "hz-opt-card__txt" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "display-md" }, tr(lang, "privateFb")), /* @__PURE__ */ import_react4.default.createElement("span", { className: "body-sm" }, tr(lang, "privateFbSub"))), /* @__PURE__ */ import_react4.default.createElement(Icon, { name: "arrow", size: 22 })), /* @__PURE__ */ import_react4.default.createElement("a", { className: "hz-opt-card", href: googleUrl, target: "_blank", rel: "noreferrer noopener" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "hz-opt-card__txt" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "display-md" }, tr(lang, "googleFb")), /* @__PURE__ */ import_react4.default.createElement("span", { className: "body-sm" }, tr(lang, "googleFbSub"))), /* @__PURE__ */ import_react4.default.createElement(Icon, { name: "external", size: 22 }))), view === "private" && /* @__PURE__ */ import_react4.default.createElement("form", { className: "hz-thanks__form", onSubmit: (e) => {
      e.preventDefault();
      setView("sent");
    } }, /* @__PURE__ */ import_react4.default.createElement("fieldset", { className: "hz-score" }, /* @__PURE__ */ import_react4.default.createElement("legend", { className: "label-caps hz-block-label" }, tr(lang, "yourScore")), /* @__PURE__ */ import_react4.default.createElement("div", { role: "radiogroup", className: "hz-score__row" }, [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ import_react4.default.createElement("button", { key: n, type: "button", role: "radio", "aria-checked": score === n, className: `hz-score__n${score === n ? " is-on" : ""}`, onClick: () => setScore(n) }, /* @__PURE__ */ import_react4.default.createElement("b", { className: "display-md price" }, n))))), /* @__PURE__ */ import_react4.default.createElement(Field, { label: tr(lang, "comment") }, /* @__PURE__ */ import_react4.default.createElement("textarea", { className: "hz-input", rows: 4, value: text, onChange: (e) => setText(e.target.value) })), /* @__PURE__ */ import_react4.default.createElement(Button, { kind: "primary", block: true, disabled: !score, onClick: () => setView("sent") }, tr(lang, "send")), /* @__PURE__ */ import_react4.default.createElement("button", { type: "button", className: "hz-link", onClick: () => setView("choose") }, /* @__PURE__ */ import_react4.default.createElement(Icon, { name: "left", size: 16 }), tr(lang, "thanks"))), view === "sent" && /* @__PURE__ */ import_react4.default.createElement("div", { className: "hz-thanks__sent" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "hz-thanks__tick" }, /* @__PURE__ */ import_react4.default.createElement(Icon, { name: "check", size: 22 })), /* @__PURE__ */ import_react4.default.createElement("p", { className: "story" }, tr(lang, "sent")), /* @__PURE__ */ import_react4.default.createElement("a", { className: "hz-link", href: googleUrl, target: "_blank", rel: "noreferrer noopener" }, tr(lang, "googleFb"), /* @__PURE__ */ import_react4.default.createElement(Icon, { name: "external", size: 16 }))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "hz-thanks__opt" }, /* @__PURE__ */ import_react4.default.createElement(Check, { checked: later, onChange: setLater, sub: "Solo si dej\xE1s tu contacto en la cuenta. Pod\xE9s cancelarlo cuando quieras." }, "Acepto recibir un mensaje 30 a 60 minutos despu\xE9s de pagar."), /* @__PURE__ */ import_react4.default.createElement(Check, { checked: push, onChange: setPush, sub: "Notificaci\xF3n web, sin instalar nada. Pod\xE9s desactivarla en tu navegador." }, "Avisarme de novedades con una notificaci\xF3n.")));
  }
  function PrivacyNote({ lang = "es", compact = false }) {
    return /* @__PURE__ */ import_react4.default.createElement("p", { className: "caption hz-privacy" }, /* @__PURE__ */ import_react4.default.createElement(Icon, { name: "lock", size: 14 }), /* @__PURE__ */ import_react4.default.createElement("span", null, "Tus datos los trata ", /* @__PURE__ */ import_react4.default.createElement("b", null, "Haze Gastronom\xEDa S.R.L."), " solo para las finalidades que aceptes ac\xE1. Pod\xE9s pedir acceso, rectificaci\xF3n o supresi\xF3n escribiendo a privacidad@haze.example. ", /* @__PURE__ */ import_react4.default.createElement("a", { href: "#privacidad" }, "Pol\xEDtica de privacidad"), ".", !compact && /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, " El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses (art. 14, inc. 3, Ley 25.326). La Agencia de Acceso a la Informaci\xF3n P\xFAblica, \xF3rgano de control de la Ley 25.326, atiende las denuncias y reclamos de quienes resulten afectados en sus derechos.")));
  }
  function ConsentCard({ lang = "es" }) {
    const [a, setA] = (0, import_react4.useState)(false);
    const [b, setB] = (0, import_react4.useState)(false);
    const [c, setC] = (0, import_react4.useState)(false);
    return /* @__PURE__ */ import_react4.default.createElement("section", { className: "hz-consent" }, /* @__PURE__ */ import_react4.default.createElement("h2", { className: "display-md" }, "Guardemos tus visitas"), /* @__PURE__ */ import_react4.default.createElement("p", { className: "body-sm" }, "Opcional. Con tu nombre y un contacto te mostramos tu historial y tus platos favoritos la pr\xF3xima vez."), /* @__PURE__ */ import_react4.default.createElement(Field, { label: "Nombre" }, /* @__PURE__ */ import_react4.default.createElement("input", { className: "hz-input", autoComplete: "given-name", placeholder: "C\xF3mo te decimos" })), /* @__PURE__ */ import_react4.default.createElement(Field, { label: "WhatsApp o mail" }, /* @__PURE__ */ import_react4.default.createElement("input", { className: "hz-input", autoComplete: "off", placeholder: "+54 9 11 \xB7\xB7\xB7\xB7 \xB7\xB7\xB7\xB7 \xB7 nombre@mail.com" })), /* @__PURE__ */ import_react4.default.createElement("div", { className: "hz-consent__checks" }, /* @__PURE__ */ import_react4.default.createElement(Check, { checked: a, onChange: setA }, "Guardar mi historial de visitas y favoritos."), /* @__PURE__ */ import_react4.default.createElement(Check, { checked: b, onChange: setB }, "Recibir promos y novedades de haze. Puedo darme de baja cuando quiera."), /* @__PURE__ */ import_react4.default.createElement(Check, { checked: c, onChange: setC }, "Recibir el comprobante y un mensaje despu\xE9s de la visita.")), /* @__PURE__ */ import_react4.default.createElement(Button, { kind: "primary", block: true, disabled: !(a || b || c) }, "Guardar mis preferencias"), /* @__PURE__ */ import_react4.default.createElement(PrivacyNote, { lang }));
  }
  function TastingMenu({ lang = "es" }) {
    const T = TASTING;
    return /* @__PURE__ */ import_react4.default.createElement("div", { className: "hz-tasting" }, /* @__PURE__ */ import_react4.default.createElement("header", { className: "hz-tasting__head" }, /* @__PURE__ */ import_react4.default.createElement("p", { className: "label-caps hz-tasting__kicker" }, tr(lang, "event")), /* @__PURE__ */ import_react4.default.createElement("h2", { className: "display-xl" }, loc(T.title, lang)), /* @__PURE__ */ import_react4.default.createElement("p", { className: "body-sm" }, loc(T.sub, lang))), /* @__PURE__ */ import_react4.default.createElement("ol", { className: "hz-courses" }, T.steps.map((s) => /* @__PURE__ */ import_react4.default.createElement("li", { key: s.n, className: "hz-course" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "hz-course__n display-lg", "aria-hidden": "true" }, s.n), /* @__PURE__ */ import_react4.default.createElement("div", { className: "hz-course__txt" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "caption price hz-course__at" }, s.at), /* @__PURE__ */ import_react4.default.createElement("h3", { className: "dish-name" }, loc(s.title, lang)), /* @__PURE__ */ import_react4.default.createElement("p", { className: "hz-course__wine story" }, /* @__PURE__ */ import_react4.default.createElement(Icon, { name: "glass", size: 15 }), loc(s.wine, lang))), /* @__PURE__ */ import_react4.default.createElement(Plate, { photo: DISH[s.dish].photo, size: 72, ring: false })))), /* @__PURE__ */ import_react4.default.createElement("footer", { className: "hz-tasting__foot" }, /* @__PURE__ */ import_react4.default.createElement("div", null, /* @__PURE__ */ import_react4.default.createElement(Money, { v: T.price, className: "price-lg" }), /* @__PURE__ */ import_react4.default.createElement("span", { className: "caption" }, " ", tr(lang, "perPerson"))), /* @__PURE__ */ import_react4.default.createElement(Button, { kind: "primary", block: true }, tr(lang, "confirmTable"))));
  }

  // ../src/staff.jsx
  var import_react5 = __toESM(require_react());
  var import_qrcode_generator = __toESM(require_qrcode());
  function Switch({ checked, onChange, label }) {
    return /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", role: "switch", "aria-checked": !!checked, "aria-label": label, className: `hz-switch${checked ? " is-on" : ""}`, onClick: () => onChange && onChange(!checked) }, /* @__PURE__ */ import_react5.default.createElement("span", null));
  }
  var SECTORS = [{ id: "todo", label: "Todo" }, { id: "cocina", label: "Cocina" }, { id: "parrilla", label: "Parrilla" }, { id: "barra", label: "Barra" }, { id: "postres", label: "Postres" }];
  var fmtT = (m) => `${String(Math.floor(m)).padStart(2, "0")}:${String(Math.floor(m % 1 * 60)).padStart(2, "0")}`;
  function Ticket({ t, alertMins, onAdvance, flash }) {
    const level = t.status === "listo" ? "ok" : t.mins >= alertMins ? "late" : t.mins >= alertMins * 0.65 ? "warn" : "ok";
    const cta = { nuevo: "Empezar", prep: "Listo", listo: "Servido" }[t.status];
    return /* @__PURE__ */ import_react5.default.createElement("article", { className: `hz-ticketk is-${level}${flash ? " is-flash" : ""}` }, /* @__PURE__ */ import_react5.default.createElement("header", { className: "hz-ticketk__head" }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("h3", { className: "display-lg" }, "Mesa ", t.mesa), /* @__PURE__ */ import_react5.default.createElement("p", { className: "caption" }, "Tanda ", t.tanda, " \xB7 ", /* @__PURE__ */ import_react5.default.createElement("span", { className: "hz-sector label-caps" }, t.sector))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-timer", "aria-label": `Tiempo ${fmtT(t.mins)}` }, /* @__PURE__ */ import_react5.default.createElement("b", { className: "price" }, fmtT(t.mins)), /* @__PURE__ */ import_react5.default.createElement("span", { className: "caption" }, level === "late" ? /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(Icon, { name: "alert", size: 14 }), "Demora") : level === "warn" ? "Atenci\xF3n" : t.status === "listo" ? "Listo" : "En tiempo"))), /* @__PURE__ */ import_react5.default.createElement("ul", { className: "hz-ticketk__items" }, t.items.map((it, i) => /* @__PURE__ */ import_react5.default.createElement("li", { key: i }, /* @__PURE__ */ import_react5.default.createElement("b", { className: "hz-q price" }, it.q), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("span", { className: "hz-item" }, it.name), it.mods.map((m, j) => /* @__PURE__ */ import_react5.default.createElement("span", { key: j, className: `hz-mod${/^(SIN|sin)/.test(m) ? " is-no" : ""}` }, m)), it.note && /* @__PURE__ */ import_react5.default.createElement("span", { className: "hz-note" }, /* @__PURE__ */ import_react5.default.createElement(Icon, { name: "alert", size: 14 }), it.note))))), /* @__PURE__ */ import_react5.default.createElement("footer", { className: "hz-ticketk__foot" }, /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "hz-iconbtn", "aria-label": "Imprimir comanda" }, /* @__PURE__ */ import_react5.default.createElement(Icon, { name: "printer", size: 20 })), /* @__PURE__ */ import_react5.default.createElement(Button, { kind: "primary", block: true, onClick: () => onAdvance(t.id) }, cta)));
  }
  function KitchenBoard({ initial = TICKETS, initialSector = "todo" }) {
    const [tickets, setTickets] = (0, import_react5.useState)(initial);
    const [sector, setSector] = (0, import_react5.useState)(initialSector);
    const [alertMins, setAlertMins] = (0, import_react5.useState)(15);
    const [sound, setSound] = (0, import_react5.useState)(true);
    const [print, setPrint] = (0, import_react5.useState)(true);
    const [flashId, setFlashId] = (0, import_react5.useState)(null);
    (0, import_react5.useEffect)(() => {
      const i = setInterval(() => setTickets((ts) => ts.map((t) => ({ ...t, mins: t.mins + 1 / 60 }))), 1e3);
      return () => clearInterval(i);
    }, []);
    const advance = (id) => setTickets((ts) => ts.flatMap((t) => t.id !== id ? [t] : t.status === "nuevo" ? [{ ...t, status: "prep" }] : t.status === "prep" ? [{ ...t, status: "listo" }] : []));
    const demo = () => {
      const id = "n" + Date.now();
      setTickets((ts) => [{ id, mesa: 4, tanda: 1, sector: "cocina", status: "nuevo", mins: 0, items: [{ q: 1, name: "Espaguetis bolognesa", mods: ["SIN ALBAHACA"], note: "" }, { q: 2, name: "Empanadas de carne", mods: [], note: "" }] }, ...ts]);
      setFlashId(id);
      setTimeout(() => setFlashId(null), 2400);
    };
    const vis = tickets.filter((t) => sector === "todo" || t.sector === sector);
    const cols = [["nuevo", "Nuevos"], ["prep", "En preparaci\xF3n"], ["listo", "Listos para servir"]];
    const count = (s) => tickets.filter((t) => s === "todo" || t.sector === s).length;
    return /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-root hz-kitchen", "data-theme": "noche" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-kitchen__in" }, /* @__PURE__ */ import_react5.default.createElement("header", { className: "hz-kitchen__bar" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-kitchen__brand" }, /* @__PURE__ */ import_react5.default.createElement(Logo, { height: 22 }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "label-caps" }, "Cocina y barra")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-kitchen__tabs", role: "tablist" }, SECTORS.map((s) => /* @__PURE__ */ import_react5.default.createElement("button", { key: s.id, type: "button", role: "tab", "aria-selected": sector === s.id, className: sector === s.id ? "is-on" : "", onClick: () => setSector(s.id) }, s.label, /* @__PURE__ */ import_react5.default.createElement("b", { className: "price" }, count(s.id))))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-kitchen__ctl" }, /* @__PURE__ */ import_react5.default.createElement("label", { className: "hz-ctl" }, /* @__PURE__ */ import_react5.default.createElement(Icon, { name: "volume", size: 18 }), /* @__PURE__ */ import_react5.default.createElement("span", null, "Sonido"), /* @__PURE__ */ import_react5.default.createElement(Switch, { checked: sound, onChange: setSound, label: "Alerta sonora" })), /* @__PURE__ */ import_react5.default.createElement("label", { className: "hz-ctl" }, /* @__PURE__ */ import_react5.default.createElement(Icon, { name: "printer", size: 18 }), /* @__PURE__ */ import_react5.default.createElement("span", null, "Imprimir"), /* @__PURE__ */ import_react5.default.createElement(Switch, { checked: print, onChange: setPrint, label: "Imprimir comandas" })), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-ctl" }, /* @__PURE__ */ import_react5.default.createElement(Icon, { name: "clock", size: 18 }), /* @__PURE__ */ import_react5.default.createElement("span", null, "Demora a los"), /* @__PURE__ */ import_react5.default.createElement(Stepper, { size: "sm", value: alertMins, min: 5, max: 40, onChange: setAlertMins, label: "Minutos para alerta de demora" }), /* @__PURE__ */ import_react5.default.createElement("span", null, "min")), /* @__PURE__ */ import_react5.default.createElement(Button, { kind: "ghost", onClick: demo }, "Simular pedido"))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-kitchen__cols" }, cols.map(([k, name]) => /* @__PURE__ */ import_react5.default.createElement("section", { key: k, className: "hz-kcol", "aria-label": name }, /* @__PURE__ */ import_react5.default.createElement("h2", { className: "label-caps hz-kcol__h" }, name, /* @__PURE__ */ import_react5.default.createElement("b", { className: "price" }, vis.filter((t) => t.status === k).length)), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-kcol__list" }, vis.filter((t) => t.status === k).sort((a, b) => b.mins - a.mins).map((t) => /* @__PURE__ */ import_react5.default.createElement(Ticket, { key: t.id, t, alertMins, onAdvance: advance, flash: flashId === t.id })), vis.filter((t) => t.status === k).length === 0 && /* @__PURE__ */ import_react5.default.createElement("p", { className: "hz-kcol__empty story" }, "Sin pedidos.")))))));
  }
  var TS = {
    libre: { label: "Libre", icon: "dot" },
    pidio: { label: "Pidi\xF3", icon: "edit" },
    prep: { label: "En preparaci\xF3n", icon: "flame" },
    servida: { label: "Servida", icon: "check" },
    cuenta: { label: "Pidiendo cuenta", icon: "receipt" }
  };
  function TableBoard({ initial = TABLES }) {
    const [tables, setTables] = (0, import_react5.useState)(initial);
    const [feed, setFeed] = (0, import_react5.useState)([
      { id: 1, t: "Hace 2 min", icon: "bell", text: "Mesa 7 llama al mozo", mesa: 7, kind: "call" },
      { id: 2, t: "Hace 4 min", icon: "receipt", text: "Mesa 10 pide la cuenta", mesa: 10, kind: "bill" },
      { id: 3, t: "Hace 6 min", icon: "check", text: "Mesa 2: postres listos para servir", mesa: 2, kind: "ready" }
    ]);
    const attend = (n) => {
      setTables((ts) => ts.map((t) => t.n === n ? { ...t, call: false } : t));
      setFeed((f) => f.filter((x) => !(x.mesa === n && x.kind === "call")));
    };
    const calling = tables.filter((t) => t.call).length;
    return /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-floor" }, /* @__PURE__ */ import_react5.default.createElement("header", { className: "hz-floor__head" }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("h2", { className: "display-md" }, "Sal\xF3n"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "caption" }, "Servicio de cena \xB7 ", tables.filter((t) => t.status !== "libre").length, " de ", tables.length, " mesas ocupadas")), /* @__PURE__ */ import_react5.default.createElement("ul", { className: "hz-legend" }, Object.entries(TS).map(([k, v]) => /* @__PURE__ */ import_react5.default.createElement("li", { key: k }, /* @__PURE__ */ import_react5.default.createElement("i", { className: `hz-lg hz-lg--${k}` }, /* @__PURE__ */ import_react5.default.createElement(Icon, { name: v.icon, size: 12 })), v.label)))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-floor__body" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-tables" }, tables.map((t) => /* @__PURE__ */ import_react5.default.createElement("article", { key: t.n, className: `hz-tbl hz-tbl--${t.status}${t.call ? " is-call" : ""}` }, /* @__PURE__ */ import_react5.default.createElement("header", null, /* @__PURE__ */ import_react5.default.createElement("b", { className: "display-lg" }, t.n), t.call && /* @__PURE__ */ import_react5.default.createElement("span", { className: "hz-tbl__bell", "aria-label": "Llama al mozo" }, /* @__PURE__ */ import_react5.default.createElement(Icon, { name: "bell", size: 16 }))), /* @__PURE__ */ import_react5.default.createElement("p", { className: "hz-tbl__st label-caps" }, /* @__PURE__ */ import_react5.default.createElement(Icon, { name: TS[t.status].icon, size: 13 }), TS[t.status].label), t.amount ? /* @__PURE__ */ import_react5.default.createElement("p", { className: "price hz-tbl__amt" }, money(t.amount)) : /* @__PURE__ */ import_react5.default.createElement("p", { className: "caption hz-tbl__amt" }, "\xA0"), t.call && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "hz-tbl__go button", onClick: () => attend(t.n) }, "Atender \xB7 hace ", t.callMins, "\u2032")))), /* @__PURE__ */ import_react5.default.createElement("aside", { className: "hz-feed", "aria-label": "Avisos" }, /* @__PURE__ */ import_react5.default.createElement("h3", { className: "label-caps hz-block-label" }, "Avisos", calling ? /* @__PURE__ */ import_react5.default.createElement("b", { className: "price hz-feed__n" }, calling) : null), /* @__PURE__ */ import_react5.default.createElement("ul", null, feed.map((f) => /* @__PURE__ */ import_react5.default.createElement("li", { key: f.id, className: `hz-feed__i is-${f.kind}` }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "hz-feed__ic" }, /* @__PURE__ */ import_react5.default.createElement(Icon, { name: f.icon, size: 16 })), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("p", { className: "body-sm" }, /* @__PURE__ */ import_react5.default.createElement("b", null, f.text)), /* @__PURE__ */ import_react5.default.createElement("p", { className: "caption" }, f.t)))), !feed.length && /* @__PURE__ */ import_react5.default.createElement("li", { className: "story" }, "Todo al d\xEDa.")))));
  }
  var SALES = [["Vie", 612], ["S\xE1b", 884], ["Dom", 731], ["Lun", 342], ["Mar", 398], ["Mi\xE9", 455], ["Jue", 563]];
  var HOURS = [[12, 14], [13, 38], [14, 31], [15, 12], [16, 6], [17, 7], [18, 14], [19, 22], [20, 41], [21, 57], [22, 49], [23, 23]];
  function AdminReports() {
    const maxS = Math.max(...SALES.map((s) => s[1]));
    const maxH = Math.max(...HOURS.map((h) => h[1]));
    const top = [["Cortes a la parrilla", 214, "parrilla"], ["Haze burger", 188, "hamburguesa"], ["Pizza de pepperoni", 163, "pizza"], ["Malbec Reserva", 141, "vino-malbec-reserva"], ["Empanadas", 132, "empanadas"]];
    const low = [["Agua sin gas 1,5 L", 9, "agua-smart"], ["Los Riscos Sauvignon", 14, "vino-sauvignon-blanc"], ["Espaguetis bolognesa", 26, "spaghetti"]];
    return /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-admin" }, /* @__PURE__ */ import_react5.default.createElement("header", { className: "hz-admin__head" }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("h2", { className: "display-md" }, "Reportes"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "caption" }, "\xDAltimos 7 d\xEDas \xB7 Jue 17 al Jue 23 de octubre")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-admin__export" }, /* @__PURE__ */ import_react5.default.createElement(Button, { kind: "ghost", icon: "download" }, "Excel"), /* @__PURE__ */ import_react5.default.createElement(Button, { kind: "ghost", icon: "download" }, "PDF"))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-kpis" }, [["Ventas", "$ 3.985.000", "+8% vs. semana anterior"], ["Ticket promedio", "$ 31.400", "por mesa"], ["Pedidos", "1.274", "3,1 por mesa"], ["Preparaci\xF3n", "14 min", "promedio, de recibido a listo"]].map(([a, b, c]) => /* @__PURE__ */ import_react5.default.createElement("article", { key: a, className: "hz-kpi" }, /* @__PURE__ */ import_react5.default.createElement("p", { className: "label-caps" }, a), /* @__PURE__ */ import_react5.default.createElement("p", { className: "display-lg price" }, b), /* @__PURE__ */ import_react5.default.createElement("p", { className: "caption" }, c)))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-charts" }, /* @__PURE__ */ import_react5.default.createElement("article", { className: "hz-chart" }, /* @__PURE__ */ import_react5.default.createElement("h3", { className: "label-caps hz-block-label" }, "Ventas por d\xEDa ", /* @__PURE__ */ import_react5.default.createElement("span", { className: "caption" }, "en miles de $")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-bars hz-bars--v" }, SALES.map(([d, v]) => /* @__PURE__ */ import_react5.default.createElement("div", { key: d, className: "hz-bar" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "price caption" }, v), /* @__PURE__ */ import_react5.default.createElement("i", { style: { height: v / maxS * 100 + "%" } }), /* @__PURE__ */ import_react5.default.createElement("b", { className: "caption" }, d))))), /* @__PURE__ */ import_react5.default.createElement("article", { className: "hz-chart" }, /* @__PURE__ */ import_react5.default.createElement("h3", { className: "label-caps hz-block-label" }, "Horarios pico ", /* @__PURE__ */ import_react5.default.createElement("span", { className: "caption" }, "pedidos por hora")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-bars hz-bars--v hz-bars--tight" }, HOURS.map(([h, v]) => /* @__PURE__ */ import_react5.default.createElement("div", { key: h, className: `hz-bar${v === maxH ? " is-peak" : ""}` }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "price caption" }, v >= 40 ? v : ""), /* @__PURE__ */ import_react5.default.createElement("i", { style: { height: v / maxH * 100 + "%" } }), /* @__PURE__ */ import_react5.default.createElement("b", { className: "caption" }, h)))))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-charts" }, /* @__PURE__ */ import_react5.default.createElement("article", { className: "hz-chart" }, /* @__PURE__ */ import_react5.default.createElement("h3", { className: "label-caps hz-block-label" }, "M\xE1s pedidos"), /* @__PURE__ */ import_react5.default.createElement("ol", { className: "hz-rank" }, top.map(([n, v, p]) => /* @__PURE__ */ import_react5.default.createElement("li", { key: n }, /* @__PURE__ */ import_react5.default.createElement(Plate, { photo: p, size: 40, ring: false }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "body-sm" }, n), /* @__PURE__ */ import_react5.default.createElement("i", { style: { "--w": v / 214 * 100 + "%" } }), /* @__PURE__ */ import_react5.default.createElement("b", { className: "price" }, v))))), /* @__PURE__ */ import_react5.default.createElement("article", { className: "hz-chart" }, /* @__PURE__ */ import_react5.default.createElement("h3", { className: "label-caps hz-block-label" }, "Menos pedidos"), /* @__PURE__ */ import_react5.default.createElement("ol", { className: "hz-rank is-low" }, low.map(([n, v, p]) => /* @__PURE__ */ import_react5.default.createElement("li", { key: n }, /* @__PURE__ */ import_react5.default.createElement(Plate, { photo: p, size: 40, ring: false }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "body-sm" }, n), /* @__PURE__ */ import_react5.default.createElement("i", { style: { "--w": v / 214 * 100 + "%" } }), /* @__PURE__ */ import_react5.default.createElement("b", { className: "price" }, v)))))));
  }
  function DishEditor() {
    const [list, setList] = (0, import_react5.useState)(DISHES.map((d2) => ({ ...d2 })));
    const [sel, setSel] = (0, import_react5.useState)("parrilla");
    const d = list.find((x) => x.id === sel);
    const set = (id, patch) => setList((l) => l.map((x) => x.id === id ? { ...x, ...patch } : x));
    const [aller, setAller] = (0, import_react5.useState)(null);
    const al = d.allergens || [];
    return /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-editor" }, /* @__PURE__ */ import_react5.default.createElement("aside", { className: "hz-editor__list" }, /* @__PURE__ */ import_react5.default.createElement("header", { className: "hz-editor__lh" }, /* @__PURE__ */ import_react5.default.createElement("h2", { className: "label-caps" }, "Platos"), /* @__PURE__ */ import_react5.default.createElement("span", { className: "caption" }, list.filter((x) => x.soldOut).length, " agotados")), /* @__PURE__ */ import_react5.default.createElement("ul", null, list.map((x) => /* @__PURE__ */ import_react5.default.createElement("li", { key: x.id, className: `${x.id === sel ? "is-on" : ""}${x.soldOut ? " is-off" : ""}` }, /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "hz-editor__pick", onClick: () => setSel(x.id) }, /* @__PURE__ */ import_react5.default.createElement(Plate, { photo: x.photo, size: 44, ring: false, off: !!x.soldOut }), /* @__PURE__ */ import_react5.default.createElement("span", null, /* @__PURE__ */ import_react5.default.createElement("b", null, loc(x.name, "es")), /* @__PURE__ */ import_react5.default.createElement("small", { className: "caption price" }, money(x.price)))), /* @__PURE__ */ import_react5.default.createElement("label", { className: "hz-editor__sw" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "caption" }, x.soldOut ? "Agotado" : "Disponible"), /* @__PURE__ */ import_react5.default.createElement(Switch, { checked: !x.soldOut, onChange: (v) => set(x.id, { soldOut: !v }), label: `Disponible: ${loc(x.name, "es")}` })))))), /* @__PURE__ */ import_react5.default.createElement("section", { className: "hz-editor__form", key: d.id }, /* @__PURE__ */ import_react5.default.createElement("header", { className: "hz-editor__fh" }, /* @__PURE__ */ import_react5.default.createElement("h2", { className: "display-md" }, loc(d.name, "es")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-editor__acts" }, /* @__PURE__ */ import_react5.default.createElement(Button, { kind: "ghost", icon: "pause", onClick: () => set(d.id, { soldOut: !d.soldOut }) }, d.soldOut ? "Reactivar" : "Pausar plato"), /* @__PURE__ */ import_react5.default.createElement(Button, { kind: "primary" }, "Guardar cambios"))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-editor__grid" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-editor__photo" }, /* @__PURE__ */ import_react5.default.createElement(Plate, { photo: d.photo, size: 150, off: !!d.soldOut }), /* @__PURE__ */ import_react5.default.createElement(Button, { kind: "ghost", icon: "download" }, "Cambiar foto"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "caption" }, "Recorte y mejora autom\xE1ticos.")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-editor__fields" }, /* @__PURE__ */ import_react5.default.createElement("label", { className: "hz-field" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "label-caps hz-field__label" }, "Nombre"), /* @__PURE__ */ import_react5.default.createElement("input", { className: "hz-input", defaultValue: loc(d.name, "es") })), /* @__PURE__ */ import_react5.default.createElement("label", { className: "hz-field" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "label-caps hz-field__label" }, "Descripci\xF3n"), /* @__PURE__ */ import_react5.default.createElement("textarea", { className: "hz-input", rows: 3, defaultValue: loc(d.desc, "es") })), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-editor__row" }, /* @__PURE__ */ import_react5.default.createElement("label", { className: "hz-field" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "label-caps hz-field__label" }, "Precio"), /* @__PURE__ */ import_react5.default.createElement("input", { className: "hz-input price", defaultValue: d.price.toLocaleString("es-AR"), inputMode: "numeric" })), /* @__PURE__ */ import_react5.default.createElement("label", { className: "hz-field" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "label-caps hz-field__label" }, "Categor\xEDa"), /* @__PURE__ */ import_react5.default.createElement("select", { className: "hz-input", defaultValue: d.cat }, CATEGORIES.map((c) => /* @__PURE__ */ import_react5.default.createElement("option", { key: c.id, value: c.id }, loc(c.name, "es"))))), /* @__PURE__ */ import_react5.default.createElement("label", { className: "hz-field" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "label-caps hz-field__label" }, "Tiempo (min)"), /* @__PURE__ */ import_react5.default.createElement("input", { className: "hz-input price", defaultValue: `${d.time[0]}\u2013${d.time[1]}` }))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-field" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "label-caps hz-field__label" }, "Al\xE9rgenos"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-editor__chips" }, Object.keys(ALLERGENS).map((a) => /* @__PURE__ */ import_react5.default.createElement(Chip, { key: a, active: al.includes(a), onClick: () => set(d.id, { allergens: al.includes(a) ? al.filter((x) => x !== a) : [...al, a] }) }, loc(ALLERGENS[a], "es")))))))));
  }
  function QRCode({ value, size = 160, className = "" }) {
    const m = (0, import_react5.useMemo)(() => {
      const q = (0, import_qrcode_generator.default)(0, "M");
      q.addData(value);
      q.make();
      return q;
    }, [value]);
    const n = m.getModuleCount();
    let d = "";
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (m.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
    return /* @__PURE__ */ import_react5.default.createElement("svg", { className: `hz-qr ${className}`, viewBox: `-2 -2 ${n + 4} ${n + 4}`, width: size, height: size, role: "img", "aria-label": `C\xF3digo QR ${value}`, shapeRendering: "crispEdges" }, /* @__PURE__ */ import_react5.default.createElement("rect", { x: "-2", y: "-2", width: n + 4, height: n + 4, fill: "#fff" }), /* @__PURE__ */ import_react5.default.createElement("path", { d, fill: "#1f1815" }));
  }
  function QRSheet({ tables = [1, 2, 3, 4, 5, 6], base = "haze.carta.app/m/" }) {
    return /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-qrs" }, /* @__PURE__ */ import_react5.default.createElement("header", { className: "hz-admin__head" }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("h2", { className: "display-md" }, "Mesas y QR"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "caption" }, "Cada QR abre la carta con el n\xFAmero de mesa ya asociado.")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-admin__export" }, /* @__PURE__ */ import_react5.default.createElement(Button, { kind: "ghost", icon: "download" }, "Descargar PNG"), /* @__PURE__ */ import_react5.default.createElement(Button, { kind: "primary", icon: "printer" }, "Todos en PDF"))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-qrs__grid" }, tables.map((n) => /* @__PURE__ */ import_react5.default.createElement("article", { key: n, className: "hz-qrcard" }, /* @__PURE__ */ import_react5.default.createElement(Logo, { height: 18 }), /* @__PURE__ */ import_react5.default.createElement(QRCode, { value: `https://${base}${n}`, size: 132 }), /* @__PURE__ */ import_react5.default.createElement("p", { className: "label-caps" }, "Mesa"), /* @__PURE__ */ import_react5.default.createElement("b", { className: "display-xl price" }, n), /* @__PURE__ */ import_react5.default.createElement("p", { className: "caption" }, "Escane\xE1 para ver la carta"), /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "hz-link" }, /* @__PURE__ */ import_react5.default.createElement(Icon, { name: "download", size: 14 }), "PNG")))));
  }
  var FB = [
    [5, "Mesa 12", "Hoy 21:40", "La parrilla en su punto y el mozo atento. Volvemos."],
    [4, "Mesa 3", "Hoy 20:15", "Todo muy rico, la pizza tard\xF3 un poco m\xE1s de lo esperado."],
    [2, "Mesa 9", "Ayer 22:05", "Pedimos la cuenta y esperamos 15 minutos. La comida bien."],
    [5, "Mesa 5", "Ayer 21:30", "El Malbec con los cortes, una combinaci\xF3n perfecta."]
  ];
  function FeedbackInbox() {
    const [f, setF] = (0, import_react5.useState)(0);
    const dist = [5, 4, 3, 2, 1].map((n) => [n, { 5: 62, 4: 24, 3: 7, 2: 4, 1: 3 }[n]]);
    const rows = FB.filter((r) => !f || r[0] === f);
    return /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-inbox" }, /* @__PURE__ */ import_react5.default.createElement("header", { className: "hz-admin__head" }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("h2", { className: "display-md" }, "Opiniones privadas"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "caption" }, "Llegan solo al panel del due\xF1o. Todos los clientes ven tambi\xE9n el camino a Google."))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-inbox__top" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-inbox__avg" }, /* @__PURE__ */ import_react5.default.createElement("b", { className: "display-xl price" }, "4,5"), /* @__PURE__ */ import_react5.default.createElement("span", { className: "caption" }, "sobre 5 \xB7 148 respuestas")), /* @__PURE__ */ import_react5.default.createElement("ul", { className: "hz-inbox__dist" }, dist.map(([n, v]) => /* @__PURE__ */ import_react5.default.createElement("li", { key: n }, /* @__PURE__ */ import_react5.default.createElement("b", { className: "price caption" }, n), /* @__PURE__ */ import_react5.default.createElement("i", { style: { "--w": v + "%" } }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "price caption" }, v, "%"))))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-filters" }, /* @__PURE__ */ import_react5.default.createElement(Chip, { active: !f, onClick: () => setF(0) }, "Todas"), [5, 4, 3, 2, 1].map((n) => /* @__PURE__ */ import_react5.default.createElement(Chip, { key: n, active: f === n, onClick: () => setF(n) }, n))), /* @__PURE__ */ import_react5.default.createElement("ul", { className: "hz-inbox__list" }, rows.map(([n, m, t, c], i) => /* @__PURE__ */ import_react5.default.createElement("li", { key: i }, /* @__PURE__ */ import_react5.default.createElement("span", { className: `hz-pill is-${n >= 4 ? "hi" : n === 3 ? "mid" : "lo"}` }, /* @__PURE__ */ import_react5.default.createElement("b", { className: "price" }, n), "/5"), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("p", { className: "body-sm" }, c), /* @__PURE__ */ import_react5.default.createElement("p", { className: "caption" }, m, " \xB7 ", t))))));
  }
  var USERS = [["Luc\xEDa Fern\xE1ndez", "Administradora", ["Carta", "Reportes", "Usuarios"]], ["Mateo Ibarra", "Mozo", ["Sal\xF3n"]], ["Rosa Quiroga", "Cocina", ["Cocina", "Postres"]], ["Diego Paz", "Parrilla", ["Parrilla"]]];
  function AdminUsers() {
    const cols = ["Carta", "Reportes", "Usuarios", "Sal\xF3n", "Cocina", "Parrilla", "Postres", "Barra"];
    const [u, setU] = (0, import_react5.useState)(USERS.map((x) => ({ n: x[0], r: x[1], p: new Set(x[2]) })));
    const tog = (i, c) => setU((us) => us.map((x, j) => {
      if (j !== i) return x;
      const p = new Set(x.p);
      p.has(c) ? p.delete(c) : p.add(c);
      return { ...x, p };
    }));
    return /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-users" }, /* @__PURE__ */ import_react5.default.createElement("header", { className: "hz-admin__head" }, /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("h2", { className: "display-md" }, "Usuarios y permisos"), /* @__PURE__ */ import_react5.default.createElement("p", { className: "caption" }, "Cada persona entra con su correo y verificaci\xF3n en dos pasos.")), /* @__PURE__ */ import_react5.default.createElement(Button, { kind: "primary", icon: "plus" }, "Invitar")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "hz-users__wrap" }, /* @__PURE__ */ import_react5.default.createElement("table", null, /* @__PURE__ */ import_react5.default.createElement("thead", null, /* @__PURE__ */ import_react5.default.createElement("tr", null, /* @__PURE__ */ import_react5.default.createElement("th", { scope: "col", className: "label-caps" }, "Persona"), cols.map((c) => /* @__PURE__ */ import_react5.default.createElement("th", { key: c, scope: "col", className: "label-caps" }, c)))), /* @__PURE__ */ import_react5.default.createElement("tbody", null, u.map((x, i) => /* @__PURE__ */ import_react5.default.createElement("tr", { key: x.n }, /* @__PURE__ */ import_react5.default.createElement("th", { scope: "row" }, /* @__PURE__ */ import_react5.default.createElement("b", null, x.n), /* @__PURE__ */ import_react5.default.createElement("small", { className: "caption" }, x.r)), cols.map((c) => /* @__PURE__ */ import_react5.default.createElement("td", { key: c }, /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: `hz-perm${x.p.has(c) ? " is-on" : ""}`, "aria-pressed": x.p.has(c), "aria-label": `${x.n}: ${c}`, onClick: () => tog(i, c) }, x.p.has(c) ? /* @__PURE__ */ import_react5.default.createElement(Icon, { name: "check", size: 14 }) : null)))))))));
  }

  // ../src/app.jsx
  var import_react6 = __toESM(require_react());
  var norm = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  function matchDiet(d, f) {
    if (f === "vegetariano") return d.diet.includes("vegetariano") || d.diet.includes("vegano");
    if (f === "sinlacteos") return !d.allergens.includes("lacteos");
    return d.diet.includes(f);
  }
  function Screen({ title, onBack, children, lang = "es" }) {
    return /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-screen" }, /* @__PURE__ */ import_react6.default.createElement("header", { className: "hz-screen__head" }, /* @__PURE__ */ import_react6.default.createElement("button", { type: "button", className: "hz-iconbtn", onClick: onBack, "aria-label": "Volver" }, /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "left", size: 22 })), /* @__PURE__ */ import_react6.default.createElement("h2", { className: "display-md" }, title)), /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-screen__scroll" }, children));
  }
  function Phone({ children, theme, className = "" }) {
    return /* @__PURE__ */ import_react6.default.createElement("div", { className: `hz-phone ${className}`, "data-theme": theme }, children);
  }
  function CartaCliente({ initialHour = 21, initialLang = "es", controls = true, startSplash = true, splashMs = 2800 }) {
    const [hour, setHour] = (0, import_react6.useState)(initialHour);
    const slot = slotAt(hour);
    const [lang, setLang] = (0, import_react6.useState)(initialLang);
    const [splash, setSplash] = (0, import_react6.useState)(startSplash);
    const [replay, setReplay] = (0, import_react6.useState)(0);
    const [filters, setFilters] = (0, import_react6.useState)([]);
    const [q, setQ] = (0, import_react6.useState)("");
    const [cat, setCat] = (0, import_react6.useState)(null);
    const [dish, setDish] = (0, import_react6.useState)(null);
    const [sheetOpen, setSheetOpen] = (0, import_react6.useState)(false);
    const [cart, setCart] = (0, import_react6.useState)([]);
    const [cartOpen, setCartOpen] = (0, import_react6.useState)(false);
    const [batches, setBatches] = (0, import_react6.useState)([]);
    const [screen, setScreen] = (0, import_react6.useState)(null);
    const [waiter, setWaiter] = (0, import_react6.useState)("idle");
    const [billState, setBillState] = (0, import_react6.useState)("idle");
    const [toast, setToast] = (0, import_react6.useState)("");
    const [who, setWho] = (0, import_react6.useState)("Vos");
    const [auto, setAuto] = (0, import_react6.useState)(true);
    const scrollRef = (0, import_react6.useRef)(null);
    const refs = (0, import_react6.useRef)({});
    const toastT = (0, import_react6.useRef)();
    const say = (m) => {
      setToast(m);
      clearTimeout(toastT.current);
      toastT.current = setTimeout(() => setToast(""), 2200);
    };
    const cats = CATEGORIES.filter((c) => c.slots.includes(slot.id));
    const visible = (0, import_react6.useMemo)(() => cats.map((c) => ({
      c,
      items: DISHES.filter((d) => d.cat === c.id && filters.every((f) => matchDiet(d, f)) && (!q || norm(loc(d.name, lang) + " " + loc(d.desc, lang)).includes(norm(q))))
    })).filter((s) => s.items.length), [slot.id, filters, q, lang]);
    const chef = DISHES.find((d) => d.tags && d.tags.includes("chef") && d.cat !== "vinos" && cats.some((c) => c.id === d.cat) && !d.soldOut);
    const showChef = chef && !q && !filters.length;
    (0, import_react6.useEffect)(() => {
      if (visible.length && (!cat || !visible.some((s) => s.c.id === cat))) setCat(visible[0].c.id);
    }, [visible]);
    const onScroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      let cur = visible[0] && visible[0].c.id;
      visible.forEach((s) => {
        const n = refs.current[s.c.id];
        if (n && n.offsetTop - 150 <= el.scrollTop) cur = s.c.id;
      });
      if (cur && cur !== cat) setCat(cur);
    };
    const goCat = (id) => {
      const el = scrollRef.current, n = refs.current[id];
      if (el && n) el.scrollTo({ top: n.offsetTop - 118, behavior: "smooth" });
    };
    const addLine = (l) => {
      const line = { ...l, who };
      const key = [line.dish.id, line.variants.join(), line.extras.join(), line.removes.join(), line.notes, who].join("|");
      setCart((c) => {
        const i = c.findIndex((x) => x.key === key);
        if (i >= 0) return c.map((x, j) => j === i ? { ...x, qty: x.qty + line.qty } : x);
        return [...c, { ...line, key }];
      });
      say(`${loc(line.dish.name, lang)} \xB7 +${line.qty}`);
    };
    const quickAdd = (d) => {
      const variants = (d.variants || []).map((v) => {
        var _a;
        return `${loc(v.label, lang)}: ${loc(v.options[(_a = v.def) != null ? _a : 0], lang)}`;
      });
      const delta = (d.variants || []).reduce((s, v) => {
        var _a;
        return s + (v.options[(_a = v.def) != null ? _a : 0].delta || 0);
      }, 0);
      addLine({ dish: d, qty: 1, unit: d.price + delta, variants, extras: [], removes: [], notes: "" });
    };
    const qtyOf = (id) => cart.filter((l) => l.dish.id === id).reduce((s, l) => s + l.qty, 0);
    const setQty = (key, qty) => setCart((c) => c.flatMap((l) => l.key !== key ? [l] : qty <= 0 ? [] : [{ ...l, qty }]));
    const count = cart.reduce((s, l) => s + l.qty, 0);
    const total = cart.reduce((s, l) => s + l.qty * l.unit, 0);
    const inCart = (cats_) => cart.some((l) => cats_.includes(l.dish.cat));
    const suggestions = (0, import_react6.useMemo)(() => {
      const out = [];
      if (!inCart(["bebidas", "vinos"])) out.push("coca-cola", "vino-malbec-reserva");
      if (!inCart(["entradas"])) out.push("empanadas");
      if (!inCart(["postres"])) out.push("tiramisu");
      if (!inCart(["cafe"])) out.push("cafe");
      return out.filter((id) => !DISH[id].soldOut && cats.some((c) => c.id === DISH[id].cat)).slice(0, 4);
    }, [cart, slot.id]);
    const now = () => `${pad2(Math.floor(hour))}:${pad2(Math.floor(hour % 1 * 60) + 0)}`;
    const confirm = () => {
      const t = now();
      setBatches((b) => [...b, { n: b.length + 1, time: t, items: cart, status: 0, times: [t] }]);
      setCart([]);
      setCartOpen(false);
      say(tr(lang, "sentToKitchen"));
    };
    const advance = () => setBatches((bs) => bs.map((b, i) => i === bs.length - 1 && b.status < 3 ? { ...b, status: b.status + 1, times: [...b.times, now()] } : b));
    (0, import_react6.useEffect)(() => {
      if (!auto) return;
      const id = setInterval(advance, 7e3);
      return () => clearInterval(id);
    }, [auto, batches.length, hour]);
    const bill = batches.length ? batches.flatMap((b) => b.items).reduce((acc, l) => {
      const k = l.dish.id + l.unit;
      const e = acc.find((x) => x.k === k);
      if (e) e.qty += l.qty;
      else acc.push({ k, id: k, name: loc(l.dish.name, lang), qty: l.qty, unit: l.unit, who: l.who });
      return acc;
    }, []) : DEMO_BILL;
    const last = batches[batches.length - 1];
    const open = (d) => {
      setDish(d);
      setSheetOpen(true);
    };
    return /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-stage" }, /* @__PURE__ */ import_react6.default.createElement(Phone, { theme: slot.theme }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-root hz-app" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-scroll", ref: scrollRef, onScroll }, /* @__PURE__ */ import_react6.default.createElement(TopBar, { lang, onLang: setLang, table: RESTAURANT.table }), /* @__PURE__ */ import_react6.default.createElement(SlotBanner, { slot, lang }), last && /* @__PURE__ */ import_react6.default.createElement("button", { type: "button", className: "hz-live", onClick: () => setScreen("status") }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "hz-live__txt" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "label-caps" }, tr(lang, "batch"), " ", last.n), /* @__PURE__ */ import_react6.default.createElement("b", null, tr(lang, ["received", "preparing", "ready", "served"][last.status]))), /* @__PURE__ */ import_react6.default.createElement("span", { className: "hz-live__seg", "aria-hidden": "true" }, [0, 1, 2, 3].map((i) => /* @__PURE__ */ import_react6.default.createElement("i", { key: i, className: i <= last.status ? "is-on" : "" }))), /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "right", size: 18 })), /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-searchrow" }, /* @__PURE__ */ import_react6.default.createElement(SearchField, { value: q, onChange: setQ, lang })), /* @__PURE__ */ import_react6.default.createElement(FilterChips, { active: filters, lang, onToggle: (f) => setFilters((a) => a.includes(f) ? a.filter((x) => x !== f) : [...a, f]) }), /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-stickycats" }, /* @__PURE__ */ import_react6.default.createElement(CategoryBar, { cats: visible.map((s) => s.c), active: cat, onPick: goCat, lang })), showChef && /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-pad" }, /* @__PURE__ */ import_react6.default.createElement(DishFeature, { dish: chef, lang, qty: qtyOf(chef.id), onOpen: open, onAdd: quickAdd })), visible.map((s) => /* @__PURE__ */ import_react6.default.createElement("section", { key: s.c.id, className: "hz-section", ref: (n) => {
      refs.current[s.c.id] = n;
    } }, /* @__PURE__ */ import_react6.default.createElement(SectionTitle, { aside: `${s.items.length}` }, loc(s.c.name, lang)), /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-list" }, s.items.map((d) => /* @__PURE__ */ import_react6.default.createElement(DishRow, { key: d.id, dish: d, lang, qty: qtyOf(d.id), onOpen: open, onAdd: quickAdd }))))), !visible.length && /* @__PURE__ */ import_react6.default.createElement("p", { className: "hz-noresult story" }, "Nada coincide con tu b\xFAsqueda."), /* @__PURE__ */ import_react6.default.createElement("p", { className: "hz-foot caption" }, "Inform\xE1 a tu mozo ante cualquier alergia o intolerancia. Precios en pesos argentinos, con IVA incluido."), /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-spacer" })), /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-bottom" }, /* @__PURE__ */ import_react6.default.createElement(CartBar, { count, total, lang, onOpen: () => setCartOpen(true) }), /* @__PURE__ */ import_react6.default.createElement(
      ServiceDock,
      {
        lang,
        waiter,
        bill: billState,
        onWaiter: () => {
          setWaiter(waiter === "idle" ? "called" : "idle");
          say(waiter === "idle" ? tr(lang, "waiterCalled") : "\u2014");
        },
        onBill: () => {
          setBillState("asked");
          setScreen("bill");
        }
      }
    )), /* @__PURE__ */ import_react6.default.createElement(
      DishSheet,
      {
        dish,
        open: sheetOpen,
        lang,
        onClose: () => setSheetOpen(false),
        onAdd: (l) => {
          addLine(l);
          if (l.dish.id === (dish && dish.id)) setSheetOpen(false);
        },
        onOpenOther: (d) => setDish(d)
      }
    ), /* @__PURE__ */ import_react6.default.createElement(Sheet, { open: cartOpen, onClose: () => setCartOpen(false), tall: true, label: tr(lang, "yourOrder") }, /* @__PURE__ */ import_react6.default.createElement(
      CartPanel,
      {
        lines: cart,
        lang,
        guests: ["Vos", "Lu", "Mati"],
        who,
        onWho: setWho,
        table: RESTAURANT.table,
        onQty: setQty,
        onClose: () => setCartOpen(false),
        onConfirm: confirm,
        suggestions,
        onAddSuggestion: quickAdd
      }
    )), screen === "status" && /* @__PURE__ */ import_react6.default.createElement(Screen, { title: tr(lang, "myOrder"), onBack: () => setScreen(null), lang }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-pad hz-stack" }, [...batches].reverse().map((b) => /* @__PURE__ */ import_react6.default.createElement(TandaCard, { key: b.n, batch: b, lang, open: true })))), screen === "bill" && /* @__PURE__ */ import_react6.default.createElement(Screen, { title: tr(lang, "askBill"), onBack: () => setScreen(null), lang }, /* @__PURE__ */ import_react6.default.createElement("p", { className: "hz-callout body-sm" }, /* @__PURE__ */ import_react6.default.createElement(Icon, { name: "bell", size: 16 }), tr(lang, "waiterCalled"), ". ", lang === "es" ? "Tambi\xE9n pod\xE9s pagar desde ac\xE1." : lang === "en" ? "You can also pay from here." : "Voc\xEA tamb\xE9m pode pagar daqui."), /* @__PURE__ */ import_react6.default.createElement(Bill, { lines: bill, lang, table: RESTAURANT.table, onPay: () => setScreen("thanks") })), screen === "thanks" && /* @__PURE__ */ import_react6.default.createElement(Screen, { title: "", onBack: () => setScreen(null), lang }, /* @__PURE__ */ import_react6.default.createElement(Thanks, { lang, name: "Camila" })), /* @__PURE__ */ import_react6.default.createElement(Toast, { show: !!toast }, toast), splash && /* @__PURE__ */ import_react6.default.createElement(Splash, { lang, table: RESTAURANT.table, slot, autoMs: splashMs, replayKey: replay, onDone: () => setSplash(false) }))), controls && /* @__PURE__ */ import_react6.default.createElement("aside", { className: "hz-demo" }, /* @__PURE__ */ import_react6.default.createElement("h3", { className: "label-caps" }, "Prob\xE1 la carta"), /* @__PURE__ */ import_react6.default.createElement("p", { className: "body-sm" }, "Esta es la pantalla del cliente. Agreg\xE1 platos, confirm\xE1 el pedido, ped\xED la cuenta y recorr\xE9 todo el recorrido."), /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-demo__blk" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "label-caps" }, "Hora simulada"), /* @__PURE__ */ import_react6.default.createElement(Segmented, { value: String(hour), onChange: (v) => setHour(+v), label: "Hora", options: [{ id: "9", label: "09:00" }, { id: "13", label: "13:00" }, { id: "19", label: "19:00" }, { id: "21", label: "21:00" }] })), /* @__PURE__ */ import_react6.default.createElement("p", { className: "caption" }, "El men\xFA y el tema cambian solos con la franja: ", loc(slot.label, "es"), ", tema ", slot.theme === "noche" ? "noche" : "d\xEDa", "."), /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-demo__blk" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "label-caps" }, "Pedido"), /* @__PURE__ */ import_react6.default.createElement("label", { className: "hz-demo__row" }, /* @__PURE__ */ import_react6.default.createElement("input", { type: "checkbox", checked: auto, onChange: (e) => setAuto(e.target.checked) }), /* @__PURE__ */ import_react6.default.createElement("span", { className: "body-sm" }, "Cocina avanza sola cada 7 s")), /* @__PURE__ */ import_react6.default.createElement(Button, { kind: "ghost", onClick: advance, disabled: !last || last.status > 2 }, "Avanzar estado")), /* @__PURE__ */ import_react6.default.createElement(Button, { kind: "ghost", icon: "play", onClick: () => {
      setReplay((r) => r + 1);
      setSplash(true);
    } }, "Ver la entrada otra vez")));
  }
  var TENANTS = [
    { name: "haze", note: "Bord\xF3 y brasa", vars: {}, wordmark: false },
    { name: "Olivo & Sal", note: "Oliva y miel", vars: { "--surface-100": "#F0EEE3", "--surface-200": "#FAF9F2", "--surface-300": "#E3E0D0", "--bordo": "#2E3B2A", "--action": "#2E3B2A", "--logo-ink": "#2E3B2A", "--brasa": "#8A5A12", "--laton": "#8B7B3E", "--line": "#D3CFB8" } },
    { name: "Brasa Negra", note: "Carb\xF3n y ladrillo", vars: { "--surface-100": "#ECE7DF", "--surface-200": "#F8F5EF", "--surface-300": "#DFD8CC", "--bordo": "#201D1B", "--action": "#201D1B", "--logo-ink": "#201D1B", "--brasa": "#9A2F1A", "--laton": "#8D8578", "--line": "#D2CABB" } }
  ];
  function TenantThemes({ lang = "es" }) {
    const dish = DISH.parrilla, row = DISH.pizza;
    return /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-tenants" }, TENANTS.map((t) => /* @__PURE__ */ import_react6.default.createElement("div", { key: t.name, className: "hz-tenant hz-root", style: t.vars }, /* @__PURE__ */ import_react6.default.createElement("header", { className: "hz-tenant__head" }, t.name === "haze" ? /* @__PURE__ */ import_react6.default.createElement(Logo, { height: 22 }) : /* @__PURE__ */ import_react6.default.createElement("span", { className: "hz-tenant__word display-md", style: { color: "var(--logo-ink)" } }, /* @__PURE__ */ import_react6.default.createElement("em", null, t.name)), /* @__PURE__ */ import_react6.default.createElement("span", { className: "caption" }, t.note)), /* @__PURE__ */ import_react6.default.createElement(DishFeature, { dish, lang }), /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-pad", style: { paddingTop: 8 } }, /* @__PURE__ */ import_react6.default.createElement(DishRow, { dish: row, lang })), /* @__PURE__ */ import_react6.default.createElement("div", { className: "hz-tenant__btn" }, /* @__PURE__ */ import_react6.default.createElement(Button, { kind: "primary", block: true }, "Agregar \xB7 $16.500")))));
  }
  return __toCommonJS(index_exports);
})();
;window.Haze=Haze;
