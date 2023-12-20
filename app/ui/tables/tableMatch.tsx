"use client"
import { appInfo } from "@/app/config/appInfo";
import ResultTable, { ResultTableProps, locationProps } from "@/app/lib/dpt/DatabaseMatch";
import { DPTItem } from "@/app/lib/dpt/definitions";
import { Result } from "postcss";
import { KeyboardEvent, useEffect, useState } from "react"
import TableExport from "./tableExport";
import SearchName from "../forms/SearchName";
import {MdClear} from 'react-icons/md';
import {FaMagnifyingGlass} from 'react-icons/fa6';


export default function TableMatch({fileName}: {fileName:string}) {
  const apiUrl = appInfo.apiDomain

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<locationProps |null>(null);

  const [searchName, setSearchName] = useState<string>("");

  const fetchData = async (nama : string = "") => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/v1/check/look/${fileName}?nama=${nama}`)
  
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

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
      data && (
        <>
        <div className="m-2">
          <input type="text" 
            placeholder="Pencarian Nama" 
            className="input input-bordered w-full max-w-xs" 
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={() => fetchData(searchName)} className="text-black btn mr-1"><FaMagnifyingGlass /></button>
          <button onClick={handleClearSearch} className="btn btn-error text-white"><MdClear /></button>
        </div>
        <ResultTable locationData={data} />
        </>
      )
      )}
    </>
  )
}
