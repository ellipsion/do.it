const AddListPopover = () => {
  return (
    <div className="relative border">
      <button>Create New List</button>
      <div className="absolute w-[500px] left-full -top-10 z-50 px-5">
        <div className="w-full h-40 bg-white rounded shadow"></div>
      </div>
    </div>
  );
};

export default AddListPopover;
