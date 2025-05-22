const HellioMessaging = require("../src/index");

describe("HellioMessaging", () => {
    // Mock options for HellioMessaging instance
    const options = {
        clientId: "60556f0fd67db",
        applicationSecret: "1bc163c2aefd9382b6505a6c594922fe",
    };

    // Create a new HellioMessaging instance
    const hellioMessaging = new HellioMessaging(options);

    // Send SMS
    describe("sendSMS", () => {
        let mockPost;

        beforeEach(() => {
            // Reset the mock before each test
            mockPost = jest.spyOn(hellioMessaging.api, 'post');
        });

        afterEach(() => {
            // Restore the original implementation after each test
            mockPost.mockRestore();
        });

        it("should send an SMS message successfully", async () => {
            // Define test parameters
            const params = {
                senderId: "HellioSMS",
                msisdn: "233242813656",
                message: "Hello, this is a test message from the Hellio Messaging NodeJs package.",
            };

            // Mock the successful API response
            mockPost.mockResolvedValueOnce({
                // data is not nested under a data property in the original code when returning response.data
                success: true,
                messageId: "some-message-id",
            });

            // Call the sendSMS function
            const result = await hellioMessaging.sendSMS(params);

            // Assert that the result is successful
            expect(result.success).toBe(true);
            expect(result.messageId).toBe("some-message-id");
        });

        it("should return an error for invalid parameters", async () => {
            // Define test parameters with invalid values
            const params = {
                senderId: "",
                msisdn: "INVALID_PHONE_NUMBER",
                message: "",
            };

            // Mock the error API response
            // The original code uses Promise.reject(error.response.data)
            mockPost.mockRejectedValueOnce({
                success: false,
                error: "Invalid parameters",
            });

            // Call the sendSMS function
            const result = await hellioMessaging.sendSMS(params);

            // Assert that the result contains an error
            expect(result.success).toBe(false);
            expect(result.error).toBe("Invalid parameters");
        });
    });

    describe("sendOTP", () => {
        it("should send an OTP successfully", async () => {
            // Define test parameters
            const params = {
                mobile_number: "233242813656",
                timeout: 600,
                message: "Your OTP code is: 123456",
                senderId: "HellioSMS",
                tokenlength: 6,
                recipient_email: "test@example.com",
                messageType: 0,
            };

            // Call the sendOTP method
            const result = await hellioMessaging.sendOTP(params);

            // Assert that the result is not undefined
            expect(result).toBeTruthy();
        });

        it("should return an error for invalid parameters", async () => {
            // Define test parameters with invalid values
            const params = {
                mobile_number: "",
                timeout: 0,
                message: "",
                senderId: "",
                tokenlength: 0,
                recipient_email: "",
                messageType: 2,
            };

            // Call the sendOTP method
            const result = await hellioMessaging.sendOTP(params);

            // Assert that the result contains an error
            expect(result).toBeTruthy();
            expect(result.error).toBeDefined();
        });
    });

    describe("verifyOTP", () => {
        it("should verify the OTP successfully", async () => {
            // Define test parameters
            const params = {
                mobile_number: "233242813656",
                otp: "123456",
            };

            // Call the verifyOTP method
            const result = await hellioMessaging.verifyOTP(params);

            // Assert that the result is not undefined
            expect(result).toBeTruthy();
        });

        it("should return an error for invalid parameters", async () => {
            // Define test parameters with invalid values
            const params = {
                mobile_number: "",
                otp: "",
            };

            // Call the verifyOTP method
            const result = await hellioMessaging.verifyOTP(params);

            // Assert that the result contains an error
            expect(result).toBeTruthy();
            expect(result.error).toBeDefined();
        });
    });

    describe("numberLookup", () => {
        it("should perform a number lookup successfully", async () => {
            // Define test parameters
            const params = {
                msisdn: "233242813656",
                reference: "Campaign123",
            };

            // Call the numberLookup method
            const result = await hellioMessaging.numberLookup(params);

            // Assert that the result is not undefined
            expect(result).toBeTruthy();
        });

        it("should return an error for invalid parameters", async () => {
            // Define test parameters with invalid values
            const params = {
                msisdn: "",
                reference: "",
            };

            // Call the numberLookup method
            const result = await hellioMessaging.numberLookup(params);

            // Assert that the result contains an error
            expect(result).toBeTruthy();
            expect(result.error).toBeDefined();
        });
    });

    describe("getRoutingPrice", () => {
        it("should get the routing price successfully", async () => {
            // Define test parameters
            const params = {
                country_code: "GH",
                service_name: "sms",
            };

            // Call the getRoutingPrice method
            const result = await hellioMessaging.getRoutingPrice(params);

            // Assert that the result is not undefined
            expect(result).toBeTruthy();
        });

        it("should return an error for invalid parameters", async () => {
            // Define test parameters with invalid values
            const params = {
                country_code: "",
                service_name: "",
            };

            // Call the getRoutingPrice method
            const result = await hellioMessaging.getRoutingPrice(params);

            // Assert that the result contains an error
            expect(result).toBeTruthy();
            expect(result.error).toBeDefined();
        });
    });

    describe("checkDeliveryReport", () => {
        it("should check the delivery report successfully", async () => {
            // Define test parameters
            const params = {
                startDate: "2022-01-01",
                endDate: "2022-01-31",
                senderId: "HellioSMS",
                deliveryStatus: "delivered",
            };

            // Call the checkDeliveryReport method
            const result = await hellioMessaging.checkDeliveryReport(params);

            // Assert that the result is not undefined
            expect(result).toBeTruthy();
        });

        it("should return an error for invalid parameters", async () => {
            // Define test parameters with invalid values
            const params = {
                startDate: "",
                endDate: "",
                senderId: "",
                deliveryStatus: "",
            };

            // Call the checkDeliveryReport method
            const result = await hellioMessaging.checkDeliveryReport(params);

            // Assert that the result contains an error
            expect(result).toBeTruthy();
            expect(result.error).toBeDefined();
        });
    });

    describe("checkBalance", () => {
        it("should check the account balance successfully", async () => {
            // Call the checkBalance method
            const balance = await hellioMessaging.checkBalance();

            // Assert that the balance response is defined and has a valid format
            expect(balance).toBeDefined();
            expect(balance.responseCode).toBe(200);
            expect(Array.isArray(balance.message)).toBe(true);
            expect(balance.message.length > 0).toBe(true);

            // Extract the new_bal and currency values
            const { new_bal: newBal, currency } = balance.message[0];

            // Assert that the new_bal and currency are defined and numeric
            expect(newBal).toBeDefined();
            expect(currency).toBeDefined();
            expect(typeof newBal).toBe("string");
            expect(typeof currency).toBe("string");

            // Convert the new_bal to a numeric value for further assertions
            const numericBal = parseFloat(newBal);

            // Assert that the numericBal is a valid number
            expect(typeof numericBal).toBe("number");
            expect(!isNaN(numericBal)).toBe(true);
        });
    });
});
