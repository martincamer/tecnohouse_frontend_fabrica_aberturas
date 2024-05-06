import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";

export const Login = () => {
  const { signin, error } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data);

    if (user) {
      navigate("/");
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="flex justify-center items-center bg-gray-100 h-screen">
      <form
        onSubmit={onSubmit}
        className="w-1/4 bg-white py-16 px-10 rounded-2xl shadow-xl flex flex-col gap-5 max-md:w-full max-md:mx-3 max-md:px-5 max-md:py-10"
      >
        <div className="space-y-2">
          <p className="text-2xl text-center font-bold text-slate-700 max-md:text-lg max-md:mb-3">
            Te damos la bienvenida 👋
          </p>
          <p className="max-md:text-sm text-center">
            Crea nuevas salidas de aberturas, controla el stock, etc.
          </p>
        </div>

        {error &&
          error.map((err) => (
            <p className="text-sm bg-red-100 text-red-900 py-2 px-2 rounded-xl w-full mt-5 text-center shadow border-[1px] border-red-200 flex justify-center items-center mx-auto">
              {err}
            </p>
          ))}

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-slate-700 max-md:text-sm">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="text"
              placeholder="Email"
              className="bg-white rounded-xl shadow border-[1px] border-slate-300 py-3 px-2 placeholder:text-black/50 outline-none max-md:text-sm font-bold"
            />
            {errors.email && (
              <span className="text-sm bg-red-100 text-red-900 py-2 px-2 rounded-xl text-center shadow border-[1px] border-red-200 w-full">
                El email es requerido
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-semibold text-slate-700 max-md:text-sm">
              Contraseña
            </label>
            <div className="bg-white rounded-xl shadow border-[1px] border-slate-300 py-3 px-2 placeholder:text-black/50 outline-none relative">
              <input
                className="w-full outline-none max-md:text-sm font-semibold"
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña de usuario"
              />
              <span
                onClick={handleTogglePassword}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </span>
            </div>
            {errors.password && (
              <span className="text-sm bg-red-100 text-red-900 py-2 px-2 rounded-xl w-full text-center shadow border-[1px] border-red-200">
                El password es requerido
              </span>
            )}
          </div>
          <div>
            <input
              type="submit"
              value="Ingresar al sistema"
              className="max-md:uppercase max-md:text-sm bg-indigo-500 text-white rounded-full hover:shadow-md hover:shadow-black/30 hover:translate-x-1 transition-all ease-in-out py-2.5 font-semibold px-6 text-center outline-none cursor-pointer"
            />
          </div>
          <div className="max-md:text-center text-sm font-semibold">
            <p>
              👀 Inicia sesión si no funciona el sistema comunicate{" "}
              <span className="font-bold text-indigo-600">3462-693961</span>,
              pide a tu administrador que te cree un usuario.
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};
