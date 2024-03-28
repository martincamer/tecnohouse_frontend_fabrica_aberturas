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
    <section className="flex justify-center items-center bg-slate-100 h-screen">
      <form
        onSubmit={onSubmit}
        className="max-md:mx-3 bg-white border-[1px] border-slate-300 py-20 max-md:py-10 px-10 w-1/3 max-md:w-full rounded-xl shadow-lg shadow-black/10 relative"
      >
        <div className="space-y-2">
          <p className="text-lg text-center font-normal text-slate-700 max-md:uppercase max-md:text-sm max-md:mb-3">
            Ingresa al Sistema Tecnohouse Aberturas
          </p>
        </div>

        {error &&
          error.map((err) => (
            <p className="text-sm bg-red-100 text-red-900 py-2 px-2 rounded-xl w-1/2 mt-5 text-center shadow border-[1px] border-red-200 flex justify-center items-center mx-auto">
              {err}
            </p>
          ))}

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-base normal text-slate-700 max-md:text-sm">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="text"
              placeholder="Email"
              className="bg-white rounded-xl shadow border-[1px] border-slate-300 py-3 px-2 placeholder:text-black/50 outline-none max-md:text-sm"
            />
            {errors.email && (
              <span className="text-sm bg-red-100 text-red-900 py-2 px-2 rounded-xl w-1/3 text-center shadow border-[1px] border-red-200">
                El email es requerido
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base normal text-slate-700 max-md:text-sm">
              Contraseña
            </label>
            <div className="bg-white rounded-xl shadow border-[1px] border-slate-300 py-3 px-2 placeholder:text-black/50 outline-none relative">
              <input
                className="w-full outline-none max-md:text-sm"
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
              <span className="text-sm bg-red-100 text-red-900 py-2 px-2 rounded-xl w-1/3 text-center shadow border-[1px] border-red-200">
                El password es requerido
              </span>
            )}
          </div>
          <div>
            <input
              type="submit"
              value="Ingresar al sistema"
              className="max-md:uppercase max-md:text-sm bg-indigo-500 text-white rounded-xl hover:shadow-md hover:shadow-black/30 hover:translate-x-1 transition-all ease-in-out py-2 px-6 text-center outline-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-sm font-semibold">
            {/* <Link
              className="hover:underline transition-all ease-in-out"
              to={"/password-change"}
            >
              ¿Olvidaste tu contraseña?
            </Link> */}
            {/* <Link
              className="hover:underline transition-all ease-in-out"
              to={"/register"}
            >
              ¿No te registraste? Registrase
            </Link> */}
          </div>
        </div>
      </form>
    </section>
  );
};
