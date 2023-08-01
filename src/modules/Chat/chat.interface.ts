interface ChatMessageBasic {
  id: string;
  from: "bot" | "user";
  type?: "text" | "image";
}

interface ChatMessageText extends ChatMessageBasic {
  type: "text";
  content: string;
}

export interface ChatMessageImage {
  src: string;
  alt: string;
}

export interface ChatMessageImages extends ChatMessageBasic {
  type: "image";
  images: Array<ChatMessageImage>;
}

export type ChatMessage = ChatMessageText | ChatMessageImages;
