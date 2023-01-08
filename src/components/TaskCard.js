import React, { useState } from 'react';
import { FaDotCircle, FaRegEdit, FaTrash } from 'react-icons/fa';
import DeleteTaskModal from './DeleteTaskModal';
import EditTaskModal from './EditTaskModal';

const TaskCard = ({ data, handleEdit, handleDelete }) => {

  const [editTask, setEditTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);

  return (
    <>
      {
        data?.map((task, index) => {
          return (
            <div key={task.id} className='bg-neutral border border-secondary mb-3'>
              <div className='flex justify-between px-4 py-2 border-b border-secondary'>
                <span>
                  <FaDotCircle className='inline-block mr-2 mb-1 text-[13px] text-info'></FaDotCircle>Task: {index + 1}
                </span>
                <span>
                  <label htmlFor="task-edit-modal">
                    <FaRegEdit className='inline-block mr-2 mb-1 text-[13px]' onClick={() => setEditTask(task)}></FaRegEdit>
                  </label>
                  <label htmlFor="delete-task-modal">
                    <FaTrash className='inline-block mr-2 mb-1 text-[13px]' onClick={() => setDeleteTask(task)}></FaTrash>
                  </label>
                </span>
              </div>
              <div className='px-4 py-2'>{task.message}</div>
              <div className='px-4 py-2 text-sm'>
                {
                  task?.assigned_name ?
                    <p>Assign: {task?.assigned_name}</p>
                    :
                    <p className='text-error'>Not assigned</p>
                }
              </div>
            </div>
          )
        })
      }
      {
        data.length === 0 &&
        <p>No data found..</p>
      }
      {
        editTask &&
        <EditTaskModal
          editTask={editTask}
          setEditTask={setEditTask}
          handleEdit={handleEdit}
        ></EditTaskModal>
      }
      {
        deleteTask &&
        <DeleteTaskModal
          deleteTask={deleteTask}
          setDeleteTask={setDeleteTask}
          handleDelete={handleDelete}
        ></DeleteTaskModal>
      }
    </>
  );
};

export default TaskCard;