import Link from "next/link";
import { FaBook } from "react-icons/fa";

export default function Home() {
  
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center gap-5 px-5">
      <h1 className="text-5xl">Book App</h1>
      <p className="flex gap-5 items-center justify-center flex-wrap">Welcome to the Book App made with Next.js <FaBook className="text-3xl" /></p>
      <Link href={'/home'} className="btn btn-info w-40 text-lg text-white">Login</Link>
    </div>
  )
}
