import * as z from "zod";
export const ProductSchema = z.object({
  title: z.string().min(6),
  price: z.number(),
  description: z.string(),
});
