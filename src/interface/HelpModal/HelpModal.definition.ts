export interface IHelpModalProps {
  /** function to handle the internal close action*/
  handleClose: () => void;
  /** passing down open status from parent */
  isOpen: boolean;
}
