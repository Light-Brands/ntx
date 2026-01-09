# VIBEUP Development Tracker

**Last Updated**: 2025-12-23
**Total Epics**: 11
**Build Order**: Epic 00 → 01 → (1A, 1B, 02, 03, 05) → (04, 06) → 07 → 08

---

## Epic 00: Foundation
**Status**: Not Started | **Dependencies**: None | **Phase**: Foundation

### Database Tables
- [ ] profiles - User profiles extending Supabase auth
- [ ] feature_flags - Feature flag system for gradual rollout
- [ ] admin_users - Admin permissions and access control
- [ ] analytics_events - Platform analytics tracking

### API Endpoints
- [ ] GET /api/health - System health check
- [ ] GET /api/flags - Get feature flags for client
- [ ] POST /api/flags - Admin create/update flag
- [ ] GET /api/auth/session - Get current session
- [ ] POST /api/auth/signup - Phone/Email OTP signup
- [ ] POST /api/auth/verify - Verify OTP code
- [ ] POST /api/auth/logout - Sign out user
- [ ] POST /api/analytics/track - Track analytics event

### Services
- [ ] AuthService - Authentication flows (SMS, Email, OAuth)
- [ ] FeatureFlagService - Feature flag management
- [ ] AnalyticsService - Event tracking and analytics
- [ ] LoggerService - Unified logging with Sentry

### Components
- [ ] AuthProvider - Authentication context provider
- [ ] LoginForm - Phone/Email login UI
- [ ] SignupForm - Registration flow
- [ ] OTPInput - 6-digit code input
- [ ] AdminLayout - Admin panel layout
- [ ] FeatureFlagToggle - Flag management UI

### Tests
- [ ] auth.test.ts - Authentication flow tests
- [ ] feature-flags.test.ts - Feature flag service tests
- [ ] analytics.test.ts - Analytics tracking tests
- [ ] health.test.ts - Health check endpoint tests

### Configuration
- [ ] Supabase project setup
- [ ] Vercel deployment config
- [ ] Sentry error tracking
- [ ] GitHub Actions CI/CD
- [ ] Environment variables

---

## Epic 01: Mira
**Status**: Not Started | **Dependencies**: Epic 00 | **Phase**: MVP

### Database Tables
- [ ] mira_interactions - Conversation history with Mira
- [ ] onboarding_state - User onboarding progress
- [ ] mira_prompts - Contextual prompt templates

### API Endpoints
- [ ] GET /api/mira/greeting - Get personalized greeting
- [ ] POST /api/mira/chat - Send message to Mira
- [ ] GET /api/mira/context - Get user context for Mira
- [ ] POST /api/mira/prompt - Generate contextual prompt
- [ ] GET /api/onboarding/state - Get onboarding progress
- [ ] POST /api/onboarding/step - Complete onboarding step
- [ ] POST /api/onboarding/complete - Finish onboarding

### Services
- [ ] MiraService - AI conversation and prompts
- [ ] OnboardingService - Onboarding flow management
- [ ] MiraContextService - User context aggregation
- [ ] ClaudeIntegration - Claude API integration

### Components
- [ ] MiraChat - Chat interface with Mira
- [ ] MiraAvatar - Animated Mira avatar
- [ ] MiraPromptCard - Contextual suggestion card
- [ ] OnboardingFlow - Multi-step onboarding
- [ ] OnboardingProgress - Progress indicator
- [ ] WelcomeScreen - First-time user welcome
- [ ] IntentionCapture - Capture user intentions
- [ ] MicroPractice - 60-second breathwork

### Tests
- [ ] mira-service.test.ts - Mira service tests
- [ ] onboarding.test.ts - Onboarding flow tests
- [ ] mira-chat.test.tsx - Chat component tests

---

## Epic 1A: Crypto ($VIBES)
**Status**: Not Started | **Dependencies**: Epic 00, Epic 01 | **Phase**: MVP

### Database Tables
- [ ] user_wallets - User crypto wallets
- [ ] crypto_transactions - Transaction history
- [ ] vibe_token_balances - $VIBES token balances
- [ ] vibe_rewards - Reward distributions
- [ ] payment_requests - P2P payment requests
- [ ] stake_positions - Staking positions
- [ ] soul_bound_tokens - Non-transferable achievement tokens
- [ ] community_treasuries - Community treasury balances

### API Endpoints
- [ ] POST /api/wallet/create - Create embedded wallet
- [ ] GET /api/wallet/balance - Get wallet balances
- [ ] GET /api/wallet/resolve/:handle - Resolve @handle to address
- [ ] POST /api/wallet/connect - Connect external wallet
- [ ] POST /api/payment/send - Send VIBES or USDC
- [ ] POST /api/payment/request - Create payment request
- [ ] GET /api/payment/requests - Get pending requests
- [ ] POST /api/vibes/award - Award VIBES reward
- [ ] GET /api/vibes/rewards - Get reward history
- [ ] POST /api/stake/create - Stake VIBES
- [ ] GET /api/stake/positions - Get staking positions

### Services
- [ ] CryptoRouterService - Main crypto operations
- [ ] WalletService - Wallet management
- [ ] PaymentService - Payment processing
- [ ] RewardService - VIBES reward distribution
- [ ] StakingService - Staking operations
- [ ] HandleResolver - @handle resolution

### Components
- [ ] WalletWidget - Wallet balance display
- [ ] SendPayment - Payment send form
- [ ] PaymentRequest - Request money UI
- [ ] TransactionHistory - Transaction list
- [ ] StakingPanel - Staking interface
- [ ] RewardNotification - Reward earned toast
- [ ] HandleInput - @handle autocomplete

### Tests
- [ ] wallet-service.test.ts - Wallet operations tests
- [ ] payment-service.test.ts - Payment tests
- [ ] staking.test.ts - Staking tests
- [ ] handle-resolver.test.ts - Handle resolution tests

---

## Epic 1B: Karma
**Status**: Not Started | **Dependencies**: Epic 00, Epic 01 | **Phase**: MVP

### Database Tables
- [ ] karma_scores - User karma totals and levels
- [ ] karma_actions - Individual karma-earning actions
- [ ] planetary_impact - Environmental impact tracking
- [ ] karma_badges - Achievement badges
- [ ] karma_leaderboards - Weekly/monthly rankings

### API Endpoints
- [ ] POST /api/karma/award - Award karma points
- [ ] GET /api/karma/score - Get user's karma score
- [ ] GET /api/karma/actions - Get karma action history
- [ ] GET /api/karma/badges - Get earned badges
- [ ] GET /api/karma/leaderboard - Get leaderboard
- [ ] GET /api/karma/planetary - Get planetary impact stats
- [ ] POST /api/karma/mint-badge - Mint badge as SBT

### Services
- [ ] KarmaRouterService - Main karma operations
- [ ] KarmaCalculator - Points calculation
- [ ] BadgeService - Badge awarding
- [ ] LeaderboardService - Rankings calculation
- [ ] PlanetaryService - Environmental impact

### Components
- [ ] KarmaScore - Score display widget
- [ ] KarmaLevel - Level progress indicator
- [ ] BadgeGrid - Earned badges display
- [ ] LeaderboardList - Rankings list
- [ ] PlanetaryImpact - Environmental stats
- [ ] KarmaNotification - Points earned toast
- [ ] LevelUpCelebration - Level up animation

### Tests
- [ ] karma-service.test.ts - Karma service tests
- [ ] badge-service.test.ts - Badge tests
- [ ] leaderboard.test.ts - Leaderboard tests

---

## Epic 02: Humans
**Status**: Not Started | **Dependencies**: Epic 00, Epic 01 | **Phase**: MVP

### Database Tables
- [ ] profile_attributes - User profile attributes (values, interests)
- [ ] chemistry_assessments - Personality/chemistry test results
- [ ] connections - User connections (friends)
- [ ] profile_views - Who viewed profile tracking

### API Endpoints
- [ ] GET /api/profile/:id - Get user profile
- [ ] PUT /api/profile - Update own profile
- [ ] POST /api/profile/attributes - Update profile attributes
- [ ] POST /api/chemistry/submit - Submit chemistry assessment
- [ ] GET /api/chemistry/results - Get chemistry results
- [ ] POST /api/connections/request - Send connection request
- [ ] POST /api/connections/accept - Accept connection
- [ ] GET /api/connections - Get user's connections
- [ ] GET /api/profile/views - Get profile view history

### Services
- [ ] ProfileService - Profile management
- [ ] ChemistryService - Chemistry calculations
- [ ] ConnectionService - Connection management
- [ ] CompatibilityService - Compatibility scoring

### Components
- [ ] ProfileCard - User profile card
- [ ] ProfileEditor - Profile editing form
- [ ] AttributeSelector - Multi-select attributes
- [ ] ChemistryQuiz - Personality assessment
- [ ] ChemistryResults - Results visualization
- [ ] ConnectionsList - Friends list
- [ ] ConnectionRequest - Request notification
- [ ] CompatibilityBadge - Compatibility score display

### Tests
- [ ] profile-service.test.ts - Profile service tests
- [ ] chemistry.test.ts - Chemistry calculation tests
- [ ] connections.test.ts - Connection tests

---

## Epic 03: Practices
**Status**: Not Started | **Dependencies**: Epic 00, Epic 01 | **Phase**: MVP

### Database Tables
- [ ] practice_definitions - Practice types and metadata
- [ ] practices - User's tracked practices
- [ ] practice_logs - Individual practice sessions
- [ ] practice_streaks - Streak tracking
- [ ] affirmations - Daily affirmations
- [ ] community_journeys - Group practice programs
- [ ] journey_participants - Journey enrollment

### API Endpoints
- [ ] GET /api/practices - Get user's practices
- [ ] POST /api/practices - Create new practice
- [ ] POST /api/practices/:id/log - Log practice session
- [ ] GET /api/practices/:id/logs - Get practice history
- [ ] GET /api/practices/streaks - Get streak data
- [ ] GET /api/affirmations/daily - Get daily affirmation
- [ ] GET /api/journeys - Get available journeys
- [ ] POST /api/journeys/:id/join - Join a journey

### Services
- [ ] PracticeService - Practice management
- [ ] StreakService - Streak calculations
- [ ] AffirmationService - Affirmation delivery
- [ ] JourneyService - Journey management

### Components
- [ ] PracticeTracker - Main practice tracking UI
- [ ] PracticeCard - Individual practice display
- [ ] PracticeLogger - Log session interface
- [ ] StreakCounter - Streak display
- [ ] StreakCalendar - Calendar heatmap
- [ ] AffirmationCard - Daily affirmation
- [ ] JourneyBrowser - Browse journeys
- [ ] JourneyProgress - Journey completion tracker

### Tests
- [ ] practice-service.test.ts - Practice service tests
- [ ] streak-service.test.ts - Streak calculation tests
- [ ] journey.test.ts - Journey tests

---

## Epic 04: Discovery
**Status**: Not Started | **Dependencies**: Epic 00, Epic 01, Epic 02 | **Phase**: MVP

### Database Tables
- [ ] messages - Direct messages
- [ ] notifications - User notifications
- [ ] discovery_recommendations - AI-powered recommendations
- [ ] search_queries - Search history
- [ ] user_library - Saved/bookmarked users

### API Endpoints
- [ ] GET /api/discover - Get recommended connections
- [ ] GET /api/discover/search - Search users
- [ ] POST /api/messages - Send message
- [ ] GET /api/messages/:conversationId - Get conversation
- [ ] GET /api/messages/conversations - Get all conversations
- [ ] GET /api/notifications - Get notifications
- [ ] PUT /api/notifications/:id/read - Mark notification read
- [ ] POST /api/library/save - Save user to library
- [ ] GET /api/library - Get saved users

### Services
- [ ] DiscoveryService - Recommendation engine
- [ ] MessagingService - Message handling
- [ ] NotificationService - Notification delivery
- [ ] SearchService - User search
- [ ] LibraryService - Bookmarks management

### Components
- [ ] DiscoveryFeed - Recommended users feed
- [ ] UserSearchBar - Search interface
- [ ] SearchResults - Search results list
- [ ] MessageThread - Conversation view
- [ ] MessageComposer - Message input
- [ ] ConversationList - Inbox list
- [ ] NotificationCenter - Notification dropdown
- [ ] SavedUsers - Library view

### Tests
- [ ] discovery-service.test.ts - Discovery tests
- [ ] messaging.test.ts - Messaging tests
- [ ] notification.test.ts - Notification tests
- [ ] search.test.ts - Search tests

---

## Epic 05: Impact
**Status**: Not Started | **Dependencies**: Epic 00, Epic 01 | **Phase**: MVP

### Database Tables
- [ ] impact_features - Feature requests
- [ ] impact_initiatives - Community initiatives
- [ ] impact_votes - Voting records
- [ ] impact_comments - Feature/initiative comments
- [ ] contextual_feedback - In-context feedback
- [ ] impact_follows - Following features/initiatives
- [ ] impact_challenge_progress - Challenge completion
- [ ] impact_shares - Social sharing tracking

### API Endpoints
- [ ] GET /api/impact/features - Get feature requests
- [ ] POST /api/impact/features - Submit feature request
- [ ] POST /api/impact/vote - Cast vote
- [ ] GET /api/impact/initiatives - Get initiatives
- [ ] POST /api/impact/comment - Add comment
- [ ] POST /api/feedback - Submit contextual feedback
- [ ] GET /api/impact/challenges - Get active challenges
- [ ] POST /api/impact/follow - Follow feature/initiative

### Services
- [ ] ImpactService - Feature/initiative management
- [ ] VotingService - Vote processing
- [ ] FeedbackService - Feedback collection
- [ ] ChallengeService - Challenge management

### Components
- [ ] FeatureBoard - Feature request board
- [ ] FeatureCard - Feature display
- [ ] VoteButton - Upvote/downvote
- [ ] InitiativeList - Initiatives list
- [ ] CommentThread - Comments on features
- [ ] FeedbackWidget - Contextual feedback
- [ ] ChallengeCard - Challenge display

### Tests
- [ ] impact-service.test.ts - Impact service tests
- [ ] voting.test.ts - Voting tests
- [ ] feedback.test.ts - Feedback tests

---

## Epic 06: Business
**Status**: Not Started | **Dependencies**: Epic 00, Epic 01, Epic 02 | **Phase**: Growth

### Database Tables
- [ ] businesses - Business profiles
- [ ] business_admins - Business admin access
- [ ] business_listings - Services/offerings
- [ ] business_perks - Member perks/discounts
- [ ] business_reviews - Business reviews
- [ ] practice_stacks - Bundled practice offerings
- [ ] business_verification - Verification records
- [ ] business_admin_logs - Admin activity logs

### API Endpoints
- [ ] GET /api/businesses - Search businesses
- [ ] GET /api/businesses/:id - Get business profile
- [ ] POST /api/businesses - Create business
- [ ] PUT /api/businesses/:id - Update business
- [ ] POST /api/businesses/:id/listings - Add listing
- [ ] GET /api/businesses/:id/perks - Get business perks
- [ ] POST /api/businesses/:id/reviews - Submit review
- [ ] GET /api/businesses/:id/reviews - Get reviews
- [ ] POST /api/businesses/:id/verify - Request verification

### Services
- [ ] BusinessService - Business management
- [ ] ListingService - Service listings
- [ ] PerkService - Perk management
- [ ] ReviewService - Review handling
- [ ] VerificationService - Business verification

### Components
- [ ] BusinessCard - Business display card
- [ ] BusinessProfile - Full business page
- [ ] BusinessEditor - Business management form
- [ ] ListingGrid - Services grid
- [ ] ListingCard - Service card
- [ ] PerkBadge - Perk indicator
- [ ] ReviewList - Reviews display
- [ ] ReviewForm - Review submission
- [ ] VerificationBadge - Verified indicator

### Tests
- [ ] business-service.test.ts - Business service tests
- [ ] listing.test.ts - Listing tests
- [ ] review.test.ts - Review tests
- [ ] verification.test.ts - Verification tests

---

## Epic 07: Community
**Status**: Not Started | **Dependencies**: Epic 03, Epic 04, Epic 06 | **Phase**: Growth

### Database Tables
- [ ] communities - Community groups
- [ ] community_members - Membership records
- [ ] community_moderators - Moderator assignments
- [ ] community_prompts - Discussion prompts
- [ ] vibes - Community posts (vibes)
- [ ] vibe_reactions - Reactions to vibes
- [ ] vibe_comments - Comments on vibes
- [ ] community_reviews - Community ratings

### API Endpoints
- [ ] GET /api/communities - Browse communities
- [ ] GET /api/communities/:id - Get community
- [ ] POST /api/communities - Create community
- [ ] POST /api/communities/:id/join - Join community
- [ ] POST /api/communities/:id/leave - Leave community
- [ ] GET /api/communities/:id/vibes - Get community vibes
- [ ] POST /api/vibes - Post a vibe
- [ ] POST /api/vibes/:id/react - React to vibe
- [ ] POST /api/vibes/:id/comment - Comment on vibe
- [ ] GET /api/communities/:id/prompts - Get prompts

### Services
- [ ] CommunityService - Community management
- [ ] MembershipService - Membership handling
- [ ] VibeService - Post management
- [ ] ModerationService - Content moderation

### Components
- [ ] CommunityBrowser - Browse communities
- [ ] CommunityCard - Community preview
- [ ] CommunityPage - Full community view
- [ ] CommunityCreator - Create community form
- [ ] MemberList - Members display
- [ ] VibeFeed - Community posts feed
- [ ] VibeComposer - Create vibe
- [ ] VibeCard - Single vibe display
- [ ] ReactionPicker - Reaction selector
- [ ] CommentSection - Vibe comments
- [ ] PromptCard - Discussion prompt

### Tests
- [ ] community-service.test.ts - Community tests
- [ ] vibe-service.test.ts - Vibe/post tests
- [ ] moderation.test.ts - Moderation tests

---

## Epic 08: Monetization
**Status**: Not Started | **Dependencies**: Epic 06, Epic 07, Epic 1A | **Phase**: Growth

### Database Tables
- [ ] memberships - User membership tiers
- [ ] affiliate_codes - Affiliate referral codes
- [ ] affiliate_referrals - Referral tracking
- [ ] promo_codes - Promotional discounts
- [ ] promo_code_redemptions - Promo usage tracking

### API Endpoints
- [ ] GET /api/membership - Get membership status
- [ ] POST /api/membership/upgrade - Upgrade to Regenerative
- [ ] POST /api/membership/cancel - Cancel subscription
- [ ] GET /api/affiliate/code - Get affiliate code
- [ ] GET /api/affiliate/stats - Get referral stats
- [ ] POST /api/promo/validate - Validate promo code
- [ ] POST /api/promo/redeem - Redeem promo code
- [ ] POST /api/checkout/session - Create Stripe session

### Services
- [ ] MembershipService - Subscription management
- [ ] AffiliateService - Referral tracking
- [ ] PromoService - Promo code handling
- [ ] StripeService - Stripe integration
- [ ] BillingService - Invoice management

### Components
- [ ] MembershipCard - Current tier display
- [ ] UpgradeModal - Upgrade flow
- [ ] PricingTable - Tier comparison
- [ ] AffiliatePanel - Referral dashboard
- [ ] ReferralLink - Shareable link
- [ ] PromoInput - Promo code entry
- [ ] CheckoutForm - Payment form
- [ ] BillingHistory - Invoice list

### Tests
- [ ] membership-service.test.ts - Membership tests
- [ ] affiliate.test.ts - Affiliate tests
- [ ] promo.test.ts - Promo code tests
- [ ] stripe-integration.test.ts - Stripe tests

---

## Progress Summary

| Epic | Tables | Endpoints | Services | Components | Tests | Total | Done | % |
|------|--------|-----------|----------|------------|-------|-------|------|---|
| 00 - Foundation | 4 | 8 | 4 | 6 | 4 | 31 | 0 | 0% |
| 01 - Mira | 3 | 7 | 4 | 8 | 3 | 25 | 0 | 0% |
| 1A - Crypto | 8 | 11 | 6 | 7 | 4 | 36 | 0 | 0% |
| 1B - Karma | 5 | 7 | 5 | 7 | 3 | 27 | 0 | 0% |
| 02 - Humans | 4 | 9 | 4 | 8 | 3 | 28 | 0 | 0% |
| 03 - Practices | 7 | 8 | 4 | 8 | 3 | 30 | 0 | 0% |
| 04 - Discovery | 5 | 9 | 5 | 8 | 4 | 31 | 0 | 0% |
| 05 - Impact | 8 | 8 | 4 | 7 | 3 | 30 | 0 | 0% |
| 06 - Business | 8 | 9 | 5 | 9 | 4 | 35 | 0 | 0% |
| 07 - Community | 8 | 10 | 4 | 11 | 3 | 36 | 0 | 0% |
| 08 - Monetization | 5 | 8 | 5 | 8 | 4 | 30 | 0 | 0% |
| **TOTAL** | **65** | **94** | **50** | **87** | **38** | **339** | **0** | **0%** |

---

## Build Order Guide

### Phase 1: Foundation (Must Complete First)
1. Epic 00: Foundation - All infrastructure, auth, testing

### Phase 2: Core MVP (After Foundation)
2. Epic 01: Mira - AI companion, onboarding
3. Epic 1A: Crypto - VIBES token, wallets (can parallel with 1B, 02, 03, 05)
4. Epic 1B: Karma - Recognition system (can parallel with 1A, 02, 03, 05)
5. Epic 02: Humans - Profiles, connections (can parallel with 1A, 1B, 03, 05)
6. Epic 03: Practices - Practice tracking (can parallel with 1A, 1B, 02, 05)
7. Epic 05: Impact - Voting, feedback (can parallel with 1A, 1B, 02, 03)

### Phase 3: Extended MVP (Requires Phase 2)
8. Epic 04: Discovery - Requires Epic 02 for profiles
9. Epic 06: Business - Requires Epic 02 for user profiles

### Phase 4: Growth (Requires Phase 3)
10. Epic 07: Community - Requires Epics 03, 04, 06
11. Epic 08: Monetization - Requires Epics 06, 07, 1A
