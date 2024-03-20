'use client'


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { fileSchema } from "@/lib/validations/file"
import FuzzyOverlay from "@/components/fuzzy"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { createApiKey, type FormData } from "@/actions/api-key-actions"
import { apiKeySchema } from "@/lib/validations/api-key"

type UserProps = {
    userId: string,
}
const ApiKeyForm = ({ userId }: UserProps) => {
    const [isPending, startTransition] = useTransition()

    const createApiKeById = createApiKey.bind(null, userId)



    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(apiKeySchema),
        defaultValues: {
            name: "",
            description: '',
            website: ""

        },
    })
    const onSubmit = handleSubmit(data => {
        startTransition(async () => {
            const res = await createApiKeById(data);
            if (!res) {
                toast({
                    title: "Something went wrong.",
                    description: "There is an error while creating an apikey.",
                    variant: "destructive",
                })
            } else {
                toast({
                    description: "You have createed an API Key",
                })
            }
        });

    });
    return (
        <Dialog>
            {/* {<p className="flex    mx0-auto tracking-normal text-muted-foreground justify-center items-center mt-10 ">You have already applied for the job!</p> } */}
            <DialogTrigger asChild>
                {/* {jobApplied.includes(jobId) && (<Button variant="outline" size='lg' className="bg-gray-800 text-white   transition ease-in-out duration-150 dark:bg-white  dark:text-black" disabled={true}>Applied</Button>) } */}


                <Button
                    variant="outline"
                    size="lg"
                    className="bg-gray-800 my-5 mb-10 text-white  ml-auto flex justify-center items-center   transition ease-in-out duration-150 dark:bg-white  dark:text-black"
                //   disabled={applied}
                >
                    Create API Key
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] relative overflow-hidden mt-[-500px] bg-gradient-to-tr from-purple-400/15 via-transparent to-transparent/70">
                <DialogHeader>
                    <DialogTitle>Create API Key</DialogTitle>
                    <DialogDescription>
                        Create api key and build cool thing with us.
                    </DialogDescription>



                </DialogHeader>
                <FuzzyOverlay />
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">

                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>


                            <Input
                                id="name"
                                size={32}
                                className="col-span-3"
                                {...register("name")}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">

                            <Label htmlFor="name" className="text-right">
                                Website
                            </Label>


                            <Input
                                id="website"
                                size={32}
                                className="col-span-3"
                                {...register("website")}
                            />
                            </div>
                        <div className="grid grid-cols-4 items-center gap-4">

                            <Label htmlFor="name" className="text-right">
                                Descriptions
                            </Label>

                            <Textarea id="desciption" className="col-span-3" {...register("description")} placeholder="Type your message here." />

                        </div>
                    </div>
                    <DialogFooter>
                        <button
                            className={cn(buttonVariants(), 'flex justify-center items-center mx-auto')}
                            disabled={isPending}
                            type="submit"

                        >
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}

export default ApiKeyForm