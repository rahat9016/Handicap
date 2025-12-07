/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsClient } from '@/lib/analytics-client';
import { ReferrerDetection } from '@/lib/reffer-detection';


export const useAnalytics = () => {
    const pathname = usePathname();
    const sessionEnded = useRef(false);
    const sessionId = useRef<string>('');
    const pageViewStartTime = useRef<number>(0);
    const currentPage = useRef<string>('');

    // Generate unique session ID
    const generateSessionId = useCallback(() => {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }, []);

    // Helper functions
    const getUserId = useCallback((): number | null => {
        if (typeof window === 'undefined') return null;
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData).id : null;
    }, []);

    const getOrganizationId = useCallback((): number | null => {
        if (typeof window === 'undefined') return null;
        const orgData = localStorage.getItem('organization');
        return orgData ? JSON.parse(orgData).id : null;
    }, []);

    // Start session
    const startSession = useCallback(async (): Promise<boolean> => {
        if (sessionId.current) return true;

        sessionId.current = generateSessionId();

        const sessionData = {
            sessionId: sessionId.current,
            userAgent: navigator.userAgent,
            referrer: ReferrerDetection.getValidReferrer(), // ← Use the utility
            landingPage: window.location.href,
            userId: getUserId(),
            organizationId: getOrganizationId(),
        };

        try {
            await analyticsClient.trackSession(sessionData);
            console.log('✅ Analytics session started:', sessionId.current);
            return true;
        } catch (error) {
            console.error('❌ Failed to track session:', error);
            sessionId.current = '';
            return false;
        }
    }, [generateSessionId, getUserId, getOrganizationId]);

    // Track page view
    const trackPageView = useCallback(async (pageUrl: string, pageTitle: string) => {
        console.log('Tracking page view for:', pageTitle);
        // Ensure session exists
        if (!sessionId.current) {
           await startSession();
        }

        if (currentPage.current) {
             const timeOnPage = Date.now() - pageViewStartTime.current;
            const pageViewData = {
                pageUrl: currentPage.current,
                pageTitle: document.title,
                referrer: ReferrerDetection.getValidReferrer(),
                  timeOnPage: Math.floor(timeOnPage / 1000),
                isBounce: timeOnPage < 10,
                organizationId: getOrganizationId() || undefined,
            };

            try {
                await analyticsClient.trackPageView(sessionId.current, pageViewData);
                console.log('✅ Page view tracked:', currentPage.current);
            } catch (error) {
                // Type guard to check if it's an Error
                if (error instanceof Error) {
                    console.error('❌ Failed to track page view:', error.message);

                    // If session not found, create new one
                    if (error.message.includes('Session not found')) {
                        console.log('🔄 Session lost, creating new one...');
                        sessionId.current = '';
                        await startSession();
                    }
                } else {
                    console.error('❌ Unknown error tracking page view:', error);
                }
            }
        }

        // Update for next page view
        ReferrerDetection.updatePreviousPage(); // ← Update session storage
        currentPage.current = pageUrl;
        pageViewStartTime.current = Date.now();
    }, [startSession, getOrganizationId]);

    // End session
    const endSession = useCallback(async () => {
        if (sessionEnded.current || !sessionId.current) return;
        sessionEnded.current = true;
        if (!sessionId.current) return;

        // Track final page view
        if (currentPage.current) {
            const timeOnPage = Math.floor((Date.now() - pageViewStartTime.current) / 1000);
            const pageViewData = {
                pageUrl: currentPage.current,
                pageTitle: document.title,
                referrer: ReferrerDetection.getValidReferrer(),
                timeOnPage,
                isBounce: timeOnPage < 10,
                organizationId: getOrganizationId() || undefined,
            };

            try {
                await analyticsClient.trackPageView(sessionId.current, pageViewData);
            } catch (error) {
                console.error('Failed to track final page view:', error);
            }
        }

        try {
            await analyticsClient.endSession(sessionId.current);
            console.log('✅ Analytics session ended:', sessionId.current);
            ReferrerDetection.clearPreviousPage(); // ← Clean up
            sessionId.current = '';
            currentPage.current = '';
        } catch (error) {
            console.error('Failed to end session:', error);
        }
    }, [getOrganizationId]);

    // Initialize analytics
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const initializeAnalytics = async () => {
            await startSession();
            trackPageView(window.location.href, document.title);
        };

        initializeAnalytics();

        // Handle page visibility changes
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                const timeOnPage = Math.floor((Date.now() - pageViewStartTime.current) / 1000);
                console.log('Page hidden, time on page:', timeOnPage);
                // Could send beacon here for accurate time tracking
            } else {
                pageViewStartTime.current = Date.now();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('beforeunload', endSession);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('beforeunload', endSession);
            endSession();
        };
    }, [startSession, trackPageView, endSession]);

    // Handle route changes (Next.js App Router)
    useEffect(() => {
        if (pathname !== currentPage.current) {

            trackPageView(window.location.href, document.title);
        }
    }, [pathname]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (!sessionEnded.current) {
                endSession();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [endSession]);

    return {
        sessionId: sessionId.current,
        trackPageView,
        endSession,
        startSession,
        debug: ReferrerDetection.debugReferrer, // ← Expose debug function
    };
};