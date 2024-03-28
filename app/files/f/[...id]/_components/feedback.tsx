'use client'
import { createFeedback } from "@/actions/file-actions"
import { Button } from "@/components/ui/button"
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
import { fileSchema } from "@/lib/validations/file"
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageCircleDashed } from "lucide-react"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
const Feedback = ({ fileId: string }) => {
    const [isPending, startTransition] = useTransition()
    const createFeedbackApi = createFeedback.bind(null , fileId)
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(fileSchema),
        defaultValues: {
            name: "",
            description:"",


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
                    description: "You have createed an API Key",
                })
            }
        });

    });
    

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center justify-center">
                    <MessageCircleDashed className="w-4 h-4 mr-2"/>
                    Feedback</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-purple-900/5 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,176,225,0.12),rgba(255,255,255,0))]">
                <DialogHeader>
                    <DialogTitle>Provide a feedback</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default Feedback