"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Service = /** @class */ (function () {
    function Service(ctx) {
        this.ctx = ctx;
    }
    return Service;
}());
var check = /** @class */ (function (_super) {
    __extends(check, _super);
    function check() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    check.prototype.index = function () {
        return 2 + 3;
    };
    return check;
}(Service));
module.exports = check;
