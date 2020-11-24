import PreviewStory from "../previewStory"
import declareComponent from "../../../lib/declareComponent"

const anim = false

export default class PreviewBulletStory extends PreviewStory {

  constructor() {
    super("PreviewBulletStory", {
      Caption: {
        description: "The Caption that will be at the very top of the post. Best one word",
        kind: "text"
      },
      Summary: {
        description: "Short summary of the subject. 4 lines max",
        kind: "textarea"
      },
      Content: {
        description: "Bullet points",
        kind: "textarea",
        array: true
      }
    })

    const captionElement = this.q("#heading")
    this.inputs.Caption.value.get((s) => {
      captionElement.text(s || "Heading", anim)
    })
    
    const summaryElement = this.q("#summary")
    this.inputs.Summary.value.get((s) => {
      summaryElement.text(s || "This is an example summary. With 3 lines! Now I need to add just one more Line.", anim)
    })

    

    const contentElement = this.componentBody.childs("#allBullets", true)[0]

    this.inputs.Content.value.get((s) => {
      contentElement.emptyNodes()
      let html = ""
      JSON.parse(s).forEach((e) => {
        html += `<div class="bullet-container">
				<div class="text">
					<span>${e}</span>
				</div>
				<svg class="bullet">
					<ellipse fill="rgba(63,61,86,1)" id="Ellipse_24" rx="13.5" ry="13.5" cx="13.5" cy="13.5">
					</ellipse>
				</svg>
			</div>`
      }, true)

      contentElement.innerHTML = html
      
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
