import PreviewStory from "../previewStory"
import declareComponent from "../../../lib/declareComponent"

export default class PreviewBulletStory extends PreviewStory {

  constructor() {
    super("PreviewBulletStory", {
      Caption: {
        description: "The Caption that will be at the very top of the post. Best one word",
        kind: "text"
      },
      Summery: {
        description: "Short summery of the subject. 4 lines max",
        kind: "textarea"
      },
      Content: {
        description: "Bullet points",
        kind: "textarea",
        array: true
      }
    })


  }

  stl() {
    return require("./previewBulletStory.css")
  }
  pug() {
    return require("./previewBulletStory.pug")
  }
}

declareComponent("preview-bullet-story", PreviewBulletStory)
