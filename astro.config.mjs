import { bundledLanguages } from "shiki";
import syntaxTheme from "./src/shiki/syntax-theme.json";
import pry from "./src/shiki/pry.json";
// @ts-check
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import codezPlugin from "./src/remark/codez-plugin";

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
    remarkPlugins: [remarkMath, remarkDirective, codezPlugin],
    rehypePlugins: [rehypeKatex],
  },
});
