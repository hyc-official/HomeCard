# HomeCard

一个易于部署、高自定义性的个人主页资料卡片🚀

## Demo

<https://official.heyc.eu.org/HomeCard/>

## 部署指南

想部署一个自己的资料卡吗？根据下面的步骤自定义即可！

1. Fork 本仓库。
2. 在 Actions 选项卡中，打开工作流（Workflow）执行。
3. 修改设置文件 `source/config.json`，标准如下：
    ```javascript
    {
        "title": string, // 页面标题
        "favicon": string, // 浏览器标签页图标 URL
        "user": { // 作者设置
            "name": string, // 作者名称
            "slogan": string, // 个性签名
            "avatar": string // 头像图片 URL
        },
        "customhtml": { // 自定义 HTML 设置
            "headend": string, // <head> 标签末尾自定义 HTML
            "bodyend": string, // <body> 标签末尾自定义 HTML
            "cardend": string // 卡片底端自定义 HTML
        },
        "background": { // 背景设置
            "showimg": boolean, // 是否展示背景图
            "imgurl": string // 背景图 URL
        },
        "linkblocks": [ // 链接块设置
            {
                "icon": string, // 链接图标，如 `fa-solid fa-house`
                "bgcolor": string, // 背景颜色
                "desc": string, // 链接描述
                "title": string, // 链接标题（鼠标悬浮时显示）
                "url": string // 链接跳转 URL
            }
            // 可以将上面的结构重复多次...记得除最后一个外需要加逗号
        ],
        "linkicons": [ // 图标链接设置
            {
                "icon": string, // 链接图标，如 `fa-solid fa-message`
                "title": string, // 链接标题（鼠标悬浮时显示）
                "url": string // 链接跳转 URL
            }
            // 可以将上面的结构重复多次...记得除最后一个外需要加逗号
        ]
    }
    ```
4. 修改自我介绍 `source/index.md`，使用 Markdown 语法。
5. 将更改推送到仓库，等待约 30 秒自动部署静态文件到 `gh-pages` 分支。
5. 进入 GH Pages 设置（`Settings > Code and automation > Pages`），将 Source 设置为 `Deploy from a branch`（默认），下方的 Branch 设置为 `gh-pages`，点击右侧的保存（`Save`）按钮保存设置。
6. 此时 Pages 会自动开始部署，等待 1-2 分钟后会在 Pages 设置页显示 `Your site is live at https://xxx.github.io/xxx/`，打开里面的链接就可以访问你的资料卡了！