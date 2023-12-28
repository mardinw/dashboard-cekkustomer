'use client'
import { appInfo } from "@/app/config/appInfo";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useMemo, useState } from "react";
import Link from 'next/link';

export default function ForgotPassword() {
	const apiUrl = appInfo.apiDomain;

	const [email, setEmail] = useState<string>(""); 
	const validateEmail = (email: any) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
	const isInvalid = useMemo(() => {
		if (email === "") return false;

		return validateEmail(email) ? false : true;
	}, [email]);
 
	const [isMutating, setIsMutating] = useState<boolean>(false);

	const router = useRouter();

	async function handleForgotPassword(event: SyntheticEvent) {
		event.preventDefault();

		setIsMutating(true);
		try {
			const res = await fetch(`${apiUrl}/v1/auth/forgot`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
				})
			});
			const result = await res.json();
			if (!res.ok) {
				throw new Error(`Error! status; ${res.status}`)
			}
			localStorage.setItem('email', email);
			router.push('/auth/reset');
		} catch (err) {
			console.error(err);
		} finally {
			setEmail("");
			setIsMutating(false);
		}
	}

	return (
    <main>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="card shrink-0 w-full shadow-2xl bg-base-100">
						<form className="card-body" onSubmit={handleForgotPassword}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Isi email yang telah didaftarkan</span>
								</label>
								<input 
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								type="email" placeholder="email" className="input input-bordered" required />
							</div>
							<div className="form-control mt-6">
								<button type="submit" className="btn btn-primary text-white">KIRIM</button>
							</div>
							<div className="form-control">
								<label className="label">
									<Link href="/auth/login" className="label-text-alt link link-hover">Kembali</Link>
								</label>
							</div>
						</form>
					</div>
				</div>
			</div>
    </main>
  )
}

