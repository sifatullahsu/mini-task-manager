import React from 'react';

const DeleteTaskModal = ({ deleteTask, setDeleteTask, handleDelete }) => {
  return (
    <>
      <input type="checkbox" id="delete-task-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Want to delete the task?</h3>
          <p className="py-4"><span className='text-primary'>Task message:</span> {deleteTask.message}</p>
          <div className="modal-action">
            <label
              htmlFor="delete-task-modal"
              className="btn btn-primary btn-sm"
              onClick={() => handleDelete(deleteTask?.id)}
            >Delete</label>
            <label
              htmlFor="delete-task-modal"
              className="btn btn-primary btn-sm"
              onClick={() => setDeleteTask(false)}
            >Cancle</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteTaskModal;