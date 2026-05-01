import SalonIcon from './SalonIcon';
import type { Settings } from '@/lib/types';

export default function WhatsAppFAB({ settings }: { settings: Settings }) {
  const whatsappNum = settings.whatsapp.replace(/\D/g, '');
  return (
    <a className="lm-fab" href={`https://wa.me/${whatsappNum}`} target="_blank" rel="noopener noreferrer">
      <SalonIcon name="whatsapp" size={20}/> Chat on WhatsApp
    </a>
  );
}
