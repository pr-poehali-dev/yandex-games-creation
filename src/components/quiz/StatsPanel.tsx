import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface StatsPanelProps {
  totalTests: number;
  steveCount: number;
  alexCount: number;
  creeperCount: number;
  villagerCount: number;
}

export function StatsPanel({ totalTests, steveCount, alexCount, creeperCount, villagerCount }: StatsPanelProps) {
  return (
    <Card className="fixed top-20 right-4 z-40 p-6 w-80 animate-fade-in">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Icon name="BarChart3" size={20} />
        Статистика
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Всего тестов:</span>
          <span className="text-2xl font-bold text-primary">{totalTests}</span>
        </div>
        <div className="h-px bg-border" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>⛏️ Стив:</span>
            <span className="font-semibold">{steveCount}</span>
          </div>
          <div className="flex justify-between">
            <span>🗺️ Алекс:</span>
            <span className="font-semibold">{alexCount}</span>
          </div>
          <div className="flex justify-between">
            <span>💥 Крипер:</span>
            <span className="font-semibold">{creeperCount}</span>
          </div>
          <div className="flex justify-between">
            <span>🏘️ Житель:</span>
            <span className="font-semibold">{villagerCount}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
