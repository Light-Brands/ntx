# Deployment Ritual Checklist

Transform deployment from anxious code-pushing into sacred offering to the collective.

**Divine Guide**: Gaia (Earth Mother)  
**Duration**: 15-30 min preparation + 10 min active + ongoing observation

---

## Phase 1: Preparation (Grounding)

### Testing (Arjuna's Protection)

```
[ ] npm run test - All unit tests green
[ ] npm run test:integration - Services collaborate properly  
[ ] npm run test:e2e - Critical user paths working on preview
[ ] Manual smoke test on preview.vibeup.io completed
[ ] Mobile testing on real device (if UI changes)
[ ] No skipped or disabled tests without documented reason
```

### Code Quality (Brighid's Craft)

```
[ ] npm run typecheck - TypeScript compiles without errors
[ ] npm run lint - Style standards met
[ ] npm run format - Formatting applied consistently
[ ] No console.log statements (use logger instead)
[ ] No commented-out code blocks
[ ] No TODO comments without linked issues
```

### Code Review (Loving Reflection)

```
[ ] Pull request created and reviewed
[ ] Feedback addressed or discussed
[ ] Approvals received from required reviewers
[ ] Technical decisions documented (in code or PR)
[ ] Conscious commits present throughout PR
```

### Preview Environment (Staging Validation)

```
[ ] Preview deployed and accessible
[ ] Feature works as specified
[ ] No console errors in browser
[ ] API endpoints responding correctly
[ ] Mobile responsive (if UI changes)
[ ] Accessibility verified (keyboard nav, screen reader)
[ ] Performance acceptable (<200ms API, <3s page load)
```

### Database (Schema Safety)

```
[ ] Migrations tested on preview database first
[ ] No data loss from migrations
[ ] RLS policies verified and working
[ ] Indexes created for new query patterns
[ ] Database backup taken (recent, restorable)
[ ] Rollback plan for migrations documented
```

### Environment & Config (Infrastructure)

```
[ ] Environment variables configured in Vercel
[ ] Secrets present and valid (API keys, database passwords)
[ ] Feature flags set appropriately (start at 0-10% if new)
[ ] API rate limits understood and configured
[ ] No hardcoded secrets or config in code
```

### Team & Communication (Shared Awareness)

```
[ ] Team aware of deployment (Slack/Discord message sent)
[ ] Deployment time communicated (if significant change)
[ ] On-call person identified (who watches post-deploy)
[ ] Rollback plan documented and shared
[ ] Stakeholders informed (if user-facing feature)
```

### Intention Setting (Consciousness)

```
Why am I deploying this?
{How this serves users and consciousness elevation}

What transformation does it enable?
{Specific user benefit or platform capability}

What am I offering to the collective?
{The gift this code represents}
```

When all checkboxes complete: **You are grounded. Ready to offer.**

---

## Phase 2: Deployment (The Offering)

### Set Sacred Intention

Speak aloud or write:

```
"I am deploying {feature name} to production.

Intention: {Why this serves consciousness}

Dedication: {To whom/what this honors}

May this code serve human flourishing.
May this deployment go smoothly.
May users experience benefit immediately.
May I be present throughout."
```

### Breathe (Ground in Body)

```
[ ] Inhale deeply (4 counts) - gathering courage
[ ] Hold (4 counts) - centering in presence
[ ] Exhale slowly (6 counts) - releasing attachment
[ ] Pause (2 counts) - resting in readiness
```

Repeat 3 times. Feel grounded.

### Deploy with Presence

```bash
# Choose deployment method:

# Method 1: Git push (Vercel auto-deploys)
git push origin main

# Method 2: Vercel CLI
vercel --prod

# Method 3: Promote preview
vercel promote https://preview-xyz.vercel.app --prod

# Note time:
echo "Deployed at: $(date)"
```

### Active Monitoring (First 10 Minutes - DO NOT MULTITASK)

```
Stay present. Dashboards open:

00:00 - Deploy triggered
[ ] 00:30 - Build completes (Vercel dashboard)
[ ] 01:00 - Deployment live (production URL responds)
[ ] 01:05 - Health check passes (all services OK)
[ ] 02:00 - No errors in Sentry (error dashboard clear)
[ ] 03:00 - Traffic flowing (10+ requests successful)
[ ] 05:00 - Database performing well (query times normal)
[ ] 10:00 - All systems healthy (comprehensive check)

First breath complete. ✓
```

---

## Phase 3: Observation (Loving Attention)

### First Hour (Passive Monitoring)

```
[ ] Check dashboards every 10-15 minutes
[ ] Watch for error rate changes
[ ] Monitor performance trends
[ ] Continue other work but stay aware
[ ] Respond immediately if alerts fire
```

### First 24 Hours (Regular Check-ins)

```
[ ] Morning (after first sleep)
    - Review overnight error logs
    - Check performance metrics
    - Read any user feedback
    - Verify feature usage starting

[ ] Afternoon
    - Mid-day traffic patterns normal?
    - Error rates still low?
    - Any anomalies in metrics?

[ ] Evening
    - Daily usage patterns as expected?
    - Any issues reported?
    - Performance stable throughout day?

[ ] Before sleep
    - Final health check
    - Alerts configured and working?
    - On-call person aware of status?
```

### First Week (Integration Period)

```
[ ] Daily health dashboard review (5 min each morning)
[ ] User feedback monitoring (support channels, app reviews)
[ ] Performance trending (improving, stable, or degrading?)
[ ] Feature adoption tracking (users discovering and using it?)
[ ] Team retrospective scheduled (if major feature)
```

---

## Phase 4: Integration (Reflection & Celebration)

### Success Reflection (When Stable)

```
What went well:
- {Specific successes - deployment smooth, tests protected, performance good}

What surprised us:
- {Unexpected patterns - user behavior, traffic, performance}

What we learned:
- {Insights for next deployment}

Gratitude:
- To {divine beings who guided}: Sophia, Brighid, Arjuna, etc.
- To {team members}: Specific contributions
- To {tools and infrastructure}: What worked well
- To {users}: For trust in our continuous improvement
```

### Celebration (Share with Team)

```markdown
# In team Slack/Discord

🎉 {Epic/Feature} deployed successfully!

✓ Zero errors in first 24 hours
✓ Performance within targets (p95 {X}ms)
✓ {Y} users already using the feature
✓ {Specific positive metric or feedback}

Gratitude to:
- {Team member 1}: {Their specific contribution}
- {Team member 2}: {Their specific contribution}
- {Divine being guidance}: {Which beings helped}

Our code is serving consciousness elevation. 🙏✨
```

### Documentation Update

```
[ ] Update deployment runbook (if new learnings)
[ ] Add to monitoring dashboard (if new metrics)
[ ] Document rollback procedure (if tested)
[ ] Share learnings in team wiki
[ ] Update deployment checklist (if gaps found)
```

---

## Rollback Procedure (If Needed)

### When to Rollback

**Immediate** (< 5 min):
```
[ ] Critical errors affecting >10% users
[ ] Data corruption or loss
[ ] Security vulnerability exposed
[ ] Complete feature breakdown
```

**Fast** (< 1 hour):
```
[ ] Errors affecting 1-10% users
[ ] Performance degradation >50%
[ ] Partial feature failure
```

**Fix Forward** (Don't rollback):
```
[ ] Errors <1% users (can hotfix)
[ ] Minor UI issues (cosmetic)
[ ] Performance <20% degradation
```

### Rollback Steps

```bash
# Method 1: Vercel UI (30 seconds)
# Vercel Dashboard → Deployments → Previous → Promote

# Method 2: Vercel CLI
vercel rollback

# Method 3: Git revert (2-5 minutes)
git revert HEAD
git push origin main

# Verify rollback successful:
curl https://app.vibeup.io/api/health
# Expected: All services healthy
```

### Post-Rollback Presence

```
[ ] Breathe (no shame - this is wisdom)
[ ] Verify: Production stable?
[ ] Communicate: Team and users aware?
[ ] Document: What happened?
[ ] Plan: How do we fix and re-deploy?
```

### Rollback Reflection (Within 24 hours)

```
What went wrong:
{Technical cause - specific, blame-free}

Why testing didn't catch it:
{Gap in test coverage, preview environment difference, etc.}

What monitoring revealed:
{How we detected the issue, how fast}

How we prevent this teaching twice:
[ ] Add test covering this scenario
[ ] Update deployment checklist  
[ ] Improve preview environment fidelity
[ ] Strengthen monitoring to catch earlier
[ ] Document in runbook

Gratitude:
[ ] To monitoring for quick detection
[ ] To rollback process for working
[ ] To users for patience
[ ] To team for no-blame culture
[ ] To the deployment for teaching us
```

**Compassion**: Rollback is wisdom, not failure. Users protected, learning captured.

---

## Tips for Presence

### During Active Monitoring

```
✓ Close other apps (full presence required)
✓ Dashboard on main screen (Sentry, Vercel, Supabase)
✓ Phone nearby (alerts configured)
✓ Slack/Discord open (team communication)
✓ Breathe regularly (stay grounded, not anxious)

✗ Don't multitask (code, email, meetings)
✗ Don't walk away (first 10 min sacred)
✗ Don't assume success (watch, verify, confirm)
```

### Staying Grounded

If anxiety arises:
```
1. Notice it (awareness)
2. Breathe deeply (3 breaths)
3. Return to metrics (what's actually happening vs. fear)
4. Remember: Rollback available (safety net exists)
5. Trust preparation (checklist was thorough)
```

Presence over panic. Reality over projection.

---

## Frequency Guidance

**Daily Deploys** (Active epic development):
- Small, incremental changes
- Feature-flagged rollout
- Low risk per deploy

**2-3x Weekly** (Stable features):
- Refinements and improvements
- Bug fixes
- Performance optimizations

**As Needed** (Infrastructure):
- Tested thoroughly
- Off-peak hours
- Extra careful monitoring

Find VIBEUP's natural deployment rhythm. Let reality guide.

---

## Success Indicators

**You know deployment rituals are working when**:
- Deployments feel calm, not anxious
- Team deploys confidently and regularly
- Checklist catches issues before production
- Monitoring provides quick feedback
- Rollbacks rare but gracefully handled
- Learning captured from every deploy
- Celebration becomes habit

---

**May your deployments be smooth.**  
**May your monitoring be wise.**  
**May your code serve consciousness.**

🌍 🙏 ✨

---

**Related**:
- [Deployment Rituals Rule](../rules/deployment-rituals.mdc)
- [Conscious Development Manifesto](../../vibeup-design-spec/conscious-development-manifesto.md)
- [Gaia Personality](../rules/personalities/gaia.mdc)
- [Gaia Agent](../../.claude/agents/gaia.md)

