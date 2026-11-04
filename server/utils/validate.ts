import { H3Event, readBody, getQuery, getValidatedRouterParams, createError } from "h3";
import { z, ZodError, type ZodTypeAny } from "zod";

const toHttpError = (error: ZodError) =>
	createError({
		statusCode: 422,
		message: error.issues
			.map((i) => (i.path.length ? `${i.path.join(".")}: ${i.message}` : i.message))
			.join(", "),
	});

const run = <S extends ZodTypeAny>(schema: S, data: unknown): z.infer<S> => {
	const result = schema.safeParse(data);
	if (!result.success) throw toHttpError(result.error);
	return result.data;
};

/** Parse + validate the JSON body. Unknown keys are stripped (zod default). */
export const parseBody = async <S extends ZodTypeAny>(event: H3Event, schema: S): Promise<z.infer<S>> =>
	run(schema, (await readBody(event)) ?? {});

/** Validate + coerce the query string (e.g. `?limit=20`). */
export const parseQuery = <S extends ZodTypeAny>(event: H3Event, schema: S): z.infer<S> => run(schema, getQuery(event));

export const uuidParam = async (event: H3Event, name = "id"): Promise<string> => {
	const params = await getValidatedRouterParams(event, (p) =>
		run(z.object({ [name]: z.string().uuid(`Invalid ${name}`) }), p)
	);
	return (params as Record<string, string>)[name];
};

export { z };
