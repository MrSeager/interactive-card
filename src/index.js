import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

import LogoImg from './images/card-logo.svg';
import OkImg from './images/icon-complete.svg';

const invalidMess = "Wrong format, numbers only";
const invalidMess2 = "Can't be blank";

const Valid = (inputVal) => {
  const hasNonNumericChars = /[^\d\s]/.test(inputVal);
  
  return {
    isValidFormat: !hasNonNumericChars,
    formattedValue: inputVal.replace(/\s/g, ''),
  }
};

const MainSite = () => {
  const [cardNumb, setCardNumb] = useState('');

  const [cardName, setCardName] = useState('');

  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');

  const [cardCVC, setCardCVC] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isValidFormat, setIsValidFormat] = useState(true);

  const handleCardNumbChange = (event) => {
    const inputVal = event.target.value;
    const {isValidFormat: newIsValidFormat, formattedValue} = Valid(inputVal);
    const spacedVal = formattedValue.replace(/(.{4})/g, '$1 ');
    const limitedVal = spacedVal.slice(0, 19);
    setCardNumb(limitedVal);

    setIsValidFormat(newIsValidFormat);
  };

  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
  };

  const handleCardMonthChange = (event) => {
    const inputVal = event.target.value;
    const limitedVal = inputVal.slice(0, 2);
    setCardMonth(limitedVal);
  };

  const handleCardYearChange = (event) => {
    const inputVal = event.target.value;
    const limitedVal = inputVal.slice(0, 2);
    setCardYear(limitedVal);
  };

  const handleCardCVCChange = (event) => {
    const inputVal = event.target.value;
    const limitedVal = inputVal.slice(0, 3);
    setCardCVC(limitedVal);
  };

  const handleFormSubmit = () => {
    if(!cardNumb.trim() || !cardName.trim() || !cardMonth.trim() || !cardYear.trim() || !cardCVC.trim()){
      setFormSubmitted(true);
    } else {
      setFormSubmitted(false);
      document.getElementById("s2").style.display = 'none';
      document.getElementById("s3").style.display = 'flex';
    }
  };

  const contButton = () => {
    setCardName('');
    setCardNumb('');
    setCardMonth('');
    setCardYear('');
    setCardCVC('');

    document.getElementById("s2").style.display = 'grid';
    document.getElementById("s3").style.display = 'none';
  };

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
          <label htmlFor="cardName">Cardholder Name</label>
          <input 
            type="text" 
            id="cardName" 
            value={cardName}
            onChange={handleCardNameChange}
            placeholder="e.g. Jane Appleseed"
            />
            {formSubmitted && !cardName.trim() && <p>{invalidMess2}</p>}
        </div>
        <div className="t1 cardNumb">
          <label htmlFor="cardNumb">Card Number</label>
          <input 
            type="text" 
            id="cardNumb" 
            placeholder="e.g. 1234 5678 9123 0000"
            value={cardNumb}
            onChange={handleCardNumbChange}
            />
            {!isValidFormat && <p>{invalidMess}</p>}
            {formSubmitted && !cardNumb.trim() && <p>{invalidMess2}</p>}
        </div>
        <div className="t2">
          <label htmlFor="expDate">Exp. Date (MM/YY)</label>
          <input 
            type='number'
            min="01" 
            max="12" 
            value={cardMonth}
            onChange={handleCardMonthChange}
            placeholder="MM"
            />
            {formSubmitted && (!cardMonth.trim() || !cardYear.trim()) && <p>{invalidMess2}</p>}
          <input 
            type="number" 
            min="00" 
            max="99" 
            value={cardYear}
            onChange={handleCardYearChange}
            placeholder="YY"
            />
        </div>
        <div className="t3">
          <label htmlFor="cvc">CVC</label>
          <input 
            type="number" 
            id="cvc"
            value={cardCVC}
            onChange={handleCardCVCChange}
            placeholder="e.g. 123"
            />
            {formSubmitted && !cardCVC.trim() && <p>{invalidMess2}</p>}
        </div>
        <button onClick={handleFormSubmit}>Confirm</button>
      </section>
      <section id="s3">
        <img src={OkImg} alt="ok" />
        <h3>Thank you!</h3>
        <p>We've added your card details</p>
        <button onClick={contButton}>Continue</button>
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
