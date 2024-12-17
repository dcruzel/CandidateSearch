import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {

  const [githubUsernames, setGithubUsernames] = useState<string[]>([]);

  const [currentUser, setCurrentUser] = useState<Candidate>({
    image: null,
    username: "",
    location: null,
    email: null,
    company: null,
    bio: null
  })

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    async function getUserList() {
      const response = await searchGithub();
      const usernames = response.map((user: any) => user.login)
      setGithubUsernames(usernames)
    }
    getUserList();
  }, [])


  useEffect(() => {

    async function getSpecificUser() {
        const targetUser: string = githubUsernames[currentIndex];
        const response = await searchGithubUser(targetUser)
        const userData = {
          image: response.avatar_url,
          username: response.login,
          location: response.location,
          email: response.email,
          company: response.company,
          bio: response.bio
        }

        console.log(userData)

        setCurrentUser(userData);

    }

    getSpecificUser()

  }, [githubUsernames, currentIndex])

  function nextCandidate() {
    setCurrentIndex(currentIndex+1)

    console.log(githubUsernames[currentIndex])
  }


  function saveCandidate () {
    console.log(currentUser)

    const currentSavedCandidates = JSON.parse(localStorage.getItem("saved")) || [];

    currentSavedCandidates.push(currentUser);

    localStorage.setItem("saved", JSON.stringify(currentSavedCandidates));

    console.log("Saved!")

    nextCandidate();

  }

  return <>
    <h1>CandidateSearch</h1>

    <section className="card">
      <img src={currentUser.image}></img>

      <div className="card-body">
          <h2>{currentUser.username}</h2>

          <h4>Location: {currentUser.location ? currentUser.location : "Not provided"}</h4>
          <h4>Email</h4>
          <h4>Company</h4>
          <h4>Bio</h4>
      </div>

    </section>

    <section>
      <button
        onClick={nextCandidate}
      >Minus</button>
      <button
        onClick={saveCandidate}
      >Plus</button>
    </section>

  </>
};

export default CandidateSearch;
