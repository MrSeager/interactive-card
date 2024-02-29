import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import LogoImg from './images/card-logo.svg';

const Valid = (inputVal) => {
  const hasNonNumericChars = /[^\d\s]/.test(inputVal);
  
  return {
    isValidFormat: !hasNonNumericChars,
    formattedValue: inputVal.replace(/\s/g, ''),
  }
};

const MainSite = () => {
  const [cardNumb, setCardNumb] = useState('');
  const [isValidFormat, setIsValidFormat] = useState(true);
  const [cardName, setCardName] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [isValidCVC, setIsValidCVC] = useState(true);

  const handleCardNumbChange = (event) => {
    const inputVal = event.target.value;
    //const formattedVal = inputVal.replace(/\s/g, '');
    const {isValidFormat: newIsValidFormat, formattedValue} = Valid(inputVal);
    const spacedVal = formattedValue.replace(/(.{4})/g, '$1 ');
    const limitedVal = spacedVal.slice(0, 19);
    setCardNumb(limitedVal);

    //const hasNonNumericChars = /[^\d\s]/.test(inputVal);
    setIsValidFormat(newIsValidFormat);
  };

  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
  }

  const handleCardMonthCahnge = (event) => {
    const inputVal = event.target.value;
    const limitedVal = inputVal.slice(0, 2);
    setCardMonth(limitedVal)
  }

  const handleCardYearChange = (event) => {
    const inputVal = event.target.value;
    const limitedVal = inputVal.slice(0, 2);
    setCardYear(limitedVal);
  }

  const handleCardCVCChange = (event) => {
    const inputVal = event.target.value;
    const {isValidFormat: newIsValidCVC, formattedValue} = Valid(inputVal);
    const limitedVal = formattedValue.slice(0, 3);
    setCardCVC(limitedVal);

    setIsValidCVC(newIsValidCVC);
  }

  return (
    <main>
      <section id="s1">
        <div className="card front">
          <img src={LogoImg} alt="logo" />
          <h1>{cardNumb || '0000 0000 0000 0000'}</h1>
          <h2 className='cardName'>{cardName || 'Jane Appleseed'}</h2>
          <h2 className='cardDate'>{cardMonth || '00'}/{cardYear || '00'}</h2>
        </div>
        <div className="card back">
          <h2>{cardCVC || '000'}</h2>
        </div>
      </section>
      <section id="s2">
        <div className="t1">
          <label for="cardName">Cardholder Name</label>
          <input 
            type="text" 
            id="cardName" 
            value={cardName}
            onChange={handleCardNameChange}
            placeholder="e.g. Jane Appleseed"
            />
        </div>
        <div className="t1 cardNumb">
          <label for="cardNumb">Card Number</label>
          <input 
            type="text" 
            id="cardNumb" 
            placeholder="e.g. 1234 5678 9123 0000"
            value={cardNumb}
            onChange={handleCardNumbChange}
            />
            {!isValidFormat && <p>Wrong format, numbers only</p>}
        </div>
        <div className="t2">
          <label for="expDate">Exp. Date (MM/YY)</label>
          <input 
            type="text" 
            id="expDate" 
            min="01" 
            max="12" 
            value={cardMonth}
            onChange={handleCardMonthCahnge}
            placeholder="MM"
            />
          <input 
            type="text" 
            id="expDate"
            min="00" 
            max="99" 
            value={cardYear}
            onChange={handleCardYearChange}
            placeholder="YY"
            />
        </div>
        <div className="t3">
          <label for="cvc">CVC</label>
          <input 
            type="text" 
            id="cvc" 
            name="cvc" 
            maxlength="3" 
            size="3" 
            value={cardCVC}
            onChange={handleCardCVCChange}
            placeholder="e.g. 123"
            />
            {!isValidCVC && <p>Wrong format, numbers only</p>}
        </div>
        <button>Confirm</button>
      </section>
    </main>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainSite />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
