import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import FeaturedProperties from './components/featuredProperties/featuredProperties';
import Hero from './components/hero/Hero';
import PopularProperties from './components/popularProperties/PopularProperties';
import Newsletter from './components/newsletter/Newsletter';
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import Properties from './components/properties/Properties';
import PropertyDetail from './components/propertyDetail/PropertyDetail';
import Footer from './components/footer/Footer';
import Fourbeds from './components/fourbeds/Fourbeds';
import Manage from './components/manage/Manage'




function App() {
  return (
    <div>
      <Routes>
        
        <Route path='/' element={
         <>
          <Navbar />
          <Hero />
          <PopularProperties />
          <FeaturedProperties />
          <Newsletter />
          <Footer />
         </>
        } />

        <Route path='/properties' element={
        <>
        <Navbar />
        <Properties />
        <Footer />
        </>} />

        <Route path='/fourbeds' element={
        <>
        <Navbar />
        <Fourbeds/>
        <Footer />
        </>} />

        <Route path='/manage' element={
        <>
        <Navbar />
        <Manage />
        <Footer />
        </> } />

        <Route path='/propertyDetail/:id' element={
        <>
        <Navbar />
        <PropertyDetail />
        <Footer />
        </>} />

        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
