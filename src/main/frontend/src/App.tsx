
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import UsuariosPage from "./pages/UsuariosPage";
import UsuarioDetailPage from "./pages/UsuarioDetailPage";
import UsuarioPermissoesPage from "./pages/UsuarioPermissoesPage";
import PermissoesPage from "./pages/PermissoesPage";
import PermissaoDetailPage from "./pages/PermissaoDetailPage";
import CategoriasPage from "./pages/CategoriasPage";
import CategoriaDetailPage from "./pages/CategoriaDetailPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

        {/* PÁGINA INICIAL */}
        <Route path="/" element={<Home />} />

        {/* USUÁRIOS */}
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route
          path="/usuarios/:id"
          element={<UsuarioDetailPage />}
        />

        {/* CATEGORIAS */}
        <Route
          path="/categorias"
          element={<CategoriasPage />}
        />
        <Route
          path="/categorias/:id"
          element={<CategoriaDetailPage />}
        />

        {/* PERMISSÕES */}
        <Route
          path="/permissoes"
          element={<PermissoesPage />}
        />
        <Route
          path="/permissoes/:id"
          element={<PermissaoDetailPage />}
        />

        {/* ATRIBUIR PERMISSÕES A USUÁRIOS */}
        <Route
          path="/atribuir-permissoes"
          element={<UsuarioPermissoesPage />}
        />

        {/* PÁGINA NÃO ENCONTRADA */}
        <Route
          path="*"
          element={<h1>Página não encontrada</h1>}
        />

      </Route>
    </Routes>
  );
}

export default App;
