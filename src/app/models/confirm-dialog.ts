export interface ConfirmDialog {
  title?: string;
  message?: string;
  cancelButtonText?: string;
  cancelButtonClass?: string;
  cancelButtonColor?: 'primary' | 'accent' | 'warn' | string;
  cancelButtonIcon?: string;

  confirmButtonText?: string;
  confirmButtonColor?: 'primary' | 'accent' | 'warn' | string;
  confirmButtonClass?: string;
  confirmButtonIcon?: string;

  showCloseButton?: boolean;
  showConfirmButton?: boolean;

  actionAlign?: 'start' | 'end' | 'center' ;
}
