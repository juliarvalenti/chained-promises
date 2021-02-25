const axios = require("axios").default;
const { get } = axios;

function getUsersList() {
  return get("http://localhost:3000/users");
}

function getUser(id) {
  return get(`http://localhost:3000/user/${id}`);
}

function getCollege(id) {
  return get(`http://localhost:3000/college/${id}`);
}

function getUserWithCollege(userId) {
  return new Promise((resolve, reject) => {
    getUser(userId).then((userResp) => {
      const { data: user = {} } = userResp;

      getCollege(user.collegeId).then((collegeResp) => {
        const { data: college = {} } = collegeResp;

        resolve({
          name: `${user.firstName} ${user.lastName}`,
          college: college.name,
        });
      });
    });
  });
}

function getUsersListwithCollege() {
  return getUsersList().then((resp) => {
    const { data: userList = [] } = resp;
    const promises = userList.map((userId) => getUserWithCollege(userId));

    return Promise.all(promises);
  });
}

getUsersListwithCollege().then((resp) => console.log(resp));
