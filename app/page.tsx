import { HCHLogo } from '@/app/ui/hch-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { inter, lora } from '@/app/ui/fonts';
import Image from 'next/image';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'HCH',
};

export default function Page() {
  return <>
    <main className={`${inter.className} flex min-h-screen flex-col p-2`}>
      <div className="flex h-30 shrink-0 items-end rounded-lg bg-blue-900 p-4 md:h-30 sm:p-1 md:p-2">
        <HCHLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-3 rounded-lg border border-gray-900 rounded-lg px-6 py-10 md:w-2/5 md:px-10">
          <p className={`text-xl text-purple-900 md:text-3xl md:leading-normal`}> <strong className={`${lora.className} text-[25px] text-#F5E6CC italic md:text-[35px]`}> &quot;Discover the Art of Handmade Where Creativity Meets Craftsmanship!&quot; </strong></p>
          <p className='text-purple-900'> <span>🌿 Unique. Authentic. Handcrafted with Love. 🌿</span> </p>


          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Happy To See You</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-5 self-start rounded-lg bg-green-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-500 md:text-base"
          >
            <span>Create an Account</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-2 bg-[#FAEDCD] md:w-full border md:px-28 md:py-12 overflow-hidden h-100">
          {/* Add Hero Images Here */}
          <Image
            src="/handmade3.png"
            width={1000}
            height={760}
            className="hidden md:block "
            alt="Hero Image"
          />
          <Image
            src="/handmade3.png"
            width={800}
            height={620}
            className="block md:block"
            alt="Hero Image"
          />
        </div>
      </div>
    </main>
    {/* <footer className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52"> Wednessday</footer> */}
  </>
}
