import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "finder-app",
    title: "Finder App",
    category: "engineering",
    year: "2026",
    role: "Backend Developer",
    summary:
      "A location-based lost & found platform designed to help users report, discover, and recover misplaced items.",
    stack: [
      "Flutter",
      "Django",
      "Python",
      "Firebase",
      "MySQL",
      "REST API",
    ],
    highlights: [
      "Location-based item discovery and category filtering",
      "RESTful APIs for mobile and backend communication",
      "Real-time user communication using Firebase",
      "Admin moderation workflow for claim verification",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Sanjai8904/FindMate",
      },
    ],
    featured: true,
  },

  {
    slug: "expense-tracker-with-analytics",
    title: "Expense Tracker with Analytics",
    category: "engineering",
    year: "2026",
    role: "Full Stack Developer",
    summary:
      "A personal finance application for tracking expenses, managing budgets, and understanding spending patterns.",
    stack: [
      "Python",
      "Django",
      "SQLite",
      "PostgreSQL",
      "Bootstrap 5",
      "Chart.js",
      "HTML",
      "CSS",
    ],
    highlights: [
      "Expense and budget management with category-based organization",
      "Analytics dashboard built with Chart.js to visualize spending trends",
      "Database-backed tracking using PostgreSQL in production and SQLite in development",
      "Responsive interface built with Django and Bootstrap 5",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Sanjai8904/Expense_tracker_python",
      },
    ],
    featured: false,
  },

  {
    slug: "instagram-social-media-analytics",
    title: "Instagram Social Media Analytics",
    category: "data",
    year: "2026",
    role: "Data Analyst",
    summary:
      "An analytics project exploring Instagram engagement patterns to identify content and audience trends.",
    stack: [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "SQL",
      "Jupyter Notebook",
    ],
    highlights: [
      "Engagement and interaction analysis across likes, comments, and followers",
      "Content performance analysis to identify trends",
      "Data cleaning and exploratory analysis using Pandas",
      "Visualizations built with Matplotlib to communicate findings",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Sanjai8904/Instagram_DataAnalysis"
      }
    ],
    featured: false,
  },

  {
    slug: "spotify-music-data-analysis",
    title: "Spotify Music Data Analysis",
    category: "data",
    year: "2026",
    role: "Data Analyst",
    summary:
      "An exploratory analysis of Spotify track data to identify patterns in audio features, popularity, and music characteristics.",
    stack: [
      "Python",
      "Pandas",
      "Matplotlib",
      "SQL",
    ],
    highlights: [
      "Audio feature analysis across tracks",
      "Popularity and trend exploration across the dataset",
      "Data cleaning and exploratory analysis using Pandas",
      "Visualizations built with Matplotlib to surface patterns",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Sanjai8904/Spotify_Track_Analysis"
      }
    ],
    featured: false,
  },
];
