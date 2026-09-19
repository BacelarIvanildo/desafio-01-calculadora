import { Container, Content, Row} from "./styles";
import Input from "./components/Input";
import Button from "./components/Button";
import * as math from 'mathjs';

import {useState} from 'react';

const App = () => {
  const [currentFormula, setCurrentFormula] = useState('');
  const [currentNumber, setCurrentNumber] = useState('0');

  const handleAddNumber = (number) => {
    setCurrentNumber(prev =>`${prev === '0' ? '' : prev}${number}`);
  }
  
  const handleClear = () => {
    setCurrentNumber('0');
  }

  const handleAddOperation = (operation) => {
    setCurrentFormula(prev => {
      if(prev === '' || prev.endsWith('=')) {
        return `${currentNumber}${operation}`;
      }
      return `${prev}${currentNumber}${operation}`;
    });
    setCurrentNumber('0');
  }
  const handleCalculate = () => {
    if (currentFormula === '' || currentFormula.endsWith('=')) {
      return;
    }
    setCurrentFormula(prev => `${prev}${currentNumber}`);
    const result = math.evaluate(`${currentFormula}${currentNumber}`);
    setCurrentFormula(prev => `${prev}=`);
    setCurrentNumber(result.toString());
  } 

  const handleClearAll = () => {
    setCurrentNumber('0');
    setCurrentFormula('');
  }

  return (
    <Container>
      <Content>
        <Input value={currentFormula} />
        <Input value={currentNumber} />
        <Row>
          <Button label="*" onClick={() => handleAddOperation('*')} />
          <Button label="/" onClick={() => handleAddOperation('/')} />
          <Button label="C" onClick={handleClear} />
          <Button label="AC" onClick={handleClearAll} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')} />
          <Button label="8" onClick={() => handleAddNumber('8')} />
          <Button label="9" onClick={() => handleAddNumber('9')} />
          <Button label="-" onClick={() => handleAddOperation('-')} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')} />
          <Button label="5" onClick={() => handleAddNumber('5')} />
          <Button label="6" onClick={() => handleAddNumber('6')} />
          <Button label="+" onClick={() => handleAddOperation('+')} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')} />
          <Button label="2" onClick={() => handleAddNumber('2')} />
          <Button label="3" onClick={() => handleAddNumber('3')} />
          <Button label="=" onClick={() => handleCalculate()} />
        </Row>
      </Content>
    </Container>
  );
};

export default App;
