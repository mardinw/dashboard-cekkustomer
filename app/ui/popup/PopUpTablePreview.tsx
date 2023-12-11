import { appInfo } from "@/app/config/appInfo";
import { DataCustomer } from "@/app/lib/dpt/definitions";
import { document } from "postcss";
import { useEffect, useRef, useState } from "react";

export default function PopUpTablePreview() {

	const  modalRef = useRef<HTMLDialogElement>(null);
	const apiUrl = appInfo.apiDomain
	const fileName = 'sample_cekkustomer.xlsx'
	const [file, setFile] = useState<File>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [fetchData, setFetchData] = useState<DataCustomer[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
	const fetchData = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(`${apiUrl}/v1/files/read/${fileName}`)
			const result: DataCustomer[] = await response.json();
			
			if (!response.ok) {
				if (response.status === 400 ) {
					setError("Bad request: format table anda kurang tepat.");
				} else {
						setError(`Server error: ${response.statusText}`);
				}
			}
			setFetchData(result);
			setIsLoading(false);

		} catch (e:any) {
			console.error('Error fetching data:', e)
		}
	};

	fetchData();
	}, [])

	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.close();
		}
	};


	useEffect(() => {
		if (fetchData && modalRef.current) {
			modalRef.current.showModal();
		}
	}, [fetchData]);

	return (
		<dialog ref={modalRef} className="modal">
			<div className="modal-box w-11/12 max-w-5xl">
				{fetchData && (
					<>
    <table 
      aria-label="load check match table"
      className="table"
    >
      <thead>
        <tr>
          <th colSpan={7} className="text-center border">Data Customer Preview</th>
        </tr>
        <tr>
          <th className="border">No</th>
          <th className="border">Card Number</th>
          <th className="border">First Name</th>
          <th className="border">Address 3</th>
          <th className="border">Address 4</th>
          <th className="border">Zip Code</th>
          <th className="border">Collector</th>
        </tr>
      </thead>
      <tbody>
        {fetchData.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.card_number}</td>
          <td>{item.first_name}</td>
          <td>{item.address_3}</td>
          <td>{item.address_4}</td>
          <td>{item.home_zip_code}</td>
          <td>{item.collector}</td>
        </tr>
      ))}
      </tbody>
    </table>
				<div className="modal-action">
					<form method="dialog">
						{/* if there is a button, it will close the modal */}
						<button className="btn" onClick={closeModal}>Close</button>
					</form>
				</div>
					</>
				)}
			</div>
		</dialog>
  )
};
