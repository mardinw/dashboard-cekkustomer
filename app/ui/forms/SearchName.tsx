import { appInfo } from "@/app/config/appInfo";
import { useState } from "react";
import {MdClear} from 'react-icons/md';
import {FaMagnifyingGlass} from 'react-icons/fa6';

export default function SearchName() {
  const apiUrl = appInfo.apiDomain

  //const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="mb-1">
      <input type="text" placeholder="pencarian nama" className="input input-bordered w-full max-w-xs" />
        <button className="text-white btn btn-info mr-1"><FaMagnifyingGlass /></button>
        <button className="btn btn-error text-white"><MdClear /></button>
    </div>
  )
}
