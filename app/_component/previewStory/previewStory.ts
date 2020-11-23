import Component from "../component"
import declareComponent from "../../lib/declareComponent"
import { Data } from "josm"
import createLocalSettings from "./../../lib/localSettings"


export default abstract class PreviewStory extends Component {
  constructor(previewName: string, public inputs: {[key in string]: {kind: string, value?: Data<any>, description: string, array?: boolean, save?: boolean}}) {
    super()

    const ob: any = {}
    for (let name in inputs) {
      const input = inputs[name]

      if (input.save === undefined || input.save) {
        if (input.array) {
          ob[name] = "[]"
        }
        else {
          ob[name] = ""
        }
        
      }
    }
    
    const store = createLocalSettings(previewName, ob as {[name in string]: string})
    for (let name in inputs) {
      const input = inputs[name]
      
      if (input.save === undefined || input.save) {
        input.value = store[name]
      }
    }

  }

  stl() {
    return require("./previewStory.css")
  }
  pug() {
    return require("./previewStory.pug")
  }
}

