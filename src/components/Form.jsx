import { useState } from "react";
import dotted1 from "../assets/Dotteddotted1.png";

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    number: "",
  });

  const { fullName, number } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = () => {};

  return (
    <div className="flex max-w-6xl mx-auto items-center justify-between p-3 mt-20">
      <div className="bg-[#F3F3F3] flex justify-between items-center text-left w-[72rem] h-[20rem] px-20 relative">
        <div className="w-[50%] flex flex-col text-2xl font-semibold py-24">
          <text>Get Started with Free</text>
          <text>Consultations</text>
        </div>
        <div className="h-40 border border-gray-500 ml-20 mr-36"></div>
        <div className="w-[50%]">
          <form onSubmit={onSubmit}>
            <div className="flex flex-col">
              <text className="text-left text-lg font-medium mb-2">
                Full Name
              </text>
              <input
                className="w-full bg-transparent border border-gray-500 rounded-md mb-6 py-2 px-3"
                type="fullname"
                placeholder="Enter your Full Name"
                id="fullName"
                value={fullName}
                onChange={handleChange}
              ></input>
            </div>
            <div className="flex flex-col">
              <text className="text-left text-lg font-medium mb-2">
                Contact Number
              </text>
              <input
                className="w-full bg-transparent border border-gray-500 rounded-md mb-6 py-2 px-3"
                type="number"
                placeholder="Enter your Contact Number"
                id="number"
                value={number}
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <button
                type="button"
                className="bg-[#F54C1E] px-6 py-2 rounded-md text-white text-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <img
          className="absolute left-[1082px] top-[250px] -z-10"
          src={dotted1}
          alt="dotted1"
        />
      </div>
    </div>
  );
};

export default Form;
