import FindResources from "./FindResources";
import HomeHeroSection from "./HomeHeroSection";
import JoinOurCommunity from "./JoinOurCommunity";
import OurHonorableFounders from "./OurHonorableFounders";
import PlatformStatistics from "./PlatformStatistics";
import PowerBiSection from "./PowerBiSection";
import QuickAccess from "./QuickAccess";
import ThankyouSection from "./ThankyouSection";
import TrainingModule from "./TrainingModule";
import WelcomeDisability from "./WelcomeDisability";

const Home = () => {
  return (
    <div>
      <HomeHeroSection />
      <QuickAccess />
      <WelcomeDisability />
      <PowerBiSection />
      <PlatformStatistics />
      <FindResources />
      <TrainingModule />
      <JoinOurCommunity />
      <ThankyouSection />
      <OurHonorableFounders />
    </div>
  );
};

export default Home;
