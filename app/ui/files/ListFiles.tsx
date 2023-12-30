import { appInfo } from "@/app/config/appInfo"
import { useEffect, useState } from "react";
import { FileList } from "@/app/lib/dpt/definitions";
import { FaDeleteLeft, FaListCheck, FaRegEye, FaRegEyeSlash }from "react-icons/fa6";
import TablePreview from "../tables/tablePreview";
import TableMatch from "../tables/tableMatch";
import DeleteFile from "./DeleteFile";
import TableExport from "../tables/tableExport";
import {MdClear} from 'react-icons/md';
import {FaMagnifyingGlass} from 'react-icons/fa6';

export default function ListFiles() {
  const apiUrl = appInfo.apiDomain
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
    const sessionStorageData = sessionStorage.getItem('authData');

    if (sessionStorageData) {
      try {
        const parsedData = JSON.parse(sessionStorageData);
        const accessToken = parsedData.access_token;

        setIsLoading(true);
        const response = await fetch(`${apiUrl}/v1/files/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
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
          setError('Belum ada file yang diupload');
        }

      } catch (e: any) {
        console.error('Error fetching data:', e);
      } finally {
        setIsLoading(false);
      }
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
          {files.map((filePath, index) => {
              const parts = filePath.split('/');
              const fileName = parts[parts.length - 1];
              return ( 
                <tr key={index}>
                  <td>{nameAgencies}</td>
                  <td>{fileName}</td>
                  <td>
                    <button className="btn mr-1 btn-info text-white" onClick={() => handlePreviewClick(fileName)}><FaRegEye className="text-base" /></button>
                    <button className="btn mr-1 btn-accent text-white" onClick={() => handleMatchClick(fileName)}><FaListCheck className="text-base" /></button>
                    <button className="btn mr-1 btn-error text-white" onClick={() => handleDeleteClick(fileName)}><FaDeleteLeft className="text-base"/></button>
                  </td>
                </tr>
              );
          })}
        </tbody>
      </table>
      {selectedPreviewFile && <TablePreview fileName={selectedPreviewFile} />}
      {selectedMatchFile && ( 
        <>
        <TableExport fileName={selectedMatchFile}/>
        <TableMatch fileName={selectedMatchFile} />
        </>
        )}
    </div>
      )}
    </>
  )
  ;
}
