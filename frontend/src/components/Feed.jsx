import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import InputField from "./InputField";
import fakeData from "@/app/constants";
import ItemCard from "./ItemCard";
import { getListEvaluation } from "@/app/api/assessment/route";

const EvaluationList = ({ data, userId, likedByUserData }) => {
  return data.map((evaluation) => {
    // Trouver les données de likedByUser pour l'évaluation actuelle
    const evaluationLikedByUserData = likedByUserData.find(item => item.evaluation === evaluation.id);
    console.log(evaluationLikedByUserData);
    
    return (
      <ItemCard
        key={evaluation.id}
        evaluation={evaluation}
        userId={userId}
        likedByUserData={evaluationLikedByUserData} // Utiliser les données de likedByUser spécifiques à l'évaluation actuelle
        // handleTagClick={handleTagClick}
      />
    );
  });
};


const Feed = () => {
  const [list, setList] = useState([]);
  const userId = Number(Cookies.get('ID_MIABU'));
  console.log(userId)
  const [isLoading, setIsLoading] = useState(true);
  const [likedByUser, setLikedByUser] = useState([]); 

  const fetchEvaluation = async () => {
    try {
      const response = await getListEvaluation();
      setList(response.results);
    } catch (error) {
      console.log("Error fetching evaluations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLikeData = async () => {
    try {
      const response = await getLikesListUser(userId);
      setLikedByUser(response.data);
      console.log(response.data);
      // setLikeCount(likes.length);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération de l\'état du like:', error);
    }
  };

  useEffect(() => {
    fetchEvaluation();
    fetchLikeData();
  }, []);

  return (
    <>
      {/* <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Recherchez une épreuve...'
          required
          className='search_input peer'
        />
      </form> */}
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <EvaluationList data={list} userId={userId} likedByUserData={likedByUser} />
      )}
    </>
  );
};

export default Feed;
