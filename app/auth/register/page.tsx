'use client'
import { appInfo } from "@/app/config/appInfo";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useMemo, useState } from "react";

export default function Register() {

	const apiUrl = appInfo.apiDomain
	const [email, setEmail] = useState<string>("");

	const validateEmail = (email: any) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
	const isInvalid = useMemo(() => {
		if (email === "") return false;

		return validateEmail(email) ? false : true;
	}, [email]);

	const [password, setPassword] = useState<string>("");
	const [cPassword, setCPassword] = useState<string>("");
	const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

	const isCPasswordDirty = useMemo(() => {
		if (password === cPassword) {
			setShowErrorMessage(false);
		} else {
			setShowErrorMessage(true);
		}
	}, [cPassword])

	const [ isMutating, setIsMutating ] = useState(false);
	const [ isVisible, setIsVisible ] = useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);
	const router = useRouter();

	async function handleRegister(event: SyntheticEvent) {
		event.preventDefault();

		setIsMutating(true);
		try {
			const res = await fetch(`${apiUrl}/v1/auth/register`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				})
			});
			const result = await res.json();

			if (!res.ok) {
				throw new Error(`Error! status: ${res.status}`)
			}
			localStorage.setItem('email', email);
			router.push('/auth/confirm')
		} catch(err) {
			console.error('register failed:', err);
		} finally {
			setEmail("");
			setPassword("");
			setIsMutating(false);
		}
	}

  return (
    <main>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="card shrink-0 w-full shadow-2xl bg-base-100">
						<form className="card-body" onSubmit={handleRegister}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input 
								value={email} 
								type="email" 
								placeholder="email" 
								className="input input-bordered" 
								onChange={(e) => setEmail(e.target.value)}
								required />
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input 
								value={password}
								type="password" 
								placeholder="password" 
								className="input input-bordered" 
								onChange={(e) => setPassword(e.target.value)}
								required 
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Konfirmasi Password</span>
								</label>
								<input 
									value={cPassword}
								type="password" 
								placeholder="password" 
								className="input input-bordered" 
								onChange={(e) => setCPassword(e.target.value)}
								required 
								/>
							</div>
							<div className="form-control mt-6">
								{isMutating ? (
								<button disabled={isMutating} type="submit" className="btn btn-primary text-white">LOADING...</button>
								) : (
								<button disabled={isMutating} type="submit" className="btn btn-primary text-white">REGISTER</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
    </main>
  )
}
