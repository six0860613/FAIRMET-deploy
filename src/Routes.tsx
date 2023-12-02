import { createBrowserRouter, json } from "react-router-dom";
import Book from "./pages/Book";
import BookDetail from "./pages/BookDetail";
import Dictionary from "./pages/Dictionary";
import Landing from "./pages/Landing";
import RootLayout from "./pages/RootLayout";
import { getFilters } from "./util/getFilters";
import { getSpecificItems } from "./util/getSpecificItems";

export const router = createBrowserRouter([
  {
    path: "/",
    id: "filters",
    loader: async () => {
      const [filters, items] = await Promise.all([
        getFilters(),
        getSpecificItems(),
      ]);
      return json({ filters, items });
    },
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "dictionary",
        element: <Dictionary />,
      },
      { path: "book", element: <Book /> },
      { path: "book/:id", element: <BookDetail /> },
    ],
  },
]);
