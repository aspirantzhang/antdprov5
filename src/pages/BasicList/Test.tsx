import React, { useState } from 'react';
import { Input, Button } from 'antd';

const Test = () => {
  const [animalName, setAnimalName] = useState('tiger');

  return (
    <div>
      <Input value={animalName} />
      <Button
        onClick={() => {
          setAnimalName('cat');
        }}
      >
        Change
      </Button>
    </div>
  );
};

export default Test;
