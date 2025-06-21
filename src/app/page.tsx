"use client";
import PDF from "./pdf/page";
import Video from "./Video_Audio/page";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("pdf");
  return (
      <div className="text-center ">
        <button
          onClick={() => setContent("pdf")}
          className="p-5  bg-amber-600  text-white text-2xl rounded-3xl cursor-pointer font-bold m-2">
          PDF
        </button>

        <button
          onClick={() => setContent("video")}
          className="p-5 bg-amber-600 text-2xl text-white  rounded-3xl  cursor-pointer font-bold ">
          VIDEO
        </button>
        {content === "pdf" ? <PDF /> : <Video />}
      </div>

  );
}
