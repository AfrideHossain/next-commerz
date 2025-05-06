import EditCategoryButton from "./EditCategoryButton";

export default function CategoriesTable({ categories }) {
  return (
    <>
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-sm">
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr key={category._id.toString()}>
              <th>{category._id.toString()}</th>
              <td>{category.name}</td>
              <td>{category.slug}</td>
              <td>
                <p>{category.description}</p>
              </td>
              <td>
                <div className="join">
                  <EditCategoryButton
                    categoryString={JSON.stringify(category)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
