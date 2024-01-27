import { useMemo, useState } from "react";
import { locationProps } from "./definitions";

interface ResultTableProps {
  locationData: locationProps;
}

export default function ResultTable({locationData}: ResultTableProps) {
  let globalIndex = 1

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const totalItems = locationData ? Object.values(locationData).flat().length : 0;

  const pages = Math.ceil(totalItems / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const allItems = Object.values(locationData).flat();
    return allItems.slice(start, end);
  }, [page, locationData])
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div> 
      <div className="overflow-x-auto hidden md:block">
        <table 
          aria-label="load check match table"
          className="table-auto border-collapse border border-gray-200"
        >
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th colSpan={8} className="text-center border p-3 text-sm font-semibold tracking-wide">Data Agencies</th>
            <th colSpan={5} className="text-center border p-3 text-sm font-semibold tracking-wide">Data Match</th>
          </tr>
          <tr>
            <th className="border p-3 text-sm font-semibold tracking-wide text-left">No</th>
            <th className="border p-3 text-sm font-semibold tracking-wide text-left">Card Number</th>
            <th className="border p-3 text-sm font-semibold tracking-wide text-left">NIK</th>
            <th className="border p-3 text-sm font-semibold tracking-wide text-left">First Name</th>
            <th className="border p-3 text-sm font-semibold tracking-wide text-left">Collector</th>
            <th className="border p-3 text-sm font-semibold tracking-wide text-left">Address 3</th>
            <th className="border p-3 text-sm font-semibold tracking-wide text-left">Address 4</th>
            <th className="border p-3 text-sm font-semibold tracking-wide text-left">Zip Code</th>
            <th className="border p-3 text-sm font-semibold tracking-wide text-left">Kodepos</th>
            <th className="border p-3 text-sm font-semibold tracking-wide text-left">Kelurahan</th>
            <th className="border p-3 text-sm font-semibold tracking-wide text-left">Kecamatan</th>
            <th className="border p-3 text-sm font-semibold tracking-wide text-left">Nama</th>
            <th className="border p-3 text-sm font-semibold tracking-wide text-left">KTP</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="odd:bg-white even:bg-slate-50">
              <td className="p-3 text-sm text-gray-700">{index + 1 + (page - 1) * rowsPerPage}</td>
              <td className="p-3 text-sm text-gray-700">{item.card_number}</td>
              <td className="p-3 text-sm text-gray-700">{item.nik}</td>
              <td className="p-3 text-sm text-gray-700">{item.first_name}</td>
              <td className="p-3 text-sm text-gray-700">{item.collector}</td>
              <td className="p-3 text-sm text-gray-700">{item.address_3}</td>
              <td className="p-3 text-sm text-gray-700">{item.address_4}</td>
              <td className="p-3 text-sm text-gray-700">{item.home_zip_code}</td>
              <td className="p-3 text-sm text-gray-700">{item.kodepos}</td>
              <td className="p-3 text-sm text-gray-700">{item.kelurahan}</td>
              <td className="p-3 text-sm text-gray-700">{item.kecamatan}</td>
              <td className="p-3 text-sm text-gray-700">{item.nama}</td>
              <td className="p-3 text-sm text-gray-700">{item.ktp}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        <table
          aria-label="load check match table mobile"
          className="table-auto w-full"
        >
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="text-center border p-3 text-sm font-semibold">Data Match</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="bg-white">
                <td className="text-sm text-gray-700">
                  {item.first_name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex join m-4 justify-center">
        <button 
          className="join-item btn btn-square hover:btn-primary active:btn-primary"
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
        >{"<<"}
        </button>
        <button 
          className="join-item btn btn-square text-black hover:btn-primary active:btn-primary"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        >
          { page === 1 ? `${page}`:`${page - 1}`}
        </button>
        <button
          className="join-item btn btn-square disabled text-white" disabled>
          { page === 1 ? '...':`${page}`}
        </button>
        <button 
          className="join-item btn btn-square text-black hover:btn-primary active:btn-primary"
        onClick={() => handlePageChange(page + 1)}
          disabled={ page === pages }
        >
          { page === pages ? `${page}`:`${page + 1}`}
        </button>
        <button
          onClick={() => handlePageChange(pages)}
          disabled={ page === pages }
          className="join-item btn btn-square hover:btn-primary active:btn-primary"
        >{`>>`}</button>
      </div>
    </div>
  )
}
