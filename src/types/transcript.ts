// In the absence of VF typescript definitions this is a rough approximation

// Used by the recent list
export interface ITranscript {
  _id: string;
  projectID: string;
  sessionID: string;
  browser: string;
  createdAt: string;
  creatorID: number;
  device: string;
  os: string;
  reportTags: [];
  unread: boolean;
  updatedAt: string;
  name: string;
  image: string;
}

// export type TTranscript = TAnyTranscriptItem[];

export type TAnyTranscriptItem =
  | ITranscriptEntityBlock
  | ITranscriptEntityChoice
  | ITranscriptEntityDebug
  | ITranscriptEntityRequest
  | ITranscriptEntityFlow
  | ITranscriptEntityText;

export type TRenderedTranscriptItem =
  | ITranscriptEntityText
  | ITranscriptEntityRequest;

export declare enum TranscriptEntityType {
  REQUEST = "request",
  TEXT = "text",
  DEBUG = "debug",
  BLOCK = "block",
  FLOW = "flow",
  CHOICE = "choice",
}

interface ITranscriptEntityCommon {
  turnID: string;
  startTime: string;
  format: "launch" | "request" | "trace";
}

export interface ITranscriptEntityText extends ITranscriptEntityCommon {
  type: TranscriptEntityType.TEXT;
  payload: ITextPayload;
}
export interface ITranscriptEntityRequest extends ITranscriptEntityCommon {
  type: TranscriptEntityType.REQUEST;
  payload: IIntentPayload | IButtonPayload;
}

export interface ITranscriptEntityDebug extends ITranscriptEntityCommon {
  type: TranscriptEntityType.DEBUG;
  payload: IDebugPayload;
}

export interface ITranscriptEntityBlock extends ITranscriptEntityCommon {
  type: TranscriptEntityType.BLOCK;
  payload: IBlockPayload;
}

export interface ITranscriptEntityChoice extends ITranscriptEntityCommon {
  type: TranscriptEntityType.CHOICE;
  payload: {
    type: "choice";
    payload: {
      buttons: IButtonCollection[];
    };
  };
}

export interface ITranscriptEntityFlow extends ITranscriptEntityCommon {
  type: TranscriptEntityType.FLOW;
  payload: IFlowPayload;
}

export interface IFlowPayload {
  type: "flow";
  payload: {
    diagramID: string;
  };
}

export interface IIntentPayload {
  type: "intent";
  payload: {
    confidence?: number;
    query: string;
    intent: Record<string, string>;
    entities: string[];
  };
}

export interface IButtonPayload {
  type: string;
  payload: {
    label: string;
    actions: string[];
  };
}

export interface IButtonCollection {
  name: string;
  request: IButtonPayload;
}

export interface ITextPayload {
  payload: {
    delay?: number | null;
    message: string | null;
    slate?: Slate;
  };
}

export interface IDebugPayload {
  type: "debug";
  payload: {
    type: string;
    message: string;
  };
}

export interface IBlockPayload {
  type: "block";
  payload: {
    blockID: string;
  };
}

export interface Slate {
  id: string;
  content?: ContentEntity[] | null;
  messageDelayMilliseconds: number;
}

export interface ContentEntity {
  children?: ChildrenEntity[] | null;
}

export interface ChildrenEntity {
  text: string;
}
