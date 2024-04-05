export interface ISettings {
  apiKey: string | null;
  projectID: string | null;
}
export interface IDropdownOption {
  disabled?: boolean;
  text?: string;
  value: string;
}

export type TTranscriptMode = "recent" | "custom";

export interface ITranscriptRequestForm {
  transcriptMode: TTranscriptMode;
  transcriptID: string;
  dropdownOptions: IDropdownOption[];
  disabled: boolean;
}

export type VFTranscriptProps = {
  storedSettings: ISettings;
};
