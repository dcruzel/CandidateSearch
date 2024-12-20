//Import the Candidate from the Candidate interface
import { Candidate } from "../interfaces/Candidate.interface";

//Import the useEffect and useState List
import { useEffect, useState } from "react";

//Get the saved Candidates List
const SavedCandidates = () => {

  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([])

  useEffect(() => {
  const currentSavedCandidates = JSON.parse(localStorage.getItem("saved") || "[]");

  setSavedCandidates(currentSavedCandidates);

}, [])

//Delete from the saved Candidates List
function deleteCandidate (username: string) {
  try{
    const candidateList = JSON.parse(localStorage.getItem("saved") || "[]");
    const removeCandidateList=candidateList.filter(
      (candidate:Candidate) => candidate.username !== username
    );
    localStorage.setItem("saved", JSON.stringify(removeCandidateList));
    setSavedCandidates(removeCandidateList);
    console.log("Deleted!")
  } catch (error){
    console.error("Error to delete candidate:", error)
  }

}
  //Print Saved Candidate List
  return (
    <>
      <h1>Potential Candidates</h1>
      <table>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Location</th>
          <th>Email</th>
          <th>Company</th>
          <th>Bio</th>
          <th>Reject</th>
        </tr>
        <tbody>
        {
        
          savedCandidates.map(candidate => {
            return (
              <tr>
                <td><img className='images' src={candidate.image ? candidate.image : "Not provided"}></img> </td>
                <td>{candidate.username}</td>
                <td>{candidate.location ? candidate.location : "Not provided"}</td>
                <td>{candidate.email ? candidate.email : "Not provided"}</td>
                <td>{candidate.company? candidate.company : "Not provided"}</td>
                <td>{candidate.bio ? candidate.bio : "Not provided"}</td>
                <td><button id='circle-red' onClick={() => {
                  if (candidate.username){
                    deleteCandidate(candidate.username);
                  }else{
                    console.error("Username is null and the Candidate cannot be deleted");
                  }
                }}>-</button></td>
              </tr>
            )
          })
      }
      </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
