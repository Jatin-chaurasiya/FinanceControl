import { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import CategoryList from "../components/CategoryList";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";
import { Plus } from "lucide-react";
import { useUser } from "../hooks/useUser";
import { useCategory } from "../hooks/useCategory";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";

const Category = () => {
  useUser();

  const { state, dispatch, addCategory, updateCategory } = useCategory();
  const { categories, addModalOpen, editModalOpen, selectedCategory } = state;

  // ✅ FIX: fetch categories on load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);

        // ensure array
        const data = Array.isArray(res.data) ? res.data : res.data?.data || [];

        dispatch({ type: "SET_CATEGORIES", payload: data });

      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, [dispatch]);

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>

          <button
            onClick={() => dispatch({ type: "OPEN_ADD_MODAL" })}
            className="cursor-pointer flex items-center gap-2 px-3 py-1.5 
              bg-green-100 text-green-700 font-medium 
              rounded-md hover:bg-green-200 transition"
          >
            <Plus size={15} /> Add Category
          </button>
        </div>

        {/* Category List */}
        <CategoryList
          categories={categories || []}
          onEditCategory={(cat) =>
            dispatch({ type: "OPEN_EDIT_MODAL", payload: cat })
          }
        />

        {/* Add Modal */}
        <Modal
          isOpen={addModalOpen}
          onClose={() => dispatch({ type: "CLOSE_ADD_MODAL" })}
          title="Add Category"
        >
          <AddCategoryForm onAddCategory={addCategory} />
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={editModalOpen}
          onClose={() => dispatch({ type: "CLOSE_EDIT_MODAL" })}
          title="Update Category"
        >
          <AddCategoryForm
            initialCategoryData={selectedCategory}
            onAddCategory={updateCategory}
            isEditing
          />
        </Modal>

      </div>
    </Dashboard>
  );
};

export default Category;