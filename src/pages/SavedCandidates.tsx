//import { Candidate } from "../interfaces/Candidate.interface";
//import { useEffect, useState } from "react";

const SavedCandidates = () => {

  //const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([])

  // useEffect(() => {
  // const currentSavedCandidates = JSON.parse(localStorage.getItem("saved")) || [];

  //   setSavedCandidates(currentSavedCandidates)

  // }, [])

  return (
    <>
      <h1>Potential Candidates</h1>

      {
        savedCandidates.map(candidate => {
          return (
            <div>
              <h2>{candidate.username}</h2>
              <h5>{candidate.location}</h5>
            </div>

          )

        })
      }
    </>
  );
};

export default SavedCandidates;
