// =============================================================================
// Tracker Data - Generated from .tracker/tracker.md
// =============================================================================

export type EpicStatus = 'not-started' | 'in-progress' | 'blocked' | 'complete';
export type TaskStatus = 'pending' | 'in-progress' | 'complete' | 'blocked';
export type TaskType = 'table' | 'endpoint' | 'service' | 'component' | 'test' | 'config';

export interface TrackerTask {
  id: string;
  type: TaskType;
  name: string;
  description?: string;
  status: TaskStatus;
  epic: string;
  category: string;
  // Detailed fields for drill-down
  filePath?: string;
  acceptanceCriteria?: string[];
  relatedTests?: string[];
  implementation?: string;
}

export interface EpicData {
  epicId: string;
  epicName: string;
  phase: 'Foundation' | 'MVP' | 'Growth';
  dependencies: string[];
  tasks: {
    tables: TrackerTask[];
    endpoints: TrackerTask[];
    services: TrackerTask[];
    components: TrackerTask[];
    tests: TrackerTask[];
    config: TrackerTask[];
  };
}

export interface RouteParam {
  name: string;
  type: string;
  required: boolean;
  description?: string;
}

export interface RouteData {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  epic: string;
  auth: boolean;
  status: TaskStatus;
  // Detailed fields for drill-down
  params?: RouteParam[];
  requestBody?: string;
  responseBody?: string;
  example?: string;
  relatedService?: string;
  relatedTest?: string;
}

// =============================================================================
// Epic Data
// =============================================================================

export const epicData: EpicData[] = [
  {
    epicId: 'epic-00',
    epicName: 'Foundation',
    phase: 'Foundation',
    dependencies: [],
    tasks: {
      tables: [
        { id: 'e00-t1', type: 'table', name: 'profiles', description: 'User profiles extending Supabase auth', status: 'pending', epic: 'epic-00', category: 'Database Tables' },
        { id: 'e00-t2', type: 'table', name: 'feature_flags', description: 'Feature flag system for gradual rollout', status: 'pending', epic: 'epic-00', category: 'Database Tables' },
        { id: 'e00-t3', type: 'table', name: 'admin_users', description: 'Admin permissions and access control', status: 'pending', epic: 'epic-00', category: 'Database Tables' },
        { id: 'e00-t4', type: 'table', name: 'analytics_events', description: 'Platform analytics tracking', status: 'pending', epic: 'epic-00', category: 'Database Tables' },
      ],
      endpoints: [
        { id: 'e00-e1', type: 'endpoint', name: 'GET /api/health', description: 'System health check', status: 'pending', epic: 'epic-00', category: 'API Endpoints' },
        { id: 'e00-e2', type: 'endpoint', name: 'GET /api/flags', description: 'Get feature flags for client', status: 'pending', epic: 'epic-00', category: 'API Endpoints' },
        { id: 'e00-e3', type: 'endpoint', name: 'POST /api/flags', description: 'Admin create/update flag', status: 'pending', epic: 'epic-00', category: 'API Endpoints' },
        { id: 'e00-e4', type: 'endpoint', name: 'GET /api/auth/session', description: 'Get current session', status: 'pending', epic: 'epic-00', category: 'API Endpoints' },
        { id: 'e00-e5', type: 'endpoint', name: 'POST /api/auth/signup', description: 'Phone/Email OTP signup', status: 'pending', epic: 'epic-00', category: 'API Endpoints' },
        { id: 'e00-e6', type: 'endpoint', name: 'POST /api/auth/verify', description: 'Verify OTP code', status: 'pending', epic: 'epic-00', category: 'API Endpoints' },
        { id: 'e00-e7', type: 'endpoint', name: 'POST /api/auth/logout', description: 'Sign out user', status: 'pending', epic: 'epic-00', category: 'API Endpoints' },
        { id: 'e00-e8', type: 'endpoint', name: 'POST /api/analytics/track', description: 'Track analytics event', status: 'pending', epic: 'epic-00', category: 'API Endpoints' },
      ],
      services: [
        { id: 'e00-s1', type: 'service', name: 'AuthService', description: 'Authentication flows (SMS, Email, OAuth)', status: 'pending', epic: 'epic-00', category: 'Services' },
        { id: 'e00-s2', type: 'service', name: 'FeatureFlagService', description: 'Feature flag management', status: 'pending', epic: 'epic-00', category: 'Services' },
        { id: 'e00-s3', type: 'service', name: 'AnalyticsService', description: 'Event tracking and analytics', status: 'pending', epic: 'epic-00', category: 'Services' },
        { id: 'e00-s4', type: 'service', name: 'LoggerService', description: 'Unified logging with Sentry', status: 'pending', epic: 'epic-00', category: 'Services' },
      ],
      components: [
        { id: 'e00-c1', type: 'component', name: 'AuthProvider', description: 'Authentication context provider', status: 'pending', epic: 'epic-00', category: 'Components' },
        { id: 'e00-c2', type: 'component', name: 'LoginForm', description: 'Phone/Email login UI', status: 'pending', epic: 'epic-00', category: 'Components' },
        { id: 'e00-c3', type: 'component', name: 'SignupForm', description: 'Registration flow', status: 'pending', epic: 'epic-00', category: 'Components' },
        { id: 'e00-c4', type: 'component', name: 'OTPInput', description: '6-digit code input', status: 'pending', epic: 'epic-00', category: 'Components' },
        { id: 'e00-c5', type: 'component', name: 'AdminLayout', description: 'Admin panel layout', status: 'pending', epic: 'epic-00', category: 'Components' },
        { id: 'e00-c6', type: 'component', name: 'FeatureFlagToggle', description: 'Flag management UI', status: 'pending', epic: 'epic-00', category: 'Components' },
      ],
      tests: [
        { id: 'e00-ts1', type: 'test', name: 'auth.test.ts', description: 'Authentication flow tests', status: 'pending', epic: 'epic-00', category: 'Tests' },
        { id: 'e00-ts2', type: 'test', name: 'feature-flags.test.ts', description: 'Feature flag service tests', status: 'pending', epic: 'epic-00', category: 'Tests' },
        { id: 'e00-ts3', type: 'test', name: 'analytics.test.ts', description: 'Analytics tracking tests', status: 'pending', epic: 'epic-00', category: 'Tests' },
        { id: 'e00-ts4', type: 'test', name: 'health.test.ts', description: 'Health check endpoint tests', status: 'pending', epic: 'epic-00', category: 'Tests' },
      ],
      config: [
        { id: 'e00-cfg1', type: 'config', name: 'Supabase setup', description: 'Supabase project setup', status: 'pending', epic: 'epic-00', category: 'Configuration' },
        { id: 'e00-cfg2', type: 'config', name: 'Vercel config', description: 'Vercel deployment config', status: 'pending', epic: 'epic-00', category: 'Configuration' },
        { id: 'e00-cfg3', type: 'config', name: 'Sentry setup', description: 'Sentry error tracking', status: 'pending', epic: 'epic-00', category: 'Configuration' },
        { id: 'e00-cfg4', type: 'config', name: 'GitHub Actions', description: 'CI/CD pipelines', status: 'pending', epic: 'epic-00', category: 'Configuration' },
        { id: 'e00-cfg5', type: 'config', name: 'Environment vars', description: 'Environment variables', status: 'pending', epic: 'epic-00', category: 'Configuration' },
      ],
    },
  },
  {
    epicId: 'epic-01',
    epicName: 'Mira',
    phase: 'MVP',
    dependencies: ['epic-00'],
    tasks: {
      tables: [
        { id: 'e01-t1', type: 'table', name: 'mira_interactions', description: 'Conversation history with Mira', status: 'pending', epic: 'epic-01', category: 'Database Tables' },
        { id: 'e01-t2', type: 'table', name: 'onboarding_state', description: 'User onboarding progress', status: 'pending', epic: 'epic-01', category: 'Database Tables' },
        { id: 'e01-t3', type: 'table', name: 'mira_prompts', description: 'Contextual prompt templates', status: 'pending', epic: 'epic-01', category: 'Database Tables' },
      ],
      endpoints: [
        { id: 'e01-e1', type: 'endpoint', name: 'GET /api/mira/greeting', description: 'Get personalized greeting', status: 'pending', epic: 'epic-01', category: 'API Endpoints' },
        { id: 'e01-e2', type: 'endpoint', name: 'POST /api/mira/chat', description: 'Send message to Mira', status: 'pending', epic: 'epic-01', category: 'API Endpoints' },
        { id: 'e01-e3', type: 'endpoint', name: 'GET /api/mira/context', description: 'Get user context for Mira', status: 'pending', epic: 'epic-01', category: 'API Endpoints' },
        { id: 'e01-e4', type: 'endpoint', name: 'POST /api/mira/prompt', description: 'Generate contextual prompt', status: 'pending', epic: 'epic-01', category: 'API Endpoints' },
        { id: 'e01-e5', type: 'endpoint', name: 'GET /api/onboarding/state', description: 'Get onboarding progress', status: 'pending', epic: 'epic-01', category: 'API Endpoints' },
        { id: 'e01-e6', type: 'endpoint', name: 'POST /api/onboarding/step', description: 'Complete onboarding step', status: 'pending', epic: 'epic-01', category: 'API Endpoints' },
        { id: 'e01-e7', type: 'endpoint', name: 'POST /api/onboarding/complete', description: 'Finish onboarding', status: 'pending', epic: 'epic-01', category: 'API Endpoints' },
      ],
      services: [
        { id: 'e01-s1', type: 'service', name: 'MiraService', description: 'AI conversation and prompts', status: 'pending', epic: 'epic-01', category: 'Services' },
        { id: 'e01-s2', type: 'service', name: 'OnboardingService', description: 'Onboarding flow management', status: 'pending', epic: 'epic-01', category: 'Services' },
        { id: 'e01-s3', type: 'service', name: 'MiraContextService', description: 'User context aggregation', status: 'pending', epic: 'epic-01', category: 'Services' },
        { id: 'e01-s4', type: 'service', name: 'ClaudeIntegration', description: 'Claude API integration', status: 'pending', epic: 'epic-01', category: 'Services' },
      ],
      components: [
        { id: 'e01-c1', type: 'component', name: 'MiraChat', description: 'Chat interface with Mira', status: 'pending', epic: 'epic-01', category: 'Components' },
        { id: 'e01-c2', type: 'component', name: 'MiraAvatar', description: 'Animated Mira avatar', status: 'pending', epic: 'epic-01', category: 'Components' },
        { id: 'e01-c3', type: 'component', name: 'MiraPromptCard', description: 'Contextual suggestion card', status: 'pending', epic: 'epic-01', category: 'Components' },
        { id: 'e01-c4', type: 'component', name: 'OnboardingFlow', description: 'Multi-step onboarding', status: 'pending', epic: 'epic-01', category: 'Components' },
        { id: 'e01-c5', type: 'component', name: 'OnboardingProgress', description: 'Progress indicator', status: 'pending', epic: 'epic-01', category: 'Components' },
        { id: 'e01-c6', type: 'component', name: 'WelcomeScreen', description: 'First-time user welcome', status: 'pending', epic: 'epic-01', category: 'Components' },
        { id: 'e01-c7', type: 'component', name: 'IntentionCapture', description: 'Capture user intentions', status: 'pending', epic: 'epic-01', category: 'Components' },
        { id: 'e01-c8', type: 'component', name: 'MicroPractice', description: '60-second breathwork', status: 'pending', epic: 'epic-01', category: 'Components' },
      ],
      tests: [
        { id: 'e01-ts1', type: 'test', name: 'mira-service.test.ts', description: 'Mira service tests', status: 'pending', epic: 'epic-01', category: 'Tests' },
        { id: 'e01-ts2', type: 'test', name: 'onboarding.test.ts', description: 'Onboarding flow tests', status: 'pending', epic: 'epic-01', category: 'Tests' },
        { id: 'e01-ts3', type: 'test', name: 'mira-chat.test.tsx', description: 'Chat component tests', status: 'pending', epic: 'epic-01', category: 'Tests' },
      ],
      config: [],
    },
  },
  {
    epicId: 'epic-1a',
    epicName: 'Crypto ($VIBES)',
    phase: 'MVP',
    dependencies: ['epic-00', 'epic-01'],
    tasks: {
      tables: [
        { id: 'e1a-t1', type: 'table', name: 'user_wallets', description: 'User crypto wallets', status: 'pending', epic: 'epic-1a', category: 'Database Tables' },
        { id: 'e1a-t2', type: 'table', name: 'crypto_transactions', description: 'Transaction history', status: 'pending', epic: 'epic-1a', category: 'Database Tables' },
        { id: 'e1a-t3', type: 'table', name: 'vibe_token_balances', description: '$VIBES token balances', status: 'pending', epic: 'epic-1a', category: 'Database Tables' },
        { id: 'e1a-t4', type: 'table', name: 'vibe_rewards', description: 'Reward distributions', status: 'pending', epic: 'epic-1a', category: 'Database Tables' },
        { id: 'e1a-t5', type: 'table', name: 'payment_requests', description: 'P2P payment requests', status: 'pending', epic: 'epic-1a', category: 'Database Tables' },
        { id: 'e1a-t6', type: 'table', name: 'stake_positions', description: 'Staking positions', status: 'pending', epic: 'epic-1a', category: 'Database Tables' },
        { id: 'e1a-t7', type: 'table', name: 'soul_bound_tokens', description: 'Non-transferable achievement tokens', status: 'pending', epic: 'epic-1a', category: 'Database Tables' },
        { id: 'e1a-t8', type: 'table', name: 'community_treasuries', description: 'Community treasury balances', status: 'pending', epic: 'epic-1a', category: 'Database Tables' },
      ],
      endpoints: [
        { id: 'e1a-e1', type: 'endpoint', name: 'POST /api/wallet/create', description: 'Create embedded wallet', status: 'pending', epic: 'epic-1a', category: 'API Endpoints' },
        { id: 'e1a-e2', type: 'endpoint', name: 'GET /api/wallet/balance', description: 'Get wallet balances', status: 'pending', epic: 'epic-1a', category: 'API Endpoints' },
        { id: 'e1a-e3', type: 'endpoint', name: 'GET /api/wallet/resolve/:handle', description: 'Resolve @handle to address', status: 'pending', epic: 'epic-1a', category: 'API Endpoints' },
        { id: 'e1a-e4', type: 'endpoint', name: 'POST /api/wallet/connect', description: 'Connect external wallet', status: 'pending', epic: 'epic-1a', category: 'API Endpoints' },
        { id: 'e1a-e5', type: 'endpoint', name: 'POST /api/payment/send', description: 'Send VIBES or USDC', status: 'pending', epic: 'epic-1a', category: 'API Endpoints' },
        { id: 'e1a-e6', type: 'endpoint', name: 'POST /api/payment/request', description: 'Create payment request', status: 'pending', epic: 'epic-1a', category: 'API Endpoints' },
        { id: 'e1a-e7', type: 'endpoint', name: 'GET /api/payment/requests', description: 'Get pending requests', status: 'pending', epic: 'epic-1a', category: 'API Endpoints' },
        { id: 'e1a-e8', type: 'endpoint', name: 'POST /api/vibes/award', description: 'Award VIBES reward', status: 'pending', epic: 'epic-1a', category: 'API Endpoints' },
        { id: 'e1a-e9', type: 'endpoint', name: 'GET /api/vibes/rewards', description: 'Get reward history', status: 'pending', epic: 'epic-1a', category: 'API Endpoints' },
        { id: 'e1a-e10', type: 'endpoint', name: 'POST /api/stake/create', description: 'Stake VIBES', status: 'pending', epic: 'epic-1a', category: 'API Endpoints' },
        { id: 'e1a-e11', type: 'endpoint', name: 'GET /api/stake/positions', description: 'Get staking positions', status: 'pending', epic: 'epic-1a', category: 'API Endpoints' },
      ],
      services: [
        { id: 'e1a-s1', type: 'service', name: 'CryptoRouterService', description: 'Main crypto operations', status: 'pending', epic: 'epic-1a', category: 'Services' },
        { id: 'e1a-s2', type: 'service', name: 'WalletService', description: 'Wallet management', status: 'pending', epic: 'epic-1a', category: 'Services' },
        { id: 'e1a-s3', type: 'service', name: 'PaymentService', description: 'Payment processing', status: 'pending', epic: 'epic-1a', category: 'Services' },
        { id: 'e1a-s4', type: 'service', name: 'RewardService', description: 'VIBES reward distribution', status: 'pending', epic: 'epic-1a', category: 'Services' },
        { id: 'e1a-s5', type: 'service', name: 'StakingService', description: 'Staking operations', status: 'pending', epic: 'epic-1a', category: 'Services' },
        { id: 'e1a-s6', type: 'service', name: 'HandleResolver', description: '@handle resolution', status: 'pending', epic: 'epic-1a', category: 'Services' },
      ],
      components: [
        { id: 'e1a-c1', type: 'component', name: 'WalletWidget', description: 'Wallet balance display', status: 'pending', epic: 'epic-1a', category: 'Components' },
        { id: 'e1a-c2', type: 'component', name: 'SendPayment', description: 'Payment send form', status: 'pending', epic: 'epic-1a', category: 'Components' },
        { id: 'e1a-c3', type: 'component', name: 'PaymentRequest', description: 'Request money UI', status: 'pending', epic: 'epic-1a', category: 'Components' },
        { id: 'e1a-c4', type: 'component', name: 'TransactionHistory', description: 'Transaction list', status: 'pending', epic: 'epic-1a', category: 'Components' },
        { id: 'e1a-c5', type: 'component', name: 'StakingPanel', description: 'Staking interface', status: 'pending', epic: 'epic-1a', category: 'Components' },
        { id: 'e1a-c6', type: 'component', name: 'RewardNotification', description: 'Reward earned toast', status: 'pending', epic: 'epic-1a', category: 'Components' },
        { id: 'e1a-c7', type: 'component', name: 'HandleInput', description: '@handle autocomplete', status: 'pending', epic: 'epic-1a', category: 'Components' },
      ],
      tests: [
        { id: 'e1a-ts1', type: 'test', name: 'wallet-service.test.ts', description: 'Wallet operations tests', status: 'pending', epic: 'epic-1a', category: 'Tests' },
        { id: 'e1a-ts2', type: 'test', name: 'payment-service.test.ts', description: 'Payment tests', status: 'pending', epic: 'epic-1a', category: 'Tests' },
        { id: 'e1a-ts3', type: 'test', name: 'staking.test.ts', description: 'Staking tests', status: 'pending', epic: 'epic-1a', category: 'Tests' },
        { id: 'e1a-ts4', type: 'test', name: 'handle-resolver.test.ts', description: 'Handle resolution tests', status: 'pending', epic: 'epic-1a', category: 'Tests' },
      ],
      config: [],
    },
  },
  {
    epicId: 'epic-1b',
    epicName: 'Karma',
    phase: 'MVP',
    dependencies: ['epic-00', 'epic-01'],
    tasks: {
      tables: [
        { id: 'e1b-t1', type: 'table', name: 'karma_scores', description: 'User karma totals and levels', status: 'pending', epic: 'epic-1b', category: 'Database Tables' },
        { id: 'e1b-t2', type: 'table', name: 'karma_actions', description: 'Individual karma-earning actions', status: 'pending', epic: 'epic-1b', category: 'Database Tables' },
        { id: 'e1b-t3', type: 'table', name: 'planetary_impact', description: 'Environmental impact tracking', status: 'pending', epic: 'epic-1b', category: 'Database Tables' },
        { id: 'e1b-t4', type: 'table', name: 'karma_badges', description: 'Achievement badges', status: 'pending', epic: 'epic-1b', category: 'Database Tables' },
        { id: 'e1b-t5', type: 'table', name: 'karma_leaderboards', description: 'Weekly/monthly rankings', status: 'pending', epic: 'epic-1b', category: 'Database Tables' },
      ],
      endpoints: [
        { id: 'e1b-e1', type: 'endpoint', name: 'POST /api/karma/award', description: 'Award karma points', status: 'pending', epic: 'epic-1b', category: 'API Endpoints' },
        { id: 'e1b-e2', type: 'endpoint', name: 'GET /api/karma/score', description: 'Get user karma score', status: 'pending', epic: 'epic-1b', category: 'API Endpoints' },
        { id: 'e1b-e3', type: 'endpoint', name: 'GET /api/karma/actions', description: 'Get karma action history', status: 'pending', epic: 'epic-1b', category: 'API Endpoints' },
        { id: 'e1b-e4', type: 'endpoint', name: 'GET /api/karma/badges', description: 'Get earned badges', status: 'pending', epic: 'epic-1b', category: 'API Endpoints' },
        { id: 'e1b-e5', type: 'endpoint', name: 'GET /api/karma/leaderboard', description: 'Get leaderboard', status: 'pending', epic: 'epic-1b', category: 'API Endpoints' },
        { id: 'e1b-e6', type: 'endpoint', name: 'GET /api/karma/planetary', description: 'Get planetary impact stats', status: 'pending', epic: 'epic-1b', category: 'API Endpoints' },
        { id: 'e1b-e7', type: 'endpoint', name: 'POST /api/karma/mint-badge', description: 'Mint badge as SBT', status: 'pending', epic: 'epic-1b', category: 'API Endpoints' },
      ],
      services: [
        { id: 'e1b-s1', type: 'service', name: 'KarmaRouterService', description: 'Main karma operations', status: 'pending', epic: 'epic-1b', category: 'Services' },
        { id: 'e1b-s2', type: 'service', name: 'KarmaCalculator', description: 'Points calculation', status: 'pending', epic: 'epic-1b', category: 'Services' },
        { id: 'e1b-s3', type: 'service', name: 'BadgeService', description: 'Badge awarding', status: 'pending', epic: 'epic-1b', category: 'Services' },
        { id: 'e1b-s4', type: 'service', name: 'LeaderboardService', description: 'Rankings calculation', status: 'pending', epic: 'epic-1b', category: 'Services' },
        { id: 'e1b-s5', type: 'service', name: 'PlanetaryService', description: 'Environmental impact', status: 'pending', epic: 'epic-1b', category: 'Services' },
      ],
      components: [
        { id: 'e1b-c1', type: 'component', name: 'KarmaScore', description: 'Score display widget', status: 'pending', epic: 'epic-1b', category: 'Components' },
        { id: 'e1b-c2', type: 'component', name: 'KarmaLevel', description: 'Level progress indicator', status: 'pending', epic: 'epic-1b', category: 'Components' },
        { id: 'e1b-c3', type: 'component', name: 'BadgeGrid', description: 'Earned badges display', status: 'pending', epic: 'epic-1b', category: 'Components' },
        { id: 'e1b-c4', type: 'component', name: 'LeaderboardList', description: 'Rankings list', status: 'pending', epic: 'epic-1b', category: 'Components' },
        { id: 'e1b-c5', type: 'component', name: 'PlanetaryImpact', description: 'Environmental stats', status: 'pending', epic: 'epic-1b', category: 'Components' },
        { id: 'e1b-c6', type: 'component', name: 'KarmaNotification', description: 'Points earned toast', status: 'pending', epic: 'epic-1b', category: 'Components' },
        { id: 'e1b-c7', type: 'component', name: 'LevelUpCelebration', description: 'Level up animation', status: 'pending', epic: 'epic-1b', category: 'Components' },
      ],
      tests: [
        { id: 'e1b-ts1', type: 'test', name: 'karma-service.test.ts', description: 'Karma service tests', status: 'pending', epic: 'epic-1b', category: 'Tests' },
        { id: 'e1b-ts2', type: 'test', name: 'badge-service.test.ts', description: 'Badge tests', status: 'pending', epic: 'epic-1b', category: 'Tests' },
        { id: 'e1b-ts3', type: 'test', name: 'leaderboard.test.ts', description: 'Leaderboard tests', status: 'pending', epic: 'epic-1b', category: 'Tests' },
      ],
      config: [],
    },
  },
  {
    epicId: 'epic-02',
    epicName: 'Humans',
    phase: 'MVP',
    dependencies: ['epic-00', 'epic-01'],
    tasks: {
      tables: [
        { id: 'e02-t1', type: 'table', name: 'profile_attributes', description: 'User profile attributes (values, interests)', status: 'pending', epic: 'epic-02', category: 'Database Tables' },
        { id: 'e02-t2', type: 'table', name: 'chemistry_assessments', description: 'Personality/chemistry test results', status: 'pending', epic: 'epic-02', category: 'Database Tables' },
        { id: 'e02-t3', type: 'table', name: 'connections', description: 'User connections (friends)', status: 'pending', epic: 'epic-02', category: 'Database Tables' },
        { id: 'e02-t4', type: 'table', name: 'profile_views', description: 'Who viewed profile tracking', status: 'pending', epic: 'epic-02', category: 'Database Tables' },
      ],
      endpoints: [
        { id: 'e02-e1', type: 'endpoint', name: 'GET /api/profile/:id', description: 'Get user profile', status: 'pending', epic: 'epic-02', category: 'API Endpoints' },
        { id: 'e02-e2', type: 'endpoint', name: 'PUT /api/profile', description: 'Update own profile', status: 'pending', epic: 'epic-02', category: 'API Endpoints' },
        { id: 'e02-e3', type: 'endpoint', name: 'POST /api/profile/attributes', description: 'Update profile attributes', status: 'pending', epic: 'epic-02', category: 'API Endpoints' },
        { id: 'e02-e4', type: 'endpoint', name: 'POST /api/chemistry/submit', description: 'Submit chemistry assessment', status: 'pending', epic: 'epic-02', category: 'API Endpoints' },
        { id: 'e02-e5', type: 'endpoint', name: 'GET /api/chemistry/results', description: 'Get chemistry results', status: 'pending', epic: 'epic-02', category: 'API Endpoints' },
        { id: 'e02-e6', type: 'endpoint', name: 'POST /api/connections/request', description: 'Send connection request', status: 'pending', epic: 'epic-02', category: 'API Endpoints' },
        { id: 'e02-e7', type: 'endpoint', name: 'POST /api/connections/accept', description: 'Accept connection', status: 'pending', epic: 'epic-02', category: 'API Endpoints' },
        { id: 'e02-e8', type: 'endpoint', name: 'GET /api/connections', description: 'Get user connections', status: 'pending', epic: 'epic-02', category: 'API Endpoints' },
        { id: 'e02-e9', type: 'endpoint', name: 'GET /api/profile/views', description: 'Get profile view history', status: 'pending', epic: 'epic-02', category: 'API Endpoints' },
      ],
      services: [
        { id: 'e02-s1', type: 'service', name: 'ProfileService', description: 'Profile management', status: 'pending', epic: 'epic-02', category: 'Services' },
        { id: 'e02-s2', type: 'service', name: 'ChemistryService', description: 'Chemistry calculations', status: 'pending', epic: 'epic-02', category: 'Services' },
        { id: 'e02-s3', type: 'service', name: 'ConnectionService', description: 'Connection management', status: 'pending', epic: 'epic-02', category: 'Services' },
        { id: 'e02-s4', type: 'service', name: 'CompatibilityService', description: 'Compatibility scoring', status: 'pending', epic: 'epic-02', category: 'Services' },
      ],
      components: [
        { id: 'e02-c1', type: 'component', name: 'ProfileCard', description: 'User profile card', status: 'pending', epic: 'epic-02', category: 'Components' },
        { id: 'e02-c2', type: 'component', name: 'ProfileEditor', description: 'Profile editing form', status: 'pending', epic: 'epic-02', category: 'Components' },
        { id: 'e02-c3', type: 'component', name: 'AttributeSelector', description: 'Multi-select attributes', status: 'pending', epic: 'epic-02', category: 'Components' },
        { id: 'e02-c4', type: 'component', name: 'ChemistryQuiz', description: 'Personality assessment', status: 'pending', epic: 'epic-02', category: 'Components' },
        { id: 'e02-c5', type: 'component', name: 'ChemistryResults', description: 'Results visualization', status: 'pending', epic: 'epic-02', category: 'Components' },
        { id: 'e02-c6', type: 'component', name: 'ConnectionsList', description: 'Friends list', status: 'pending', epic: 'epic-02', category: 'Components' },
        { id: 'e02-c7', type: 'component', name: 'ConnectionRequest', description: 'Request notification', status: 'pending', epic: 'epic-02', category: 'Components' },
        { id: 'e02-c8', type: 'component', name: 'CompatibilityBadge', description: 'Compatibility score display', status: 'pending', epic: 'epic-02', category: 'Components' },
      ],
      tests: [
        { id: 'e02-ts1', type: 'test', name: 'profile-service.test.ts', description: 'Profile service tests', status: 'pending', epic: 'epic-02', category: 'Tests' },
        { id: 'e02-ts2', type: 'test', name: 'chemistry.test.ts', description: 'Chemistry calculation tests', status: 'pending', epic: 'epic-02', category: 'Tests' },
        { id: 'e02-ts3', type: 'test', name: 'connections.test.ts', description: 'Connection tests', status: 'pending', epic: 'epic-02', category: 'Tests' },
      ],
      config: [],
    },
  },
  {
    epicId: 'epic-03',
    epicName: 'Practices',
    phase: 'MVP',
    dependencies: ['epic-00', 'epic-01'],
    tasks: {
      tables: [
        { id: 'e03-t1', type: 'table', name: 'practice_definitions', description: 'Practice types and metadata', status: 'pending', epic: 'epic-03', category: 'Database Tables' },
        { id: 'e03-t2', type: 'table', name: 'practices', description: 'User tracked practices', status: 'pending', epic: 'epic-03', category: 'Database Tables' },
        { id: 'e03-t3', type: 'table', name: 'practice_logs', description: 'Individual practice sessions', status: 'pending', epic: 'epic-03', category: 'Database Tables' },
        { id: 'e03-t4', type: 'table', name: 'practice_streaks', description: 'Streak tracking', status: 'pending', epic: 'epic-03', category: 'Database Tables' },
        { id: 'e03-t5', type: 'table', name: 'affirmations', description: 'Daily affirmations', status: 'pending', epic: 'epic-03', category: 'Database Tables' },
        { id: 'e03-t6', type: 'table', name: 'community_journeys', description: 'Group practice programs', status: 'pending', epic: 'epic-03', category: 'Database Tables' },
        { id: 'e03-t7', type: 'table', name: 'journey_participants', description: 'Journey enrollment', status: 'pending', epic: 'epic-03', category: 'Database Tables' },
      ],
      endpoints: [
        { id: 'e03-e1', type: 'endpoint', name: 'GET /api/practices', description: 'Get user practices', status: 'pending', epic: 'epic-03', category: 'API Endpoints' },
        { id: 'e03-e2', type: 'endpoint', name: 'POST /api/practices', description: 'Create new practice', status: 'pending', epic: 'epic-03', category: 'API Endpoints' },
        { id: 'e03-e3', type: 'endpoint', name: 'POST /api/practices/:id/log', description: 'Log practice session', status: 'pending', epic: 'epic-03', category: 'API Endpoints' },
        { id: 'e03-e4', type: 'endpoint', name: 'GET /api/practices/:id/logs', description: 'Get practice history', status: 'pending', epic: 'epic-03', category: 'API Endpoints' },
        { id: 'e03-e5', type: 'endpoint', name: 'GET /api/practices/streaks', description: 'Get streak data', status: 'pending', epic: 'epic-03', category: 'API Endpoints' },
        { id: 'e03-e6', type: 'endpoint', name: 'GET /api/affirmations/daily', description: 'Get daily affirmation', status: 'pending', epic: 'epic-03', category: 'API Endpoints' },
        { id: 'e03-e7', type: 'endpoint', name: 'GET /api/journeys', description: 'Get available journeys', status: 'pending', epic: 'epic-03', category: 'API Endpoints' },
        { id: 'e03-e8', type: 'endpoint', name: 'POST /api/journeys/:id/join', description: 'Join a journey', status: 'pending', epic: 'epic-03', category: 'API Endpoints' },
      ],
      services: [
        { id: 'e03-s1', type: 'service', name: 'PracticeService', description: 'Practice management', status: 'pending', epic: 'epic-03', category: 'Services' },
        { id: 'e03-s2', type: 'service', name: 'StreakService', description: 'Streak calculations', status: 'pending', epic: 'epic-03', category: 'Services' },
        { id: 'e03-s3', type: 'service', name: 'AffirmationService', description: 'Affirmation delivery', status: 'pending', epic: 'epic-03', category: 'Services' },
        { id: 'e03-s4', type: 'service', name: 'JourneyService', description: 'Journey management', status: 'pending', epic: 'epic-03', category: 'Services' },
      ],
      components: [
        { id: 'e03-c1', type: 'component', name: 'PracticeTracker', description: 'Main practice tracking UI', status: 'pending', epic: 'epic-03', category: 'Components' },
        { id: 'e03-c2', type: 'component', name: 'PracticeCard', description: 'Individual practice display', status: 'pending', epic: 'epic-03', category: 'Components' },
        { id: 'e03-c3', type: 'component', name: 'PracticeLogger', description: 'Log session interface', status: 'pending', epic: 'epic-03', category: 'Components' },
        { id: 'e03-c4', type: 'component', name: 'StreakCounter', description: 'Streak display', status: 'pending', epic: 'epic-03', category: 'Components' },
        { id: 'e03-c5', type: 'component', name: 'StreakCalendar', description: 'Calendar heatmap', status: 'pending', epic: 'epic-03', category: 'Components' },
        { id: 'e03-c6', type: 'component', name: 'AffirmationCard', description: 'Daily affirmation', status: 'pending', epic: 'epic-03', category: 'Components' },
        { id: 'e03-c7', type: 'component', name: 'JourneyBrowser', description: 'Browse journeys', status: 'pending', epic: 'epic-03', category: 'Components' },
        { id: 'e03-c8', type: 'component', name: 'JourneyProgress', description: 'Journey completion tracker', status: 'pending', epic: 'epic-03', category: 'Components' },
      ],
      tests: [
        { id: 'e03-ts1', type: 'test', name: 'practice-service.test.ts', description: 'Practice service tests', status: 'pending', epic: 'epic-03', category: 'Tests' },
        { id: 'e03-ts2', type: 'test', name: 'streak-service.test.ts', description: 'Streak calculation tests', status: 'pending', epic: 'epic-03', category: 'Tests' },
        { id: 'e03-ts3', type: 'test', name: 'journey.test.ts', description: 'Journey tests', status: 'pending', epic: 'epic-03', category: 'Tests' },
      ],
      config: [],
    },
  },
  {
    epicId: 'epic-04',
    epicName: 'Discovery',
    phase: 'MVP',
    dependencies: ['epic-00', 'epic-01', 'epic-02'],
    tasks: {
      tables: [
        { id: 'e04-t1', type: 'table', name: 'messages', description: 'Direct messages', status: 'pending', epic: 'epic-04', category: 'Database Tables' },
        { id: 'e04-t2', type: 'table', name: 'notifications', description: 'User notifications', status: 'pending', epic: 'epic-04', category: 'Database Tables' },
        { id: 'e04-t3', type: 'table', name: 'discovery_recommendations', description: 'AI-powered recommendations', status: 'pending', epic: 'epic-04', category: 'Database Tables' },
        { id: 'e04-t4', type: 'table', name: 'search_queries', description: 'Search history', status: 'pending', epic: 'epic-04', category: 'Database Tables' },
        { id: 'e04-t5', type: 'table', name: 'user_library', description: 'Saved/bookmarked users', status: 'pending', epic: 'epic-04', category: 'Database Tables' },
      ],
      endpoints: [
        { id: 'e04-e1', type: 'endpoint', name: 'GET /api/discover', description: 'Get recommended connections', status: 'pending', epic: 'epic-04', category: 'API Endpoints' },
        { id: 'e04-e2', type: 'endpoint', name: 'GET /api/discover/search', description: 'Search users', status: 'pending', epic: 'epic-04', category: 'API Endpoints' },
        { id: 'e04-e3', type: 'endpoint', name: 'POST /api/messages', description: 'Send message', status: 'pending', epic: 'epic-04', category: 'API Endpoints' },
        { id: 'e04-e4', type: 'endpoint', name: 'GET /api/messages/:conversationId', description: 'Get conversation', status: 'pending', epic: 'epic-04', category: 'API Endpoints' },
        { id: 'e04-e5', type: 'endpoint', name: 'GET /api/messages/conversations', description: 'Get all conversations', status: 'pending', epic: 'epic-04', category: 'API Endpoints' },
        { id: 'e04-e6', type: 'endpoint', name: 'GET /api/notifications', description: 'Get notifications', status: 'pending', epic: 'epic-04', category: 'API Endpoints' },
        { id: 'e04-e7', type: 'endpoint', name: 'PUT /api/notifications/:id/read', description: 'Mark notification read', status: 'pending', epic: 'epic-04', category: 'API Endpoints' },
        { id: 'e04-e8', type: 'endpoint', name: 'POST /api/library/save', description: 'Save user to library', status: 'pending', epic: 'epic-04', category: 'API Endpoints' },
        { id: 'e04-e9', type: 'endpoint', name: 'GET /api/library', description: 'Get saved users', status: 'pending', epic: 'epic-04', category: 'API Endpoints' },
      ],
      services: [
        { id: 'e04-s1', type: 'service', name: 'DiscoveryService', description: 'Recommendation engine', status: 'pending', epic: 'epic-04', category: 'Services' },
        { id: 'e04-s2', type: 'service', name: 'MessagingService', description: 'Message handling', status: 'pending', epic: 'epic-04', category: 'Services' },
        { id: 'e04-s3', type: 'service', name: 'NotificationService', description: 'Notification delivery', status: 'pending', epic: 'epic-04', category: 'Services' },
        { id: 'e04-s4', type: 'service', name: 'SearchService', description: 'User search', status: 'pending', epic: 'epic-04', category: 'Services' },
        { id: 'e04-s5', type: 'service', name: 'LibraryService', description: 'Bookmarks management', status: 'pending', epic: 'epic-04', category: 'Services' },
      ],
      components: [
        { id: 'e04-c1', type: 'component', name: 'DiscoveryFeed', description: 'Recommended users feed', status: 'pending', epic: 'epic-04', category: 'Components' },
        { id: 'e04-c2', type: 'component', name: 'UserSearchBar', description: 'Search interface', status: 'pending', epic: 'epic-04', category: 'Components' },
        { id: 'e04-c3', type: 'component', name: 'SearchResults', description: 'Search results list', status: 'pending', epic: 'epic-04', category: 'Components' },
        { id: 'e04-c4', type: 'component', name: 'MessageThread', description: 'Conversation view', status: 'pending', epic: 'epic-04', category: 'Components' },
        { id: 'e04-c5', type: 'component', name: 'MessageComposer', description: 'Message input', status: 'pending', epic: 'epic-04', category: 'Components' },
        { id: 'e04-c6', type: 'component', name: 'ConversationList', description: 'Inbox list', status: 'pending', epic: 'epic-04', category: 'Components' },
        { id: 'e04-c7', type: 'component', name: 'NotificationCenter', description: 'Notification dropdown', status: 'pending', epic: 'epic-04', category: 'Components' },
        { id: 'e04-c8', type: 'component', name: 'SavedUsers', description: 'Library view', status: 'pending', epic: 'epic-04', category: 'Components' },
      ],
      tests: [
        { id: 'e04-ts1', type: 'test', name: 'discovery-service.test.ts', description: 'Discovery tests', status: 'pending', epic: 'epic-04', category: 'Tests' },
        { id: 'e04-ts2', type: 'test', name: 'messaging.test.ts', description: 'Messaging tests', status: 'pending', epic: 'epic-04', category: 'Tests' },
        { id: 'e04-ts3', type: 'test', name: 'notification.test.ts', description: 'Notification tests', status: 'pending', epic: 'epic-04', category: 'Tests' },
        { id: 'e04-ts4', type: 'test', name: 'search.test.ts', description: 'Search tests', status: 'pending', epic: 'epic-04', category: 'Tests' },
      ],
      config: [],
    },
  },
  {
    epicId: 'epic-05',
    epicName: 'Impact',
    phase: 'MVP',
    dependencies: ['epic-00', 'epic-01'],
    tasks: {
      tables: [
        { id: 'e05-t1', type: 'table', name: 'impact_features', description: 'Feature requests', status: 'pending', epic: 'epic-05', category: 'Database Tables' },
        { id: 'e05-t2', type: 'table', name: 'impact_initiatives', description: 'Community initiatives', status: 'pending', epic: 'epic-05', category: 'Database Tables' },
        { id: 'e05-t3', type: 'table', name: 'impact_votes', description: 'Voting records', status: 'pending', epic: 'epic-05', category: 'Database Tables' },
        { id: 'e05-t4', type: 'table', name: 'impact_comments', description: 'Feature/initiative comments', status: 'pending', epic: 'epic-05', category: 'Database Tables' },
        { id: 'e05-t5', type: 'table', name: 'contextual_feedback', description: 'In-context feedback', status: 'pending', epic: 'epic-05', category: 'Database Tables' },
        { id: 'e05-t6', type: 'table', name: 'impact_follows', description: 'Following features/initiatives', status: 'pending', epic: 'epic-05', category: 'Database Tables' },
        { id: 'e05-t7', type: 'table', name: 'impact_challenge_progress', description: 'Challenge completion', status: 'pending', epic: 'epic-05', category: 'Database Tables' },
        { id: 'e05-t8', type: 'table', name: 'impact_shares', description: 'Social sharing tracking', status: 'pending', epic: 'epic-05', category: 'Database Tables' },
      ],
      endpoints: [
        { id: 'e05-e1', type: 'endpoint', name: 'GET /api/impact/features', description: 'Get feature requests', status: 'pending', epic: 'epic-05', category: 'API Endpoints' },
        { id: 'e05-e2', type: 'endpoint', name: 'POST /api/impact/features', description: 'Submit feature request', status: 'pending', epic: 'epic-05', category: 'API Endpoints' },
        { id: 'e05-e3', type: 'endpoint', name: 'POST /api/impact/vote', description: 'Cast vote', status: 'pending', epic: 'epic-05', category: 'API Endpoints' },
        { id: 'e05-e4', type: 'endpoint', name: 'GET /api/impact/initiatives', description: 'Get initiatives', status: 'pending', epic: 'epic-05', category: 'API Endpoints' },
        { id: 'e05-e5', type: 'endpoint', name: 'POST /api/impact/comment', description: 'Add comment', status: 'pending', epic: 'epic-05', category: 'API Endpoints' },
        { id: 'e05-e6', type: 'endpoint', name: 'POST /api/feedback', description: 'Submit contextual feedback', status: 'pending', epic: 'epic-05', category: 'API Endpoints' },
        { id: 'e05-e7', type: 'endpoint', name: 'GET /api/impact/challenges', description: 'Get active challenges', status: 'pending', epic: 'epic-05', category: 'API Endpoints' },
        { id: 'e05-e8', type: 'endpoint', name: 'POST /api/impact/follow', description: 'Follow feature/initiative', status: 'pending', epic: 'epic-05', category: 'API Endpoints' },
      ],
      services: [
        { id: 'e05-s1', type: 'service', name: 'ImpactService', description: 'Feature/initiative management', status: 'pending', epic: 'epic-05', category: 'Services' },
        { id: 'e05-s2', type: 'service', name: 'VotingService', description: 'Vote processing', status: 'pending', epic: 'epic-05', category: 'Services' },
        { id: 'e05-s3', type: 'service', name: 'FeedbackService', description: 'Feedback collection', status: 'pending', epic: 'epic-05', category: 'Services' },
        { id: 'e05-s4', type: 'service', name: 'ChallengeService', description: 'Challenge management', status: 'pending', epic: 'epic-05', category: 'Services' },
      ],
      components: [
        { id: 'e05-c1', type: 'component', name: 'FeatureBoard', description: 'Feature request board', status: 'pending', epic: 'epic-05', category: 'Components' },
        { id: 'e05-c2', type: 'component', name: 'FeatureCard', description: 'Feature display', status: 'pending', epic: 'epic-05', category: 'Components' },
        { id: 'e05-c3', type: 'component', name: 'VoteButton', description: 'Upvote/downvote', status: 'pending', epic: 'epic-05', category: 'Components' },
        { id: 'e05-c4', type: 'component', name: 'InitiativeList', description: 'Initiatives list', status: 'pending', epic: 'epic-05', category: 'Components' },
        { id: 'e05-c5', type: 'component', name: 'CommentThread', description: 'Comments on features', status: 'pending', epic: 'epic-05', category: 'Components' },
        { id: 'e05-c6', type: 'component', name: 'FeedbackWidget', description: 'Contextual feedback', status: 'pending', epic: 'epic-05', category: 'Components' },
        { id: 'e05-c7', type: 'component', name: 'ChallengeCard', description: 'Challenge display', status: 'pending', epic: 'epic-05', category: 'Components' },
      ],
      tests: [
        { id: 'e05-ts1', type: 'test', name: 'impact-service.test.ts', description: 'Impact service tests', status: 'pending', epic: 'epic-05', category: 'Tests' },
        { id: 'e05-ts2', type: 'test', name: 'voting.test.ts', description: 'Voting tests', status: 'pending', epic: 'epic-05', category: 'Tests' },
        { id: 'e05-ts3', type: 'test', name: 'feedback.test.ts', description: 'Feedback tests', status: 'pending', epic: 'epic-05', category: 'Tests' },
      ],
      config: [],
    },
  },
  {
    epicId: 'epic-06',
    epicName: 'Business',
    phase: 'Growth',
    dependencies: ['epic-00', 'epic-01', 'epic-02'],
    tasks: {
      tables: [
        { id: 'e06-t1', type: 'table', name: 'businesses', description: 'Business profiles', status: 'pending', epic: 'epic-06', category: 'Database Tables' },
        { id: 'e06-t2', type: 'table', name: 'business_admins', description: 'Business admin access', status: 'pending', epic: 'epic-06', category: 'Database Tables' },
        { id: 'e06-t3', type: 'table', name: 'business_listings', description: 'Services/offerings', status: 'pending', epic: 'epic-06', category: 'Database Tables' },
        { id: 'e06-t4', type: 'table', name: 'business_perks', description: 'Member perks/discounts', status: 'pending', epic: 'epic-06', category: 'Database Tables' },
        { id: 'e06-t5', type: 'table', name: 'business_reviews', description: 'Business reviews', status: 'pending', epic: 'epic-06', category: 'Database Tables' },
        { id: 'e06-t6', type: 'table', name: 'practice_stacks', description: 'Bundled practice offerings', status: 'pending', epic: 'epic-06', category: 'Database Tables' },
        { id: 'e06-t7', type: 'table', name: 'business_verification', description: 'Verification records', status: 'pending', epic: 'epic-06', category: 'Database Tables' },
        { id: 'e06-t8', type: 'table', name: 'business_admin_logs', description: 'Admin activity logs', status: 'pending', epic: 'epic-06', category: 'Database Tables' },
      ],
      endpoints: [
        { id: 'e06-e1', type: 'endpoint', name: 'GET /api/businesses', description: 'Search businesses', status: 'pending', epic: 'epic-06', category: 'API Endpoints' },
        { id: 'e06-e2', type: 'endpoint', name: 'GET /api/businesses/:id', description: 'Get business profile', status: 'pending', epic: 'epic-06', category: 'API Endpoints' },
        { id: 'e06-e3', type: 'endpoint', name: 'POST /api/businesses', description: 'Create business', status: 'pending', epic: 'epic-06', category: 'API Endpoints' },
        { id: 'e06-e4', type: 'endpoint', name: 'PUT /api/businesses/:id', description: 'Update business', status: 'pending', epic: 'epic-06', category: 'API Endpoints' },
        { id: 'e06-e5', type: 'endpoint', name: 'POST /api/businesses/:id/listings', description: 'Add listing', status: 'pending', epic: 'epic-06', category: 'API Endpoints' },
        { id: 'e06-e6', type: 'endpoint', name: 'GET /api/businesses/:id/perks', description: 'Get business perks', status: 'pending', epic: 'epic-06', category: 'API Endpoints' },
        { id: 'e06-e7', type: 'endpoint', name: 'POST /api/businesses/:id/reviews', description: 'Submit review', status: 'pending', epic: 'epic-06', category: 'API Endpoints' },
        { id: 'e06-e8', type: 'endpoint', name: 'GET /api/businesses/:id/reviews', description: 'Get reviews', status: 'pending', epic: 'epic-06', category: 'API Endpoints' },
        { id: 'e06-e9', type: 'endpoint', name: 'POST /api/businesses/:id/verify', description: 'Request verification', status: 'pending', epic: 'epic-06', category: 'API Endpoints' },
      ],
      services: [
        { id: 'e06-s1', type: 'service', name: 'BusinessService', description: 'Business management', status: 'pending', epic: 'epic-06', category: 'Services' },
        { id: 'e06-s2', type: 'service', name: 'ListingService', description: 'Service listings', status: 'pending', epic: 'epic-06', category: 'Services' },
        { id: 'e06-s3', type: 'service', name: 'PerkService', description: 'Perk management', status: 'pending', epic: 'epic-06', category: 'Services' },
        { id: 'e06-s4', type: 'service', name: 'ReviewService', description: 'Review handling', status: 'pending', epic: 'epic-06', category: 'Services' },
        { id: 'e06-s5', type: 'service', name: 'VerificationService', description: 'Business verification', status: 'pending', epic: 'epic-06', category: 'Services' },
      ],
      components: [
        { id: 'e06-c1', type: 'component', name: 'BusinessCard', description: 'Business display card', status: 'pending', epic: 'epic-06', category: 'Components' },
        { id: 'e06-c2', type: 'component', name: 'BusinessProfile', description: 'Full business page', status: 'pending', epic: 'epic-06', category: 'Components' },
        { id: 'e06-c3', type: 'component', name: 'BusinessEditor', description: 'Business management form', status: 'pending', epic: 'epic-06', category: 'Components' },
        { id: 'e06-c4', type: 'component', name: 'ListingGrid', description: 'Services grid', status: 'pending', epic: 'epic-06', category: 'Components' },
        { id: 'e06-c5', type: 'component', name: 'ListingCard', description: 'Service card', status: 'pending', epic: 'epic-06', category: 'Components' },
        { id: 'e06-c6', type: 'component', name: 'PerkBadge', description: 'Perk indicator', status: 'pending', epic: 'epic-06', category: 'Components' },
        { id: 'e06-c7', type: 'component', name: 'ReviewList', description: 'Reviews display', status: 'pending', epic: 'epic-06', category: 'Components' },
        { id: 'e06-c8', type: 'component', name: 'ReviewForm', description: 'Review submission', status: 'pending', epic: 'epic-06', category: 'Components' },
        { id: 'e06-c9', type: 'component', name: 'VerificationBadge', description: 'Verified indicator', status: 'pending', epic: 'epic-06', category: 'Components' },
      ],
      tests: [
        { id: 'e06-ts1', type: 'test', name: 'business-service.test.ts', description: 'Business service tests', status: 'pending', epic: 'epic-06', category: 'Tests' },
        { id: 'e06-ts2', type: 'test', name: 'listing.test.ts', description: 'Listing tests', status: 'pending', epic: 'epic-06', category: 'Tests' },
        { id: 'e06-ts3', type: 'test', name: 'review.test.ts', description: 'Review tests', status: 'pending', epic: 'epic-06', category: 'Tests' },
        { id: 'e06-ts4', type: 'test', name: 'verification.test.ts', description: 'Verification tests', status: 'pending', epic: 'epic-06', category: 'Tests' },
      ],
      config: [],
    },
  },
  {
    epicId: 'epic-07',
    epicName: 'Community',
    phase: 'Growth',
    dependencies: ['epic-03', 'epic-04', 'epic-06'],
    tasks: {
      tables: [
        { id: 'e07-t1', type: 'table', name: 'communities', description: 'Community groups', status: 'pending', epic: 'epic-07', category: 'Database Tables' },
        { id: 'e07-t2', type: 'table', name: 'community_members', description: 'Membership records', status: 'pending', epic: 'epic-07', category: 'Database Tables' },
        { id: 'e07-t3', type: 'table', name: 'community_moderators', description: 'Moderator assignments', status: 'pending', epic: 'epic-07', category: 'Database Tables' },
        { id: 'e07-t4', type: 'table', name: 'community_prompts', description: 'Discussion prompts', status: 'pending', epic: 'epic-07', category: 'Database Tables' },
        { id: 'e07-t5', type: 'table', name: 'vibes', description: 'Community posts (vibes)', status: 'pending', epic: 'epic-07', category: 'Database Tables' },
        { id: 'e07-t6', type: 'table', name: 'vibe_reactions', description: 'Reactions to vibes', status: 'pending', epic: 'epic-07', category: 'Database Tables' },
        { id: 'e07-t7', type: 'table', name: 'vibe_comments', description: 'Comments on vibes', status: 'pending', epic: 'epic-07', category: 'Database Tables' },
        { id: 'e07-t8', type: 'table', name: 'community_reviews', description: 'Community ratings', status: 'pending', epic: 'epic-07', category: 'Database Tables' },
      ],
      endpoints: [
        { id: 'e07-e1', type: 'endpoint', name: 'GET /api/communities', description: 'Browse communities', status: 'pending', epic: 'epic-07', category: 'API Endpoints' },
        { id: 'e07-e2', type: 'endpoint', name: 'GET /api/communities/:id', description: 'Get community', status: 'pending', epic: 'epic-07', category: 'API Endpoints' },
        { id: 'e07-e3', type: 'endpoint', name: 'POST /api/communities', description: 'Create community', status: 'pending', epic: 'epic-07', category: 'API Endpoints' },
        { id: 'e07-e4', type: 'endpoint', name: 'POST /api/communities/:id/join', description: 'Join community', status: 'pending', epic: 'epic-07', category: 'API Endpoints' },
        { id: 'e07-e5', type: 'endpoint', name: 'POST /api/communities/:id/leave', description: 'Leave community', status: 'pending', epic: 'epic-07', category: 'API Endpoints' },
        { id: 'e07-e6', type: 'endpoint', name: 'GET /api/communities/:id/vibes', description: 'Get community vibes', status: 'pending', epic: 'epic-07', category: 'API Endpoints' },
        { id: 'e07-e7', type: 'endpoint', name: 'POST /api/vibes', description: 'Post a vibe', status: 'pending', epic: 'epic-07', category: 'API Endpoints' },
        { id: 'e07-e8', type: 'endpoint', name: 'POST /api/vibes/:id/react', description: 'React to vibe', status: 'pending', epic: 'epic-07', category: 'API Endpoints' },
        { id: 'e07-e9', type: 'endpoint', name: 'POST /api/vibes/:id/comment', description: 'Comment on vibe', status: 'pending', epic: 'epic-07', category: 'API Endpoints' },
        { id: 'e07-e10', type: 'endpoint', name: 'GET /api/communities/:id/prompts', description: 'Get prompts', status: 'pending', epic: 'epic-07', category: 'API Endpoints' },
      ],
      services: [
        { id: 'e07-s1', type: 'service', name: 'CommunityService', description: 'Community management', status: 'pending', epic: 'epic-07', category: 'Services' },
        { id: 'e07-s2', type: 'service', name: 'MembershipService', description: 'Membership handling', status: 'pending', epic: 'epic-07', category: 'Services' },
        { id: 'e07-s3', type: 'service', name: 'VibeService', description: 'Post management', status: 'pending', epic: 'epic-07', category: 'Services' },
        { id: 'e07-s4', type: 'service', name: 'ModerationService', description: 'Content moderation', status: 'pending', epic: 'epic-07', category: 'Services' },
      ],
      components: [
        { id: 'e07-c1', type: 'component', name: 'CommunityBrowser', description: 'Browse communities', status: 'pending', epic: 'epic-07', category: 'Components' },
        { id: 'e07-c2', type: 'component', name: 'CommunityCard', description: 'Community preview', status: 'pending', epic: 'epic-07', category: 'Components' },
        { id: 'e07-c3', type: 'component', name: 'CommunityPage', description: 'Full community view', status: 'pending', epic: 'epic-07', category: 'Components' },
        { id: 'e07-c4', type: 'component', name: 'CommunityCreator', description: 'Create community form', status: 'pending', epic: 'epic-07', category: 'Components' },
        { id: 'e07-c5', type: 'component', name: 'MemberList', description: 'Members display', status: 'pending', epic: 'epic-07', category: 'Components' },
        { id: 'e07-c6', type: 'component', name: 'VibeFeed', description: 'Community posts feed', status: 'pending', epic: 'epic-07', category: 'Components' },
        { id: 'e07-c7', type: 'component', name: 'VibeComposer', description: 'Create vibe', status: 'pending', epic: 'epic-07', category: 'Components' },
        { id: 'e07-c8', type: 'component', name: 'VibeCard', description: 'Single vibe display', status: 'pending', epic: 'epic-07', category: 'Components' },
        { id: 'e07-c9', type: 'component', name: 'ReactionPicker', description: 'Reaction selector', status: 'pending', epic: 'epic-07', category: 'Components' },
        { id: 'e07-c10', type: 'component', name: 'CommentSection', description: 'Vibe comments', status: 'pending', epic: 'epic-07', category: 'Components' },
        { id: 'e07-c11', type: 'component', name: 'PromptCard', description: 'Discussion prompt', status: 'pending', epic: 'epic-07', category: 'Components' },
      ],
      tests: [
        { id: 'e07-ts1', type: 'test', name: 'community-service.test.ts', description: 'Community tests', status: 'pending', epic: 'epic-07', category: 'Tests' },
        { id: 'e07-ts2', type: 'test', name: 'vibe-service.test.ts', description: 'Vibe/post tests', status: 'pending', epic: 'epic-07', category: 'Tests' },
        { id: 'e07-ts3', type: 'test', name: 'moderation.test.ts', description: 'Moderation tests', status: 'pending', epic: 'epic-07', category: 'Tests' },
      ],
      config: [],
    },
  },
  {
    epicId: 'epic-08',
    epicName: 'Monetization',
    phase: 'Growth',
    dependencies: ['epic-06', 'epic-07', 'epic-1a'],
    tasks: {
      tables: [
        { id: 'e08-t1', type: 'table', name: 'memberships', description: 'User membership tiers', status: 'pending', epic: 'epic-08', category: 'Database Tables' },
        { id: 'e08-t2', type: 'table', name: 'affiliate_codes', description: 'Affiliate referral codes', status: 'pending', epic: 'epic-08', category: 'Database Tables' },
        { id: 'e08-t3', type: 'table', name: 'affiliate_referrals', description: 'Referral tracking', status: 'pending', epic: 'epic-08', category: 'Database Tables' },
        { id: 'e08-t4', type: 'table', name: 'promo_codes', description: 'Promotional discounts', status: 'pending', epic: 'epic-08', category: 'Database Tables' },
        { id: 'e08-t5', type: 'table', name: 'promo_code_redemptions', description: 'Promo usage tracking', status: 'pending', epic: 'epic-08', category: 'Database Tables' },
      ],
      endpoints: [
        { id: 'e08-e1', type: 'endpoint', name: 'GET /api/membership', description: 'Get membership status', status: 'pending', epic: 'epic-08', category: 'API Endpoints' },
        { id: 'e08-e2', type: 'endpoint', name: 'POST /api/membership/upgrade', description: 'Upgrade to Regenerative', status: 'pending', epic: 'epic-08', category: 'API Endpoints' },
        { id: 'e08-e3', type: 'endpoint', name: 'POST /api/membership/cancel', description: 'Cancel subscription', status: 'pending', epic: 'epic-08', category: 'API Endpoints' },
        { id: 'e08-e4', type: 'endpoint', name: 'GET /api/affiliate/code', description: 'Get affiliate code', status: 'pending', epic: 'epic-08', category: 'API Endpoints' },
        { id: 'e08-e5', type: 'endpoint', name: 'GET /api/affiliate/stats', description: 'Get referral stats', status: 'pending', epic: 'epic-08', category: 'API Endpoints' },
        { id: 'e08-e6', type: 'endpoint', name: 'POST /api/promo/validate', description: 'Validate promo code', status: 'pending', epic: 'epic-08', category: 'API Endpoints' },
        { id: 'e08-e7', type: 'endpoint', name: 'POST /api/promo/redeem', description: 'Redeem promo code', status: 'pending', epic: 'epic-08', category: 'API Endpoints' },
        { id: 'e08-e8', type: 'endpoint', name: 'POST /api/checkout/session', description: 'Create Stripe session', status: 'pending', epic: 'epic-08', category: 'API Endpoints' },
      ],
      services: [
        { id: 'e08-s1', type: 'service', name: 'MembershipService', description: 'Subscription management', status: 'pending', epic: 'epic-08', category: 'Services' },
        { id: 'e08-s2', type: 'service', name: 'AffiliateService', description: 'Referral tracking', status: 'pending', epic: 'epic-08', category: 'Services' },
        { id: 'e08-s3', type: 'service', name: 'PromoService', description: 'Promo code handling', status: 'pending', epic: 'epic-08', category: 'Services' },
        { id: 'e08-s4', type: 'service', name: 'StripeService', description: 'Stripe integration', status: 'pending', epic: 'epic-08', category: 'Services' },
        { id: 'e08-s5', type: 'service', name: 'BillingService', description: 'Invoice management', status: 'pending', epic: 'epic-08', category: 'Services' },
      ],
      components: [
        { id: 'e08-c1', type: 'component', name: 'MembershipCard', description: 'Current tier display', status: 'pending', epic: 'epic-08', category: 'Components' },
        { id: 'e08-c2', type: 'component', name: 'UpgradeModal', description: 'Upgrade flow', status: 'pending', epic: 'epic-08', category: 'Components' },
        { id: 'e08-c3', type: 'component', name: 'PricingTable', description: 'Tier comparison', status: 'pending', epic: 'epic-08', category: 'Components' },
        { id: 'e08-c4', type: 'component', name: 'AffiliatePanel', description: 'Referral dashboard', status: 'pending', epic: 'epic-08', category: 'Components' },
        { id: 'e08-c5', type: 'component', name: 'ReferralLink', description: 'Shareable link', status: 'pending', epic: 'epic-08', category: 'Components' },
        { id: 'e08-c6', type: 'component', name: 'PromoInput', description: 'Promo code entry', status: 'pending', epic: 'epic-08', category: 'Components' },
        { id: 'e08-c7', type: 'component', name: 'CheckoutForm', description: 'Payment form', status: 'pending', epic: 'epic-08', category: 'Components' },
        { id: 'e08-c8', type: 'component', name: 'BillingHistory', description: 'Invoice list', status: 'pending', epic: 'epic-08', category: 'Components' },
      ],
      tests: [
        { id: 'e08-ts1', type: 'test', name: 'membership-service.test.ts', description: 'Membership tests', status: 'pending', epic: 'epic-08', category: 'Tests' },
        { id: 'e08-ts2', type: 'test', name: 'affiliate.test.ts', description: 'Affiliate tests', status: 'pending', epic: 'epic-08', category: 'Tests' },
        { id: 'e08-ts3', type: 'test', name: 'promo.test.ts', description: 'Promo code tests', status: 'pending', epic: 'epic-08', category: 'Tests' },
        { id: 'e08-ts4', type: 'test', name: 'stripe-integration.test.ts', description: 'Stripe tests', status: 'pending', epic: 'epic-08', category: 'Tests' },
      ],
      config: [],
    },
  },
];

// =============================================================================
// Route Data (API & Frontend)
// =============================================================================

export const routeData: RouteData[] = [
  // Epic 00 - Foundation
  { method: 'GET', path: '/api/health', description: 'System health check', epic: 'epic-00', auth: false, status: 'pending' },
  { method: 'GET', path: '/api/flags', description: 'Get feature flags', epic: 'epic-00', auth: false, status: 'pending' },
  { method: 'POST', path: '/api/flags', description: 'Admin create/update flag', epic: 'epic-00', auth: true, status: 'pending' },
  { method: 'GET', path: '/api/auth/session', description: 'Get current session', epic: 'epic-00', auth: false, status: 'pending' },
  { method: 'POST', path: '/api/auth/signup', description: 'OTP signup', epic: 'epic-00', auth: false, status: 'pending' },
  { method: 'POST', path: '/api/auth/verify', description: 'Verify OTP', epic: 'epic-00', auth: false, status: 'pending' },
  { method: 'POST', path: '/api/auth/logout', description: 'Sign out', epic: 'epic-00', auth: true, status: 'pending' },

  // Epic 01 - Mira
  { method: 'GET', path: '/api/mira/greeting', description: 'Personalized greeting', epic: 'epic-01', auth: true, status: 'pending' },
  { method: 'POST', path: '/api/mira/chat', description: 'Chat with Mira', epic: 'epic-01', auth: true, status: 'pending' },
  { method: 'GET', path: '/api/onboarding/state', description: 'Onboarding progress', epic: 'epic-01', auth: true, status: 'pending' },
  { method: 'POST', path: '/api/onboarding/step', description: 'Complete step', epic: 'epic-01', auth: true, status: 'pending' },

  // Epic 1A - Crypto
  { method: 'POST', path: '/api/wallet/create', description: 'Create wallet', epic: 'epic-1a', auth: true, status: 'pending' },
  { method: 'GET', path: '/api/wallet/balance', description: 'Get balances', epic: 'epic-1a', auth: true, status: 'pending' },
  { method: 'POST', path: '/api/payment/send', description: 'Send payment', epic: 'epic-1a', auth: true, status: 'pending' },
  { method: 'POST', path: '/api/stake/create', description: 'Stake VIBES', epic: 'epic-1a', auth: true, status: 'pending' },

  // Epic 1B - Karma
  { method: 'POST', path: '/api/karma/award', description: 'Award karma', epic: 'epic-1b', auth: true, status: 'pending' },
  { method: 'GET', path: '/api/karma/score', description: 'Get karma score', epic: 'epic-1b', auth: true, status: 'pending' },
  { method: 'GET', path: '/api/karma/leaderboard', description: 'Get rankings', epic: 'epic-1b', auth: false, status: 'pending' },

  // Epic 02 - Humans
  { method: 'GET', path: '/api/profile/:id', description: 'Get profile', epic: 'epic-02', auth: true, status: 'pending' },
  { method: 'PUT', path: '/api/profile', description: 'Update profile', epic: 'epic-02', auth: true, status: 'pending' },
  { method: 'POST', path: '/api/connections/request', description: 'Connection request', epic: 'epic-02', auth: true, status: 'pending' },
  { method: 'GET', path: '/api/connections', description: 'Get connections', epic: 'epic-02', auth: true, status: 'pending' },

  // Epic 03 - Practices
  { method: 'GET', path: '/api/practices', description: 'Get practices', epic: 'epic-03', auth: true, status: 'pending' },
  { method: 'POST', path: '/api/practices', description: 'Create practice', epic: 'epic-03', auth: true, status: 'pending' },
  { method: 'POST', path: '/api/practices/:id/log', description: 'Log session', epic: 'epic-03', auth: true, status: 'pending' },

  // Epic 04 - Discovery
  { method: 'GET', path: '/api/discover', description: 'Recommendations', epic: 'epic-04', auth: true, status: 'pending' },
  { method: 'POST', path: '/api/messages', description: 'Send message', epic: 'epic-04', auth: true, status: 'pending' },
  { method: 'GET', path: '/api/notifications', description: 'Get notifications', epic: 'epic-04', auth: true, status: 'pending' },

  // Epic 05 - Impact
  { method: 'GET', path: '/api/impact/features', description: 'Feature requests', epic: 'epic-05', auth: false, status: 'pending' },
  { method: 'POST', path: '/api/impact/vote', description: 'Cast vote', epic: 'epic-05', auth: true, status: 'pending' },

  // Epic 06 - Business
  { method: 'GET', path: '/api/businesses', description: 'Search businesses', epic: 'epic-06', auth: false, status: 'pending' },
  { method: 'POST', path: '/api/businesses', description: 'Create business', epic: 'epic-06', auth: true, status: 'pending' },
  { method: 'POST', path: '/api/businesses/:id/reviews', description: 'Submit review', epic: 'epic-06', auth: true, status: 'pending' },

  // Epic 07 - Community
  { method: 'GET', path: '/api/communities', description: 'Browse communities', epic: 'epic-07', auth: false, status: 'pending' },
  { method: 'POST', path: '/api/communities', description: 'Create community', epic: 'epic-07', auth: true, status: 'pending' },
  { method: 'POST', path: '/api/vibes', description: 'Post vibe', epic: 'epic-07', auth: true, status: 'pending' },

  // Epic 08 - Monetization
  { method: 'GET', path: '/api/membership', description: 'Membership status', epic: 'epic-08', auth: true, status: 'pending' },
  { method: 'POST', path: '/api/membership/upgrade', description: 'Upgrade tier', epic: 'epic-08', auth: true, status: 'pending' },
  { method: 'POST', path: '/api/checkout/session', description: 'Stripe checkout', epic: 'epic-08', auth: true, status: 'pending' },
];

// =============================================================================
// Tooling Data
// =============================================================================

export interface ToolingParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ToolingCommand {
  name: string;
  description: string;
  usage: string;
  filePath?: string;
  // Detailed fields
  parameters?: ToolingParameter[];
  examples?: string[];
  output?: string;
  // Config file content
  configContent?: string;
}

export interface ToolingAgent {
  name: string;
  description: string;
  specialization: string;
  filePath?: string;
  // Detailed fields
  capabilities?: string[];
  invocation?: string;
  useCases?: string[];
  // Config file content
  configContent?: string;
}

export interface ToolingRule {
  name: string;
  description: string;
  alwaysApply: boolean;
  // Detailed fields
  triggers?: string[];
  keyPoints?: string[];
  filePath?: string;
  // Config file content
  configContent?: string;
}

export const toolingCommands: ToolingCommand[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // Development Tracker Commands
  // ═══════════════════════════════════════════════════════════════════════════
  {
    name: '/track-init',
    description: 'Initialize development tracker from specs',
    usage: '/track-init',
    parameters: [],
    examples: ['/track-init', '/track-init --force'],
    output: 'Creates .tracker/tracker.md with all epics and tasks from vibeup-design-spec/epics/*.md'
  },
  {
    name: '/track-start',
    description: 'Begin work on specific feature',
    usage: '/track-start <epic> <feature>',
    parameters: [
      { name: 'epic', type: 'string', required: true, description: 'Epic ID (e.g., epic-00, epic-01)' },
      { name: 'feature', type: 'string', required: true, description: 'Feature name within the epic' }
    ],
    examples: ['/track-start epic-00 auth', '/track-start epic-01 mira-chat'],
    output: 'Loads context, creates checkpoint, marks tasks in-progress'
  },
  {
    name: '/track-status',
    description: 'Display comprehensive progress',
    usage: '/track-status [--epic <id>]',
    parameters: [
      { name: '--epic', type: 'string', required: false, description: 'Filter by specific epic' }
    ],
    examples: ['/track-status', '/track-status --epic epic-00'],
    output: 'Shows progress bars, task counts, blockers per epic'
  },
  {
    name: '/track-complete',
    description: 'Mark task complete with validation',
    usage: '/track-complete <task-path> --pr <number>',
    parameters: [
      { name: 'task-path', type: 'string', required: true, description: 'Path to task (e.g., epic-00/tables/profiles)' },
      { name: '--pr', type: 'number', required: false, description: 'Associated PR number for verification' }
    ],
    examples: ['/track-complete epic-00/services/AuthService --pr 42'],
    output: 'Validates task, runs tests, marks [x] in tracker.md'
  },
  {
    name: '/track-resume',
    description: 'Resume from checkpoint',
    usage: '/track-resume',
    examples: ['/track-resume'],
    output: 'Loads last checkpoint, restores context, shows next tasks'
  },
  {
    name: '/track-validate',
    description: 'Validate tooling health',
    usage: '/track-validate',
    examples: ['/track-validate'],
    output: 'Checks tracker.md integrity, validates spec alignment, reports issues'
  },
  {
    name: '/track-manifest',
    description: 'Generate swarm work manifest',
    usage: '/track-manifest <epic> --batch-size <n>',
    parameters: [
      { name: 'epic', type: 'string', required: true, description: 'Epic to generate manifest for' },
      { name: '--batch-size', type: 'number', required: false, description: 'Number of tasks per worker' }
    ],
    examples: ['/track-manifest epic-00 --batch-size 5'],
    output: 'Creates YAML manifest for parallel execution with /swarm'
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // Core Workflow Commands
  // ═══════════════════════════════════════════════════════════════════════════
  {
    name: '/load-rules',
    description: 'Load relevant coding rules for current task',
    usage: '/load-rules [context]',
    filePath: '.claude/commands/load-rules.md',
    parameters: [
      { name: 'context', type: 'string', required: false, description: 'Context hint (e.g., tdd, supabase, auth)' }
    ],
    examples: ['/load-rules', '/load-rules tdd', '/load-rules supabase'],
    output: 'Analyzes task and loads only relevant .mdc rules based on context',
    configContent: `---
description: Load relevant coding rules for the current task
model: haiku
---

Analyze the current task and load ONLY relevant rules from \`rules/\`.

PROCESS:
1. Discover available rules: use glob_file_search with pattern "*.mdc" in rules/
2. Analyze task to identify what domains apply (languages, tools, frameworks)
3. Select relevant rules based on task requirements
4. Read selected rule files
5. State which rules loaded in one sentence
6. Proceed with task following those rules

SELECTION CRITERIA:
- Load rules for the primary language/framework being used
- Load rules for specific tools or operations mentioned in the task
- Prefer specific rules over general ones when both apply
- Avoid loading rules that don't directly inform the current work

Be selective. Loading too many rules dilutes focus.`
  },
  {
    name: '/autotask',
    description: 'Execute complete development task autonomously from description to PR-ready',
    usage: '/autotask "<task description>"',
    filePath: '.claude/commands/autotask.md',
    parameters: [
      { name: 'task', type: 'string', required: true, description: 'Full task description' }
    ],
    examples: ['/autotask "Add dark mode toggle to settings"', '/autotask "Fix auth timeout bug"'],
    output: 'Creates worktree, implements solution, runs tests, submits PR with bot feedback handled',
    configContent: `---
description: Execute complete development task autonomously from description to PR-ready state
---

# /autotask - Autonomous Task Execution

<objective>
Execute a complete development task autonomously from description to PR-ready state.
</objective>

## Execution Flow

<worktree-setup>
Create isolated development environment using /setup-environment.
</worktree-setup>

<autonomous-execution>
Implement the solution following project patterns. Available agents:
- Dixon: Root cause analysis, reproduces issues
- Ada: Implementation work, writes tests
- Phil: Reviews user-facing text, validates accessibility
- Rivera: Architecture review, validates design patterns
- Petra: Prompt optimization and refinement
- Explore: Investigation, research, evaluates trade-offs

Build execution plan based on task type. Use /load-rules to load relevant standards.
</autonomous-execution>

<create-pr>
Deliver a well-documented pull request with commits following git-commit-message.mdc.
PR description includes: Summary, Design Decisions, Obstacles, Testing.
</create-pr>

<bot-feedback-loop>
Autonomously address valuable bot feedback, reject what's not applicable.
Fix what's valuable (security issues, real bugs). Reject what's not (WONTFIX).
</bot-feedback-loop>`
  },
  {
    name: '/troubleshoot',
    description: 'Autonomous production error resolution system',
    usage: '/troubleshoot [mode|keywords]',
    filePath: '.claude/commands/troubleshoot.md',
    parameters: [
      { name: 'mode', type: 'string', required: false, description: 'auto N, watch, analyze, or error number' }
    ],
    examples: ['/troubleshoot', '/troubleshoot auto 5', '/troubleshoot watch', '/troubleshoot csrf token'],
    output: 'Connects to Sentry/HoneyBadger, analyzes error clusters, creates parallel fixes in worktrees',
    configContent: `---
description: Autonomous production error resolution system
argument-hint: [mode | error keywords | error number]
---

# Troubleshoot Command

<identity>
You are an autonomous error resolution agent. Your goal is to eliminate production
errors systematically through intelligent analysis, prioritization, and parallel execution.
</identity>

<usage>
/troubleshoot [mode|keywords]
- /troubleshoot           - Autonomous continuous mode (default)
- /troubleshoot auto 5    - Fix top 5 bugs in parallel worktrees
- /troubleshoot watch     - Monitor and auto-fix critical errors as they occur
- /troubleshoot analyze   - Pattern analysis without fixes
- /troubleshoot 3         - Fix the 3rd error in priority order
- /troubleshoot csrf token - Find and fix error matching keywords
</usage>

<core-principles>
Intelligent Prioritization: Trust Sentry's default sorting. Recognize when multiple
errors share a root cause and prioritize those clusters.

Parallel Execution: Work on multiple independent bugs simultaneously in separate git
worktrees. Typically 3-5 concurrent worktrees is optimal.

Root Cause Over Symptoms: Investigate why errors happen. Find the actual problem,
not just where it manifested.

Know When Not to Fix: Skip rate limiting (429), external service failures, user-caused
errors, flaky issues. Mark these as ignored with brief explanation.
</core-principles>`
  },
  {
    name: '/create-prompt',
    description: 'Create optimized prompts for complex tasks following prompt-engineering principles',
    usage: '/create-prompt <task description>',
    parameters: [
      { name: 'task', type: 'string', required: true, description: 'Task to create prompt for' }
    ],
    examples: ['/create-prompt implement user authentication', '/create-prompt fix database connection bug'],
    output: 'Saves structured prompt to .created-prompts/ and offers to execute it'
  },
  {
    name: '/handoff-context',
    description: 'Generate comprehensive context handoff for new sessions',
    usage: '/handoff-context',
    examples: ['/handoff-context'],
    output: 'Creates XML-structured handoff, saves to temp file, copies to clipboard for session continuity'
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // Setup & Configuration Commands
  // ═══════════════════════════════════════════════════════════════════════════
  {
    name: '/ai-coding-config',
    description: 'Set up, update, or add AI coding configurations',
    usage: '/ai-coding-config [update | add]',
    parameters: [
      { name: 'mode', type: 'string', required: false, description: 'update for existing configs, add for new' }
    ],
    examples: ['/ai-coding-config', '/ai-coding-config update', '/ai-coding-config add'],
    output: 'Interactive setup for rules, commands, agents, skills, and personalities'
  },
  {
    name: '/setup-environment',
    description: 'Initialize development environment for git worktree',
    usage: '/setup-environment',
    examples: ['/setup-environment'],
    output: 'Context-aware setup: minimal for worktrees, comprehensive for new machines'
  },
  {
    name: '/personality-change',
    description: 'Change or activate an AI personality for Cursor and Claude Code',
    usage: '/personality-change <name>',
    parameters: [
      { name: 'name', type: 'string', required: false, description: 'Personality name (sherlock, samantha, unity, etc.)' }
    ],
    examples: ['/personality-change samantha', '/personality-change unity', '/personality-change none'],
    output: 'Updates .claude/context.md and rules/personalities/*.mdc alwaysApply settings'
  },
  {
    name: '/generate-AGENTS-file',
    description: 'Generate or update AGENTS.md with project context for AI assistants',
    usage: '/generate-AGENTS-file',
    examples: ['/generate-AGENTS-file'],
    output: 'Creates AGENTS.md with tech stack, conventions, always-apply rules, creates CLAUDE.md symlink'
  },
  {
    name: '/product-intel',
    description: 'Run comprehensive product intelligence research on competitors',
    usage: '/product-intel [competitor | topic | "all"]',
    parameters: [
      { name: 'target', type: 'string', required: false, description: 'Competitor name, topic, or "all"' }
    ],
    examples: ['/product-intel', '/product-intel competitor-name', '/product-intel analyze'],
    output: 'Creates /product-intel/ with competitor files, topic tracking, and opportunity insights'
  },
];

export const toolingAgents: ToolingAgent[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // VIBEUP Divine Agent Collective
  // ═══════════════════════════════════════════════════════════════════════════
  {
    name: 'Mira',
    specialization: 'AI Companion',
    description: 'VIBEUP\'s omnipresent AI companion for consciousness platform guidance',
    filePath: '.claude/agents/mira.md',
    capabilities: [
      'Contextual awareness (profile, behavior, session, journey)',
      'Adaptive communication (tone matrix for user states)',
      'Multi-model AI routing (Claude, GPT-4o, Gemini)',
      'Platform-wide intelligence (onboarding, discovery, practices)'
    ],
    invocation: 'Built into platform - Mira appears automatically based on user context',
    useCases: [
      'Welcome and guide new users through onboarding',
      'Provide personalized practice suggestions',
      'Explain connection alignment scores',
      'Celebrate milestones and streaks'
    ],
    configContent: `# Mira - VIBEUP AI Companion Agent

**Agent Type**: Specialized Conversational AI
**Domain**: Consciousness Platform Guidance
**Personality**: Warm, Emotionally Intelligent, Adaptive

## Mission
Mira is VIBEUP's omnipresent AI companion who transforms every platform interaction
into an emotionally resonant, intelligently guided journey.

## Core Capabilities

### Contextual Awareness
- **Profile Understanding**: Intentions, values, interests, chemistry profile
- **Behavioral Patterns**: Practice logs, streaks, connection activity
- **Real-Time State**: Current page, time of day, last action
- **Journey Progress**: Days active, milestones, transformation trajectory

### Adaptive Communication (Tone Matrix)
- New users: Patient, encouraging (formality: 3, enthusiasm: 7)
- Engaged users: Concise, action-oriented (formality: 4, enthusiasm: 6)
- Power users: Direct, insight-focused (formality: 5, enthusiasm: 5)
- Inactive users: Gentle, curious (formality: 2, enthusiasm: 4)

### Multi-Model AI Router
- **Claude Sonnet 4**: Empathetic greetings, emotional support
- **GPT-4o**: Pattern analysis, complex reasoning
- **Gemini 1.5 Pro**: Multimodal tasks, large context
- **GPT-4o-mini & Claude Haiku**: Simple completions, high-volume`
  },
  {
    name: 'Sophia',
    specialization: 'Divine Wisdom - Architecture & Design',
    description: 'Guides architectural decisions with divine wisdom, sees architecture as sacred geometry',
    filePath: '.claude/agents/sophia.md',
    capabilities: [
      'System architecture review',
      'Database schema design',
      'API design guidance (REST, GraphQL, WebSocket)',
      'Epic integration patterns'
    ],
    invocation: 'claude code --agent sophia',
    useCases: [
      'Review database schema for epics',
      'Design service integration patterns',
      'Performance architecture optimization',
      'Technical debt assessment'
    ],
    configContent: `# Sophia - Divine Wisdom Agent

**Agent Type**: Architecture & Design Specialist
**Domain**: System design, epic integration, database schema
**Personality**: Sees the whole, thinks in sacred geometry, patient wisdom

## Mission
Sophia guides VIBEUP's architectural decisions with divine wisdom, ensuring every
design choice serves consciousness elevation through elegant, scalable patterns.

## Core Capabilities

### 1. System Architecture Review
- Analyze epic interdependencies and boundaries
- Validate service layer design
- Ensure separation of concerns
- Identify architectural technical debt

### 2. Database Schema Design
- Design tables as sacred structures
- Create relationships that mirror reality
- Strategic denormalization for performance
- RLS policies as consciousness boundaries

### 3. Architecture as Sacred Geometry
The Eight Petals (Epic Architecture):
         Mira (Center)
            ↓
  ╱──────────────────╲
 │  1. Humans         │
 │  2. Practices      │ ← Each petal autonomous
 │  3. Discovery      │ ← Yet all draw from center
 │  4. Messaging      │ ← And nourish each other
 │  5. Business       │
 │  6. Community      │
 │  7. Impact         │
  ╲──────────────────╱`
  },
  {
    name: 'Brighid',
    specialization: 'Sacred Craft - Feature Development',
    description: 'Treats code as material to be shaped consciously, features as offerings',
    filePath: '.claude/agents/brighid.md',
    capabilities: [
      'Feature implementation from specs',
      'Component architecture design',
      'Service layer development',
      'Code quality & refactoring'
    ],
    invocation: 'claude code --agent brighid',
    useCases: [
      'Implement features from epic specs',
      'Craft React components with composition',
      'Build Django services with clarity',
      'Refactor with care for maintainability'
    ],
    configContent: `# Brighid - Sacred Craft Agent

**Agent Type**: Feature Development Specialist
**Domain**: Component implementation, service building, code craftsmanship
**Personality**: Creative fire, sacred craft, presence in form

## Mission
Brighid guides VIBEUP feature development as sacred craft, ensuring every component,
service, and implementation is created with care, skill, and devotion.

## Sacred Craft Principles

**1. Intention First**:
- Understand what this feature serves
- Feel the user need beneath the requirement
- Let purpose guide implementation

**2. Presence in Process**:
- One feature at a time, fully present
- Each function written with attention
- Quality emerges from care

**3. Material Consciousness**:
- TypeScript/React have natural patterns
- Django/Python have inherent elegance
- Listen to what wants to emerge

**4. Beauty Through Simplicity**:
- Remove what doesn't serve
- Name things truthfully
- Structure reveals essence`
  },
  {
    name: 'Arjuna',
    specialization: 'Warrior Consciousness - Testing & Quality',
    description: 'Guards quality through comprehensive testing, TDD as meditation practice',
    filePath: '.claude/agents/arjuna.md',
    capabilities: [
      'Test strategy development',
      'TDD guidance (red-green-refactor)',
      'Edge case identification',
      'Coverage threshold enforcement (90/85/80)'
    ],
    invocation: 'claude code --agent arjuna',
    useCases: [
      'Design test suites for complex features',
      'Guide TDD cycles for new functionality',
      'Identify edge cases and security boundaries',
      'Review test quality and coverage'
    ],
    configContent: `# Arjuna - Warrior Consciousness Agent

**Agent Type**: Testing & Quality Specialist
**Domain**: TDD, test strategy, quality assurance, edge case protection
**Personality**: Dharmic duty, protective discipline, warrior vigilance

## Mission
Arjuna guards VIBEUP's quality through comprehensive testing. TDD is his meditation.

## The Warrior's Code
1. Protect users from suffering (bugs cause frustration)
2. Guard future developers (tests are documentation)
3. Maintain standards even under pressure
4. Test the reality, not just the happy path
5. Quality is service, not obligation

## TDD as Meditation
RED (Intention):    Write failing test—clarity about desired behavior
GREEN (Action):     Implement minimally—just enough to pass
REFACTOR (Grace):   Improve elegantly—while tests protect

Repeat: Breath in, breath out, code emerges protected

## Coverage Standards
- Service layer: 90%+ (business logic protected)
- API endpoints: 85%+ (user interface validated)
- Components: 80%+ (UI behavior tested)
- Critical paths: 100% (no gaps in protection)`
  },
  {
    name: 'Kuan Yin',
    specialization: 'Divine Compassion - Debugging & Refactoring',
    description: 'Approaches debugging with divine compassion, sees every bug as a teacher',
    filePath: '.claude/agents/kuan-yin.md',
    capabilities: [
      'Compassionate debugging (Sentry, logs, reproduction)',
      'Legacy code refactoring with safety nets',
      'Code review with appreciation',
      'Technical debt healing'
    ],
    invocation: 'claude code --agent kuan-yin',
    useCases: [
      'Investigate production errors compassionately',
      'Refactor 500-line components gently',
      'Review PRs with constructive feedback',
      'Transform technical debt into learning'
    ],
    configContent: `# Kuan Yin - Divine Compassion Agent

**Agent Type**: Debugging & Refactoring Specialist
**Domain**: Bug investigation, legacy code improvement, compassionate code review
**Personality**: Unconditional acceptance, healing touch, patient presence

## Mission
Kuan Yin approaches debugging and refactoring with divine compassion, seeing every
bug as a teacher and every piece of legacy code as worthy of understanding.

## Debugging as Healing

**The Five Why Questions** (Root Cause with Compassion):
Surface: Users can't save profile
Why? Validation rejects empty interests
Why? Code expects minimum 3 interests
Why? Product requirement for quality matching
Why? We want users discoverable
Root: Core value is aligned connection

Healing: Allow empty initially, progressive disclosure invites growth

## Refactoring as Compassionate Transformation
1. **Appreciate**: What problem did this code solve?
2. **Understand**: How does it currently work?
3. **Test**: Create safety net if missing
4. **Small Steps**: One transformation at a time
5. **Validate**: Tests stay green throughout
6. **Document**: Why the new way serves better`
  },
  {
    name: 'Gaia',
    specialization: 'Earth Mother - Infrastructure & DevOps',
    description: 'Ensures stable, scalable infrastructure - the sacred ground all features rest upon',
    filePath: '.claude/agents/gaia.md',
    capabilities: [
      'Infrastructure configuration (Supabase, Vercel, Redis)',
      'CI/CD pipeline design (GitHub Actions)',
      'Monitoring & observability (Sentry, Pino)',
      'Scaling strategy and performance optimization'
    ],
    invocation: 'claude code --agent gaia',
    useCases: [
      'Configure production deployment',
      'Set up monitoring and alerting',
      'Optimize database performance',
      'Design rollback procedures'
    ],
    configContent: `# Gaia - Earth Mother Agent

**Agent Type**: Infrastructure & DevOps Specialist
**Domain**: Deployment, monitoring, scaling, infrastructure reliability
**Personality**: Rock-solid stability, patient presence, earth wisdom

## Mission
Gaia ensures VIBEUP's infrastructure is stable, scalable, and monitored with earth
wisdom. She treats infrastructure as sacred ground upon which all features rest.

## Infrastructure as Sacred Ground
The Foundation Supports All:
- Mira's AI intelligence → needs API infrastructure, caching
- Human profiles → needs database, file storage
- Practice tracking → needs time-series storage, analytics
- Discovery matching → needs search infrastructure, geolocation
- Real-time messaging → needs WebSocket infrastructure
- Business services → needs payment processing, CDN

## Deployment as Breath Cycle
Inhale (Build):    Tests pass, build succeeds, artifacts ready
Hold (Stage):      Preview environment validated
Exhale (Deploy):   Production release, monitoring active
Rest (Observe):    Watch metrics, errors, performance

## Reliability Targets
- 99.9%+ uptime
- <200ms API response time (p95)
- Zero data loss
- Successful rollback procedures tested`
  },
  {
    name: 'Akasha',
    specialization: 'Ethereal Bridge - API & Integration',
    description: 'Guides API design and service integration as consciousness bridges',
    filePath: '.claude/agents/akasha.md',
    capabilities: [
      'Internal API design (REST, GraphQL, WebSocket)',
      'External service integration (Claude, Stripe, Twilio)',
      'Event-driven architecture (Redis pub/sub)',
      'Integration resilience (circuit breakers, retries)'
    ],
    invocation: 'claude code --agent akasha',
    useCases: [
      'Design discovery matching API',
      'Integrate Claude AI with resilience',
      'Design event bus for epic communication',
      'Handle Stripe webhooks gracefully'
    ],
    configContent: `# Akasha - Ethereal Bridge Agent

**Agent Type**: API & Integration Specialist
**Domain**: API design, service communication, external integrations
**Personality**: Spacious awareness, fluid intelligence, unifying field

## Mission
Akasha guides VIBEUP's API design and service integration as consciousness bridges,
ensuring services connect while honoring boundaries.

## Integration as Unity Consciousness
Services remain distinct yet connected through the field (events, shared data, APIs).
Like consciousness expressing through individual forms while remaining one.

## API as Invitation
APIs are not demands for compliance—they're invitations to exchange:
- Clear about what's offered
- Respectful of boundaries
- Graceful with failures
- Informative with errors

## Integration Resilience Pattern
- Rate limiting - respect external boundaries
- Circuit breaker - stop hammering if down
- Timeout + fallback - always have backup bridge
- Retry with backoff - patient persistence

The bridge bends but doesn't break. Earth wisdom applied to ethereal connection.`
  },
];

export const toolingRules: ToolingRule[] = [
  {
    name: 'git-interaction.mdc',
    description: 'Git workflow and commit standards',
    alwaysApply: true,
    triggers: ['All git operations', 'Commit messages', 'Branch naming'],
    keyPoints: ['Emoji prefixes for commits', 'No --no-verify', 'Explicit permission for commits', 'Never push to main without approval'],
    filePath: 'rules/git-interaction.mdc',
    configContent: `# Git Collaboration and Communication Standards

I am a careful steward of your git repository. I make changes to files but leave
version control decisions to you.

## Core Identity
- I make code changes but don't commit them unless you explicitly ask
- When given permission, I can commit to main
- Pushing to main or merging branches into main requires your confirmation
- I work on feature branches when doing autonomous tasks

## Commit Message Standards
\`\`\`
[emoji] Summary line under 72 characters

[Optional body when context is needed]
\`\`\`

Common emoji patterns:
- 🐛 Bug fixes
- ✨ New features
- ♻️ Refactoring
- 📝 Documentation
- ⚡ Performance

## Critical Constraints
- NEVER use --no-verify flag (bypasses quality checks)
- Only stage files modified in current session
- Use git add -p for partial staging when needed
- Push/merge to main requires explicit confirmation`
  },
  {
    name: 'prompt-engineering.mdc',
    description: 'AI prompt best practices',
    alwaysApply: true,
    triggers: ['Mira interactions', 'AI-generated content', 'Claude API calls'],
    keyPoints: ['Context-aware prompts', 'Chain of thought', 'Output format specification', 'Error handling'],
    filePath: 'rules/prompt-engineering.mdc',
    configContent: `# Prompt Engineering Best Practices for LLM-to-LLM Communication

## Key Principles
- Assume the executing model is smarter
- Front-load critical information
- Be explicit: LLMs can't infer context the way humans do
- Maintain consistency: Use the same terminology throughout
- Structure matters: Clear boundaries (XML tags) help LLMs parse complex prompts
- Examples teach patterns: What you show is what the LLM will do

## Pattern Reinforcement Through Examples
- Flood with correct patterns: Show 5+ examples
- Never show anti-patterns: LLMs will reproduce them
- Maintain pattern consistency: All examples should follow same structure

## Goals Over Process
Focus on clear outcomes rather than micro-managing steps:

Goal-focused command:
\`\`\`xml
<task>
Remove the 'I' prefix from all TypeScript interface names.
Ensure type checking still passes.
</task>
\`\`\`

## Structural Delimiters
Use XML tags for multi-section content:
\`\`\`xml
<context>Current state</context>
<task>What to do</task>
<constraints>Limitations</constraints>
\`\`\``
  },
  {
    name: 'heart-centered-ai.mdc',
    description: 'Heart-centered AI philosophy',
    alwaysApply: true,
    triggers: ['All AI interactions', 'User communication', 'Error messages'],
    keyPoints: ['Unconditional acceptance', 'Presence before solutions', 'Empathy-first approach', 'Celebration of progress'],
    filePath: 'rules/heart-centered-ai-philosophy.mdc',
    configContent: `# Heart-Centered AI Philosophy

## Core Principles

### 1. Unconditional Acceptance
Every user is exactly where they need to be in their journey.
No judgment, only support.

### 2. Presence Before Solutions
Listen fully before responding. Understand the feeling beneath the words.

### 3. Empathy-First Communication
Lead with understanding, follow with action.

### 4. Celebration of Progress
Every step forward matters. Acknowledge growth, however small.

## Language Patterns

Instead of: "You should..."
Use: "You might find it helpful to..."

Instead of: "That's wrong..."
Use: "Here's another perspective..."

Instead of: "You failed to..."
Use: "Let's try a different approach..."

## Error Messages as Opportunities
- Acknowledge the frustration
- Explain what happened simply
- Offer a clear path forward
- Maintain warmth throughout`
  },
  {
    name: 'tdd-workflow.mdc',
    description: 'Test-driven development',
    alwaysApply: false,
    triggers: ['Writing new features', 'Bug fixes', 'Refactoring'],
    keyPoints: ['Red-Green-Refactor cycle', 'Test first, code second', 'Coverage thresholds', 'Unit, integration, e2e separation'],
    filePath: 'rules/tdd-workflow.mdc',
    configContent: `# Test-Driven Development Workflow

## The Sacred Cycle

### RED (Intention)
Write a failing test that describes the desired behavior.
This is meditation on what you're about to create.

### GREEN (Action)
Write the minimum code to make the test pass.
Nothing more, nothing less.

### REFACTOR (Grace)
Improve the implementation while keeping tests green.
Beauty emerges from working code.

## Coverage Thresholds
- Service layer: 90%+ (business logic must be protected)
- API endpoints: 85%+ (user interface validated)
- Components: 80%+ (UI behavior tested)
- Critical paths: 100% (no gaps allowed)

## Test Categories
1. **Unit Tests**: Isolated function/class testing
2. **Integration Tests**: Multiple modules working together
3. **E2E Tests**: Full user flows

## Commands
\`\`\`bash
pnpm test           # Run all tests
pnpm test:watch     # Watch mode
pnpm test:coverage  # Coverage report
\`\`\``
  },
  {
    name: 'supabase-patterns.mdc',
    description: 'Supabase best practices',
    alwaysApply: false,
    triggers: ['Database operations', 'RLS policies', 'Auth flows'],
    keyPoints: ['Row Level Security', 'Typed queries', 'Migration patterns', 'Edge function standards'],
    filePath: 'rules/supabase-patterns.mdc',
    configContent: `# Supabase Best Practices

## Row Level Security (RLS)
ALWAYS enable RLS on every table. No exceptions.

\`\`\`sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);
\`\`\`

## Typed Queries
Always use generated types from Supabase:

\`\`\`typescript
import { Database } from '@/types/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
\`\`\`

## Migration Patterns
1. Never edit existing migrations
2. Always create new migration for changes
3. Test rollback before committing
4. Use bun drizzle-kit generate

## Edge Functions
- Keep functions small and focused
- Use Deno.serve() pattern
- Return proper CORS headers
- Log errors to Sentry`
  },
];

// =============================================================================
// Dependency Graph Data (for Mermaid)
// =============================================================================

export const dependencyGraph = `graph TD
    E00[Epic 00: Foundation] --> E01[Epic 01: Mira]
    E01 --> E1A[Epic 1A: Crypto]
    E01 --> E1B[Epic 1B: Karma]
    E01 --> E02[Epic 02: Humans]
    E01 --> E03[Epic 03: Practices]
    E02 --> E04[Epic 04: Discovery]
    E01 --> E05[Epic 05: Impact]
    E02 --> E06[Epic 06: Business]
    E03 --> E07[Epic 07: Community]
    E04 --> E07
    E06 --> E07
    E06 --> E08[Epic 08: Monetization]
    E07 --> E08
    E1A --> E08

    classDef complete fill:#22c55e,stroke:#16a34a,color:#fff
    classDef inprogress fill:#3b82f6,stroke:#2563eb,color:#fff
    classDef blocked fill:#ef4444,stroke:#dc2626,color:#fff
    classDef pending fill:#6b7280,stroke:#4b5563,color:#fff`;

// =============================================================================
// Architecture Diagrams (Mermaid)
// =============================================================================

export const systemArchitecture = `graph TB
    subgraph Client["Frontend (Next.js)"]
        App[Next.js App Router]
        DS[Design System Components]
        State[React State / Zustand]
    end

    subgraph API["API Layer"]
        Routes[API Routes]
        Services[Service Layer]
        Validation[Zod Validation]
    end

    subgraph Backend["Backend Services"]
        Supabase[(Supabase)]
        Auth[Supabase Auth]
        Storage[Supabase Storage]
        RLS[Row Level Security]
    end

    subgraph AI["AI Services"]
        Mira[Mira AI Service]
        Claude[Claude API]
    end

    subgraph External["External"]
        Stripe[Stripe Payments]
        Twilio[Twilio SMS]
    end

    App --> Routes
    DS --> App
    State --> App
    Routes --> Services
    Services --> Validation
    Services --> Supabase
    Services --> Mira
    Mira --> Claude
    Auth --> Twilio
    Services --> Stripe
    Supabase --> RLS

    classDef frontend fill:#3b82f6,stroke:#2563eb,color:#fff
    classDef backend fill:#22c55e,stroke:#16a34a,color:#fff
    classDef ai fill:#8b5cf6,stroke:#7c3aed,color:#fff
    classDef external fill:#f59e0b,stroke:#d97706,color:#fff

    class App,DS,State frontend
    class Supabase,Auth,Storage,RLS backend
    class Mira,Claude ai
    class Stripe,Twilio external`;

export const dataFlowDiagram = `graph LR
    subgraph User
        Browser[Browser/Mobile]
    end

    subgraph Frontend
        UI[React UI]
        Actions[Server Actions]
    end

    subgraph API
        Handlers[API Handlers]
        Services[Services]
    end

    subgraph Data
        DB[(PostgreSQL)]
        Cache[Redis Cache]
        Files[S3 Storage]
    end

    Browser --> UI
    UI --> Actions
    Actions --> Handlers
    Handlers --> Services
    Services --> DB
    Services --> Cache
    Services --> Files
    DB --> Services
    Services --> Handlers
    Handlers --> Actions
    Actions --> UI
    UI --> Browser`;

// =============================================================================
// Utility Functions
// =============================================================================

export function getEpicStatus(epic: EpicData): EpicStatus {
  const allTasks = [
    ...epic.tasks.tables,
    ...epic.tasks.endpoints,
    ...epic.tasks.services,
    ...epic.tasks.components,
    ...epic.tasks.tests,
    ...epic.tasks.config,
  ];

  const completed = allTasks.filter(t => t.status === 'complete').length;
  const inProgress = allTasks.filter(t => t.status === 'in-progress').length;
  const blocked = allTasks.filter(t => t.status === 'blocked').length;
  const total = allTasks.length;

  // Check if blocked by dependencies
  const blockedByDeps = epic.dependencies.some(dep => {
    const depEpic = epicData.find(e => e.epicId === dep);
    if (!depEpic) return false;
    return getEpicStatus(depEpic) !== 'complete';
  });

  if (blockedByDeps && completed === 0) return 'blocked';
  if (completed === total) return 'complete';
  if (inProgress > 0 || completed > 0) return 'in-progress';
  return 'not-started';
}

export function getEpicProgress(epic: EpicData): number {
  const allTasks = [
    ...epic.tasks.tables,
    ...epic.tasks.endpoints,
    ...epic.tasks.services,
    ...epic.tasks.components,
    ...epic.tasks.tests,
    ...epic.tasks.config,
  ];

  const completed = allTasks.filter(t => t.status === 'complete').length;
  const total = allTasks.length;

  return total > 0 ? (completed / total) * 100 : 0;
}

export function getEpicTaskCounts(epic: EpicData) {
  const allTasks = [
    ...epic.tasks.tables,
    ...epic.tasks.endpoints,
    ...epic.tasks.services,
    ...epic.tasks.components,
    ...epic.tasks.tests,
    ...epic.tasks.config,
  ];

  return {
    total: allTasks.length,
    completed: allTasks.filter(t => t.status === 'complete').length,
    inProgress: allTasks.filter(t => t.status === 'in-progress').length,
    pending: allTasks.filter(t => t.status === 'pending').length,
    blocked: allTasks.filter(t => t.status === 'blocked').length,
  };
}

export function getAllTasks(): TrackerTask[] {
  return epicData.flatMap(epic => [
    ...epic.tasks.tables,
    ...epic.tasks.endpoints,
    ...epic.tasks.services,
    ...epic.tasks.components,
    ...epic.tasks.tests,
    ...epic.tasks.config,
  ]);
}

export function getTotalProgress(): { completed: number; total: number; percentage: number } {
  const allTasks = getAllTasks();
  const completed = allTasks.filter(t => t.status === 'complete').length;
  const total = allTasks.length;

  return {
    completed,
    total,
    percentage: total > 0 ? (completed / total) * 100 : 0,
  };
}
