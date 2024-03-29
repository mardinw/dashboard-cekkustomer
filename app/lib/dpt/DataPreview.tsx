import { useMemo, useState } from "react";
import { DataCustomer } from "./definitions";

interface DataTableProps {
  data: DataCustomer[];
}

export default function PreviewTable({data}: DataTableProps) {

  const [ page, setPage ] = useState(1);
  const rowsPerPage = 10;
  
  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="overflow-x-auto hidden md:block">
      <table 
        aria-label="load check preview table"
        className="table-auto"
      >
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th colSpan={8} className="text-center border p-3 text-sm font-semibold tracking-wide">Data Customer Preview</th>
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
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="odd:bg-white even:bg-slate-50">
              <td className="p-3 text-sm text-gray-700">{index + 1 + (page -1) * rowsPerPage}</td>
              <td className="p-3 text-sm text-gray-700">{item.card_number}</td>
              <td className="p-3 text-sm text-gray-700">{item.nik}</td>
              <td className="p-3 text-sm text-gray-700">{item.first_name}</td>
              <td className="p-3 text-sm text-gray-700">{item.collector}</td>
              <td className="p-3 text-sm text-gray-700">{item.address_3}</td>
              <td className="p-3 text-sm text-gray-700">{item.address_4}</td>
              <td className="p-3 text-sm text-gray-700">{item.home_zip_code}</td>
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
