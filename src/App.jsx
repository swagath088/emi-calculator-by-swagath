import { useState } from "react";
import "./App.css";

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(tenure);

    // Robust validation check for NaN and non-positive numbers
    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
      alert("Please enter valid positive values in all fields.");
      return;
    }

    // Standard reducing balance mathematical variables
    const r = annualRate / 12 / 100;
    const n = years * 12;

    // EMI Calculation Formula
    const monthlyEMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthlyEMI * n;
    const interest = total - P;

    // Formatting outputs to two decimal places
    setEmi(monthlyEMI.toFixed(2));
    setTotalPayment(total.toFixed(2));
    setTotalInterest(interest.toFixed(2));
  };

  const handleReset = () => {
    setLoanAmount("");
    setInterestRate("");
    setTenure("");
    setEmi(null);
    setTotalPayment(null);
    setTotalInterest(null);
  };

  return (
    <div className="container">
      <h1>Smart EMI Calculator 💰</h1>
      <p className="subtitle">Calculate your monthly loan EMI instantly.</p>

      <div className="input-group">
        <label>Loan Amount (₹)</label>
        <input
          type="number"
          placeholder="e.g. 500000"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Interest Rate (% P.A.)</label>
        <input
          type="number"
          placeholder="e.g. 8.5"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Tenure (Years)</label>
        <input
          type="number"
          placeholder="e.g. 5"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button className="btn-calculate" onClick={calculateEMI}>
          Calculate EMI
        </button>
        <button className="btn-reset" onClick={handleReset}>
          Reset
        </button>
      </div>

      {emi && (
        <div className="result">
          <h3>Monthly EMI: <span>₹{emi}</span></h3>
          <div className="result-row">
            <p>Total Interest:</p> <span>₹{totalInterest}</span>
          </div>
          <div className="result-row">
            <p>Total Payment:</p> <span>₹{totalPayment}</span>
          </div>
        </div>
      )}

      <div className="footer">
        <p>Developed by <strong>Gaddam Swagath</strong></p>
        <p className="email">{`sswagath46@gmail.com`}</p>

        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noreferrer"
        >
          <button className="btn-hero">
            Built for Digital Heroes
          </button>
        </a>
      </div>
    </div>
  );
}

export default App;