import './App.css';
import { RoomTile } from './components/RoomTile/RoomTile';
function App() {
  const room = {
    name: "F6",
    type: "AC",
    capacity: 3,
    guests: [{
      name: "Raghu",
      age: 21,
      rentPaid: true,
      EBBillPaid: true,
      
    },
      {
      name: "Ram",
      age: 21,
      rentPaid: true,
      EBBillPaid: true,
      
      },
      {
      name: "Saravana",
      age: 21,
      rentPaid: true,
      EBBillPaid: true,
      
    },
      
    ]
  }
  return (
    <div className="App">
       <RoomTile room={room} />
    </div>
  );
}

export default App;
