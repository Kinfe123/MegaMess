'use client'
import { useSigninModal } from "@/hooks/use-signin-modal";
import { Button } from "./ui/button";
const SignInPopUp = () => {
    const signInModal = useSigninModal();
    return (
        <Button className="px-" variant="outline" size="lg" onClick={signInModal.onOpen}>Sign In</Button>
    )
}

export default SignInPopUp