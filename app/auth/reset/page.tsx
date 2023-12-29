"use client"
import { appInfo } from "@/app/config/appInfo";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { clearInterval, setInterval } from "timers";
import Link from 'next/link';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

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
	const [ isVisibleOne, setIsVisibleOne ] = useState(false);
	const [ isVisibleTwo, setIsVisibleTwo ] = useState(false);

	const toggleVisibilityOne = () => setIsVisibleOne(!isVisibleOne);
	const toggleVisibilityTwo = () => setIsVisibleTwo(!isVisibleTwo);

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
	}, [timerExpired])

	const formatTime = (timeInSeconds: number): string => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	}

	useEffect(() => {
		const storedEmail = localStorage.getItem('email');
		setEmail(storedEmail);
		if(storedEmail) {
			console.log("email telah ada");
		} else {
			router.push('/auth/login');
		}
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
	
	async function handleResendCode(event: SyntheticEvent) {
		event.preventDefault();

		try {
			const res = await fetch(`${apiUrl}/v1/auth/resend`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email:email,
				})
			});
			const result = await res.json();

			if (!res.ok) {
				throw new Error(`Error! status: ${res.status}`)
			}
			setSeconds(180);
		} catch (err) {
			console.error(err);
		} finally {
			setEmail("");
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
									<span className="label-text mr-2">{formatTime(seconds)}</span>
								<Link href="#" className="label-text-alt link link-hover" onClick={handleResendCode}>Kirim Ulang Code</Link>
								</label>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password Baru</span>
								</label>
								<div className="input-group join">
									<input 
									value={password}
										type={isVisibleOne ? 'text': 'password'} 
									placeholder="password" 
									className="join-item input input-bordered w-full" 
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
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Konfirmasi Password Baru</span>
								</label>
								<div className="input-group join">
									<input 
										value={cPassword}
										type={isVisibleTwo ? 'text': 'password'} 
									placeholder="password" 
									className="join-item input input-bordered w-full" 
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
