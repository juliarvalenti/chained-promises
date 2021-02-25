const express = require("express");
const app = express();

app.get("/users", (req, res) => {
  res.send(["userid_1", "userid_2", "userid_3"]);
});

app.get("/user/:id([a-zA-Z0-9_]*)", (req, res) => {
  const userId = req.params.id;

  const idToDataMapper = {
    userid_1: {
      firstName: "John",
      lastName: "Doe",
      collegeId: "collegeid_1",
    },
    userid_2: {
      firstName: "Jane",
      lastName: "Doe",
      collegeId: "collegeid_2",
    },
    userid_3: {
      firstName: "Alice",
      lastName: "Doe",
      collegeId: "collegeid_3",
    },
  };

  const result = idToDataMapper[userId] || {};

  res.send(result);
});

app.get("/college/:id([a-zA-Z0-9_]*)", (req, res) => {
  const collegeId = req.params.id;

  const idToDataMapper = {
    collegeid_1: {
      name: "UMASS",
    },
    collegeid_2: {
      name: "SRU",
    },
    collegeid_3: {
      name: "CMU",
    },
  };

  const result = idToDataMapper[collegeId] || {};

  res.send(result);
});

app.listen(3000, () => console.log("App listening on port 3000"));
