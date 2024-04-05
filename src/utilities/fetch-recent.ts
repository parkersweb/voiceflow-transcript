import { ISettings } from "@/types/app";
import pMemoize from "p-memoize";

export const fetchRecent = pMemoize(async (settings: ISettings) => {
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
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
});
