export interface OffCanvasProps {
  children: any;
  title: string;
}

//To trigger, it's necessary to place these atributes to the trigger element:
/*
  data-bs-toggle="offcanvas"
  data-bs-target="#offcanvasRight"
  aria-controls="offcanvasRight"
*/

const OffCanvas = ({ children, title }: OffCanvasProps) => {
  return (
    <div
      className="fixed top-0 bottom-0 right-0 flex flex-col invisible w-1/4 max-w-full text-gray-700 transition duration-300 ease-in-out bg-white border-none shadow-sm outline-none offcanvas offcanvas-end bg-clip-padding"
      tabIndex={-1}
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="flex items-center justify-between p-4 offcanvas-header">
        <h5 className="mb-0 text-2xl font-semibold" id="offcanvasRightLabel">
          {title}
        </h5>
        <button
          type="button"
          className="box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 btn-close focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="flex-grow p-4 overflow-y-auto offcanvas-body">
        {children}
      </div>
    </div>
  );
};

export default OffCanvas;
