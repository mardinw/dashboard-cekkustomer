import { permanentRedirect } from "next/navigation";

export default function Auth() {
	return permanentRedirect('/auth/login')
}
