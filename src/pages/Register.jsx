import Lottie from "lottie-react";
import registerLottie from "../assets/lottie/register.json"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hookes/useAuth";


const Register = () => {

  const {signInWithGoogle, setUser, createUser, updateUserProfile} = useAuth();
  const navigate = useNavigate()


  const handleSubmit = async e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    

    if (password.length < 6) {
      toast.error("Password should be 6 characters or longer!");
      return;
    }

    const passwordRegex = /(?=.*[A-Z])(?=.*[a-z]).{6,}/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one uppercase, one lowercase letter"
      );
      return;
    }

    // create user
    try {
      //2. User Registration
      const result = await createUser(email, password)
      await updateUserProfile(name, photo)
      setUser({ ...result.user, photoURL: photo, displayName: name })
      toast.success('Signup Successful')
      navigate('/')
    } catch (err) {
      toast.error(err?.message)
    }
  }



  // Google Signin
  const handleGoogleLogIn = async () => {
    try {
      await signInWithGoogle()

      toast.success('Signin Successful')
      navigate('/')
    } catch (err) {
      toast.error(err?.message)
    }
  }


  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className="lg:w-[400px]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-3"
      >
        <h2 className="text-sm font-semibold text-center text-blue-500">Register</h2>
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Start for free Today</h1>
        <p className="text-sm text-center text-gray-500 mb-6 dark:text-white/80">
          Access to all features. No credit card required.
        </p>

        <button
        onClick={handleGoogleLogIn}
          type="button"
          className="flex items-center justify-center w-full px-4 py-2 mb-4 font-medium text-gray-700 border border-gray-300 rounded-lg dark:text-white/80"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google logo"
            className="w-5 h-5 mr-2"
          />
          Sign up with Google
        </button>

        <div className="relative flex items-center justify-center mb-4">
          <span className="absolute px-2 text-sm text-gray-500 bg-white dark:text-black">Or continue with</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
              Email *
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-white">
              Photo Url *
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter your photo url"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">
              Password *
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 font-medium text-white bg-black rounded-md hover:bg-[#C19B76] dark:bg-[#C19B76]"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-white/80">
          Already have an account? <Link to="/login" className="text-blue-500 cursor-pointer">Sign in</Link>
        </p>
      </form>
      </div>
      <div className="md:w-96">
        <Lottie animationData={registerLottie}></Lottie>
      </div>
    </div>
  );
};

export default Register;
