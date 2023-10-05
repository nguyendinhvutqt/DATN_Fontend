import { useEffect } from "react";

function LocalStorageCleanup() {
  useEffect(() => {
    const cleanupLocalStorage = () => {
      // Xóa dữ liệu trong localStorage
      localStorage.removeItem("userInfo");
      localStorage.removeItem("courses");

      // Hoặc xóa toàn bộ localStorage
      // localStorage.clear();
    };

    // window.addEventListener("beforeunload", cleanupLocalStorage);

    return () => {
      // Loại bỏ lắng nghe sự kiện trước khi component unmount
      window.removeEventListener("beforeunload", cleanupLocalStorage);
    };
  }, []);

  return null; // Component này không render gì cả, chỉ dùng để xử lý localStorage
}

export default LocalStorageCleanup;
