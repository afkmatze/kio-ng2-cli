"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("../interfaces");
var FormatValueType = (function () {
    function FormatValueType() {
    }
    Object.defineProperty(FormatValueType.prototype, "expression", {
        get: function () {
            if (!this._expression) {
                this._expression = new RegExp('%' + this.flag);
            }
            return this._expression;
        },
        enumerable: true,
        configurable: true
    });
    /*match ( source:string ):FormatParam<T>[] {
      let param:FormatParam<T> = undefined
      let offset = 0
  
      const params:FormatParam<T>[] = []
  
      while ( param = this.nextParam<T>(source,offset) )
      {
        param.formatMapper = this
        params.push ( param )
        offset = param.offset + param.length
      }
  
      return params
    }*/
    /*nextIndex ( source:string ):number {
      const arg = this.nextParam ( source )
      return arg.offset ? arg.offset : -1
    }*/
    FormatValueType.prototype.isEqual = function (other) {
        return this.typeName === other.typeName;
    };
    FormatValueType.prototype.checkType = function (value) {
        return this.typeName === typeof value;
    };
    FormatValueType.prototype.render = function (formatArg, idx) {
        if (interfaces_1.instanceOfFormatArg(formatArg)) {
            return formatArg.value;
        }
        return JSON.stringify(formatArg.value, null, '  ');
    };
    return FormatValueType;
}());
exports.FormatValueType = FormatValueType;
//# sourceMappingURL=type.class.js.map