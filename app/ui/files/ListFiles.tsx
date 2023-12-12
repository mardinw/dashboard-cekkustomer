import { appInfo } from "@/app/config/appInfo"
import { useEffect, useState } from "react";
import { FileList } from "@/app/lib/dpt/definitions";
import PopUpTablePreview from "../popup/PopUpTablePreview";
import { FaDeleteLeft, FaListCheck, FaRegEye, FaRegEyeSlash }from "react-icons/fa6";
import TablePreview from "../tables/tablePreview";

export default function ListFiles() {
  const apiUrl = appInfo.apiDomain

  const folderCek = "folder-user"

  const nameAgencies = "pass"
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string|null>(null);
  const [clickedButtons, setClickedButtons] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${apiUrl}/v1/files/list/${folderCek}`)
        const result = await response.json();

        if (!response.ok) {
          if (response.status === 400) {
            setError("belum ada files");
          } else {
            setError(`Server error: ${response.statusText}`);
          }
        }
        
        if (Array.isArray(result.files)) {
          setFiles(result.files);
        } else {
          setError(`Invalid data format ${response.statusText}`);
        }
      } catch (e: any) {
        console.error('Error fetching data:', e);
      }
    }
    fetchFiles();
  }, [])


  if (error) {
    return <p>{error}</p>
  }

  const handleButtonClick = (file:string) => {
    if (selectedFile === file) {
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
    }

    setClickedButtons((prevClickedButtons) => ({
      ...prevClickedButtons,
      [file]: !prevClickedButtons[file],
    }));
  }

  const isButtonClicked = (file:string) => clickedButtons[file];

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Agencies</th>
            <th>Nama File</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{nameAgencies}</td>
              <td>{file}</td>
              <td>
                <button className={`btn mr-1 ${isButtonClicked(file) ? "btn-error" : "btn-primary"} text-white`} onClick={() => handleButtonClick(file)}>{isButtonClicked(file) ? <FaRegEye className="text-base" /> : <FaRegEyeSlash className="text-base" />}</button>
                <button className="btn mr-1 btn-accent text-white"><FaListCheck className="text-base" /></button>
                <button className="btn mr-1 btn-error text-white"><FaDeleteLeft className="text-base"/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedFile && <TablePreview fileName={selectedFile} />}
    </div>
  )
}
