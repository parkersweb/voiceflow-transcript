const createBubble = (
  name: string,
  fill: SolidPaint,
  textColor: SolidPaint,
  alignment: "MIN" | "MAX",
  xPos?: number,
  yPos?: number
): ComponentNode => {
  const container = figma.createComponent();
  const bubble = figma.createFrame();
  const text = figma.createText();

  container.resize(375, 100);
  container.layoutMode = "HORIZONTAL";
  container.layoutSizingVertical = "HUG";
  container.layoutSizingHorizontal = "FIXED";
  container.primaryAxisAlignItems = alignment;
  container.paddingLeft = 16;
  container.paddingRight = 16;
  container.paddingTop = 8;
  container.x = xPos ?? 0;
  container.y = yPos ?? 0;

  container.appendChild(bubble);
  container.name = name;

  bubble.name = "bubble";
  bubble.layoutMode = "HORIZONTAL";
  bubble.layoutSizingVertical = "HUG";
  bubble.layoutSizingHorizontal = "HUG";
  bubble.paddingLeft = 16;
  bubble.paddingBottom = 12;
  bubble.paddingRight = 16;
  bubble.paddingTop = 12;
  bubble.cornerRadius = 10;

  bubble.fills = [fill];

  bubble.appendChild(text);

  text.fontName = {
    family: "Open Sans",
    style: "Regular",
  };
  text.characters = "Mesage";
  text.textAutoResize = "WIDTH_AND_HEIGHT";
  text.maxWidth = 248;
  text.layoutGrow = 1;
  text.fills = [textColor];

  return container;
};

export async function createMessageComponent() {
  const bubbleGray = figma.util.solidPaint("244,244,244");
  const bubbleBlue = figma.util.solidPaint("61, 129, 226");
  const inkDark = figma.util.solidPaint("19,33,68");
  const inkLight = figma.util.solidPaint("255, 255, 255");

  const botBubble = createBubble("Sender=Bot", bubbleGray, inkDark, "MIN");

  const meBubble = createBubble(
    "Sender=Human",
    bubbleBlue,
    inkLight,
    "MAX",
    botBubble.x,
    botBubble.y + botBubble.height + 20
  );

  const message: ComponentSetNode = figma.combineAsVariants(
    [botBubble, meBubble],
    figma.currentPage
  );

  message.name = "Voiceflow Transcript Bubble";
}
