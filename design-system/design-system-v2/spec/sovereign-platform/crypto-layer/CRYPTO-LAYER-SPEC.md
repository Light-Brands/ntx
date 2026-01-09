# Crypto/Value Layer Specification

> Every sovereign platform has native value exchange built in from day one. This layer standardizes all financial transactions across platforms.

## Philosophy

Value exchange is a **foundational primitive**, not an afterthought. By integrating crypto from day one:

- Users have **wallet identity** from first login
- **Every action** can be rewarded with tokens
- **Peer-to-peer payments** are seamless via @handles
- **Business transactions** work without traditional payment friction
- **Governance** is token-weighted for aligned incentives

```
"Humans verify, machines execute.
AI can inform but never transact."
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           APPLICATION LAYER                                  │
│                                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Profile  │ │ Practice │ │ Message  │ │ Business │ │Community │          │
│  │ Service  │ │ Service  │ │ Service  │ │ Service  │ │ Service  │          │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘          │
│       │            │            │            │            │                  │
│       └────────────┴────────────┴─────┬──────┴────────────┘                  │
│                                       │                                      │
│                                       ▼                                      │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                        CryptoRouterService                               ││
│  │                                                                         ││
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         ││
│  │  │ Wallet Manager  │  │ Transfer Engine │  │  Reward Engine  │         ││
│  │  │                 │  │                 │  │                 │         ││
│  │  │ • Create wallet │  │ • P2P transfers │  │ • Distribute    │         ││
│  │  │ • Link external │  │ • Business pay  │  │ • Multipliers   │         ││
│  │  │ • Resolve handle│  │ • Batch sends   │  │ • Schedules     │         ││
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘         ││
│  │                                                                         ││
│  │  ┌─────────────────┐  ┌─────────────────┐                               ││
│  │  │ Staking Manager │  │ Governance Svc  │                               ││
│  │  │                 │  │                 │                               ││
│  │  │ • Lock tokens   │  │ • Voting weight │                               ││
│  │  │ • Unlock        │  │ • Proposals     │                               ││
│  │  │ • Calculate APY │  │ • Delegation    │                               ││
│  │  └─────────────────┘  └─────────────────┘                               ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                       │                                      │
│                                       ▼                                      │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         Handle Resolver                                  ││
│  │                   (@sarah → 0x1234...abcd on Base)                      ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                       │                                      │
│                                       ▼                                      │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                       Multi-Chain Adapters                               ││
│  │                                                                         ││
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         ││
│  │  │   Base L2       │  │     Solana      │  │    Polygon      │         ││
│  │  │   (Primary)     │  │    (Adapter)    │  │   (Adapter)     │         ││
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Core Components

### 1. Wallet Identity

Human-readable wallet addresses using @handles:

```yaml
# wallet-identity.yaml
handle_system:
  format: "@{username}"
  resolution: "handle → wallet address on chain"
  uniqueness: "globally unique per platform"

wallet_types:
  managed:
    description: "Platform-managed wallet (default)"
    custody: "platform"
    onboarding: "automatic on signup"
    recovery: "email/phone verification"

  external:
    description: "User's own wallet"
    custody: "user"
    supported:
      - MetaMask
      - WalletConnect
      - Coinbase Wallet
      - Rainbow
    linking: "sign message to verify ownership"
```

**Handle Resolution:**
```typescript
interface HandleResolver {
  // Resolve @handle to wallet address
  resolve(handle: string): Promise<{
    address: string;
    chain: 'base' | 'solana' | 'polygon';
    walletType: 'managed' | 'external';
  }>;

  // Register new handle for wallet
  register(handle: string, address: string): Promise<void>;

  // Check handle availability
  isAvailable(handle: string): Promise<boolean>;
}
```

### 2. Transfer Engine

All value transfers flow through standardized engine:

```typescript
interface TransferEngine {
  // P2P transfer by handle
  sendP2P(params: {
    from: string;       // @handle
    to: string;         // @handle
    amount: string;     // in token units
    token: 'USDC' | 'VIBES' | string;
    note?: string;
  }): Promise<TransferResult>;

  // Business payment
  payBusiness(params: {
    from: string;
    businessId: string;
    amount: string;
    token: string;
    invoiceId?: string;
  }): Promise<TransferResult>;

  // Batch transfers
  sendBatch(transfers: Transfer[]): Promise<BatchResult>;

  // Payment request
  requestPayment(params: {
    from: string;
    to: string;
    amount: string;
    reason: string;
    expiresAt?: Date;
  }): Promise<PaymentRequest>;
}
```

### 3. Reward Engine

Token distribution for platform actions:

```yaml
# reward-config.yaml
token:
  name: "VIBES"                    # Platform-specific token name
  symbol: "VIBES"
  total_supply: 1_000_000_000
  standard: "ERC-20"
  chain: "base"

rewards:
  practice_completion:
    base: 10
    streak_multipliers:
      7_days: 1.5
      30_days: 2.0
      100_days: 3.0

  profile_completion:
    basic: 20
    verified: 100

  community_contribution:
    post: 5
    helpful_reaction: 2
    quality_feedback: 25

  referral:
    new_user: 50
    first_practice: 25
```

```typescript
interface RewardEngine {
  // Distribute reward for action
  distributeReward(params: {
    userId: string;
    action: string;
    context?: Record<string, any>;
  }): Promise<RewardResult>;

  // Get pending rewards
  getPending(userId: string): Promise<PendingReward[]>;

  // Calculate multipliers
  getMultiplier(userId: string): Promise<number>;

  // Claim rewards
  claim(userId: string, rewardIds: string[]): Promise<ClaimResult>;
}
```

### 4. Verification Layer

All transactions require human verification:

```yaml
# verification-tiers.yaml
tiers:
  - name: "micro"
    max_amount: 10
    verification: ["biometric"]

  - name: "small"
    max_amount: 100
    verification: ["biometric", "in_app_pin"]

  - name: "standard"
    max_amount: 1000
    verification: ["biometric", "sms_pin"]

  - name: "large"
    min_amount: 1001
    verification: ["biometric", "sms_pin", "email_confirmation"]

  - name: "stake_unstake"
    verification: ["sms_pin"]
```

```typescript
interface VerificationService {
  // Generate verification PIN
  generatePin(params: {
    userId: string;
    transactionId: string;
    amount: string;
    channel: 'sms' | 'email';
  }): Promise<{ pinId: string; expiresAt: Date }>;

  // Verify PIN
  verifyPin(params: {
    pinId: string;
    pin: string;
    ipAddress: string;
  }): Promise<{ valid: boolean; token?: string }>;

  // Get verification token for execution
  getExecutionToken(verificationId: string): Promise<ExecutionToken>;
}
```

---

## Security Model

### Three-Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1: AI COMPANION                                       │
│  Access: READ-ONLY                                           │
│                                                              │
│  ✓ getBalance()    ✓ resolveHandle()                        │
│  ✓ estimateFees()  ✓ getHistory()                           │
│  ✗ execute()       ✗ stake()        ✗ withdraw()            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  LAYER 2: VERIFICATION                                       │
│  Access: HUMAN REQUIRED                                      │
│                                                              │
│  • Generate PIN via SMS/email                               │
│  • Single-use tokens                                        │
│  • 30-second expiry                                         │
│  • Rate limiting (3 attempts)                               │
│  • IP binding                                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  LAYER 3: EXECUTION                                          │
│  Access: TOKEN REQUIRED                                      │
│                                                              │
│  • Valid verification token required                        │
│  • Token bound to transaction params                        │
│  • Full audit trail                                         │
│  • Blockchain confirmation                                  │
└─────────────────────────────────────────────────────────────┘
```

### Transaction Flow

```
User Request → AI Companion (Read-Only) → Companion Prepares Details
                                                      │
                                                      ▼
                                          Verification Required
                                                      │
                                                      ▼
                                          SMS/Email PIN Sent
                                                      │
                                                      ▼
                                          User Enters PIN
                                                      │
                                                      ▼
                                          PIN Verified → Token Generated
                                                      │
                                                      ▼
                                          Execution Service → Blockchain
                                                      │
                                                      ▼
                                          Confirmation → User Notified
```

---

## Multi-Chain Support

### Chain Adapters

```typescript
interface ChainAdapter {
  chain: 'base' | 'solana' | 'polygon';

  // Wallet operations
  createWallet(): Promise<Wallet>;
  getBalance(address: string, token: string): Promise<Balance>;

  // Transfer operations
  transfer(params: TransferParams): Promise<TransferResult>;
  estimateGas(params: TransferParams): Promise<GasEstimate>;

  // Transaction status
  getTransaction(txHash: string): Promise<Transaction>;
  waitForConfirmation(txHash: string): Promise<Confirmation>;
}
```

### Chain Configuration

```yaml
# chains.yaml
primary:
  name: "base"
  network_id: 8453
  rpc_url: "https://mainnet.base.org"
  explorer: "https://basescan.org"

  tokens:
    usdc:
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
      decimals: 6
    vibes:
      address: "0x..."  # Platform token address
      decimals: 18

adapters:
  solana:
    enabled: true
    network: "mainnet-beta"

  polygon:
    enabled: true
    network_id: 137
```

---

## Integration with Modules

Every feature module has access to crypto services:

### Profile Module Integration

```typescript
// Display wallet handle and balance
const profileCrypto = {
  displayHandle: "@sarah",
  showBalance: true,
  showQRCode: true,
  showRecentTransactions: 5,
  enablePaymentButton: true,
};
```

### Practice Module Integration

```typescript
// Reward for practice completion
const practiceRewards = {
  base_reward: 10,  // VIBES
  streak_multiplier: true,
  celebration_animation: true,
};
```

### Discovery Module Integration

```typescript
// In-chat payments
const discoveryPayments = {
  p2p_send: true,
  payment_request: true,
  split_payment: true,
  show_balance_in_chat: true,
};
```

### Community Module Integration

```typescript
// Community treasury
const communityTreasury = {
  shared_wallet: true,
  membership_dues: true,
  crowdfunding: true,
  contributor_rewards: true,
  transparent_reporting: true,
};
```

---

## Configuration Schema

Complete crypto layer configuration:

```yaml
# config/crypto.yaml

chain:
  primary: "base"
  adapters:
    - "solana"
    - "polygon"

token:
  name: "VIBES"
  symbol: "VIBES"
  total_supply: 1_000_000_000

wallet:
  default_type: "managed"
  external_support: true
  supported_wallets:
    - "metamask"
    - "walletconnect"
    - "coinbase"

verification:
  tiers:
    micro: { max: 10, methods: ["biometric"] }
    small: { max: 100, methods: ["biometric", "pin"] }
    standard: { max: 1000, methods: ["biometric", "sms"] }
    large: { min: 1001, methods: ["biometric", "sms", "email"] }

rewards:
  enabled: true
  actions:
    practice_complete: 10
    profile_complete: 20
    streak_7_days: 15
    community_post: 5

safety:
  ai_access: "read_only"
  pin_expiry_seconds: 30
  max_pin_attempts: 3
  rate_limit_per_hour: 10
```

---

## Testing Crypto Layer

### Unit Tests

```typescript
describe('CryptoRouterService', () => {
  describe('Handle Resolution', () => {
    it('resolves @handle to wallet address', async () => {
      const result = await crypto.resolveHandle('@sarah');
      expect(result.address).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });

    it('returns null for non-existent handle', async () => {
      const result = await crypto.resolveHandle('@nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('Transfers', () => {
    it('requires verification for transfers', async () => {
      const result = await crypto.initiateTransfer({
        from: '@sender',
        to: '@receiver',
        amount: '100',
        token: 'USDC',
      });
      expect(result.status).toBe('pending_verification');
    });

    it('executes transfer with valid token', async () => {
      const verificationToken = await getValidVerificationToken();
      const result = await crypto.executeTransfer({
        transferId: 'tx123',
        verificationToken,
      });
      expect(result.status).toBe('confirmed');
    });
  });
});
```

### Safety Tests

```typescript
describe('Crypto Safety', () => {
  it('AI companion cannot execute transfers', async () => {
    const companionCrypto = new CompanionSafeCrypto();
    expect(companionCrypto.executeTransfer).toBeUndefined();
  });

  it('blocks expired verification tokens', async () => {
    const expiredToken = 'expired_token';
    await expect(crypto.executeTransfer({
      transferId: 'tx123',
      verificationToken: expiredToken,
    })).rejects.toThrow('Token expired');
  });
});
```

---

## See Also

- [WALLET-IDENTITY.md](./WALLET-IDENTITY.md) - Handle system details
- [TRANSFER-ENGINE.md](./TRANSFER-ENGINE.md) - Payment engine deep dive
- [REWARD-ENGINE.md](./REWARD-ENGINE.md) - Token distribution
- [VERIFICATION.md](./VERIFICATION.md) - Human verification system
- [MULTI-CHAIN.md](./MULTI-CHAIN.md) - Chain adapter details
