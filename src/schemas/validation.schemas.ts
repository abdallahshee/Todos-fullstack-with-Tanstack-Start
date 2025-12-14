import * as yup from "yup";
export function yupSearchValidator<T>(
  schema: yup.Schema<T>,
  data: unknown,
  fallback: T
): T {
  try {
    return schema.validateSync(data, { stripUnknown: true });
  } catch (err) {
    console.error("Validation error:", err);
    return fallback;
  }
}

export const yupInputValidator =
  <T>(schema: yup.Schema<T>) =>
  (input: unknown): T => {
    try {
      return schema.validateSync(input, {
        abortEarly: false,
        stripUnknown: true,
      });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        throw new Error(err.errors.join(", "));
      }
      throw err;
    }
  };
