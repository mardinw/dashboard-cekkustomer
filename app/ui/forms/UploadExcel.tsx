'use client'
import { FormEvent, useState } from "react";
import Link from 'next/link';
import { appInfo } from "@/app/config/appInfo";


export default function FormUploadExcel() {
  const apiUrl = appInfo.apiDomain
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

        if (!res.ok) throw new Error(await res.text())
        setIsLoading(true);
      } catch (e: any){
        console.error(e)
      } finally {
        setIsLoading(false);
        window.location.reload();
      }
      
  }

  const handleDownload = async () => {
    const sampleFile = "sample_cekkustomer.xlsx"
    try {
      const downloadUrl = `${apiUrl}/v1/files/download/${sampleFile}`
      const response = await fetch(downloadUrl);

      if(!response.ok) {
        throw new Error(`failed to download file: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = sampleFile;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="p-2" onSubmit={onSubmit}>
        <h2 className="mt-2 block text-xl font-semibold text-[#07074D]">Cek Data</h2>
          <hr className="mb-2"/>
      <div className="mb-6">
            <label className="mb-5 block text-xl font-semibold text-[#07074D] flex flex-row">Upload File</label>
        <div className="flex flex-col md:flex-row w-full">
          <div className="grid h-32 md:h-20 flex-grow">
            <p className="m-1 text-sm leading-6 text-gray-600">
              Belum ada template ? bisa klik unduh file dibawah ini.
            </p>
            <button className="mb-6 btn btn-accent text-white flex-grow" type="submit" onClick={handleDownload}>UNDUH TEMPLATE</button>
          </div>
          <div className="divider md:divider-horizontal">OR</div>
          <div className="grid h-32 md:h-20 flex-grow">
            <p className="m-1 text-sm leading-6 text-gray-600">
              Silahkan upload file format Excel yang akan anda cek datanya
            </p>
            <div className="mb-8">
              <input type="file" name="file" id="file" className="file-input mr-2 mb-4 file-input-bordered w-full max-w-xs" 
                onChange={(e) => setFile(e.target.files?.[0])}
              />
              <button className="btn sm:btn-md md:btn-md btn-primary text-white" type="submit">UPLOAD</button>
            </div>
          </div>
        </div>
          
        </div>
      </form>
  );
}
