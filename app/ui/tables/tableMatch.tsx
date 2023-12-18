"use client"
import { appInfo } from "@/app/config/appInfo";
import ResultTable, { ResultTableProps, locationProps } from "@/app/lib/dpt/DatabaseMatch";
import { DPTItem } from "@/app/lib/dpt/definitions";
import { Result } from "postcss";
import { useEffect, useState } from "react"


export default function TableMatch({fileName}: {fileName:string}) {
  const apiUrl = appInfo.apiDomain

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<locationProps |null>(null);

  useEffect(() => {
    const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/v1/check/look/${fileName}`)
  
      if(!response.ok) {
        if (response.status === 400) {
          setError("Bad request: format tabel anda kurang tepat.");
        } else {
          setError(`Server error: ${response.statusText}`);
        }
      } else {
        const apiData = await response.json()
        setData(apiData.results)
      }
    } catch (e: any) {
      console.error('Error fetching data:', e)
    } finally {
      setIsLoading(false);
    }
  };
  fetchData();

  }, [fileName]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
      data && <ResultTable locationData={data} />
      )}
    </>
  )
}
