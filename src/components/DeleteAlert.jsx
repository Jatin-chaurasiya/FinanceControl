import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await onDelete(); 
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-alert">
      <p>{content}</p>

      <div className="flex justify-end mt-4">
        {/* Delete Button */}
        <button
          className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded mr-2 flex items-center gap-2"
          onClick={handleDelete}
          disabled={loading}
          type="button"
        >
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </button>

        {/* Cancel Button */}
        <button
          className="cursor-pointer bg-gray-300 text-black px-4 py-2 rounded"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
