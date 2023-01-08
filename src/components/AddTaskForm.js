import React from 'react';

const AddTaskForm = ({ handleAddTask }) => {
  return (
    <form onSubmit={handleAddTask}>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Priority</span>
        </label>
        <select name='priority' defaultValue='' className="select select-bordered" required>
          <option value='' disabled>Pick one</option>
          <option value='1'>Normal</option>
          <option value='2'>Mid</option>
          <option value='3'>High</option>
        </select>
      </div>

      <div className="form-control">
        <label className="label"><span className="label-text">Task details</span></label>
        <textarea
          name='message'
          className="textarea textarea-bordered w-full"
          placeholder="task description..."
          required
        ></textarea>
      </div>

      <button type="submit" className='btn btn-primary btn-sm mt-2'>Submit</button>
    </form>
  );
};

export default AddTaskForm;