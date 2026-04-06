import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import ProductShowCase from "../components/ProductShowCase";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import FooterSection from './../components/FooterSection';

const LandingPage=()=>{
  return (
    <div className="bg-white font-sans text-gray-800">
      <Header/>
      <main>
        <HeroSection/>
        <ProductShowCase/>
        <AboutSection/>
        <ContactSection/>
        <FooterSection/>
      </main>
    </div>
  )
}
export default LandingPage;