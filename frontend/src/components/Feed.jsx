import { useEffect, useState } from "react";
import InputField from "./InputField";
import fakeData from "@/app/constants";
import ItemCard from "./ItemCard";
import { getListEvaluation } from "@/app/api/assessment/route";

const EvaluationList = ({ data }) => {
  return data.map((evaluation) => (
    <ItemCard
      key={evaluation.id}
      evaluation={evaluation}
      // handleTagClick={handleTagClick}
    />
  ));
};

const Feed = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    fetchEvaluation();
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
        <EvaluationList data={list} />
      )}
    </>
  );
};

export default Feed;
