import Image from "next/image";

export default function Home() {
    return (
        <div className="w-screen h-screen relative">
            <Image
                src="/kowies_app.jpg"
                alt="Hero Image"
                fill
                className="object-cover"
                priority
            />
        </div>
    );
}
