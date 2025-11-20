import Popover from "../Popover";

const container = document.createElement("div");
const popover = new Popover(container);
popover.bindToDOM();

test("bindToDOM enables markup DOM", () => {
  expect(popover.container.innerHTML).toEqual(Popover.markUp);
});

test("геттер возвращает елемент tooltip", () => {
  expect(popover.tooltip.classList.contains("tooltip")).toBeTruthy();
});

test("showTooltip меняет значение this.show при включении подсказки", () => {
  popover.showTooltip(document.createElement("div"));
  expect(popover.show).toBe(true);
});
