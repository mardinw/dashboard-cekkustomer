'use client'
import { appInfo } from "@/app/config/appInfo";
import { clearAccessToken } from "@/app/utils/auth";
import { useRouter } from "next/navigation";
import {IoMdContact} from 'react-icons/io';
export default function NavBar() {
  const router = useRouter();
  const apiUrl = appInfo.apiDomain;
  const handleLogout = async() => {
      const sessionStorageData = sessionStorage.getItem('authData');
      if (!sessionStorageData) {
        console.error('Data sesi tidak ditemukan');
        return;
      }
      const parsedData = JSON.parse(sessionStorageData);
      const accessToken = parsedData.access_token;
      
        try {
          const response = await fetch(`${apiUrl}/v1/auth/logout`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          if (response.ok) {
            console.log('Logout berhasil');
          } else {
            console.error('Gagal melakukan logout');
          }
        } catch (e) {
          console.error('Error:', e);
        }


    clearAccessToken();
    router.push('/auth/login');
  }
  return (
    <>
			<div className="navbar bg-primary text-white">
				<div className="flex-1">
					<a className="btn btn-ghost text-xl">CEK DATA</a>
				</div>
				<div className="flex-none">
					<div className="dropdown dropdown-end">
						<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <IoMdContact className="w-full" size={34}/>
						</div>
						<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
							<li>
								<button className="justify-between text-black">
									Profile
								</button>
							</li>
							<li><button className="text-black">Settings</button></li>
							<li>
                  <button className="text-black" onClick={handleLogout}>Logout</button>
              </li>
						</ul>
					</div>
				</div>
			</div>
    </>
  )
}
