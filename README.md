# Hellio Messaging Node.js Package

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A Node.js package for integrating with Hellio Messaging API. This package provides functionalities for sending SMS, generating OTP, performing number lookup, checking delivery reports, checking sms and voice pricing and checking account balance.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

Describe the installation steps required to set up and run your project. Include any dependencies and prerequisites.

```bash
npm install helliomessaging-nodejs

```

## Usage

```javascript

const HellioMessaging = require("hellio-messaging");

// Initialize the Hellio Messaging client
const client = new HellioMessaging({
    clientId: "yourClientId",
    applicationSecret: "yourApplicationSecret",
});

// Send an SMS
const smsParams = {
    senderId: "yourSenderId",
    msisdn: "recipientPhoneNumber",
    message: "Hello, World!",
};

client
    .sendSMS(smsParams)
    .then((response) => {
        console.log("SMS sent successfully:", response);
    })
    .catch((error) => {
        console.error("Failed to send SMS:", error);
    });

// Generate OTP
const otpParams = {
    mobile_number: "recipientPhoneNumber",
    timeout: 60,
    message: "Your verification code is: {OTP}",
    senderId: "yourSenderId",
    tokenlength: 6,
    recipient_email: "recipientEmail",
    messageType: 0,
};

client
    .sendOTP(otpParams)
    .then((response) => {
        console.log("OTP sent successfully:", response);
    })
    .catch((error) => {
        console.error("Failed to send OTP:", error);
    });

// Verify OTP
const verifyParams = {
    mobile_number: "recipientPhoneNumber",
    otp: "otpCode",
};

client
    .verifyOTP(verifyParams)
    .then((response) => {
        console.log("OTP verification successful:", response);
    })
    .catch((error) => {
        console.error("OTP verification failed:", error);
    });

// Perform number lookup
const lookupParams = {
    msisdn: "phoneNumber",
    reference: "campaignName",
};

client
    .numberLookup(lookupParams)
    .then((response) => {
        console.log("Number lookup result:", response);
    })
    .catch((error) => {
        console.error("Number lookup failed:", error);
    });

// Get routing price
const routingParams = {
    country_code: "GH",
    service_name: "sms", //sms or voice
};

client
    .getRoutingPrice(routingParams)
    .then((response) => {
        console.log("Routing price:", response);
    })
    .catch((error) => {
        console.error("Failed to retrieve routing price:", error);
    });

// Check delivery report
const reportParams = {
    startDate: "startDate",
    endDate: "endDate",
    senderId: "yourSenderId",
    deliveryStatus: "DELIVRD",
};

client
    .checkDeliveryReport(reportParams)
    .then((response) => {
        console.log("Delivery report:", response);
    })
    .catch((error) => {
        console.error("Failed to check delivery report:", error);
    });

// Check account balance
client
    .checkBalance()
    .then((balance) => {
        console.log("Account balance:", balance);
    })
    .catch((error) => {
        console.error("Failed to check account balance:", error);
    });



```


## Features

For more details on the available methods and parameters, please refer to the Hellio Messaging Node.js package documentation.


## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT](LICENSE)

Feel free to customize the README.md file further to add additional details specific to your project, such as examples, usage guidelines, and any other relevant information.
