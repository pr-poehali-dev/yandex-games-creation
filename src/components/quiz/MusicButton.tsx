import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MusicButtonProps {
  isMusicPlaying: boolean;
  onToggle: () => void;
}

export function MusicButton({ isMusicPlaying, onToggle }: MusicButtonProps) {
  return (
    <Button
      onClick={onToggle}
      variant="outline"
      size="icon"
      className="bg-orange-950/90 hover:bg-orange-900 border-orange-600 text-orange-300 hover:text-orange-200"
    >
      <Icon name={isMusicPlaying ? 'Volume2' : 'VolumeX'} size={24} />
    </Button>
  );
}