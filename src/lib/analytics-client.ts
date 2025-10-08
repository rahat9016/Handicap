import { getBaseUrl } from "@/config/envConfig";

// utils/analytics-client.ts
const API_BASE_URL = getBaseUrl();

interface CreateSessionRequest {
    sessionId: string;
    userAgent?: string;
    referrer?: string;
    landingPage: string;
    userId?: number | null; // ← Change to allow null
    organizationId?: number | null; // ← Change to allow null
}

interface CreatePageViewRequest {
    pageUrl: string;
    pageTitle?: string;
    referrer?: string;
    timeOnPage?: number;
    isBounce?: boolean;
    organizationId?: number | null; // ← Change to allow null
}

interface AnalyticsQuery {
    period?: string;
    startDate?: string;
    endDate?: string;
    organizationId?: number;
    deviceType?: string;
    country?: string;
    search?: string;
}

class AnalyticsClient {
    private async request(endpoint: string, options: RequestInit = {}) {
        const url = `${API_BASE_URL}${endpoint}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Analytics API request failed:', error);
            throw error;
        }
    }

    // Track Session
    async trackSession(sessionData: CreateSessionRequest) {
        return this.request('/analytics/session', {
            method: 'POST',
            body: JSON.stringify(sessionData),
        });
    }

    // Track Page View
    async trackPageView(sessionId: string, pageViewData: CreatePageViewRequest) {
        return this.request(`/analytics/page-view/${sessionId}`, {
            method: 'POST',
            body: JSON.stringify(pageViewData),
        });
    }

    // End Session
    async endSession(sessionId: string) {
        return this.request(`/analytics/session/${sessionId}/end`, {
            method: 'POST',
        });
    }

    // Get Analytics Summary (Protected - needs auth)
    async getAnalyticsSummary(query: AnalyticsQuery, token: string) {
        const params = new URLSearchParams();

        if (query.period) params.append('period', query.period);
        if (query.startDate) params.append('startDate', query.startDate);
        if (query.endDate) params.append('endDate', query.endDate);
        if (query.organizationId) params.append('organizationId', query.organizationId.toString());
        if (query.deviceType) params.append('deviceType', query.deviceType);
        if (query.country) params.append('country', query.country);
        if (query.search) params.append('search', query.search);

        return this.request(`/analytics/summary?${params.toString()}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }

    // Get Real-time Stats (Protected - needs auth)
    async getRealTimeStats(organizationId?: number, token?: string) {
        const params = new URLSearchParams();
        if (organizationId) params.append('organizationId', organizationId.toString());

        return this.request(`/analytics/real-time?${params.toString()}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }

    // Get Visitor History (Protected - needs auth)
    async getVisitorHistory(sessionId: string, token: string) {
        return this.request(`/analytics/visitor/${sessionId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }

    // Health Check
    async healthCheck() {
        return this.request('/analytics/health');
    }
}

export const analyticsClient = new AnalyticsClient();