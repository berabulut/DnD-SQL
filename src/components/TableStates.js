import { Store } from "pullstate";

export const TableStates = new Store({
  isRightMenuOpen: false,
  selectedTableId: "",
  updateCanvas: false,
});