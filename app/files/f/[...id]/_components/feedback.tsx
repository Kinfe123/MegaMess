'use client'

import { createFeedback, type FormData } from "@/actions/file-actions"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  fileSchema } from "@/lib/validations/file"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, MessageCircleDashed } from "lucide-react"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
const Feedback = ({ fileId }: { fileId: string }) => {
    const [isPending, startTransition] = useTransition()
    const createFeedbackApi = createFeedback.bind(null, fileId)
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(fileSchema),
        defaultValues: {
            name: "",
            description: ""

        },
    })
    const onSubmit = handleSubmit(data => {
        startTransition(async () => {
            const res = await createFeedbackApi(data);
            if (!res) {
                toast({
                    title: "Something went wrong.",
                    description: "There is an error while creating an apikey.",
                    variant: "destructive",
                })
            } else {
                toast({
                    description: "You have submitted your feedback",
                })
            }
        });

    });


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center justify-center">
                    <MessageCircleDashed className="w-4 h-4 mr-2" />
                    Feedback</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-purple-900/5 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,176,225,0.12),rgba(255,255,255,0))]">
                <DialogHeader>
                    <DialogTitle>Provide a feedback</DialogTitle>
                    <DialogDescription>
                       Make sure to be polite and constructive on your words..
                    </DialogDescription>
                </DialogHeader>
                <form >

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" className="col-span-3" {...register("name")} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Description
                            </Label>
                            <Textarea id="desciption" className="col-span-3" {...register("description")} placeholder="Type your message here." />

                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={onSubmit}
                            className={cn(buttonVariants())}
                            disabled={isPending}
                            type="submit">

                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

                            Submit Feedback</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default Feedback