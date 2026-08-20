import type {
  AttentionItem,
  DemoUser,
  FlowMetric,
  Goal,
  Insight,
  LearningItem,
  Person,
  Project,
  Task,
  TeamActivity,
  UpcomingItem,
} from "@/lib/types";

export const demoUser: DemoUser = {
  firstName: "Maya",
  fullName: "Maya Reyes",
  role: "Product Lead",
  team: "Northstar",
  company: "Lumen Field",
};

export const attentionNow: AttentionItem[] = [
  {
    id: "now-1",
    kind: "decision",
    title: "Approve Northstar scope freeze",
    context:
      "Design and engineering are waiting on the Q3 boundary before they lock the beta build.",
    due: "Today · 3:00 PM",
    dimension: "work",
    href: "/workspace/now/now-1",
    askPrompt: "How is Northstar progressing?",
    completeLabel: "Mark scope freeze as sent",
    related: [
      { label: "Northstar", href: "/workspace/work/proj-northstar" },
      { label: "Priya Shah", href: "/workspace/people/p-priya" },
      { label: "Beta goal", href: "/workspace/growth/goal-1" },
    ],
  },
  {
    id: "now-2",
    kind: "people",
    title: "Unblock Jordan’s review loop",
    context:
      "Jordan is waiting on your notes from yesterday’s prototype walkthrough.",
    due: "Today · morning",
    dimension: "people",
    href: "/workspace/now/now-2",
    askPrompt: "Who needs my attention?",
    completeLabel: "Mark notes as shared",
    related: [
      { label: "Jordan Hale", href: "/workspace/people/p-jordan" },
      { label: "Northstar", href: "/workspace/work/proj-northstar" },
    ],
  },
  {
    id: "now-3",
    kind: "task",
    title: "Send growth check-in to Priya",
    context:
      "Her mentoring goal is due a signal this week — two sentences is enough.",
    due: "Today",
    dimension: "growth",
    href: "/workspace/now/now-3",
    askPrompt: "What should I focus on today?",
    completeLabel: "Mark check-in as sent",
    related: [
      { label: "Priya Shah", href: "/workspace/people/p-priya" },
      { label: "1:1 cadence", href: "/workspace/growth/goal-3" },
      { label: "Team pulse", href: "/workspace/work/proj-pulse" },
    ],
  },
];

export const upcomingNext: UpcomingItem[] = [
  {
    id: "next-1",
    title: "Northstar beta readout",
    when: "Tomorrow · 10:30",
    meta: "With Jules, Priya, and the field team",
    dimension: "work",
    href: "/workspace/next/next-1",
    context:
      "A conversation, not a deck dump — if today’s scope freeze lands. Samira already has six field stories.",
    related: [
      { label: "Northstar", href: "/workspace/work/proj-northstar" },
      { label: "Samira Chen", href: "/workspace/people/p-samira" },
      { label: "Facilitation goal", href: "/workspace/growth/goal-2" },
    ],
  },
  {
    id: "next-2",
    title: "Staffing conversation with Jules",
    when: "Thu · 2:00",
    meta: "Organization · capacity for Atlas",
    dimension: "organization",
    href: "/workspace/next/next-2",
    context:
      "Atlas is at risk because People Experience is holding contractor options. This is an org constraint showing up as a project.",
    related: [
      { label: "Jules Okonkwo", href: "/workspace/people/p-jules" },
      { label: "Atlas onboarding", href: "/workspace/work/proj-atlas" },
    ],
  },
  {
    id: "next-3",
    title: "Facilitation lab — session 2",
    when: "Fri · 9:00",
    meta: "Growth path · 45 minutes",
    dimension: "growth",
    href: "/workspace/next/next-3",
    context:
      "Practice for tomorrow’s readout: open with one question, not slides. The path is useful because it rehearses a room already on the calendar.",
    related: [
      { label: "Facilitation goal", href: "/workspace/growth/goal-2" },
      { label: "Northstar readout", href: "/workspace/next/next-1" },
    ],
  },
  {
    id: "next-4",
    title: "Team pulse closes",
    when: "Fri · 5:00",
    meta: "People · 4 of 6 responses in",
    dimension: "people",
    href: "/workspace/next/next-4",
    context:
      "Priya owns the nudges. Your check-in today is the signal that keeps the pulse from stalling.",
    related: [
      { label: "Team pulse", href: "/workspace/work/proj-pulse" },
      { label: "Priya Shah", href: "/workspace/people/p-priya" },
    ],
  },
];

export const flowMetrics: FlowMetric[] = [
  {
    id: "flow-work",
    label: "Work",
    value: 72,
    caption: "Northstar is 72% through the beta cycle.",
    dimension: "work",
    href: "/workspace/work/proj-northstar",
  },
  {
    id: "flow-goals",
    label: "Goals",
    value: 58,
    caption: "Two of three personal goals are moving this month.",
    dimension: "growth",
    href: "/workspace/growth",
  },
  {
    id: "flow-growth",
    label: "Growth",
    value: 40,
    caption: "Facilitation path is one session from the midpoint.",
    dimension: "growth",
    href: "/workspace/growth/goal-2",
  },
  {
    id: "flow-team",
    label: "Team",
    value: 81,
    caption: "Northstar pulse is healthy; one person needs a check-in.",
    dimension: "people",
    href: "/workspace/people",
  },
];

export const projects: Project[] = [
  {
    id: "proj-northstar",
    name: "Northstar",
    status: "On track",
    progress: 72,
    summary:
      "Unified workspace beta for the field org. Scope freeze is the last gate before build lock.",
    owner: "Maya Reyes",
    nextMilestone: "Beta readout · tomorrow",
    detail:
      "Northstar is the beta of AirWirk’s own idea: one flow for the field org. Engineering is green. The remaining work is a decision you own today and a people loop with Jordan. Tomorrow’s readout is already gathering stories; arrive with a frozen scope and one opening question.",
    peopleIds: ["p-priya", "p-jordan", "p-samira", "p-jules"],
    relatedGoalIds: ["goal-1", "goal-2"],
  },
  {
    id: "proj-atlas",
    name: "Atlas onboarding",
    status: "At risk",
    progress: 44,
    summary:
      "New-hire flow is waiting on org structure updates from People Experience.",
    owner: "Jules Okonkwo",
    ownerId: "p-jules",
    nextMilestone: "Staffing conversation · Thursday",
    detail:
      "Atlas looks like a project. It is actually an organization constraint. Jules is holding two contractor options until Thursday. Protect today for Northstar; Atlas belongs to NEXT.",
    peopleIds: ["p-jules"],
    relatedGoalIds: [],
  },
  {
    id: "proj-pulse",
    name: "Team pulse",
    status: "Steady",
    progress: 81,
    summary: "Weekly signal across Northstar. Four responses in; two still open.",
    owner: "Priya Shah",
    ownerId: "p-priya",
    nextMilestone: "Pulse closes · Friday",
    detail:
      "The pulse is healthy enough not to panic, and incomplete enough to need a human. Priya is waiting on a mentoring signal from you; that same note keeps the last responses from going quiet.",
    peopleIds: ["p-priya"],
    relatedGoalIds: ["goal-3"],
  },
];

export const tasks: Task[] = [
  {
    id: "task-1",
    title: "Write the Northstar scope note",
    projectId: "proj-northstar",
    status: "Now",
    owner: "Maya Reyes",
    due: "Today 3:00 PM",
  },
  {
    id: "task-2",
    title: "Share prototype notes with Jordan",
    projectId: "proj-northstar",
    status: "Now",
    owner: "Maya Reyes",
    due: "Today",
  },
  {
    id: "task-3",
    title: "Review Atlas role map",
    projectId: "proj-atlas",
    status: "Next",
    owner: "Maya Reyes",
    due: "Thursday",
  },
  {
    id: "task-4",
    title: "Prep beta readout narrative",
    projectId: "proj-northstar",
    status: "Next",
    owner: "Maya Reyes",
    due: "Tomorrow morning",
  },
  {
    id: "task-5",
    title: "Close remaining pulse nudges",
    projectId: "proj-pulse",
    status: "Waiting",
    owner: "Priya Shah",
    due: "Friday",
  },
];

export const people: Person[] = [
  {
    id: "p-jules",
    name: "Jules Okonkwo",
    role: "Director, People Experience",
    initials: "JO",
    status: "Needs a decision on Atlas capacity",
    note: "Holding two contractor options until Thursday.",
    focus:
      "Jules does not need you today. Thursday is the room. Showing up with a clear Northstar freeze makes the Atlas conversation smaller.",
    projectIds: ["proj-atlas", "proj-northstar"],
    relatedGoalIds: [],
  },
  {
    id: "p-priya",
    name: "Priya Shah",
    role: "Engineering Manager",
    initials: "PS",
    status: "Waiting on mentoring signal",
    note: "Northstar build is green. Growth check-in is overdue.",
    focus:
      "Priya is not blocked on work. A two-sentence growth note protects her mentoring goal and the team pulse at once.",
    projectIds: ["proj-northstar", "proj-pulse"],
    relatedGoalIds: ["goal-3", "goal-1"],
  },
  {
    id: "p-jordan",
    name: "Jordan Hale",
    role: "Product Designer",
    initials: "JH",
    status: "Blocked on review notes",
    note: "Prototype walkthrough happened yesterday; notes still unpublished.",
    focus:
      "Jordan is in NOW. Publish yesterday’s walkthrough notes so the beta can freeze without a design surprise.",
    projectIds: ["proj-northstar"],
    relatedGoalIds: ["goal-1"],
  },
  {
    id: "p-samira",
    name: "Samira Chen",
    role: "Field Operations",
    initials: "SC",
    status: "Ready for beta readout",
    note: "Collected six customer stories for tomorrow’s session.",
    focus:
      "Samira is already prepared. Your job is to arrive tomorrow ready to listen, not to restack her stories into slides.",
    projectIds: ["proj-northstar"],
    relatedGoalIds: ["goal-2"],
  },
];

export const goals: Goal[] = [
  {
    id: "goal-1",
    title: "Ship Northstar beta with a calm field experience",
    horizon: "This quarter",
    progress: 72,
    signal: "Tied to the scope freeze and tomorrow’s readout.",
    detail:
      "This goal is the work. The remaining 28% is not more features — it is a freeze, a readout, and a field team that does not feel ambushed.",
    projectIds: ["proj-northstar"],
    peopleIds: ["p-priya", "p-jordan", "p-samira"],
  },
  {
    id: "goal-2",
    title: "Become a clearer facilitator in high-stakes rooms",
    horizon: "This half",
    progress: 40,
    signal:
      "Session 2 on Friday. Practice: open the readout with one question, not a deck.",
    detail:
      "Learning is attached to rooms you already have. Friday’s lab rehearses tomorrow’s readout. The practice is one question.",
    projectIds: ["proj-northstar"],
    peopleIds: ["p-samira"],
  },
  {
    id: "goal-3",
    title: "Build a healthier 1:1 cadence with Priya",
    horizon: "This month",
    progress: 55,
    signal: "A two-sentence growth check-in today keeps this alive.",
    detail:
      "Cadence is not a calendar invite. It is the small signal this week so Priya does not have to guess whether development still matters.",
    projectIds: ["proj-pulse"],
    peopleIds: ["p-priya"],
  },
];

export const learning: LearningItem[] = [
  {
    id: "learn-1",
    title: "Facilitation lab · holding the room",
    kind: "Session",
    when: "Friday 9:00",
    relatedGoalId: "goal-2",
    summary:
      "Live practice: open with a question, hold silence, and only then offer a frame.",
  },
  {
    id: "learn-2",
    title: "Decision hygiene for product leads",
    kind: "Path",
    when: "2 of 5 complete",
    relatedGoalId: "goal-1",
    summary:
      "A short path on writing decisions that other people can actually freeze against.",
  },
  {
    id: "learn-3",
    title: "Notes on coaching without over-directing",
    kind: "Reading",
    when: "Suggested · 12 min",
    relatedGoalId: "goal-3",
    summary:
      "Useful before the Priya check-in: two sentences, no solution dumped on top.",
  },
];

export const activity: TeamActivity[] = [
  {
    id: "act-1",
    personId: "p-samira",
    action: "added customer stories to the Northstar readout",
    time: "38 min ago",
    href: "/workspace/people/p-samira",
  },
  {
    id: "act-2",
    personId: "p-jordan",
    action: "published the prototype walkthrough recap (draft)",
    time: "2 hr ago",
    href: "/workspace/people/p-jordan",
  },
  {
    id: "act-3",
    personId: "p-priya",
    action: "moved Northstar build to green",
    time: "Yesterday",
    href: "/workspace/people/p-priya",
  },
  {
    id: "act-4",
    personId: "p-jules",
    action: "flagged Atlas capacity as a Thursday decision",
    time: "Yesterday",
    href: "/workspace/people/p-jules",
  },
];

export const insights: Insight[] = [
  {
    id: "ins-1",
    title: "Work is waiting on a people decision",
    body: "Northstar can freeze scope today. Atlas cannot move until Jules has a capacity call on Thursday. The two projects share people — treating them as separate modules would hide the real constraint.",
    dimensions: ["work", "people", "organization"],
    related: [
      { label: "Northstar", href: "/workspace/work/proj-northstar" },
      { label: "Atlas", href: "/workspace/work/proj-atlas" },
      { label: "Jules", href: "/workspace/people/p-jules" },
    ],
  },
  {
    id: "ins-2",
    title: "Growth is attached to the week’s actual rooms",
    body: "The facilitation path is not a side course. Friday’s lab is practice for tomorrow’s beta readout. Opening with a question instead of a deck is the live rehearsal.",
    dimensions: ["growth", "work"],
    related: [
      { label: "Facilitation goal", href: "/workspace/growth/goal-2" },
      { label: "Beta readout", href: "/workspace/next/next-1" },
      { label: "Northstar", href: "/workspace/work/proj-northstar" },
    ],
  },
  {
    id: "ins-3",
    title: "One check-in protects two signals",
    body: "Priya’s mentoring goal and the team pulse both stall without a short note from you. A two-sentence message today keeps People and Growth in motion.",
    dimensions: ["people", "growth"],
    related: [
      { label: "Priya", href: "/workspace/people/p-priya" },
      { label: "1:1 cadence", href: "/workspace/growth/goal-3" },
      { label: "Team pulse", href: "/workspace/work/proj-pulse" },
    ],
  },
];

export function projectById(id: string) {
  return projects.find((project) => project.id === id);
}

export function personById(id: string) {
  return people.find((person) => person.id === id);
}

export function goalById(id: string) {
  return goals.find((goal) => goal.id === id);
}

export function attentionById(id: string) {
  return attentionNow.find((item) => item.id === id);
}

export function upcomingById(id: string) {
  return upcomingNext.find((item) => item.id === id);
}

export function insightById(id: string) {
  return insights.find((item) => item.id === id);
}

export function learningByGoal(goalId: string) {
  return learning.filter((item) => item.relatedGoalId === goalId);
}

export function tasksByProject(projectId: string) {
  return tasks.filter((task) => task.projectId === projectId);
}

export function activityByPerson(personId: string) {
  return activity.filter((item) => item.personId === personId);
}
