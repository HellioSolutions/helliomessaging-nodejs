const HellioMessaging = require('../src/index');

describe('HellioMessaging', () => {
  // Mock options for HellioMessaging instance
  const options = {
    clientId: '60556f0fd67db',
    applicationSecret: '1bc163c2aefd9382b6505a6c594922fe',
  };

  // Create a new HellioMessaging instance
  const hellioMessaging = new HellioMessaging(options);

  describe('sendOTP', () => {
    it('should send an OTP successfully', async () => {
      // Define test parameters
      const params = {
        mobile_number: '233242813656',
        timeout: 600,
        message: 'Your OTP code is: 123456',
        senderId: 'HellioSMS',
        tokenlength: 6,
        recipient_email: 'test@example.com',
        messageType: 0,
      };

      // Call the sendOTP method
      const result = await hellioMessaging.sendOTP(params);

      // Assert that the result is not undefined
      expect(result).toBeTruthy();
    });

    it('should return an error for invalid parameters', async () => {
      // Define test parameters with invalid values
      const params = {
        mobile_number: '',
        timeout: 0,
        message: '',
        senderId: '',
        tokenlength: 0,
        recipient_email: '',
        messageType: 2,
      };

      // Call the sendOTP method
      const result = await hellioMessaging.sendOTP(params);

      // Assert that the result contains an error
      expect(result).toBeTruthy();
      expect(result.error).toBeDefined();
    });
  });

  describe('verifyOTP', () => {
    it('should verify the OTP successfully', async () => {
      // Define test parameters
      const params = {
        mobile_number: '233242813656',
        otp: '123456',
      };

      // Call the verifyOTP method
      const result = await hellioMessaging.verifyOTP(params);

      // Assert that the result is not undefined
      expect(result).toBeTruthy();
    });

    it('should return an error for invalid parameters', async () => {
      // Define test parameters with invalid values
      const params = {
        mobile_number: '',
        otp: '',
      };

      // Call the verifyOTP method
      const result = await hellioMessaging.verifyOTP(params);

      // Assert that the result contains an error
      expect(result).toBeTruthy();
      expect(result.error).toBeDefined();
    });
  });

  describe('numberLookup', () => {
    it('should perform a number lookup successfully', async () => {
      // Define test parameters
      const params = {
        msisdn: '233242813656',
        reference: 'Campaign123',
      };

      // Call the numberLookup method
      const result = await hellioMessaging.numberLookup(params);

      // Assert that the result is not undefined
      expect(result).toBeTruthy();
    });

    it('should return an error for invalid parameters', async () => {
      // Define test parameters with invalid values
      const params = {
        msisdn: '',
        reference: '',
      };

      // Call the numberLookup method
      const result = await hellioMessaging.numberLookup(params);

      // Assert that the result contains an error
      expect(result).toBeTruthy();
      expect(result.error).toBeDefined();
    });
  });

  describe('getRoutingPrice', () => {
    it('should get the routing price successfully', async () => {
      // Define test parameters
      const params = {
        country_code: 'GH',
        service_name: 'sms',
      };

      // Call the getRoutingPrice method
      const result = await hellioMessaging.getRoutingPrice(params);

      // Assert that the result is not undefined
      expect(result).toBeTruthy();
    });

    it('should return an error for invalid parameters', async () => {
      // Define test parameters with invalid values
      const params = {
        country_code: '',
        service_name: '',
      };

      // Call the getRoutingPrice method
      const result = await hellioMessaging.getRoutingPrice(params);

      // Assert that the result contains an error
      expect(result).toBeTruthy();
      expect(result.error).toBeDefined();
    });
  });

  describe('checkDeliveryReport', () => {
    it('should check the delivery report successfully', async () => {
      // Define test parameters
      const params = {
        startDate: '2022-01-01',
        endDate: '2022-01-31',
        senderId: 'HellioSMS',
        deliveryStatus: 'delivered',
      };

      // Call the checkDeliveryReport method
      const result = await hellioMessaging.checkDeliveryReport(params);

      // Assert that the result is not undefined
      expect(result).toBeTruthy();
    });

    it('should return an error for invalid parameters', async () => {
      // Define test parameters with invalid values
      const params = {
        startDate: '',
        endDate: '',
        senderId: '',
        deliveryStatus: '',
      };

      // Call the checkDeliveryReport method
      const result = await hellioMessaging.checkDeliveryReport(params);

      // Assert that the result contains an error
      expect(result).toBeTruthy();
      expect(result.error).toBeDefined();
    });
  });

  describe('checkBalance', () => {
    it('should check the account balance successfully', async () => {
      // Call the checkBalance method
      const balance = await hellioMessaging.checkBalance();

      // Assert that the balance is a number
      expect(typeof balance).toBe('number');
    });
  });

  // Add more test cases for other methods...
});
