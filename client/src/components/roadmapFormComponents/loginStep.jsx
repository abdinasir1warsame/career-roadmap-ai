import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { UserAuth } from '../../context/authContext';
import { db } from '../../firebase';

export default function AuthForm({ nextStep }) {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(false);
  const navigate = useNavigate();

  const { createUser, signIn, signInWithGoogle, user } = UserAuth();

  // Check onboarding status after successful authentication
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) return;

      setIsCheckingOnboarding(true);
      try {
        // Directly access the user's onboarding document using their UID as document ID
        const onboardingDoc = await getDoc(doc(db, 'userOnboarding', user.uid));

        if (onboardingDoc.exists()) {
          navigate('/dashboard');
        } else {
          nextStep(); // Continue to onboarding if document doesn't exist
        }
      } catch (e) {
        console.error('Error checking onboarding status:', e);
        if (e.code === 'permission-denied') {
          setError(
            'Please refresh and try again. If the problem persists, contact support.'
          );
        } else {
          setError('Error verifying your account status. Please try again.');
        }
        // Proceed to onboarding as fallback
        nextStep();
      } finally {
        setIsCheckingOnboarding(false);
      }
    };

    checkOnboardingStatus();
  }, [user, navigate, nextStep]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegistering) {
        await createUser(email, password);
      } else {
        await signIn(email, password);
      }
      // The useEffect will handle the onboarding check after auth state changes
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        setError('This email is already registered.');
      } else if (e.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (e.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (e.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else {
        setError(e.message);
      }
      console.log(e.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithGoogle();
      // The useEffect will handle the onboarding check after auth state changes
    } catch (e) {
      setError('Google sign-in failed. Try again.');
      console.log(e.message);
    }
  };

  const buttonText = isCheckingOnboarding
    ? 'Processing...'
    : isRegistering
    ? 'Create Account'
    : 'Sign In';

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-800/60 p-6 md:p-8 rounded-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        {isRegistering ? 'Register' : 'Sign In'}
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-white text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800/80 text-white border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-white text-sm font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete={isRegistering ? 'new-password' : 'current-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800/80 text-white border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="••••••••"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm pt-2">{error}</p>}

      <div className="pt-4">
        <button
          type="submit"
          disabled={isCheckingOnboarding}
          className={`w-full py-3 px-6 text-white font-medium rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg shadow-blue-500/30 transition-all duration-300 ${
            isCheckingOnboarding ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {buttonText}
        </button>
      </div>

      <div className="relative flex items-center justify-center my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative px-4 bg-gray-900 text-sm text-white">
          Or continue with
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isCheckingOnboarding}
          className={`flex items-center justify-center py-3 px-4 border border-blue-500/30 rounded-lg hover:bg-gray-800 transition-all duration-300 ${
            isCheckingOnboarding ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          disabled
          className="flex items-center justify-center py-3 px-4 border border-blue-500/30 rounded-lg opacity-50 cursor-not-allowed"
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="#0A66C2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn (Coming Soon)
        </button>
      </div>

      <div className="text-center text-sm text-white pt-4">
        {isRegistering ? (
          <>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setIsRegistering(false)}
              className="text-blue-400 hover:underline"
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setIsRegistering(true)}
              className="text-blue-400 hover:underline"
            >
              Register
            </button>
          </>
        )}
      </div>
    </form>
  );
}
