import z from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export type SignupInput = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SigninInput = z.infer<typeof signinInput>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    content?: string | undefined;
}, {
    title: string;
    content?: string | undefined;
}>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodOptional<z.ZodString>;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    id: string;
    content?: string | undefined;
}, {
    title: string;
    id: string;
    content?: string | undefined;
}>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
