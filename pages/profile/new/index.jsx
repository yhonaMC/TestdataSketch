import React from "react";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { MdArrowBackIos } from "react-icons/md";
import { toast } from "react-toastify";
import useAppContext from "../../../Components/Context/Context";

const New = () => {
  const { setUpdate } = useAppContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const apiUpdateProfile = async (body) => {
    setUpdate(true);
    try {
      await axios.post(`http://localhost:3001/people/`, body);
      toast.success("The profile has been created successfully..");
      reset();
    } catch (e) {
      toast.error("The profile has not been created, try again.");
    } finally {
      setUpdate(false);
    }
  };

  const onSubmit = (data) => {
    apiUpdateProfile(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container shadow rounded bg-white mt-5 mb-5">
          <div className="d-flex justify-content-start pt-2">
            <Link href={`/`} passHref className="ms-5">
              <span className="d-flex">
                <MdArrowBackIos className="mt-1 size-icon" />
                <h2 className="Link">Back</h2>
              </span>
            </Link>
          </div>

          <div className="row justify-content-center align-items-center ">
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-center align-items-center mb-3 ">
                  <h4 className="text-right">New Profile </h4>
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
                  <div className="col-md-12 mt-2">
                    <label className="labels">Nickname</label>
                    <input
                      {...register("nickname", { required: true })}
                      className="form-control"
                      placeholder="Nickname"
                    />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="labels">Gender</label>
                    <input
                      {...register("gender", { required: true })}
                      className="form-control"
                      placeholder="Gender"
                    />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="labels">Picture</label>
                    <input
                      {...register("picture", { required: true })}
                      className="form-control"
                      placeholder="Picture"
                    />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="labels">Color profile</label>
                    <input
                      {...register("color", { required: true })}
                      className="form-control"
                      placeholder="color"
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

export default New;
