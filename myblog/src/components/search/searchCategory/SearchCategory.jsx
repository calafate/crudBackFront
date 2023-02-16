import "./searchCategory.css";

const SearchCategory = ({ categories, filterCategory }) => {
  return (
    <div className="container-category-search">
      {categories.map((category, i) => (
        <button key={i}
          type="button"
          className="item-category-search"
          onClick={() => filterCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default SearchCategory;
