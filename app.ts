import koa from 'koa';
import Router from '@koa/router';
import multer from '@koa/multer';
import fileRoutes from './routes';

const app = new koa();
const router = new Router();
const upload = multer();

router.use('/', fileRoutes.routes(), fileRoutes.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());


app.listen(
    process.env.PORT || 3000,
    () => console.log(`Server started on port ${process.env.PORT || 3000}`)
)