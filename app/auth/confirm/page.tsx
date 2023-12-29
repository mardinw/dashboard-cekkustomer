'use client'
import { appInfo } from "@/app/config/appInfo"
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import Link from 'next/link';

export default function Confirm() {

	const apiUrl = appInfo.apiDomain
	const [email, setEmail] = useState<string|null>(null);
	const [code, setCode] = useState<string>("");
	const [isMutating, setIsMutating] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	const router = useRouter();

	// use useref for minute
	const [seconds, setSeconds] = useState(180);
	const [timerExpired, setTimerExpired] = useState<boolean>(false);

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

	// cek localstorage on email
	useEffect(() => {
		const storedEmail = localStorage.getItem('email');
		setEmail(storedEmail);
		if (storedEmail) {
			console.log('email telah ada');
		} else {
			router.push('/auth/login');
		}
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
			setMessage("akun yang didaftarkan tidak ada")
			setTimeout(() => {
				setMessage('');
				router.push('/auth/register');
			}, 10000)
		} finally {
			setEmail("");
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
				<h1>Halaman Konfirmasi</h1>
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="card shrink-0 w-full shadow-2xl bg-base-100">
						<form className="card-body" onSubmit={handleConfirm}>
									{message && (
							<div className="form-control">
								<label className="label">
										<span className="label-text">{message}</span>
								</label>
							</div>
									)}
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
								<label className="label">
									<span className="label-text mr-2">{formatTime(seconds)}</span>
									<Link href="#" className="label-text-alt link link-hover" onClick={handleResendCode}>Kirim Ulang Code</Link>
								</label>
							</div>
							<div className="form-control mt-6">
								{isMutating ? (
								<button type="submit" className="btn btn-primary text-white">KONFIRMASI...</button>
								) : (
								<button type="submit" className="btn btn-primary text-white">KONFIRMASI</button>
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
