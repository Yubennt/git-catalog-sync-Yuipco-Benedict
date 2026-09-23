# Git Catalog Sync Workflow Report

## Task 1: Initial Feature Implementation (Clone A)

Added the 1-day grace period logic to `calculateLateFee` in Clone A, created the commit, and pushed it to the remote branch without any issues.

## Task 2: Second Contributor Divergence (Clone B)

In Clone B, which was out of date with Clone A's push, updated the fee calculation to round values with `Math.round()`. Committed the update and attempted a push, which was rejected by GitHub because upstream had already advanced.

## Task 3: Resolving the 2-Way Merge Conflict

Fetched upstream changes into Clone B and initiated a merge. Resolved the line conflict by ensuring the grace period check ran first before applying rounding. Ran the test suite to confirm everything passed, then pushed the merged commit.

## Task 4: Introducing the Third Contributor (Clone C)

In Clone C (which was still on the initial commit), implemented a $20 maximum fee cap. Committed the change and tried pushing, resulting in an expected rejection since the remote branch was now two commits ahead.

## Task 5: Resolving the 3-Way Merge Conflict

Fetched and merged the remote updates into Clone C. Resolved the complex three-way conflict by ordering all three business rules together: grace period, fee rounding, and the $20 max cap. Verified with tests and pushed the resolution to GitHub.

## Task 6: Reconciling via Rebase (Clone A)

Back in Clone A, implemented a $1 minimum fee requirement. After the push was rejected, fetched remote changes and rebased the local commit onto `origin/feature/late-fee-policy`. Resolved the resulting conflict to incorporate all 4 policy rules, completed the rebase sequence, and pushed cleanly.

## Task 7: Production Merge, Tagging, and Final Push

Switched to the `main` branch, merged `feature/late-fee-policy`, attached the `v1.0-synced` release tag, and pushed both `main` and the tag to the remote repository.

## Code Attribution
In the final `calculateLateFee` function:

function calculateLateFee(daysLate, ratePerDay) {
  if (daysLate <= 1) return 0;
  const fee = Math.round(daysLate * ratePerDay);
  return Math.min(20, Math.max(1, fee));
}

- **1-Day Grace Period (`if (daysLate <= 1) return 0;`):** Added by Contributor 1 (Clone A, Task 1).
- **Rounding Late Fee (`Math.round(...)`):** Added by Contributor 2 (Clone B, Task 2).
- **$20 Maximum Fee Cap (`Math.min(20, ...)`):** Added by Contributor 3 (Clone C, Task 4).
- **$1 Minimum Fee (`Math.max(1, ...)`):** Added by Contributor 1 (Clone A, Task 6).

## 2-Way Conflict vs. 3-Way Conflict
Task 3 was a basic 2-way conflict where I only had to combine two changes (grace period and rounding) on the same line. Task 5 was harder because Clone C had diverged from an older commit while upstream already had multiple commits from both Clone A and Clone B. I had to manually resolve a 3-way conflict to make sure all three policy rules worked together without breaking each other.

## Merge vs. Rebase Resolution Difference
In Task 5, using git merge preserved our exact branching history by creating a dedicated merge commit. In Task 6, using git rebase rewrote my local commit history by placing Clone A's new commit directly on top of origin/feature/late-fee-policy, creating a clean, linear commit history without an extra merge commit.

## Process Improvement
To prevent all three rejected pushes, our team should adopt a pull-before-push policy (git pull --rebase origin feature/late-fee-policy) and use GitHub Pull Requests with branch protection so code changes are reviewed and merged sequentially instead of pushing directly to the same branch at the same time.

## Screenshots
![Task 1](screenshots/Task1.png)
![Task 2](screenshots/Task2.png)
![Task 3](screenshots/Task3.png)
![Task 4](screenshots/Task4.png)
![Task 5](screenshots/Task5.png)
![Task 6](screenshots/Task6.png)
![Task 7](screenshots/Task7.png)