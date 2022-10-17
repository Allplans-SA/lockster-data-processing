const axios = require("axios");
const { bloqitBaseUrl } = require("../utils/Baseurls");
const ProcessData = async (req, res) => {
  try {
    console.log("---------------- got request --------------------------");
    console.log(req.body);
    console.log("---------------- got request --------------------------");
    const data = req.body;
    const gettingCustomerDetails = await axios.get(
      `${bloqitBaseUrl}/customers/${data.customer}`,
      {
        headers: {
          "x-api-key":
            "Ygpm3+i4kd3mTHyM.YgdUVcf8fMmwQYHiSi8rtTZizU5yDedR2YQNeDgK/yk=",
        },
      }
    );
    // data.customer = gettingCustomerDetails;
    const gettingRentDetails = await axios.get(
      `${bloqitBaseUrl}/rents/${data.rent}`,
      {
        headers: {
          "x-api-key":
            "Ygpm3+i4kd3mTHyM.YgdUVcf8fMmwQYHiSi8rtTZizU5yDedR2YQNeDgK/yk=",
        },
      }
    );
    console.log({ gettingCustomerDetails, gettingRentDetails });
    // data.rent = gettingRentDetails;
    const googleSheetResponse = await axios.post(
      "https://script.google.com/macros/s/AKfycbzO4pL6HQLCVgg1v3fBWFPiOBJ8f9NjGzzQNWKgCjacilky_5N_XSNSbR1IBrh6p1eu/exec?gid=1774646088",
      req.data
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
