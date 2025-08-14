"use client";

import { Button } from "@/components/ui/button";
import { adminLogout } from "./action";

export default function AdminLogoutButton() {
  return (
    <form action={adminLogout}>
      <Button type="submit" variant="destructive">
        Logout
      </Button>
    </form>
  );
}
