import "../styles/Login.css";

export const LoginLayout = ({ children }: { children: any }) => {
  return (
    <div
      className={
        "m-auto flex justify-center align-center items-center flex-auto mt-[10%]"
      }
    >
      {children}
    </div>
  );
};
