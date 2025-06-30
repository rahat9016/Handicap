import Paragraph from "@/components/share/Paragraph";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import Title from "@/components/share/Title";
import Image from "next/image";

const listEarn = [
  "Official Recognition from Handicap Bangladesh and partner organizations",
  "Build Your Credentials in disability inclusion and humanitarian practice",
  "Boost Employability with verified, skill-based certification",
  "Globally Accepted by NGOs, development agencies, and employers",
  "Track Your Progress with a personalized learner dashboard",
  "Issued Upon Completion of each course or training module",
  "Step Toward Career Growth in inclusion, development, and rights-based sectors",
];

export default function EarnRecognizedCertificates() {
  return (
    <div className="bg-[#f3f3f3]">
      <div className="container py-10 lg:py-20">
        <SectionTopTitle
          title="Earn Recognized Certificates"
          desc="Gain official recognition for your learning and professional development through our certificate programs. Upon completing training courses on disability inclusion, inclusive education, accessible."
        />
        <div className="grid grid-cols-2 gap-9 mt-14">
          <div>
            <Paragraph>Success</Paragraph>
            <Title>Earn Recognized Certificates</Title>
            <Paragraph className="mt-4">
              Gain official recognition for your learning and professional
              development through our certificate programs. Upon completing
              training courses on disability inclusion, inclusive education,
              accessible.
            </Paragraph>
            <div className="flex flex-col gap-3 mt-9">
              {listEarn.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Image
                    width={20}
                    height={20}
                    src="/images/course/verify.svg"
                    alt={item}
                  />{" "}
                  <Paragraph>{item}</Paragraph>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Image
              width={706}
              height={473}
              src="/images/course/certificates.jpg"
              alt={"certificates"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
