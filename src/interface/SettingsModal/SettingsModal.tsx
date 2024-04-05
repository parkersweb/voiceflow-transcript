import { h } from "preact";
import { useState } from "preact/hooks";
import { useSettings } from "@/interface/Settings";
import {
  Button,
  Container,
  Modal,
  Stack,
  Text,
  Textbox,
} from "@create-figma-plugin/ui";
import styles from "./SettingsModal.module.css";
import { ISettings } from "@/types/app";
import { ISettingsModalProps } from "./SettingsModal.definition";

const SettingsModal = ({
  isOpen,
  handleClose,
  handleSave,
}: ISettingsModalProps) => {
  const { settings, updateSettings } = useSettings();
  const [settingsForm, setSettingsForm] = useState<ISettings>(settings);
  const handleProjectIDInput = (newValue: string) => {
    setSettingsForm(() => ({
      ...settingsForm,
      projectID: newValue,
    }));
  };
  const handleApiKeyInput = (newValue: string) => {
    setSettingsForm(() => ({
      ...settingsForm,
      apiKey: newValue,
    }));
  };
  const handleSaveSettingsClick = () => {
    updateSettings(settingsForm);
    handleSave();
  };

  const handleCloseSettingsClick = () => {
    setSettingsForm(() => settings);
    handleClose();
  };

  return (
    <Modal
      title="Voiceflow settings"
      onCloseButtonClick={handleCloseSettingsClick}
      open={isOpen}
    >
      <Container space="medium" className={styles.modalContent}>
        <Stack space="medium">
          <Text>API key</Text>
          <Textbox
            value={settingsForm.apiKey as string}
            onValueInput={handleApiKeyInput}
            variant="border"
          />
          <Text>Project ID</Text>
          <Textbox
            value={settingsForm.projectID as string}
            onValueInput={handleProjectIDInput}
            variant="border"
          />
          <div className={styles.actions}>
            <Button secondary onClick={handleCloseSettingsClick}>
              Cancel
            </Button>
            <Button onClick={handleSaveSettingsClick}>Save Settings</Button>
          </div>
        </Stack>
      </Container>
    </Modal>
  );
};

export default SettingsModal;
