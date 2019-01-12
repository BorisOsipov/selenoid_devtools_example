const puppeteer = require('puppeteer');
const axios = require("axios");

(async () => {
    try {
        const selenoidUrl = "10.20.12.138";
        const {data} = await axios.post(`http://${selenoidUrl}:4444/wd/hub/session`,
            {
                "desiredCapabilities":
                    {
                        browserName: "chrome",
                        "selenoid:options": {
                            sessionTimeout: '3m',
                            enableVnc: true
                        }

                    }
            });
        const sessionId = data.sessionId;

        console.log(`DevTools url ws://${selenoidUrl}:4444/devtools/${sessionId}`);
        const connect = await puppeteer.connect({browserWSEndpoint: `ws://${selenoidUrl}:4444/devtools/${sessionId}`});
        const page = await connect.newPage();
        await page.goto('https://example.com');
        await connect.close();
    } catch (e) {
        console.log("Error");
        console.log(e);
    }
})();
