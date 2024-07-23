import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return Response.json(
      {
        error: "Invalid email or password",
      },
      { status: 400 }
    );
  }

  const hash = bcrypt.hashSync(password, 8);

  const user = await prisma.user.create({
    data: {
      email,
      password: hash,
    },
  });

  // @ts-expect-error
  delete user.password

  return Response.json({
    user
  });
}