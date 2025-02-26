import { House, SlidersHorizontal, ChartPie, Presentation, Crown, Brain, BookText } from "lucide-react";

export const links = [
  {
    name: "Dashboard",
    icon: <House strokeWidth={1.2} size={22} />,
    href: "/user",
  },
  {
    name: "Settings",
    icon: <SlidersHorizontal strokeWidth={1.2} size={22} />,
    href: "/user/settings",
  },
  {
    name: "Analytics",
    icon: <ChartPie strokeWidth={1.2} size={22} />,
    href: "/user/analytics",
  },
  {
    name: "Learning Hub",
    icon: <Presentation strokeWidth={1.2} size={22}/>,
    href: "/user/learn",
  },
  {
    name: "Leaderboard",
    icon: <Crown strokeWidth={1.2} size={22} />,
    href: "/user/leaderboard",
  },
//   {
//     name: "Create QCM",
//     icon: <ClipboardType strokeWidth={1.2}  size={22}/>,
//     href: "/user/create-qcm",
//   },
  {
    name: "AI-Generated QCM",
    icon: <Brain strokeWidth={1.2} size={22}/>,
    href: "/user/ai-qcm",
  },
  {
    name: "Subjects",
    icon: <BookText strokeWidth={1.2} size={22}/>,
    href: "/user/subjects",
  },
];
