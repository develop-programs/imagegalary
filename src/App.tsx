
import MiniDrawer from './components/Ui/MiniDrawer'
import { Routes, Route } from 'react-router-dom'
import Photos from './Images/Photos/index.tsx';
import Favorites from './Images/Favorites/index.tsx';
import Trash from './Images/Trash/index.tsx';
import Home from './Home/index.tsx';
import Contact from './Contact/index.tsx';
function App() {
    return (
        <>
            <MiniDrawer>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/photos' element={<Photos />} />
                    <Route path='/favorites' element={<Favorites />} />
                    <Route path='/trash' element={<Trash />} />
                    <Route path='/contact' element={<Contact />} />
                </Routes>
            </MiniDrawer>
        </>
    )
}

export default App