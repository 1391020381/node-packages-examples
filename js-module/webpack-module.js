(function (modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = (installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {},
        });
        modules[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__
        );
        module.l = true;
        return module.exports;
    }
    return __webpack_require__((__webpack_require__.s = 0));
})([
    /* 0 */
    function (module, exports, __webpack_require__) {
        var b = __webpack_require__(1);
        b();
    },
    /* 1 */
    function (module, exports) {
        module.exports = function () {
            console.log(11);
        };
    },
]);

