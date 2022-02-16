import { Board, Slot } from "./models/board";

type SlotComplete = Slot & {slotId: string};

export function updateBoard(board: Board) {
  const boardContainer = document.querySelector<HTMLElement>('.board');
  const slots = slotsToArray(board);
  boardContainer.innerHTML = printSlots(slots);

  boardContainer.querySelectorAll('.board__item').forEach((el, i) => el.addEventListener('click', () => sendCommand(slots[i])));
}

function printSlots(slots: SlotComplete[]) {
  return slots.map(s => `<div class="board__item board__item_${s.state}">
  <div class="board__item-square" ${slotBackground(s)}>
    <div class="board__item-content" ${slotBackground(s, "image")}>
      ${slotContent(s)}
    </div>
  </div>
  </div>`)
      .join('');
}

function slotsToArray(board: Board) {
  return Object.entries(board.slots).map<SlotComplete>(entry => ({...entry[1], slotId: entry[0]}));
}

function slotBackground(slot: Slot, type: "color" | "image" = "color"): string {
  return (
    slot.state === "EMPTY"
    ? ""
    : (
      type === "color"
      ? `style="background-color: ${slot.button.color};"`
      : `style="background-image: url('${slot.button.icon}');"`
    )
  );
}

function slotContent(slot: Slot) {
  return (
    slot.state === "EMPTY"
      ? ""
      : `<span class="board__item-name">${slot.button.name}</span>`
  );
}

async function sendCommand(slot: SlotComplete) {
  if (slot.state === "FULL") {
    console.log(`Executtind command: ${slot.button.name}`);
  }
}
