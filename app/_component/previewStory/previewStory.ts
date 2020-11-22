import Component from "../component"
import declareComponent from "../../lib/declareComponent"

export default abstract class PreviewStory extends Component {

  constructor() {
    super()


  }

  stl() {
    return require("./previewStory.css")
  }
  pug() {
    return require("./previewStory.pug")
  }
}

