import React from 'react'
import userAuth from '../appWrite/UserAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function UpdateEmail() {
    const queryClient = useQueryClient();
    const [message, setMessage] = React.useState('');
    const navigate = useNavigate();
    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: async (formData) => {
            let data = Object.fromEntries(formData.entries());
            let { email, password } = data;
            console.log(email, password);
            
            let userAccount = await userAuth.userAuthAccount();
            
            try {
                
                await userAccount.updateEmail(email,password);
                await  userAuth.sendVerification("http://localhost:5173/verification");
            } catch (e) {
                throw e;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('currentUser');
            setMessage('verification link sent to your email');
        },
        onError: (error) => {
            setMessage(error.message);
        }
    })
   
  return (
    <div className='flex items-center justify-center'>
      <div className='mx-auto w-full max-w-md bg-white rounded-lg p-10'>
        <h2 className='text-center text-2xl font-bold mb-6'>Update Email Address</h2>
        {message && <p className="text-green-600 font-semibold text-center my-4">{message}</p>}
        <form action={mutate}>
          <div className='space-y-5'>
            <div>
              <label htmlFor="email" className='block text-gray-700 text-sm font-medium mb-2'>Email:</label>
              <input type="email" id="email" className='block w-full px-4 py-2 border border-gray-300 rounded-md' placeholder='Enter your new email' name='email' required/>
            </div>
            <div>
              <label htmlFor="password" className='block text-gray-700 text-sm font-medium mb-2'  >Password:</label>
              <input type="password" id="password" className='block w-full px-4 py-2 border border-gray-300 rounded-md'placeholder='Enter your password' name='password' required />
            </div>
          </div>
          <button type="submit" className='w-full bg-orange-700 hover:bg-orange-800 text-white  py-2 px-4 rounded-md mt-6' disabled={isLoading}>Update</button>
          {isError && <p className='text-red-600 mt-2'>{error.message}</p>}
          
        </form>
      </div>
    </div>
  )
}

export default UpdateEmail