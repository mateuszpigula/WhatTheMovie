export type MessageFilter = {
  id: string;
  name: string;
  value: string;
};

export type MessageFiltersContextType = {
  messageFilters: MessageFilter[];
  filtersToText: string;
  addMessageFilter: (messageFilter: MessageFilter) => void;
  removeMessageFilter: (messageFilter: MessageFilter) => void;
  clearMessageFilters: () => void;
};
