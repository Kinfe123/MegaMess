"use client";

import useScroll from "@/hooks/use-scroll";
import { MainNavItem } from "@/types";
import { User } from "next-auth";
import { MainNav } from "./main-nav";
import { UserAccountNav } from "./user-account-nav";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSigninModal } from "@/hooks/use-signin-modal";
import { useSelectedLayoutSegment } from "next/navigation";
import { ShiftingDropDown, Tabs } from "../navy";


interface NavBarProps {
  user: Pick<User, "name" | "image" | "email"> | undefined
  items?: MainNavItem[]
  children?: React.ReactNode
  rightElements?: React.ReactNode
  scroll?: boolean
}

export function NavBar({ user, items, children, rightElements, scroll = false }: NavBarProps) {
  const scrolled = useScroll(50);
  const segment = useSelectedLayoutSegment()
  const signInModal = useSigninModal();

  return (
      <header
        className={`sticky top-0 z-40 flex w-full  items-center justify-center border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-md  bg-background/60 backdrop-blur-xl transition-all ${scroll ? scrolled
          ? "border-b"
          : "bg-background/0"
          : "border-b"}`}
      >
        <div className="container px-10 flex h-16 items-center justify-between py-4">
          <MainNav items={items}>{children}</MainNav>
          {items?.length ? (
            <Tabs />
        // <nav className="hidden   w-full items-center justify-center m-auto lg:flex-row  gap-6 md:flex ">
        //   {items?.map((item, index) => (
        //     <Link
        //       key={index}
        //       href={item.disabled ? "#" : item.href}
        //       className={cn(
        //         "flex items-centertext-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
        //         item.href.startsWith(`/${segment}`)
        //           ? "text-foreground"
        //           : "text-foreground/60",
        //         item.disabled && "cursor-not-allowed opacity-80"
        //       )}
        //     >
        //       {item.title}
        //     </Link>
        //   ))}
        // </nav>
      ) : null}
          <div className="flex items-center space-x-3">
            {rightElements}

            {!user ? (
              ''
              // <Link
              //   href="/login"
              //   className={cn(
              //     buttonVariants({ variant: "outline", size: "sm" })
              //   )}
              // >
              //   Login 
              // </Link>
            ) : null}

            {user ? (
              <UserAccountNav user={user} />
            ) : (
              <Button className="px-" variant="outline" size="sm" onClick={signInModal.onOpen}>Sign In</Button>
            )}
          </div>
        </div>
      </header>
  );
}