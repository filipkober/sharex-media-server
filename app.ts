import koa from 'koa';
import Router from '@koa/router';
import multer from '@koa/multer';
import fileRoutes from './routes';
import 'dotenv/config'
import serve from 'koa-static';
import views from '@ladjs/koa-views';

const app = new koa();
const router = new Router();

const render = views(__dirname + '/views', {
    map: {
        html: 'ejs'
    }
})

app.use(render);

app.use(serve(process.env.MEDIA_PATH || './media'));

router.get('/hello', (ctx) => {
    ctx.body = 'Hello World!';
})

router.get('/', async (ctx) => {
    await ctx.render('index');
});

router.use(fileRoutes.routes(), fileRoutes.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

app.listen(
    process.env.PORT || 3000,
    () => console.log(`Server started on port ${process.env.PORT || 3000}`)
)