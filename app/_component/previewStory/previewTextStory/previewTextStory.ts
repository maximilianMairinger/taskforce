import PreviewStory from "../previewStory"
import declareComponent from "../../../lib/declareComponent"

export default class PreviewTextStory extends PreviewStory {

  constructor() {
    super()


  }

  stl() {
    return require("./previewTextStory.css")
  }
  pug() {
    return require("./previewTextStory.pug")
  }
}

declareComponent("preview-text-story", PreviewTextStory)
