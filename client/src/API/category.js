import axios from "axios";

export const createCategory = async (formData) => {
        const config = {
            headers: {
            "Content-Type": "application/json",
            },
        };
    
        try {
            const response = await axios.post("/API/category", formData, config);
            return response;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to create category");
        }
  };

  
        export const getCategories = async () => {
            try {
                const response = await axios.get("/API/category");
                return response;
            } catch (error) {
                console.error(error);
                throw new Error("Failed to get categories");
            }
  };