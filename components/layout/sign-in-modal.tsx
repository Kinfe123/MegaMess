"use client";

import { useState } from "react";

import { Icons } from "@/components/shared/icons";
import { Modal } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useSigninModal } from "@/hooks/use-signin-modal";
import { authClient } from "@/lib/auth-client";

export const SignInModal = () => {
  const signInModal = useSigninModal();
  const [signInClicked, setSignInClicked] = useState(false);

  const handleSignIn = async () => {
    setSignInClicked(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      fetchOptions: {
        onSuccess: () => {
          signInModal.onClose();
          setSignInClicked(false);
        },
        onError: (error) => {
          console.error(error);
          setSignInClicked(false);
        },
      },
    });
  };

  return (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-gradient-to-tr from-purple-400/10 via-background to-background/60 px-4 py-6 pt-8 text-center md:px-16">
          <a href={siteConfig.url}>
            <Icons.logo className="size-10" />
          </a>
          <h3 className="font-urban text-2xl font-bold">Sign In</h3>
          <p className="text-sm text-gray-500">
            This is strictly for demo purposes - only your email and profile
            picture will be stored.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-gradient-to-tr from-purple-600/5 via-background to-secondary/50 px-4 py-8 md:px-16">
          <Button
            variant="default"
            disabled={signInClicked}
            onClick={handleSignIn}
          >
            {signInClicked ? (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 size-4" />
            )}{" "}
            Sign In with Google
          </Button>
        </div>
      </div>
    </Modal>
  );
};

