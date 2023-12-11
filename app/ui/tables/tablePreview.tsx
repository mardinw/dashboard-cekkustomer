'use client'

import { useEffect, useState } from "react";
import {DataCustomer} from "@/app/lib/dpt/definitions";
import { appInfo } from "@/app/config/appInfo";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function TablePreview({fileName} : {fileName: string}) {
  const apiUrl = appInfo.apiDomain 

  const [fetchData, setFetchData] = useState<DataCustomer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string |null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/v1/files/read/${fileName}`)
        const result: DataCustomer[] = await response.json();

        if (!response.ok) {
          if (response.status === 400) {
            setError("Bad request: format tabel anda kurang tepat.");
          } else {
            setError(`Server error: ${response.statusText}`);
          }
        }
        setFetchData(result);
        setIsLoading(false);
      } catch (e: any) {
        console.error('Error fetching data:', e)
      }
    }

    fetchData();
  }, [])

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <>
    <table 
      aria-label="load check match table"
      className="table"
    >
      <thead>
        <tr>
          <th colSpan={7} className="text-center border">Data Customer</th>
        </tr>
        <tr>
          <th className="border">No</th>
          <th className="border">Card Number</th>
          <th className="border">First Name</th>
          <th className="border">Address 3</th>
          <th className="border">Address 4</th>
          <th className="border">Zip Code</th>
          <th className="border">Collector</th>
        </tr>
      </thead>
      <tbody>
        {fetchData.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.card_number}</td>
          <td>{item.first_name}</td>
          <td>{item.address_3}</td>
          <td>{item.address_4}</td>
          <td>{item.home_zip_code}</td>
          <td>{item.collector}</td>
        </tr>
      ))}
      </tbody>
    </table>
    </>
  )
}