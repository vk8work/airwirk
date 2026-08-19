export type Dimension = "people" | "work" | "growth" | "organization";

export type AttentionKind = "decision" | "task" | "people" | "growth";

export type WorkspaceView = "home" | "work" | "people" | "growth" | "insights";

export type AttentionItem = {
  id: string;
  kind: AttentionKind;
  title: string;
  context: string;
  due: string;
  dimension: Dimension;
  href?: WorkspaceView;
};

export type UpcomingItem = {
  id: string;
  title: string;
  when: string;
  meta: string;
  dimension: Dimension;
};

export type FlowMetric = {
  id: string;
  label: string;
  value: number;
  caption: string;
  dimension: Dimension;
};

export type Project = {
  id: string;
  name: string;
  status: "On track" | "At risk" | "Steady";
  progress: number;
  summary: string;
  owner: string;
  nextMilestone: string;
};

export type Task = {
  id: string;
  title: string;
  projectId: string;
  status: "Now" | "Next" | "Waiting";
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
};

export type Goal = {
  id: string;
  title: string;
  horizon: string;
  progress: number;
  signal: string;
};

export type LearningItem = {
  id: string;
  title: string;
  kind: "Path" | "Session" | "Reading";
  when: string;
  relatedGoalId: string;
};

export type TeamActivity = {
  id: string;
  personId: string;
  action: string;
  time: string;
};

export type Insight = {
  id: string;
  title: string;
  body: string;
  dimensions: Dimension[];
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
