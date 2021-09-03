import { Step, Steps, useSteps } from 'chakra-ui-steps';
import React, { Component } from 'react';
import { Flex } from '@chakra-ui/layout';

const steps = [
  { label: 'Issues' },
  { label: 'Solutions' },
  { label: 'Feedback' },
];

export default function Stepper() {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <Steps activeStep={1} colorScheme='auburn' responsive={true}>
      {steps.map(({ label }) => (
        <Step label={label} key={label}>
        </Step>
      ))}
    </Steps>
  );
};