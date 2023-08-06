import { useContext, createContext } from "react";
import { MessageFiltersContextType } from "./types";

export const MessageFiltersContext = createContext<MessageFiltersContextType>({
  messageFilters: [],
  filtersToText: "",
  addMessageFilter: () => {},
  removeMessageFilter: () => {},
  clearMessageFilters: () => {},
});

export const useMessageFilters = () => {
  const context = useContext(MessageFiltersContext);
  if (!context) {
    throw new Error("useMessageFilters must be used within a MessageFiltersProvider");
  }

  return context;
};
