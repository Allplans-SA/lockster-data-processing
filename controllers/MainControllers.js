const axios = require("axios");
const { bloqitBaseUrl } = require("../utils/Baseurls");
const ProcessData = async (req, res) => {
  try {
    console.log("---------------- got request --------------------------");
    console.log(req.body);
    console.log("---------------- got request --------------------------");
    const data = req.body;
    if (data.customer) {
      const gettingCustomerDetails = await axios.get(
        `${bloqitBaseUrl}/customers/${data.customer}`,
        {
          headers: {
            "x-api-key":
              "Ygpm3+i4kd3mTHyM.YgdUVcf8fMmwQYHiSi8rtTZizU5yDedR2YQNeDgK/yk=",
          },
        }
      );
      data.customer = {
        _id: "--",
        createdAt: "--",
      };
      data.customer._id = gettingCustomerDetails._id;
      data.customer.createdAt = gettingCustomerDetails.createdAt;
    } else {
      data.customer = {
        _id: "--",
        createdAt: "--",
      };
    }
    const gettingRentDetails = await axios.get(
      `${bloqitBaseUrl}/rents/${data.rent}`,
      {
        headers: {
          "x-api-key":
            "Ygpm3+i4kd3mTHyM.YgdUVcf8fMmwQYHiSi8rtTZizU5yDedR2YQNeDgK/yk=",
        },
      }
    );
    data.rent = gettingRentDetails.data;

    delete data.actionInitiatedBy._id;
    delete data.actionInitiatedBy.source;
    delete data.rent.pricing;
    delete data.rent.customer;
    delete data.rent.externalID;
    delete data.rent.states;
    delete data.rent.pickUpNotificationSent;
    delete data.rent.dropOffNotificationSent;
    delete data.rent.notificationOptions;
    delete data.rent.unsuccessful;
    delete data.rent.promotion;
    if (data.rent.locker) {
      delete data.rent.locker.bloq._id;
      delete data.rent.locker.bloq.location;
      delete data.rent.locker.bloq.supports;
      delete data.rent.locker.bloq.objectDetection;
      delete data.rent.locker.bloq.lastDoorOpeningTimestamp;
      delete data.rent.locker.bloq.price;
      delete data.rent.locker.bloq.lockers;
      delete data.rent.locker.bloq.id;
    }
    delete data.rent.bloq;
    delete data.rent.details;
    delete data.codeName;
    delete data.description;
    console.log("-------------- final data ------------------");
    console.log(data);
    console.log("-------------- final data ------------------");
    const googleSheetResponse = await axios.post(
      "https://script.google.com/macros/s/AKfycbzO4pL6HQLCVgg1v3fBWFPiOBJ8f9NjGzzQNWKgCjacilky_5N_XSNSbR1IBrh6p1eu/exec?gid=1774646088",
      data
    );
    console.log(
      "------------------ response from google sheet ------------------------"
    );
    console.log(googleSheetResponse.data);
    console.log(
      "------------------ response from google sheet ------------------------"
    );
    res.status(200).json({
      msg: "Data Added",
      addedData: req.body,
    });
  } catch (e) {
    console.log(e);
    res.status(503).json({
      msg: "Something went wrong",
    });
  }
};

module.exports = {
  ProcessData,
};
