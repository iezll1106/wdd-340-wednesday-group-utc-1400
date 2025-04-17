import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana, lora } from '@/app/ui/fonts';


export function HCHLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-col md:flex-row items-center leading-none text-white `}
    >
      <GlobeAltIcon className="h-10 w-8 rotate-[15deg] md:h-20 md:w-20 md:rotate-[30deg]" />
      <p className= {`${lora.className} text-[30px] md:text-[80px]`}>HCH</p>
      <p  className="text-[10px] md:text-[10px]  ml-2 ">HandCrafted Haven</p>
    </div>
  );
}

export function SideNavLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-col md:flex-row items-center leading-none text-white `}
    >
      <GlobeAltIcon className="h-10 w-8 rotate-[15deg] md:h-20 md:w-10 md:rotate-[30deg]" />
      <p className= {`${lora.className} text-[30px] md:text-[40px]`}>HCH</p>
      <p  className="text-[10px] md:text-[10px]  ml-2 ">HandCrafted Haven</p>
    </div>
  );
}