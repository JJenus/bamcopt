import { createError } from "h3";

/** Small helpers so services throw meaningful HTTP errors instead of generic 500s. */
export const badRequest = (message: string) => createError({ statusCode: 400, message });
export const unauthorized = (message = "Access denied") => createError({ statusCode: 401, message });
export const forbidden = (message = "Forbidden") => createError({ statusCode: 403, message });
export const notFound = (message: string) => createError({ statusCode: 404, message });
export const conflict = (message: string) => createError({ statusCode: 409, message });
/** Request is well-formed but cannot be processed (validation, insufficient balance, ...). */
export const unprocessable = (message: string) => createError({ statusCode: 422, message });
