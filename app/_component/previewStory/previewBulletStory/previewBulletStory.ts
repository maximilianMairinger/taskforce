import PreviewStory from "../previewStory"
import declareComponent from "../../../lib/declareComponent"

export default class PreviewBulletStory extends PreviewStory {

  constructor() {
    super()


  }

  stl() {
    return require("./previewBulletStory.css")
  }
  pug() {
    return require("./previewBulletStory.pug")
  }
}

declareComponent("preview-bullet-story", PreviewBulletStory)
