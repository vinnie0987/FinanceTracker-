import axios from "axios";

export const fetchGoals =  async () => {
    try{
        const response = await axios.get("/api/goals");  // this should match the api endpoint 
        return response;

    } catch (error){
        console.error("error fetching goals:" , error);
        throw error;
    }
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      