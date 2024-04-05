import { emit } from "@create-figma-plugin/utilities";
import { h, ComponentChildren, createContext } from "preact";
import { useState, useContext } from "preact/hooks";
import { EventConfigUpdate } from "@/types/events";
import { ISettings } from "@/types/app";

interface ISettingsContext {
  settings: ISettings;
  updateSettings: (newValue: ISettings) => void;
}
const SettingsContext = createContext<ISettingsContext | undefined>(undefined);

const SettingsContextProvider = (props: {
  storedSettings: ISettings;
  children: ComponentChildren;
}) => {
  const [settings, setSettings] = useState<ISettings>(props.storedSettings);
  const updateSettings = (newValue: ISettings) => {
    emit<EventConfigUpdate>("CONFIG_UPDATE", newValue);
    setSettings(newValue);
  };
  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => {
  const settingsContext = useContext(SettingsContext);
  if (settingsContext === undefined) {
    throw new Error("useStore must be used within a SettingsContextProvider");
  }
  return settingsContext;
};

export { SettingsContextProvider, useSettings };
