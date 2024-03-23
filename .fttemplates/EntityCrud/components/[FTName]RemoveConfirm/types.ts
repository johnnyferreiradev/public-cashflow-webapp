export interface Use[FTName]FormReturn {
  removeIsPeding: boolean;
  removeIsError: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

export interface [FTName]RemoveConfirmProps {
  className?: string;
  id: string;
  name: string;
  open: boolean;
  onClose: () => void;
}
