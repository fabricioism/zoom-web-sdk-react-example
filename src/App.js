import React, { useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk";

let apiKeys = {
  apiKey: "KEzy71WiQuSXVitQbvuDRw",
  apiSecret: "uFzhieJtm1qD7XDkOGgYY4C16voID6fHVpwt",
};
let meetConfig = {
  apiKey: apiKeys.apiKey,
  meetingNumber: "77718272051",
  userName: "Example",
  userEmail: "example@example.com", // must be the attendee email address
  passWord: "ekdNMkpFTi9sYnNIQjBlU1FYRGNUZz09",
  role: 0,
};

function App() {
  function joinMeeting(signature, meetConfig) {
    ZoomMtg.init({
      leaveUrl: "https://zoom.us/",
      isSupportAV: true,
      success: function (success) {
        console.log("Init Success ", success);
        ZoomMtg.join({
          meetingNumber: meetConfig.meetingNumber,
          userName: meetConfig.userName,
          signature: signature,
          apiKey: meetConfig.apiKey,
          passWord: meetConfig.passWord,

          success: (success) => {
            console.log(success);
          },

          error: (error) => {
            console.log(error);
          },
        });
      },
    });
  }
  useEffect(() => {
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.1/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();

    /**
     * You should not visible api secret key on frontend
     * Signature must be generated on server
     * https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature
     */
    ZoomMtg.generateSignature({
      meetingNumber: meetConfig.meetingNumber,
      apiKey: meetConfig.apiKey,
      apiSecret: apiKeys.apiSecret,
      role: meetConfig.role,
      success: function (res) {
        console.log("res", res);

        setTimeout(() => {
          joinMeeting(res.result, meetConfig);
        }, 1000);
      },
    });
  }, []);

  return <div className="App">Zoom Testing</div>;
}

export default App;
