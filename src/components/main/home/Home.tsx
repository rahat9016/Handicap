import FindResources from "./FindResources";
import HomeHeroSection from "./HomeHeroSection";
import JoinOurCommunity from "./JoinOurCommunity";
import KeyDocuments from "./KeyDocuments";
import OurHonorableFounders from "./OurHonorableFounders";
import PlatformStatistics from "./PlatformStatistics";
import QuickAccess from "./QuickAccess";
import ThankyouSection from "./ThankyouSection";
import TrainingModule from "./TrainingModule";
import WelcomeDisability from "./WelcomeDisability";
// pt-4 md:pt-0 lg:pt-6
const Home = () => {
  return (
    <div className=" bg-white mt-4 md:mt-12 lg:mt-28">
      <HomeHeroSection />
      <WelcomeDisability />
      <PlatformStatistics />
      <FindResources />
      <QuickAccess />
      <TrainingModule />
      <KeyDocuments />
      <JoinOurCommunity />
      <ThankyouSection />
      <OurHonorableFounders />
    </div>
  );
};

export default Home;
