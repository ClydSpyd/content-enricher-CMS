import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Link href="/discover">
        <button className="w-[170px] h-[45px] border rounded-md font-semibold hover:text-white hover:bg-indigo-500 transition-all duration-200">discover</button>
      </Link>
    </div>
  );
}