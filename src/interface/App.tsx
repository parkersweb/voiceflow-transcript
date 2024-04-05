import { h, Fragment, JSX } from "preact";
import { useState, useEffect, useCallback } from "preact/hooks";
import dayjs from "dayjs";
import pMemoize from "p-memoize";
import { useSettings } from "./Settings";
import {
  Button,
  Columns,
  Container,
  Stack,
  Dropdown,
  Text,
  Textbox,
  useForm,
  RadioButtons,
  RadioButtonsOption,
  IconWarning32,
} from "@create-figma-plugin/ui";
import HelpModal from "@/interface/HelpModal";
import SettingsModal from "@/interface/SettingsModal";
import bannerImage from "@/assets/banner.svg";
import { emit } from "@create-figma-plugin/utilities";
import styles from "./App.module.css";
import {
  ISettings,
  TTranscriptMode,
  ITranscriptRequestForm,
  IDropdownOption,
} from "@/types/app";
import { CloseHandler, CreateTranscriptHandler } from "@/types/events";
import { ITranscript } from "@/types/transcript";

const App = () => {
  const { settings } = useSettings();
  const [helpModal, setHelpModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [settingsModal, setSettingsModal] = useState<boolean>(false);

  const radioOptions: Array<RadioButtonsOption> = [
    {
      children: <Text>Transcript ID</Text>,
      value: "custom",
    },
    {
      children: <Text>Recent transcript</Text>,
      value: "recent",
    },
  ];

  const dropdownDefault = [{ value: "", text: "Select recent transcript" }];
  const { disabled, formState, handleSubmit, initialFocus, setFormState } =
    useForm<ITranscriptRequestForm>(
      {
        transcriptMode: "custom",
        transcriptID: "",
        dropdownOptions: dropdownDefault,
        disabled: false,
      },
      {
        submit: function (formState: ITranscriptRequestForm) {
          emit<CreateTranscriptHandler>(
            "CREATE_TRANSCRIPT",
            formState,
            settings
          );
        },

        validate: function (formState: ITranscriptRequestForm): boolean {
          return formState.transcriptID != "";
        },
        close: function () {
          emit<CloseHandler>("CLOSE");
        },
      }
    );

  const handleValueInput = useCallback(
    function (transcriptID: string) {
      setFormState(transcriptID, "transcriptID");
    },
    [setFormState]
  );
  const handleRadioChange = useCallback(
    function (mode: TTranscriptMode) {
      if (mode !== formState.transcriptMode) {
        setFormState("", "transcriptID");
      }
      setFormState(mode, "transcriptMode");
    },
    [setFormState]
  );

  const handleSaveSettingsClick = () => {
    setFormState(dropdownDefault, "dropdownOptions");
    setError("");
    setSettingsModal(false);
  };

  const handleDropdownChange = useCallback(
    function (event: JSX.TargetedEvent<HTMLInputElement>) {
      setFormState(event.currentTarget.value, "transcriptID");
    },
    [setFormState]
  );

  useEffect(() => {
    settings && fetchRecent(settings);
  }, [settings]);

  const fetchRecent = pMemoize(async (settings: ISettings) => {
    const { apiKey, projectID } = settings;
    if (apiKey == null || projectID == null)
      throw Error("Missing API credentials");
    try {
      const response = await fetch(
        `https://api.voiceflow.com/v2/transcripts/${projectID}`,
        {
          headers: {
            authorization: apiKey!,
            accept: "application/json",
          },
        }
      );
      const recent = await response.json();
      if (recent.message) {
        setError(recent.message);
      } else {
        const recentTranscripts: IDropdownOption[] = recent.map(
          (item: ITranscript) => {
            const date = dayjs(item.createdAt);
            return {
              value: item._id,
              text: `${date.format("ddd DD MMM YYYY")} - ${item.name}`,
            };
          }
        );
        setFormState(
          [...dropdownDefault, ...recentTranscripts],
          "dropdownOptions"
        );
      }
    } catch (error) {
      setError(
        "Please update your settings with a valid Voiceflow API key and Project ID"
      );
    }
  });

  return (
    <Fragment>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <span className={styles.bannerCaption}>Voiceflow</span>
          <h1>Transcript Creator</h1>
        </div>
        <img src={bannerImage} className={styles.bannerImage} />
      </div>
      <div className={styles.controls}>
        <button
          onClick={() => setSettingsModal(true)}
          className={styles.controlButton}
        >
          Voiceflow Settings
        </button>
        <button
          onClick={() => setHelpModal(true)}
          className={styles.controlButton}
        >
          Help
        </button>
      </div>

      <Container space="medium" className={styles.container}>
        <Stack space="medium">
          {error && (
            <div className={styles.error}>
              <IconWarning32 />
              <Text style={{ color: "currentColor" }}>{error}</Text>
            </div>
          )}
          <Text>
            Fetch either a specific transcript using the ID, or a recently
            created one:
          </Text>
          <RadioButtons
            options={radioOptions}
            onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              handleRadioChange(e.currentTarget.value as TTranscriptMode)
            }
            value={formState.transcriptMode}
          />
          {formState.transcriptMode == "custom" && (
            <Stack space="medium">
              <Text>Enter Transcript ID</Text>
              <Textbox
                {...initialFocus}
                onValueInput={handleValueInput}
                variant="border"
                placeholder="00000000000000"
                value={formState.transcriptID}
              />
            </Stack>
          )}
          {formState.transcriptMode == "recent" && (
            <Stack space="medium">
              <Text>Select recent transcript</Text>
              <Dropdown
                value={formState.transcriptID}
                options={formState.dropdownOptions}
                onChange={handleDropdownChange}
                variant="border"
              />
            </Stack>
          )}
          <Columns space="extraSmall">
            <Button disabled={disabled === true} onClick={handleSubmit}>
              Create
            </Button>
          </Columns>
        </Stack>
      </Container>
      <SettingsModal
        handleSave={handleSaveSettingsClick}
        handleClose={() => setSettingsModal(false)}
        isOpen={settingsModal}
      />
      <HelpModal handleClose={() => setHelpModal(false)} isOpen={helpModal} />
    </Fragment>
  );
};

export default App;
