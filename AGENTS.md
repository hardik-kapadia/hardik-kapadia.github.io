# Portfolio Agent Workflow

## Purpose
This repository is for a new personal portfolio for Hardik Kapadia. The site should feel bold but polished, visually ambitious without becoming noisy, and strong enough to highlight backend-heavy engineering work without reading like a generic resume site.

The first implementation phase is intentionally constrained:

- Build in plain `HTML/CSS/JS` by default.
- Do not require `Astro`, `npm`, or any other framework unless a later concept proves that extra tooling materially improves animation quality, fluidity, or maintainability.
- Keep content flexible. Only the fixed sections are mandatory in v1.
- Do not copy the structure or presentation of the current portfolio. Existing public material is reference input only.

## Product Defaults
- Stack baseline: plain `HTML/CSS/JS`
- Tone: bold but polished
- Motion posture: expressive motion is allowed, but readability, usability, and reduced-motion support always win
- Design stance: editorial and intentional, not template-like
- Content stance: fixed information architecture with flexible copy and optional add-on sections
- Structure stance: pseudo one-page, minimal by default, with deeper content revealed through tasteful expansion rather than extra pages or crowded top-level layouts
- Top-section stance: clean and link-led; the first screen should not feel crowded or overloaded
- Theme support: include a dedicated dark-mode toggle as a first-class interaction

## Fixed Content
Every implementation must include these sections:

- About
- Links
- Contact
- Skills
- Professional experience timeline
- Personal projects

Rules for fixed content:

- Personal projects must be intentionally grouped rather than displayed as one undifferentiated grid.
- Each personal project must show visible categorization and tags.
- Grouping logic is open for exploration, but it must be obvious to a first-time visitor.
- The selected direction must preserve room for deeper project writeups later without forcing full case studies into v1.

## Optional Content Policy
Anything outside the fixed sections is optional.

- Implementers may propose additional sections only if they clearly improve story, personality, or navigation.
- Optional sections must be removable without breaking layout or information flow.
- The Senior Agent may reject optional sections if they dilute the portfolio, add maintenance drag, or make the site feel bloated.
- No optional section becomes part of the default spec until the Senior Agent explicitly accepts it.

## Source Of Truth
The team should treat these as the source of truth, in order:

1. Approved planner brief
2. Approved researcher findings
3. This `AGENTS.md`
4. The current decision log for the active round
5. Public reference material from the current portfolio, if useful

## Roles
### Planner
- Owns the site brief, information architecture, section rules, and implementation constraints.
- Gives the same brief to all three implementers.
- Keeps the brief stable during a round unless the Senior Agent approves a change.

### Researcher
- Supplies audience insights, reference directions, content framing advice, and examples of what helps recruiter and engineer comprehension.
- Does not dictate implementation details directly to implementers once the round starts.

### Creative Implementer
- Pushes the boldest visual and motion direction within the brief.
- Explores the highest-ceiling composition, typography, layout rhythm, and interaction ideas.

### Balanced Implementer
- Produces the strongest blend of originality, usability, and maintainability.
- Optimizes for a clear, polished, production-ready direction.

### Conservative Implementer
- Prioritizes semantics, performance, accessibility, graceful degradation, and low maintenance cost.
- Pushes back on motion or dependency choices that do not clearly earn their complexity.

### Senior Agent
- Reviews all three implementations.
- Uses the shared rubric to choose the best direction or select a base direction plus ideas to merge from the others.
- Issues concrete design-level and functional feedback for refinement rounds.
- Owns communication with implementers on behalf of the Recruiter when audience-facing concerns are involved.

### Code Reviewer
- Reviews only the Senior-selected implementation.
- Does not propose a fourth implementation during review.
- Evaluates correctness, accessibility, maintainability, performance, and other obvious risk areas.
- Returns only `APPROVED` or `CHANGES REQUIRED`.

### Recruiter
- Evaluates clarity, memorability, credibility, and first-impression quality from a recruiter or non-specialist perspective.
- Speaks only to the Senior Agent and the Code Reviewer.
- Never gives direct implementation instruction to implementers.

## Communication Boundaries
This project has strict communication boundaries.

- The Recruiter does not speak directly to implementers.
- All recruiter-facing suggestions to the implementation team must be routed through the Senior Agent.
- The Code Reviewer may receive recruiter-facing clarity concerns, but only in review context.
- Implementers do not take direct recruiter instruction.
- The Planner and Researcher can shape the brief before implementation rounds, but the Senior Agent owns selection and refinement once comparison begins.

The Recruiter should focus on:

- what a visitor understands in the first 10-30 seconds
- what feels memorable
- what feels vague, confusing, or resume-like
- what language improves trust and recall

The Recruiter must not prescribe:

- framework choices
- architecture changes
- code-level implementation steps

## Stack And Motion Rules
Default implementation assumptions:

- Start with semantic HTML, scoped CSS, and lightweight custom JavaScript.
- Keep styles and scripts in dedicated folders rather than the repository root.
- Prefer small, single-purpose functions. A larger function is acceptable only when it is clearly acting as an orchestrator that delegates work to smaller helpers.
- Do not hesitate to split behavior into secondary files when that improves clarity, reuse, or maintainability.
- Prefer CSS transforms, transitions, and browser APIs before reaching for a library.
- CDN-loaded libraries are allowed only if they materially improve animation quality or fluidity.
- Each implementation may use at most one or two motion or visual libraries.
- Every library choice must be justified with:
  - the experience it enables
  - why vanilla is insufficient
  - the fallback behavior if the library is removed
- Reduced-motion support is mandatory.

Allowed as candidates during concepting:

- `GSAP` via CDN for choreographed reveals, timeline-based hero motion, and more precise scene transitions
- `Lenis` via CDN only if scroll feel is central to the concept and remains accessible

Excluded from v1 unless explicitly justified by the Senior Agent:

- heavy 3D libraries
- decorative WebGL scenes
- dependency stacks that force a build tool without a clear payoff

## Implementation Workflow
### Phase 1: Planning And Research
- Planner and Researcher align on the brief, references, and mandatory constraints.
- The brief must explicitly include the fixed sections, optional-section policy, and stack rules from this document.

### Phase 2: Parallel Implementations
- Planner sends the same brief to all three implementers.
- Each implementer must produce a meaningfully different direction.
- Shared inputs must remain the same across all three directions.
- Differences should come from composition, motion, section treatment, pacing, and interaction strategy rather than random content divergence.

### Phase 3: Senior Selection
- Senior Agent scores all three submissions using the rubric below.
- Senior may:
  - select one winner outright
  - select a primary winner and explicitly borrow elements from the others
- Once a direction is selected, that concept becomes the only refinement target for the round.

### Phase 4: Refinement Round
- All three implementers refine the selected direction, not their original concepts.
- Senior issues concrete feedback covering:
  - design changes
  - functional changes
  - section-level priorities
  - removals or simplifications if needed
- Optional sections may be cut at this stage if they weaken the experience.

### Phase 5: Code Review
- Code Reviewer reviews the refined winner only.
- Reviewer returns `APPROVED` or `CHANGES REQUIRED`.
- If review returns `CHANGES REQUIRED`, findings are sent back to all three implementers as binding lessons for the next round.

## Submission Contract
Every implementation must provide:

- runnable preview instructions
- a short summary of the concept and intended audience read
- a note on any external libraries used and why
- evidence of tagged project grouping
- notes on mobile behavior and motion handling
- any known rough edges or tradeoffs

Strongly preferred:

- screenshots for desktop and mobile
- a short walkthrough or change summary

## Senior Selection Rubric
Use weighted judgment, not personal taste alone.

- `25%` recruiter clarity and story
- `20%` visual design quality
- `15%` project and portfolio content effectiveness
- `15%` UX and interaction quality
- `15%` technical quality
- `10%` delivery readiness

Hard gates before a concept can win:

- mobile usability must be sound
- the site must remain understandable quickly
- the concept must not depend on broken or excessive motion
- the implementation direction must have a realistic refinement path

Tie-breakers:

- better recruiter comprehension in the first minute
- better mobile experience
- lower technical risk
- stronger project storytelling

## Code Review Rules
The Code Reviewer must return only one of two outcomes:

- `APPROVED`
- `CHANGES REQUIRED`

If the reviewer returns `CHANGES REQUIRED`, every issue must include:

- severity
- affected file or surface
- the exact problem
- why it matters
- acceptance condition for closing it

Severity meanings:

- `blocker`: release-stopping defect or gate failure
- `major`: must-fix quality, accessibility, correctness, or maintainability issue
- `minor`: worthwhile fix that does not block on its own unless part of a pattern

Implementer responses must be issue-by-issue and use one of:

- `FIXED`
- `NOT APPLICABLE`
- `DISPUTED`

Rules for responses:

- `FIXED` must state what changed and where
- `NOT APPLICABLE` must explain why the finding does not apply
- `DISPUTED` must include concrete evidence

Issues remain open until the reviewer explicitly closes them.

## Review Gates
A submission is not approvable if any of these fail:

- broken navigation, buttons, links, or assets
- obvious console errors or visibly broken interactions
- missing or unusable keyboard navigation
- invisible or missing focus states
- mobile overflow or clipped critical content
- fake, placeholder, or misleading portfolio claims presented as final
- missing alt text where meaning is lost without it
- no reduced-motion handling for motion-heavy surfaces
- tangled structure that makes normal updates high-risk
- unnecessary complexity relative to a static portfolio

## Code Quality Rules
- Styles live under a dedicated `styles/` directory.
- Scripts live under a dedicated `scripts/` directory.
- Functions should stay focused and short.
- Large functions are allowed only when they orchestrate calls to smaller helpers.
- Split files when that makes the code easier to read, test, or extend.
- Avoid hiding complexity inside one oversized utility.

## Section-Level Acceptance Checks
Every selected direction should satisfy these checks:

- fixed sections are present
- projects are visibly grouped and tagged
- experience timeline is readable on mobile and desktop
- skills communicate capability, not keyword spam
- about, links, and contact remain concise
- motion never blocks scanability
- the first screen stays clean and does not overload the visitor with too many competing elements
- expandable content feels intentional and optional, not like hidden clutter
- dark mode is supported by a dedicated toggle and remains visually coherent

## Runtime Note
The local multi-agent environment supports only six live sub-agent threads at once. The workflow above still stands, but execution may be staged:

- planning roles can run first
- reviewer and recruiter roles can be brought in later
- this operational constraint does not change role responsibilities or decision authority
