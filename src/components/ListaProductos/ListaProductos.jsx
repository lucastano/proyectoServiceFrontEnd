import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "keep-react";
import { useProductos } from "../../store/selectors";

function ListaProductos() {
  const productos = useProductos();

  return (
    <>
      <div>
        {productos ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="max-w-[250px]">Marca</div>
                </TableHead>
                <TableHead>
                  <div className="max-w-[250px]">Modelo</div>
                </TableHead>
                <TableHead>
                  <div className="max-w-[250px]">Version</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productos.map((producto) => (
                <TableRow key={producto.id}>
                  <TableCell>
                    <div className="max-w-[250px] truncate">
                      {producto.marca}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[250px] truncate">
                      {producto.modelo}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[250px] truncate">
                      {producto.version}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No hay productos para mostrar</p>
        )}
      </div>
      <div>
        <AgregarProducto />
      </div>
    </>
  );
}

export default ListaProductos;
