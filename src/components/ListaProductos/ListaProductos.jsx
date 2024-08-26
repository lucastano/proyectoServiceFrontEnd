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
      <div className="mt-16">
        <div>
          <h1 className="mb-8">Listado de productos: </h1>
        </div>
        {productos ? (
          <div className="overflow-y-auto h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="max-w-[250px] flex justify-center">
                      Marca
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="max-w-[250px] flex justify-center">
                      Modelo
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="max-w-[250px] flex justify-center">
                      Version
                    </div>
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
          </div>
        ) : (
          <p>No hay productos para mostrar</p>
        )}
      </div>
    </>
  );
}

export default ListaProductos;
