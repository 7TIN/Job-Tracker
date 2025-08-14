"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function adminLogout() {
  const cookieStore = await cookies();

  // Expire the admin_token immediately
  cookieStore.set("admin_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  redirect("/admin/login");
}
