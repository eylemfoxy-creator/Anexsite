export type SiteLang = "EN" | "DE" | "TR" | "RU" | "ZH";
export type ChatSender = "visitor" | "operator";

export type PublicMessage = {
  id: string;
  sender: ChatSender;
  text: string;
  originalText?: string;
  originalLang: SiteLang;
  translationStatus: string;
  createdAt: string;
};

export type OperatorRoom = {
  id: string;
  visitorLang: SiteLang;
  updatedAt: string;
  lastMessage: string | null;
};
