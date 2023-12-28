"use client"
import { appInfo } from "@/app/config/appInfo";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { clearInterval, setInterval } from "timers";
import Link from 'next/link';

export default function ResetPassword() {
	const apiUrl = appInfo.apiDomain
	const [email, setEmail] = useState<string|null>(null);

	const [password, setPassword] = useState<string>("");
	const [cPassword, setCPassword] = useState<string>("");
	const [code, setCode] = useState<string>("");
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

	const [seconds, setSeconds] = useState(180);
	const [timerExpired, setTimerExpired] = useState<boolean>(false);

	// Use useref for minute
	const minutesRef = useRef(3);
	const secondsRef = useRef(0);
	useEffect(() => {
		const intervalId = setInterval(() => {
			setSeconds((prevSeconds) => {
				if (prevSeconds === 0) {
					clearInterval(intervalId);
					setTimerExpired(true);
					return prevSeconds;
				}
				return prevSeconds - 1;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [])

	const formatTime = (timeInSeconds: number): string => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	}

	useEffect(() => {
		const storedEmail = localStorage.getItem('email');
		setEmail(storedEmail);
	}, []);

	async function handleResetPassword(event: SyntheticEvent) {
		event.preventDefault();

		setIsMutating(true);
		try {
			const res = await fetch(`${apiUrl}/v1/auth/reset`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
					code: code,
				})
			});
			const result = await res.json();

			if (!res.ok) {
				throw new Error(`Error! status: ${res.status}`)
			}
			localStorage.removeItem("email");
			router.push('/auth/login');
		} catch(err) {
			console.error('register failed:', err);
		} finally {
			setEmail("");
			setPassword("");
			setCode("");
			setIsMutating(false);
		}
	}

  return (
    <main>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="card shrink-0 w-full shadow-2xl bg-base-100">
						<form className="card-body" onSubmit={handleResetPassword}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Kode Konfirmasi</span>
								</label>
								<input 
								value={code}
								placeholder="kode" 
								className="input input-bordered" 
								onChange={(e) => setCode(e.target.value)}
								required 
								/>
								<label className="label">
									<span className="label-text">{formatTime(seconds)}</span>
								</label>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password Baru</span>
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
									<span className="label-text">Konfirmasi Password Baru</span>
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
								<button disabled={isMutating} type="submit" className="btn btn-primary text-white">RESET PASSWORD</button>
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
