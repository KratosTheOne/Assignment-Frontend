import ProcessCards from "./ProcessCards";
import img1 from "../assets/Rectangle 2.png";
import img2 from "../assets/Rectangle 2-1.png";
import img3 from "../assets/Rectangle 2-2.png";

const Process = () => {
  return (
    <div className="bg-[#1E0650] h-screen text-white">
      <div className="flex flex-col max-w-[84rem] mx-auto">
        <div className="mt-20 flex flex-col content-center justify-center text-center space-y-4">
          <text className="text-lg text-[#F54C1E] font-medium">PROCESS</text>
          <text className="text-4xl font-semibold text-white">
            How it Works?
          </text>
        </div>
        <div className="mt-2">
          <div
            id="default-carousel"
            className="relative w-full"
            data-carousel="slide"
          >
            <div className="relative h-[30rem] flex items-center rounded-lg justify-center content-center space-x-14">
              <div className="duration-700 ease-in-out" data-carousel-item>
                <ProcessCards
                  count="01"
                  image={img1}
                  title="Understanding"
                  description="Fill a 1 minute questionnaire that’ll help us understand your home-buying requirements better"
                />
              </div>
              <div className="duration-700 ease-in-out" data-carousel-item>
                <ProcessCards
                  count="02"
                  image={img2}
                  title="Free 30 minute session"
                  description="We’ll tell you a bit about ourselves and and how we’ll help you find the home you’re looking for."
                />
              </div>
              <div className="duration-700 ease-in-out" data-carousel-item>
                <ProcessCards
                  count="03"
                  image={img3}
                  title="Expert agent will assigned"
                  description="Our property wizard will be part of your entire journey - from browsing homes to moving into one."
                />
              </div>
            </div>
            <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
              <button
                type="button"
                className="w-3 h-3 rounded-full bg-orange-600"
                aria-current="true"
                aria-label="Slide 1"
                data-carousel-slide-to="0"
              ></button>
              <button
                type="button"
                className="w-3 h-3 rounded-full bg-white"
                aria-current="false"
                aria-label="Slide 2"
                data-carousel-slide-to="1"
              ></button>
              <button
                type="button"
                className="w-3 h-3 rounded-full bg-white"
                aria-current="false"
                aria-label="Slide 3"
                data-carousel-slide-to="2"
              ></button>
            </div>
            <button
              type="button"
              className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
