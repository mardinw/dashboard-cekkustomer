import { useEffect, useState } from "react";
import TablePreview from "@/app/ui/tables/tablePreview";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <TablePreview />
      </div>
    </main>
  )
}
