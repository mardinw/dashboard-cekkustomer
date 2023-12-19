import { appInfo } from "@/app/config/appInfo"
import { useState } from "react"
import {SiMicrosoftexcel} from "react-icons/si"

export default function TableExport({fileName}: {fileName:string}) {
  const apiUrl = appInfo.apiDomain
  const [error, setError] = useState<string|null>(null);


    const getFiles = async () => {
      try {
        const response = await fetch(`${apiUrl}/v1/files/export/${fileName}`)

        if(!response.ok) {
          throw new Error(`failed to download file: ${response.statusText}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName
        a.click();

        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error:', error);
      } 
  
  }
  return (
    <>
      <button className="btn m-2 btn-white text-black flex-grow" type="submit" onClick={getFiles}><SiMicrosoftexcel /> Export to Excel</button>
    </>
  )
}
