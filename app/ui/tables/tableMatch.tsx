"use client"
import { appInfo } from "@/app/config/appInfo";
import { DPTItem } from "@/app/lib/dpt/definitions";
import { AsyncListLoadOptions, useAsyncList } from "@react-stately/data";
import { useEffect, useState } from "react"


export default function TableMatch() {
  const apiUrl = appInfo.apiDomain

  const [dataDPT, setDataDPT] = useState<DPTItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  let list = useAsyncList<DPTItem[]>({
    async load({signal}){
      let res = await fetch(`${apiUrl}/v1/check/match`, {signal});

      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`)
      }

      let json = await res.json();

      let allDataArrays = Object.values(json.results);
      let mergedData = allDataArrays.flatMap((dataArray) => Array.isArray(dataArray) ? dataArray: []);

      let dataWithKeys = mergedData.map((item, index) => ({
        ...item, customKey: `key_${index}`
      }));

      setDataDPT(dataWithKeys as DPTItem[])
      setIsLoading(false);

      return {
        items: dataWithKeys,
      };
    },

  });

  return (
    <>
    <table 
      aria-label="load check match table"
      className="table"
    >
      <thead>
        <tr>
          <th colSpan={7} className="text-center border">Data BNI</th>
          <th colSpan={3} className="text-center border">Data Match</th>
        </tr>
        <tr>
          <th className="border">No</th>
          <th className="border">Card Number</th>
          <th className="border">First Name</th>
          <th className="border">Address 3</th>
          <th className="border">Address 4</th>
          <th className="border">Collector</th>
          <th className="border">Zip Code</th>
          <th className="border">Kodepos</th>
          <th className="border">Kelurahan</th>
          <th className="border">Kecamatan</th>
        </tr>
      </thead>
      <tbody>
      {dataDPT.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.card_number}</td>
          <td>{item.first_name}</td>
          <td>{item.address_3.String}</td>
          <td>{item.address_4.String}</td>
          <td>{item.collector}</td>
          <td className="border-r">{item.zip_code}</td>
          <td>{item.kodepos}</td>
          <td>{item.kelurahan}</td>
          <td>{item.kecamatan}</td>
        </tr>
      ))}
      </tbody>
    </table>
    </>
  )
}
