'use client'
import { appInfo } from "@/app/config/appInfo";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useMemo, useState } from "react";
import Link from 'next/link';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import RenderPasswordMessage from "@/app/lib/dpt/renderPasswordMessage";

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
		return password !== cPassword;
	}, [password, cPassword])

	const [ isMutating, setIsMutating ] = useState(false);
	const [ isVisibleOne, setIsVisibleOne ] = useState(false);
	const [ isVisibleTwo, setIsVisibleTwo ] = useState(false);
	const [ passwordError, setPasswordError ] = useState<string|null>(null);

	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

	const toggleVisibilityOne = () => setIsVisibleOne(!isVisibleOne);
	const toggleVisibilityTwo = () => setIsVisibleTwo(!isVisibleTwo);

	const router = useRouter();

	async function handleRegister(event: SyntheticEvent) {
		event.preventDefault();

		if (!password.match(passwordRegex)) {
			setPasswordError(
				"Password harus minimal 8 karakter dan termasuk angka beserta karakter spesial."
			);
				return
		}
		setPasswordError(null);

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
								<div className="input-group join">
									<input 
									value={password}
										type={isVisibleOne ? 'text': 'password'} 
									placeholder="password" 
									className="input input-bordered w-full join-item" 
									onChange={(e) => setPassword(e.target.value)}
									required 
									/>
									<button 
									type="button"
									className="join-item btn btn-square btn-success text-white"
									onClick={toggleVisibilityOne}
									>
										{isVisibleOne ? <FaEyeSlash size={16}/> : <FaEye size={16} />}
									</button>
								</div>
								{RenderPasswordMessage(passwordError)}
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Konfirmasi Password</span>
								</label>
								<div className="input-group join">
									<input 
										value={cPassword}
										type={isVisibleTwo ? 'text': 'password'} 
									placeholder="password" 
									className="input input-bordered w-full join-item" 
									onChange={(e) => setCPassword(e.target.value)}
									required 
									/>
									<button 
									type="button"
									className="join-item btn btn-square btn-success text-white"
									onClick={toggleVisibilityTwo}
									>
										{isVisibleTwo ? <FaEyeSlash size={16}/> : <FaEye size={16} />}
									</button>
								</div>
								{RenderPasswordMessage(isCPasswordDirty ? 'Password do not match.' : null)}
							</div>
							<div className="form-control mt-6">
								{isMutating ? (
								<button disabled={isMutating} type="submit" className="btn btn-primary text-white">LOADING...</button>
								) : (
								<button disabled={isMutating} type="submit" className="btn btn-primary text-white">REGISTER</button>
								)}
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
