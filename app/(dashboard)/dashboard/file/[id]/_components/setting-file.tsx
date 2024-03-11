import { Button } from "@/components/ui/button"
export default function SettingFile() {
    return (
    <div className='flex flex-col w-full  mr-auto'>
      <div className="bg-transparent border-red-500/90 border-[0.01px]  shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-white">Delete A File</h3>
          <div className="mt-2 sm:flex sm:items-start sm:justify-between">
            <div className="max-w-xl text-sm text-gray-500">
              <p>
               This action is undone , which delete a file permanently from file storage and sharing dashboard
              </p>
            </div>
            <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
              <Button
                type="button"
                variant={'destructive'}
                className="inline-flex items-end rounded-md  px-3 py-2 text-sm font-semibold ml-auto text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Delete File
              </Button>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
  