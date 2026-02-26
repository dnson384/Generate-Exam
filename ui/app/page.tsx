"use client";
import NavBar from "@/presentation/components/layout/navbar";

export default function Home() {
  return (
    <>
      <NavBar />
      <iframe
        className="mt-25 px-4 w-6xl h-150 mx-auto"
        src="https://www.youtube.com/embed/ko70cExuzZM?list=RDko70cExuzZM"
        allowFullScreen
      />
    </>
  );
}
