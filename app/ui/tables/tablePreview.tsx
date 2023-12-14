'use client'

import { useEffect, useState } from "react";
import {DataCustomer} from "@/app/lib/dpt/definitions";
import { appInfo } from "@/app/config/appInfo";


export default function TablePreview({fileName} : {fileName: string|undefined}) {
  const apiUrl = appInfo.apiDomain 

  const [fetchData, setFetchData] = useState<DataCustomer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string |null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
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
      } catch (e: any) {
        console.error('Error fetching data:', e)
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [fileName])

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <>
      {isLoading ? (
        <progress className="progress w-56"></progress>
      ) : (
      <table 
        aria-label="load check match table"
        className="table"
      >
        <thead>
          <tr>
            <th colSpan={7} className="text-center border">Data Customer Preview</th>
          </tr>
          <tr>
            <th className="border">No</th>
            <th className="border">Card Number</th>
            <th className="border">First Name</th>
            <th className="border">Collector</th>
            <th className="border">Address 3</th>
            <th className="border">Address 4</th>
            <th className="border">Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {fetchData.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.card_number}</td>
            <td>{item.first_name}</td>
            <td>{item.collector}</td>
            <td>{item.address_3}</td>
            <td>{item.address_4}</td>
            <td>{item.home_zip_code}</td>
          </tr>
        ))}
        </tbody>
      </table>
      )}
    </>
  )
}
