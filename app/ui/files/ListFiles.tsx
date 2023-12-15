import { appInfo } from "@/app/config/appInfo"
import { useEffect, useState } from "react";
import { FileList } from "@/app/lib/dpt/definitions";
import PopUpTablePreview from "../popup/PopUpTablePreview";
import { FaDeleteLeft, FaListCheck, FaRegEye, FaRegEyeSlash }from "react-icons/fa6";
import TablePreview from "../tables/tablePreview";
import TableMatch from "../tables/tableMatch";
import DeleteFile from "./DeleteFile";

export default function ListFiles() {
  const apiUrl = appInfo.apiDomain

  const folderCek = "folder-user"

  const nameAgencies = "pass"
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [selectedPreviewFile, setSelectedPreviewFile] = useState<string|null>(null);
  const [selectedMatchFile, setSelectedMatchFile] = useState<string|null>(null);
  const [selectedDeleteFile, setSelectedDeleteFile] = useState<string>('');
  
  const [clickedPreviewButtons, setClickedPreviewButtons] = useState<Record<string, boolean>>({});
  const [clickedMatchButtons, setClickedMatchButtons] = useState<Record<string, boolean>>({});
  const [clickedDeleteButtons, setClickedDeleteButtons] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }
    fetchFiles();
  }, [])


  if (error) {
    return <p>{error}</p>
  }

  const handlePreviewClick = (file:string) => {
    if (selectedPreviewFile === file) {
      setSelectedPreviewFile(null);
    } else {
      setSelectedPreviewFile(file);
    }
    setSelectedMatchFile(null);

    setClickedPreviewButtons({[file]: !clickedPreviewButtons[file]});
    setClickedMatchButtons({});
  }
  
  const handleMatchClick = (file:string) => {
    if (selectedMatchFile === file) {
      setSelectedMatchFile(null);
    } else {
      setSelectedMatchFile(file);
    }
    setSelectedPreviewFile(null);
    setClickedMatchButtons({[file]: !clickedMatchButtons[file]});
    setClickedPreviewButtons({})
  }
  
  const handleDeleteClick = (file:string) => {
      setSelectedDeleteFile(file);
  }

  const isButtonPreviewClicked = (file:string) => clickedPreviewButtons[file];

  const isButtonMatchClicked = (file:string) => clickedMatchButtons[file];

  return (
    <>
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      <div className="overflow-auto m-4">
      {selectedDeleteFile && <DeleteFile fileName={selectedDeleteFile}/>}
        <table className="table table-xs">
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
                <button className="btn mr-1 btn-info text-white" onClick={() => handlePreviewClick(file)}><FaRegEye className="text-base" /></button>
                <button className="btn mr-1 btn-accent text-white" onClick={() => handleMatchClick(file)}><FaListCheck className="text-base" /></button>
                <button className="btn mr-1 btn-error text-white" onClick={() => handleDeleteClick(file)}><FaDeleteLeft className="text-base"/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPreviewFile && <TablePreview fileName={selectedPreviewFile} />}
      {selectedMatchFile && <TableMatch fileName={selectedMatchFile} />}
    </div>
      )}
    </>
  )
  ;
}
