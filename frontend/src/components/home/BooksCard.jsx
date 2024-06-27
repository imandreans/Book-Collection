import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => {
  return (
    <main className="flex gap-10 flex-wrap">
      {books.map((item) => (
        <BookSingleCard
          key={item._id}
          item={item}
        />
      ))}
    </main>
  );
};

export default BooksCard;
