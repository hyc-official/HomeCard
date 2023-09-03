const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const marked = require("marked");

function build(srcdir, pubdir, cfg) {
    const flist = fs.readdirSync(srcdir);
    flist.forEach((file) => {
        const fullpth = path.join(srcdir, file);
        const stat = fs.statSync(fullpth);
        const pubfullpth = path.join(pubdir, file);
        if (stat.isDirectory()) {
            if (!fs.existsSync(pubfullpth)) {
                fs.mkdirSync(pubfullpth);
            }
            build(fullpth, pubfullpth, cfg);
        } else if (path.extname(file) === ".ejs") {
            const data = fs.readFileSync(fullpth, "utf-8");
            const content = marked.parse(fs.readFileSync(path.join(srcdir, path.parse(file).name + ".md"), "utf-8"));
            cfg.content = content;
            const html = ejs.render(data, cfg);
            fs.writeFileSync(path.join(pubdir, path.parse(file).name + ".html"), html, "utf-8");
        } else {
            fs.copyFileSync(fullpth, pubfullpth);
        }
    });
}

function stbuild(srcdir, pubdir) {
    const data = fs.readFileSync(path.join(srcdir, "config.json"), "utf-8");
    const cfg = JSON.parse(data);
    if (!fs.existsSync(pubdir)) {
        fs.mkdirSync(pubdir);
    }
    build(srcdir, pubdir, cfg);
}

try {
    stbuild("source", "public");
    console.log("Build finished");
} catch(err) {
    console.error("Build failed: %o", err);
}