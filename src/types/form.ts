export interface FormData {
  name: string;
  email: string;
  experience: string;
  github: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}
