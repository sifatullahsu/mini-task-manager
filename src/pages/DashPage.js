import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React from 'react';
import { toast } from 'react-hot-toast';
import AddTaskForm from '../components/AddTaskForm';
import DashHeading from '../components/DashHeading';
import TaskCard from '../components/TaskCard';

const DashPage = () => {

  const apiKey = process.env.REACT_APP_TASK_API_KEY;

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

  const priorityNormal = tasks?.tasks ? tasks.tasks.filter(task => task.priority === '1') : [];
  const priorityMid = tasks?.tasks ? tasks.tasks.filter(task => task.priority === '2') : [];
  const priorityHigh = tasks?.tasks ? tasks.tasks.filter(task => task.priority === '3') : [];


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