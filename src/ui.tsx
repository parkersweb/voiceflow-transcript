import App from "@/interface/App";
import { render } from "@create-figma-plugin/ui";
import { SettingsContextProvider } from "./interface/Settings";
import { h } from "preact";
import { VFTranscriptProps } from "./types/app";

const Plugin = (props: VFTranscriptProps) => (
  <SettingsContextProvider storedSettings={props.storedSettings}>
    <App />
  </SettingsContextProvider>
);

export default render(Plugin);
