// import { NextResponse } from "next/server";
// import { createClient } from "@/utils/supabase/server";

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get("code");
//   const next = searchParams.get("next");

//   if (code) {
//     const supabase = await createClient();
//     const { error, data } = await supabase.auth.exchangeCodeForSession(code);

//     if (!error) {
//       const isRecovery = data.session?.user?.recovery_sent_at;
//       if (isRecovery) {
//         return NextResponse.redirect(`${origin}/forgot-password/reset-password`);
//       }
//       return NextResponse.redirect(`${origin}${next ?? "/"}`);
//     }
//   }

//   return NextResponse.redirect(`${origin}/auth/auth-error`);
// }

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  const fromExtension = searchParams.get("from_extension");
  const supabase = await createClient();


  if (code) {
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session) {
      const isRecovery = data.session?.user?.recovery_sent_at;
      if (isRecovery) {
        return NextResponse.redirect(
          `${origin}/forgot-password/reset-password`
        );
      }

      // Check if this auth is from extension

      if (fromExtension === "true") {
        // Redirect to a special extension success page that will pass tokens
        const redirectUrl = new URL("/extension-auth-success", origin);
        redirectUrl.searchParams.set("access_token", data.session.access_token);
        redirectUrl.searchParams.set(
          "refresh_token",
          data.session.refresh_token
        );
        return NextResponse.redirect(redirectUrl.toString());
      }

      return NextResponse.redirect(`${origin}${next ?? "/dashboard"}`);
    }
  }

  if (!code && fromExtension === "true") {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const redirectUrl = new URL("/extension-auth-success", origin);
        redirectUrl.searchParams.set("access_token", session.access_token);
        redirectUrl.searchParams.set("refresh_token", session.refresh_token);
        return NextResponse.redirect(redirectUrl.toString());
      }
    }

  return NextResponse.redirect(`${origin}/auth/auth-error`);
}
