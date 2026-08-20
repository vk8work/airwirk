import type { Metadata } from "next";
import { TodoApp } from "@/components/todo/TodoApp";

export const metadata: Metadata = {
  title: "AirWirk To Do",
  description: "A calm, personal task list. Inbox, Today, Upcoming, and Completed.",
};

export default function TodoPage() {
  return <TodoApp />;
}
