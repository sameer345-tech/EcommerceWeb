import React, { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import userAuth from '../appWrite/UserAuth'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/Spinner';
import { useDispatch } from 'react-redux';
import { login } from '../store/loginReducer';
function Verification() {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");
    const [error, setError] = React.useState("");
    const [verifyMessage, setverifyMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
     const navigate = useNavigate()

    useEffect(() => {
        if (userId && secret) {
            (async () => {
                try {
                    setLoading(true);
                    await userAuth.updateVerification(userId, secret);
                    setverifyMessage("Email Verified Successfully");
                    setLoading(false);
                    setTimeout(() => {
                        navigate("/")   
                    },3000)
                } catch (error) {
                    setError(error.message);
            }}) ();

        }
    }, [userId, secret])
    
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg">
            {loading ? (
                <Spinner />
            ) : error ? (
                <div className="text-red-500 text-center">
                    <p>{error}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={async () => {
                            try {
                                setLoading(true);
                                await userAuth.sendVerification(userId);
                                setverifyMessage("Verification email resent successfully");
                                setLoading(false);
                            } catch (error) {
                                setError(error.message);
                                setLoading(false);
                            }
                        }}
                    >
                        Resend Verification Email
                    </button>
                </div>
            ) : (
                <div className="text-green-500 text-center">
                    <p>{verifyMessage}</p>
                </div>
            )}
        </div>
    </div>
    
  )
}

export default Verification