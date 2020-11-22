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
      // bullet: new PreviewBulletStory,
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

        if (input.array) {
          const inputElemArray = ce("input-elem-array")
          function createInput() {
            const inputElem = ce("input")
            
            let initSub = inputElem.on("change", () => {
              if (inputElem.value !== "") {
                initSub.deactivate()
                createInput()
              }
            })

            inputElem.on("change", () => {
              const val = inputElem.value
              if (val === "") {
                inputElem.remove()
              }
              let s = []
              inputElemArray.childs(1, true).ea((e: any) => {
                s.add(e.value)
              })
              input.value.set(JSON.stringify(s))
            })

            inputElemArray.apd(inputElem as any)
          }

          createInput()

          
  
          this.inputContainer.apd(
            inputElemArray,
          )
        }
        else {
          const inputElem = ce("input")
          inputElem.on("change", () => {
            input.value.set(inputElem.value)
          })
  
          this.inputContainer.apd(
            inputElem as any,
          )
        }

        

        this.inputContainer.apd(
          ce("br"),
          ce("br")
        )

      }
    }

    activateStoryKind("text")



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
