"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
//   NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { logout } from "@/app/(auth)/logout/action";
import { useRouter } from "next/navigation";

export function NavbarDemo() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Dashboard", link: "/dashboard" }
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const supabase = createClient();
  const router = useRouter();

  // ✅ Auth check
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setIsAuthenticated(!!session)
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // ✅ Logout handler
  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          {/* <NavbarLogo /> */}
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <NavbarButton
                as="button"
                onClick={handleLogout}
                variant="secondary"
              >
                Logout
              </NavbarButton>
            ) : (
              <>
                <NavbarButton href="/login" variant="secondary">
                  Login
                </NavbarButton>
                <NavbarButton href="/register" variant="primary">
                  Register
                </NavbarButton>
              </>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            {/* <NavbarLogo /> */}
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}

            <div className="flex w-full flex-col gap-4">
              {isAuthenticated ? (
                <NavbarButton
                  as="button"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Logout
                </NavbarButton>
              ) : (
                <>
                  <NavbarButton
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="secondary"
                    className="w-full"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Register
                  </NavbarButton>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
