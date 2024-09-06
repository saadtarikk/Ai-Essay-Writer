# Authentication and Routing Issues in AI Essay Writer Application

## 1. NextAuth Configuration

### Issue:

The initial NextAuth configuration wasn't properly handling the response from the backend, causing authentication failures.

### Solution:

We updated the authorize function in the NextAuth configuration to correctly process the backend response and handle errors.

      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {

          throw new Error('Email and password are required');

        }

            password: credentials.password,

        try {

          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {

            email: credentials.email,

            password: credentials.password,

          });

        } catch (error) {

          console.log('Backend response:', response.data);

          return user;

          if (response.data.user && response.data.access_token) {

            return {

              ...response.data.user,

              accessToken: response.data.access_token

            };

          } else {

            console.error('Invalid response structure:', response.data);

            throw new Error('Invalid response structure from server');

          } else {

        } catch (error) {

          if (axios.isAxiosError(error)) {

            console.error('Authentication error:', error.response?.data);

            throw new Error(error.response?.data?.message || 'Authentication failed');

          } else {

            console.error('Unexpected error:', error);

            throw new Error('An unexpected error occurred');

          }

        }

      }

Key changes:

- Improved error handling for axios requests

- Added more detailed logging for debugging

- Correctly structured the return object to include the access token

## 2. Session and Token Handling

### Issue:

The session wasn't properly including the user's access token, which is crucial for authenticated requests.

### Solution:

We updated the callbacks section in the NextAuth configuration to ensure the access token is included in both the JWT token and the session.

  `callbacks: {`

    `async jwt({ token, user }) {`

      `if (user) {`

        `token.id = user.id;`

        `token.email = user.email;`

        `token.name = user.name;`

        `token.accessToken = user.accessToken;`

        `}`

      `return token;`

    `},`

    `async session({ session, token }) {`

      `if (token && session.user) {`

        `session.user.id = token.id as string;`

        `session.user.email = token.email as string;`

        `session.user.name = token.name as string;`

        `session.user.accessToken = token.accessToken as string;`

      `}`

      `return session;`

    `},`

  `},`

## 3. Backend Authentication Service

### Issue:

The backend authentication service needed to be aligned with the frontend expectations, particularly in terms of response structure.

### Solution:

We ensured that the login method in the AuthService returns both the user object and the access token.

  async login(email: string, password: string) {

    const user = await this.validateUser(email, password);

    if (!user) {

      throw new UnauthorizedException('Invalid credentials');

    };

    const payload = { email: user.email, sub: user.id };

    return {

      user,

      access_token: this.jwtService.sign(payload),

    };

  }

## 4. Registration Process

### Issue:

The registration process wasn't properly integrated with NextAuth, leading to difficulties in automatically signing in users after registration.

### Solution:

We updated the signup page to use NextAuth's signIn function with custom credentials, including an isRegister flag.

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      console.log('Attempting to register user...');

      const result = await signIn('credentials', {

        email,

        password,

        name,

        isRegister: 'true',

        redirect: false,

      });

      console.log('Registration response status:', response.status);

      if (result?.error) {

        console.error('Registration failed:', result.error);

        setError(result.error);

      } else {

        console.log('Registration successful');

        toast.success('Registration successful! Redirecting to dashboard...', {

          position: "top-right",

          autoClose: 3000,

          hideProgressBar: false,

          closeOnClick: true,

          pauseOnHover: true,

          draggable: true,

        });

        router.push('/dashboard');

      }

    } catch (error) {

      console.error('An unexpected error occurred:', error);

      setError('An unexpected error occurred. Please try again.');

    }

  };

Key changes:

- Used signIn function with 'credentials' provider

- Added error handling and success notifications

- Implemented redirection to dashboard upon successful registration

## 5. Routing After Authentication

### Issue:

Users weren't being properly redirected after successful login or registration.

### Solution:

We implemented a custom signIn page and used Next.js's useRouter for programmatic navigation.

  pages: {

    signIn: "/login",

  },

export default function Login() {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const router = useRouter();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setError('');

    try {

      const result = await signIn('credentials', {

        email,

        password,

        redirect: false,

      });

    if (result?.error) {

      if (result?.error) {

        setError(result.error);

        console.error('Login error:', result.error);

      } else if (result?.ok) {

        router.push('/dashboard');

      } else {

        setError('An unexpected error occurred. Please try again.');

      }

    } catch (error) {

      console.error('Login error:', error);

      setError('An unexpected error occurred. Please try again.');

    }

  };

          <input type="hidden" name="remember" value="true" />

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-md w-full space-y-8">

        <div>

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>

        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

          <input type="hidden" name="remember" value="true" />

          <div className="rounded-md shadow-sm -space-y-px">

            <div>

              <label htmlFor="email-address" className="sr-only">Email address</label>

              <input

                id="email-address"

                name="email"

                type="email"

                autoComplete="email"

                required

                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"

                placeholder="Email address"

                value={email}

                onChange={(e) => setEmail(e.target.value)}

              />

            </div>

            <div>

              <label htmlFor="password" className="sr-only">Password</label>

              <input

                id="password"

                name="password"

                type="password"

                autoComplete="current-password"

                required

                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"

                placeholder="Password"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

              />

            </div>

            </div>

          </div>

          <div>

            <button

              type="submit"

              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

            >

              Sign in

            </button>

          </div>

        </form>

        <div className="text-center mt-4">

          <p className="text-sm text-gray-600">

          Don&apos;t have an account?{' '}            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">

              Sign up

            </Link>

          </p>

        </div>

        {error && (

          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">

            <span className="block sm:inline">{error}</span>

          </div>

        )}

          </div>

    </div>

  );

}

## 6. Error Handling and User Feedback

### Issue:

Error messages from the backend weren't being properly displayed to the user.

### Solution:

We improved error handling in both the frontend and backend, ensuring that meaningful error messages are passed to the user interface.

Frontend (Login Page):

          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">

            <span className="block sm:inline">{error}</span>

          </div>

        )}

Backend (Auth Controller):

  @Post('login')

  async login(@Body() loginData: { email: string; password: string }): Promise<{ user: any; access_token: string }> {

    try {

      const result = await this.authService.login(loginData.email, loginData.password);

      console.log('Login result:', result);

      return result;

    } catch (error) {

      console.error('Login error:', error);

      if (error instanceof UnauthorizedException) {

        throw new UnauthorizedException(error.message);

      }

      throw error;

    }

    } catch (error) {

## 7. JWT Strategy

### Issue:

The JWT strategy needed to be properly configured to validate tokens in authenticated requests.

### Solution:

We implemented a JWT strategy that extracts the token from the Authorization header and validates it.

import { Strategy, ExtractJwt } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';

import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private configService: ConfigService) {

    super({

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: configService.get<string>('JWT_SECRET'),

    });

  }

  async validate(payload: any) {

    return { userId: payload.sub, email: payload.email };

  }

}

## 8. CORS and Environment Configuration

### Issue:

Cross-Origin Resource Sharing (CORS) issues were preventing the frontend from communicating with the backend.

### Solution:

We ensured that the backend CORS settings were correctly configured and that the frontend was using the correct backend URL from environment variables.

          const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {

## Conclusion

By addressing these issues, we've created a robust authentication system that handles both login and registration processes, properly manages sessions and tokens, and provides a smooth user experience with appropriate error handling and feedback. The integration between the Next.js frontend and NestJS backend is now working correctly, allowing for secure and efficient user authentication.

Future improvements could include:

- Implementing refresh token functionality for extended session management

- Adding multi-factor authentication for enhanced security

- Implementing password reset functionality

- Enhancing client-side form validation for a better user experience

These solutions have significantly improved the reliability and security of the AI Essay Writer application's authentication system.