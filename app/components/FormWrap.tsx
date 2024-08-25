const FormWrap = ({ children }: { children: React.ReactNode }) => {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          py-12
          bg-gray-50
        "
      >
        <div
          className="
            max-w-[650px]
            w-full
            bg-white
            flex
            flex-col
            gap-6
            items-center
            shadow-lg
            shadow-gray-300
            rounded-lg
            p-6
            md:p-10
            border border-gray-200
          "
        >
          {children}
        </div>
      </div>
    );
  };
  
  export default FormWrap;
  