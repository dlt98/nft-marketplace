import { useState } from "react";
import { SingleStep } from "./index";

interface StepsType {
  title: string;
  text: string;
}

const steps: StepsType[] = [
  { title: "Install Metamask", text: "Download metamask from their website" },
  {
    title: "Connect your wallet",
    text: "Confirm the Metamask propt asking you to connect your wallet",
  },
  {
    title: "Start trading",
    text: "After setting everything up all you need to do now is to use the website",
  },
];

const Steppers = () => {
  const [selectedStep, setSelectedStep] = useState(1);

  return (
    <ul className="stepper" data-mdb-stepper="stepper">
      {steps.map((step, idx) => (
        <SingleStep
          title={step.title}
          text={step.text}
          active={idx === selectedStep}
          step={idx + 1}
          onClick={() => setSelectedStep(idx)}
        />
      ))}
    </ul>
  );
};

export default Steppers;
