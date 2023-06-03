import Image from "next/image";
import { Inter } from "next/font/google";
import PageLayout from "@/components/PageLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <h1 className="text-black">This is the dashboard</h1>;
}
