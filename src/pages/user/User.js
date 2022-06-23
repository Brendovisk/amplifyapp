import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../../graphql/queries";
import { createUser } from "../../graphql/mutations";
import Title from "../../components/Title/Title";
import Footer from "../../components/Footer/Footer";
import "./style.css";

const initialFormState = { name: "", lastName: "", favoriteMovie: "" };

const User = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(listUsers));
      const userList = userData.data.listUsers.items;
      setUsers(userList);
    } catch (error) {
      console.log("error in fetching", error);
    }
  };

  async function newUser() {
    try {
      await API.graphql(graphqlOperation(createUser, { input: formData }));
      setUsers([...users, formData]);
      setFormData(initialFormState);
    } catch (error) {
      console.log("error in create new user", error);
    }
  }

  return (
    <>
      <Title />
      <div className="container">
        <form action="">
          <div>
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              name="first-name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
            />
          </div>
          <div>
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              name="last-name"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              value={formData.lastName}
            />
          </div>
          <div>
            <label htmlFor="movie">Favorite Movie</label>
            <input
              type="text"
              name="movie"
              onChange={(e) =>
                setFormData({ ...formData, favoriteMovie: e.target.value })
              }
              value={formData.favoriteMovie}
            />
          </div>
          <div className="container-button-user">
            <button onClick={() => newUser()}>Create User</button>
          </div>
        </form>
        <table>
          <thead>
            <tr className="thead-tr">
              <th>First Name</th>
              <th>Last Name</th>
              <th>Favorite Movie</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.favoriteMovie}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default User;
