import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ImportContactsRoundedIcon from "@mui/icons-material/ImportContactsRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-75 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative space-y-2"
      >
        <CloseRoundedIcon
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-blue-600 rounded-lg text-white">{book.publishYear}</h2>
        {/* <h4 className="my-2 text-gray-400">{book._id}</h4> */}
        <div className="flex justify-between pr-1 pl-1">
          <div className="flex justify-start items-center">
            <ImportContactsRoundedIcon className="text-2xl mr-1" />
            <h2 className="my-1">{book.title}</h2>
          </div>
          <div className="flex justify-start items-center">
            <AccountCircleIcon className="text-2xl mr-1" />
            <h2 className="my-1">{book.author}</h2>
          </div>
        </div>
        <Divider />
        <div style={{ overflow: "auto" }}>
          <p style={{ whiteSpace: "pre-wrap" }}>{book.synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
