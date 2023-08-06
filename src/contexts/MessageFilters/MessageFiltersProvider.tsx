"use client";

import { useMemo, useState } from "react";
import { MessageFiltersContext } from "./MessageFilters";
import { MessageFilter } from "./types";

interface Props {
  children: React.ReactNode;
}

export const MessageFiltersProvider = ({ children }: Props) => {
  const [messageFilters, setMessageFilters] = useState<MessageFilter[]>([
    {
      id: "language",
      value: "English",
      name: "Language",
    },
    {
      id: "genre",
      value: "Sci-Fi",
      name: "Genre",
    },
  ]);

  const addMessageFilter = (messageFilter: MessageFilter) => {
    setMessageFilters([...messageFilters, messageFilter]);
  };

  const removeMessageFilter = (messageFilter: MessageFilter) => {
    setMessageFilters(messageFilters.filter((filter) => filter.id !== messageFilter.id));
  };

  const clearMessageFilters = () => {
    setMessageFilters([]);
  };

  const filtersToText = useMemo(() => {
    return messageFilters.map((filter) => filter.value).join(", ");
  }, [messageFilters]);

  const value = useMemo(
    () => ({
      messageFilters,
      filtersToText,
      addMessageFilter,
      removeMessageFilter,
      clearMessageFilters,
    }),

    [messageFilters, addMessageFilter, removeMessageFilter, clearMessageFilters],
  );

  return <MessageFiltersContext.Provider value={value}>{children}</MessageFiltersContext.Provider>;
};
