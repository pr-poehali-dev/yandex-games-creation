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
    <Card className="fixed top-20 right-4 z-40 p-6 w-80 animate-fade-in bg-black/90 border-2 border-orange-600 shadow-xl shadow-orange-600/30">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-400">
        <Icon name="BarChart3" size={20} />
        Статистика 🎃
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-orange-200">Всего тестов:</span>
          <span className="text-2xl font-bold text-orange-500">{totalTests}</span>
        </div>
        <div className="h-px bg-orange-700" />
        <div className="space-y-2">
          <div className="flex justify-between text-orange-100">
            <span>⛏️ Стив:</span>
            <span className="font-semibold">{steveCount}</span>
          </div>
          <div className="flex justify-between text-orange-100">
            <span>🗺️ Алекс:</span>
            <span className="font-semibold">{alexCount}</span>
          </div>
          <div className="flex justify-between text-orange-100">
            <span>💥 Крипер:</span>
            <span className="font-semibold">{creeperCount}</span>
          </div>
          <div className="flex justify-between text-orange-100">
            <span>🏘️ Житель:</span>
            <span className="font-semibold">{villagerCount}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}