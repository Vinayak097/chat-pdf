import Image from "next/image";
import {
  BrainCogIcon,
  EyeIcon,
  GlobeIcon,
  ZapIcon
} from 'lucide-react'
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    name: "store your pdf Doucuments",
    description: "keep all your important PDF files securely stored and easily accessible anytime,anywhere",
    icon: GlobeIcon,
  },
  {
    name: "Blazing Fast Responses",
    description: "Experience lightning-fast answers to your queries, ensuring you get the information you need instatnly",
    icon: ZapIcon
  },
  {
    name: "Chat Memorisation",
    description: "Our intelligent chatbot remembers previos interactions ,providing a seamless and personalized exprience ",
    icon: BrainCogIcon
  },
  {
    name: "Interactive PDF Viewer",
    description: "Engage with your PDFs like never before using our intuitive and interactive viewer",
    icon: EyeIcon
  }
]

export default function Home() {
  return (
    <main className="flex-1  overflow-scroll bg-gradient-to-bl from-white to-amber-600 p-2 lg:p-4 md:p-3 sm:p-2 h-full">
      <div className="bg-white py-24  sm:py-32 rounded-md drop-shadow-xl">
        <div className="flex flex-col justify-center items-center mx-auto max-7xl px-6 lg:px-8 ">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-semibold leading-7 text-amber-500">
              Your interactive Document Companion
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">Transfrom Your PDFs into Interactive Conversations</p>
            <p>Introducing <span className="text-amber-600 font-bold">Chat with PDF.</span>
              <br />
              <br />
              <span>Upload your document, and our chatbot will answer questions, summarize content, and answer all your Qs.
                Ideal for everyone, <span className="text-amber-600">Chat with PDF.</span>turns static Doucuments
                into <span className="font-bold">dynamic conversation,</span> enhacing productivity 10xfold effortlessly.
              </span>
            </p>
            <Link href="/dashboard">
              <Button className="mt-10">Get Started</Button>
            </Link>
          </div>

          <div className="relative overflow-hidden pt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <Image
                src="https://i.imgur.com/VciRSTI.jpeg"
                width={2432}
                height={1442}
                className="mb-[-0%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
                alt={"image"}>
              </Image>
              <div aria-hidden="true" className="relative">
                <div className="absolute bg-gradient-to-t from-white/95 pt-[5%]"></div>
              </div>
            </div>

            <div className=" mt-14 ">
              <dl className="grid sm:grid-cols-2 gap-2 grid-cols-1 lg:grid-cols-3 ">
                {features.map((item) =>

                  <dt key={item.name} className="flex gap-2 font-semibold  shadow-md">
                    <item.icon className="size-10"></item.icon>
                    <div ><p>{item.name}</p>
                      <p className="text-gray-900">{item.description}</p></div>
                  </dt>
                )}
              </dl>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
