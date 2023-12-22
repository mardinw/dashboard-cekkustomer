'use client'
import FormUploadExcel from "./ui/forms/UploadExcel";
// import { DataCustomer } from "./lib/dpt/definitions";
import ListFiles from "./ui/files/ListFiles";


export default function Home() {
  return (
    <main className="container md:container mx-auto">
      <div className="md:mx-auto w-full bg-white">
        <FormUploadExcel />
        <ListFiles />
      </div>
    </main>
  )
}
