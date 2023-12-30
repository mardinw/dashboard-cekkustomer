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
      <div className="join mb-4">
        <button 
          className="join-item btn btn-square"
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
        >{"<<"}
        </button>
        <button 
        className="join-item btn btn-square text-black"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        >
          { page === 1 ? `${page}`:`${page - 1}`}
        </button>
        <button
          className="join-item btn btn-square disabled btn-primary text-white" disabled={page === pages}>
          { page === 1 ? '...':`${page}`}
        </button>
        <button 
        className="join-item btn btn-square text-black"
        onClick={() => handlePageChange(page + 1)}
          disabled={ page === pages }
        >
          { page === pages ? `${page}`:`${page + 1}`}
        </button>
        <button
          onClick={() => handlePageChange(pages)}
          disabled={ page === pages }
          className="join-item btn btn-square"
        >{`>>`}</button>
      </div>
      <table 
        aria-label="load check match table"
        className="table table-xs"
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
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1 + (page -1) * rowsPerPage}</td>
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
    </div>
  )
}
