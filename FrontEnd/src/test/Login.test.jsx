import { cleanup, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/main/Login.jsx";
import { describe, it, beforeEach, afterEach } from "vitest";
import { render } from '@testing-library/react';
import { userEvent } from "@testing-library/user-event";


describe("Componente Login", async() => {
    it("Render Login", () => {
    render(
    <MemoryRouter>
        <Login />
    </MemoryRouter>
    )
    })
    it("Ingreso datos", async () => {         
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )
    const user = screen.getByPlaceholderText('Usuario')
    const pass = screen.getByPlaceholderText("Contraseña")
    const btn = screen.getByRole("button",{name:/Entrar/i})

    const mono= userEvent.setup()
    await mono.type(user,'admin')
    await mono.type(pass,'admin')
    await mono.click(btn)


    })
    it("Render Login", () => {
        render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
        )
        const loginTitle = screen.getByRole("heading", { name: /Iniciar sesión/i });
        expect(loginTitle).toBeInTheDocument();
    })
    it("permite presionar Entrar sin romper el componente", async () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    const btn = screen.getByRole("button", { name: /Entrar/i });
    const user = userEvent.setup();

    await user.click(btn);

    // Verificamos que el botón siga existiendo (el componente no se cae)
    expect(btn).toBeInTheDocument();
});

it("permite presionar Entrar sin romper el componente", async () => {
    render( 
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );

    const btn = screen.getByRole("button", { name: /entrar/i });
    const user = userEvent.setup();
    
    await user.click(btn);

    // Solo verificamos que el botón existe (el componente no se rompe)
    expect(btn).toBeInTheDocument();
});


})