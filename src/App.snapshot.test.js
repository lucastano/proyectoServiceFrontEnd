import renderer from "react-test-renderer";

import App from "./App";

test("renders learn react link", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
<div
  className="w-screen flex items-center justify-center"
>
  <form
    className="rounded-lg border p-8 shadow-md text-left w-2/5"
    onSubmit={[Function]}
  >
    <div
      className="mb-4 space-y-2"
    >
      <label
        className="inline cursor-pointer select-none text-body-4 font-medium text-metal-600"
        htmlFor="numeroSerie"
      >
        Numero de serie: 
      </label>
      <input
        className="flex h-11 w-full rounded-lg border px-3 py-2 text-body-4 font-normal text-metal-900 placeholder:font-normal placeholder:text-metal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metal-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ps-4"
        id="numeroSerie"
        onChange={[Function]}
        placeholder="Numero de serie"
        type="text"
      />
    </div>
    <div
      className="mb-4 space-y-2"
    >
      <label
        className="inline cursor-pointer select-none text-body-4 font-medium text-metal-600"
        htmlFor="name"
      >
        Nombre: 
      </label>
      <input
        className="flex h-11 w-full rounded-lg border px-3 py-2 text-body-4 font-normal text-metal-900 placeholder:font-normal placeholder:text-metal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metal-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ps-4"
        id="name"
        onChange={[Function]}
        placeholder="Nombre"
        type="text"
      />
    </div>
    <div
      className="mb-4 space-y-2"
    >
      <label
        className="inline cursor-pointer select-none text-body-4 font-medium text-metal-600"
        htmlFor="marca"
      >
        Marca: 
      </label>
      <input
        className="flex h-11 w-full rounded-lg border px-3 py-2 text-body-4 font-normal text-metal-900 placeholder:font-normal placeholder:text-metal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metal-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ps-4"
        id="marca"
        onChange={[Function]}
        placeholder="Marca"
        type="text"
      />
    </div>
    <div
      className="mb-4 space-y-2"
    >
      <label
        className="inline cursor-pointer select-none text-body-4 font-medium text-metal-600"
        htmlFor="modelo"
      >
        Modelo: 
      </label>
      <input
        className="flex h-11 w-full rounded-lg border px-3 py-2 text-body-4 font-normal text-metal-900 placeholder:font-normal placeholder:text-metal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metal-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ps-4"
        id="modelo"
        onChange={[Function]}
        placeholder="Modelo"
        type="text"
      />
    </div>
    <div
      className="mb-4 space-y-2"
    >
      <label
        className="inline cursor-pointer select-none text-body-4 font-medium text-metal-600"
        htmlFor="color"
      >
        Color: 
      </label>
      <input
        className="flex h-11 w-full rounded-lg border px-3 py-2 text-body-4 font-normal text-metal-900 placeholder:font-normal placeholder:text-metal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metal-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ps-4"
        id="color"
        onChange={[Function]}
        placeholder="Color"
        type="text"
      />
    </div>
    <div
      className="mb-4 space-y-2"
    >
      <label
        className="inline cursor-pointer select-none text-body-4 font-medium text-metal-600"
        htmlFor="descripcion"
      >
        Descripcion: 
      </label>
      <textarea
        className="flex min-h-20 w-full rounded-md border border-metal-100 bg-white px-3 py-2 text-body-4 ring-offset-2 placeholder:text-metal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metal-100 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ps-4"
        id="descripcion"
        onChange={[Function]}
        placeholder="Escriba una descripcion aqui..."
      />
    </div>
    <button
      className="active:focus:scale-95 duration-150 transition-all rounded-lg flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-body-4 px-5 py-2.5 font-medium bg-metal-600 hover:bg-metal-700 text-white focus-visible:ring-metal-200 disabled:cursor-not-allowed disabled:bg-metal-200"
      type="submit"
    >
      Registrar Servicio
    </button>
  </form>
</div>
`);
});