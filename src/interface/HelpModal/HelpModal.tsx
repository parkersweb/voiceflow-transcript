import { h } from "preact";
import { Text, Container, Stack, Modal, Link } from "@create-figma-plugin/ui";
import styles from "./HelpModal.module.css";
import { IHelpModalProps } from "./HelpModal.definition";

const HelpModal = ({ handleClose, isOpen }: IHelpModalProps) => {
  return (
    <Modal title="Help" onCloseButtonClick={handleClose} open={isOpen}>
      <Container space="medium" className={styles.modalContent}>
        <Stack space="medium">
          <Text>
            You'll need a Voiceflow API key and a Project ID to fetch transcript
            information. Information on how to create an API key is provided{" "}
            <Link
              target="_blank"
              rel="noopener"
              href="https://developer.voiceflow.com/docs/step-1-get-api-key"
            >
              here
            </Link>
            . Information on where your project ID is located can be found{" "}
            <Link
              target="_blank"
              rel="noopener"
              href="https://learn.voiceflow.com/hc/en-us/articles/13619062205837-How-to-find-your-Assistant-version-ID-and-project-ID"
            >
              here
            </Link>
            .
          </Text>
          <Text>
            Transcripts can be created either using a specific transcript ID, or
            from a recent transcript:
          </Text>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong>Using a transcript ID</strong> - browse to the transcript
              you would like to use; the transcript ID is the last part of the
              URL i.e. <code>/project/[ID]/transcripts/[TRANSCRIPT_ID]</code>
            </li>
            <li className={styles.listItem}>
              <strong>Recent transcript</strong> - the dropdown shows some of
              the most recent transcripts from the project.
            </li>
          </ul>
        </Stack>
      </Container>
    </Modal>
  );
};

export default HelpModal;
