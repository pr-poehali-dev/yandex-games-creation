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
      className="bg-white/90 hover:bg-white"
    >
      <Icon name={isMusicPlaying ? 'Volume2' : 'VolumeX'} size={24} />
    </Button>
  );
}
