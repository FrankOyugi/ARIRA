const sendPayment = async (pn, amount) => {
    try {
      const response = await fetch('http://localhost:3005/pay/:pn/:amount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pn, amount }),
      });
  
      if (response.ok) {
        console.log('Payment sent successfully!');
      } else {
        console.log('Failed to send payment.');
      }
    } catch (error) {
      console.error('Error sending payment:', error);
    }
  };
  
  export default sendPayment;
  