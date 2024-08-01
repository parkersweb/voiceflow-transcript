import {
  ITranscriptEntityRequest,
  ITranscriptEntityText,
  TRenderedTranscriptItem,
} from "@/types/transcript";
import { createMessageComponent } from "./create-component";
import { formatSuccessMessage } from "@create-figma-plugin/utilities";

export async function createTranscript(
  transcriptItems: TRenderedTranscriptItem[],
  transcriptName: string
) {
  const noFill = figma.util.solidPaint("#00000000");

  const findMaster = () =>
    figma.currentPage.findOne(
      (node) =>
        node.type == "COMPONENT_SET" &&
        node.name == "Voiceflow Transcript Bubble"
    ) as ComponentSetNode;

  if (findMaster() == null) {
    await createMessageComponent();
  }
  const bubble = findMaster();
  const defaultVariant = bubble.defaultVariant as ComponentNode;

  const container = figma.createFrame();
  container.x = defaultVariant.x + defaultVariant.width + 30;
  container.resize(375, 500);
  container.layoutMode = "VERTICAL";
  container.fills = [noFill];
  container.layoutSizingVertical = "HUG";
  container.name = `Transcript ID: ${transcriptName}`;
  transcriptItems.map(
    (item: ITranscriptEntityRequest | ITranscriptEntityText, index: number) => {
      const msgText = (): string | undefined => {
        if (item.payload && item.payload.payload) {
          if (item.type === "text" && "message" in item.payload.payload) {
            return item.payload.payload.message ?? undefined;
          }
          if (item.type === "request") {
            if ("query" in item.payload.payload) {
              return item.payload.payload.query ?? undefined;
            }
            if ("label" in item.payload.payload) {
              return item.payload.payload.label ?? undefined;
            }
          }
        }
        return undefined;
      };

      if (msgText()) {
        console.log("blah");
        const bubbClone: InstanceNode = defaultVariant?.createInstance();
        const text = bubbClone.findOne(
          (node) => node.type == "TEXT"
        ) as TextNode;

        text.characters = msgText() as string;

        bubbClone.setProperties({
          Sender: item.type == "text" ? "Bot" : "Human",
        });
        container.appendChild(bubbClone);
        bubbClone.layoutSizingHorizontal = "FILL";
      }
    }
  );
  figma.closePlugin(
    formatSuccessMessage(`Transcript created for ID: ${transcriptName}`)
  );
}
