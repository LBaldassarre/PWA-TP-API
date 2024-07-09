import z from "zod";

const passwordSchema = z
    .string()
    .min(8, { message: 'Must contain at least 8 characters' })
    .max(20, { message: 'Can not contain more than 20 characters' })
    .refine((password) => /[A-Z]/.test(password), {
        message: 'Must contain at least one uppercase letter',
    })
    .refine((password) => /[a-z]/.test(password), {
        message: 'Must contain at least one lowercase letter',
    })
    .refine((password) => /[0-9]/.test(password), { message: 'Must contain at least one number' })
    .refine((password) => /[!@#$%^&*]/.test(password), {
        message: 'Must contain at least one special character',
    });

const userSchema = z.object({
    userName: z
        .string({
            required_error: "Field is required",
        })
        .min(1),
    email: z
        .string({
            required_error: "Field is required",
        })
        .email({ message: "Invalid email address" }),
    password: passwordSchema,
    characters_id: z
        .string()
});

export function validateUser(object) {
    return userSchema.safeParse(object);
}

export function validatePartialUser(object) {
    return userSchema.partial().safeParse(object);
  }