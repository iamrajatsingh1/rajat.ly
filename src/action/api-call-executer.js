// import $ from "jquery";
import axios from "axios";

export const apiCall = (config) => {
  return new Promise((resolve, reject) => {
    axios
      .request(config)
      .then((result) => {
        resolve(result);
      })
      .catch((e) => {
        // if (
        //   e &&
        //   e.response &&
        //   e.response.data &&
        //   e.response.data.isAuthenticated === false
        // ) {
        //   console.log(
        //     "Session has expired Please re-login"
        //     // 2000,
        //     // "error"
        //   );
        //   localStorage.removeItem("authToken");
        //   localStorage.removeItem("email");
        //   window.location.reload();
        // }

        return reject(e);
      });
    // switch (feature) {
    //   //   case "GOOGLE_ID_VERIFICATION": {
    //   //     $.ajax({
    //   //       url:
    //   //         "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" +
    //   //         config.id_token,
    //   //       type: "POST",
    //   //       success: function (resultData) {
    //   //         resolve(resultData);
    //   //       },
    //   //       error: function (jqXHR, textStatus, errorThrown) {
    //   //         reject(jqXHR);
    //   //       },
    //   //     });
    //   //     break;
    //   //   }

    //   default: {
    //     console.log(config);

    //   }
    // }
  });
};
