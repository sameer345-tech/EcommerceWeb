import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "../components/Container";
import Spinner from "../components/Spinner";
import { data, NavLink, useNavigate } from "react-router-dom";
import dataBaseService from "../appWrite/dataBaseService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaPencilAlt } from "react-icons/fa";

function Profile() {
  const queryClient = useQueryClient();
  const userLoginData = useSelector((state) => state.loginInfo.user);

  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const { data: profileUrl, refetch } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => await dataBaseService.getFilePreview(userLoginData.$id),
    
  });
  // console.log(data);
  

  const mutation = useMutation({
    mutationFn: async (file) => {
     try {
      let deleteProfile = await dataBaseService.deleteProfile(userLoginData?.$id);
      if(deleteProfile) {
        return await dataBaseService.uploadFile(userLoginData.$id, file)
     }
      
      }
      catch (error) {
        if(error.code == 404) {
           await dataBaseService.uploadFile(userLoginData.$id, file)
           refetch();
        }
      throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("userProfile");
      setUploadMessage("Image uploaded successfully");
      setTimeout(() => setUploadMessage(""), 3000);
      setError(null);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  useEffect(() => {
    setLoader(!userLoginData && !profileUrl);
  }, [userLoginData, profileUrl]);

  if (loader) {
    return (
      <Container>
        <center>
          <Spinner />
        </center>
      </Container>
    );
  }

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    mutation.mutate(file);
  };

  return (
    userLoginData && (
      <Container>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-6 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center">
              <img
                src={
                  profileUrl ||
                  "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                }
                className="rounded-full w-40 h-40 mb-4"
                alt="profile"
              />
              {uploadMessage && (
                <p className="text-green-500">{uploadMessage}</p>
              )}
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold text-center">
                  {userLoginData.name}
                </h2>
                <NavLink to="/update-name">
                  <FaPencilAlt className="text-gray-500 hover:text-gray-800 transition-all duration-200" />
                </NavLink>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-lg text-center text-gray-600">
                  {userLoginData.email}
                </p>
                <NavLink to="/update-email">
                  <FaPencilAlt className="text-gray-500 hover:text-gray-800 transition-all duration-200" />
                </NavLink>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-6">
            <form className="space-y-6" onSubmit={handleUpload}>
              <div>
                <label
                  htmlFor="profile-image"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Upload Profile Image
                </label>
                <input
                  type="file"
                  id="profile-image"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </Container>
    )
  );
}

export default Profile;
