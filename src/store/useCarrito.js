import { create } from "zustand";

export const useCarrito = create((set) => ({
  items: JSON.parse(localStorage.getItem("carrito") || "[]"),

  persist: (updated) => {
    localStorage.setItem("carrito", JSON.stringify(updated));
    return updated;
  },

  addItem: (producto) =>
    set((state) => {
      const existe = state.items.find((it) => it.id === producto.id);
      const updated = existe
        ? state.items.map((it) =>
            it.id === producto.id ? { ...it, cantidad: it.cantidad + 1 } : it
          )
        : [...state.items, { ...producto, cantidad: 1 }];
      return { items: useCarrito.getState().persist(updated) };
    }),

  removeItem: (id) =>
    set((state) => {
      const updated = state.items.filter((it) => it.id !== id);
      return { items: useCarrito.getState().persist(updated) };
    }),

  increase: (id) =>
    set((state) => {
      const updated = state.items.map((it) =>
        it.id === id ? { ...it, cantidad: it.cantidad + 1 } : it
      );
      return { items: useCarrito.getState().persist(updated) };
    }),

  decrease: (id) =>
    set((state) => {
      const updated = state.items
        .map((it) =>
          it.id === id ? { ...it, cantidad: it.cantidad - 1 } : it
        )
        .filter((it) => it.cantidad > 0);
      return { items: useCarrito.getState().persist(updated) };
    }),

  clear: () => {
    localStorage.removeItem("carrito");
    set({ items: [] });
  },
}));
