import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/blog" }),
  schema: z.object({
    title: z.string(),
    type: z.string().default("article"),
    description: z.string(),
    image: z.string().default("/images/plate.jpg"),
    date: z.string(),
    hasMath: z.boolean().optional(),
  }),
});

export const collections = { blog };
