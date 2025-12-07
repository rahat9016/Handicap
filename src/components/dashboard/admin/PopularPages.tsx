// components/analytics/PopularPages.tsx

import { formatDuration, formatNumber, formatPercentage, getRouterTitle } from '@/utils/analytics';
import { Clock, ExternalLink, Eye, TrendingUp } from 'lucide-react';
import { PopularPagesProps } from './types/interface';

export const PopularPages: React.FC<PopularPagesProps> = ({ 
  popularPages, 
  maxItems = 5 
}) => {
  const topPages = popularPages?.slice(0, maxItems);

  const getPathFromUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname;
    } catch {
      return url;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Popular Pages</h3>
          <p className="text-sm text-gray-500">Top {maxItems} most visited pages</p>
        </div>
        <TrendingUp className="w-5 h-5 text-blue-600" />
      </div>

      {/* Pages List */}
      <div className="space-y-4">
        {topPages?.map((page, index) => (
          <div
            key={`${page.pageUrl}-${index}`}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-start space-x-4 flex-1 min-w-0">
              {/* Rank Badge */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                index === 0 ? 'bg-yellow/20 text-yellow' :
                index === 1 ? 'bg-gray/20 text-black' :
                index === 2 ? 'bg-orange-100 text-orange-800' :
                'bg-blue/20 text-blue'
              }`}>
                #{index + 1}
              </div>

              {/* Page Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-black truncate font-inter capitalize">
                      {/* {getPageName(page)} */}
                      {getRouterTitle(page.pageUrl)}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {getPathFromUrl(page.pageUrl)}
                    </p>
                  </div>
                  <a
                    href={page.pageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 ml-2 text-gray-400 hover:text-blue transition-colors"
                    title="Open page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Metrics */}
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {formatNumber(page.pageViews)} views
                    </span>
                  </div>
                  
                  {/* <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {formatNumber(page.uniqueVisitors)} unique
                    </span>
                  </div>
                   */}
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {formatDuration(page.averageTimeOnPage)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bounce Rate */}
            <div className="flex-shrink-0 ml-4 text-right">
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                page.bounceRate < 20 ? 'bg-green-100 text-green-800' :
                page.bounceRate < 40 ? 'bg-yellow-100 text-yellow-800' :
                page.bounceRate < 60 ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {formatPercentage(page.bounceRate)} bounce
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {popularPages && popularPages?.length > maxItems && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            And {popularPages.length - maxItems} more pages
          </p>
        </div>
      )}
    </div>
  );
};