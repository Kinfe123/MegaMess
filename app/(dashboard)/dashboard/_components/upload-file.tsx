


"use client"

/* eslint-disable tailwindcss/classnames-order */

import { useEffect, useState } from "react"



import { cn } from "@/lib/utils"
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

import FilePage from "./file-display"
import { MultiFileDropzone } from "./file-upload"
import { Icons } from "@/components/shared/icons"
import { toast } from "@/components/ui/use-toast"

function DialogDemo({ serverSesion, jobPosition, jobId, jobApplied }: any) {

  const [loading, setLoading] = useState(false)
  const [applied, setApplied] = useState(false)
  const [disableSubmit , setDisableSubmit] = useState(false)
  const [applicationInfo, setApplicationInfo] = useState([])
  const [texthelper, setTextHelper] = useState<"Apply" | "Applied">("Apply")
  const [resumeData, setResumeDate] = useState({
    firstName: serverSesion?.user.name ?? "",
    lastName: "",
    email: serverSesion?.user.email ?? "",
    resumeLink: "",
    portfolioLink: "",
    referredFrom: "",
    resumeUrl: ""
  })

  const [clicked, setClicked] = useState(false)

  const handleChange = (e) => {
    setResumeDate({ ...resumeData, [e.target.id]: e.target.value })
  }
  const handleParentUpdate = (newVal) => {
    setResumeDate({...resumeData  , resumeUrl: newVal})
  }

  const handleClick = async () => {
    setLoading(true)
    const req = await fetch("/api/resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: resumeData.firstName,
        lastName: resumeData.lastName,
        email: resumeData.email,
        resumeLink: resumeData.resumeLink,
        portfolioLink: resumeData.portfolioLink,
        jobType: jobPosition,
        jobId: jobId,
        referredFrom: resumeData.referredFrom,
        resumeUrl: resumeData.resumeUrl
      }),
    })

    // console.log("The data as a response: " , req)
    setLoading(false)
    if (!req.ok) {
      return toast({
        title: "Something went wrong.",
        description: "We can't receive your application. Please try again.",
        variant: "destructive",
      })
    } else {
      sendEmail()
      sendAdminEmail()
      setDisableSubmit(true)
      return toast({
        title: "Successfully Sent",
        description: `Thanks ${resumeData.firstName} for applying ${jobPosition}. We will contact you if you are a good fit. `,
        variant: "default",
      })
    }

// function call to send an email to user who applied to us.



  }

  const sendEmail = async () => {
    const response = await fetch("/api/send" , {
      method:'POST',
      body:JSON.stringify({
        name: resumeData.firstName + " "+  resumeData.lastName,
        emailAddress : resumeData.email,
        jobPosition: jobPosition,

      })
    })
    const jsonResponse = await response.json()
    // console.log("THe response comes as json : " , jsonResponse)

  }
  const sendAdminEmail = async () => {
    const response = await fetch("/api/send-admin" , {
      method:'POST',
      body:JSON.stringify({
        name: resumeData.firstName + " "+  resumeData.lastName,
        emailAddress : resumeData.email,
        jobPosition: jobPosition,
        resumeLink: resumeData.resumeLink,
        resumeUrl: resumeData.resumeUrl,
        portfolioLink: resumeData.portfolioLink,
        referredFrom: resumeData.referredFrom

      })
    })
    const jsonResponse = await response.json()
    // console.log("THe response comes as json : " , jsonResponse)

  }


  const disbales = jobApplied.includes(jobId)
  const fetcher = async () => {
    const res = await fetch("/api/jobapplied")
    const json = await res.json()
    // return json
    const mappedId = json.map((job) => job.jobId)
    if (mappedId.includes(jobId)) {
      setApplied(true)
      setTextHelper("Applied")
    }
    setApplicationInfo(mappedId)
  }
  useEffect(() => {
    fetcher()
  }, [])

  useEffect(() => {
    fetcher()
  }, [loading])
  if(!serverSesion){
    return <>hm....</> 
  }


  return (
    <Dialog>
      {/* {<p className="flex    mx0-auto tracking-normal text-muted-foreground justify-center items-center mt-10 ">You have already applied for the job!</p> } */}
      <DialogTrigger asChild>
        {/* {jobApplied.includes(jobId) && (<Button variant="outline" size='lg' className="bg-gray-800 text-white   transition ease-in-out duration-150 dark:bg-white  dark:text-black" disabled={true}>Applied</Button>) } */}


        <Button
          variant="outline"
          size="lg"
          className="bg-gray-800 my-5 mb-10 text-white  mx-auto flex justify-center items-center   transition ease-in-out duration-150 dark:bg-white  dark:text-black"
        //   disabled={applied}
        >
          Upload File
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Fill in the infos for - {jobPosition}</DialogTitle>
          <DialogDescription>
            Make changes to your self by starting a journey with us.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              First Name
            </Label>

            <Input
              id="firstName"
              onChange={handleChange}
              value={resumeData.firstName}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Last Name
            </Label>

            <Input
              id="lastName"
              onChange={handleChange}
              value={resumeData.lastName}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={resumeData.email}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Portfolio
            </Label>
            <Input
              value={resumeData.portfolioLink}
              id="portfolioLink"
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="resume" className="text-right">
              Referred From
            </Label>
            <Input
              value={resumeData.referredFrom}
              id="referredFrom"
              onChange={handleChange}
              placeholder="A name of person referred you here"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="resume" className="text-right">
              Resume Link
            </Label>
            <Input
              value={resumeData.resumeLink}
              id="resumeLink"
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or Upload Your Resume
            </span>
          </div>
          <div className="flex justify-end items-end">
            <FilePage updateData={handleParentUpdate} />
          </div>
        </div>
        <DialogFooter>
          <button
            className={cn(buttonVariants())}
            disabled={loading || disableSubmit}
            onClick={handleClick}
          >
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </button>
        </DialogFooter>
      </DialogContent>
  </Dialog>
  )
}

export default DialogDemo
