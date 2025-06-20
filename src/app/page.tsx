"use client"
import PDF from "./pdf/page";
import Video from "./Video_Audio/page";

import Hearder from "./components/Header";
import { useState } from "react";
import Footer from "./components/Footer";

export default function Home() {

  const [content, setContent] = useState("pdf")
  return (
    <div className="h-screen p-5 bg-slate-300">

    <div className="">
      <Hearder />
       </div>
      <div className="flex text-center justify-center flex-col  gap-5 pt-5">


      <h1 
      onClick={()=> setContent("pdf")}
      
      className="p-5  bg-amber-600 text-2xl text-white underline rounded-3xl cursor-pointer">
        PDF
        </h1>

        <h1
        onClick={()=>setContent("video")}
         className="p-5 bg-amber-600 text-2xl text-white underline rounded-3xl  cursor-pointer ">
        video
        </h1>
        {content === "pdf" ? <PDF />: <Video />}

        </div>
        <Footer />

       </div>
   
  );
}
