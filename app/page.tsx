'use client';
import { assets } from "@/assets/assets";
import PromptBox from "@/components/prompt_box/PromptBox";
import Sidebar from "@/components/sidebar/Sidebar";
import Image from "next/image";
import { useState } from "react"

const Home = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div>
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand} />
        <div className="flex-1 flex  flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image onClick={() => setExpand(prev => !prev)} className="rotate-180" src={assets.menu_icon} alt="menu_icon" />
            <Image className="opacity-70" src={assets.chat_icon} alt="chat_icon" />
          </div>
          {messages.length === 0 ?
            <>
              <div className="flex items-center gap-3">
                <Image className="h-16" src={assets.logo_icon} alt="deepseek_logo" />
                <p className="text-2xl font-medium">Hi, I'm DeepSeek</p>
              </div>
              <p className="text-sm mt-2">How can i help you today?</p>
            </> :
            <div>
            </div>}

          <PromptBox />
          <p className="text-xs absolute bottom-1 text-gray-500">AI-generated, for reference only</p>
        </div>
      </div>
    </div>
  )
}

export default Home