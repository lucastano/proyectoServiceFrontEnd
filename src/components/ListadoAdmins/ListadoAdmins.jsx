import React from "react";
import { useAdmins } from "../../store/selectors";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "keep-react";

function ListadoAdmins() {
  const admins = useAdmins();
  return (
    <>
      <h1 className="mb-8">Listado de administradores</h1>
      <div className="overflow-y-auto h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="w-[40px] flex justify-center">Id</div>
              </TableHead>
              <TableHead>
                <div className="w-[120px] flex justify-center">Nombre</div>
              </TableHead>
              <TableHead>
                <div className="w-[120px] flex justify-center">Email</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>
                  <div className="w-[40px] flex justify-center">{admin.id}</div>
                </TableCell>
                <TableCell>
                  <div className="w-[180px] normal-case">
                    {admin.nombre} {admin.apellido}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-[180px] normal-case">{admin.email}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default ListadoAdmins;
