import { EventHandler } from "@create-figma-plugin/utilities";
import { ISettings } from "@/types/app";
import { ITranscriptRequestForm } from "./app";

/* Config */

export interface EventConfigUpdate extends EventHandler {
  name: "CONFIG_UPDATE";
  handler: (config: ISettings) => void;
}

export interface EventConfigLoad extends EventHandler {
  name: "CONFIG_LOAD";
  handler: (config: ISettings) => void;
}

/* App */
export interface EventAppReady extends EventHandler {
  name: "APP_READY";
  handler: () => void;
}

export interface CreateTranscriptHandler extends EventHandler {
  name: "CREATE_TRANSCRIPT";
  handler: (formState: ITranscriptRequestForm, settings: ISettings) => void;
}

export interface UpdateDropdownHandler extends EventHandler {
  name: "UPDATE_DROPDOWN";
  handler: () => void;
}
export interface CloseHandler extends EventHandler {
  name: "CLOSE";
  handler: () => void;
}
