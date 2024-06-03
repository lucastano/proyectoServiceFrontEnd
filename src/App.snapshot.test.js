import renderer from "react-test-renderer";

import App from "./App";

test("renders learn react link", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
<div>
  <div>
    <form
      className="mx-auto max-w-md space-y-2 rounded-lg border p-8 shadow-md"
      onSubmit={[Function]}
    >
      <fieldset
        className="space-y-1"
      >
        <label
          className="inline cursor-pointer select-none text-body-4 font-medium text-metal-600"
          htmlFor="email"
        >
          Email: 
        </label>
        <div
          className="relative"
        >
          <input
            className="flex h-11 w-full rounded-lg border px-3 py-2 text-body-4 font-normal text-metal-900 placeholder:font-normal placeholder:text-metal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metal-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ps-11"
            onChange={[Function]}
            placeholder="Email"
            type="text"
          />
        </div>
      </fieldset>
      <fieldset
        className="space-y-1"
      >
        <label
          className="inline cursor-pointer select-none text-body-4 font-medium text-metal-600"
          htmlFor="nombre"
        >
          Nombre:
        </label>
        <div
          className="relative"
        >
          <input
            className="flex h-11 w-full rounded-lg border px-3 py-2 text-body-4 font-normal text-metal-900 placeholder:font-normal placeholder:text-metal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metal-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ps-11"
            onChange={[Function]}
            placeholder="Nombre"
            type="text"
          />
        </div>
        <label
          className="inline cursor-pointer select-none text-body-4 font-medium text-metal-600"
          htmlFor="apellido"
        >
          Apellido: 
        </label>
        <div
          className="relative"
        >
          <input
            className="flex h-11 w-full rounded-lg border px-3 py-2 text-body-4 font-normal text-metal-900 placeholder:font-normal placeholder:text-metal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metal-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ps-11"
            onChange={[Function]}
            placeholder="Apellido"
            type="text"
          />
        </div>
      </fieldset>
      <fieldset
        className="space-y-1"
      >
        <label
          className="inline cursor-pointer select-none text-body-4 font-medium text-metal-600"
          htmlFor="cedula"
        >
          Cedula de identidad (sin guión): 
        </label>
        <div
          className="relative"
        >
          <input
            className="flex h-11 w-full rounded-lg border px-3 py-2 text-body-4 font-normal text-metal-900 placeholder:font-normal placeholder:text-metal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metal-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ps-11"
            onChange={[Function]}
            placeholder="Cedula de identidad"
            type="text"
          />
        </div>
      </fieldset>
      <button
        className="active:focus:scale-95 duration-150 transition-all rounded-lg flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-body-4 px-5 py-2.5 font-medium bg-metal-600 hover:bg-metal-700 text-white focus-visible:ring-metal-200 disabled:cursor-not-allowed disabled:bg-metal-200"
        type="submit"
      >
        Registrar cliente
      </button>
    </form>
  </div>
</div>
`);
});