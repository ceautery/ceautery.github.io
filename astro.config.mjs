import { bundledLanguages } from "shiki";
import syntaxTheme from "./src/shiki/syntax-theme.json";
import pry from "./src/shiki/pry.json";
// @ts-check
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import classWrapper from "./src/remark/class-wrapper";
import inspectUrls from "@jsdevtools/rehype-url-inspector";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: syntaxTheme,
      langs: [
        ...Object.keys(bundledLanguages),
        {
          id: "pry",
          scopeName: "source.pry",
          ...pry,
        },
      ],
    },
    remarkPlugins: [remarkMath, remarkDirective, classWrapper],
    rehypePlugins: [
      rehypeKatex,
      [
        inspectUrls,
        {
          selectors: ["a[href]"],
          inspectEach(url) {
            url.node.properties.target = "_blank";
            url.node.properties.rel = "noreferrer";
          },
        },
      ],
    ],
  },
});
