import Component from "../component"
import declareComponent from "../../lib/declareComponent"
import PreviewTextStory from "../previewStory/previewTextStory/previewTextStory"
import PreviewBulletStory from "../previewStory/previewBulletStory/previewBulletStory"
import PreviewPictureStory from "../previewStory/previewPictureStory/previewPictureStory"
import PreviewStory from "../previewStory/previewStory"
import "./../../global"
import { Data } from "josm"
import * as htmlConverter from "html-to-image"
//@ts-ignore
import { saveAs } from 'file-saver';
import cajaon from "ajaon"
const ajaon = cajaon()




export default class Site extends Component {
  private storyKindSelect = this.q("#kind") as HTMLSelectElement
  private inputContainer = this.q("input-container")
  private previewContainer = this.q("preview-container", true)[0]
  private downLoadLocallyButton = this.q("#downloadLocally") as HTMLButtonElement
  private downLoadServerButton = this.q("#downloadServerSide") as HTMLButtonElement
  private exportContainer = this.q("export-container")

  private activateStoryKind: Function
  private previewKind: any
  constructor() {
    super()

    const previewKind: {[key in string]: PreviewStory} = this.previewKind = {
      text: new PreviewTextStory,
      bullet: new PreviewBulletStory,
      // img: new PreviewPictureStory
    }

    let inputs: {
      [x: string]: {
          kind: string;
          value?: Data<any, any>;
          description: string;
          array?: boolean;
          save?: boolean;
      };
    }

    let activeKind: string

    const activateStoryKind = this.activateStoryKind = (kind: string) => {
      const prevElem = previewKind[kind]
      activeKind = kind
      inputs = prevElem.inputs
      this.inputContainer.emptyNodes()
      this.previewContainer.emptyNodes()
      this.previewContainer.apd(prevElem)



      for (let name in inputs) {
        const input = inputs[name]

        

        this.inputContainer.apd(
          ce("b").text(name),
          ce("br"),
          ce("span").text(input.description),
          ce("br"),
        )

        
        const inputElemArray = ce("input-elem-array")
        function createInput() {
          
          if (input.kind === "text" || input.kind === "textarea") {
            let inputElem: any
            if (input.kind === "text") inputElem = ce("input")
            if (input.kind === "textarea") inputElem = ce("textarea")

            

            if (input.array) {
              inputElem.css("opacity", .3)

              

              mk(inputElem, undefined, true)

              

              
            }
            else {
              inputElem.on("input", (e) => {
                const val = inputElem.value
                input.value.set(val)
              })
              inputElem.value = input.value.get()
            }

            

            inputElemArray.apd(inputElem as any)
          }
          
          
        }

        function mk(inputElem = ce("textarea"), txt = "", init = false) {                
          inputElem.text(txt, false)
          inputElemArray.apd(inputElem)

          if (init) {
            let initSub = inputElem.on("input", () => {
              if (inputElem.value !== "") {
                initSub.deactivate()
                inputElem.css("opacity", 1)
                createInput()
              }
            })
          }

          

          inputElem.on("input", (e) => {
            const val = inputElem.value
            if (val === "") {
              
              if (inputElem.previousSibling) {
                //@ts-ignore
                inputElem.previousSibling.focus();
                //@ts-ignore
                (inputElem.previousSibling as HTMLInputElement).selectionStart = inputElem.previousSibling.value.length
              }
              else {
                if (inputElem.nextSibling) (inputElem.nextSibling as any).focus()
              }

              inputElem.remove()
            }
            let s = []
            inputElemArray.childs(1, true).ea((e: any) => {
              if (e.value) s.add(e.value)
            })
            input.value.set(JSON.stringify(s))
          })

          inputElem.on("keydown", (e: KeyboardEvent) => {

            if (e.key === "ArrowUp") {
              //@ts-ignore
              if (inputElem.previousSibling) inputElem.previousSibling.focus();
              (inputElem.previousSibling as any).selectionStart = (inputElem.previousSibling as any).value.length
              e.preventDefault()
            }
          })

          inputElem.on("keydown", (e: KeyboardEvent) => {

            if (e.key === "Enter" || e.key === "ArrowDown") {
              //@ts-ignore
              if (inputElem.nextSibling) inputElem.nextSibling.focus()
              e.preventDefault()
            }
          })
        }

        if (input.array) {
          let inp = JSON.parse(input.value.get())
          inp.ea((e) => {
            if (e) mk(undefined, e)
          })
        }
        

        createInput()

        

        this.inputContainer.apd(
          inputElemArray,
        )

        

        this.inputContainer.apd(
          ce("br"),
          ce("br")
        )

      }
    }

    activateStoryKind(this.storyKindSelect.value)



    this.storyKindSelect.on("change", () => {
      activateStoryKind(this.storyKindSelect.value)
    })



    this.downLoadLocallyButton.on("click", async () => {
      const preview = this.previewContainer.childs(1, true).first as PreviewStory
      this.downLoadLocallyButton.disabled = true
      let oriText = this.downLoadLocallyButton.text()
      this.downLoadLocallyButton.text("Downloading... This may take a while.")
      let dataUrl = await htmlConverter.toBlob(preview.componentBody, {
        pixelRatio: 1
      })
      saveAs(dataUrl, preview.inputs.Caption && preview.inputs.Caption.value.get() ? `story_${preview.inputs.Caption.value.get()}.png` : "story.png")
      this.downLoadLocallyButton.disabled = false
      this.downLoadLocallyButton.text(oriText)
    })


    this.downLoadServerButton.on("click", async () => {
      let oriText = this.downLoadServerButton.text()
      this.downLoadServerButton.text("Downloading... This may take a while.")
      this.downLoadServerButton.disabled = true

      let params = {kind: activeKind, vals: {}}
      let {vals} = params
      for (let name in inputs) {
        vals[name] = inputs[name].value.get()
      }
      let resp = await ajaon.post("render", params)
      let aElem = ce("a").html("Download")
      aElem.href = resp.resource
      aElem.download = "true"
      aElem.click()

      this.downLoadServerButton.disabled = false
      this.downLoadServerButton.text(oriText)
    })


  }

  stl() {
    return require("./site.css")
  }
  pug() {
    return require("./site.pug")
  }
}

declareComponent("site", Site)
