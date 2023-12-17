// Generic Zod Safe Action Created with an Input TINPUT, errors
// which is an object with keys belonging to TINPUT and an array of strings for each key,
// and a Data output of type TOUTPUT

import { z } from 'zod';

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (
    validatedData: TInput
  ) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (
    data: TInput
  ): Promise<ActionState<TInput, TOutput>> => {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }

    return handler(validationResult.data);
  };
};
