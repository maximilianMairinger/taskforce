import PreviewStory from "../previewStory"
import declareComponent from "../../../lib/declareComponent"
import { Data } from "josm"


const anim = false

export default class PreviewTextStory extends PreviewStory {


  constructor() {
    super("PreviewTextStory", {
      Caption: {
        description: "The Caption that will be at the very top of the post. Best one word",
        kind: "text"
      },
      Summary: {
        description: "Short summary of the subject. 4 lines max",
        kind: "textarea"
      },
      Content: {
        description: "Full text",
        kind: "textarea"
      }
    })

    const captionElement = this.q("#heading")
    this.inputs.Caption.value.get((s) => {
      captionElement.text(s || "Heading", anim)
    })

    const summaryElement = this.q("#summary")
    this.inputs.summary.value.get((s) => {
      summaryElement.text(s || "This is an example summary. With 3 lines! Now I need to add just one more Line.", anim)
    })


    const contentElement = this.q("#content")
    this.inputs.Content.value.get((s) => {
      contentElement.text(s, anim)
    })



  }

  stl() {
    return require("./previewTextStory.css")
  }
  pug() {
    return require("./previewTextStory.pug")
  }
}

declareComponent("preview-text-story", PreviewTextStory)
