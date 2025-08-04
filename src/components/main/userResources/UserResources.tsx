import HeroSection from "@/components/share/HeroSection";
import AccessibleResources from "./AccessibleResources";
import FeaturedResources from "./FeaturedResources";
import ResourcesFilter from "./ResourcesFilter";

export default function UserResources() {
  return (
    <div>
      <HeroSection />
      <ResourcesFilter />
      <FeaturedResources />
      <AccessibleResources />
    </div>
  );
}
