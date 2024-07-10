const handlePageNotFound = (req, res) => {
    res.send(`
      <body style= "margin: 0; 
      padding: 0; 
      box-sizing: border-box; 
      font-family: Arial, sans-serif; 
      background-color: #D3D3D3; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      height: 100vh; ">
      <div style="text-align: center; 
      background-color: #fff; 
      padding: 20px; 
      border-radius: 5px; 
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"> 
      <h1 style="font-size: 5rem; 
      color: #ff5733;"> 
      404 
      </h1> 
      <p style="font-size: 1.5rem; 
      color: #333; 
      margin-bottom: 20px;">
      Oops! The page you're 
      looking for is not here. 
      </p> 
      <a style="text-decoration: none; 
      background-color: #ff5733; 
      color: #fff; 
      padding: 10px 20px; 
      border-radius: 3px; 
      font-weight: bold; 
      transition: background-color 0.3s ease;" 
      href="https://nursey-server.onrender.com/plants"> 
      Go Back to Home 
      </a> 
      </div>  
      </body>
      `);
  }

  export {handlePageNotFound}