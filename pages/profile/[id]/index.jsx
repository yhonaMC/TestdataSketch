import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { DivCards } from "../../stylepersonalized";
import Link from "next/link";
import TaskUser from "../../../Components/Task";
import useAppContext from "../../../Components/Context/Context";
import { FiEdit2 } from "react-icons/fi";
const CardItem = () => {
  const { update } = useAppContext();
  const [dataUser, setdataUser] = useState([]);
  const [taskUser, setTaskUser] = useState([]);
  const {
    query: { id },
  } = useRouter();

  const apiFetchPeople = useCallback(async (id) => {
    const { data } = await axios.get(`http://localhost:3001/people/${id}`);
    setdataUser(data);
  }, []);

  const apiFetchTask = useCallback(async (id) => {
    const { data } = await axios.get(`http://localhost:3001/tasks`);
    const dataFilter = data.filter((task) => task.personId === Number(id));
    setTaskUser(dataFilter);
  }, []);

  useEffect(() => {
    if (id) {
      apiFetchPeople(id);
      apiFetchTask(id);
    }
  }, [id, apiFetchPeople, apiFetchTask, update]);

  const handleEdit = () => {
    localStorage.setItem("dataToEdit", JSON.stringify(id));
  };

  return (
    <>
      <div className="py-3 px-2 ">
        <div className="col-md-9 mx-auto">
          <div className="bg-white shadow rounded overflow-hidden">
            <DivCards bg={dataUser.color} className="px-3 pt-0 pb-4 ">
              <div className="d-flex justify-content-end pt-2">
                <div className="dropdown">
                  <button
                    class="btn"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-three-dots-vertical"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                  </button>

                  <ul className="dropdown-menu">
                    <Link href={`/profile/${id}/edit`} passHref>
                      <span
                        onClick={() => handleEdit()}
                        className="d-flex justify-content-center aling-item-center"
                      >
                        <span className="icon">
                          <FiEdit2 />
                        </span>
                        <h6 className="Link">Edit profile</h6>
                      </span>
                    </Link>
                  </ul>
                </div>
              </div>

              <div className="media align-items-end profile-head">
                {dataUser.picture && (
                  <div className="profile mr-3">
                    <Image
                      src={dataUser.picture}
                      alt="user-profile"
                      width="130"
                      height="130"
                      className="rounded mb-2 img-thumbnail"
                    />
                  </div>
                )}

                <div className="media-body mb-5 ">
                  <h4 className="mt-0 mb-0">{dataUser.fullName}</h4>
                  <p className="small mb-4">@{dataUser.nickname}</p>
                </div>
              </div>
            </DivCards>

            <div className="px-4 py-3">
              <h5 className="mb-0">About</h5>
              <div className="p-4 rounded shadow-sm bg-light">
                <p className="font-italic mb-2">
                  <span className="subtitle-about">Occupation:</span>{" "}
                  {dataUser.occupation}
                </p>
                <p className="font-italic mb-0"></p>
                <p className="font-italic mb-0">
                  <span className="subtitle-about">Gender:</span>{" "}
                  {dataUser.gender}
                </p>
              </div>
            </div>

            <div className="px-4 py-3">
              <h5 className="mb-0">Task</h5>
              <div className="p-4 rounded shadow-sm bg-light">
                <TaskUser dataTask={taskUser} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
