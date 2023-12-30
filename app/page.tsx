'use client'
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
      } else {
        router.push('/dashboard')
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
     isAuthorize();
  }, [])

  
  return null;
}
