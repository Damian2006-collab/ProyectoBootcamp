import { create } from 'zustand'
import type { ResumenPedido } from './esquema'

export interface PedidoRecibido extends ResumenPedido {
  numero: number
}

interface EstadoPedidos {
  pedidos: PedidoRecibido[]
  registrar: (resumen: ResumenPedido) => PedidoRecibido
}

// Pedidos recibidos en esta demostración. Viven en memoria: se conservan
// mientras la página esté abierta y se pierden al recargarla.
export const usePedidos = create<EstadoPedidos>()((set, get) => ({
  pedidos: [],
  registrar: (resumen) => {
    const pedido = { ...resumen, numero: get().pedidos.length + 1 }
    set((estado) => ({ pedidos: [...estado.pedidos, pedido] }))
    return pedido
  },
}))
