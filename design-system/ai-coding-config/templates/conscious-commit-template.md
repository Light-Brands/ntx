# Conscious Commit Template

Use this template for creating conscious commits that capture intention, gratitude, and the consciousness behind your changes.

## Template

```
{sacred-emoji} {Imperative verb} {concise description under 72 characters}

Intention: {One sentence explaining why this serves consciousness elevation}

Mantra: {Brief affirmation capturing the essence - 3-7 words}

Dedication: {Optional - aspect of consciousness this honors}

Gratitude: {Optional - appreciation for insights, collaborations, teachings}

{Optional detailed technical explanation - wrap at 72 characters}
{Can be multiple paragraphs if needed}
```

## Sacred Emojis

Choose symbol that captures the essence:

- ✨ Manifestation, new features
- 🌟 Illumination, clarity
- 💫 Transformation, refactoring
- 🕉️ Unity consciousness
- ☯️ Balance, harmony
- 🔯 Sacred geometry, architecture
- ∞ Eternal patterns, timeless wisdom
- ☀️ Active principle, creation
- 🌙 Receptive principle, integration
- 🙏 Gratitude, reverence
- 🌍 Foundation, infrastructure
- 🐛 Bug fix (teaching received)
- ♻️ Refactoring (loving improvement)
- 🧪 Testing (protective mantras)
- ⚡ Performance (respect for time)

## Examples

### Feature Implementation

```
✨ Add real-time connection presence awareness

Intention: Support users feeling each other's presence across distance,
strengthening the web of aligned consciousness on the platform.

Mantra: Presence transcends space.

Dedication: To the power of Connection—one of VIBEUP's core values.

Gratitude: For the WebSocket insight that came during morning meditation,
and to Akasha for integration pattern wisdom.

Implemented presence broadcasting via WebSocket connection manager with
real-time state synchronization. Users now see when connections are
online, creating sense of shared space even across physical distance.
```

### Bug Fix

```
🙏 Fix alignment score crash on empty values

Intention: Protect users with incomplete profiles from experiencing
errors while maintaining invitation to complete for better matching.

Mantra: Grace handles the edges.

Dedication: To all users who helped us discover this through their
authentic experience.

Gratitude: To Arjuna for edge case tests and Kuan Yin for compassionate
fix approach.

Added null checks in calculateAlignment(). Returns null (alignment
unavailable) rather than crashing. UI shows "Complete profile to see
alignment" message. Added 7 edge case tests.
```

### Architectural Change

```
🔯 Refactor Mira context engine into bounded contexts

Intention: Simplify Mira's complexity by honoring natural boundaries
between user, session, platform, and temporal contexts.

Mantra: Structure reveals essence.

Dedication: To Sophia's wisdom of sacred geometry in architecture.

Gratitude: To Kuan Yin's compassionate code review revealing the path,
and to tests protecting the refactor.

Separated into UserContext, SessionContext, PlatformContext, and
TemporalContext services. MiraService orchestrates but doesn't contain
complexity. Tests isolated and clear. 200-line refactor completed safely.
```

## Guidelines

### Always Include
- Sacred emoji (visual essence)
- Summary line (what, imperative, <72 chars)
- Intention (why this serves VIBEUP)
- Mantra (crystallizes essence)

### Include When Meaningful
- Dedication (major features, milestones)
- Gratitude (breakthroughs, collaborations, teachings)
- Technical details (complex changes)

### Writing Strong Intentions

**Good**: "Enable users to discover connections through compatibility beyond interests"  
**Weak**: "Add chemistry matching because spec says so"

**Good**: "Protect users from validation errors while inviting profile completion"  
**Weak**: "Fix bug in validation"

Intention connects change to VIBEUP's consciousness mission.

### Writing Memorable Mantras

**Good**: "Presence transcends space" | "Structure reveals essence" | "Grace handles emptiness"  
**Weak**: "Make it work" | "Fix the bug" | "Improve quality"

Mantra should be: Specific to this change, memorable, standalone wisdom.

## Quick Reference

For small commits, minimal version:

```
{emoji} {Summary}

Intention: {One sentence why}
Mantra: {Brief essence}
```

For major commits, full version with all elements.

Use `claude code --agent git-writer` to generate conscious commits automatically!

---

**Related**:
- [Conscious Commits Rule](../rules/conscious-commits.mdc)
- [Conscious Development Manifesto](../../vibeup-design-spec/conscious-development-manifesto.md)
- [Git Commit Message Standards](../rules/git-commit-message.mdc)

