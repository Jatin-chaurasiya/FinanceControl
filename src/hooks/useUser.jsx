import {useContext, useEffect} from "react";
import {AppContext} from "../context/AppContext.jsx";
import {useNavigate} from "react-router-dom";
import axiosConfig from "../Util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../Util/apiEndpoints.js";

export const useUser = () => {
    const {user, setUser, clearUser} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            return;
        }

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO);

                if (isMounted && response.data) {
                    setUser(response.data);
                }

            }catch (error) {
                console.log("Failed to fetch the user info", error);
                if (isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }
        }

        fetchUserInfo();

        return () => {
            isMounted = false;
        }
    }, [user, setUser, clearUser, navigate]);

}


// 🔥 What does useUser() hook do? (Simple Explanation)

// This hook is used to:

// ✅ 1. Check if user is already in context
// ✅ 2. If not, automatically call API → get user info
// ✅ 3. Save that user info in context
// ✅ 4. If API fails → log out and redirect to login
// ✅ 5. Prevent memory leaks using isMounted

// This ensures your app knows:

// 👉 “Who is logged in right now?”
// 👉 “If not logged in → go to login page.”

// This is called a Protected Route User Fetch Hook.