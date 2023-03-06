import { toast } from 'react-toastify';

export function showNotification(title: string, description?: string) {
  toast(title);
}

