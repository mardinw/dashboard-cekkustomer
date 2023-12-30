'use client'

import { KeyboardEvent, useEffect, useState } from "react";
import {DataCustomer} from "@/app/lib/dpt/definitions";
import { appInfo } from "@/app/config/appInfo";
import {MdClear} from 'react-icons/md';
import {FaMagnifyingGlass} from 'react-icons/fa6';
import PreviewTable from "@/app/lib/dpt/DataPreview";

export default function TablePreview({fileName} : {fileName: string|undefined}) {
  const apiUrl = appInfo.apiDomain 

  const [data, setData] = useState<DataCustomer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string |null>(null);

  const [ searchName, setSearchName ] = useState<string>("");

  const fetchData = async (nama : string = "") => {
    const sessionStorageData = sessionStorage.getItem('authData');

    if (!sessionStorageData) {
      console.error('Data sesi tidak ditemukan');
      return;
    }

    const parsedData = JSON.parse(sessionStorageData);
    const accessToken = parsedData.access_token;

    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/v1/files/read/${fileName}?first_name=${nama}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        if (response.status === 400) {
          setError("Bad request: format tabel anda kurang tepat.");
        } else if (response.status === 404) {
          setError("Data tidak ada")
        } else {
          setError(`Server error: ${response.statusText}`);
        }
      }
      
      const result: DataCustomer[] = await response.json();
      setData(result);
    } catch (e: any) {
      console.error('Error fetching data:', e)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData(searchName);
  }, [fileName]);

  const handleClearSearch = () => {
    setSearchName("");
    fetchData("");
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchData(searchName);
    }
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
      data && (
        <>
          <div className="m-2">
            <input 
              type="text"
              placeholder="pencarian nama"
              className="input input-bordered w-full max-w-xs"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={() => fetchData(searchName)} className="text-black btn mr-1"><FaMagnifyingGlass /></button>
          <button onClick={handleClearSearch} className="btn btn-error text-white"><MdClear /></button>
          </div>
          <PreviewTable data={data} />
        </>
      ))}
    </>
  )
}
