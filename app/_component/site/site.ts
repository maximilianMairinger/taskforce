import Component from "../component"
import declareComponent from "../../lib/declareComponent"
import PreviewTextStory from "../previewStory/previewTextStory/previewTextStory"
import PreviewBulletStory from "../previewStory/previewBulletStory/previewBulletStory"
import PreviewPictureStory from "../previewStory/previewPictureStory/previewPictureStory"
import PreviewStory from "../previewStory/previewStory"
import "./../../global"
import * as htmlConverter from "html-to-image"




export default class Site extends Component {
  private storyKindSelect = this.q("#kind") as HTMLSelectElement
  private inputContainer = this.q("input-container")
  private previewContainer = this.q("preview-container", true)[0]
  private downLoadButton = this.q("#download") as HTMLButtonElement
  constructor() {
    super()

    const previewKind: {[key in string]: PreviewStory} = {
      text: new PreviewTextStory,
      bullet: new PreviewBulletStory,
      // img: new PreviewPictureStory
    }

    const activateStoryKind = (kind: string) => {
      const prevElem = previewKind[kind]
      const inputs = prevElem.inputs
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

    activateStoryKind("bullet")



    this.storyKindSelect.on("change", () => {
      activateStoryKind(this.storyKindSelect.value)
    })



    this.downLoadButton.on("click", async () => {
      const preview = this.previewContainer.childs(1, true).first
      this.downLoadButton.disabled = true
      this.downLoadButton.text("Downloading... This may take a while.")
      let dataUrl = await htmlConverter.toPng(preview.componentBody, {
        
      })
      this.downLoadButton.disabled = false
      this.downLoadButton.text("Download")

      let img = ce("img")
      img.src = dataUrl
      this.q("export-container").apd(img as any)
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
