import { appInfo } from "@/app/config/appInfo";
import { useEffect, useState } from "react";

export default function DeleteFile({fileName}: {fileName: string}) {
  const apiUrl = appInfo.apiDomain

  const nameAgencies = "pass"
  const [error, setError] = useState<string|null>(null);
  const [files, setFiles] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchFiles = async () => {
      const sessionStorageData = sessionStorage.getItem('authData');

      if (sessionStorageData) {
        try {
          const parsedData = JSON.parse(sessionStorageData);
          const accessToken = parsedData.access_token;
          
          setIsLoading(true);
          const response = await fetch(`${apiUrl}/v1/files/${fileName}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          if (response.ok) {
            console.log('File deleted successfully');
          } else {
            console.log('failed to delete file');
          }
        } catch (e: any) {
          console.error('Error fetching data:', e);
        } finally {
          setIsLoading(false);
          window.location.reload();
        }
      }
    }
      fetchFiles();
  }, [])

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>file {fileName} deleted successfully</p>
      )}
    </>
  )
}
