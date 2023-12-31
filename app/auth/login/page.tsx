"use client"
import { appInfo } from "@/app/config/appInfo";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useMemo, useState } from "react"
import Link from 'next/link';
import { setAccessToken } from "@/app/utils/auth";
import {FaEye, FaEyeSlash} from 'react-icons/fa';

export default function Login() {
	const apiUrl = appInfo.apiDomain

	const [email, setEmail] = useState<string>("");
	const validateEmail = (email: any) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
	const isInvalid = useMemo(() => {
		if (email === "") return false;

		return validateEmail(email) ? false : true;
	}, [email]);
	
	const [password, setPassword] = useState<string>("");
	const [ isMutating, setIsMutating ] = useState(false);
	const [ isVisible, setIsVisible ] = useState(false);
	const [errorMessage, setError] = useState<string>("");

	const toggleVisibility = () => setIsVisible(!isVisible);

	const router = useRouter();

	async function handleLogin(event: SyntheticEvent) {
		event.preventDefault();

		setIsMutating(true);
		try {
			const res = await fetch(`${apiUrl}/v1/auth/login`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});

			if (!res.ok) {
				if (res.status === 404) {
					setError("Password dan Email tidak cocok");
					setIsMutating(false);
					return
				}
			}
			const data = await res.json();

			setAccessToken(data.access_token);
			localStorage.removeItem("email");
			router.push('/dashboard');
		} catch (err) {
			console.error('Login failed:', err);
			setError('Login failed. Please check your credentials');
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
						<form className="card-body" onSubmit={handleLogin}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input 
									value={email}
									type="email" placeholder="email" className="input input-bordered w-full max-w-xs" 
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
											type={isVisible ? 'text': 'password'} 
											placeholder="password" 
											className="join-item input input-bordered w-full" 
											onChange={(e) => setPassword(e.target.value)}
										required />
										<button 
										type="button"
										className="join-item btn btn-square btn-success text-white"
										onClick={toggleVisibility}
										>
											{isVisible ? <FaEyeSlash size={16}/> : <FaEye size={16} />}
										</button>
								</div>
								<label className="label">
									<Link href="/auth/forgot" className="label-text-alt link link-hover">Lupa password?</Link>
								</label>
							</div>
							<div className="form-control mt-4">
								{isMutating ? (
								<button type="submit" disabled={isMutating} className="btn btn-primary text-white">LOADING...</button>
								) : (
								<button type="submit" disabled={isMutating} className="btn btn-primary text-white">LOGIN</button>
								)}
								<Link href="/auth/register" className="mt-2 label-text-alt link link-hover">Belum punya akun?</Link>
							</div>
							{errorMessage && <p className="text-error">{errorMessage}</p>}
						</form>
					</div>
				</div>
			</div>
    </main>
  )
	}
