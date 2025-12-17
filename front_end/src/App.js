import Navbar from './components/Navbar';
import Footer from './components/footer';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />


      <div className="position-relative flex-grow-1 d-flex flex-column">
        <img
          src="https://wallpaperaccess.com/full/1462457.jpg"
          alt="Background"
          className="w-100 h-100 position-absolute top-0 start-0 object-fit-cover"
        />

        <div className="container d-flex flex-column justify-content-center align-items-center text-center flex-grow-1 position-relative">
          <div
            className="col-lg-10 px-4 py-5 rounded"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(5px)",           
              WebkitBackdropFilter: "blur(10px)",  
              color: "white"
            }}
          >
            <h1 className="fw-bold display-5 mb-4 ">
              Welcome to Recipe Sharing Platform
            </h1>

            <p className="lead fw-bold fs-3 text-justify">
              The recipe sharing platform allows users to explore a wide variety of recipes uploaded by the community. 
              All uploaded recipes are displayed in a clear list, and when a user clicks on a recipe, they can view its 
              full details including ingredients, preparation steps, difficulty level, cooking time, and the number of 
              views it has received. Users can also contribute by uploading their own recipes, making them visible to 
              others on the platform. To make discovery easier, the platform includes a search feature where recipes can 
              be quickly found by name, ensuring that both creators and food enthusiasts can easily share, browse, and 
              enjoy culinary ideas together.
            </p>
          </div>
        </div>
      </div>

      {/* Compact Footer */}
      <Footer />
    </div>
  );
}

export default App;