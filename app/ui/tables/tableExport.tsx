import { appInfo } from "@/app/config/appInfo"
import { useState } from "react"
import {SiMicrosoftexcel} from "react-icons/si"

export default function TableExport({fileName, exportType}: {fileName:string, exportType: string}) {
  const apiUrl = appInfo.apiDomain
  const [error, setError] = useState<string|null>(null);

  const getFiles = async () => {
    const sessionStorageData = sessionStorage.getItem('authData');
    if (!sessionStorageData) {
      console.error('Data sesi tidak ditemukan');
      return;
    }
    const parsedData = JSON.parse(sessionStorageData);
    const accessToken = parsedData.access_token;

    try {
      const endpoint = exportType === 'nik' ? 'nik' : 'concat';

      const response = await fetch(`${apiUrl}/v1/files/export/${endpoint}/${fileName}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

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
