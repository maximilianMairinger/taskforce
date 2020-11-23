import Component from "../component"
import declareComponent from "../../lib/declareComponent"
import PreviewTextStory from "../previewStory/previewTextStory/previewTextStory"
import PreviewBulletStory from "../previewStory/previewBulletStory/previewBulletStory"
import PreviewPictureStory from "../previewStory/previewPictureStory/previewPictureStory"
import PreviewStory from "../previewStory/previewStory"
import "./../../global"



export default class Site extends Component {
  private storyKindSelect = this.q("#kind") as HTMLSelectElement
  private inputContainer = this.q("input-container")
  private previewContainer = this.q("preview-container")
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

            inputElem.value = input.value.get()

            if (input.array) {
              inputElem.css("opacity", .3)
              let initSub = inputElem.on("input", () => {
                if (inputElem.value !== "") {
                  initSub.deactivate()
                  inputElem.css("opacity", 1)
                  createInput()
                }
              })
  
              inputElem.on("input", (e) => {
                const val = inputElem.value
                if (val === "") {
                  inputElem.remove()
                }
                let s = []
                inputElemArray.childs(1, true).ea((e: any) => {
                  s.add(e.value)
                })
                input.value.set(s)
              })
  
              inputElem.on("keydown", (e: KeyboardEvent) => {
  
                if (e.key === "Enter") {
                  //@ts-ignore
                  if (inputElem.nextSibling) inputElem.nextSibling.focus()
                }
              })
            }
            else {
              inputElem.on("input", (e) => {
                const val = inputElem.value
                input.value.set(val)
              })
            }

            

            inputElemArray.apd(inputElem as any)
          }
          
          
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


  }

  stl() {
    return require("./site.css")
  }
  pug() {
    return require("./site.pug")
  }
}

declareComponent("site", Site)
