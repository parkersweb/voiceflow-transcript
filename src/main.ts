import {
  loadSettingsAsync,
  on,
  once,
  showUI,
  saveSettingsAsync,
  emit,
  formatErrorMessage,
} from "@create-figma-plugin/utilities";

import { defaultSettings } from "@/utilities/settings";
import { VF_CONFIG_NS } from "@/config/env";
import { ITranscriptRequestForm, ISettings } from "@/types/app";
import type * as T from "@/types/events";
import {
  TAnyTranscriptItem,
  TRenderedTranscriptItem,
} from "@/types/transcript";
import { createTranscript } from "./utilities/create-transcript";

export default async function (): Promise<void> {
  const storedSettings = await loadSettingsAsync(defaultSettings, VF_CONFIG_NS);

  once<T.CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });

  // Update config when changed from interface
  on<T.EventConfigUpdate>("CONFIG_UPDATE", (newConfig) => {
    saveSettingsAsync(newConfig, VF_CONFIG_NS);
  });

  once<T.CreateTranscriptHandler>(
    "CREATE_TRANSCRIPT",
    async function (formState: ITranscriptRequestForm, settings: ISettings) {
      const { transcriptID } = formState;
      console.log(`fetching ${transcriptID} from Voiceflow`);
      fetch(
        `https://api.voiceflow.com/v2/transcripts/${settings.projectID}/${transcriptID}`,
        {
          headers: {
            authorization: settings.apiKey as string,
            accept: "application/json",
          },
        }
      )
        .then((response) => {
          response.ok
            ? response.json().then((results: TAnyTranscriptItem[]) => {
                const transcriptItems = results.filter(
                  (item: TAnyTranscriptItem) =>
                    item.type == "text" || item.type == "request"
                );
                figma
                  .loadFontAsync({
                    family: "Open Sans",
                    style: "Regular",
                  })
                  .then(() =>
                    createTranscript(
                      transcriptItems as TRenderedTranscriptItem[],
                      transcriptID
                    )
                  );
              })
            : figma.closePlugin(
                formatErrorMessage(
                  `Unable to fetch transcript (error: ${response.status}). Check your settings are correct.`
                )
              );
        })
        .catch((error) => {
          figma.closePlugin(
            formatErrorMessage(`Unable to fetch transcript ${error}`)
          );
        });
    }
  );

  showUI(
    {
      height: 420,
      width: 380,
    },
    { storedSettings }
  );
}
