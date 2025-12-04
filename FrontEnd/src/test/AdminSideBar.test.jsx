import { screen, render } from '@testing-library/react';
import AdminLayout  from '../components/AdminSidebar.jsx';
import { describe, it, expect, vi, beforeEach } from 'vitest'; 
import userEvent from "@testing-library/user-event";

import { MemoryRouter } from 'react-router-dom';

describe('AdminSidebar', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <AdminLayout />
            </MemoryRouter>
        );
    });

    it ('debe renderizar el componente sin errores', () => {
        render(
            <MemoryRouter>
                <AdminLayout />
            </MemoryRouter>
        );
    });

    it("debe contener los enlaces principales del menú", () => {
    const links = [
        /productos/i,
        /ventas/i,
        /comentarios/i,
        /Cerrar sesión/i
    ];

    links.forEach(text => {
        expect(screen.getByText(text)).toBeInTheDocument();
    });
});

it("navega al pulsar un link del menú", async () => {
    const user = userEvent.setup();
    const link = screen.getByText(/productos/i);
    await user.click(link);

    expect(link).toBeInTheDocument();
});





});