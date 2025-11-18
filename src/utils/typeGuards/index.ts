import type { AnyAction } from "@reduxjs/toolkit";

export const isReduxAction = (value: unknown): value is AnyAction => {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    typeof (value as Record<string, unknown>).type === "string"
  );
};
