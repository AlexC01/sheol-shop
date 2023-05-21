interface ModalContainerProps {
  children: React.ReactNode;
}

const ModalContainer: React.FC<ModalContainerProps> = ({ children }) => {
  return (
    <div className="justify-center flex items-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative w-4/5 md:w-4/6 lg:w-3/6 xl:w-2/5 2xl:w-1/3 my-6 mx-auto h-auto">
        {/*content*/}
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
