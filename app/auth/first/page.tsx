export default function FirstLogin() {

  return (
    <main>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="card shrink-0 w-full shadow-2xl bg-base-100">
						<form className="card-body">
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input type="email" placeholder="email" className="input input-bordered" required />
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input type="password" placeholder="password" className="input input-bordered" required />
								<label className="label">
									<a href="#" className="label-text-alt link link-hover">Lupa password?</a>
								</label>
							</div>
							<div className="form-control mt-6">
								<button className="btn btn-primary text-white">LOGIN</button>
							</div>
						</form>
					</div>
				</div>
			</div>
    </main>
  )
}


