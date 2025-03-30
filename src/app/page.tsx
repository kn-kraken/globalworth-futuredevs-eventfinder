import Image from "next/image";

export default function Home() {
    return (
        <div className="w-screen h-screen relative">
            <div className="absolute top-0 w-screen h-8 bg-background z-99"></div>
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
