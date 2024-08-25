import { type NextApiRequest } from "next";

export interface TypedRequestBody<T> extends NextApiRequest {
  body: T;
}

export type GenericResponse =
  | {
      detailMessage?: string;
      ok: true;
    }
  | {
      error: string;
      ok: false;
    };

export enum AuthStatus {
  AUTHENTICATED = "authenticated",
  LOADING = "loading",
  UNAUTHENTICATED = "unauthenticated"
}
