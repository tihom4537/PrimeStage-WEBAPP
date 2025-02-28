import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import SearchResults from './components/SearchResults/SearchResults'; // You'll need to update this path based on where you save the SearchResults component
import ArtistShowcase from './components/ArtistShowcase';
import BookingDetails from './components/Booking';
import { AuthProvider } from './context/AuthContext';
import CompanyPoliciesPage from './components/HomePage/comanyPolicy';
import TermAndCondition from './components/HomePage/termsAndCondition';
import RefundPolicy from './components/HomePage/refundPolicy';

function App() {
  return (
     <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/artists/:id" element={<ArtistShowcase />} />
        <Route path="/artists/booking" element={<BookingDetails />} />
        <Route path="/company-policies" element={<CompanyPoliciesPage />} />
        <Route path="/term-conditions" element={< TermAndCondition />} />
        <Route path="/refund-policy" element={< RefundPolicy />} />
        
      </Routes>
    </BrowserRouter>
     </AuthProvider>
  );
}

export default App;