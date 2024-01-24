interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
      {children}
    </div>
  );
};

export default Container;
