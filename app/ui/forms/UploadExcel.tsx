'use client'
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from 'next/link';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function FormUploadExcel() {
  const [file, setFile] = useState<File>();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) return
      try {
        const data = new FormData()
        data.set('file', file)

        const res = await fetch(`${apiUrl}/v1/files/import`, {
          method: 'POST',
          body: data,
        })

        router.push('/check/preview');
        if (!res.ok) throw new Error(await res.text())
      } catch (e: any){
        console.error(e)
      }
  }

  return (
      <form className="py-6 px-6" onSubmit={onSubmit}>
        <div className="space-y-12">
          <h2 className="mb-2 block text-xl font-semibold text-[#07074D]">Cek Data</h2>
          <hr/>
        </div>
        <div className="mb-6 pt-4">
          <label className="mb-5 block text-xl font-semibold text-[#07074D]">Upload File</label>
          <p className="m-1 text-sm leading-6 text-gray-600">
            Silahkan upload file yang akan anda cari
          </p>
          <div className="mb-8">
            <input type="file" name="file" id="file" className="file-input file-input-bordered w-full max-w-xs mr-2" 
              onChange={(e) => setFile(e.target.files?.[0])}
            />
            <button className="btn btn-xs sm:btn-sm md:btn-md btn-primary text-white" type="submit">UPLOAD</button>
          </div>
          
        </div>
      </form>
  );
}
