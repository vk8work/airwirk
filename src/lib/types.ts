export type Dimension = "people" | "work" | "growth" | "organization";

export type AttentionKind = "decision" | "task" | "people" | "growth";

export type WorkspaceView = "home" | "work" | "people" | "growth" | "insights";

export type RelatedLink = {
  label: string;
  href: string;
};

export type AttentionItem = {
  id: string;
  kind: AttentionKind;
  title: string;
  context: string;
  due: string;
  dimension: Dimension;
  href: string;
  related: RelatedLink[];
  askPrompt: string;
  completeLabel: string;
};

export type UpcomingItem = {
  id: string;
  title: string;
  when: string;
  meta: string;
  dimension: Dimension;
  href: string;
  context: string;
  related: RelatedLink[];
};

export type FlowMetric = {
  id: string;
  label: string;
  value: number;
  caption: string;
  dimension: Dimension;
  href: string;
};

export type Project = {
  id: string;
  name: string;
  status: "On track" | "At risk" | "Steady";
  progress: number;
  summary: string;
  owner: string;
  ownerId?: string;
  nextMilestone: string;
  detail: string;
  peopleIds: string[];
  relatedGoalIds: string[];
};

export type TaskStatus = "Now" | "Next" | "Waiting" | "Done";

export type Task = {
  id: string;
  title: string;
  projectId: string;
  status: TaskStatus;
  owner: string;
  due: string;
};

export type Person = {
  id: string;
  name: string;
  role: string;
  initials: string;
  status: string;
  note: string;
  focus: string;
  projectIds: string[];
  relatedGoalIds: string[];
};

export type Goal = {
  id: string;
  title: string;
  horizon: string;
  progress: number;
  signal: string;
  detail: string;
  projectIds: string[];
  peopleIds: string[];
};

export type LearningItem = {
  id: string;
  title: string;
  kind: "Path" | "Session" | "Reading";
  when: string;
  relatedGoalId: string;
  summary: string;
};

export type TeamActivity = {
  id: string;
  personId: string;
  action: string;
  time: string;
  href: string;
};

export type Insight = {
  id: string;
  title: string;
  body: string;
  dimensions: Dimension[];
  related: RelatedLink[];
};

export type DemoUser = {
  firstName: string;
  fullName: string;
  role: string;
  team: string;
  company: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "airwirk";
  content: string;
};

export type WorkspaceMemory = {
  handledNowIds: string[];
  doneTaskIds: string[];
  doneLearningIds: string[];
};
