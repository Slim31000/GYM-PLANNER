import { Link } from 'react-router-dom'
import {Dumbbell} from 'lucide-react'
import { Button } from '../ui/button'
import { authClient } from '../../lib/auth.ts'
import { UserAvatar } from "@daveyplate/better-auth-ui";


const Navbar = () => {
    //const isAuthenticated = false; // Replace with actual authentication logic

    const { data: session, isPending } = authClient.useSession()

  if (isPending) return null;

  return (
    <header className='fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md'>
        <div className='max-w-6xl mx-auto px-6 h-16 flex items-center justify-between '>
            <Link 
            to="/"
            className='flex items-center gap-2 text-foreground'>
            <Dumbbell className='w-6 h-6 text-accent' />
            <span className='font-semibold text-lg'>GYM PLANNER</span>
            </Link>
            <nav className='flex items-center justify-between'>
                {session?.user ? <><Link 
                to="/Profile"
                >
                    <Button variant="ghost" size="sm">My Plan</Button>
                </Link>
                <UserAvatar
                user={{
                    name:session.user.name || "",
                    email:session.user.email || "",
                    image:session.user.image || "",
                }}
                className="size-9 border border-border"
                classNames={{
                  fallback: "bg-black text-white text-sm",
                }}/>
                </>:
                <>
                <Link 
                to="/auth/sign-in"
                >
                    <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link 
                to="/auth/sign-up"
                >
                    <Button size="sm">Sign Up</Button>
                </Link>
                </>}
            </nav>
        </div>
    </header>
  )
}

export default Navbar