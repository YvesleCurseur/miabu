import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import InputField from "./InputField";
import fakeData from "@/app/constants";
import ItemCard from "./ItemCard";
import { getListEvaluation, searchEvaluation } from "@/app/api/assessment/route";
import SearchBar from "./SearchBar";
import { useRouter } from 'next/navigation';

const EvaluationList = ({ data, userId, likedByUserData }) => {

  if (data.length === 0) {
    return (
      <div className="mt-10">
        <p className="desc text-center" >Aucune épreuve trouvée.</p>
      </div>
      
    );
  }

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
  const router = useRouter();

  const [initialList, setInitialList] = useState([]);
  const [list, setList] = useState([]);
  const userId = Number(Cookies.get('ID_MIABU'));
  const [isLoading, setIsLoading] = useState(true);
  const [likedByUser, setLikedByUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const fetchEvaluation = async () => {
    try {
      const response = await getListEvaluation();
      setInitialList(response.results);
      setList(response.results);

      // Récupérer la valeur de recherche depuis les paramètres d'URL
      const searchParam = router.query.search;
      if (searchParam) {
        setSearchQuery(searchParam);
        setSearchPerformed(true);
        handleSearch(searchParam);
      }
    } catch (error) {
      console.log("Error fetching evaluations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const fetchLikeData = async () => {
  //   try {
  //     const response = await getLikesListUser(userId);
  //     setLikedByUser(response.data);
  //   } catch (error) {
  //     console.error('Une erreur s\'est produite lors de la récupération de l\'état du like:', error);
  //   }
  // };

  const handleSearch = async (query) => {
    const encodedQuery = encodeURIComponent(query); // Encodage de la valeur de recherche
  
    setSearchQuery(query);
    setSearchPerformed(true);
  
    // Mettre à jour les paramètres d'URL avec la valeur de recherche encodée
    router.push(`?search=${encodedQuery}`);
  
    try {
      const response = await searchEvaluation(query);
      setList(response.results);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des épreuves:', error);
    }
  };
  
  useEffect(() => {
    fetchEvaluation();
    // fetchLikeData();
  }, []);

  const displayList = searchPerformed ? list : initialList;

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <EvaluationList data={displayList} userId={userId} likedByUserData={likedByUser} />
      )}
    </>
  );
};

export default Feed;
