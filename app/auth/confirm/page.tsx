'use client'
import { appInfo } from "@/app/config/appInfo"
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";

export default function Confirm() {

	const apiUrl = appInfo.apiDomain
	const [email, setEmail] = useState<string|null>(null);
	const [code, setCode] = useState<string>("");
	const [isMutating, setIsMutating] = useState<boolean>(false);

	const router = useRouter();

	useEffect(() => {
		const storedEmail = localStorage.getItem('email');
		setEmail(storedEmail);
	}, []);

	async function handleConfirm(event: SyntheticEvent) {
		event.preventDefault();

		setIsMutating(true);
		try {
			const res = await fetch(`${apiUrl}/v1/auth/confirm`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email:email,
					code: code,
				})
			});
			const result = await res.json();

			if (!res.ok) {
				throw new Error(`Error! status: ${res.status}`)
			}

			localStorage.removeItem("email");
			router.push('/auth/login');
		} catch (err) {
			console.error('code failed:', err);
		} finally {
			setEmail("");
			setCode("");
			setIsMutating(false);
		}
	}

  return (
    <main>
			<div className="hero min-h-screen bg-base-200">
				<h1>Halaman Konfirmasi</h1>
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="card shrink-0 w-full shadow-2xl bg-base-100">
						{email ? (
						<form className="card-body" onSubmit={handleConfirm}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Kode Konfirmasi</span>
								</label>
								<input 
									value={code}
								placeholder="kode konfirmasi" 
								className="input input-bordered"
								onChange={(e) => setCode(e.target.value)}
								required />
							</div>
							<div className="form-control mt-6">
								<button type="submit" className="btn btn-primary text-white">KONFIRMASI</button>
							</div>
						</form>

						) : (
							<p>Loading...</p>
						)}
					</div>
				</div>
			</div>
    </main>
  )
}
