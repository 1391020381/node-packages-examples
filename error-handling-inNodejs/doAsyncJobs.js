// 使用 async await 组织异步代码
const doAsyncJobs = async () => {
    try {
        const result1 = await job1();
        const result2 = await job2(result1);
        const result3 = await job3(result2);
        return await job4(result3);
    } catch (error) {
        console.error(error);
    } finally {
        await anywayDoThisJob();
    }
}
const user = await User.getUserById(1);
if (user === null)
    // 抛出错误
    throw new APIError(
        'NOT FOUND',
        HttpStatusCode.NOT_FOUND,
        true,
        'detailed explanation'
    );
// 向外抛出错误   express 通过 next(error) 向外抛出错误
try {
    userService.addNewUser(req.body).then((newUser) => {
        res.status(200).json(newUser);
    }).catch((error) => {
        next(error)
    });
} catch (error) {
    next(error);
}

// 集中处理
app.use(async (err, req, res, next) => {
    if (!errorHandler.isTrustedError(err)) {
        next(err);
    }
    await errorHandler.handleError(err);
})
process.on('unhandledRejection', (reason) => {
    throw reason;
});
process.on('uncaughtException', (error) => {
    errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error)) {
        process.exit(1);
    }
});