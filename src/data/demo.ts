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
    context: "Design and engineering are waiting on the Q3 boundary before they lock the beta build.",
    due: "Today · 3:00 PM",
    dimension: "work",
    href: "work",
  },
  {
    id: "now-2",
    kind: "people",
    title: "Unblock Jordan’s review loop",
    context: "Jordan is waiting on your notes from yesterday’s prototype walkthrough.",
    due: "Today · morning",
    dimension: "people",
    href: "people",
  },
  {
    id: "now-3",
    kind: "task",
    title: "Send growth check-in to Priya",
    context: "Her mentoring goal is due a signal this week — two sentences is enough.",
    due: "Today",
    dimension: "growth",
    href: "growth",
  },
];

export const upcomingNext: UpcomingItem[] = [
  {
    id: "next-1",
    title: "Northstar beta readout",
    when: "Tomorrow · 10:30",
    meta: "With Jules, Priya, and the field team",
    dimension: "work",
  },
  {
    id: "next-2",
    title: "Staffing conversation with Jules",
    when: "Thu · 2:00",
    meta: "Organization · capacity for Atlas",
    dimension: "organization",
  },
  {
    id: "next-3",
    title: "Facilitation lab — session 2",
    when: "Fri · 9:00",
    meta: "Growth path · 45 minutes",
    dimension: "growth",
  },
  {
    id: "next-4",
    title: "Team pulse closes",
    when: "Fri · 5:00",
    meta: "People · 4 of 6 responses in",
    dimension: "people",
  },
];

export const flowMetrics: FlowMetric[] = [
  {
    id: "flow-work",
    label: "Work",
    value: 72,
    caption: "Northstar is 72% through the beta cycle.",
    dimension: "work",
  },
  {
    id: "flow-goals",
    label: "Goals",
    value: 58,
    caption: "Two of three personal goals are moving this month.",
    dimension: "growth",
  },
  {
    id: "flow-growth",
    label: "Growth",
    value: 40,
    caption: "Facilitation path is one session from the midpoint.",
    dimension: "growth",
  },
  {
    id: "flow-team",
    label: "Team",
    value: 81,
    caption: "Northstar pulse is healthy; one person needs a check-in.",
    dimension: "people",
  },
];

export const projects: Project[] = [
  {
    id: "proj-northstar",
    name: "Northstar",
    status: "On track",
    progress: 72,
    summary: "Unified workspace beta for the field org. Scope freeze is the last gate before build lock.",
    owner: "Maya Reyes",
    nextMilestone: "Beta readout · tomorrow",
  },
  {
    id: "proj-atlas",
    name: "Atlas onboarding",
    status: "At risk",
    progress: 44,
    summary: "New-hire flow is waiting on org structure updates from People Experience.",
    owner: "Jules Okonkwo",
    nextMilestone: "Staffing conversation · Thursday",
  },
  {
    id: "proj-pulse",
    name: "Team pulse",
    status: "Steady",
    progress: 81,
    summary: "Weekly signal across Northstar. Four responses in; two still open.",
    owner: "Priya Shah",
    nextMilestone: "Pulse closes · Friday",
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
  },
  {
    id: "p-priya",
    name: "Priya Shah",
    role: "Engineering Manager",
    initials: "PS",
    status: "Waiting on mentoring signal",
    note: "Northstar build is green. Growth check-in is overdue.",
  },
  {
    id: "p-jordan",
    name: "Jordan Hale",
    role: "Product Designer",
    initials: "JH",
    status: "Blocked on review notes",
    note: "Prototype walkthrough happened yesterday; notes still unpublished.",
  },
  {
    id: "p-samira",
    name: "Samira Chen",
    role: "Field Operations",
    initials: "SC",
    status: "Ready for beta readout",
    note: "Collected six customer stories for tomorrow’s session.",
  },
];

export const goals: Goal[] = [
  {
    id: "goal-1",
    title: "Ship Northstar beta with a calm field experience",
    horizon: "This quarter",
    progress: 72,
    signal: "Tied to the scope freeze and tomorrow’s readout.",
  },
  {
    id: "goal-2",
    title: "Become a clearer facilitator in high-stakes rooms",
    horizon: "This half",
    progress: 40,
    signal: "Session 2 on Friday. Practice: open the readout with one question, not a deck.",
  },
  {
    id: "goal-3",
    title: "Build a healthier 1:1 cadence with Priya",
    horizon: "This month",
    progress: 55,
    signal: "A two-sentence growth check-in today keeps this alive.",
  },
];

export const learning: LearningItem[] = [
  {
    id: "learn-1",
    title: "Facilitation lab · holding the room",
    kind: "Session",
    when: "Friday 9:00",
    relatedGoalId: "goal-2",
  },
  {
    id: "learn-2",
    title: "Decision hygiene for product leads",
    kind: "Path",
    when: "2 of 5 complete",
    relatedGoalId: "goal-1",
  },
  {
    id: "learn-3",
    title: "Notes on coaching without over-directing",
    kind: "Reading",
    when: "Suggested · 12 min",
    relatedGoalId: "goal-3",
  },
];

export const activity: TeamActivity[] = [
  {
    id: "act-1",
    personId: "p-samira",
    action: "added customer stories to the Northstar readout",
    time: "38 min ago",
  },
  {
    id: "act-2",
    personId: "p-jordan",
    action: "published the prototype walkthrough recap (draft)",
    time: "2 hr ago",
  },
  {
    id: "act-3",
    personId: "p-priya",
    action: "moved Northstar build to green",
    time: "Yesterday",
  },
  {
    id: "act-4",
    personId: "p-jules",
    action: "flagged Atlas capacity as a Thursday decision",
    time: "Yesterday",
  },
];

export const insights: Insight[] = [
  {
    id: "ins-1",
    title: "Work is waiting on a people decision",
    body: "Northstar can freeze scope today. Atlas cannot move until Jules has a capacity call on Thursday. The two projects share people — treating them as separate modules would hide the real constraint.",
    dimensions: ["work", "people", "organization"],
  },
  {
    id: "ins-2",
    title: "Growth is attached to the week’s actual rooms",
    body: "The facilitation path is not a side course. Friday’s lab is practice for tomorrow’s beta readout. Opening with a question instead of a deck is the live rehearsal.",
    dimensions: ["growth", "work"],
  },
  {
    id: "ins-3",
    title: "One check-in protects two signals",
    body: "Priya’s mentoring goal and the team pulse both stall without a short note from you. A two-sentence message today keeps People and Growth in motion.",
    dimensions: ["people", "growth"],
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
