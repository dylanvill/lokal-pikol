# Scoresheet Domain — Todo

**Last Updated:** 2026-05-27  
**Context:** See `LOKAL_PIKOL.md` § 13 for all design decisions and data model.

---

## ⬜ Phase 1 — Database & Eloquent Models

**Migrations**
- [ ] `create_scoresheet_sessions_table` — `id`, `uuid`, `session_code` (string 8, unique), `name`, `status` (enum: `active`/`finished`), `timestamps`
- [ ] `create_scoresheet_players_table` — `id`, `uuid`, `session_id` (FK → `scoresheet_sessions`), `name`, `created_at`
- [ ] `create_scoresheet_games_table` — `id`, `uuid`, `session_id` (FK → `scoresheet_sessions`), `team_a_player_1_id`, `team_a_player_2_id`, `team_a_score`, `team_b_player_1_id`, `team_b_player_2_id`, `team_b_score` (all player FKs → `scoresheet_players`), `created_at`

**Enums**
- [ ] `SessionStatusEnum` — `app/Source/Scoresheet/Enums/` — cases: `ACTIVE`, `FINISHED`

**Models** (`app/Source/Scoresheet/Models/`)
- [ ] `Session` — uses `HasUuid` trait; `session_code` auto-generated on creating; `status` cast to `SessionStatusEnum`; has-many `Player`, has-many `Game`
- [ ] `Player` — uses `HasUuid` trait; belongs-to `Session`
- [ ] `Game` — uses `HasUuid` trait; belongs-to `Session`; four `belongsTo` relations for `teamAPlayer1`, `teamAPlayer2`, `teamBPlayer1`, `teamBPlayer2`

---

## ⬜ Phase 2 — Actions

All actions live in `app/Source/Scoresheet/Actions/`.

- [ ] `CreateSession` — accepts session name + array of player name strings; generates a unique `session_code`; creates the `Session` row; bulk-inserts `Player` rows; returns the created session
- [ ] `EndSession` — accepts a `Session`; sets `status` to `FINISHED`; returns the updated session
- [ ] `SubmitGame` — accepts a `Session` + four `Player` IDs + two scores; validates players belong to the session; creates the `Game` row; returns the created match

---

## ⬜ Phase 3 — Artisan Commands

All commands live in `app/Source/Scoresheet/Commands/`. Register the directory in `bootstrap/app.php → withCommands()`.

- [ ] `scoresheet:create`
  - Prompt for session name (text input)
  - Prompt for player names via `textarea()` — accepts raw Reclub numbered export (`1. Dylan`, `2. Doms`, …) or plain comma-separated; strips numbering, trims whitespace, excludes blank lines
  - Display parsed name list for confirmation before proceeding
  - Calls `CreateSession` action
  - Outputs the shareable URL: `scoresheet.[tld]/session/{session_code}`

- [ ] `scoresheet:end`
  - Prompt to select session by `session_code` (searchable select or text input)
  - Displays session name + current status for confirmation
  - Calls `EndSession` action
  - Outputs confirmation message

---

## ⬜ Phase 4 — Controllers, Form Requests & Routes

**Controllers** (`app/Http/Scoresheet/Controllers/`)
- [ ] `SessionController@show` — loads `Session` by `session_code`; 404 if not found; eager-loads players + matches (with all four player relations); renders `session/show`
- [ ] `SubmitMatchController@store` — validates + submits a match result; redirects back to session page on success

**Form Requests** (`app/Http/Scoresheet/Requests/`)
- [ ] `SubmitMatchRequest` — validates `teamAPlayer1Id`, `teamAPlayer2Id`, `teamBPlayer1Id`, `teamBPlayer2Id` (each: required UUID, exists in `scoresheet_players`, belongs to the session); `teamAScore` + `teamBScore` (required integer, 0–11); all four player IDs must be distinct; session must be `active`

**Routes** (`routes/scoresheet.php`)
- [ ] `GET  /session/{session_code}` → `SessionController@show` — name: `session.show`
- [ ] `POST /session/{session_code}/matches` → `SubmitMatchController@store` — name: `session.matches.store`

**Routes constants** (`app/Http/Scoresheet/Routes.php`)
- [ ] Add `SESSION_SHOW` and `SESSION_MATCHES_STORE` constants

---

## ⬜ Phase 5a — Session Page Shell & Scoresheet Results List

**Frontend** (`resources/js/scoresheet/`)

- [ ] TypeScript models (`scoresheet/types/`)
  - [ ] `Session.ts` — `sessionCode`, `name`, `status: 'active' | 'finished'`, `players: Player[]`, `games: Game[]`
  - [ ] `Player.ts` — `id`, `uuid`, `name`
  - [ ] `Game.ts` — `id`, `uuid`, `teamAPlayer1`, `teamAPlayer2`, `teamAScore`, `teamBPlayer1`, `teamBPlayer2`, `teamBScore`, `createdAt`

- [ ] `session/show.tsx` — session page shell
  - Session name as heading
  - "This session has ended." banner when `status === 'finished'` (no submission form rendered)
  - Scoresheet results list (always visible)
  - Submission wizard entry point (only when `status === 'active'`)

- [ ] `ScoresheetsResultsList` component — renders submitted matches in reverse submission order; format: `Team A names | Score | Team B names | Score`; empty state when no matches yet

---

## ✅ Phase 5b — Submission Wizard

Single-page JS state machine — no URL changes between steps. Back button is an explicit UI element, not the browser back button.

**Steps:**
1. **Select Team A** — tap 2 players from the full roster
2. **Select Team B** — tap 2 from the remaining roster (Team A players excluded)
3. **Select Loser** — large "Which team lost?" prompt + 2 stacked buttons (one per pair, names stacked vertically); tap-to-switch, no toggle-to-null
4. **Loser Score** — tappable buttons 0–10; loser team's names shown above
5. **Review** — full match summary; both teams + derived scores; confirm before submit
6. **Submit** — POST to `SubmitMatchController`; on success, wizard resets; success toast; new result appears at top of scoresheet list

**Winner score = 11 is implicit in the UI.** Backend payload (`teamAScore`, `teamBScore`) is unchanged — derived at submit time via `useForm.transform()`. Form state holds `{ loserTeam: 'A' | 'B' | null, loserScore: number | null }` instead of per-team scores.

**Back-navigation rule:** At step N, Back clears step N's own data, then decrements. Forces conscious re-pick on each return.

**Components** (`resources/js/scoresheet/components/SubmitWizard/`)
- [x] `index.tsx` — composition root: ActionBar trigger + Dialog shell + body + footer
- [x] `useMatchWizard.ts` — state, derived data, navigation, `togglePair`, `setLoser`, `setLoserScore`, `submit` (with transform)
- [x] `WizardBody.tsx` — step dispatch
- [x] `WizardFooter.tsx` — Back / Continue / Submit
- [x] `steps/SelectPairStep.tsx` — player grid; tap to select; 2-player cap
- [x] `steps/SelectLoserStep.tsx` — two stacked team buttons; tap-to-switch
- [x] `steps/SelectScoreStep.tsx` — score grid 0–10
- [x] `steps/ReviewStep.tsx` — match summary; receives derived scores via props
- [x] `steps/TeamCard.tsx` — per-team review card; auto-highlights winner via score comparison

---

## ⬜ Phase 6 — Final Code Review

*Populated at completion — list of entry points for top-to-bottom review.*

---

## 💭 Deferred — Revisit Later

- Factories + tests — deferred for now
- Score range extension (0–15 / 0–21) — range is a data-driven constant, change when needed
- Match deletion — explicitly out of scope for v1
- Export (CSV/PDF) — out of scope
