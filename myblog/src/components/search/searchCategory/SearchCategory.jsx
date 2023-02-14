import "./searchCategory.css";

const SearchCategory = ({ categories, filterCategory }) => {
  return (
    <div className="container-category-search">
      {categories.map((category) => (
        <button
          type="button"
          className="item-category-search"
          onClick={() => filterCategory(category)}
          key={category}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default SearchCategory;
