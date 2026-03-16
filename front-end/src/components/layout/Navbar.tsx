import { Link } from 'react-router-dom'
import {Dumbbell} from 'lucide-react'
import { Button } from '../ui/button'
const Navbar = () => {
    const isAuthenticated = false; // Replace with actual authentication logic
  return (
    <header className='fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md'>
        <div className='max-w-6xl mx-auto px-6 h-16 flex items-center justify-between '>
            <Link 
            to="/"
            className='flex items-center gap-2 text-foreground'>
            <Dumbbell className='w-6 h-6 text-accent' />
            <span className='font-semibold text-lg'>GYM PLANNER</span>
            </Link>
            <nav>
                {isAuthenticated ? <><Link 
                to="/Profile"
                >
                    <Button variant="ghost" size="sm">My Plan</Button>
                </Link></>:
                <>
                <Link 
                to="/auth/sing-in"
                >
                    <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link 
                to="/auth/sing-up"
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