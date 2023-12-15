export interface ResultTableProps {
  results: Results;
}

export interface Results {
  [key: string]: ResultItem;
}

interface ResultItem {
  card_number: string;
  first_name: string;
  address_3: string;
  address_4: string;
  home_zip_code: string;
  concat_customer: string;
  collector: string;
  db_match: DatabaseMatch[];
}

interface DatabaseMatch {
  nama: string;
  kelurahan: string;
  kecamatan: string;
  kodepos: number;
}

export default function ResultTable({results}: ResultTableProps) {
  let globalIndex = 1
  return (
    <div>
      <table 
        aria-label="load check match table"
        className="table"
      >
      <thead>
        <tr>
          <th colSpan={7} className="text-center border">Data Agencies</th>
          <th colSpan={5} className="text-center border">Data Match</th>
        </tr>
        <tr>
          <th className="border">No</th>
          <th className="border">Card Number</th>
          <th className="border">First Name</th>
          <th className="border">Collector</th>
          <th className="border">Address 3</th>
          <th className="border">Address 4</th>
          <th className="border">Zip Code</th>
          <th className="border">Kodepos</th>
          <th className="border">Nama</th>
          <th className="border">Kelurahan</th>
          <th className="border">Kecamatan</th>
          <th className="border">Lokasi</th>
        </tr>
      </thead>
      <tbody>
    {Object.entries(results).map(([tableName, tableData]) => (
        tableData.db_match.map((match, index) => (
          <tr key={index+1}>
            <td>{globalIndex++}</td>
            <td>{tableData.card_number}</td>
            <td>{tableData.first_name}</td>
            <td>{tableData.collector}</td>
            <td>{tableData.address_3}</td>
            <td>{tableData.address_4}</td>
            <td>{tableData.home_zip_code}</td>
            <td>{match.kodepos}</td>
            <td>{match.nama}</td>
            <td>{match.kelurahan}</td>
            <td>{match.kecamatan}</td>
            <td>{tableName}</td>
          </tr>
        ))
    ))}
      </tbody>
      </table>
    </div>
  )
}
