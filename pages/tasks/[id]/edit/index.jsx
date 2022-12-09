import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useAppContext from "../../../../Components/Context/Context";
import axios from "axios";

const EditTask = () => {
  const { update, setUpdate } = useAppContext();
  const [valueStatus, setvalueStatus] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const {
    query: { id },
  } = useRouter();

  const apiFetchTask = useCallback(async (id) => {
    const { data } = await axios.get(`http://localhost:3001/tasks/${id}`);
    Object.entries(data).map(([key, valor]) => {
      setValue(`${key}`, valor);
    });
  }, []);

  const apiUpdateTask = async (id, body) => {
    setUpdate(true);
    try {
      await axios.put(`http://localhost:3001/tasks/${id}`, body);
      toast.success("The task was successfully edited.");
      reset();
    } catch (e) {
      toast.error("The task could not be edited try again.");
    } finally {
      setUpdate(false);
    }
  };

  useEffect(() => {
    const dataToEditTask = JSON.parse(localStorage.getItem("dataToEditTask"));
    if (dataToEditTask) {
      apiFetchTask(dataToEditTask);
    }
  }, [apiFetchTask, update]);

  const getValueStatusTask = (e) => {
    setvalueStatus(e.target.value);
  };

  const onSubmit = (data) => {
    const dataToSendTask = {
      completed: valueStatus === "1" ? true : false,
      description: data.description,
      endDate: data.endDate,
      id: data.id,
      personId: data.personId,
      startDate: data.startDate,
      title: data.title,
    };

    apiUpdateTask(data.id, dataToSendTask);
  };
  return (
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
          <div className="col-md-3 border-right"></div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Edit Task</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <label className="labels">Title</label>
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    className="form-control"
                    placeholder="title"
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Description</label>
                  <input
                    {...register("description", { required: true })}
                    type="text"
                    className="form-control"
                    placeholder="description"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">startDate</label>
                  <input
                    {...register("startDate", { required: true })}
                    type="date"
                    className="form-control"
                    placeholder="startDate"
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">EndDate</label>
                  <input
                    type="date"
                    {...register("endDate")}
                    className="form-control"
                    placeholder="endDate"
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-12 ">
                  <select
                    className="custom-select w-100 select-css"
                    onChange={getValueStatusTask}
                  >
                    <option value={1}>Complete</option>
                    <option value={2}>In progress</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button w-100"
                  type="submit"
                >
                  Save task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditTask;
