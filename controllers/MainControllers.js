const axios = require("axios");
const ProcessData = async (req, res) => {
  try {
    console.log("---------------- got request --------------------------");
    console.log(req.body);
    console.log("---------------- got request --------------------------");
    axios
      .post(
        "https://script.google.com/macros/s/AKfycbzO4pL6HQLCVgg1v3fBWFPiOBJ8f9NjGzzQNWKgCjacilky_5N_XSNSbR1IBrh6p1eu/exec?gid=1774646088",
        req.body
      )
      .then((res) => {
        console.log(
          "--------------------------- data added in sheet ---------------------------"
        );
        console.log(res.data);
        console.log(
          "--------------------------- data added in sheet ---------------------------"
        );
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });

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
