"use client";

import useScroll from "@/hooks/use-scroll";
import { MainNavItem } from "@/types";
import { MainNav } from "./main-nav";
import { UserAccountNav } from "./user-account-nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSigninModal } from "@/hooks/use-signin-modal";
import { useSelectedLayoutSegment } from "next/navigation";
import { Tabs, MobileTabs } from "../navy";
import { User } from "better-auth/types";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface NavBarProps {
  user: Pick<User, "name" | "image" | "email"> | undefined;
  items?: MainNavItem[];
  children?: React.ReactNode;
  rightElements?: React.ReactNode;
  scroll?: boolean;
}

export function NavBar({
  user,
  items,
  children,
  rightElements,
  scroll = false,
}: NavBarProps) {
  const scrolled = useScroll(50);
  const segment = useSelectedLayoutSegment();
  const signInModal = useSigninModal();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsMobileOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <header
      className={`border-n-6 lg:bg-n-8/90 sticky top-0 z-40 flex w-full items-center justify-center border-b bg-background/60 backdrop-blur-xl transition-all lg:backdrop-blur-md ${
        scroll ? (scrolled ? "border-b" : "bg-background/0") : "border-b"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 py-4 sm:px-6">
        <MainNav items={items}>{children}</MainNav>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {items?.length && <Tabs />}
        </div>

        {/* mobile nav */}
        <div className="flex items-center space-x-3 md:hidden">
          {rightElements}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-gray-400 hover:text-gray-500"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute left-0 right-0 top-full w-full bg-black/80 backdrop-blur-lg md:hidden"
            >
              <div className="space-y-2 p-4">
                <MobileTabs />
                <div className="mt-4 py-4">
                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Button
                      className="w-full py-4"
                      variant="outline"
                      size="lg"
                      onClick={signInModal.onOpen}
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden items-center space-x-3 md:flex">
          {user ? (
            <UserAccountNav user={user} />
          ) : (
            <Button variant="outline" size="lg" onClick={signInModal.onOpen}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
