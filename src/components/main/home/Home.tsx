import FindResources from "./FindResources";
import HomeHeroSection from "./HomeHeroSection";
import JoinOurCommunity from "./JoinOurCommunity";
import KeyDocuments from "./KeyDocuments";
import OurHonorableFounders from "./OurHonorableFounders";
import PlatformStatistics from "./PlatformStatistics";
import QuickAccess from "./QuickAccess";
import TrainingModule from "./TrainingModule";
import WelcomeDisability from "./WelcomeDisability";

export default function Home() {
  return (
    <div>
        <HomeHeroSection/>
        <WelcomeDisability />
        <PlatformStatistics />
        <FindResources/>
        <QuickAccess />
        <TrainingModule />
        <KeyDocuments />
        <JoinOurCommunity />
        <OurHonorableFounders/>
    </div>
  );
}
