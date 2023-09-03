const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const marked = require("marked");

function build(dir, cfg) {
    const flist = fs.readdirSync(dir);
    flist.forEach((file) => {
        const fullpth = path.join(dir, file);
        const stat = fs.statSync(fullpth);
        if (stat.isDirectory()) {
            build(fullpth, cfg);
        } else if (path.extname(file) === ".ejs") {
            const data = fs.readFileSync(fullpth, "utf-8");
            const content = marked.parse(fs.readFileSync(path.join(dir, path.parse(file).name + ".md"), "utf-8"));
            cfg.content = content;
            const html = ejs.render(data, cfg);
            fs.writeFileSync(path.join(dir, path.parse(file).name + ".html"), html, "utf-8");
        }
    });
}

function stbuild(dir) {
    const data = fs.readFileSync(path.join(dir, "config.json"), "utf-8");
    const cfg = JSON.parse(data);
    build(dir, cfg);
}

try {
    stbuild("source");
    console.log("Build finished");
} catch(err) {
    console.error("Build failed: %o", err);
}