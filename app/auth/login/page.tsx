"use client"
import { appInfo } from "@/app/config/appInfo";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useMemo, useState } from "react"
import Link from 'next/link';

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
	const [isError, setError] = useState<string>("");

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
				throw new Error('Invalid credentials');
			}
			const data = await res.json();
			console.log('Login successfully', data);
			router.push('/');
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
									type="email" placeholder="email" className="input input-bordered" 
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
								required />
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
						</form>
					</div>
				</div>
			</div>
    </main>
  )
	}
