import React, { useState } from 'react';
import './transaction.css';
import { useNavigate } from 'react-router-dom';

const Transaction = () => {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [pin, setPin] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    // Constant PIN for a specific phone number
    const CONSTANT_PIN = '1234';

    const handlePaymentMethod = (method) => {
        setSelectedMethod(method);
    };

    const handleSubmit = () => {
        // Handle form submission based on selected payment method
        console.log(`Submitting payment with ${selectedMethod}`);
        console.log('Account Number:', accountNumber);
        console.log('OTP:', otp);
        console.log('PIN:', pin);
        
        // Simulate OTP generation and sending
        if (selectedMethod === 'bkash' || selectedMethod === 'nagad') {
            setOtpSent(true);
            setTimeout(() => {
                const generatedOtp = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit OTP
                setOtp(generatedOtp.toString());
            }, 2000); // Simulate a 2-second delay before receiving OTP
        }

        navigate("/")
    };

    return (
        <div className="transaction">
            <div className="transaction-container">
                <h1>Transaction Details</h1>
                <div className="payment-methods">
                    <button onClick={() => handlePaymentMethod('bkash')} className={selectedMethod === 'bkash' ? 'active' : ''}>Bkash</button>
                    <button onClick={() => handlePaymentMethod('nagad')} className={selectedMethod === 'nagad' ? 'active' : ''}>Nagad</button>
                    <button onClick={() => handlePaymentMethod('bank')} className={selectedMethod === 'bank' ? 'active' : ''}>Bank Account</button>
                    <button onClick={() => handlePaymentMethod('cod')} className={selectedMethod === 'cod' ? 'active' : ''}>Cash on Delivery</button>
                </div>
                {selectedMethod && (
                    <div className="payment-details">
                        {selectedMethod === 'bank' && (
                            <input type="text" placeholder="Enter Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                        )}
                        {(selectedMethod === 'bkash' || selectedMethod === 'nagad') && (
                            <>
                                <input type="text" placeholder="Enter Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                                {otpSent ? (
                                    <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} disabled />
                                ) : (
                                    <button onClick={handleSubmit}>Send OTP</button>
                                )}
                            </>
                        )}
                        <input type="password" placeholder="Enter PIN" value={pin} onChange={(e) => setPin(e.target.value)} />
                        {/* Display constant PIN for specific phone number */}
                        {selectedMethod === 'bkash' && accountNumber === '017XXXXXXXX' && (
                            <p className="constant-pin">Constant PIN: {CONSTANT_PIN}</p>
                        )}
                    </div>
                )}
                <button onClick={handleSubmit} className="confirm-button">Confirm Payment</button>
            </div>
        </div>
    );
};

export default Transaction;
