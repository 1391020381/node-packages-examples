

module.exports = (controller: any) => {
    return {
        'get /': controller.user.user,
        'get /userInfo': controller.user.userInfo
    }
}