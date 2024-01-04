export interface ResultTableProps {
  locationData: locationProps
}

export interface locationProps {
  location: ItemProps[]
}

interface ItemProps {
  card_number: string;
  nik: string;
  first_name: string;
  address_3: string;
  address_4: string;
  home_zip_code: string;
  concat_customer: string;
  collector: string;
  nama: string;
  kelurahan: string;
  kecamatan: string;
  kodepos: number;
}

export default function ResultTable({locationData}: ResultTableProps) {
  let globalIndex = 1

  return (
    <div>
      <table 
        aria-label="load check match table"
        className="table"
      >
      <thead>
        <tr>
          <th colSpan={8} className="text-center border">Data Agencies</th>
          <th colSpan={5} className="text-center border">Data Match</th>
        </tr>
        <tr>
          <th className="border">No</th>
          <th className="border">Card Number</th>
          <th className="border">NIK</th>
          <th className="border">First Name</th>
          <th className="border">Collector</th>
          <th className="border">Address 3</th>
          <th className="border">Address 4</th>
          <th className="border">Zip Code</th>
          <th className="border">Kodepos</th>
          <th className="border">Kelurahan</th>
          <th className="border">Kecamatan</th>
          <th className="border">Nama</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(locationData).map((locationArray: ItemProps[], index) => (
          locationArray.map((item, itemIndex) => (
          <tr key={`${index}-${itemIndex}`}>
            <td>{globalIndex++}</td>
            <td>{item.card_number}</td>
            <td>{item.nik}</td>
            <td>{item.first_name}</td>
            <td>{item.collector}</td>
            <td>{item.address_3}</td>
            <td>{item.address_4}</td>
            <td>{item.home_zip_code}</td>
            <td>{item.kodepos}</td>
            <td>{item.kelurahan}</td>
            <td>{item.kecamatan}</td>
            <td>{item.nama}</td>
          </tr>
          ))
        ))}
      </tbody>
      </table>
    </div>
  )
}
