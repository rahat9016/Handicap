// components/analytics/OverviewCards.tsx

import { 
  formatNumber, 
  formatDuration, 
  formatPercentage 
} from '@/utils/analytics';
import { StatCard } from './StatCard';

// Lucide React Icons
import { 
  Users, 
  Eye, 
  UserCheck, 
  UserCog, 
  Clock, 
  TrendingDown,
  UserPlus,
  Circle,
  Hexagon,
  Square,
  Triangle
} from 'lucide-react';
import { Overview } from './types/interface';

interface OverviewCardsProps {
  data?: Overview;
  className?: string;
}

// Shape components for background
const CircleShape = () => <Circle className="w-full h-full text-blue-100 opacity-60" />;
const HexagonShape = () => <Hexagon className="w-full h-full text-green-100 opacity-60" />;
const SquareShape = () => <Square className="w-full h-full text-purple-100 opacity-60" />;
const TriangleShape = () => <Triangle className="w-full h-full text-orange-100 opacity-60" />;

export const OverviewCards: React.FC<OverviewCardsProps> = ({ 
  data, 
  className = '' 
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {/* Total Visitors */}
      <StatCard
        title="Total Visitors"
        value={formatNumber(data?.totalVisitors ?? 0)}
        icon={<Users className="w-8 h-8" />}
        description="All time visitors"
        shape={<CircleShape />}
      />

      {/* Total Page Views */}
      <StatCard
        title="Page Views"
        value={formatNumber(data?.totalPageViews  ?? 0)}
        icon={<Eye className="w-8 h-8" />}
        description="Total pages viewed"
        shape={<HexagonShape />}
      />

      {/* Unique Visitors */}
      <StatCard
        title="Unique Visitors"
        value={formatNumber(data?.uniqueVisitors  ?? 0)}
        icon={<UserCheck className="w-8 h-8" />}
        description="First-time visitors"
        shape={<SquareShape />}
      />

      {/* Returning Visitors */}
      <StatCard
        title="Returning Visitors"
        value={formatNumber(data?.returningVisitors  ?? 0)}
        icon={<UserCog className="w-8 h-8" />}
        description="Repeat visitors"
        shape={<TriangleShape />}
      />

      {/* Average Session Duration */}
      <StatCard
        title="Avg. Session"
        value={formatDuration(data?.averageSessionDuration  ?? 0)}
        icon={<Clock className="w-8 h-8" />}
        description="Average visit duration"
        shape={<CircleShape />}
      />

      {/* Bounce Rate */}
      <StatCard
        title="Bounce Rate"
        value={formatPercentage(data?.bounceRate  ?? 0)}
        icon={<TrendingDown className="w-8 h-8" />}
        description="Single-page sessions"
        shape={<HexagonShape />}
      />

      {/* New Visitors */}
      <StatCard
        title="New Visitors"
        value={formatNumber(data?.newVisitors  ?? 0)}
        icon={<UserPlus className="w-8 h-8" />}
        description="First-time visits"
        shape={<SquareShape />}
      />
    </div>
  );
};