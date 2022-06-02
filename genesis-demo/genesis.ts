// 核心业务逻辑入口
import { Renderer, SSR } from '@fmfe/genesis-core';
import express from 'express';

/**
 * 创建一个应用程序
 */
export const app = express();

/**
 * 创建一个 SSR 实例
 */
export const ssr = new SSR();

/**
 * 拿到渲染器后，启动应用程序
 */
export const startApp = (renderer: Renderer) => {
    /**
     * 请求进来，渲染html
     */
    app.get('*', async (req, res, next) => {
        try {
            const result = await renderer.renderHtml({ req, res });
            res.send(result.data);
        } catch (e) {
            next(e);
        }
    });
    /**
     * 监听端口
     */
    app.listen(3000, () => console.log(`http://localhost:3000`));
};
