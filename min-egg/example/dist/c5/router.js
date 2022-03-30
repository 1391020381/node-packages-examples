"use strict";
module.exports = function (controller) {
    return {
        'get /': controller.user.user,
        'get /userInfo': controller.user.userInfo
    };
};
