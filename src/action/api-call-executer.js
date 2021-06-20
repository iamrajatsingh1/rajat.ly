import axios from "axios";

export const apiCall = (config) => {
  return new Promise((resolve, reject) => {
    axios
      .request(config)
      .then((result) => {
        resolve(result);
      })
      .catch((e) => {
        return reject(e);
      });
  });
};
