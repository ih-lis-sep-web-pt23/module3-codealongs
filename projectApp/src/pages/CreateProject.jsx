import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProject } from '../api/projects.api';

function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      const requestBody = { title, description };

      await addProject(requestBody);

      navigate('/projects');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='CreateProject'>
      <h3>Add Project</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor='title'> Title:</label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <label htmlFor='description'>Description:</label>
        <textarea
          name='description'
          id='description'
          cols='30'
          rows='10'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default CreateProject;
