import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAppContext from "../../../../Components/Context/Context";
import { toast } from "react-toastify";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";

const EditProfile = () => {
  const { update, setUpdate } = useAppContext();
  const [dataEditUser, setdataEditUser] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ defaultValues: dataEditUser });

  const {
    query: { id },
  } = useRouter();

  const apiFetchPeople = useCallback(async (id) => {
    const { data } = await axios.get(`http://localhost:3001/people/${id}`);
    setdataEditUser(data);
    Object.entries(data).map(([key, valor]) => {
      setValue(`${key}`, valor);
    });
  }, []);

  const apiUpdateProfile = async (id, body) => {
    setUpdate(true);
    try {
      await axios.put(`http://localhost:3001/people/${id}`, body);
      toast.success("The profile has been successfully updated.");
      reset();
    } catch (e) {
      toast.error("Profile has not been updated, please try again.");
    } finally {
      setUpdate(false);
    }
  };

  useEffect(() => {
    const dataToEditProfile = JSON.parse(localStorage.getItem("dataToEdit"));
    if (dataToEditProfile && id) {
      apiFetchPeople(id);
    }
  }, [apiFetchPeople, id, update]);

  const onSubmit = (data) => {
    apiUpdateProfile(id, data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container shadow rounded bg-white mt-5 mb-5">
          <div className="d-flex justify-content-start pt-2">
            <Link href={`/profile/${id}`} passHref className="ms-5">
              <span className="d-flex">
                <MdArrowBackIos className="mt-1 size-icon" />
                <h2 className="Link">Back</h2>
              </span>
            </Link>
          </div>

          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                {dataEditUser?.picture && (
                  <Image
                    className="rounded-circle mt-5 "
                    width="250"
                    height="250"
                    alt="images-people"
                    src={dataEditUser?.picture}
                  />
                )}
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Edit Profile </h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">Fullname</label>
                    <input
                      {...register("fullName", { required: true })}
                      className="form-control"
                      placeholder="Fullname"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Age</label>
                    <input
                      {...register("age", { required: true })}
                      type="number"
                      className="form-control"
                      placeholder="Age"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Occupation</label>
                    <input
                      {...register("occupation", { required: true })}
                      className="form-control"
                      placeholder="Occupation"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Nickname</label>
                    <input
                      {...register("nickname", { required: true })}
                      className="form-control"
                      placeholder="Nickname"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Gender</label>
                    <input
                      {...register("gender", { required: true })}
                      className="form-control"
                      placeholder="Gender"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Picture</label>
                    <input
                      {...register("picture", { required: true })}
                      className="form-control"
                      placeholder="Picture"
                    />
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <button
                    className="btn btn-primary profile-button w-100"
                    type="submit"
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
