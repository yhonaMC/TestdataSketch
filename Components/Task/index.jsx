import axios from "axios";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import useAppContext from "../Context/Context";

const TaskUser = ({ dataTask }) => {
  const { setUpdate } = useAppContext();
  const apiUpdateProfile = async (id, body) => {
    setUpdate(true);
    try {
      await axios.put(`http://localhost:3001/tasks/${id}`, body);
      toast.success("The task status was changed successfully.");
    } catch (e) {
      toast.error("Task status was not changed, please try again.");
    } finally {
      setUpdate(false);
    }
  };

  const handleupdateTask = (data) => {
    const dataToSend = {
      completed: data.completed === false ? true : false,
      description: data.description,
      endDate: data.endDate,
      id: data.id,
      personId: data.personId,
      startDate: data.startDate,
      title: data.title,
    };
    apiUpdateProfile(data.id, dataToSend);
  };

  const handleEditTask = (id) => {
    localStorage.setItem("dataToEditTask", JSON.stringify(id));
  };

  return (
    <>
      <section>
        <div className="container ">
          <div className="row ">
            <div className="col-lg-12 col-sm-12 col-md-10 col-xs-10">
              <div className="card-body table-responsive">
                <table className="table mb-5">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name task</th>
                      <th>Description task</th>
                      <th>Start date</th>
                      <th>Finished date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {dataTask.map((task) => (
                    <tbody key={task.id}>
                      <tr>
                        <th>{task.id}</th>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.startDate}</td>
                        <td>{task.endDate}</td>
                        <td>
                          {task.completed === false
                            ? "In Progress"
                            : "Completed"}
                        </td>

                        <td>
                          <div className="dropdown">
                            <button
                              class="btn  dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            ></button>
                            <ul className="dropdown-menu drop">
                              <Link href={`/tasks/${task.id}/edit`}>
                                <button
                                  type="submit"
                                  className="btn btn-edit mb-2 w-100"
                                  onClick={() => handleEditTask(task.id)}
                                >
                                  Edit
                                </button>
                              </Link>

                              <button
                                onClick={() => handleupdateTask(task)}
                                type="submit"
                                className="btn btn-edit w-100"
                              >
                                {task.completed === false
                                  ? "Mark as completed"
                                  : "Mark as not completed"}
                              </button>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TaskUser;
