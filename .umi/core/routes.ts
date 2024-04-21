// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/ice/Desktop/learn/hooks/node_modules/.pnpm/@umijs+runtime@3.5.37_react@16.14.0/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'../dumi/layout')})],
    "component": ((props) => dynamic({
          loader: async () => {
            const React = await import('react');
            const { default: getDemoRenderArgs } = await import(/* webpackChunkName: 'dumi_demos' */ '/Users/ice/Desktop/learn/hooks/node_modules/.pnpm/@umijs+preset-dumi@1.1.50_react-dom@18.2.0_react-router@6.8.2_react@18.2.0_typescript@5.1.3_umi@3.5.37/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
            const { default: Previewer } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi-theme-default/es/builtins/Previewer.js');
            const { usePrefersColor, context } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi/theme');

            return props => {
              
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
            }
          },
          loading: () => null,
        }))()
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'../dumi/layout')}), dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'/Users/ice/Desktop/learn/hooks/node_modules/.pnpm/dumi-theme-default@1.1.24_@umijs+preset-dumi@1.1.50_react-dom@18.2.0_react@18.2.0/node_modules/dumi-theme-default/es/layout.js')})],
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/docs/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/index.en-US.md",
          "updatedTime": 1703036956000,
          "title": "ahooks - React Hooks Library",
          "hero": {
            "image": "/logo.svg",
            "desc": "<div class=\"markdown\"><p>A high-quality &#x26; reliable React Hooks library</p></div>",
            "actions": [
              {
                "text": "Guide",
                "link": "/guide"
              },
              {
                "text": "Hooks List",
                "link": "/hooks"
              }
            ]
          },
          "footer": "<div class=\"markdown\"><p>Open-source MIT Licensed | Copyright © 2019-present<br />Powered by <a href=\"https://d.umijs.org/\" target=\"_blank\">dumi<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"\" x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a></p></div>",
          "slugs": [
            {
              "depth": 2,
              "value": "✨ Features",
              "heading": "-features"
            },
            {
              "depth": 2,
              "value": "📦 Install",
              "heading": "-install"
            },
            {
              "depth": 2,
              "value": "🔨 Usage",
              "heading": "-usage"
            },
            {
              "depth": 2,
              "value": "💻 Online Demo",
              "heading": "-online-demo"
            },
            {
              "depth": 2,
              "value": "🤝 Contributing",
              "heading": "-contributing"
            },
            {
              "depth": 2,
              "value": "👥 Discuss",
              "heading": "-discuss"
            }
          ],
          "locale": "en-US"
        },
        "title": "ahooks - React Hooks Library - ahooks 3.0"
      },
      {
        "path": "/zh-CN",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/docs/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/index.zh-CN.md",
          "updatedTime": 1703036956000,
          "title": "ahooks - React Hooks Library",
          "hero": {
            "image": "/logo.svg",
            "desc": "<div class=\"markdown\"><p>一套高质量可靠的 React Hooks 库</p></div>",
            "actions": [
              {
                "text": "指南",
                "link": "/zh-CN/guide"
              },
              {
                "text": "Hooks 列表",
                "link": "/zh-CN/hooks"
              }
            ]
          },
          "footer": "<div class=\"markdown\"><p>Open-source MIT Licensed | Copyright © 2019-present<br />Powered by <a href=\"https://d.umijs.org/\" target=\"_blank\">dumi<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"\" x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a></p></div>",
          "slugs": [
            {
              "depth": 2,
              "value": "✨ 特性",
              "heading": "-特性"
            },
            {
              "depth": 2,
              "value": "📦 安装",
              "heading": "-安装"
            },
            {
              "depth": 2,
              "value": "🔨 使用",
              "heading": "-使用"
            },
            {
              "depth": 2,
              "value": "💻 在线体验",
              "heading": "-在线体验"
            },
            {
              "depth": 2,
              "value": "🤝 参与共建",
              "heading": "-参与共建"
            },
            {
              "depth": 2,
              "value": "👥 交流讨论",
              "heading": "-交流讨论"
            }
          ],
          "locale": "zh-CN"
        },
        "title": "ahooks - React Hooks Library - ahooks 3.0"
      },
      {
        "path": "/guide/dom",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__dom.en-US.md' */'/Users/ice/Desktop/learn/hooks/docs/guide/dom.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/dom.en-US.md",
          "updatedTime": 1647913062000,
          "slugs": [
            {
              "depth": 2,
              "value": "Hooks of DOM specification",
              "heading": "hooks-of-dom-specification"
            }
          ],
          "title": "Hooks of DOM specification",
          "locale": "en-US",
          "nav": {
            "path": "/guide",
            "title": "Guide"
          }
        },
        "title": "Hooks of DOM specification - ahooks 3.0"
      },
      {
        "path": "/zh-CN/guide/dom",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__dom.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/docs/guide/dom.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/dom.zh-CN.md",
          "updatedTime": 1647913062000,
          "slugs": [
            {
              "depth": 2,
              "value": "DOM 类 Hooks 使用规范",
              "heading": "dom-类-hooks-使用规范"
            }
          ],
          "title": "DOM 类 Hooks 使用规范",
          "locale": "zh-CN",
          "nav": {
            "path": "/zh-CN/guide",
            "title": "Guide"
          }
        },
        "title": "DOM 类 Hooks 使用规范 - ahooks 3.0"
      },
      {
        "path": "/guide",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/docs/guide/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/index.en-US.md",
          "updatedTime": 1693128243000,
          "slugs": [
            {
              "depth": 2,
              "value": "Intro",
              "heading": "intro"
            },
            {
              "depth": 2,
              "value": "Features",
              "heading": "features"
            },
            {
              "depth": 2,
              "value": "Install",
              "heading": "install"
            },
            {
              "depth": 2,
              "value": "Usage",
              "heading": "usage"
            },
            {
              "depth": 2,
              "value": "Online Demo",
              "heading": "online-demo"
            }
          ],
          "title": "Intro",
          "locale": "en-US",
          "nav": {
            "path": "/guide",
            "title": "Guide"
          }
        },
        "title": "Intro - ahooks 3.0"
      },
      {
        "path": "/zh-CN/guide",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/docs/guide/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/index.zh-CN.md",
          "updatedTime": 1693128243000,
          "slugs": [
            {
              "depth": 1,
              "value": "介绍",
              "heading": "介绍"
            },
            {
              "depth": 2,
              "value": "特性",
              "heading": "特性"
            },
            {
              "depth": 2,
              "value": "安装",
              "heading": "安装"
            },
            {
              "depth": 2,
              "value": "使用",
              "heading": "使用"
            },
            {
              "depth": 2,
              "value": "💻 在线体验",
              "heading": "-在线体验"
            }
          ],
          "title": "介绍",
          "locale": "zh-CN",
          "nav": {
            "path": "/zh-CN/guide",
            "title": "Guide"
          }
        },
        "title": "介绍 - ahooks 3.0"
      },
      {
        "path": "/guide/upgrade",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__upgrade.en-US.md' */'/Users/ice/Desktop/learn/hooks/docs/guide/upgrade.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/upgrade.en-US.md",
          "updatedTime": 1639483062000,
          "slugs": [
            {
              "depth": 2,
              "value": "v2 to v3",
              "heading": "v2-to-v3"
            },
            {
              "depth": 2,
              "value": "Upgrade suggestion",
              "heading": "upgrade-suggestion"
            },
            {
              "depth": 2,
              "value": "New useRequest",
              "heading": "new-userequest"
            },
            {
              "depth": 3,
              "value": "Detailed changes",
              "heading": "detailed-changes"
            },
            {
              "depth": 2,
              "value": "Support SSR",
              "heading": "support-ssr"
            },
            {
              "depth": 2,
              "value": "Hooks of DOM support dynamic target",
              "heading": "hooks-of-dom-support-dynamic-target"
            },
            {
              "depth": 2,
              "value": "Avoid closure problems",
              "heading": "avoid-closure-problems"
            },
            {
              "depth": 2,
              "value": "Support strict mode",
              "heading": "support-strict-mode"
            },
            {
              "depth": 2,
              "value": "Support react-refresh (HMR) mode",
              "heading": "support-react-refresh-hmr-mode"
            },
            {
              "depth": 2,
              "value": "More changes",
              "heading": "more-changes"
            },
            {
              "depth": 3,
              "value": "New Hooks",
              "heading": "new-hooks"
            },
            {
              "depth": 3,
              "value": "Breaking Changes",
              "heading": "breaking-changes"
            },
            {
              "depth": 3,
              "value": "Optimization",
              "heading": "optimization"
            },
            {
              "depth": 2,
              "value": "FAQ",
              "heading": "faq"
            },
            {
              "depth": 3,
              "value": "How is useRequest compatible with deleted capabilities?",
              "heading": "how-is-userequest-compatible-with-deleted-capabilities"
            }
          ],
          "title": "v2 to v3",
          "locale": "en-US",
          "nav": {
            "path": "/guide",
            "title": "Guide"
          }
        },
        "title": "v2 to v3 - ahooks 3.0"
      },
      {
        "path": "/zh-CN/guide/upgrade",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__upgrade.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/docs/guide/upgrade.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/upgrade.zh-CN.md",
          "updatedTime": 1639483062000,
          "slugs": [
            {
              "depth": 2,
              "value": "v2 to v3",
              "heading": "v2-to-v3"
            },
            {
              "depth": 2,
              "value": "升级建议",
              "heading": "升级建议"
            },
            {
              "depth": 2,
              "value": "全新的 useRequest",
              "heading": "全新的-userequest"
            },
            {
              "depth": 3,
              "value": "详细变更",
              "heading": "详细变更"
            },
            {
              "depth": 2,
              "value": "SSR 支持",
              "heading": "ssr-支持"
            },
            {
              "depth": 2,
              "value": "DOM 类 Hooks 支持 target 动态变化",
              "heading": "dom-类-hooks-支持-target-动态变化"
            },
            {
              "depth": 2,
              "value": "避免闭包问题",
              "heading": "避免闭包问题"
            },
            {
              "depth": 2,
              "value": "支持严格模式",
              "heading": "支持严格模式"
            },
            {
              "depth": 2,
              "value": "支持 react-refresh（HMR）模式",
              "heading": "支持-react-refreshhmr模式"
            },
            {
              "depth": 2,
              "value": "更多变更",
              "heading": "更多变更"
            },
            {
              "depth": 3,
              "value": "新增 Hooks",
              "heading": "新增-hooks"
            },
            {
              "depth": 3,
              "value": "Breaking Changes",
              "heading": "breaking-changes"
            },
            {
              "depth": 3,
              "value": "优化",
              "heading": "优化"
            },
            {
              "depth": 2,
              "value": "FAQ",
              "heading": "faq"
            },
            {
              "depth": 3,
              "value": "useRequest 被删除的能力如何兼容？",
              "heading": "userequest-被删除的能力如何兼容"
            }
          ],
          "title": "v2 to v3",
          "locale": "zh-CN",
          "nav": {
            "path": "/zh-CN/guide",
            "title": "Guide"
          }
        },
        "title": "v2 to v3 - ahooks 3.0"
      },
      {
        "path": "/guide/blog/function",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__blog__function.en-US.md' */'/Users/ice/Desktop/learn/hooks/docs/guide/blog/function.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/blog/function.en-US.md",
          "updatedTime": 1638188083000,
          "slugs": [
            {
              "depth": 1,
              "value": "ahooks function specification",
              "heading": "ahooks-function-specification"
            },
            {
              "depth": 2,
              "value": "Principle",
              "heading": "principle"
            }
          ],
          "title": "ahooks function specification",
          "locale": "en-US",
          "nav": {
            "path": "/guide",
            "title": "Guide"
          },
          "group": {
            "path": "/guide/blog",
            "title": "Blog"
          }
        },
        "title": "ahooks function specification - ahooks 3.0"
      },
      {
        "path": "/zh-CN/guide/blog/function",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__blog__function.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/docs/guide/blog/function.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/blog/function.zh-CN.md",
          "updatedTime": 1638188083000,
          "slugs": [
            {
              "depth": 1,
              "value": "ahooks 函数处理规范",
              "heading": "ahooks-函数处理规范"
            },
            {
              "depth": 2,
              "value": "实现原理",
              "heading": "实现原理"
            }
          ],
          "title": "ahooks 函数处理规范",
          "locale": "zh-CN",
          "nav": {
            "path": "/zh-CN/guide",
            "title": "Guide"
          },
          "group": {
            "path": "/zh-CN/guide/blog",
            "title": "Blog"
          }
        },
        "title": "ahooks 函数处理规范 - ahooks 3.0"
      },
      {
        "path": "/guide/blog/hmr",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__blog__hmr.en-US.md' */'/Users/ice/Desktop/learn/hooks/docs/guide/blog/hmr.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/blog/hmr.en-US.md",
          "updatedTime": 1637546003000,
          "slugs": [
            {
              "depth": 1,
              "value": "React Hooks & react-refresh（HMR）",
              "heading": "react-hooks--react-refreshhmr"
            },
            {
              "depth": 2,
              "value": "What is react-refresh?",
              "heading": "what-is-react-refresh"
            },
            {
              "depth": 2,
              "value": "Simple Principles of react-refresh",
              "heading": "simple-principles-of-react-refresh"
            },
            {
              "depth": 2,
              "value": "Problem caused by react-refresh",
              "heading": "problem-caused-by-react-refresh"
            },
            {
              "depth": 3,
              "value": "First problem",
              "heading": "first-problem"
            },
            {
              "depth": 3,
              "value": "Second problem",
              "heading": "second-problem"
            },
            {
              "depth": 3,
              "value": "Third problem",
              "heading": "third-problem"
            },
            {
              "depth": 2,
              "value": "How to solve these problems",
              "heading": "how-to-solve-these-problems"
            },
            {
              "depth": 3,
              "value": "First solution",
              "heading": "first-solution"
            },
            {
              "depth": 3,
              "value": "Second solution",
              "heading": "second-solution"
            },
            {
              "depth": 2,
              "value": "Official attitude",
              "heading": "official-attitude"
            }
          ],
          "title": "React Hooks & react-refresh（HMR）",
          "locale": "en-US",
          "nav": {
            "path": "/guide",
            "title": "Guide"
          },
          "group": {
            "path": "/guide/blog",
            "title": "Blog"
          }
        },
        "title": "React Hooks & react-refresh（HMR） - ahooks 3.0"
      },
      {
        "path": "/zh-CN/guide/blog/hmr",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__blog__hmr.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/docs/guide/blog/hmr.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/blog/hmr.zh-CN.md",
          "updatedTime": 1637546003000,
          "slugs": [
            {
              "depth": 1,
              "value": "React Hooks & react-refresh（HMR）",
              "heading": "react-hooks--react-refreshhmr"
            },
            {
              "depth": 2,
              "value": "什么是 react-refresh",
              "heading": "什么是-react-refresh"
            },
            {
              "depth": 2,
              "value": "react-refresh 的简单原理",
              "heading": "react-refresh-的简单原理"
            },
            {
              "depth": 2,
              "value": "react-refresh 工作机制导致的问题",
              "heading": "react-refresh-工作机制导致的问题"
            },
            {
              "depth": 3,
              "value": "第一个问题",
              "heading": "第一个问题"
            },
            {
              "depth": 3,
              "value": "第二个问题",
              "heading": "第二个问题"
            },
            {
              "depth": 3,
              "value": "第三个问题",
              "heading": "第三个问题"
            },
            {
              "depth": 2,
              "value": "如何解决这些问题",
              "heading": "如何解决这些问题"
            },
            {
              "depth": 3,
              "value": "方案一",
              "heading": "方案一"
            },
            {
              "depth": 3,
              "value": "方案二",
              "heading": "方案二"
            },
            {
              "depth": 2,
              "value": "官方态度",
              "heading": "官方态度"
            }
          ],
          "title": "React Hooks & react-refresh（HMR）",
          "locale": "zh-CN",
          "nav": {
            "path": "/zh-CN/guide",
            "title": "Guide"
          },
          "group": {
            "path": "/zh-CN/guide/blog",
            "title": "Blog"
          }
        },
        "title": "React Hooks & react-refresh（HMR） - ahooks 3.0"
      },
      {
        "path": "/guide/blog/ssr",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__blog__ssr.en-US.md' */'/Users/ice/Desktop/learn/hooks/docs/guide/blog/ssr.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/blog/ssr.en-US.md",
          "updatedTime": 1637546003000,
          "slugs": [
            {
              "depth": 1,
              "value": "React Hooks & SSR",
              "heading": "react-hooks--ssr"
            },
            {
              "depth": 2,
              "value": "Problem 1: DOM/BOM is missing",
              "heading": "problem-1-dombom-is-missing"
            },
            {
              "depth": 3,
              "value": "Solution",
              "heading": "solution"
            },
            {
              "depth": 2,
              "value": "Problem 2: useLayoutEffect Warning",
              "heading": "problem-2-uselayouteffect-warning"
            },
            {
              "depth": 3,
              "value": "Solution",
              "heading": "solution-1"
            },
            {
              "depth": 2,
              "value": "Summary: Need to pay attention when writing Hooks",
              "heading": "summary-need-to-pay-attention-when-writing-hooks"
            },
            {
              "depth": 2,
              "value": "Reference",
              "heading": "reference"
            }
          ],
          "title": "React Hooks & SSR",
          "locale": "en-US",
          "nav": {
            "path": "/guide",
            "title": "Guide"
          },
          "group": {
            "path": "/guide/blog",
            "title": "Blog"
          }
        },
        "title": "React Hooks & SSR - ahooks 3.0"
      },
      {
        "path": "/zh-CN/guide/blog/ssr",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__blog__ssr.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/docs/guide/blog/ssr.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/blog/ssr.zh-CN.md",
          "updatedTime": 1637546003000,
          "slugs": [
            {
              "depth": 1,
              "value": "React Hooks & SSR",
              "heading": "react-hooks--ssr"
            },
            {
              "depth": 2,
              "value": "问题一：DOM/BOM 缺失",
              "heading": "问题一dombom-缺失"
            },
            {
              "depth": 3,
              "value": "解决方案",
              "heading": "解决方案"
            },
            {
              "depth": 2,
              "value": "问题二 useLayoutEffect Warning",
              "heading": "问题二-uselayouteffect-warning"
            },
            {
              "depth": 3,
              "value": "解决方案",
              "heading": "解决方案-1"
            },
            {
              "depth": 2,
              "value": "总结：写 Hooks 时需要注意",
              "heading": "总结写-hooks-时需要注意"
            },
            {
              "depth": 2,
              "value": "参考资料",
              "heading": "参考资料"
            }
          ],
          "title": "React Hooks & SSR",
          "locale": "zh-CN",
          "nav": {
            "path": "/zh-CN/guide",
            "title": "Guide"
          },
          "group": {
            "path": "/zh-CN/guide/blog",
            "title": "Blog"
          }
        },
        "title": "React Hooks & SSR - ahooks 3.0"
      },
      {
        "path": "/guide/blog/strict",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__blog__strict.en-US.md' */'/Users/ice/Desktop/learn/hooks/docs/guide/blog/strict.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/blog/strict.en-US.md",
          "updatedTime": 1637546003000,
          "slugs": [
            {
              "depth": 1,
              "value": "React Hooks & strict mode",
              "heading": "react-hooks--strict-mode"
            },
            {
              "depth": 2,
              "value": "What is strict mode",
              "heading": "what-is-strict-mode"
            },
            {
              "depth": 2,
              "value": "Points to note in React Hooks",
              "heading": "points-to-note-in-react-hooks"
            }
          ],
          "title": "React Hooks & strict mode",
          "locale": "en-US",
          "nav": {
            "path": "/guide",
            "title": "Guide"
          },
          "group": {
            "path": "/guide/blog",
            "title": "Blog"
          }
        },
        "title": "React Hooks & strict mode - ahooks 3.0"
      },
      {
        "path": "/zh-CN/guide/blog/strict",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'docs__guide__blog__strict.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/docs/guide/blog/strict.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "docs/guide/blog/strict.zh-CN.md",
          "updatedTime": 1637546003000,
          "slugs": [
            {
              "depth": 1,
              "value": "React Hooks & strict mode",
              "heading": "react-hooks--strict-mode"
            },
            {
              "depth": 2,
              "value": "什么是严格模式",
              "heading": "什么是严格模式"
            },
            {
              "depth": 2,
              "value": "在 React Hooks 中需要注意的点",
              "heading": "在-react-hooks-中需要注意的点"
            }
          ],
          "title": "React Hooks & strict mode",
          "locale": "zh-CN",
          "nav": {
            "path": "/zh-CN/guide",
            "title": "Guide"
          },
          "group": {
            "path": "/zh-CN/guide/blog",
            "title": "Blog"
          }
        },
        "title": "React Hooks & strict mode - ahooks 3.0"
      },
      {
        "path": "/hooks/use-antd-table",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useAntdTable__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useAntdTable/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useAntdTable/index.en-US.md",
          "updatedTime": 1668400309000,
          "componentName": "useAntdTable",
          "nav": {
            "path": "/hooks",
            "title": "UseAntdTable"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useAntdTable",
              "heading": "useantdtable"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Table management",
              "heading": "table-management"
            },
            {
              "depth": 3,
              "value": "Form and Table data binding",
              "heading": "form-and-table-data-binding"
            },
            {
              "depth": 3,
              "value": "Default Params",
              "heading": "default-params"
            },
            {
              "depth": 3,
              "value": "Form Validation",
              "heading": "form-validation"
            },
            {
              "depth": 3,
              "value": "Data Caching",
              "heading": "data-caching"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useAntdTable",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-antd-table",
            "title": "UseAntdTable"
          }
        },
        "title": "useAntdTable - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-antd-table",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useAntdTable__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useAntdTable/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useAntdTable/index.zh-CN.md",
          "updatedTime": 1668400309000,
          "componentName": "useAntdTable",
          "nav": {
            "title": "Hooks",
            "path": "/zh-CN/hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useAntdTable",
              "heading": "useantdtable"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "Table 管理",
              "heading": "table-管理"
            },
            {
              "depth": 3,
              "value": "Form 与 Table 联动",
              "heading": "form-与-table-联动"
            },
            {
              "depth": 3,
              "value": "初始化数据",
              "heading": "初始化数据"
            },
            {
              "depth": 3,
              "value": "表单验证",
              "heading": "表单验证"
            },
            {
              "depth": 3,
              "value": "缓存",
              "heading": "缓存"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useAntdTable",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-antd-table",
            "title": "Hooks"
          }
        },
        "title": "useAntdTable - ahooks 3.0"
      },
      {
        "path": "/hooks/use-async-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useAsyncEffect__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useAsyncEffect/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useAsyncEffect/index.en-US.md",
          "updatedTime": 1636380500000,
          "nav": {
            "path": "/hooks",
            "title": "UseAsyncEffect"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useAsyncEffect",
              "heading": "useasynceffect"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Break off",
              "heading": "break-off"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useAsyncEffect",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-async-effect",
            "title": "UseAsyncEffect"
          }
        },
        "title": "useAsyncEffect - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-async-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useAsyncEffect__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useAsyncEffect/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useAsyncEffect/index.zh-CN.md",
          "updatedTime": 1636380500000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useAsyncEffect",
              "heading": "useasynceffect"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "中断执行",
              "heading": "中断执行"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useAsyncEffect",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-async-effect",
            "title": "Hooks"
          }
        },
        "title": "useAsyncEffect - ahooks 3.0"
      },
      {
        "path": "/hooks/use-boolean",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useBoolean__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useBoolean/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useBoolean/index.en-US.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/hooks",
            "title": "UseBoolean"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useBoolean",
              "heading": "useboolean"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Actions",
              "heading": "actions"
            }
          ],
          "title": "useBoolean",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-boolean",
            "title": "UseBoolean"
          }
        },
        "title": "useBoolean - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-boolean",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useBoolean__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useBoolean/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useBoolean/index.zh-CN.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useBoolean",
              "heading": "useboolean"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Actions",
              "heading": "actions"
            }
          ],
          "title": "useBoolean",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-boolean",
            "title": "Hooks"
          }
        },
        "title": "useBoolean - ahooks 3.0"
      },
      {
        "path": "/hooks/use-click-away",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useClickAway__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useClickAway/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useClickAway/index.en-US.md",
          "updatedTime": 1678710062000,
          "nav": {
            "path": "/hooks",
            "title": "UseClickAway"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useClickAway",
              "heading": "useclickaway"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Custom DOM",
              "heading": "custom-dom"
            },
            {
              "depth": 3,
              "value": "Support multiple DOM",
              "heading": "support-multiple-dom"
            },
            {
              "depth": 3,
              "value": "Listen for other events",
              "heading": "listen-for-other-events"
            },
            {
              "depth": 3,
              "value": "Support multiple events",
              "heading": "support-multiple-events"
            },
            {
              "depth": 3,
              "value": "Support shadow DOM",
              "heading": "support-shadow-dom"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useClickAway",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-click-away",
            "title": "UseClickAway"
          }
        },
        "title": "useClickAway - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-click-away",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useClickAway__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useClickAway/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useClickAway/index.zh-CN.md",
          "updatedTime": 1678710062000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useClickAway",
              "heading": "useclickaway"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "自定义 DOM",
              "heading": "自定义-dom"
            },
            {
              "depth": 3,
              "value": "支持多个 DOM 对象",
              "heading": "支持多个-dom-对象"
            },
            {
              "depth": 3,
              "value": "监听其它事件",
              "heading": "监听其它事件"
            },
            {
              "depth": 3,
              "value": "支持多个事件",
              "heading": "支持多个事件"
            },
            {
              "depth": 3,
              "value": "支持 shadow DOM",
              "heading": "支持-shadow-dom"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useClickAway",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-click-away",
            "title": "Hooks"
          }
        },
        "title": "useClickAway - ahooks 3.0"
      },
      {
        "path": "/hooks/use-controllable-value",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useControllableValue__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useControllableValue/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useControllableValue/index.en-US.md",
          "updatedTime": 1668950080000,
          "nav": {
            "path": "/hooks",
            "title": "UseControllableValue"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useControllableValue",
              "heading": "usecontrollablevalue"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Uncontrolled component",
              "heading": "uncontrolled-component"
            },
            {
              "depth": 3,
              "value": "Controlled component",
              "heading": "controlled-component"
            },
            {
              "depth": 3,
              "value": "No value, have onChange component",
              "heading": "no-value-have-onchange-component"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useControllableValue",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-controllable-value",
            "title": "UseControllableValue"
          }
        },
        "title": "useControllableValue - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-controllable-value",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useControllableValue__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useControllableValue/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useControllableValue/index.zh-CN.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useControllableValue",
              "heading": "usecontrollablevalue"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "非受控组件",
              "heading": "非受控组件"
            },
            {
              "depth": 3,
              "value": "受控组件",
              "heading": "受控组件"
            },
            {
              "depth": 3,
              "value": "无 value，有 onChange 的组件",
              "heading": "无-value有-onchange-的组件"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useControllableValue",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-controllable-value",
            "title": "Hooks"
          }
        },
        "title": "useControllableValue - ahooks 3.0"
      },
      {
        "path": "/hooks/use-cookie-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useCookieState__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useCookieState/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useCookieState/index.en-US.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/hooks",
            "title": "UseCookieState"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useCookieState",
              "heading": "usecookiestate"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Store state into Cookie",
              "heading": "store-state-into-cookie"
            },
            {
              "depth": 3,
              "value": "SetState can receive function",
              "heading": "setstate-can-receive-function"
            },
            {
              "depth": 3,
              "value": "Use the option property to configure Cookie",
              "heading": "use-the-option-property-to-configure-cookie"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useCookieState",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-cookie-state",
            "title": "UseCookieState"
          }
        },
        "title": "useCookieState - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-cookie-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useCookieState__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useCookieState/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useCookieState/index.zh-CN.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useCookieState",
              "heading": "usecookiestate"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "将 state 存储在 Cookie 中",
              "heading": "将-state-存储在-cookie-中"
            },
            {
              "depth": 3,
              "value": "setState 可以接收函数",
              "heading": "setstate-可以接收函数"
            },
            {
              "depth": 3,
              "value": "使用 option 配置 Cookie",
              "heading": "使用-option-配置-cookie"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useCookieState",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-cookie-state",
            "title": "Hooks"
          }
        },
        "title": "useCookieState - ahooks 3.0"
      },
      {
        "path": "/hooks/use-count-down",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useCountDown__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useCountDown/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useCountDown/index.en-US.md",
          "updatedTime": 1658481671000,
          "nav": {
            "path": "/hooks",
            "title": "UseCountDown"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useCountDown",
              "heading": "usecountdown"
            },
            {
              "depth": 2,
              "value": "Countdown to target time",
              "heading": "countdown-to-target-time"
            },
            {
              "depth": 2,
              "value": "Dynamic config",
              "heading": "dynamic-config"
            },
            {
              "depth": 2,
              "value": "Config leftTime",
              "heading": "config-lefttime"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Return",
              "heading": "return"
            },
            {
              "depth": 2,
              "value": "Remark",
              "heading": "remark"
            }
          ],
          "title": "useCountDown",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-count-down",
            "title": "UseCountDown"
          }
        },
        "title": "useCountDown - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-count-down",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useCountDown__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useCountDown/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useCountDown/index.zh-CN.md",
          "updatedTime": 1658481671000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useCountDown",
              "heading": "usecountdown"
            },
            {
              "depth": 2,
              "value": "到未来某一时间点的倒计时",
              "heading": "到未来某一时间点的倒计时"
            },
            {
              "depth": 2,
              "value": "配置项动态变化",
              "heading": "配置项动态变化"
            },
            {
              "depth": 2,
              "value": "通过 leftTime 配置剩余时间",
              "heading": "通过-lefttime-配置剩余时间"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 2,
              "value": "备注",
              "heading": "备注"
            }
          ],
          "title": "useCountDown",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-count-down",
            "title": "Hooks"
          }
        },
        "title": "useCountDown - ahooks 3.0"
      },
      {
        "path": "/hooks/use-counter",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useCounter__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useCounter/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useCounter/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseCounter"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useCounter",
              "heading": "usecounter"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useCounter",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-counter",
            "title": "UseCounter"
          }
        },
        "title": "useCounter - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-counter",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useCounter__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useCounter/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useCounter/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useCounter",
              "heading": "usecounter"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useCounter",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-counter",
            "title": "Hooks"
          }
        },
        "title": "useCounter - ahooks 3.0"
      },
      {
        "path": "/hooks/use-creation",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useCreation__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useCreation/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useCreation/index.en-US.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/hooks",
            "title": "UseCreation"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useCreation",
              "heading": "usecreation"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useCreation",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-creation",
            "title": "UseCreation"
          }
        },
        "title": "useCreation - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-creation",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useCreation__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useCreation/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useCreation/index.zh-CN.md",
          "updatedTime": 1691718180000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useCreation",
              "heading": "usecreation"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useCreation",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-creation",
            "title": "Hooks"
          }
        },
        "title": "useCreation - ahooks 3.0"
      },
      {
        "path": "/hooks/use-debounce",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useDebounce__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useDebounce/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useDebounce/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseDebounce"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useDebounce",
              "heading": "usedebounce"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useDebounce",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-debounce",
            "title": "UseDebounce"
          }
        },
        "title": "useDebounce - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-debounce",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useDebounce__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useDebounce/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useDebounce/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useDebounce",
              "heading": "usedebounce"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useDebounce",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-debounce",
            "title": "Hooks"
          }
        },
        "title": "useDebounce - ahooks 3.0"
      },
      {
        "path": "/hooks/use-debounce-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useDebounceEffect__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useDebounceEffect/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useDebounceEffect/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseDebounceEffect"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useDebounceEffect",
              "heading": "usedebounceeffect"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useDebounceEffect",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-debounce-effect",
            "title": "UseDebounceEffect"
          }
        },
        "title": "useDebounceEffect - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-debounce-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useDebounceEffect__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useDebounceEffect/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useDebounceEffect/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useDebounceEffect",
              "heading": "usedebounceeffect"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useDebounceEffect",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-debounce-effect",
            "title": "Hooks"
          }
        },
        "title": "useDebounceEffect - ahooks 3.0"
      },
      {
        "path": "/hooks/use-debounce-fn",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useDebounceFn__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useDebounceFn/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useDebounceFn/index.en-US.md",
          "updatedTime": 1676286633000,
          "nav": {
            "path": "/hooks",
            "title": "UseDebounceFn"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useDebounceFn",
              "heading": "usedebouncefn"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useDebounceFn",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-debounce-fn",
            "title": "UseDebounceFn"
          }
        },
        "title": "useDebounceFn - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-debounce-fn",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useDebounceFn__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useDebounceFn/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useDebounceFn/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useDebounceFn",
              "heading": "usedebouncefn"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useDebounceFn",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-debounce-fn",
            "title": "Hooks"
          }
        },
        "title": "useDebounceFn - ahooks 3.0"
      },
      {
        "path": "/hooks/use-deep-compare-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useDeepCompareEffect__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useDeepCompareEffect/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useDeepCompareEffect/index.en-US.md",
          "updatedTime": 1709215288000,
          "componentName": "useDeepCompareEffect",
          "nav": {
            "path": "/hooks",
            "title": "UseDeepCompareEffect"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useDeepCompareEffect",
              "heading": "usedeepcompareeffect"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useDeepCompareEffect",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-deep-compare-effect",
            "title": "UseDeepCompareEffect"
          }
        },
        "title": "useDeepCompareEffect - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-deep-compare-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useDeepCompareEffect__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useDeepCompareEffect/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useDeepCompareEffect/index.zh-CN.md",
          "updatedTime": 1709215288000,
          "componentName": "useDeepCompareEffect",
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useDeepCompareEffect",
              "heading": "usedeepcompareeffect"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useDeepCompareEffect",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-deep-compare-effect",
            "title": "Hooks"
          }
        },
        "title": "useDeepCompareEffect - ahooks 3.0"
      },
      {
        "path": "/hooks/use-deep-compare-layout-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useDeepCompareLayoutEffect__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useDeepCompareLayoutEffect/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useDeepCompareLayoutEffect/index.en-US.md",
          "updatedTime": 1709215288000,
          "componentName": "useDeepCompareLayoutEffect",
          "nav": {
            "path": "/hooks",
            "title": "UseDeepCompareLayoutEffect"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useDeepCompareLayoutEffect",
              "heading": "usedeepcomparelayouteffect"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useDeepCompareLayoutEffect",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-deep-compare-layout-effect",
            "title": "UseDeepCompareLayoutEffect"
          }
        },
        "title": "useDeepCompareLayoutEffect - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-deep-compare-layout-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useDeepCompareLayoutEffect__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useDeepCompareLayoutEffect/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useDeepCompareLayoutEffect/index.zh-CN.md",
          "updatedTime": 1709215288000,
          "componentName": "useDeepCompareLayoutEffect",
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useDeepCompareLayoutEffect",
              "heading": "usedeepcomparelayouteffect"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useDeepCompareLayoutEffect",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-deep-compare-layout-effect",
            "title": "Hooks"
          }
        },
        "title": "useDeepCompareLayoutEffect - ahooks 3.0"
      },
      {
        "path": "/hooks/use-document-visibility",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useDocumentVisibility__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useDocumentVisibility/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useDocumentVisibility/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseDocumentVisibility"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useDocumentVisibility",
              "heading": "usedocumentvisibility"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useDocumentVisibility",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-document-visibility",
            "title": "UseDocumentVisibility"
          }
        },
        "title": "useDocumentVisibility - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-document-visibility",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useDocumentVisibility__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useDocumentVisibility/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useDocumentVisibility/index.zh-CN.md",
          "updatedTime": 1691025986000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useDocumentVisibility",
              "heading": "usedocumentvisibility"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useDocumentVisibility",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-document-visibility",
            "title": "Hooks"
          }
        },
        "title": "useDocumentVisibility - ahooks 3.0"
      },
      {
        "path": "/hooks/use-drop",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useDrop__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useDrop/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useDrop/index.en-US.md",
          "updatedTime": 1691025986000,
          "nav": {
            "path": "/hooks",
            "title": "UseDrop"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useDrop & useDrag",
              "heading": "usedrop--usedrag"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Basic Usage",
              "heading": "basic-usage"
            },
            {
              "depth": 3,
              "value": "Customize Image",
              "heading": "customize-image"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "useDrag",
              "heading": "usedrag"
            },
            {
              "depth": 4,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 4,
              "value": "DragOptions",
              "heading": "dragoptions"
            },
            {
              "depth": 4,
              "value": "DragImageOptions",
              "heading": "dragimageoptions"
            },
            {
              "depth": 3,
              "value": "useDrop",
              "heading": "usedrop"
            },
            {
              "depth": 4,
              "value": "Params",
              "heading": "params-1"
            },
            {
              "depth": 4,
              "value": "DropOptions",
              "heading": "dropoptions"
            }
          ],
          "title": "useDrop & useDrag",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-drop",
            "title": "UseDrop"
          }
        },
        "title": "useDrop & useDrag - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-drop",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useDrop__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useDrop/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useDrop/index.zh-CN.md",
          "updatedTime": 1691025986000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useDrop & useDrag",
              "heading": "usedrop--usedrag"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "自定义拖拽图像",
              "heading": "自定义拖拽图像"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "useDrag",
              "heading": "usedrag"
            },
            {
              "depth": 4,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 4,
              "value": "DragOptions",
              "heading": "dragoptions"
            },
            {
              "depth": 4,
              "value": "DragImageOptions",
              "heading": "dragimageoptions"
            },
            {
              "depth": 3,
              "value": "useDrop",
              "heading": "usedrop"
            },
            {
              "depth": 4,
              "value": "Params",
              "heading": "params-1"
            },
            {
              "depth": 4,
              "value": "DropOptions",
              "heading": "dropoptions"
            }
          ],
          "title": "useDrop & useDrag",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-drop",
            "title": "Hooks"
          }
        },
        "title": "useDrop & useDrag - ahooks 3.0"
      },
      {
        "path": "/hooks/use-dynamic-list",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useDynamicList__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useDynamicList/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useDynamicList/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseDynamicList"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useDynamicList",
              "heading": "usedynamiclist"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Basic usage",
              "heading": "basic-usage"
            },
            {
              "depth": 3,
              "value": "Using with antd Form",
              "heading": "using-with-antd-form"
            },
            {
              "depth": 3,
              "value": "Another way of writing used in antd Form",
              "heading": "another-way-of-writing-used-in-antd-form"
            },
            {
              "depth": 3,
              "value": "Draggable dynamic table",
              "heading": "draggable-dynamic-table"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useDynamicList",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-dynamic-list",
            "title": "UseDynamicList"
          }
        },
        "title": "useDynamicList - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-dynamic-list",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useDynamicList__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useDynamicList/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useDynamicList/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useDynamicList",
              "heading": "usedynamiclist"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "在 antd Form 中使用",
              "heading": "在-antd-form-中使用"
            },
            {
              "depth": 3,
              "value": "在 antd Form 中使用的另一种写法",
              "heading": "在-antd-form-中使用的另一种写法"
            },
            {
              "depth": 3,
              "value": "可拖拽的动态表格",
              "heading": "可拖拽的动态表格"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            }
          ],
          "title": "useDynamicList",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-dynamic-list",
            "title": "Hooks"
          }
        },
        "title": "useDynamicList - ahooks 3.0"
      },
      {
        "path": "/hooks/use-event-emitter",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useEventEmitter__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useEventEmitter/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useEventEmitter/index.en-US.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/hooks",
            "title": "UseEventEmitter"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useEventEmitter",
              "heading": "useeventemitter"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Parent component shares a event",
              "heading": "parent-component-shares-a-event"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useEventEmitter",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-event-emitter",
            "title": "UseEventEmitter"
          }
        },
        "title": "useEventEmitter - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-event-emitter",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useEventEmitter__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useEventEmitter/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useEventEmitter/index.zh-CN.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useEventEmitter",
              "heading": "useeventemitter"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "父组件向子组件共享事件",
              "heading": "父组件向子组件共享事件"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useEventEmitter",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-event-emitter",
            "title": "Hooks"
          }
        },
        "title": "useEventEmitter - ahooks 3.0"
      },
      {
        "path": "/hooks/use-event-listener",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useEventListener__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useEventListener/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useEventListener/index.en-US.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/hooks",
            "title": "UseEventListener"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useEventListener",
              "heading": "useeventlistener"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Listen for keydown",
              "heading": "listen-for-keydown"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Property",
              "heading": "property"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useEventListener",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-event-listener",
            "title": "UseEventListener"
          }
        },
        "title": "useEventListener - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-event-listener",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useEventListener__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useEventListener/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useEventListener/index.zh-CN.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useEventListener",
              "heading": "useeventlistener"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "监听 keydown 事件",
              "heading": "监听-keydown-事件"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useEventListener",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-event-listener",
            "title": "Hooks"
          }
        },
        "title": "useEventListener - ahooks 3.0"
      },
      {
        "path": "/hooks/use-event-target",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useEventTarget__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useEventTarget/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useEventTarget/index.en-US.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/hooks",
            "title": "UseEventTarget"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useEventTarget",
              "heading": "useeventtarget"
            },
            {
              "depth": 2,
              "value": "Example",
              "heading": "example"
            },
            {
              "depth": 3,
              "value": "Basic Usage",
              "heading": "basic-usage"
            },
            {
              "depth": 3,
              "value": "Custom transformer",
              "heading": "custom-transformer"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useEventTarget",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-event-target",
            "title": "UseEventTarget"
          }
        },
        "title": "useEventTarget - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-event-target",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useEventTarget__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useEventTarget/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useEventTarget/index.zh-CN.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useEventTarget",
              "heading": "useeventtarget"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "自定义转换函数",
              "heading": "自定义转换函数"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useEventTarget",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-event-target",
            "title": "Hooks"
          }
        },
        "title": "useEventTarget - ahooks 3.0"
      },
      {
        "path": "/hooks/use-external",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useExternal__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useExternal/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useExternal/index.en-US.md",
          "updatedTime": 1682249776000,
          "nav": {
            "path": "/hooks",
            "title": "UseExternal"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useExternal",
              "heading": "useexternal"
            },
            {
              "depth": 2,
              "value": "Example",
              "heading": "example"
            },
            {
              "depth": 3,
              "value": "Basic Usage",
              "heading": "basic-usage"
            },
            {
              "depth": 3,
              "value": "Load CSS",
              "heading": "load-css"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useExternal",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-external",
            "title": "UseExternal"
          }
        },
        "title": "useExternal - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-external",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useExternal__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useExternal/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useExternal/index.zh-CN.md",
          "updatedTime": 1682249776000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useExternal",
              "heading": "useexternal"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "加载 CSS",
              "heading": "加载-css"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useExternal",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-external",
            "title": "Hooks"
          }
        },
        "title": "useExternal - ahooks 3.0"
      },
      {
        "path": "/hooks/use-favicon",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useFavicon__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useFavicon/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useFavicon/index.en-US.md",
          "updatedTime": 1679396307000,
          "nav": {
            "path": "/hooks",
            "title": "UseFavicon"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useFavicon",
              "heading": "usefavicon"
            },
            {
              "depth": 2,
              "value": "Example",
              "heading": "example"
            },
            {
              "depth": 3,
              "value": "Basic Usage",
              "heading": "basic-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 2,
              "value": "FAQ",
              "heading": "faq"
            },
            {
              "depth": 3,
              "value": "It doesn't work in Safari?",
              "heading": "it-doesnt-work-in-safari"
            }
          ],
          "title": "useFavicon",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-favicon",
            "title": "UseFavicon"
          }
        },
        "title": "useFavicon - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-favicon",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useFavicon__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useFavicon/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useFavicon/index.zh-CN.md",
          "updatedTime": 1679396307000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useFavicon",
              "heading": "usefavicon"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 2,
              "value": "FAQ",
              "heading": "faq"
            },
            {
              "depth": 3,
              "value": "在 Safari 中不工作？",
              "heading": "在-safari-中不工作"
            }
          ],
          "title": "useFavicon",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-favicon",
            "title": "Hooks"
          }
        },
        "title": "useFavicon - ahooks 3.0"
      },
      {
        "path": "/hooks/use-focus-within",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useFocusWithin__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useFocusWithin/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useFocusWithin/index.en-US.md",
          "updatedTime": 1655708145000,
          "componentName": "useFocusWithin",
          "nav": {
            "path": "/hooks",
            "title": "UseFocusWithin"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useFocusWithin",
              "heading": "usefocuswithin"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Pass in DOM element",
              "heading": "pass-in-dom-element"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useFocusWithin",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-focus-within",
            "title": "UseFocusWithin"
          }
        },
        "title": "useFocusWithin - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-focus-within",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useFocusWithin__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useFocusWithin/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useFocusWithin/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "componentName": "useFocusWithin",
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useFocusWithin",
              "heading": "usefocuswithin"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "传入 DOM 元素",
              "heading": "传入-dom-元素"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useFocusWithin",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-focus-within",
            "title": "Hooks"
          }
        },
        "title": "useFocusWithin - ahooks 3.0"
      },
      {
        "path": "/hooks/use-fullscreen",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useFullscreen__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useFullscreen/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useFullscreen/index.en-US.md",
          "updatedTime": 1689125077000,
          "nav": {
            "path": "/hooks",
            "title": "UseFullscreen"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useFullscreen",
              "heading": "usefullscreen"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Image full screen",
              "heading": "image-full-screen"
            },
            {
              "depth": 3,
              "value": "Page full screen",
              "heading": "page-full-screen"
            },
            {
              "depth": 3,
              "value": "Coexist with other full screen operations",
              "heading": "coexist-with-other-full-screen-operations"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useFullscreen",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-fullscreen",
            "title": "UseFullscreen"
          }
        },
        "title": "useFullscreen - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-fullscreen",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useFullscreen__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useFullscreen/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useFullscreen/index.zh-CN.md",
          "updatedTime": 1689125077000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useFullscreen",
              "heading": "usefullscreen"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "图片全屏",
              "heading": "图片全屏"
            },
            {
              "depth": 3,
              "value": "页面全屏",
              "heading": "页面全屏"
            },
            {
              "depth": 3,
              "value": "与其它全屏操作共存",
              "heading": "与其它全屏操作共存"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useFullscreen",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-fullscreen",
            "title": "Hooks"
          }
        },
        "title": "useFullscreen - ahooks 3.0"
      },
      {
        "path": "/hooks/use-fusion-table",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useFusionTable__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useFusionTable/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useFusionTable/index.en-US.md",
          "updatedTime": 1658228751000,
          "componentName": "useFusionTable",
          "nav": {
            "path": "/hooks",
            "title": "UseFusionTable"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useFusionTable",
              "heading": "usefusiontable"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Table management",
              "heading": "table-management"
            },
            {
              "depth": 3,
              "value": "Form and Table data binding",
              "heading": "form-and-table-data-binding"
            },
            {
              "depth": 3,
              "value": "Default Params",
              "heading": "default-params"
            },
            {
              "depth": 3,
              "value": "Form Validation",
              "heading": "form-validation"
            },
            {
              "depth": 3,
              "value": "Data Caching",
              "heading": "data-caching"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useFusionTable",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-fusion-table",
            "title": "UseFusionTable"
          }
        },
        "title": "useFusionTable - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-fusion-table",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useFusionTable__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useFusionTable/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useFusionTable/index.zh-CN.md",
          "updatedTime": 1658228751000,
          "componentName": "useFusionTable",
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useFusionTable",
              "heading": "usefusiontable"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "Table 管理",
              "heading": "table-管理"
            },
            {
              "depth": 3,
              "value": "Form 与 Table 联动",
              "heading": "form-与-table-联动"
            },
            {
              "depth": 3,
              "value": "初始化数据",
              "heading": "初始化数据"
            },
            {
              "depth": 3,
              "value": "表单验证",
              "heading": "表单验证"
            },
            {
              "depth": 3,
              "value": "数据缓存",
              "heading": "数据缓存"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useFusionTable",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-fusion-table",
            "title": "Hooks"
          }
        },
        "title": "useFusionTable - ahooks 3.0"
      },
      {
        "path": "/hooks/use-get-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useGetState__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useGetState/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useGetState/index.en-US.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/hooks",
            "title": "UseGetState"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useGetState",
              "heading": "usegetstate"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "TypeScript definition",
              "heading": "typescript-definition"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useGetState",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-get-state",
            "title": "UseGetState"
          }
        },
        "title": "useGetState - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-get-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useGetState__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useGetState/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useGetState/index.zh-CN.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useGetState",
              "heading": "usegetstate"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "类型定义",
              "heading": "类型定义"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useGetState",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-get-state",
            "title": "Hooks"
          }
        },
        "title": "useGetState - ahooks 3.0"
      },
      {
        "path": "/hooks/use-history-travel",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useHistoryTravel__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useHistoryTravel/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useHistoryTravel/index.en-US.md",
          "updatedTime": 1666085663000,
          "nav": {
            "path": "/hooks",
            "title": "UseHistoryTravel"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useHistoryTravel",
              "heading": "usehistorytravel"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Basic usage",
              "heading": "basic-usage"
            },
            {
              "depth": 3,
              "value": "Todo List",
              "heading": "todo-list"
            },
            {
              "depth": 3,
              "value": "Limit maximum history length",
              "heading": "limit-maximum-history-length"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useHistoryTravel",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-history-travel",
            "title": "UseHistoryTravel"
          }
        },
        "title": "useHistoryTravel - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-history-travel",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useHistoryTravel__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useHistoryTravel/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useHistoryTravel/index.zh-CN.md",
          "updatedTime": 1666085663000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useHistoryTravel",
              "heading": "usehistorytravel"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "可撤销恢复的 Todo List",
              "heading": "可撤销恢复的-todo-list"
            },
            {
              "depth": 3,
              "value": "限制历史记录最大长度",
              "heading": "限制历史记录最大长度"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useHistoryTravel",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-history-travel",
            "title": "Hooks"
          }
        },
        "title": "useHistoryTravel - ahooks 3.0"
      },
      {
        "path": "/hooks/use-hover",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useHover__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useHover/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useHover/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseHover"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useHover",
              "heading": "usehover"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Pass in DOM element",
              "heading": "pass-in-dom-element"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useHover",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-hover",
            "title": "UseHover"
          }
        },
        "title": "useHover - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-hover",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useHover__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useHover/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useHover/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useHover",
              "heading": "usehover"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "传入 DOM 元素",
              "heading": "传入-dom-元素"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useHover",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-hover",
            "title": "Hooks"
          }
        },
        "title": "useHover - ahooks 3.0"
      },
      {
        "path": "/hooks/use-in-viewport",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useInViewport__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useInViewport/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useInViewport/index.en-US.md",
          "updatedTime": 1706444023000,
          "nav": {
            "path": "/hooks",
            "title": "UseInViewport"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useInViewport",
              "heading": "useinviewport"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Observe the visible area ratio of element",
              "heading": "observe-the-visible-area-ratio-of-element"
            },
            {
              "depth": 3,
              "value": "Listening content scrolling selection menu",
              "heading": "listening-content-scrolling-selection-menu"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useInViewport",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-in-viewport",
            "title": "UseInViewport"
          }
        },
        "title": "useInViewport - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-in-viewport",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useInViewport__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useInViewport/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useInViewport/index.zh-CN.md",
          "updatedTime": 1706444023000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useInViewport",
              "heading": "useinviewport"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "监听元素可见区域比例",
              "heading": "监听元素可见区域比例"
            },
            {
              "depth": 3,
              "value": "监听内容滚动选中菜单",
              "heading": "监听内容滚动选中菜单"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useInViewport",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-in-viewport",
            "title": "Hooks"
          }
        },
        "title": "useInViewport - ahooks 3.0"
      },
      {
        "path": "/hooks/use-infinite-scroll",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useInfiniteScroll__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useInfiniteScroll/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useInfiniteScroll/index.en-US.md",
          "updatedTime": 1706443986000,
          "componentName": "useInfiniteScroll",
          "nav": {
            "path": "/hooks",
            "title": "UseInfiniteScroll"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useInfiniteScroll",
              "heading": "useinfinitescroll"
            },
            {
              "depth": 2,
              "value": "Basic usage",
              "heading": "basic-usage"
            },
            {
              "depth": 2,
              "value": "Pagination",
              "heading": "pagination"
            },
            {
              "depth": 2,
              "value": "Scrolling to automatically load",
              "heading": "scrolling-to-automatically-load"
            },
            {
              "depth": 2,
              "value": "Data reset",
              "heading": "data-reset"
            },
            {
              "depth": 2,
              "value": "Data mutation",
              "heading": "data-mutation"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useInfiniteScroll",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-infinite-scroll",
            "title": "UseInfiniteScroll"
          }
        },
        "title": "useInfiniteScroll - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-infinite-scroll",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useInfiniteScroll__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useInfiniteScroll/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useInfiniteScroll/index.zh-CN.md",
          "updatedTime": 1706443986000,
          "componentName": "useInfiniteScroll",
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useInfiniteScroll",
              "heading": "useinfinitescroll"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "分页",
              "heading": "分页"
            },
            {
              "depth": 2,
              "value": "滚动自动加载",
              "heading": "滚动自动加载"
            },
            {
              "depth": 2,
              "value": "数据重置",
              "heading": "数据重置"
            },
            {
              "depth": 2,
              "value": "数据突变",
              "heading": "数据突变"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useInfiniteScroll",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-infinite-scroll",
            "title": "Hooks"
          }
        },
        "title": "useInfiniteScroll - ahooks 3.0"
      },
      {
        "path": "/hooks/use-interval",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useInterval__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useInterval/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useInterval/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseInterval"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useInterval",
              "heading": "useinterval"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Advanced usage",
              "heading": "advanced-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useInterval",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-interval",
            "title": "UseInterval"
          }
        },
        "title": "useInterval - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-interval",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useInterval__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useInterval/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useInterval/index.zh-CN.md",
          "updatedTime": 1657771596000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useInterval",
              "heading": "useinterval"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "进阶使用",
              "heading": "进阶使用"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useInterval",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-interval",
            "title": "Hooks"
          }
        },
        "title": "useInterval - ahooks 3.0"
      },
      {
        "path": "/hooks/use-isomorphic-layout-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useIsomorphicLayoutEffect__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useIsomorphicLayoutEffect/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useIsomorphicLayoutEffect/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseIsomorphicLayoutEffect"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useIsomorphicLayoutEffect",
              "heading": "useisomorphiclayouteffect"
            }
          ],
          "title": "useIsomorphicLayoutEffect",
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-isomorphic-layout-effect",
            "title": "UseIsomorphicLayoutEffect"
          }
        },
        "title": "useIsomorphicLayoutEffect - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-isomorphic-layout-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useIsomorphicLayoutEffect__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useIsomorphicLayoutEffect/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useIsomorphicLayoutEffect/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useIsomorphicLayoutEffect",
              "heading": "useisomorphiclayouteffect"
            }
          ],
          "title": "useIsomorphicLayoutEffect",
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-isomorphic-layout-effect",
            "title": "Hooks"
          }
        },
        "title": "useIsomorphicLayoutEffect - ahooks 3.0"
      },
      {
        "path": "/hooks/use-key-press",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useKeyPress__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useKeyPress/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useKeyPress/index.en-US.md",
          "updatedTime": 1687866561000,
          "nav": {
            "path": "/hooks",
            "title": "UseKeyPress"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useKeyPress",
              "heading": "usekeypress"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Basic usage",
              "heading": "basic-usage"
            },
            {
              "depth": 3,
              "value": "Combination keys",
              "heading": "combination-keys"
            },
            {
              "depth": 3,
              "value": "Exact match",
              "heading": "exact-match"
            },
            {
              "depth": 3,
              "value": "Multiple keys",
              "heading": "multiple-keys"
            },
            {
              "depth": 3,
              "value": "Get the trigger key",
              "heading": "get-the-trigger-key"
            },
            {
              "depth": 3,
              "value": "Custom method",
              "heading": "custom-method"
            },
            {
              "depth": 3,
              "value": "Custom DOM",
              "heading": "custom-dom"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 2,
              "value": "Remarks",
              "heading": "remarks"
            }
          ],
          "title": "useKeyPress",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-key-press",
            "title": "UseKeyPress"
          }
        },
        "title": "useKeyPress - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-key-press",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useKeyPress__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useKeyPress/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useKeyPress/index.zh-CN.md",
          "updatedTime": 1687866561000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useKeyPress",
              "heading": "usekeypress"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "监听组合按键",
              "heading": "监听组合按键"
            },
            {
              "depth": 3,
              "value": "精确匹配",
              "heading": "精确匹配"
            },
            {
              "depth": 3,
              "value": "监听多个按键",
              "heading": "监听多个按键"
            },
            {
              "depth": 3,
              "value": "获取触发的按键",
              "heading": "获取触发的按键"
            },
            {
              "depth": 3,
              "value": "自定义监听方式",
              "heading": "自定义监听方式"
            },
            {
              "depth": 3,
              "value": "自定义 DOM",
              "heading": "自定义-dom"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 2,
              "value": "Remarks",
              "heading": "remarks"
            }
          ],
          "title": "useKeyPress",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-key-press",
            "title": "Hooks"
          }
        },
        "title": "useKeyPress - ahooks 3.0"
      },
      {
        "path": "/hooks/use-latest",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useLatest__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useLatest/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useLatest/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseLatest"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useLatest",
              "heading": "uselatest"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Basic usage",
              "heading": "basic-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useLatest",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-latest",
            "title": "UseLatest"
          }
        },
        "title": "useLatest - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-latest",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useLatest__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useLatest/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useLatest/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useLatest",
              "heading": "uselatest"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useLatest",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-latest",
            "title": "Hooks"
          }
        },
        "title": "useLatest - ahooks 3.0"
      },
      {
        "path": "/hooks/use-local-storage-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useLocalStorageState__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useLocalStorageState/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useLocalStorageState/index.en-US.md",
          "updatedTime": 1689125124000,
          "nav": {
            "path": "/hooks",
            "title": "UseLocalStorageState"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useLocalStorageState",
              "heading": "uselocalstoragestate"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Store state into localStorage",
              "heading": "store-state-into-localstorage"
            },
            {
              "depth": 3,
              "value": "Store complex types of data",
              "heading": "store-complex-types-of-data"
            },
            {
              "depth": 3,
              "value": "Custom serialization and deserialization functions",
              "heading": "custom-serialization-and-deserialization-functions"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 2,
              "value": "Remark",
              "heading": "remark"
            }
          ],
          "title": "useLocalStorageState",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-local-storage-state",
            "title": "UseLocalStorageState"
          }
        },
        "title": "useLocalStorageState - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-local-storage-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useLocalStorageState__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useLocalStorageState/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useLocalStorageState/index.zh-CN.md",
          "updatedTime": 1689125124000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useLocalStorageState",
              "heading": "uselocalstoragestate"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "将 state 存储在 localStorage 中",
              "heading": "将-state-存储在-localstorage-中"
            },
            {
              "depth": 3,
              "value": "存储复杂类型数据",
              "heading": "存储复杂类型数据"
            },
            {
              "depth": 3,
              "value": "自定义序列化和反序列化函数",
              "heading": "自定义序列化和反序列化函数"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 2,
              "value": "备注",
              "heading": "备注"
            }
          ],
          "title": "useLocalStorageState",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-local-storage-state",
            "title": "Hooks"
          }
        },
        "title": "useLocalStorageState - ahooks 3.0"
      },
      {
        "path": "/hooks/use-lock-fn",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useLockFn__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useLockFn/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useLockFn/index.en-US.md",
          "updatedTime": 1703600778000,
          "nav": {
            "path": "/hooks",
            "title": "UseLockFn"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useLockFn",
              "heading": "uselockfn"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Basic usage",
              "heading": "basic-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useLockFn",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-lock-fn",
            "title": "UseLockFn"
          }
        },
        "title": "useLockFn - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-lock-fn",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useLockFn__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useLockFn/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useLockFn/index.zh-CN.md",
          "updatedTime": 1703600778000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useLockFn",
              "heading": "uselockfn"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useLockFn",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-lock-fn",
            "title": "Hooks"
          }
        },
        "title": "useLockFn - ahooks 3.0"
      },
      {
        "path": "/hooks/use-long-press",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useLongPress__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useLongPress/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useLongPress/index.en-US.md",
          "updatedTime": 1708326185000,
          "nav": {
            "path": "/hooks",
            "title": "UseLongPress"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useLongPress",
              "heading": "uselongpress"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Basic usage",
              "heading": "basic-usage"
            },
            {
              "depth": 3,
              "value": "Listen for click and long press events at the same time",
              "heading": "listen-for-click-and-long-press-events-at-the-same-time"
            },
            {
              "depth": 3,
              "value": "Move threshold",
              "heading": "move-threshold"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Remark",
              "heading": "remark"
            }
          ],
          "title": "useLongPress",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-long-press",
            "title": "UseLongPress"
          }
        },
        "title": "useLongPress - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-long-press",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useLongPress__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useLongPress/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useLongPress/index.zh-CN.md",
          "updatedTime": 1708326185000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useLongPress",
              "heading": "uselongpress"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基本使用",
              "heading": "基本使用"
            },
            {
              "depth": 3,
              "value": "同时监听点击和长按事件",
              "heading": "同时监听点击和长按事件"
            },
            {
              "depth": 3,
              "value": "移动阈值",
              "heading": "移动阈值"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "备注",
              "heading": "备注"
            }
          ],
          "title": "useLongPress",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-long-press",
            "title": "Hooks"
          }
        },
        "title": "useLongPress - ahooks 3.0"
      },
      {
        "path": "/hooks/use-map",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useMap__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useMap/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useMap/index.en-US.md",
          "updatedTime": 1678103516000,
          "nav": {
            "path": "/hooks",
            "title": "UseMap"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useMap",
              "heading": "usemap"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useMap",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-map",
            "title": "UseMap"
          }
        },
        "title": "useMap - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-map",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useMap__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useMap/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useMap/index.zh-CN.md",
          "updatedTime": 1678103516000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useMap",
              "heading": "usemap"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useMap",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-map",
            "title": "Hooks"
          }
        },
        "title": "useMap - ahooks 3.0"
      },
      {
        "path": "/hooks/use-memoized-fn",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useMemoizedFn__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useMemoizedFn/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useMemoizedFn/index.en-US.md",
          "updatedTime": 1691718164000,
          "nav": {
            "path": "/hooks",
            "title": "UseMemoizedFn"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useMemoizedFn",
              "heading": "usememoizedfn"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Performance Improvement",
              "heading": "performance-improvement"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 2,
              "value": "FAQ",
              "heading": "faq"
            },
            {
              "depth": 3,
              "value": "The function returned by useMemoizedFn will not inherit properties from fn itself?",
              "heading": "the-function-returned-by-usememoizedfn-will-not-inherit-properties-from-fn-itself"
            }
          ],
          "title": "useMemoizedFn",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-memoized-fn",
            "title": "UseMemoizedFn"
          }
        },
        "title": "useMemoizedFn - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-memoized-fn",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useMemoizedFn__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useMemoizedFn/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useMemoizedFn/index.zh-CN.md",
          "updatedTime": 1691718164000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useMemoizedFn",
              "heading": "usememoizedfn"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "性能提升",
              "heading": "性能提升"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 2,
              "value": "FAQ",
              "heading": "faq"
            },
            {
              "depth": 3,
              "value": "useMemoizedFn 返回的函数没有继承 fn 自身的属性？",
              "heading": "usememoizedfn-返回的函数没有继承-fn-自身的属性"
            }
          ],
          "title": "useMemoizedFn",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-memoized-fn",
            "title": "Hooks"
          }
        },
        "title": "useMemoizedFn - ahooks 3.0"
      },
      {
        "path": "/hooks/use-mount",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useMount__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useMount/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useMount/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseMount"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useMount",
              "heading": "usemount"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default Usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useMount",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-mount",
            "title": "UseMount"
          }
        },
        "title": "useMount - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-mount",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useMount__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useMount/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useMount/index.zh-CN.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useMount",
              "heading": "usemount"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            }
          ],
          "title": "useMount",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-mount",
            "title": "Hooks"
          }
        },
        "title": "useMount - ahooks 3.0"
      },
      {
        "path": "/hooks/use-mouse",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useMouse__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useMouse/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useMouse/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseMouse"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useMouse",
              "heading": "usemouse"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default Usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Mouse position relative to the element",
              "heading": "mouse-position-relative-to-the-element"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "result",
              "heading": "result"
            }
          ],
          "title": "useMouse",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-mouse",
            "title": "UseMouse"
          }
        },
        "title": "useMouse - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-mouse",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useMouse__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useMouse/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useMouse/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useMouse",
              "heading": "usemouse"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "获取鼠标相对于元素的位置",
              "heading": "获取鼠标相对于元素的位置"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useMouse",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-mouse",
            "title": "Hooks"
          }
        },
        "title": "useMouse - ahooks 3.0"
      },
      {
        "path": "/hooks/use-mutation-observer",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useMutationObserver__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useMutationObserver/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useMutationObserver/index.en-US.md",
          "updatedTime": 1658916460000,
          "nav": {
            "path": "/hooks",
            "title": "UseMutationObserver"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useMutationObserver",
              "heading": "usemutationobserver"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default Usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useMutationObserver",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-mutation-observer",
            "title": "UseMutationObserver"
          }
        },
        "title": "useMutationObserver - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-mutation-observer",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useMutationObserver__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useMutationObserver/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useMutationObserver/index.zh-CN.md",
          "updatedTime": 1658916460000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useMutationObserver",
              "heading": "usemutationobserver"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useMutationObserver",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-mutation-observer",
            "title": "Hooks"
          }
        },
        "title": "useMutationObserver - ahooks 3.0"
      },
      {
        "path": "/hooks/use-network",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useNetwork__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useNetwork/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useNetwork/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseNetwork"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useNetwork",
              "heading": "usenetwork"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useNetwork",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-network",
            "title": "UseNetwork"
          }
        },
        "title": "useNetwork - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-network",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useNetwork__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useNetwork/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useNetwork/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useNetwork",
              "heading": "usenetwork"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useNetwork",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-network",
            "title": "Hooks"
          }
        },
        "title": "useNetwork - ahooks 3.0"
      },
      {
        "path": "/hooks/use-pagination",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__usePagination__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/usePagination/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/usePagination/index.en-US.md",
          "updatedTime": 1675322847000,
          "nav": {
            "path": "/hooks",
            "title": "UsePagination"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "usePagination",
              "heading": "usepagination"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Basic usage",
              "heading": "basic-usage"
            },
            {
              "depth": 3,
              "value": "More parameters",
              "heading": "more-parameters"
            },
            {
              "depth": 3,
              "value": "refreshDeps",
              "heading": "refreshdeps"
            },
            {
              "depth": 3,
              "value": "Cache",
              "heading": "cache"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "usePagination",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-pagination",
            "title": "UsePagination"
          }
        },
        "title": "usePagination - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-pagination",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__usePagination__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/usePagination/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/usePagination/index.zh-CN.md",
          "updatedTime": 1675322847000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "usePagination",
              "heading": "usepagination"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "更多参数",
              "heading": "更多参数"
            },
            {
              "depth": 3,
              "value": "refreshDeps",
              "heading": "refreshdeps"
            },
            {
              "depth": 3,
              "value": "缓存",
              "heading": "缓存"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "usePagination",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-pagination",
            "title": "Hooks"
          }
        },
        "title": "usePagination - ahooks 3.0"
      },
      {
        "path": "/hooks/use-previous",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__usePrevious__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/usePrevious/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/usePrevious/index.en-US.md",
          "updatedTime": 1679570705000,
          "nav": {
            "path": "/hooks",
            "title": "UsePrevious"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "usePrevious",
              "heading": "useprevious"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Custom shouldUpdate function",
              "heading": "custom-shouldupdate-function"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "usePrevious",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-previous",
            "title": "UsePrevious"
          }
        },
        "title": "usePrevious - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-previous",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__usePrevious__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/usePrevious/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/usePrevious/index.zh-CN.md",
          "updatedTime": 1679570705000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "usePrevious",
              "heading": "useprevious"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "自定义 shouldUpdate 函数",
              "heading": "自定义-shouldupdate-函数"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "usePrevious",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-previous",
            "title": "Hooks"
          }
        },
        "title": "usePrevious - ahooks 3.0"
      },
      {
        "path": "/hooks/use-pro-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useProState__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useProState/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useProState/index.en-US.md",
          "updatedTime": 1713013929439,
          "nav": {
            "path": "/hooks",
            "title": "UseProState"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useSetState",
              "heading": "usesetstate"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Get the latest value",
              "heading": "get-the-latest-value"
            },
            {
              "depth": 3,
              "value": "Merge and reset",
              "heading": "merge-and-reset"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useSetState",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-pro-state",
            "title": "UseProState"
          }
        },
        "title": "useSetState - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-pro-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useProState__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useProState/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useProState/index.zh-CN.md",
          "updatedTime": 1713012896401,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useProState",
              "heading": "useprostate"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "获取最新值",
              "heading": "获取最新值"
            },
            {
              "depth": 3,
              "value": "合并与重置",
              "heading": "合并与重置"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useProState",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-pro-state",
            "title": "Hooks"
          }
        },
        "title": "useProState - ahooks 3.0"
      },
      {
        "path": "/hooks/use-raf-interval",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRafInterval__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRafInterval/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRafInterval/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseRafInterval"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useRafInterval",
              "heading": "userafinterval"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Advanced usage",
              "heading": "advanced-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useRafInterval",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-raf-interval",
            "title": "UseRafInterval"
          }
        },
        "title": "useRafInterval - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-raf-interval",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRafInterval__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRafInterval/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRafInterval/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useRafInterval",
              "heading": "userafinterval"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "进阶使用",
              "heading": "进阶使用"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useRafInterval",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-raf-interval",
            "title": "Hooks"
          }
        },
        "title": "useRafInterval - ahooks 3.0"
      },
      {
        "path": "/hooks/use-raf-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRafState__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRafState/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRafState/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseRafState"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useRafState",
              "heading": "userafstate"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useRafState",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-raf-state",
            "title": "UseRafState"
          }
        },
        "title": "useRafState - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-raf-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRafState__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRafState/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRafState/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useRafState",
              "heading": "userafstate"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useRafState",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-raf-state",
            "title": "Hooks"
          }
        },
        "title": "useRafState - ahooks 3.0"
      },
      {
        "path": "/hooks/use-raf-timeout",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRafTimeout__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRafTimeout/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRafTimeout/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseRafTimeout"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useRafTimeout",
              "heading": "useraftimeout"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Advanced usage",
              "heading": "advanced-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useRafTimeout",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-raf-timeout",
            "title": "UseRafTimeout"
          }
        },
        "title": "useRafTimeout - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-raf-timeout",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRafTimeout__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRafTimeout/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRafTimeout/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useRafTimeout",
              "heading": "useraftimeout"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "进阶使用",
              "heading": "进阶使用"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useRafTimeout",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-raf-timeout",
            "title": "Hooks"
          }
        },
        "title": "useRafTimeout - ahooks 3.0"
      },
      {
        "path": "/hooks/use-reactive",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useReactive__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useReactive/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useReactive/index.en-US.md",
          "updatedTime": 1688557751000,
          "nav": {
            "path": "/hooks",
            "title": "UseReactive"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "useReactive",
              "heading": "usereactive"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default Usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Array",
              "heading": "array"
            },
            {
              "depth": 3,
              "value": "Computed Properties",
              "heading": "computed-properties"
            },
            {
              "depth": 3,
              "value": "Notice",
              "heading": "notice"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 2,
              "value": "FAQ",
              "heading": "faq"
            },
            {
              "depth": 3,
              "value": "When useReactive is used with Map, Set, it will throw an error or not work?",
              "heading": "when-usereactive-is-used-with-map-set-it-will-throw-an-error-or-not-work"
            }
          ],
          "title": "useReactive",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-reactive",
            "title": "UseReactive"
          }
        },
        "title": "useReactive - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-reactive",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useReactive__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useReactive/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useReactive/index.zh-CN.md",
          "updatedTime": 1688557751000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 2,
              "value": "useReactive",
              "heading": "usereactive"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基本用法",
              "heading": "基本用法"
            },
            {
              "depth": 3,
              "value": "数组操作",
              "heading": "数组操作"
            },
            {
              "depth": 3,
              "value": "计算属性",
              "heading": "计算属性"
            },
            {
              "depth": 3,
              "value": "注意",
              "heading": "注意"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "参数",
              "heading": "参数"
            },
            {
              "depth": 2,
              "value": "FAQ",
              "heading": "faq"
            },
            {
              "depth": 3,
              "value": "useReactive 和 Map、Set 一起使用时报错或无效？",
              "heading": "usereactive-和-mapset-一起使用时报错或无效"
            }
          ],
          "title": "useReactive",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-reactive",
            "title": "Hooks"
          }
        },
        "title": "useReactive - ahooks 3.0"
      },
      {
        "path": "/hooks/use-request/basic",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__basic__basic.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/basic/basic.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/basic/basic.en-US.md",
          "updatedTime": 1676286633000,
          "nav": {
            "path": "/hooks",
            "title": "UseRequest"
          },
          "group": {
            "path": "/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "Basic usage",
              "heading": "basic-usage"
            },
            {
              "depth": 2,
              "value": "Default request",
              "heading": "default-request"
            },
            {
              "depth": 2,
              "value": "Manually trigger",
              "heading": "manually-trigger"
            },
            {
              "depth": 2,
              "value": "The life cycle",
              "heading": "the-life-cycle"
            },
            {
              "depth": 2,
              "value": "Refresh (repeat the last request)",
              "heading": "refresh-repeat-the-last-request"
            },
            {
              "depth": 2,
              "value": "Change data immediately",
              "heading": "change-data-immediately"
            },
            {
              "depth": 2,
              "value": "Cancel response",
              "heading": "cancel-response"
            },
            {
              "depth": 2,
              "value": "Parameter management",
              "heading": "parameter-management"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "Basic usage",
          "hasPreviewer": true,
          "locale": "en-US"
        },
        "title": "Basic usage - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-request/basic",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__basic__basic.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/basic/basic.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/basic/basic.zh-CN.md",
          "updatedTime": 1661426862000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "group": {
            "path": "/zh-CN/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "默认请求",
              "heading": "默认请求"
            },
            {
              "depth": 2,
              "value": "手动触发",
              "heading": "手动触发"
            },
            {
              "depth": 2,
              "value": "生命周期",
              "heading": "生命周期"
            },
            {
              "depth": 2,
              "value": "刷新（重复上一次请求）",
              "heading": "刷新重复上一次请求"
            },
            {
              "depth": 2,
              "value": "立即变更数据",
              "heading": "立即变更数据"
            },
            {
              "depth": 2,
              "value": "取消响应",
              "heading": "取消响应"
            },
            {
              "depth": 2,
              "value": "参数管理",
              "heading": "参数管理"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "基础用法",
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "基础用法 - ahooks 3.0"
      },
      {
        "path": "/hooks/use-request/cache",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__cache__cache.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/cache/cache.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/cache/cache.en-US.md",
          "updatedTime": 1695805179000,
          "nav": {
            "path": "/hooks",
            "title": "UseRequest"
          },
          "group": {
            "path": "/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "Cache & SWR",
              "heading": "cache--swr"
            },
            {
              "depth": 3,
              "value": "SWR",
              "heading": "swr"
            },
            {
              "depth": 3,
              "value": "Keep your data fresh",
              "heading": "keep-your-data-fresh"
            },
            {
              "depth": 3,
              "value": "Data sharing",
              "heading": "data-sharing"
            },
            {
              "depth": 3,
              "value": "Parameters cache",
              "heading": "parameters-cache"
            },
            {
              "depth": 3,
              "value": "Clear cache",
              "heading": "clear-cache"
            },
            {
              "depth": 3,
              "value": "Custom cache",
              "heading": "custom-cache"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "clearCache",
              "heading": "clearcache"
            },
            {
              "depth": 2,
              "value": "Remark",
              "heading": "remark"
            }
          ],
          "title": "Cache & SWR",
          "hasPreviewer": true,
          "locale": "en-US"
        },
        "title": "Cache & SWR - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-request/cache",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__cache__cache.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/cache/cache.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/cache/cache.zh-CN.md",
          "updatedTime": 1695805179000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "group": {
            "path": "/zh-CN/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "缓存 & SWR",
              "heading": "缓存--swr"
            },
            {
              "depth": 3,
              "value": "SWR",
              "heading": "swr"
            },
            {
              "depth": 3,
              "value": "数据保持新鲜",
              "heading": "数据保持新鲜"
            },
            {
              "depth": 3,
              "value": "数据共享",
              "heading": "数据共享"
            },
            {
              "depth": 3,
              "value": "参数缓存",
              "heading": "参数缓存"
            },
            {
              "depth": 3,
              "value": "删除缓存",
              "heading": "删除缓存"
            },
            {
              "depth": 3,
              "value": "自定义缓存",
              "heading": "自定义缓存"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "clearCache",
              "heading": "clearcache"
            },
            {
              "depth": 2,
              "value": "备注",
              "heading": "备注"
            }
          ],
          "title": "缓存 & SWR",
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "缓存 & SWR - ahooks 3.0"
      },
      {
        "path": "/hooks/use-request/debounce",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__debounce__debounce.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/debounce/debounce.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/debounce/debounce.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseRequest"
          },
          "group": {
            "path": "/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "Debounce",
              "heading": "debounce"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 2,
              "value": "Remark",
              "heading": "remark"
            }
          ],
          "title": "Debounce",
          "hasPreviewer": true,
          "locale": "en-US"
        },
        "title": "Debounce - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-request/debounce",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__debounce__debounce.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/debounce/debounce.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/debounce/debounce.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "group": {
            "path": "/zh-CN/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "防抖",
              "heading": "防抖"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 2,
              "value": "备注",
              "heading": "备注"
            }
          ],
          "title": "防抖",
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "防抖 - ahooks 3.0"
      },
      {
        "path": "/hooks/use-request/index",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__index__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/index/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/index/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseRequest"
          },
          "group": {
            "path": "/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "Quick Start",
              "heading": "quick-start"
            },
            {
              "depth": 2,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "Manual trigger",
              "heading": "manual-trigger"
            }
          ],
          "title": "Quick Start",
          "hasPreviewer": true,
          "locale": "en-US"
        },
        "title": "Quick Start - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-request/index",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__index__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/index/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/index/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "group": {
            "path": "/zh-CN/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "快速上手",
              "heading": "快速上手"
            },
            {
              "depth": 2,
              "value": "默认用法",
              "heading": "默认用法"
            },
            {
              "depth": 2,
              "value": "手动触发",
              "heading": "手动触发"
            }
          ],
          "title": "快速上手",
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "快速上手 - ahooks 3.0"
      },
      {
        "path": "/hooks/use-request/loading-delay",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__loadingDelay__loadingDelay.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/loadingDelay/loadingDelay.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/loadingDelay/loadingDelay.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseRequest"
          },
          "group": {
            "path": "/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "Loading Delay",
              "heading": "loading-delay"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "Remark",
              "heading": "remark"
            }
          ],
          "title": "Loading Delay",
          "hasPreviewer": true,
          "locale": "en-US"
        },
        "title": "Loading Delay - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-request/loading-delay",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__loadingDelay__loadingDelay.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/loadingDelay/loadingDelay.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/loadingDelay/loadingDelay.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "group": {
            "path": "/zh-CN/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "Loading Delay",
              "heading": "loading-delay"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "备注",
              "heading": "备注"
            }
          ],
          "title": "Loading Delay",
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "Loading Delay - ahooks 3.0"
      },
      {
        "path": "/hooks/use-request/polling",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__polling__polling.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/polling/polling.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/polling/polling.en-US.md",
          "updatedTime": 1700402208000,
          "nav": {
            "path": "/hooks",
            "title": "UseRequest"
          },
          "group": {
            "path": "/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "Polling",
              "heading": "polling"
            },
            {
              "depth": 2,
              "value": "Polling error retry",
              "heading": "polling-error-retry"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Return",
              "heading": "return"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 2,
              "value": "Remark",
              "heading": "remark"
            }
          ],
          "title": "Polling",
          "hasPreviewer": true,
          "locale": "en-US"
        },
        "title": "Polling - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-request/polling",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__polling__polling.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/polling/polling.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/polling/polling.zh-CN.md",
          "updatedTime": 1700402208000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "group": {
            "path": "/zh-CN/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "轮询",
              "heading": "轮询"
            },
            {
              "depth": 2,
              "value": "轮询错误重试",
              "heading": "轮询错误重试"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Return",
              "heading": "return"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 2,
              "value": "备注",
              "heading": "备注"
            }
          ],
          "title": "轮询",
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "轮询 - ahooks 3.0"
      },
      {
        "path": "/hooks/use-request/ready",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__ready__ready.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/ready/ready.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/ready/ready.en-US.md",
          "updatedTime": 1695805157000,
          "nav": {
            "path": "/hooks",
            "title": "UseRequest"
          },
          "group": {
            "path": "/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "Ready",
              "heading": "ready"
            },
            {
              "depth": 2,
              "value": "Automatic mode",
              "heading": "automatic-mode"
            },
            {
              "depth": 2,
              "value": "Manual mode",
              "heading": "manual-mode"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "Ready",
          "hasPreviewer": true,
          "locale": "en-US"
        },
        "title": "Ready - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-request/ready",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__ready__ready.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/ready/ready.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/ready/ready.zh-CN.md",
          "updatedTime": 1695805157000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "group": {
            "path": "/zh-CN/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "Ready",
              "heading": "ready"
            },
            {
              "depth": 2,
              "value": "自动模式",
              "heading": "自动模式"
            },
            {
              "depth": 2,
              "value": "手动模式",
              "heading": "手动模式"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "Ready",
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "Ready - ahooks 3.0"
      },
      {
        "path": "/hooks/use-request/refresy-deps",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__refreshDeps__refresyDeps.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/refreshDeps/refresyDeps.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/refreshDeps/refresyDeps.en-US.md",
          "updatedTime": 1703600340000,
          "nav": {
            "path": "/hooks",
            "title": "UseRequest"
          },
          "group": {
            "path": "/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "RefreshDeps",
              "heading": "refreshdeps"
            },
            {
              "depth": 3,
              "value": "Repeat last request",
              "heading": "repeat-last-request"
            },
            {
              "depth": 3,
              "value": "Custom refresh",
              "heading": "custom-refresh"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 2,
              "value": "Remark",
              "heading": "remark"
            }
          ],
          "title": "RefreshDeps",
          "hasPreviewer": true,
          "locale": "en-US"
        },
        "title": "RefreshDeps - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-request/refresy-deps",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__refreshDeps__refresyDeps.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/refreshDeps/refresyDeps.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/refreshDeps/refresyDeps.zh-CN.md",
          "updatedTime": 1703600340000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "group": {
            "path": "/zh-CN/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "依赖刷新",
              "heading": "依赖刷新"
            },
            {
              "depth": 3,
              "value": "重复上一次请求",
              "heading": "重复上一次请求"
            },
            {
              "depth": 3,
              "value": "自定义刷新行为",
              "heading": "自定义刷新行为"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 2,
              "value": "备注",
              "heading": "备注"
            }
          ],
          "title": "依赖刷新",
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "依赖刷新 - ahooks 3.0"
      },
      {
        "path": "/hooks/use-request/refresh-on-window-focus",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__refreshOnWindowFocus__refreshOnWindowFocus.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/refreshOnWindowFocus/refreshOnWindowFocus.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/refreshOnWindowFocus/refreshOnWindowFocus.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseRequest"
          },
          "group": {
            "path": "/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "RefreshOnWindowFocus",
              "heading": "refreshonwindowfocus"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 2,
              "value": "Remark",
              "heading": "remark"
            }
          ],
          "title": "RefreshOnWindowFocus",
          "hasPreviewer": true,
          "locale": "en-US"
        },
        "title": "RefreshOnWindowFocus - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-request/refresh-on-window-focus",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__refreshOnWindowFocus__refreshOnWindowFocus.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/refreshOnWindowFocus/refreshOnWindowFocus.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/refreshOnWindowFocus/refreshOnWindowFocus.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "group": {
            "path": "/zh-CN/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "屏幕聚焦重新请求",
              "heading": "屏幕聚焦重新请求"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 2,
              "value": "备注",
              "heading": "备注"
            }
          ],
          "title": "屏幕聚焦重新请求",
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "屏幕聚焦重新请求 - ahooks 3.0"
      },
      {
        "path": "/hooks/use-request/retry",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__retry__retry.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/retry/retry.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/retry/retry.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseRequest"
          },
          "group": {
            "path": "/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "Error Retry",
              "heading": "error-retry"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 2,
              "value": "Remark",
              "heading": "remark"
            }
          ],
          "title": "Error Retry",
          "hasPreviewer": true,
          "locale": "en-US"
        },
        "title": "Error Retry - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-request/retry",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__retry__retry.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/retry/retry.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/retry/retry.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "group": {
            "path": "/zh-CN/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "错误重试",
              "heading": "错误重试"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 2,
              "value": "备注",
              "heading": "备注"
            }
          ],
          "title": "错误重试",
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "错误重试 - ahooks 3.0"
      },
      {
        "path": "/hooks/use-request/throttle",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__throttle__throttle.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/throttle/throttle.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/throttle/throttle.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseRequest"
          },
          "group": {
            "path": "/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "Throttle",
              "heading": "throttle"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 2,
              "value": "Remark",
              "heading": "remark"
            }
          ],
          "title": "Throttle",
          "hasPreviewer": true,
          "locale": "en-US"
        },
        "title": "Throttle - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-request/throttle",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useRequest__doc__throttle__throttle.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useRequest/doc/throttle/throttle.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useRequest/doc/throttle/throttle.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "group": {
            "path": "/zh-CN/hooks/use-request",
            "title": "Doc"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "节流",
              "heading": "节流"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 2,
              "value": "备注",
              "heading": "备注"
            }
          ],
          "title": "节流",
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "节流 - ahooks 3.0"
      },
      {
        "path": "/hooks/use-reset-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useResetState__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useResetState/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useResetState/index.en-US.md",
          "updatedTime": 1659599677000,
          "nav": {
            "path": "/hooks",
            "title": "UseResetState"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useResetState",
              "heading": "useresetstate"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default Usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useResetState",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-reset-state",
            "title": "UseResetState"
          }
        },
        "title": "useResetState - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-reset-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useResetState__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useResetState/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useResetState/index.zh-CN.md",
          "updatedTime": 1659595296000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useResetState",
              "heading": "useresetstate"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useResetState",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-reset-state",
            "title": "Hooks"
          }
        },
        "title": "useResetState - ahooks 3.0"
      },
      {
        "path": "/hooks/use-responsive",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useResponsive__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useResponsive/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useResponsive/index.en-US.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/hooks",
            "title": "UseResponsive"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useResponsive",
              "heading": "useresponsive"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Get responsive info in components",
              "heading": "get-responsive-info-in-components"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Config",
              "heading": "config"
            }
          ],
          "title": "useResponsive",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-responsive",
            "title": "UseResponsive"
          }
        },
        "title": "useResponsive - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-responsive",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useResponsive__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useResponsive/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useResponsive/index.zh-CN.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useResponsive",
              "heading": "useresponsive"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "在组件中获取响应式信息",
              "heading": "在组件中获取响应式信息"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "配置",
              "heading": "配置"
            }
          ],
          "title": "useResponsive",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-responsive",
            "title": "Hooks"
          }
        },
        "title": "useResponsive - ahooks 3.0"
      },
      {
        "path": "/hooks/use-safe-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useSafeState__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useSafeState/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useSafeState/index.en-US.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/hooks",
            "title": "UseSafeState"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useSafeState",
              "heading": "usesafestate"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Basic usage",
              "heading": "basic-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useSafeState",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-safe-state",
            "title": "UseSafeState"
          }
        },
        "title": "useSafeState - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-safe-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useSafeState__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useSafeState/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useSafeState/index.zh-CN.md",
          "updatedTime": 1656072865000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useSafeState",
              "heading": "usesafestate"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useSafeState",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-safe-state",
            "title": "Hooks"
          }
        },
        "title": "useSafeState - ahooks 3.0"
      },
      {
        "path": "/hooks/use-scroll",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useScroll__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useScroll/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useScroll/index.en-US.md",
          "updatedTime": 1683210839000,
          "nav": {
            "path": "/hooks",
            "title": "UseScroll"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useScroll",
              "heading": "usescroll"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Basic Usage",
              "heading": "basic-usage"
            },
            {
              "depth": 3,
              "value": "Detect Whole Page Scroll",
              "heading": "detect-whole-page-scroll"
            },
            {
              "depth": 3,
              "value": "Control listen on scroll status",
              "heading": "control-listen-on-scroll-status"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useScroll",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-scroll",
            "title": "UseScroll"
          }
        },
        "title": "useScroll - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-scroll",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useScroll__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useScroll/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useScroll/index.zh-CN.md",
          "updatedTime": 1683210839000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useScroll",
              "heading": "usescroll"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "监测整页的滚动",
              "heading": "监测整页的滚动"
            },
            {
              "depth": 3,
              "value": "控制滚动状态的监听",
              "heading": "控制滚动状态的监听"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useScroll",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-scroll",
            "title": "Hooks"
          }
        },
        "title": "useScroll - ahooks 3.0"
      },
      {
        "path": "/hooks/use-selections",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useSelections__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useSelections/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useSelections/index.en-US.md",
          "updatedTime": 1677669638000,
          "nav": {
            "path": "/hooks",
            "title": "UseSelections"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useSelections",
              "heading": "useselections"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useSelections",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-selections",
            "title": "UseSelections"
          }
        },
        "title": "useSelections - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-selections",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useSelections__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useSelections/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useSelections/index.zh-CN.md",
          "updatedTime": 1677669638000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useSelections",
              "heading": "useselections"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useSelections",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-selections",
            "title": "Hooks"
          }
        },
        "title": "useSelections - ahooks 3.0"
      },
      {
        "path": "/hooks/use-session-storage-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useSessionStorageState__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useSessionStorageState/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useSessionStorageState/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseSessionStorageState"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useSessionStorageState",
              "heading": "usesessionstoragestate"
            }
          ],
          "title": "useSessionStorageState",
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-session-storage-state",
            "title": "UseSessionStorageState"
          }
        },
        "title": "useSessionStorageState - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-session-storage-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useSessionStorageState__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useSessionStorageState/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useSessionStorageState/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useSessionStorageState",
              "heading": "usesessionstoragestate"
            }
          ],
          "title": "useSessionStorageState",
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-session-storage-state",
            "title": "Hooks"
          }
        },
        "title": "useSessionStorageState - ahooks 3.0"
      },
      {
        "path": "/hooks/use-set",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useSet__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useSet/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useSet/index.en-US.md",
          "updatedTime": 1678103516000,
          "nav": {
            "path": "/hooks",
            "title": "UseSet"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useSet",
              "heading": "useset"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useSet",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-set",
            "title": "UseSet"
          }
        },
        "title": "useSet - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-set",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useSet__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useSet/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useSet/index.zh-CN.md",
          "updatedTime": 1678103516000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useSet",
              "heading": "useset"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useSet",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-set",
            "title": "Hooks"
          }
        },
        "title": "useSet - ahooks 3.0"
      },
      {
        "path": "/hooks/use-set-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useSetState__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useSetState/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useSetState/index.en-US.md",
          "updatedTime": 1678100690000,
          "nav": {
            "path": "/hooks",
            "title": "UseSetState"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useSetState",
              "heading": "usesetstate"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Updating with callback",
              "heading": "updating-with-callback"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useSetState",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-set-state",
            "title": "UseSetState"
          }
        },
        "title": "useSetState - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-set-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useSetState__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useSetState/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useSetState/index.zh-CN.md",
          "updatedTime": 1678100690000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useSetState",
              "heading": "usesetstate"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "使用回调更新",
              "heading": "使用回调更新"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useSetState",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-set-state",
            "title": "Hooks"
          }
        },
        "title": "useSetState - ahooks 3.0"
      },
      {
        "path": "/hooks/use-size",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useSize__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useSize/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useSize/index.en-US.md",
          "updatedTime": 1677030249000,
          "nav": {
            "path": "/hooks",
            "title": "UseSize"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useSize",
              "heading": "usesize"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Pass in the DOM element",
              "heading": "pass-in-the-dom-element"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useSize",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-size",
            "title": "UseSize"
          }
        },
        "title": "useSize - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-size",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useSize__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useSize/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useSize/index.zh-CN.md",
          "updatedTime": 1677030249000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useSize",
              "heading": "usesize"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "传入 DOM 节点",
              "heading": "传入-dom-节点"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useSize",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-size",
            "title": "Hooks"
          }
        },
        "title": "useSize - ahooks 3.0"
      },
      {
        "path": "/hooks/use-text-selection",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useTextSelection__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useTextSelection/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useTextSelection/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseTextSelection"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useTextSelection",
              "heading": "usetextselection"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Listen for specified area",
              "heading": "listen-for-specified-area"
            },
            {
              "depth": 3,
              "value": "Translate user text selection",
              "heading": "translate-user-text-selection"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "State",
              "heading": "state"
            }
          ],
          "title": "useTextSelection",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-text-selection",
            "title": "UseTextSelection"
          }
        },
        "title": "useTextSelection - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-text-selection",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useTextSelection__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useTextSelection/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useTextSelection/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useTextSelection",
              "heading": "usetextselection"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "监听特定区域文本选择",
              "heading": "监听特定区域文本选择"
            },
            {
              "depth": 3,
              "value": "划词翻译",
              "heading": "划词翻译"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "State",
              "heading": "state"
            }
          ],
          "title": "useTextSelection",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-text-selection",
            "title": "Hooks"
          }
        },
        "title": "useTextSelection - ahooks 3.0"
      },
      {
        "path": "/hooks/use-throttle",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useThrottle__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useThrottle/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useThrottle/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseThrottle"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useThrottle",
              "heading": "usethrottle"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useThrottle",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-throttle",
            "title": "UseThrottle"
          }
        },
        "title": "useThrottle - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-throttle",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useThrottle__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useThrottle/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useThrottle/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useThrottle",
              "heading": "usethrottle"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useThrottle",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-throttle",
            "title": "Hooks"
          }
        },
        "title": "useThrottle - ahooks 3.0"
      },
      {
        "path": "/hooks/use-throttle-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useThrottleEffect__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useThrottleEffect/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useThrottleEffect/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseThrottleEffect"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useThrottleEffect",
              "heading": "usethrottleeffect"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useThrottleEffect",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-throttle-effect",
            "title": "UseThrottleEffect"
          }
        },
        "title": "useThrottleEffect - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-throttle-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useThrottleEffect__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useThrottleEffect/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useThrottleEffect/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useThrottleEffect",
              "heading": "usethrottleeffect"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useThrottleEffect",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-throttle-effect",
            "title": "Hooks"
          }
        },
        "title": "useThrottleEffect - ahooks 3.0"
      },
      {
        "path": "/hooks/use-throttle-fn",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useThrottleFn__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useThrottleFn/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useThrottleFn/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseThrottleFn"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useThrottleFn",
              "heading": "usethrottlefn"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useThrottleFn",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-throttle-fn",
            "title": "UseThrottleFn"
          }
        },
        "title": "useThrottleFn - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-throttle-fn",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useThrottleFn__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useThrottleFn/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useThrottleFn/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useThrottleFn",
              "heading": "usethrottlefn"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useThrottleFn",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-throttle-fn",
            "title": "Hooks"
          }
        },
        "title": "useThrottleFn - ahooks 3.0"
      },
      {
        "path": "/hooks/use-timeout",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useTimeout__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useTimeout/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useTimeout/index.en-US.md",
          "updatedTime": 1706444069000,
          "nav": {
            "path": "/hooks",
            "title": "UseTimeout"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useTimeout",
              "heading": "usetimeout"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useTimeout",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-timeout",
            "title": "UseTimeout"
          }
        },
        "title": "useTimeout - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-timeout",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useTimeout__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useTimeout/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useTimeout/index.zh-CN.md",
          "updatedTime": 1706444069000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useTimeout",
              "heading": "usetimeout"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useTimeout",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-timeout",
            "title": "Hooks"
          }
        },
        "title": "useTimeout - ahooks 3.0"
      },
      {
        "path": "/hooks/use-title",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useTitle__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useTitle/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useTitle/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseTitle"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useTitle",
              "heading": "usetitle"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useTitle",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-title",
            "title": "UseTitle"
          }
        },
        "title": "useTitle - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-title",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useTitle__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useTitle/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useTitle/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useTitle",
              "heading": "usetitle"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            }
          ],
          "title": "useTitle",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-title",
            "title": "Hooks"
          }
        },
        "title": "useTitle - ahooks 3.0"
      },
      {
        "path": "/hooks/use-toggle",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useToggle__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useToggle/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useToggle/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseToggle"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useToggle",
              "heading": "usetoggle"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Advanced usage",
              "heading": "advanced-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Actions",
              "heading": "actions"
            }
          ],
          "title": "useToggle",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-toggle",
            "title": "UseToggle"
          }
        },
        "title": "useToggle - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-toggle",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useToggle__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useToggle/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useToggle/index.zh-CN.md",
          "updatedTime": 1662456843000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useToggle",
              "heading": "usetoggle"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "高级用法",
              "heading": "高级用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            },
            {
              "depth": 3,
              "value": "Actions",
              "heading": "actions"
            }
          ],
          "title": "useToggle",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-toggle",
            "title": "Hooks"
          }
        },
        "title": "useToggle - ahooks 3.0"
      },
      {
        "path": "/hooks/use-tracked-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useTrackedEffect__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useTrackedEffect/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useTrackedEffect/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseTrackedEffect"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useTrackedEffect",
              "heading": "usetrackedeffect"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Basic usage",
              "heading": "basic-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useTrackedEffect",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-tracked-effect",
            "title": "UseTrackedEffect"
          }
        },
        "title": "useTrackedEffect - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-tracked-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useTrackedEffect__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useTrackedEffect/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useTrackedEffect/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useTrackedEffect",
              "heading": "usetrackedeffect"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useTrackedEffect",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-tracked-effect",
            "title": "Hooks"
          }
        },
        "title": "useTrackedEffect - ahooks 3.0"
      },
      {
        "path": "/hooks/use-unmount",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useUnmount__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useUnmount/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useUnmount/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseUnmount"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useUnmount",
              "heading": "useunmount"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default Usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            }
          ],
          "title": "useUnmount",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-unmount",
            "title": "UseUnmount"
          }
        },
        "title": "useUnmount - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-unmount",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useUnmount__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useUnmount/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useUnmount/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useUnmount",
              "heading": "useunmount"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "参数",
              "heading": "参数"
            }
          ],
          "title": "useUnmount",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-unmount",
            "title": "Hooks"
          }
        },
        "title": "useUnmount - ahooks 3.0"
      },
      {
        "path": "/hooks/use-unmounted-ref",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useUnmountedRef__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useUnmountedRef/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useUnmountedRef/index.en-US.md",
          "updatedTime": 1655708145000,
          "componentName": "useUnmountedRef",
          "nav": {
            "path": "/hooks",
            "title": "UseUnmountedRef"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useUnmountedRef",
              "heading": "useunmountedref"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default Usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useUnmountedRef",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-unmounted-ref",
            "title": "UseUnmountedRef"
          }
        },
        "title": "useUnmountedRef - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-unmounted-ref",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useUnmountedRef__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useUnmountedRef/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useUnmountedRef/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "componentName": "useUnmountedRef",
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useUnmountedRef",
              "heading": "useunmountedref"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useUnmountedRef",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-unmounted-ref",
            "title": "Hooks"
          }
        },
        "title": "useUnmountedRef - ahooks 3.0"
      },
      {
        "path": "/hooks/use-update",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useUpdate__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useUpdate/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useUpdate/index.en-US.md",
          "updatedTime": 1636380500000,
          "nav": {
            "path": "/hooks",
            "title": "UseUpdate"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useUpdate",
              "heading": "useupdate"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default Usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useUpdate",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-update",
            "title": "UseUpdate"
          }
        },
        "title": "useUpdate - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-update",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useUpdate__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useUpdate/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useUpdate/index.zh-CN.md",
          "updatedTime": 1636380500000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useUpdate",
              "heading": "useupdate"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useUpdate",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-update",
            "title": "Hooks"
          }
        },
        "title": "useUpdate - ahooks 3.0"
      },
      {
        "path": "/hooks/use-update-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useUpdateEffect__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useUpdateEffect/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useUpdateEffect/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseUpdateEffect"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useUpdateEffect",
              "heading": "useupdateeffect"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Basic usage",
              "heading": "basic-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useUpdateEffect",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-update-effect",
            "title": "UseUpdateEffect"
          }
        },
        "title": "useUpdateEffect - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-update-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useUpdateEffect__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useUpdateEffect/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useUpdateEffect/index.zh-CN.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useUpdateEffect",
              "heading": "useupdateeffect"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useUpdateEffect",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-update-effect",
            "title": "Hooks"
          }
        },
        "title": "useUpdateEffect - ahooks 3.0"
      },
      {
        "path": "/hooks/use-update-layout-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useUpdateLayoutEffect__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useUpdateLayoutEffect/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useUpdateLayoutEffect/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseUpdateLayoutEffect"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useUpdateLayoutEffect",
              "heading": "useupdatelayouteffect"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Basic usage",
              "heading": "basic-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useUpdateLayoutEffect",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-update-layout-effect",
            "title": "UseUpdateLayoutEffect"
          }
        },
        "title": "useUpdateLayoutEffect - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-update-layout-effect",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useUpdateLayoutEffect__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useUpdateLayoutEffect/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useUpdateLayoutEffect/index.zh-CN.md",
          "updatedTime": 1636380500000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useUpdateLayoutEffect",
              "heading": "useupdatelayouteffect"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "useUpdateLayoutEffect",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-update-layout-effect",
            "title": "Hooks"
          }
        },
        "title": "useUpdateLayoutEffect - ahooks 3.0"
      },
      {
        "path": "/hooks/use-virtual-list",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useVirtualList__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useVirtualList/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useVirtualList/index.en-US.md",
          "updatedTime": 1691026019000,
          "nav": {
            "path": "/hooks",
            "title": "UseVirtualList"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useVirtualList",
              "heading": "usevirtuallist"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Dynamic item height",
              "heading": "dynamic-item-height"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useVirtualList",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-virtual-list",
            "title": "UseVirtualList"
          }
        },
        "title": "useVirtualList - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-virtual-list",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useVirtualList__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useVirtualList/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useVirtualList/index.zh-CN.md",
          "updatedTime": 1691026019000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useVirtualList",
              "heading": "usevirtuallist"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "动态元素高度",
              "heading": "动态元素高度"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useVirtualList",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-virtual-list",
            "title": "Hooks"
          }
        },
        "title": "useVirtualList - ahooks 3.0"
      },
      {
        "path": "/hooks/use-web-socket",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useWebSocket__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useWebSocket/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useWebSocket/index.en-US.md",
          "updatedTime": 1686016118000,
          "nav": {
            "path": "/hooks",
            "title": "UseWebSocket"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useWebSocket",
              "heading": "usewebsocket"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 4,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useWebSocket",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-web-socket",
            "title": "UseWebSocket"
          }
        },
        "title": "useWebSocket - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-web-socket",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useWebSocket__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useWebSocket/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useWebSocket/index.zh-CN.md",
          "updatedTime": 1686016118000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useWebSocket",
              "heading": "usewebsocket"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 4,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useWebSocket",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-web-socket",
            "title": "Hooks"
          }
        },
        "title": "useWebSocket - ahooks 3.0"
      },
      {
        "path": "/hooks/use-why-did-you-update",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useWhyDidYouUpdate__index.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useWhyDidYouUpdate/index.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useWhyDidYouUpdate/index.en-US.md",
          "updatedTime": 1655708145000,
          "nav": {
            "path": "/hooks",
            "title": "UseWhyDidYouUpdate"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useWhyDidYouUpdate",
              "heading": "usewhydidyouupdate"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useWhyDidYouUpdate",
          "hasPreviewer": true,
          "locale": "en-US",
          "group": {
            "path": "/hooks/use-why-did-you-update",
            "title": "UseWhyDidYouUpdate"
          }
        },
        "title": "useWhyDidYouUpdate - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-why-did-you-update",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__hooks__src__useWhyDidYouUpdate__index.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/hooks/src/useWhyDidYouUpdate/index.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/hooks/src/useWhyDidYouUpdate/index.zh-CN.md",
          "updatedTime": 1680832826000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useWhyDidYouUpdate",
              "heading": "usewhydidyouupdate"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useWhyDidYouUpdate",
          "hasPreviewer": true,
          "locale": "zh-CN",
          "group": {
            "path": "/zh-CN/hooks/use-why-did-you-update",
            "title": "Hooks"
          }
        },
        "title": "useWhyDidYouUpdate - ahooks 3.0"
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__use-url-state__README.md' */'/Users/ice/Desktop/learn/hooks/packages/use-url-state/README.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/use-url-state/README.md",
          "updatedTime": 1693128243000,
          "slugs": [
            {
              "depth": 1,
              "value": "useUrlState",
              "heading": "useurlstate"
            },
            {
              "depth": 2,
              "value": "Installing",
              "heading": "installing"
            },
            {
              "depth": 2,
              "value": "Example",
              "heading": "example"
            },
            {
              "depth": 2,
              "value": "Documentation",
              "heading": "documentation"
            }
          ],
          "title": "useUrlState"
        },
        "title": "useUrlState - ahooks 3.0"
      },
      {
        "path": "/hooks/use-url-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__use-url-state__use-url-state.en-US.md' */'/Users/ice/Desktop/learn/hooks/packages/use-url-state/use-url-state.en-US.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/use-url-state/use-url-state.en-US.md",
          "updatedTime": 1680832904000,
          "nav": {
            "path": "/hooks",
            "title": "Hooks"
          },
          "group": {
            "path": "/hooks/",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useUrlState",
              "heading": "useurlstate"
            },
            {
              "depth": 2,
              "value": "Install",
              "heading": "install"
            },
            {
              "depth": 2,
              "value": "Usage",
              "heading": "usage"
            },
            {
              "depth": 2,
              "value": "Examples",
              "heading": "examples"
            },
            {
              "depth": 3,
              "value": "CodeSandbox Demo",
              "heading": "codesandbox-demo"
            },
            {
              "depth": 3,
              "value": "Default usage",
              "heading": "default-usage"
            },
            {
              "depth": 3,
              "value": "Multi-state management",
              "heading": "multi-state-management"
            },
            {
              "depth": 3,
              "value": "Multi-state management (split)",
              "heading": "multi-state-management-split"
            },
            {
              "depth": 3,
              "value": "Custom query-string options",
              "heading": "custom-query-string-options"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useUrlState",
          "hasPreviewer": true,
          "locale": "en-US"
        },
        "title": "useUrlState - ahooks 3.0"
      },
      {
        "path": "/zh-CN/hooks/use-url-state",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'packages__use-url-state__use-url-state.zh-CN.md' */'/Users/ice/Desktop/learn/hooks/packages/use-url-state/use-url-state.zh-CN.md')}),
        "exact": true,
        "meta": {
          "filePath": "packages/use-url-state/use-url-state.zh-CN.md",
          "updatedTime": 1680832904000,
          "nav": {
            "path": "/zh-CN/hooks",
            "title": "Hooks"
          },
          "group": {
            "path": "/zh-CN/hooks/",
            "title": "Hooks"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "useUrlState",
              "heading": "useurlstate"
            },
            {
              "depth": 2,
              "value": "安装",
              "heading": "安装"
            },
            {
              "depth": 2,
              "value": "使用",
              "heading": "使用"
            },
            {
              "depth": 2,
              "value": "代码演示",
              "heading": "代码演示"
            },
            {
              "depth": 3,
              "value": "在线演示",
              "heading": "在线演示"
            },
            {
              "depth": 3,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 3,
              "value": "多状态管理",
              "heading": "多状态管理"
            },
            {
              "depth": 3,
              "value": "多状态管理（拆分）",
              "heading": "多状态管理拆分"
            },
            {
              "depth": 3,
              "value": "自定义 query-string 配置",
              "heading": "自定义-query-string-配置"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "Params",
              "heading": "params"
            },
            {
              "depth": 3,
              "value": "Options",
              "heading": "options"
            },
            {
              "depth": 3,
              "value": "Result",
              "heading": "result"
            }
          ],
          "title": "useUrlState",
          "hasPreviewer": true,
          "locale": "zh-CN"
        },
        "title": "useUrlState - ahooks 3.0"
      },
      {
        "path": "/guide/blog",
        "meta": {},
        "exact": true,
        "redirect": "/guide/blog/function"
      },
      {
        "path": "/zh-CN/guide/blog",
        "meta": {},
        "exact": true,
        "redirect": "/zh-CN/guide/blog/function"
      },
      {
        "path": "/hooks",
        "meta": {},
        "exact": true,
        "redirect": "/hooks/use-request/index"
      },
      {
        "path": "/zh-CN/hooks",
        "meta": {},
        "exact": true,
        "redirect": "/zh-CN/hooks/use-request/index"
      },
      {
        "path": "/hooks/use-request",
        "meta": {},
        "exact": true,
        "redirect": "/hooks/use-request/basic"
      },
      {
        "path": "/zh-CN/hooks/use-request",
        "meta": {},
        "exact": true,
        "redirect": "/zh-CN/hooks/use-request/basic"
      },
      {
        "path": "/hooks/",
        "meta": {},
        "exact": true,
        "redirect": "/hooks/use-url-state"
      },
      {
        "path": "/zh-CN/hooks/",
        "meta": {},
        "exact": true,
        "redirect": "/zh-CN/hooks/use-url-state"
      }
    ],
    "title": "ahooks 3.0",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
