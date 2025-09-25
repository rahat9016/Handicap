import Image from "next/image";

export default function HeroSection() {
  return (
    <div>
      <Image
        width={1920}
        height={318}
        src="/images/common/heroBg.jpg"
        alt="heroBg"
        className="lg:h-[318px] h-[400px] object-fill"
      />
    </div>
  );
}
