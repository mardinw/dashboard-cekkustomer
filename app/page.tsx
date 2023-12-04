"use client"
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useEffect, useState } from "react"

interface AddressDetails {
  String: string;
  Valid: boolean;
}

interface DPTItem {
  card_number: number;
  collector: string;
  nama: string;
  address_3: AddressDetails;
  address_4: AddressDetails;
  zip_code: number;
  kodepos: number;
  kelurahan: string;
  kecamatan: string;
}

export default function Home() {
  const [dataDPT, setDataDPT] = useState<DPTItem[]|null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect( () => {
    const getData = async () => {
      try {
        const response = await fetch('http://52.221.195.16:4001/v1/check/match');

        if (response.ok) {
          const result = await response.json();

          const allDataArrays = Object.values(result.results);
          const mergedData = allDataArrays.flatMap((dataArray) => Array.isArray(dataArray) ? dataArray: []);

          const dataWithKeys = mergedData.map((item, index) => ({ ...item, customKey: `key_${index}` }));

          setDataDPT(dataWithKeys as DPTItem[])
          // allDataArrays.forEach((dataArray, index) => {
          //   if (Array.isArray(dataArray)) {
          //     setDataDPT(dataArray as DPTItem[]);
          //   } else {
          //     console.error(`Data received for collection ${index} is not an array:`, dataArray)
          //   }
          // })
        } else {
          console.error('Failed to fetch data');
        }

      } catch (error:any) {
        setError(error.message || 'Terjadi kesalahan');
      }
    };

    getData();
  }, []);

  if (!dataDPT) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Table>
      <TableHeader>
          <TableColumn>No</TableColumn>
          <TableColumn>Card Number</TableColumn>
          <TableColumn>Collector</TableColumn>
          <TableColumn>Full Name</TableColumn>
          <TableColumn>Address 3</TableColumn>
          <TableColumn>Address 4</TableColumn>
          <TableColumn>Zip Code</TableColumn>
          <TableColumn>Kodepos</TableColumn>
          <TableColumn>Kelurahan</TableColumn>
          <TableColumn>Kecamatan</TableColumn>
      </TableHeader>
      <TableBody>
      {dataDPT.map((item, index) => (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{item.card_number}</TableCell>
          <TableCell>{item.collector}</TableCell>
          <TableCell>{item.nama}</TableCell>
          <TableCell>{item.address_3.String}</TableCell>
          <TableCell>{item.address_4.String}</TableCell>
          <TableCell>{item.zip_code}</TableCell>
          <TableCell>{item.kodepos}</TableCell>
          <TableCell>{item.kelurahan}</TableCell>
          <TableCell>{item.kecamatan}</TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>
    </>
  )
}
