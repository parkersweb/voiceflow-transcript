export interface ISettingsModalProps {
  /** function to be actioned when either internal close button is clicked*/
  handleClose: () => void;
  /** function to be actioned when the internal save button is clicked */
  handleSave: () => void;
  /** passing down open status from parent */
  isOpen: boolean;
}
