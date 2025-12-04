// src/test/Blogs.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Blogs from "../pages/main/Blogs.jsx"; // ajusta la ruta según tu proyecto

describe("Página de Blogs", () => {

  it("1. Renderiza el título Blogs", () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );

    const title = screen.getByRole("heading", { name: /blogs/i });
    expect(title).toBeInTheDocument();
  });

    it("2. Renderiza todos los artículos y sus botones", () => {
    render(
        <MemoryRouter>
        <Blogs />
        </MemoryRouter>
    );

    // Seleccionar SOLO los articles con class "card"
    const cards = screen.getAllByRole("article").filter(
        (a) => a.className.includes("card")
    );

    expect(cards.length).toBe(3);

    // Verifica los botones "Leer más"
    const buttons = screen.getAllByRole("link", { name: /leer más/i });
    expect(buttons.length).toBe(3);
    });


});
