import setup from "./setup"
const puppeteer = require("puppeteer")
import fs from "fs"
import path from "path"
import stream from "stream"
// import puppeteer from "puppeteer"


const app = setup()

app.post("/render", async (req, res) => {
  if (!fs.existsSync("public/out")) {
    fs.mkdirSync("public/out")
  }



  console.log("start img download")
  let vals = req.body.vals


  const pup = await puppeteer.launch()
  const page = await pup.newPage()
  await page.setViewport({ width: 3840, height: 2160});


  await page.goto('http://127.0.0.1:' + await app.port);

  await page.evaluateHandle(`let site = document.querySelector("body > c-site")
  site.activateStoryKind("${req.body.kind}")
  let inputs = site.previewKind.${req.body.kind}.inputs
  let vals = JSON.parse(${JSON.stringify(JSON.stringify(vals))})
  for (v in vals) {
    inputs[v].value.set(vals[v])
  }
  `);
  
  const elem = await page.evaluateHandle(`let elem = document.querySelector("body > c-site").shadowRoot.querySelector("component-body > letter-container > preview-container")
  elem.style.position = "absolute";
  elem.style.top = "-500px";
  elem
  `);

  await page.evaluateHandle(`let zoomy = document.querySelector("body > c-site").shadowRoot.querySelector("component-body > letter-container > preview-container > *");
  zoomy.style.zoom = .5;
  `);

  const clip = await elem.boundingBox();
  clip.height -= 3
  await page.screenshot({path: 'public/out/img.png', clip})
  
  await pup.close()


  console.log("done")
  res.send({resource: "/out/img.png"})
})
