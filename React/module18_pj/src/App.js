import React from "react";
import User from "./Components/User";
//import Input from "./Input";

    function App() {
     const user = {
       name: 'Ivan',
       secondName: 'Petrov',
       age: '25',
       gender: 'М',
       rank: 3
     }
     return (
       <div>
         <User {...user}/>
       </div>
     );
    }
    export default App;
