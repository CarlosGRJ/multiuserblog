import bcrypt from "bcrypt";

import dbConnection from "@/app/database/config";
import User from "@/app/models/User";
import { type RegisterRequest } from "@/app/interfaces/api/register";

import { NextResponse } from "next/server";
import { handleError } from "@/app/utils/ErrorHandling";
import { type GenericResponse } from "@/app/interfaces/utils";

export async function POST(req: Request) {
  await dbConnection();

  const { name, email, password }: RegisterRequest = await req.json();

  try {
    await new User({
      name,
      email,
      password: await bcrypt.hash(password, 10)
    }).save();

    return NextResponse.json<GenericResponse>(
      { detailMessage: "User created successfully", ok: true },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("error ", error);
    const errorMessage = handleError(error);
    return NextResponse.json<GenericResponse>(
      { error: errorMessage, ok: false },
      { status: 500 }
    );
  }
}
