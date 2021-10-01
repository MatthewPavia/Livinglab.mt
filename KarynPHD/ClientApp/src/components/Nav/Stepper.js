import { Step, Steps, useSteps } from 'chakra-ui-steps';
import React, { Component } from 'react';
import { Flex } from '@chakra-ui/layout';
import Cookies from 'universal-cookie';

const steps = [
  { label: 'Issues' },
  { label: 'Ideas' },
  { label: 'Solutions' },
];

export default function Stepper(props) {
  
  console.log(props.currentCompletion)

  return (
    <Steps activeStep={parseInt(props.currentCompletion)} colorScheme='auburn' responsive={true}>
      {steps.map(({ label }) => (
        <Step label={label} key={label}>
        </Step>
      ))}
    </Steps>
  );
};