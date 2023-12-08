'use client'
import { useEffect, useState } from "react";
import FormUploadExcel from "./ui/forms/UploadExcel";
import TablePreview from "./ui/tables/tablePreview";
import { DataCustomer } from "./lib/dpt/definitions";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <FormUploadExcel />
      </div>
    </main>
  )
}
