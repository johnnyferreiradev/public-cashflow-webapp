export interface UseCashFlowActiveConfirmReturn {
  handleClose: () => void;
  handleConfirm: (id: string) => void;
  confirmIsPending: boolean;
}

export interface CashFlowActiveConfirmProps {
  className?: string;
  id: string;
  open: boolean;
  onClose: () => void;
}
