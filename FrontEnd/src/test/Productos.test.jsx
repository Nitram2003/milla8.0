// src/test/Productos.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Productos from "../pages/main/Productos.jsx"; // Ajusta ruta si es necesario
import { vi } from "vitest";

//  MOCK AXIOSCLIENT
vi.mock("../../api/axiosClient", () => ({
  default: {
    get: vi.fn(() =>
      Promise.resolve({
        data: [
          {
            id: 1,
            nombre: "Peluche Totoro",
            descripcion: "Suave y tierno",
            precio: 9990,
            imagen: "imagen.jpg",
          },
        ],
      })
    ),
  },
}));



//  MOCK useCarrito
vi.mock("../../store/useCarrito", () => ({
  useCarrito: () => ({
    addItem: vi.fn(),
    reload: vi.fn(),
  }),
}));

describe("Página Productos", () => {
  it("1. Renderiza el título correctamente", async () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    const title = await screen.findByText(/nuestros peluches/i);
    expect(title).toBeInTheDocument();
  });

  it("2. Renderiza productos obtenidos por axios", async () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    // Producto mockeado
    
  });

  it("3. Agrega un producto al carrito y muestra la alerta", async () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    // Botón de agregar producto mockeado
    const buttons = await screen.findAllByRole("button", {
  name: /agregar al carrito/i,
});

// Usamos el PRIMER botón real (producto 1)
await user.click(buttons[0]);

// Ahora la alerta debe aparecer
const alertText = await screen.findByText(/agregado al carrito/i);
expect(alertText).toBeInTheDocument();


    
  });
});
