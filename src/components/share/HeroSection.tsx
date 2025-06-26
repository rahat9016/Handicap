import Image from "next/image";

export default function HeroSection() {
  return (
    <div>
        <Image width={1920} height={318} src="/images/common/heroBg.jpg" alt="heroBg" className="h-[318px] object-fill"/>
    </div>
  )
}
