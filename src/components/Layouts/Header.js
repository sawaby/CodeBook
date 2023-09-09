import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';
import { Search } from '../Sections/Search';

export const Header = () => {

    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
    const [searchSection, setSearchSection] = useState(false);

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        if(darkMode){
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode])
  return (
    <header>
        
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="border-b border-slate-200 dark:border-b-0 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <Link to="/" className="flex items-center">
                    <img src={Logo} className="h-8 mr-3" alt="CodeBook Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CodeBook</span>
                </Link>
                <div className="flex items-center relative">
                    <span onClick={() => setDarkMode(!darkMode)} className='cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-gear-fill'></span>
                    <span onClick={() => setSearchSection(!searchSection)} className='cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-search'></span>
                    <Link to="/cart" className='text-gray-700 dark:text-white mr-5'>
                        <span className="text-2xl bi bi-cart-fill relative">
                            <span className="text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full ">0</span>
                        </span>
                    </Link>
                    <span className='cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-person-circle'></span>
                </div>
            </div>
        </nav>
        {searchSection && <Search setSearchSection={setSearchSection} />}
        
    </header>
  )
}
