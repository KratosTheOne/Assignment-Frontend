import Comparison from "../components/Comparison";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Hero from "../components/Hero";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <div className="h-full">
        <Hero />
      </div>
      <div className="h-full">
        <Features />
      </div>
      <div className="h-full">
        <Process />
      </div>
      <div className="h-full">
        <Comparison />
      </div>
      <div className="h-full">
        <Testimonials />
      </div>
      <div className="h-full">
        <Form />
      </div>
      <div className="h-full">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
