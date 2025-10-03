import Logo from "@/../images/logo.png";

const RedirectError = ({message}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <img src={Logo} alt="Logo" className="h-20 mb-8" />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 text-center">
        {message}
      </h1>
    </div>
  );
};

export default RedirectError;
