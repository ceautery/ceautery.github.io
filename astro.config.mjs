import { bundledLanguages } from "shiki";
import syntaxTheme from "./shiki/syntax-theme.json";
import pry from "./shiki/pry.json";
// @ts-check
import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

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
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
