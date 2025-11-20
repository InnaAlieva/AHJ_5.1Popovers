export default class Popover {
  constructor(container) {
    this.container = container;
    this.show = false;
  }

  init() {
    this.bindToDOM();
    this.buttonEl = this.container.querySelector(".popover_btn");
    this.buttonEl.addEventListener("click", (e) => {
      e.preventDefault();
      this.showTooltip();
    });
  }

  static get markUp() {
    return `
	<div class="tooltip hidden">
		<div class="tooltip_content">
			<h3 class="tooltip_title">Popover title</h3>
			<p class="tooltip_text">And here's some amazing content.It's very engaging.Right?</p>
		</div>
</div>
`;
  }

  get tooltip() {
    return this.container.querySelector(".tooltip");
  }

  bindToDOM() {
    this.container.insertAdjacentHTML("beforeend", this.constructor.markUp);
  }

  showTooltip() {
    this.tooltip.classList.toggle("hidden");
    this.show = !this.tooltip.classList.contains("hidden");
  }
}
