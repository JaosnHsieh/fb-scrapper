import debounce from "lodash/debounce";
import config from "./config.js";
import puppeteer from "puppeteer";

const username = config.fb.username;
const password = config.fb.password;
/**
 * @param  {String || Number} fetchUserName - the facebook username or id numbers to scrape.
 * @param  { function(err, { id, name, userName, firendList }) } cb, A callback to run.
 */
const scrape = async (fetchUserName = "", cb) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-notifications"]
    });
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

    const parseHtml = debounce(async () => {
      try {
        const allInfo = await page.evaluate(() => {
          //get name and userName
          let ele = document.querySelector("#fb-timeline-cover-name");
          let name = ele.childNodes[0].innerText;
          let userName = /www.facebook.com\/(.*)/.exec(
            ele.childNodes[0].href
          )[1];

          //get userid
          let metaEle = document.querySelector(
            "meta[property='al:android:url']"
          );
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
        cb(null, allInfo);
        await browser.close();
      } catch (err) {
        cb(err);
      }
    }, 2000);

    page.on("response", res => {
      if (res._url.includes("AllFriendsAppCollectionPagelet")) {
        setTimeout(() => {
          scrollDown();
          parseHtml();
        }, 200);
      }
    });
    page.on("request", req => {
      if (req._url.includes("AllFriendsAppCollectionPagelet")) {
        setTimeout(() => {
          scrollDown();
          parseHtml();
        }, 200);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const pScrape = (fetchUserName = "", cb) => {
  return new Promise((resolve, reject) => {
    scrape(fetchUserName, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

export default pScrape;
