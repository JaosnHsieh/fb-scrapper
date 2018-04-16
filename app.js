import debounce from "lodash/debounce";
import config from "./config.js";
const puppeteer = require("puppeteer");

const username = config.fb.username;
const password = config.fb.password;
const fetchUserName = "";

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        "--disable-notifications" // Disables the Web Notification and the Push APIs. ↪
      ]
    }); // default is true
    const page = await browser.newPage();
    await page.goto("https://www.facebook.com");
    const eleUsername = await page.$("input#email");
    await eleUsername.type(username);
    const elePass = await page.$("input#pass");
    await elePass.type(password);
    const loginButton = await page.$("#loginbutton");
    await loginButton.click();

    await page.waitForNavigation({
      waitUntil: "domcontentloaded"
    });
    const friendsListUrl = `https://www.facebook.com/${fetchUserName}/friends`;
    await page.goto(friendsListUrl);

    let scrollDown = async function() {
      await page.evaluate(_ => {
        window.scrollTo(0, document.body.scrollHeight);
      });
    };
    scrollDown();

    const writeHtml = debounce(async () => {
      console.log("debounce function!!");

      const allInfo = await page.evaluate(() => {
        //get name and userName
        let ele = document.querySelector("#fb-timeline-cover-name");
        let name = ele.childNodes[0].innerText;
        let userName = /www.facebook.com\/(.*)/.exec(ele.childNodes[0].href)[1];

        //get userid
        let metaEle = document.querySelector("meta[property='al:android:url']");
        let profileUrl = metaEle.getAttribute("content");
        let id = /fb:\/\/profile\/(.*)/.exec(profileUrl)[1];

        //get friends list
        let divs = document.querySelectorAll(
          "#pagelet_timeline_medley_friends div.fsl.fwb.fcb"
        );
        let firendList = [];
        for (div of divs) {
          firendList.push({
            name: div.innerText,
            id: /id=(\d*)/.exec(div.childNodes[0].dataset.hovercard)[1]
          });
        }

        return {
          id,
          name,
          userName,
          firendList
        };
      });
      console.log(allInfo, "allInfo");
    }, 100);

    page.on("response", res => {
      if (res._url.includes("AllFriendsAppCollectionPagelet")) {
        // console.log(res._url);
        setTimeout(() => {
          scrollDown();
          writeHtml();
        }, 200);
      }
    });
    page.on("request", req => {
      if (req._url.includes("AllFriendsAppCollectionPagelet")) {
        setTimeout(() => {
          scrollDown();
          writeHtml();
        }, 200);
      }
    });

    // console.log("Dimensions:", dimensions);
  } catch (err) {
    console.log("err...", err);
  }
})();
