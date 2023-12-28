'use client'
import FormUploadExcel from "./ui/forms/UploadExcel";
// import { DataCustomer } from "./lib/dpt/definitions";
import ListFiles from "./ui/files/ListFiles";
import { useEffect } from "react";
import { clearAccessToken, getAccessToken } from "./utils/auth";
import { useRouter } from "next/navigation";
import { appInfo } from "./config/appInfo";


export default function Home() {
  const router = useRouter();

  const apiUrl = appInfo.apiDomain;

  const isAuthorize = async () => {
      const sessionStorageData = sessionStorage.getItem('authData');
      if (!sessionStorageData) {
        router.push('/auth/login');
        return
      }
      const parsedData = JSON.parse(sessionStorageData);
      const accessToken = parsedData.access_token;
    try {
      const res = await fetch(`${apiUrl}/v1/auth/check`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (res.status === 401) {
        clearAccessToken();
        router.push('/auth/login');
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
     isAuthorize();
  }, [])

  const handleLogout = async() => {
      const sessionStorageData = sessionStorage.getItem('authData');
      if (!sessionStorageData) {
        console.error('Data sesi tidak ditemukan');
        return;
      }
      const parsedData = JSON.parse(sessionStorageData);
      const accessToken = parsedData.access_token;
      
        try {
          const response = await fetch(`${apiUrl}/v1/auth/logout`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          if (response.ok) {
            console.log('Logout berhasil');
          } else {
            console.error('Gagal melakukan logout');
          }
        } catch (e) {
          console.error('Error:', e);
        }


    clearAccessToken();
    router.push('/auth/login');
  }
  
  return (
    <main className="container md:container mx-auto">
      <div className="md:mx-auto w-full bg-white">
        <button onClick={handleLogout}>LOGOUT</button>
        <FormUploadExcel />
        <ListFiles />
      </div>
    </main>
  )
}
