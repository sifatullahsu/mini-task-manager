import React from 'react';
import { toast } from 'react-hot-toast';
import AsyncSelect from 'react-select/async';

const EditTaskModal = ({ editTask, setEditTask, handleEdit }) => {

  const apiKey = process.env.REACT_APP_TASK_API_KEY;

  const promiseOptions = (inputValue, callback) => {

    if (inputValue.length >= 1) {
      fetch(`https://devza.com/tests/tasks/listusers`, {
        method: 'GET',
        headers: {
          "AuthToken": apiKey
        },
        redirect: 'follow'
      })
        .then(req => req.json())
        .then(data => {

          if (data?.status === 'success') {
            const returnData = data.users.filter(i => i.name.toLowerCase().includes(inputValue.toLowerCase()));

            const final = returnData.map(user => {
              return ({ value: `${user.id}, ${user.name}`, label: user.name });
            })

            callback(final);
          }
          else {
            callback([])
          }
        })
        .catch(error => {
          toast.error('User Loaded Faild..');
        })
    }
  };

  return (
    <>
      <input type="checkbox" id="task-edit-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit your task..</h3>
          <form className='mt-5' onSubmit={handleEdit}>

            <input name='id' type="text" defaultValue={editTask.id} required readOnly hidden />

            <div className="form-control w-full">
              <label className="label"><span className="label-text">Assign User</span></label>
              <AsyncSelect
                name='user'
                cacheOptions
                // isClearable={true}
                loadOptions={promiseOptions}
                defaultValue={{ value: `${editTask?.assigned_to}, ${editTask?.assigned_name}`, label: editTask?.assigned_name }}
                className='rr-async-select'
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Task details</span></label>
              <textarea
                defaultValue={editTask?.message}
                name='message'
                className="textarea textarea-bordered w-full"
                placeholder="Add task"
              ></textarea>
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text">Due Date</span></label>
              <input
                name='date'
                type="datetime-local"
                placeholder="Type here"
                className="input input-bordered w-full"
                defaultValue={editTask.due_date}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <select name='priority' defaultValue={editTask?.priority} className="select select-bordered">
                <option value='' disabled>Pick one</option>
                <option value='1'>Normal</option>
                <option value='2'>Mid</option>
                <option value='3'>High</option>
              </select>
            </div>


            <button type="submit" className='btn btn-primary btn-sm mt-3'>Submit</button>
          </form>
          <div className="modal-action">
            <label
              htmlFor="task-edit-modal"
              className="btn btn-primary btn-sm"
              onClick={() => setEditTask(false)}
            >Cancle</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTaskModal;