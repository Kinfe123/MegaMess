'use client'
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

import { ChevronDownIcon } from "lucide-react"

const LogMenu = () => {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="bg-white dark:bg-transparent" variant="outline">
                        StatusDropDownMenu
                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>


                <DropdownMenuContent align="end" onChange={() => {
                    console.log("Hello world is good to know")
                }}>
                    <DropdownMenuCheckboxItem >Denied</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem >Requested</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem >Granted</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked>Ready</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
export default LogMenu