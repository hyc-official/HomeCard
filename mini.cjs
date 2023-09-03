const fs = require("fs");
const path = require("path");
const HTMLMinifier = require("html-minifier").minify;
const UglifyJS = require("uglify-js").minify;
const CleanCSS = require("clean-css");

function mini(dir) {
    const flist = fs.readdirSync(dir);
    flist.forEach((file) => {
        const fullpth = path.join(dir, file);
        const stat = fs.statSync(fullpth);
        if (stat.isDirectory()) {
            mini(fullpth);
        } else if (path.extname(file) === ".html") {
            const data = fs.readFileSync(fullpth, "utf-8");
            const res = HTMLMinifier(data, {
                caseSensitive: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
            });
            fs.writeFileSync(fullpth, res, "utf-8");
        } else if (path.extname(file) === ".js") {
            const data = fs.readFileSync(fullpth, "utf-8");
            const res = UglifyJS(data, {
                keep_fargs: true,
                keep_fnames: true,
                toplevel: true,
            });
            fs.writeFileSync(fullpth, res.code, "utf-8");
        } else if (path.extname(file) === ".css") {
            const data = fs.readFileSync(fullpth, "utf-8");
            const res = new CleanCSS({}).minify(data);
            fs.writeFileSync(fullpth, res.styles, "utf-8");
        }
    });
}

try {
    mini("public");
    console.log("Minify finished");
} catch(err) {
    console.error("Minify failed: %o", err);
}