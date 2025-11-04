import { create } from "zustand";

// 🔹 Función auxiliar para obtener la clave del carrito según usuario
const getCartKey = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? `carrito_${user.username}` : "carrito_guest";
};

export const useCarrito = create((set, get) => ({
  // 🔹 Cargar carrito desde localStorage del usuario actual
  items: JSON.parse(localStorage.getItem(getCartKey()) || "[]"),

  // 🔹 Guardar carrito actualizado
  persist: (updated) => {
    const key = getCartKey();
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  },

  // 🔹 Agregar producto
  addItem: (producto) =>
    set((state) => {
      const existe = state.items.find((it) => it.id === producto.id);
      const updated = existe
        ? state.items.map((it) =>
            it.id === producto.id
              ? { ...it, cantidad: it.cantidad + 1 }
              : it
          )
        : [...state.items, { ...producto, cantidad: 1 }];
      return { items: get().persist(updated) };
    }),

  // 🔹 Eliminar producto
  removeItem: (id) =>
    set((state) => {
      const updated = state.items.filter((it) => it.id !== id);
      return { items: get().persist(updated) };
    }),

  // 🔹 Aumentar cantidad
  increase: (id) =>
    set((state) => {
      const updated = state.items.map((it) =>
        it.id === id ? { ...it, cantidad: it.cantidad + 1 } : it
      );
      return { items: get().persist(updated) };
    }),

  // 🔹 Disminuir cantidad (y eliminar si llega a 0)
  decrease: (id) =>
    set((state) => {
      const updated = state.items
        .map((it) =>
          it.id === id ? { ...it, cantidad: it.cantidad - 1 } : it
        )
        .filter((it) => it.cantidad > 0);
      return { items: get().persist(updated) };
    }),

  // 🔹 Vaciar carrito del usuario actual
  clear: () => {
    const key = getCartKey();
    localStorage.removeItem(key);
    set({ items: [] });
  },

  // 🔹 Recargar carrito cuando cambia de usuario (por ejemplo, al iniciar o cerrar sesión)
  reload: () => {
    const key = getCartKey();
    const newCart = JSON.parse(localStorage.getItem(key) || "[]");
    set({ items: newCart });
  },
}));
