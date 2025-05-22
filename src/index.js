const axios = require("axios");
const moment = require("moment");
const sha1 = require("sha1");

class HellioMessaging {
    constructor(options) {
        this.clientId = options.clientId;
        this.applicationSecret = options.applicationSecret;
        this.version = options.version || 2;
        this.baseURL = options.baseURL || "https://api.helliomessaging.com";
        this.api = axios.create({
            baseURL: this.baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    //Authenticate yourself on the Hellio Messaging platform
    getAuthToken() {
        const utcMoment = moment.utc();
        const currentDateTime = utcMoment.format("YYYYMMDDHH");
        const hashedAuthKey = sha1(this.clientId + this.applicationSecret + currentDateTime);
        return hashedAuthKey;
    }

    //Send SMS
    sendSMS(params) {
        const endpoint = "/v2/sms";

        const payload = {
            clientId: this.clientId,
            authKey: this.getAuthToken(),
            senderId: params.senderId,
            msisdn: params.msisdn,
            message: params.message,
        };

        return this.api
            .post(endpoint, payload)
            .then((response) => response.data)
            .catch((error) => Promise.reject(error.response.data));
    }

    //Send Otp
    sendOTP(params) {
        const endpoint = "/v3/otp/send";

        const payload = {
            mobile_number: params.mobile_number,
            timeout: params.timeout,
            message: params.message,
            senderId: params.senderId,
            tokenlength: params.tokenlength,
            recipient_email: params.recipient_email,
            messageType: params.messageType,
        };

        return this.api
            .post(endpoint, payload)
            .then((response) => response.data)
            .catch((error) => Promise.reject(error.response.data));
    }

    //Verify otp codes
    verifyOTP(params) {
        const endpoint = "/v3/otp/verify";

        const payload = {
            mobile_number: params.mobile_number,
            otp: params.otp,
        };

        return this.api
            .post(endpoint, payload)
            .then((response) => response.data)
            .catch((error) => Promise.reject(error.response.data));
    }

    //Perform a number lookup request
    numberLookup(params) {
        const endpoint = "/v1/hlr/request";

        const payload = {
            msisdn: params.msisdn,
            reference: params.reference,
        };

        return this.api
            .post(endpoint, payload)
            .then((response) => response.data)
            .catch((error) => Promise.reject(error.response.data));
    }

    // Get the routing price for SMS and Voice
    getRoutingPrice(params) {
        const endpoint = "/v1/route/pricing";

        const queryParams = {
            country_code: params.country_code,
            service_name: params.service_name,
        };

        return this.api
            .get(endpoint, { params: queryParams })
            .then((response) => response.data)
            .catch((error) => Promise.reject(error.response.data));
    }

    //Get delivery report logs
    checkDeliveryReport(params) {
        const endpoint = "v1/delivery-logs";

        const queryParams = {
            startDate: params.startDate,
            endDate: params.endDate,
            senderId: params.senderId,
            deliveryStatus: params.deliveryStatus,
        };

        return this.api
            .get(endpoint, { params: queryParams })
            .then((response) => response.data)
            .catch((error) => Promise.reject(error.response.data));
    }

    //Check your Hellio Messaging account balance
    checkBalance() {
        const endpoint = "/v1/credit-balance";

        return this.api
            .get(endpoint)
            .then((response) => response.data.balance)
            .catch((error) => Promise.reject(error.response.data));
    }
}

module.exports = HellioMessaging;
