"use client"
import { appInfo } from "@/app/config/appInfo";
import ResultTable from "@/app/lib/dpt/DataMatch";
import { DPTItem, locationProps } from "@/app/lib/dpt/definitions";
import { Result } from "postcss";
import { KeyboardEvent, useEffect, useState } from "react"
import TableExport from "./tableExport";
import {MdClear} from 'react-icons/md';
import {FaMagnifyingGlass} from 'react-icons/fa6';


export default function TableMatch({fileName}: {fileName:string}) {
  const apiUrl = appInfo.apiDomain

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<locationProps |null>(null);
  const [searchName, setSearchName] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("concat");
  const [exportType, setExportType] = useState<string>("");
  
  const fetchMatch = async (nama : string = "") => {
    const sessionStorageData = sessionStorage.getItem('authData');

    if (!sessionStorageData) {
      console.error('Data sesi tidak ditemukan');
      return;
    }
    const parsedData = JSON.parse(sessionStorageData);
    const accessToken = parsedData.access_token;

    try {
      setIsLoading(true);

      // pencarian berdasarkan endpoint
      const endpoint = searchType === 'nik' ? 'nik' : 'concat';
      const response = await fetch(`${apiUrl}/v1/check/match/${endpoint}/${fileName}?nama=${nama}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
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

  const fetchData = async () => {
    fetchMatch(searchName);
  };

  useEffect(() => {
  fetchData();
  }, [searchType, fileName]);
  
  const handleClearSearch = () => {
    setSearchName("");
    fetchMatch("");
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  }


  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
      data && (
        <>
          <TableExport fileName={fileName} exportType={exportType}/>
        <div className="flex justify-between m-2">
          <div className="grow">
          <input type="text" 
            placeholder="Pencarian Nama" 
            className="input input-primary input-bordered w-full max-w-xs" 
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={() => fetchData()} className="text-black btn mr-1"><FaMagnifyingGlass /></button>
          <button onClick={handleClearSearch} className="btn btn-error text-white mr-1"><MdClear /></button>
          </div>
          <select 
            className="select select-primary w-full max-w-xs"
            value={searchType}
            onChange={(e) => {
            setSearchType(e.target.value);
            setExportType(e.target.value);
            }}
          >
            <option disabled value="">Silahkan pilih opsi</option>
            <option value="concat">Match Nama & Tanggal Lahir</option>
            <option value="nik">Match Nama & NIK</option>
          </select>
        </div>
        <ResultTable locationData={data} />
        </>
      )
      )}
    </>
  )
}
