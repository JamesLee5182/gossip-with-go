import CreateUserForm from "./components/CreateUserForm";

function App() {
  var c = CreateUserForm()

  return (
    <div>
      <h1>Gossip with Go</h1>
      <div>{c}</div>
    </div>
  );
}

export default App;
