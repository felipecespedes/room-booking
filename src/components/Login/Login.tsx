import React, { useContext, useRef }  from 'react';
import AppContext from '../../providers/AppContext';
import APIService from '../../services/APIService';
import { User } from '../../types/types';

type LoginProps = {
  afterLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({afterLogin}) => {
  const username = useRef('');
  const password = useRef('');
  const { updateUser } = useContext(AppContext)

  const handleSubmit = (event: any) => {
    event.preventDefault();
    APIService.login(username.current, password.current)
      .then((user: User) => {
        updateUser(user);
        console.log('successful login')
        afterLogin && afterLogin();
      })
      .catch(() => console.error('wrong credentials'))
  }

  return (
    <div className="mx-auto border border-gray-200 p-6 rounded-xl max-w-sm">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border border-gray-300 h-10 px-2 rounded-lg"
          placeholder="username"
          onChange={(e: any) => username.current = e.target.value}
        />
        <input
          type="password"
          className="border border-gray-300 my-4 h-10 px-2 rounded-lg"
          placeholder="password"
          onChange={(e: any) => password.current = e.target.value}
        />
        <input type="submit" value="Log in" className="h-10 cursor-pointer bg-blue-300 rounded-lg hover:bg-blue-400"/>
      </form>
    </div>
  );
}

export default Login;
