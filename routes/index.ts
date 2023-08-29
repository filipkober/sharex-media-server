import multer from "@koa/multer";
import Router from "@koa/router";
import fs from "fs";

const router = new Router();
const upload = multer();

router.post("/",upload.single("file_image"), async (ctx) => {
    if(ctx.cookies.get("Authorization")?.split(" ")[1] !== process.env.API_KEY) return ctx.throw(401, "Unauthorized");
    if(!ctx.request.file) return ctx.throw(400, "No file uploaded");
    try {
        const filename = ctx.request.file.originalname;
        const filenameSplit = filename.split(".");
        const newFileName = `${filenameSplit[0]}_${Date.now()}.${filenameSplit[filenameSplit.length - 1]}`;
        const file = await fs.promises.writeFile(`${process.env.MEDIA_PATH || "./media"}/${newFileName}`, ctx.request.file.buffer);
        ctx.body = `${process.env.URL || "http://localhost:7766"}/${newFileName}`
    } catch(err) {
        ctx.status = 500;
        ctx.body = err;
    }
});

export default router;