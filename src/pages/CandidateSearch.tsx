//import useState and useEffect from React
import { useState, useEffect } from 'react';

//import API Github
import { searchGithub, searchGithubUser } from '../api/API';

//import Candidate interface
import { Candidate } from '../interfaces/Candidate.interface';

//Search for Candidate
const CandidateSearch = () => {

  //setup Usernames
  const [githubUsernames, setGithubUsernames] = useState<string[]>([]);
  //setup Current Candidates
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    image: null,
    username: "",
    location: null,
    email: null,
    company: null,
    bio: null
  });

  useEffect(() => {
    console.log('current candidate ', currentCandidate);
  }, [currentCandidate])

  //setup Current Index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  //Initial User List Fetch with [] dependency
  useEffect(() => {
    async function getUserList() {
      const response = await searchGithub();
      const usernames = response.map((user: any) => user.login);
      setGithubUsernames(usernames);
    }
    getUserList();
  }, []);

  //Get the Current Candidate with any changes with githubUsernames and currentIndex
  useEffect(() => {

    async function getSpecificUser() {
        const targetUser: string = githubUsernames[currentIndex];
        const response = await searchGithubUser(targetUser);
        const userData = {
          image: response.avatar_url,
          username: response.login,
          location: response.location,
          email: response.email,
          company: response.company,
          bio: response.bio
        };

        console.log(userData);

        setCurrentCandidate(userData);

    }

    getSpecificUser();

  }, [githubUsernames, currentIndex]);

  //Move to the next Candidate
  function nextCandidate() {
    setCurrentIndex(currentIndex+1);

    console.log(githubUsernames[currentIndex]);
  }

  //Save Candidate from the Saved Candidate List
  function saveCandidate () {
    try{
      console.log(currentCandidate);

      const currentSavedCandidates = JSON.parse(localStorage.getItem("saved") || "[]");
      currentSavedCandidates.push(currentCandidate);

      localStorage.setItem("saved", JSON.stringify(currentSavedCandidates));

      console.log("Saved!");

      nextCandidate();
    } catch (error){
      console.error("Error to save candidate:", error);
    }

  }

  //Return Candidate Search Section of Page

  return <>
    <h1>CandidateSearch</h1>

    <section className="card">
      <img src={currentCandidate.image ? currentCandidate.image : "Not provided"}></img>

      <div className="card-body">
          <h2>{currentCandidate.username}</h2>

          {currentCandidate.location && <h4>Location: {currentCandidate.location}</h4>}
          {currentCandidate.email && <h4>Email: {currentCandidate.email}</h4>}
          {currentCandidate.company && <h4>Company: {currentCandidate.company}</h4>}
          {currentCandidate.bio && <h4>Bio: {currentCandidate.bio}</h4>}

      </div>

    </section>

    <section>
      <button id='circle-red'
        onClick={nextCandidate}>-</button>
      <button id = 'rectangle'></button>
      <button id='circle-green'
        onClick={saveCandidate}>+</button>
    </section>

  </>
};

export default CandidateSearch;
