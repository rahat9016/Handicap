import AccessibleResources from "./AccessibleResources";
import FeaturedResources from "./FeaturedResources";
import ResourcesFilter from "./ResourcesFilter";
import ResourcesHero from "./ResourcesHero";

export default function UserResources() {
  return (
    <div>
      <ResourcesHero />
      <ResourcesFilter />
      <FeaturedResources />
      <AccessibleResources />
    </div>
  );
}
