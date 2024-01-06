import React, { useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { links } from "../Assets/IconsLinks";
import "../RentPage/Rent.css";
import CountrySelect from "./CountrySelect";
import Counter from "./Counter";

export default function RentPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);


  const [formdata,setFormdata]=useState({
    title:"",
    description:"",
    imageSrc:"",
    category:"",
    roomCount:"",
    bathroomCount:"",
    guestCoun:"",
    price:"",
  })

  const handleChange=()=>{
   
  }

  return (
    <div className="w-full py-4 px-8">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>1</Step>
        <Step onClick={() => setActiveStep(1)}>2</Step>
        <Step onClick={() => setActiveStep(2)}>3</Step>
        <Step onClick={() => setActiveStep(3)}>4</Step>
        <Step onClick={() => setActiveStep(4)}>5</Step>
        <Step onClick={() => setActiveStep(5)}>6</Step>
      </Stepper>
      <form onSubmit={(e) => e.preventDefault()}>
        {activeStep === 0 && (
          <div>
            <h1 className="rent-h1">Rent your Property</h1>
            <h3 className="rent-categ">Select Your Category:</h3>
            <div className="categ-main-div">
              {links.map((item, index) => (
                <div key={index} className="categ-div">
                  {item.imgSrc}
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <div>
            <h1 className="rent-h1">Rent your Property</h1>
            <h3 className="rent-categ">Select your Location</h3>
            <div>
              <CountrySelect />
            </div>
          </div>
        )}
        {activeStep === 2 && (
          <div>
            <h1 className="rent-h1">Rent your Property</h1>
            <h3 className="rent-categ">Give Information About It.</h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <h4 style={{ fontSize: "1.5rem" }}>Bedrooms:</h4>
                <Counter />
              </div>
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <h4 style={{ fontSize: "1.5rem" }}>Bathrooms:</h4>
                <Counter />
              </div>
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <h4 style={{ fontSize: "1.5rem" }}>Guest Capacity:</h4>
                <Counter />
              </div>
            </div>
          </div>
        )}
        {activeStep === 3 && (
          <div>
            <h1 className="rent-h1">Rent your Property</h1>
            <h3 className="rent-categ">Add Images</h3>
            <label for="imageUpload">Select an Image:</label>
            <input
              type="file"
              id="imageUpload"
              name="image"
              accept="image/*"
            ></input>
          </div>
        )}
        {activeStep === 4 && (
          <div>
            <h1 className="rent-h1">Rent your Property</h1>
            <h3 className="rent-categ">Add Description:</h3>
            <textarea
              className="textarea"
              rows="10"
              cols="160"
              placeholder="Type the description here..."
            ></textarea>
          </div>
        )}
        {activeStep === 5 && (
          <div>
            <h1 className="rent-h1">Rent your Property</h1>
            <h3 className="rent-categ">Add Price:</h3>
            <input type="number" className="price-input" placeholder=" enter price"/>
          </div>
        )}
      </form>
      <div className="mt-16 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
