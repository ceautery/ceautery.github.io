import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/blog" }),
  schema: z.object({
    og: z.object({
      title: z.string(),
      type: z.string(),
      publish_date: z.string(),
      description: z.string(),
      author: z.string(),
      image: z.string(),
      url: z.string(),
    }),
    hasMath: z.boolean(),
  }),
});

export const collections = { blog };
