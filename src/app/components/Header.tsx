import Image from "next/image"

export default function Hearder(){
    return(
        <div className="p-2 bg-amber-500 rounded-2xl">
        <div>
            <Image
            src={"/favicon.ico"}
            height={50}
            width={50}
            alt="logo"
            className="rounded-3xl"


            />
        </div>
            
        </div>
    )
}