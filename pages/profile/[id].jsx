import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { DivCards } from "../stylepersonalized";
import Link from "next/link";

const CardItem = () => {
  const [dataUser, setdataUser] = useState([]);
  const {
    query: { id },
  } = useRouter();

  const apiFetchPeople = useCallback(async (id) => {
    const { data } = await axios.get(`http://localhost:3001/people/${id}`);
    setdataUser(data);
    console.log(data);
  }, []);

  useEffect(() => {
    if (id) {
      apiFetchPeople(id);
    } else {
      return null;
    }
  }, [id, apiFetchPeople]);

  return (
    <>
      <div className="row py-5 px-4">
        <div className="col-md-5 mx-auto">
          <div className="bg-white shadow rounded overflow-hidden">
            <DivCards bg={dataUser.color} className="px-3 pt-0 pb-4 ">
              <div className="d-flex justify-content-end pt-2">
                <Link href={`/profile/${id}/edit`} passHref>
                  <button className="btn btn-outline-dark btn-sm btn-block ">
                    Edit profile
                  </button>
                </Link>
              </div>

              <div className="media align-items-end profile-head">
                <div className="profile mr-3">
                  <Image
                    src={dataUser.picture}
                    alt="user-profile"
                    width="130"
                    height="130"
                    className="rounded mb-2 img-thumbnail"
                  />
                </div>

                <div className="media-body mb-5 ">
                  <h4 className="mt-0 mb-0">{dataUser.fullName}</h4>
                  <p className="small mb-4">@{dataUser.nickname}</p>
                </div>
              </div>
            </DivCards>

            <div className="bg-light p-4 d-flex justify-content-end text-center">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">215</h5>
                  <small className="text-muted">
                    <i className="fas fa-image mr-1"></i>Photos
                  </small>
                </li>
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">745</h5>
                  <small className="text-muted">
                    <i className="fas fa-user mr-1"></i>Followers
                  </small>
                </li>
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">340</h5>
                  <small className="text-muted">
                    <i className="fas fa-user mr-1"></i>Following
                  </small>
                </li>
              </ul>
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
