"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function GoogleSignin() {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const supabase = createClient();

  const searchParams = useSearchParams();

  const next = searchParams.get("next");

async function signInWithGoogle() {
  setIsGoogleLoading(true);
  try {
    const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback${
      next ? `?next=${encodeURIComponent(next)}` : ""
    }`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });

    if (error) {
      throw error; 
    }
  } catch (error) {
    let description = "There was an error logging in with Google.";
    if (error instanceof Error) {
      description = error.message;
    }
    
    toast.error("Login Failed", {
      description: description,
    });
    
  } finally {
    setIsGoogleLoading(false);
  }
}

  return (
    <Button
      type="button"
      variant="outline"
      onClick={signInWithGoogle}
      disabled={isGoogleLoading}
    >
      {isGoogleLoading ? (
        <Loader2 className="mr-2 size-4 animate-spin" />
      ) : (
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="mr-2"
        />
      )}{" "}
      Sign in with Google
    </Button>
  );
}