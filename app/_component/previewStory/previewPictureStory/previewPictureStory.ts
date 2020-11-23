import PreviewStory from "../previewStory"
import declareComponent from "../../../lib/declareComponent"

export default class PreviewPictureStory extends PreviewStory {

  constructor() {
    super("PreviewPictureStory", {
      
    })


  }

  stl() {
    return require("./previewPictureStory.css")
  }
  pug() {
    return require("./previewPictureStory.pug")
  }
}

declareComponent("preview-picture-story", PreviewPictureStory)
