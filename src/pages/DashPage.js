import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import AddTaskForm from '../components/AddTaskForm';
import DashHeading from '../components/DashHeading';
import Search from '../components/Search';
import TaskCard from '../components/TaskCard';

const DashPage = () => {

  const apiKey = process.env.REACT_APP_TASK_API_KEY;
  const [searchTask, setSearchTask] = useState(false);

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await fetch(`https://devza.com/tests/tasks/list`, {
        method: 'GET',
        headers: {
          AuthToken: apiKey
        }
      });
      const data = await res.json();

      return data;
    }
  });

  const search = searchTask ? tasks.tasks.filter(task => task.message.includes(searchTask)) : false;

  let priorityNormal = [];
  let priorityMid = [];
  let priorityHigh = [];

  if (search) {
    priorityNormal = search.filter(task => task.priority === '1');
    priorityMid = search.filter(task => task.priority === '2');
    priorityHigh = search.filter(task => task.priority === '3');
  }
  else if (tasks?.tasks) {
    priorityNormal = tasks.tasks.filter(task => task.priority === '1');
    priorityMid = tasks.tasks.filter(task => task.priority === '2');
    priorityHigh = tasks.tasks.filter(task => task.priority === '3');
  }


  const handleEdit = (event) => {
    event.preventDefault();

    const form = event.target;
    const id = form.id.value;
    const message = form.message.value;
    const priority = form.priority.value;

    const user = form.user.value ? form.user.value.split(', ') : false;
    const assigned_to = user ? user[0] : false;
    // const assigned_name = user ? user[1] : false;

    const date = form.date.value ? format(new Date(form.date.value), 'yyyy-MM-dd H:mm:ss') : null;

    const myHeaders = new Headers();
    myHeaders.append("AuthToken", apiKey);

    const formdata = new FormData();
    formdata.append("message", message);
    formdata.append("priority", priority);
    formdata.append("assigned_to", assigned_to);
    // formdata.append("assigned_name", assigned_name);
    formdata.append("due_date", date);
    formdata.append("taskid", id);

    fetch('https://devza.com/tests/tasks/update', {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          toast.success('Task Updated..');
          refetch();
        }
      })

  }

  const handleDelete = (id) => {

    const myHeaders = new Headers();
    myHeaders.append("AuthToken", apiKey);

    const formdata = new FormData();
    formdata.append("taskid", id);


    fetch('https://devza.com/tests/tasks/delete', {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          toast.success('Task Deleted..');
          refetch();
        }
      })
  }

  const handleAddTask = (event) => {
    event.preventDefault();

    const form = event.target;
    const message = form.message.value;
    const priority = form.priority.value;

    const myHeaders = new Headers();
    myHeaders.append("AuthToken", apiKey);

    const formdata = new FormData();
    formdata.append("message", message);
    formdata.append("priority", priority);


    fetch('https://devza.com/tests/tasks/create', {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          toast.success('Task Added Successful..');
          form.reset();
          refetch();
        }
      })
      .catch(err => toast.error(err?.message))
  }

  return (
    <div>
      <div className='grid grid-cols-4 gap-5'>
        <div>
          <DashHeading text='Add new task'></DashHeading>
          <AddTaskForm handleAddTask={handleAddTask}></AddTaskForm>

          <div className='my-10'></div>

          <DashHeading text='Search Tasks'></DashHeading>
          <Search searchTask={searchTask} setSearchTask={setSearchTask}></Search>
        </div>
        <div>
          <DashHeading text='Normal Priority'></DashHeading>
          <TaskCard data={priorityNormal.reverse()} handleEdit={handleEdit} handleDelete={handleDelete}></TaskCard>
        </div>
        <div>
          <DashHeading text='Mid Priority'></DashHeading>
          <TaskCard data={priorityMid.reverse()} handleEdit={handleEdit} handleDelete={handleDelete}></TaskCard>
        </div>
        <div>
          <DashHeading text='High Priority'></DashHeading>
          <TaskCard data={priorityHigh.reverse()} handleEdit={handleEdit} handleDelete={handleDelete}></TaskCard>
        </div>
      </div>
    </div>
  );
};

export default DashPage;