import {
  attentionNow,
  demoUser,
  flowMetrics,
  goals,
  people,
  projects,
  upcomingNext,
} from "@/data/demo";

export const suggestedPrompts = [
  "What should I focus on today?",
  "How is Northstar progressing?",
  "Who needs my attention?",
  "What should I prepare for next?",
];

function todayFocus() {
  const first = attentionNow[0];
  const second = attentionNow[1];
  const third = attentionNow[2];
  return [
    `Good morning, ${demoUser.firstName}. Your flow today is unusually coherent — three items, one through-line.`,
    `${first.title} is the lock. ${first.context} If you write that note before 3:00, engineering can freeze the beta build.`,
    `Then ${second.title.toLowerCase()}. ${second.context}`,
    `If you have ten minutes left, ${third.title.toLowerCase()}. ${third.context}`,
    `Everything else can wait until NEXT: the beta readout tomorrow, Jules on Thursday, facilitation lab on Friday.`,
  ].join("\n\n");
}

function northstar() {
  const project = projects[0];
  const work = flowMetrics[0];
  return [
    `${project.name} is ${project.status.toLowerCase()} at ${work.value}% through the beta cycle.`,
    project.summary,
    `The live constraint is not engineering — Priya’s build is green. The constraint is a decision you own today, and a people loop with Jordan.`,
    `Tomorrow’s readout with Jules, Priya, and Samira is already gathering field stories. Your job is to arrive with a frozen scope and one opening question.`,
  ].join("\n\n");
}

function whoNeedsAttention() {
  const jordan = people.find((person) => person.id === "p-jordan");
  const priya = people.find((person) => person.id === "p-priya");
  const jules = people.find((person) => person.id === "p-jules");
  return [
    "Three people are in your flow — not as a roster, as a sequence.",
    `${jordan?.name} is blocked. ${jordan?.note}`,
    `${priya?.name} is not blocked on work. ${priya?.note}`,
    `${jules?.name} does not need you today. ${jules?.note} That belongs to NEXT.`,
  ].join("\n\n");
}

function prepareNext() {
  const items = upcomingNext
    .map((item) => `• ${item.when} — ${item.title}. ${item.meta}`)
    .join("\n");
  return [
    "NEXT is already shaped. You do not need more meetings. You need the right prep.",
    items,
    "Prep that compounds: freeze Northstar today so tomorrow’s readout is a conversation, not a scramble. Open Friday’s lab with the same question you use tomorrow. That is how growth stays attached to the work.",
  ].join("\n\n");
}

function growth() {
  const facilitation = goals[1];
  const cadence = goals[2];
  return [
    `${facilitation.title} is at ${facilitation.progress}%. ${facilitation.signal}`,
    `${cadence.title} is at ${cadence.progress}%. ${cadence.signal}`,
    "AirWirk does not treat learning as a catalog. The path is useful because it rehearses the rooms already on your calendar.",
  ].join("\n\n");
}

function atlas() {
  const project = projects[1];
  return [
    `${project.name} is ${project.status.toLowerCase()} at ${project.progress}%. ${project.summary}`,
    "This is an organization constraint showing up as a project. People Experience is holding contractor options; the work cannot honestly move until Thursday.",
    "Protect today for Northstar. Atlas is NEXT, not NOW.",
  ].join("\n\n");
}

export function answerAskAirWirk(input: string) {
  const query = input.trim().toLowerCase();

  if (!query) {
    return todayFocus();
  }

  if (/(focus|today|now|priorit|should i)/.test(query)) {
    return todayFocus();
  }

  if (/northstar|beta|scope/.test(query)) {
    return northstar();
  }

  if (/atlas|staff|capacit|organiz/.test(query)) {
    return atlas();
  }

  if (/who|jordan|priya|jules|people|team|attention/.test(query)) {
    return whoNeedsAttention();
  }

  if (/next|upcoming|tomorrow|prepar|meeting|calendar/.test(query)) {
    return prepareNext();
  }

  if (/growth|learn|facilitat|goal|coach|mentor/.test(query)) {
    return growth();
  }

  return [
    `I connected that to ${demoUser.firstName}’s live workspace — not a generic answer.`,
    todayFocus(),
    "You can also ask how Northstar is progressing, who needs attention, or what to prepare next.",
  ].join("\n\n");
}
