import AddCategoryModal from "../../../components/adminComps/Categories/AddCategoryModal";
import AddCategoryButton from "../../../components/adminComps/Categories/AddCategoryButton";
import { getAvailableCategories } from "@/app/actions/categoriesAction";
import CategoriesTable from "@/components/adminComps/Categories/CategoriesTable";

export default async function categoriesPage() {
  let categories = [];
  const getCategories = await getAvailableCategories();
  if (getCategories.success) {
    categories = JSON.parse(getCategories.data);
  } else {
    console.error("unable to get available categories");
  }
  // console.log(categories);
  return (
    <section className="min-h-screen items-stretch flex">
      <div className="min-h-full grow">
        {!categories.length > 0 ? (
          <>
            <div className="h-full flex flex-col gap-5 justify-center items-center">
              <h1 className="text-3xl font-bold text-neutral">
                There are no categories yet.
              </h1>
              <AddCategoryButton />
            </div>
          </>
        ) : (
          <>
            <div className="mt-10 bg-gray-800 p-6 rounded-lg">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">All Categories</h2>
                <AddCategoryButton />
              </div>
              <CategoriesTable categories={categories} />
            </div>
          </>
        )}
      </div>
      <AddCategoryModal />
    </section>
  );
}
