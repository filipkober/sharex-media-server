import multer from "@koa/multer";
import Router from "@koa/router";
import fs from "fs";

const router = new Router();
const upload = multer();

router.get("/:filename", async (ctx) => {
    try {
        const filename = ctx.params.filename;
        const file = await fs.promises.readFile(`${process.env.MEDIA_PATH || "./media"}/${filename}`);
        ctx.body = file;
    } catch (err) {
        ctx.status = 404;
        ctx.body = "File not found";
    }
});
router.post("/",upload.single("file_image"), async (ctx) => {
    if(ctx.cookies.get("Authorization")?.split(" ")[1] !== process.env.API_KEY) return ctx.throw(401, "Unauthorized");
    console.log(ctx.request)
    console.log(ctx.request.file)
    console.log(ctx.request.files)
    console.log(ctx.files)
    console.log(ctx.file)
    if(!ctx.request.file) return ctx.throw(400, "No file uploaded");
    try {
        const filename = ctx.request.file.filename;
        const file = await fs.promises.writeFile(`${process.env.MEDIA_PATH || "./media"}/${filename}`, ctx.request.file.buffer);
        ctx.redirect(`/${filename}`);
    } catch(err) {
        ctx.status = 500;
        ctx.body = "Internal server error";
    }
});

export default router;