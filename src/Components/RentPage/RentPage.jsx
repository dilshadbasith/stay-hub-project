import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { links } from "../Assets/IconsLinks";
import "../RentPage/Rent.css";
import CountrySelect from "./CountrySelect";

export default function RentPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

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
      <form>
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
                <CountrySelect/>
            </div>
          </div>
        )}
        {activeStep === 2 && (
          <div>
            <h1 className="rent-h1">Rent your Property</h1>
            <h3 className="rent-categ">Give Information About It.</h3>
          </div>
        )}
        {activeStep === 3 && (
          <div>
            <h1 className="rent-h1">Rent your Property</h1>
            <h3 className="rent-categ">Add Images</h3>
          </div>
        )}
        {activeStep === 4 && (
          <div>
            <h1 className="rent-h1">Rent your Property</h1>
            <h3 className="rent-categ">Add Description</h3>
          </div>
        )}
        {activeStep === 5 && (
          <div>
            <h1 className="rent-h1">Rent your Property</h1>
            <h3 className="rent-categ">Add Price</h3>
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
