import React from "react";
import { useClientes } from "../../store/selectors";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "keep-react";

const ListadoClientes = () => {
  const clientes = useClientes();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="w-[80px] flex justify-center">Id</div>
          </TableHead>
          <TableHead>
            <div className="w-[120px] flex justify-center">Cédula Identidad</div>
          </TableHead>
          <TableHead>
            <div className="w-[120px] flex justify-center">Nombre</div>
          </TableHead>
          <TableHead>
            <div className="w-[160px] flex justify-center">Email</div>
          </TableHead>
          <TableHead>
            <div className="w-[85px] flex justify-center">Teléfono</div>
          </TableHead>
          <TableHead>
            <div className="w-[120px] flex justify-center">Dirección</div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clientes.map((cliente) => (
          <TableRow key={cliente.id}>
            <TableCell>{cliente.id}</TableCell>
            <TableCell>{cliente.ci}</TableCell>
            <TableCell>
              <div className="max-w-[120px] truncate">
                {cliente.nombre} {cliente.apellido}
              </div>
            </TableCell>
            <TableCell>
              <div className="max-w-[160px] normal-case">{cliente.email}</div>
            </TableCell>
            <TableCell>{cliente.telefono}</TableCell>
            <TableCell><div className="max-w-[120px] truncate">{cliente.direccion}</div></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ListadoClientes;
