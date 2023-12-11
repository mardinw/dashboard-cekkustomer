'use client'
import { useEffect, useState } from "react";
import FormUploadExcel from "./ui/forms/UploadExcel";
import { DataCustomer } from "./lib/dpt/definitions";
import ListFiles from "./ui/files/ListFiles";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mx-auto w-full bg-white">
        <FormUploadExcel />
        <ListFiles />
      </div>
    </main>
  )
}
