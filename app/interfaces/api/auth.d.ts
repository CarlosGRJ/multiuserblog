import { type GenericResponse } from "../utils";

export interface ErrorLoginResponse extends GenericResponse {
  status: number;
  url: string;
}
