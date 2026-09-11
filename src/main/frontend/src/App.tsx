import UsuarioList from "./components/UsuarioList";
import PermissaoList from "./components/PermissaoList";
import CategoriaList from "./components/CategoriaList";

function App() {
  return (
    <div>
      <h1>Usuários cadastrados</h1>
      <UsuarioList />

      <h1>Permissões do Sistema</h1>
      <PermissaoList />

      <h1>Categorias</h1>
      <CategoriaList />
    </div>
  );
}

export default App;
