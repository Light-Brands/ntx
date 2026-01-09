# AIQ Reporting System

## Overview

The AIQ Reporting System transforms AIQ scores and measurements into actionable insights, dashboards, and reports. This layer makes intelligence visible to operators, agents, and the Stewardship Council, enabling informed decisions about factory evolution.

## Report Types

### 1. Task Completion Reports

Generated immediately after each task completes.

#### Format

```xml
<aiq-task-report>
  <header>
    <task_id>task-uuid-1234</task_id>
    <task_title>Implement user authentication flow</task_title>
    <agent>implementer-agent</agent>
    <completed_at>2026-01-05T14:32:00Z</completed_at>
    <duration>2h 15m</duration>
  </header>

  <scores>
    <overall aiq="576" level="Strategic" confidence="0.87"/>
    <dimensions>
      <reasoning_depth score="612" percentile="72"/>
      <pattern_recognition score="548" percentile="58"/>
      <context_integration score="680" percentile="85"/>
      <creativity score="445" percentile="42"/>
      <adaptability score="520" percentile="55"/>
      <self_reflection score="590" percentile="68"/>
    </dimensions>
  </scores>

  <highlights>
    <strengths>
      <item>Excellent stakeholder consideration (5 groups)</item>
      <item>Strong causal reasoning (4-level chain)</item>
    </strengths>
    <growth_opportunities>
      <item>Consider more creative alternatives</item>
      <item>Deepen pattern matching across domains</item>
    </growth_opportunities>
  </highlights>

  <intelligence_moments>
    <moment type="insight">
      "Connected authentication pattern to OAuth ecosystem best practices"
    </moment>
    <moment type="adaptation">
      "Pivoted approach after discovering rate limiting requirements"
    </moment>
  </intelligence_moments>

  <comparison>
    <vs_agent_average delta="+23">Above your recent average</vs_agent_average>
    <vs_factory_average delta="+45">Above factory average</vs_factory_average>
    <vs_task_type_average delta="+12">Above similar tasks</vs_task_type_average>
  </comparison>
</aiq-task-report>
```

#### Visual Summary

```
┌────────────────────────────────────────────────────────────────┐
│  AIQ TASK REPORT: Implement user authentication flow           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Overall AIQ: 576  ████████████████░░░░  Level: Strategic     │
│  Confidence: 87%                                               │
│                                                                │
│  Dimension Breakdown:                                          │
│  ┌──────────────────┬─────┬────────────────────────────────┐  │
│  │ Reasoning Depth  │ 612 │ ████████████████████░░░░░░░░░ │  │
│  │ Pattern Recog.   │ 548 │ █████████████████░░░░░░░░░░░░ │  │
│  │ Context Integ.   │ 680 │ ██████████████████████░░░░░░░ │  │
│  │ Creativity       │ 445 │ ██████████████░░░░░░░░░░░░░░░ │  │
│  │ Adaptability     │ 520 │ ████████████████░░░░░░░░░░░░░ │  │
│  │ Self-Reflection  │ 590 │ ███████████████████░░░░░░░░░░ │  │
│  └──────────────────┴─────┴────────────────────────────────┘  │
│                                                                │
│  ★ Strengths: Context awareness, Causal reasoning             │
│  ↑ Growth: Creativity, Cross-domain patterns                  │
│                                                                │
│  vs Avg: +23 (self) | +45 (factory) | +12 (task type)         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

### 2. Agent Performance Reports

Daily/weekly summaries for each agent.

#### Format

```yaml
agent_performance_report:
  agent_id: implementer-agent
  period: "2026-01-01 to 2026-01-07"
  generated_at: "2026-01-08T00:00:00Z"

  summary:
    tasks_completed: 23
    average_aiq: 542
    trend: ascending
    trend_delta: +18

  level_distribution:
    strategic: 12
    synthetic: 8
    analytical: 3
    creative: 0

  dimension_profile:
    strongest: context_integration
    strongest_avg: 625
    growth_area: creativity
    growth_avg: 398

  notable_achievements:
    - task: "Complex refactoring of payment module"
      aiq: 712
      level: Creative
      highlight: "Novel architectural pattern"

  improvement_recommendations:
    - dimension: creativity
      suggestion: "Explore divergent thinking before converging"
      resource: "See creative patterns library"

    - dimension: pattern_recognition
      suggestion: "Reference more cross-domain analogies"
      resource: "Review intuition lessons in design patterns"

  comparison:
    vs_last_period: +12%
    vs_peer_agents: +8%
    factory_rank: 3 of 8
```

#### Visual Summary

```
┌────────────────────────────────────────────────────────────────┐
│  AGENT PERFORMANCE: implementer-agent                          │
│  Period: Jan 1-7, 2026                                         │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Tasks: 23  │  Avg AIQ: 542 (↑18)  │  Trend: Ascending        │
│                                                                │
│  Intelligence Level Distribution:                              │
│  Creative   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    0%   │
│  Strategic  ████████████████████████████████████░░░░   52%   │
│  Synthetic  ████████████████████░░░░░░░░░░░░░░░░░░░░   35%   │
│  Analytical █████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   13%   │
│                                                                │
│  Dimension Radar:                                              │
│                    Reasoning                                   │
│                        ▲                                       │
│                       ╱ ╲                                      │
│                      ╱   ╲                                     │
│    Self-Reflection  ╱     ╲  Pattern                          │
│                    ╱       ╲                                   │
│                   ╱    ●    ╲                                  │
│    Adaptability  ╱───────────╲  Context                       │
│                   ╲         ╱                                  │
│                    ╲       ╱                                   │
│                     ╲     ╱                                    │
│                      ╲   ╱                                     │
│                       ╲ ╱                                      │
│                        ▼                                       │
│                    Creativity                                  │
│                                                                │
│  ★ Top Performance: Payment refactoring (AIQ 712, Creative)   │
│  ↑ Focus Area: Creativity dimension                           │
│                                                                │
│  Rank: #3 of 8 agents  │  vs Peers: +8%  │  vs Last Week: +12%│
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

### 3. Factory Intelligence Dashboard

Real-time overview of factory-wide intelligence.

#### Dashboard Sections

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        BRAND FACTORY AIQ DASHBOARD                          │
│                           2026-01-05 14:30 UTC                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FACTORY AIQ: 531                                                           │
│  ████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  Level: Synthetic (↑ trending)                                              │
│                                                                             │
├──────────────────────────────┬──────────────────────────────────────────────┤
│  ACTIVE TASKS (5)            │  RECENT COMPLETIONS                          │
│  ─────────────────────────── │  ──────────────────────────────────────────  │
│  #123 implementing     587   │  #120 Auth flow         576  Strategic      │
│  #124 in_review        --    │  #119 Bug fix           423  Synthetic      │
│  #125 fixing          512    │  #118 New feature       612  Strategic      │
│  #126 validating       --    │  #117 Refactor          489  Synthetic      │
│  #127 preparing        --    │  #116 Documentation     351  Analytical     │
│                              │                                              │
├──────────────────────────────┴──────────────────────────────────────────────┤
│  AGENT LEADERBOARD (7-day avg)                                              │
│  ───────────────────────────────────────────────────────────────────────    │
│  1. orchestrator        612  ████████████████████████░░░░░░░░░░ Strategic  │
│  2. reviewer-agent      587  ███████████████████████░░░░░░░░░░░ Strategic  │
│  3. implementer-agent   542  █████████████████████░░░░░░░░░░░░░ Synthetic  │
│  4. fixer-agent         521  ████████████████████░░░░░░░░░░░░░░ Synthetic  │
│  5. prep-agent          498  ███████████████████░░░░░░░░░░░░░░░ Synthetic  │
│  6. closer-agent        476  ██████████████████░░░░░░░░░░░░░░░░ Synthetic  │
│  7. validator-agent     445  █████████████████░░░░░░░░░░░░░░░░░ Synthetic  │
│  8. issue-manager       412  ████████████████░░░░░░░░░░░░░░░░░░ Synthetic  │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  DIMENSION HEALTH                                                           │
│  ───────────────────────────────────────────────────────────────────────    │
│  Reasoning      ████████████████████████░░░░░░░░░░░░░░░  578  Healthy     │
│  Pattern        ██████████████████████░░░░░░░░░░░░░░░░░  534  Healthy     │
│  Context        █████████████████████████░░░░░░░░░░░░░░  612  Strong      │
│  Creativity     ████████████████░░░░░░░░░░░░░░░░░░░░░░░  398  ⚠ Needs    │
│  Adaptability   ███████████████████████░░░░░░░░░░░░░░░░  521  Healthy     │
│  Reflection     █████████████████████░░░░░░░░░░░░░░░░░░  512  Healthy     │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  TRENDS (30-day)                                                            │
│  ───────────────────────────────────────────────────────────────────────    │
│                                                                             │
│  600 ┤                                          ╭──╮                       │
│  550 ┤                        ╭─────╮   ╭──────╯  ╰───                     │
│  500 ┤            ╭──────────╯     ╰───╯                                   │
│  450 ┤   ╭───────╯                                                         │
│  400 ┼───╯                                                                  │
│      └────────────────────────────────────────────────────────────         │
│       Week 1      Week 2      Week 3      Week 4                           │
│                                                                             │
│  ↑ Factory AIQ up 18% over 30 days                                         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  INSIGHTS & ALERTS                                                          │
│  ───────────────────────────────────────────────────────────────────────    │
│  💡 Creativity dimension lagging - consider creative thinking exercises    │
│  📈 Context integration showing strong improvement (+22% this week)         │
│  ⚠️  Validator-agent AIQ declining - may need calibration review           │
│  ✨ Factory approaching Strategic level threshold (551)                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 4. Council Intelligence Reports

Executive summaries for Stewardship Council review.

#### Format

```markdown
# Stewardship Council Intelligence Report
## Period: Week of January 1-7, 2026

### Executive Summary

The Brand Factory operated at **Synthetic intelligence level** (531 average AIQ)
this period, representing an **18% improvement** over the previous period.
The factory is approaching the **Strategic threshold** (551).

### Key Metrics

| Metric | Value | Trend | Target |
|--------|-------|-------|--------|
| Factory AIQ | 531 | ↑ 18% | 600 |
| Tasks Completed | 47 | ↑ 12% | 50 |
| Average Confidence | 0.82 | ↔ | 0.85 |
| Creative-level Decisions | 3 | ↑ 2 | 5 |

### Intelligence by Tier

| Decision Tier | Count | Avg AIQ | Notes |
|---------------|-------|---------|-------|
| Tier 1 (Full Council) | 2 | 687 | Both passed all gates |
| Tier 2 (3 agents) | 8 | 589 | Strong performance |
| Tier 3 (Automated) | 37 | 512 | Within expectations |

### Wisdom Integration

**Intuition Engine Synergy:**
- 234 lessons retrieved this period
- 89% retrieval relevance rate
- 12 new lessons extracted from high-AIQ decisions

**Sacred Law Alignment:**
- All Tier 1 decisions checked against 50 laws
- 0 violations detected
- 3 decisions enhanced by law-inspired creativity

### Recommendations

1. **Creativity Focus**: Factory-wide creativity dimension (398) is below
   target. Recommend implementing creative thinking protocols.

2. **Validator Calibration**: Validator-agent showing declining AIQ trend.
   Suggest intuition engine lesson review.

3. **Strategic Threshold**: Factory is 20 points from Strategic level.
   Consider increasing task complexity to accelerate growth.

### Next Period Focus

- Push toward Strategic-level factory AIQ (551+)
- Improve creativity dimension across all agents
- Calibrate validator-agent performance
- Maintain Council review quality for Tier 1 decisions
```

---

## Report Generation

### Timing

| Report Type | Frequency | Trigger |
|-------------|-----------|---------|
| Task Completion | Real-time | Task end |
| Agent Performance | Daily/Weekly | Scheduled |
| Factory Dashboard | Real-time | Continuous |
| Council Report | Weekly | Scheduled |

### Generation Pipeline

```python
class AIQReportGenerator:
    def generate_task_report(self, task_id: str) -> TaskReport:
        """Generate immediate post-task report."""
        scores = self.scoring_service.get_scores(task_id)
        measurements = self.measurement_service.get_measurements(task_id)
        comparisons = self.comparison_service.compare(task_id)
        highlights = self.insight_service.extract_highlights(measurements)

        return TaskReport(
            task_id=task_id,
            scores=scores,
            highlights=highlights,
            comparisons=comparisons,
            intelligence_moments=self.extract_moments(measurements)
        )

    def generate_agent_report(self, agent_id: str, period: DateRange) -> AgentReport:
        """Generate periodic agent performance report."""
        tasks = self.task_service.get_completed_tasks(agent_id, period)
        scores = [self.scoring_service.get_scores(t.id) for t in tasks]
        trend = self.trend_service.analyze(scores)
        recommendations = self.recommendation_service.generate(agent_id, scores)

        return AgentReport(
            agent_id=agent_id,
            period=period,
            summary=self.summarize(tasks, scores),
            dimension_profile=self.profile_dimensions(scores),
            achievements=self.find_achievements(tasks, scores),
            recommendations=recommendations,
            comparisons=self.benchmark_agent(agent_id)
        )

    def generate_dashboard(self) -> FactoryDashboard:
        """Generate real-time factory dashboard."""
        return FactoryDashboard(
            factory_aiq=self.calculate_factory_aiq(),
            active_tasks=self.get_active_with_predicted_aiq(),
            recent_completions=self.get_recent_completions(),
            agent_leaderboard=self.rank_agents(),
            dimension_health=self.assess_dimension_health(),
            trends=self.calculate_trends(),
            insights=self.generate_insights()
        )

    def generate_council_report(self, period: DateRange) -> CouncilReport:
        """Generate weekly council intelligence report."""
        return CouncilReport(
            period=period,
            executive_summary=self.write_executive_summary(period),
            key_metrics=self.compile_key_metrics(period),
            tier_breakdown=self.analyze_by_tier(period),
            wisdom_integration=self.assess_wisdom_synergy(period),
            recommendations=self.generate_strategic_recommendations(period),
            focus_areas=self.identify_focus_areas(period)
        )
```

---

## Insight Generation

### Automatic Insights

The system generates actionable insights from AIQ data:

```python
INSIGHT_GENERATORS = [
    # Dimension Analysis
    {
        'name': 'low_dimension_alert',
        'condition': lambda scores: min(scores.dimensions.values()) < 400,
        'template': "⚠️ {dimension} dimension at {score} - consider focused improvement"
    },
    {
        'name': 'dimension_improvement',
        'condition': lambda scores, history: dimension_improved(scores, history, threshold=0.15),
        'template': "📈 {dimension} showing strong improvement (+{delta}% this period)"
    },

    # Level Transitions
    {
        'name': 'approaching_level',
        'condition': lambda scores: within_threshold_of_next_level(scores, 20),
        'template': "✨ Factory approaching {next_level} level ({points_needed} points needed)"
    },
    {
        'name': 'level_achieved',
        'condition': lambda scores, history: level_just_crossed(scores, history),
        'template': "🎉 Factory achieved {level} intelligence level!"
    },

    # Agent Performance
    {
        'name': 'agent_declining',
        'condition': lambda agent: agent_trend_negative(agent, threshold=-0.1),
        'template': "⚠️ {agent} AIQ declining - may need calibration review"
    },
    {
        'name': 'agent_excelling',
        'condition': lambda agent: agent_consistently_high(agent, threshold=700),
        'template': "⭐ {agent} achieving consistent Creative-level performance"
    },

    # Wisdom Integration
    {
        'name': 'intuition_synergy',
        'condition': lambda: intuition_correlation_high(),
        'template': "💡 High correlation between intuition usage and AIQ scores"
    }
]
```

### Recommendation Engine

```python
class AIQRecommendationEngine:
    def generate_recommendations(self, context: RecommendationContext) -> list:
        recommendations = []

        # Dimension-specific recommendations
        for dim, score in context.dimension_scores.items():
            if score < context.targets[dim]:
                recommendations.append(
                    self.dimension_recommendations[dim].get_suggestion(
                        current=score,
                        target=context.targets[dim]
                    )
                )

        # Cross-cutting recommendations
        if context.creativity_lagging():
            recommendations.append(
                Recommendation(
                    priority='high',
                    dimension='creativity',
                    title='Boost Creative Thinking',
                    description='Consider implementing divergent thinking exercises before convergent solution design',
                    resources=['creative_patterns_library', 'brainstorming_protocols']
                )
            )

        return sorted(recommendations, key=lambda r: r.priority)
```

---

## Storage Schema

```sql
CREATE TABLE aiq_reports (
    id UUID PRIMARY KEY,
    report_type VARCHAR(50) NOT NULL,  -- task, agent, dashboard, council
    entity_id VARCHAR(100),             -- task_id, agent_id, or 'factory'
    period_start TIMESTAMPTZ,
    period_end TIMESTAMPTZ,
    generated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Report content (JSONB for flexibility)
    summary JSONB,
    scores JSONB,
    highlights JSONB,
    recommendations JSONB,
    comparisons JSONB,

    -- Full rendered report
    rendered_text TEXT,
    rendered_html TEXT
);

CREATE INDEX idx_reports_type ON aiq_reports(report_type);
CREATE INDEX idx_reports_entity ON aiq_reports(entity_id);
CREATE INDEX idx_reports_generated ON aiq_reports(generated_at);
```

---

## API Endpoints

```yaml
endpoints:
  # Task Reports
  GET /api/aiq/tasks/{task_id}/report:
    description: Get AIQ report for completed task
    response: TaskReport

  # Agent Reports
  GET /api/aiq/agents/{agent_id}/report:
    description: Get agent performance report
    params:
      period: "7d" | "30d" | custom range
    response: AgentReport

  GET /api/aiq/agents/{agent_id}/trend:
    description: Get agent AIQ trend data
    response: TrendData

  # Factory Dashboard
  GET /api/aiq/dashboard:
    description: Get real-time factory dashboard
    response: FactoryDashboard

  # Council Reports
  GET /api/aiq/council/report:
    description: Get weekly council intelligence report
    params:
      week: ISO week string
    response: CouncilReport

  # Insights
  GET /api/aiq/insights:
    description: Get current insights and alerts
    response: InsightList
```

---

*The reporting system transforms AIQ data into visible, actionable intelligence that guides the factory's continuous evolution toward higher wisdom.*
