import React from 'react'
import userAuth from '../appWrite/userAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
function UpdateName() {
    const queryClient = useQueryClient()
    const [message, setMessage] = React.useState('')
    const navigate = useNavigate()
    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: async (formData) => {
            let data = Object.fromEntries(formData.entries())
            let userAccount = await userAuth.userAuthAccount();
            let fullName = `${data.firstName} ${data.lastName}`;
             await userAccount.updateName(fullName);
        },
        
            onSuccess: (data) => {
                queryClient.invalidateQueries('currentUser')
                setMessage('Name changed successfully')
                setTimeout(() => {
                    navigate('/profile')
                },3000)
            },
            onError: (error) => {
                setMessage(error.message)
            }
        
    }
        
       
    )
    if (isLoading) return <p className="text-blue-600">Updating...</p>
    if (isError) return <p className="text-red-600">{error.message}</p>
    return (
        <div className='flex items-center justify-center'>
            <div className='mx-auto w-full max-w-md bg-white rounded-lg p-10'>
                <h2 className='text-center text-2xl font-bold mb-6'>Update Name</h2>
                {message && <p className="text-green-600 font-semibold text-center my-4">{message}</p>}
                <form action={mutate}>
                    <div className='space-y-5'>
                        <div>
                            <label htmlFor="firstName" className='block text-gray-700 text-sm font-medium mb-2'>First Name:</label>
                            <input type="text" id="firstName" className='block w-full px-4 py-2 border border-gray-300 rounded-md' placeholder='Enter your first name'
                                name='firstName' required />
                        </div>
                        <div>
                            <label htmlFor="lastName" className='block text-gray-700 text-sm font-medium mb-2'>Last Name:</label>
                            <input type="text" id="lastName" className='block w-full px-4 py-2 border border-gray-300 rounded-md' placeholder='Enter your last name' name='lastName' required />
                        </div>
                    </div>
                    <button type="submit" className='w-full bg-orange-700 hover:bg-orange-800 text-white py-2 px-4 rounded-md mt-6'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateName