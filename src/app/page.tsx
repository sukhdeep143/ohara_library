// import Image from "next/image";
import Link from "next/link";


import Hearder from "./components/Header";

export default function Home() {
  return (
    <div className="p-5 h-full bg-slate-300">
      <Hearder />
      <Link
      className="font-bold p-10 flex justify-center"
      href={"./Video_Audio"}
      ><h1 className="p-5 bg-amber-600 text-2xl text-white underline rounded-3xl  ">
        Video
        </h1>
      </Link>

      <Link
      className="font-bold p-10 flex justify-center"
      href={"./pdf"}
      ><h1 className="p-5 bg-amber-600 text-2xl text-white underline rounded-3xl  ">
        PDF
        </h1>
      </Link>
 
      
    </div>
  );
}
