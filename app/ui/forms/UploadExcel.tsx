'use client'
import { FormEvent, useState } from "react";
import Link from 'next/link';
import { appInfo } from "@/app/config/appInfo";


export default function FormUploadExcel() {
  const apiUrl = appInfo.apiDomain
  const [file, setFile] = useState<File>();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const sessionStorageData = sessionStorage.getItem('authData');

    if (!sessionStorageData) {
      console.error('Data sesi tidak ditemukan');
      return;
    }

    const parsedData = JSON.parse(sessionStorageData);
    const accessToken = parsedData.access_token;

    e.preventDefault()


    if (!file) return
      try {
        setIsUploading(true);
        const data = new FormData()
        data.set('file', file)

        const res = await fetch(`${apiUrl}/v1/files/import`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          body: data,
        })

        const result = await res.json();
        if (!res.ok) {
          if (res.status === 400) {
            setErrorMessage(`${res.statusText}`)
          } else {
            throw new Error(await res.text());
          }
        }
      } catch (e: any){
        console.error(e)
      } finally {
        setIsUploading(false);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
      
  }

  const handleDownload = async () => {
    const sampleFile = "sample_cekkustomer.xlsx"
    const sessionStorageData = sessionStorage.getItem('authData');
    if (!sessionStorageData) {
      console.error('Data sesi tidak ditemukan');
      return;
    }
    const parsedData = JSON.parse(sessionStorageData);
    const accessToken = parsedData.access_token;
    
    try {
      setIsDownloading(true);
      const downloadUrl = `${apiUrl}/v1/files/download/${sampleFile}`
      const response = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken},`
        },
      });

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
      setIsDownloading(false);
    }
  }

  return (
    <form className="p-2" onSubmit={onSubmit}>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row w-full">
          <div className="grid h-32 md:h-20 flex-grow">
            <p className="m-1 text-sm leading-6 text-gray-600">
              Silahkan unduh template dibawah ini.
            </p>
            <button className="mb-6 btn btn-accent text-white flex-grow" type="submit" onClick={handleDownload}>{isDownloading ? 'Downloading...': 'UNDUH TEMPLATE'}</button>
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
              <button className="btn sm:btn-md md:btn-md btn-primary text-white" type="submit">{isUploading ? 'Uploading...' : 'UPLOAD'}</button>
            </div>
          </div>
        </div>
        </div>
      {errorMessage && <p className="text-error">{errorMessage}</p>}
      </form>
  );
}
